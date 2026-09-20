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
        const previous = readUser();
        if (u && !localStorage.getItem('fhr-app/legacy-owner') && previous?.id === u.id && !localStorage.getItem('fhr-app/user/' + u.id)) {
            const legacy = localStorage.getItem('fhr-app');
            if (legacy) localStorage.setItem('fhr-app/user/' + u.id, legacy);
        }
        if (u && !localStorage.getItem('fhr-app/legacy-owner')) localStorage.setItem('fhr-app/legacy-owner', previous?.id === u.id ? String(u.id) : 'guest');
        if (!u) localStorage.removeItem(KEY);
        else localStorage.setItem(KEY, JSON.stringify(u));
    }

    async function call(path, body, method) {
        const controller=new AbortController(),timeout=setTimeout(()=>controller.abort(),25000);
        try{const r = await fetch(path, {
            signal:controller.signal,
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
        }catch(e){if(e.name==='AbortError')throw new Error('Die Verbindung dauert zu lange. Bitte erneut versuchen.');throw e;}finally{clearTimeout(timeout);}
    }

    async function restoreLearning() {
        const requestedId = readUser()?.id; if (!requestedId) return;
        const result = await Promise.allSettled([getProfile(), getLearner()]);
        const user = readUser(); if (!user || user.id !== requestedId) return;
        const key = 'fhr-app/user/' + user.id;
        let state; try { state = JSON.parse(localStorage.getItem(key) || 'null'); } catch (_) {}
        if (!state && root.Store) state = root.Store.load();
        if (!state) return;
        // Existing local work wins; server data hydrates a new browser/profile only.
        if (!state.profile?.onboardedAt && result[0].status === 'fulfilled' && result[0].value.profile) state.profile = {...state.profile, ...result[0].value.profile};
        if (!state.learner?.updatedAt && result[1].status === 'fulfilled' && result[1].value.learner) state.learner = result[1].value.learner;
        localStorage.setItem(key, JSON.stringify(state));
    }
    async function register(name, email, password, invitationCode) {
        const r = await call('/api/auth/register', { name, email, password, invitationCode });
        if (r && r.user) { writeUser(r.user); await restoreLearning(); }
        return r;
    }
    async function login(email, password) {
        const r = await call('/api/auth/login', { email, password });
        if (r && r.user) { writeUser(r.user); await restoreLearning(); }
        return r;
    }
    async function logout() {
        try { await call('/api/auth/logout', null, 'POST'); } catch (e) { /* ignore */ }
        writeUser(null);
    }
    async function me() {
        try {
            const r = await call('/api/auth/me', null, 'GET');
            if (r && r.user) { writeUser(r.user); await restoreLearning(); }
            else writeUser(null);
            return r;
        } catch (e) {
            if (e.status === 401) writeUser(null);
            return { ok: false, user: readUser(), offline: true };
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
