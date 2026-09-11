/* Quellen (sources) page.
   Vlada's version: a welcome row with the pony in greeting state,
   sticker-shaped source cards, decorative flourishes. */
(function (root) {
    async function render(container) {
        const sources = Sources.SOURCES;
        const topicMap = Sources.TOPIC_SOURCES;

        const fTL = window.Motifs ? window.Motifs.render('flower', { color: 'var(--mint)', size: 30 }) : null;
        const fTR = window.Motifs ? window.Motifs.render('sparkle', { color: 'var(--butter)', size: 28 }) : null;

        container.innerHTML = `
            <div class="page-header surface-with-flourish">
                <div>
                    <h1>Quellen</h1>
                    <div class="page-header__meta">Übersicht aller verwendeten Quellen mit Verlinkung und Abrufdatum. Inhalte sind, sofern nicht anders gekennzeichnet, eigens für diese Lernplattform erstellt worden.</div>
                </div>
                <div class="welcome-row__mascot" data-mascot-quellen-corner aria-hidden="true"></div>
                <span class="flourish flourish--flower flourish--tl" data-flourish="tl" aria-hidden="true"></span>
                <span class="flourish flourish--star flourish--tr" data-flourish="tr" aria-hidden="true"></span>
            </div>
            <div class="card card--sticker">
                <div class="card__title">Verwendete Quellen</div>
                <ul class="list">
                    ${sources.map(s => `
                        <li class="list__item source">
                            <div style="flex:1">
                                <div class="list__title">${escapeHtml(s.name)}</div>
                                <a class="muted" href="${escapeHtml(s.url)}" target="_blank" rel="noopener">${escapeHtml(s.url)}</a>
                                <div class="muted" style="font-size:0.85em; margin-top:4px">Abgerufen: ${formatDateDE(s.accessed)}</div>
                                <div class="muted" style="margin-top:4px">${escapeHtml(s.note)}</div>
                            </div>
                        </li>
                    `).join('')}
                </ul>
            </div>
            <h2 style="margin-top:24px">Themenzuordnung</h2>
            <div class="card card--sticker card--right">
                <p class="muted">Welche Quellen für welche Themen herangezogen wurden.</p>
                <ul class="list">
                    ${Object.entries(topicMap).map(([topic, ids]) => {
                        const list = ids.map(id => sources.find(s => s.id === id)).filter(Boolean);
                        return `
                            <li class="list__item">
                                <div style="flex:1">
                                    <div class="list__title">${escapeHtml(topic)}</div>
                                    <div class="muted" style="font-size:0.85em; margin-top:4px">${list.map(s => escapeHtml(s.name)).join(', ')}</div>
                                </div>
                            </li>
                        `;
                    }).join('')}
                </ul>
            </div>
            <h2 style="margin-top:24px">Urheberrecht & Lizenz</h2>
            <div class="card">
                <p>Alle Übungstexte, Beispielsätze und Erklärungen in dieser App sind eigens verfasst. Operatorenlisten (BW) und vergleichbare, nicht-werkspezifische Fachbegriffe sind nicht urheberrechtlich geschützt; sie werden hier nach reinem Sinn zitiert.</p>
                <p class="muted">Sollten trotz Sorgfalt Inhalte unbeabsichtigt einem Urheberrecht unterliegen, bitte einen Hinweis an die Betreiber:innen senden – betroffene Inhalte werden umgehend ersetzt oder entfernt.</p>
            </div>
        `;

        const ponySlot = container.querySelector('[data-mascot-quellen-corner]');
        if (ponySlot && window.Mascot) {
            window.Mascot.set(ponySlot, 'greeting', { size: 72 });
        }
        const flourishMap = { tl: fTL, tr: fTR };
        container.querySelectorAll('[data-flourish]').forEach(slot => {
            const node = flourishMap[slot.getAttribute('data-flourish')];
            if (node) slot.appendChild(node);
        });
    }
    function escapeHtml(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }
    function formatDateDE(iso) {
        const d = new Date(iso);
        return d.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' });
    }
    root.Pages = root.Pages || {};
    root.Pages.quellen = render;
})(window);
