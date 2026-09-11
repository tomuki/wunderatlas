/* Client-side wrapper around the /api/auth/* endpoints. Never stores the
   password; only persists a small public-user record (id, email, name) in
   localStorage so the UI can show the current user. The session cookie is
   set by the server. */
(function (root) {
    const KEY = 'fhr-auth';

    function readUser() {
        try {
            const raw = localStorage.getItem(KEY);
            if (!raw) return null;
            const u = JSON.parse(raw);
            if (!u || !u.id || !u.email) return null;
            return u;
        } catch (e) { return null; }
    }
    function writeUser(u) {
        if (!u) localStorage.removeItem(KEY);
        else localStorage.setItem(KEY, JSON.stringify(u));
    }

    async function call(path, body, method) {
        const r = await fetch(path, {
            method: method || 'POST',
            credentials: 'same-origin',
            headers: { 'Content-Type': 'application/json' },
            body: body ? JSON.stringify(body) : undefined
        });
        const text = await r.text();
        let data = null;
        try { data = JSON.parse(text); } catch (e) { data = { error: text }; }
        if (!r.ok) {
            const msg = (data && (data.error || data.message)) || ('HTTP ' + r.status);
            const err = new Error(msg);
            err.status = r.status;
            err.data = data;
            throw err;
        }
        return data;
    }

    async function register(name, email, password) {
        const r = await call('/api/auth/register', { name, email, password });
        if (r && r.user) writeUser(r.user);
        return r;
    }
    async function login(email, password) {
        const r = await call('/api/auth/login', { email, password });
        if (r && r.user) writeUser(r.user);
        return r;
    }
    async function logout() {
        try { await call('/api/auth/logout', null, 'POST'); } catch (e) { /* ignore */ }
        writeUser(null);
    }
    async function me() {
        try {
            const r = await call('/api/auth/me', null, 'GET');
            if (r && r.user) writeUser(r.user);
            else writeUser(null);
            return r;
        } catch (e) {
            writeUser(null);
            return { ok: true, user: null };
        }
    }
    async function forgot(email) {
        return await call('/api/auth/forgot', { email });
    }
    async function reset(token, password) {
        return await call('/api/auth/reset', { token, password });
    }
    async function getProfile() {
        return await call('/api/profile', null, 'GET');
    }
    async function saveProfile(profile) {
        return await call('/api/profile', profile, 'PUT');
    }
    async function getLearner() {
        return await call('/api/learner', null, 'GET');
    }
    async function saveLearner(learner) {
        return await call('/api/learner', learner, 'PUT');
    }

    root.Auth = { register, login, logout, me, forgot, reset, getProfile, saveProfile, getLearner, saveLearner, readUser };
})(window);
