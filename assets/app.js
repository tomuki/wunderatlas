/* Bootstrap: registers pages, starts router, applies theme, handles auth. */
(function (root) {
    function applyTheme(theme) {
        const t = theme || (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
        document.documentElement.setAttribute('data-theme', t);
    }
    function setTheme(theme) {
        Store.update(state => { state.ui = state.ui || {}; state.ui.theme = theme; return state; });
        applyTheme(theme);
        updateThemeButtons();
    }
    function updateThemeButtons() {
        const s = Store.load();
        const theme = (s.ui && s.ui.theme) || 'light';
        document.querySelectorAll('[data-theme-btn]').forEach(b => {
            b.setAttribute('aria-pressed', String(b.dataset.themeBtn === theme));
        });
    }
    function toggleTheme() {
        const s = Store.load();
        const cur = (s.ui && s.ui.theme) || 'light';
        setTheme(cur === 'dark' ? 'light' : 'dark');
        ExerciseEngine.toast(cur === 'dark' ? 'Helles Design' : 'Dunkles Design', 'ok');
    }
    function registerAll() {
        if (!root.Pages) return;
        const order = ['dashboard', 'plan', 'deutsch', 'englisch', 'mathematik', 'grafik',
            'pruefung', 'fehler', 'notizen', 'lernkarten', 'fortschritt', 'profil',
            'onboarding', 'quellen', 'bibliothek', 'praxis'];
        order.forEach(name => {
            if (root.Pages[name]) {
                Router.register(name, (mount, params) => root.Pages[name](mount, params));
            }
        });
    }
    function navActive() {
        const hash = (location.hash || '#/dashboard').replace(/^#\//, '').split(/[/?]/)[0];
        document.querySelectorAll('[data-nav]').forEach(b => {
            const active = b.dataset.nav === hash;
            b.toggleAttribute('aria-current', active);
        });
        // Lernen-Gruppe hervorheben, wenn eines ihrer Kinder aktiv ist.
        const group = document.querySelector('[data-nav-group="lernen"]');
        if (group) {
            const children = ['deutsch', 'englisch', 'mathematik', 'lernkarten'];
            const isChild = children.includes(hash);
            const btn = group.querySelector('.nav-group__btn');
            if (btn) {
                if (isChild) btn.setAttribute('aria-current', 'page');
                else btn.removeAttribute('aria-current');
            }
        }
    }
    function mobileNav() {
        const btn = document.querySelector('.nav-toggle');
        const list = document.querySelector('.app-nav');
        if (!btn || !list) return;
        function close() {
            list.classList.remove('is-open');
            btn.setAttribute('aria-expanded', 'false');
        }
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const open = list.classList.toggle('is-open');
            btn.setAttribute('aria-expanded', String(open));
            if (open) {
                // Move focus into the menu so keyboard users can navigate.
                const firstLink = list.querySelector('a[href]');
                if (firstLink) firstLink.focus({ preventScroll: true });
            } else {
                btn.focus({ preventScroll: true });
            }
        });
        // Close on any nav link click (so hashchange feels clean)
        list.addEventListener('click', (e) => {
            if (e.target.closest('a[href]')) close();
        });
        // Expose close() to the global Escape/click-outside handler via a
        // CSS selector on .app-nav. We add 'is-open' to the exclusion set.
        btn.__mobileNavClose = close;
    }
    // Submenu-Toggle (Lernen)
    function bindSubmenus() {
        document.querySelectorAll('.nav-group').forEach(group => {
            const btn = group.querySelector('.nav-group__btn');
            const menu = group.querySelector('.nav-submenu');
            if (!btn || !menu) return;
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const open = menu.hidden;
                // alle anderen schließen
                document.querySelectorAll('.nav-submenu').forEach(m => { if (m !== menu) m.hidden = true; });
                document.querySelectorAll('.burger__menu').forEach(m => { m.hidden = true; });
                document.querySelectorAll('.nav-group__btn').forEach(b => { if (b !== btn) b.setAttribute('aria-expanded', 'false'); });
                menu.hidden = !open;
                btn.setAttribute('aria-expanded', String(open));
            });
            // Klick auf Menüpunkt schließt das Submenu
            menu.addEventListener('click', (e) => {
                if (e.target.closest('a[href]')) {
                    menu.hidden = true;
                    btn.setAttribute('aria-expanded', 'false');
                }
            });
        });
    }
    // Burger-Menü (weitere Optionen)
    function bindBurger() {
        const root = document.querySelector('.burger');
        const btn = document.getElementById('burger-btn');
        const menu = document.getElementById('burger-menu');
        if (!root || !btn || !menu) return;
        function close() {
            menu.hidden = true;
            btn.setAttribute('aria-expanded', 'false');
        }
        function open() {
            document.querySelectorAll('.nav-submenu').forEach(m => { m.hidden = true; });
            document.querySelectorAll('.nav-group__btn').forEach(b => b.setAttribute('aria-expanded', 'false'));
            menu.hidden = false;
            btn.setAttribute('aria-expanded', 'true');
        }
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (menu.hidden) open(); else close();
        });
        // Klicks auf Menüpunkte
        menu.addEventListener('click', async (e) => {
            const t = e.target.closest('[data-action], a[href]');
            if (!t) return;
            const action = t.getAttribute('data-action');
            if (action === 'theme') {
                close();
                toggleTheme();
            } else if (action === 'logout') {
                close();
                if (window.Auth) await window.Auth.logout();
                ExerciseEngine.toast('Abgemeldet.', 'ok');
                // Lerndaten (Plan, Fortschritt, Fehler) bleiben unangetastet.
                window.location.href = 'login.html';
            } else if (t.tagName === 'A') {
                close();
                // normale Navigation
            }
        });
    }
    // Klicks außerhalb schließen alle Menüs
    function bindGlobalClose() {
        document.addEventListener('click', (e) => {
            if (e.target.closest('.nav-group, .burger, [data-theme-btn]')) return;
            if (e.target.closest('.app-nav, .nav-toggle')) return; // mobile nav has its own toggle
            document.querySelectorAll('.nav-submenu, .burger__menu').forEach(m => { m.hidden = true; });
            document.querySelectorAll('.nav-group__btn, #burger-btn').forEach(b => b.setAttribute('aria-expanded', 'false'));
            // Mobile nav: schließe bei Außenklick
            const navList = document.querySelector('.app-nav');
            const navBtn = document.querySelector('.nav-toggle');
            if (navList && navList.classList.contains('is-open') && navBtn) {
                navList.classList.remove('is-open');
                navBtn.setAttribute('aria-expanded', 'false');
            }
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                document.querySelectorAll('.nav-submenu, .burger__menu').forEach(m => { m.hidden = true; });
                document.querySelectorAll('.nav-group__btn, #burger-btn').forEach(b => b.setAttribute('aria-expanded', 'false'));
                const navList = document.querySelector('.app-nav');
                const navBtn = document.querySelector('.nav-toggle');
                if (navList && navList.classList.contains('is-open') && navBtn) {
                    navList.classList.remove('is-open');
                    navBtn.setAttribute('aria-expanded', 'false');
                }
            }
        });
    }
    function bindTheme() {
        document.querySelectorAll('[data-theme-btn]').forEach(b => b.addEventListener('click', () => toggleTheme()));
        updateThemeButtons();
    }

    // Auth-Indikator: zeigt im Burger-Menü den Account oder einen Anmelden-Link.
    function renderUserArea() {
        const menu = document.getElementById('burger-menu');
        if (!menu) return;
        const user = (window.Auth && window.Auth.readUser) ? window.Auth.readUser() : null;
        // Vorhandene Auth-Einträge entfernen
        menu.querySelectorAll('[data-auth-line]').forEach(n => n.remove());
        // Logout-Button immer am Ende — wenn kein user, entfernen wir ihn
        const logoutBtn = menu.querySelector('[data-action="logout"]');
        if (logoutBtn) {
            if (!user) logoutBtn.remove();
        }
        // Anmelde-Link, wenn nicht eingeloggt
        if (!user) {
            const link = document.createElement('a');
            link.setAttribute('data-auth-line', '1');
            link.href = 'login.html';
            link.setAttribute('role', 'menuitem');
            link.textContent = 'Anmelden / Registrieren';
            // vor dem Logout-Button (oder ans Ende) einsetzen
            const hr = menu.querySelector('hr');
            if (hr) menu.insertBefore(link, hr);
            else menu.appendChild(link);
        } else {
            // Kontozeile oben einfügen
            const line = document.createElement('div');
            line.setAttribute('data-auth-line', '1');
            line.className = 'burger__account';
            line.textContent = user.name || user.email;
            line.title = user.email;
            menu.insertBefore(line, menu.firstChild);
        }
    }
    function escapeHtml(s) {
        return String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
    }
    function escapeAttr(s) { return escapeHtml(s); }

    async function init() {
        applyTheme(Store.load().ui && Store.load().ui.theme);
        registerAll();
        // Probe server auth state, then render header and start router.
        if (window.Auth) {
            try { await window.Auth.me(); } catch (e) { /* ignore */ }
        }
        renderUserArea();
        bindSubmenus();
        bindBurger();
        bindGlobalClose();
        // Generate plan on first run BEFORE the router starts.
        // Otherwise the dashboard (which is the default route) renders with
        // s.plan === null and shows 16 empty cells; the plan only materializes
        // afterwards and the dashboard never re-renders to pick it up.
        const s = Store.load();
        if (!s.plan || !s.plan.weeks || s.plan.weeks.length === 0) {
            Store.update(state => { state.plan = PlanTemplate.generate(state.profile); return state; });
        }
        // If a Store subscriber (e.g. the dashboard) has hooked into a fresh
        // state, the router-start re-render below will pick it up.
        Router.start();
        navActive();
        window.addEventListener('hashchange', navActive);
        mobileNav();
        bindTheme();
        // Wenn eingeloggt und noch nicht onboarded → Onboarding erzwingen.
        const u = (window.Auth && window.Auth.readUser) ? window.Auth.readUser() : null;
        const cur = (location.hash || '').replace(/^#\/?/, '').split(/[/?]/)[0];
        if (u && (!s.profile || !s.profile.onboardedAt) && cur !== 'onboarding' && cur !== 'profil') {
            location.hash = '#/onboarding';
        }
    }
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})(window);
