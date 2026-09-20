/* Hash-based router. Pages are registered by name and render into #page-root. */
(function (root) {
    const routes = new Map();
    let currentRoute = null;
    const PUBLIC_ROUTES = new Set(['quellen']);

    function register(name, handler) { routes.set(name, handler); }
    function guard(name) {
        // Soft gate: when there is no public user in localStorage, the user area
        // in the header will show a login link. We don't block the app — the
        // local state still works. Pages that need the server can call
        // window.Auth.getProfile(); they'll receive a 401 and react.
        if (PUBLIC_ROUTES.has(name)) return true;
        return true; // soft gate — see app.js renderUserArea().
    }
    function go(name, params) {
        const values=params||{};
        const suffix=values.ref!=null?'/'+encodeURIComponent(String(values.ref)):'';
        const query=Object.entries(values).filter(([key,value])=>key!=='ref'&&value!=null).map(([key,value])=>encodeURIComponent(key)+'='+encodeURIComponent(String(value))).join('&');
        const next='#/'+name+suffix+(query?'?'+query:'');
        if(window.location.hash===next&&routes.has(name))return render();
        window.location.hash=next;
    }
    function current() { return currentRoute; }

    function parseHash() {
        const raw = (window.location.hash || '').replace(/^#\/?/, '');
        const [path, query] = raw.split('?');
        const parts = path.split('/').filter(Boolean);
        const name = parts[0] || 'dashboard';
        const params = {};
        const decode=value=>{try{return decodeURIComponent(value);}catch{return value;}};
        if(parts[1]) {
            if(name==='pruefung'){params.subject=decode(parts[1]);if(parts[2])params.variant=decode(parts[2]);}
            else params.ref=decode(parts[1]);
        }
        if(query)for(const entry of query.split('&')){
            const at=entry.indexOf('='),key=at<0?entry:entry.slice(0,at),value=at<0?true:decode(entry.slice(at+1));
            if(key)params[decode(key)]=value;
        }
        return { name, params };
    }

    async function render() {
        const { name, params } = parseHash();
        const handler = routes.get(name) || routes.get('dashboard');
        const root = document.getElementById('page-root');
        if (!root) return;

        // Update nav highlight
        document.querySelectorAll('[data-nav]').forEach(a => {
            if (a.getAttribute('data-nav') === name) a.setAttribute('aria-current', 'page');
            else a.removeAttribute('aria-current');
        });

        // Update footer status
        const fs = document.getElementById('footer-status');
        if (fs) fs.textContent = 'Lade ' + name + ' …';

        root.innerHTML = '<div class="empty"><div class="spinner" style="margin-bottom:12px"></div><div class="muted">Wird geladen …</div></div>';

        try {
            await handler(root, params);
            currentRoute = name;
            // Persist last visited
            const s = Store.update(state => { state.ui.lastVisited = name; });
            if (fs) fs.textContent = 'Bereit';
            // Move focus to main for screen readers
            const main = document.getElementById('main');
            if (main) main.focus({ preventScroll: false });
            // Scroll to top of content
            window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
        } catch (e) {
            console.error(e);
            root.innerHTML = '<div class="card"><h2>Fehler</h2><p class="muted">Die Seite konnte nicht geladen werden: ' + escapeHtml(e.message) + '</p><button class="btn" data-route-retry>Erneut versuchen</button><a class="btn" href="#/dashboard">Zur Übersicht</a></div>';
            root.querySelector('[data-route-retry]').addEventListener('click',render);
            if (fs) fs.textContent = 'Fehler';
        }
    }

    function escapeHtml(s) {
        return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
    }

    function start() {
        window.addEventListener('hashchange', render);
        render();
    }

    // Returns a breadcrumb trail for the given route. Pages can override by
    // setting window.__crumbs before calling render, or by exporting
    // Pages[name].crumbs = (params) => string[].
    function crumbsFor(name, params) {
        if (root.Pages && root.Pages[name] && typeof root.Pages[name].crumbs === 'function') {
            try { return root.Pages[name].crumbs(params) || []; } catch (e) { return []; }
        }
        return [];
    }
    function renderBreadcrumbs(trail) {
        const host = document.getElementById('crumbs');
        if (!host) return;
        if (!trail || trail.length === 0) { host.innerHTML = ''; host.hidden = true; return; }
        host.hidden = false;
        host.innerHTML = trail.map((c, i) => {
            const last = i === trail.length - 1;
            const inner = last
                ? `<span class="breadcrumbs__current" aria-current="page">${escapeHtml(c.label)}</span>`
                : `<a href="${escapeHtml(c.href || '#')}" class="breadcrumbs__link">${escapeHtml(c.label)}</a>`;
            const sep = last ? '' : ' <span class="breadcrumbs__sep" aria-hidden="true">›</span>';
            return inner + sep;
        }).join(' ');
    }

    root.Router = { register, go, current, start, escapeHtml, crumbsFor, renderBreadcrumbs };
})(window);
