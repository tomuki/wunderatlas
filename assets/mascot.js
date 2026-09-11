/* =========================================================================
   Mascot — Vlada's pony
   A single character, six states, all inline SVG so the no-build
   architecture stays intact. The pony is small, warm, and consistent:
   cream coat, berry mane, big eye, a small star tucked in the mane.

   States:
     - greeting  (default, head tilted, soft smile, one hoof raised)
     - correct   (eyes happy, sparkle near cheek, gentle bounce)
     - wrong     (soft consoling look, no shame, head dipped low)
     - streak    (little party hat, sparkles around)
     - exam      (focused, eyes down, small notebook or glasses)
     - rest      (closed eyes, nightcap with star, zzz)

   Public surface:
     window.Mascot = {
       STATES: [...names...],
       render(name, opts) -> SVGElement
       set(el, name, opts) -> el (mutated, returns el)
     }

   Notes:
   - Every state uses the same head geometry and palette so the pony
     stays one character across surfaces.
   - The body is intentionally cropped; the pony is a sticker, not a portrait.
   - "Small enough to read at 36px" was the constraint: the eye must register
     at small sizes, the mane must be clearly berry, the smile must be visible.
   ========================================================================= */
(function () {
    'use strict';

    // Shared palette — referenced from styles.css tokens; duplicated here so
    // the SVG stays standalone (no runtime CSS resolution needed for fills).
    const C = {
        coat: '#fff1e0',         // cream coat
        coatShade: '#f0d8b6',    // slightly darker cream for body depth
        coatLight: '#fff8ed',
        mane: '#e14d6e',         // berry main
        maneDeep: '#c83a5b',     // berry shadow
        maneLight: '#f78fa3',    // berry highlight
        tail: '#46b890',         // mint tail tip
        eye: '#3a1e2c',          // dark berry ink
        eyeWhite: '#ffffff',
        cheek: '#f7a9b8',        // soft blush
        muzzle: '#fff3e2',
        horn: '#f0b945',         // butter horn (unicorn hint, optional)
        star: '#ffd56e',
        night: '#3d2546',
    };

    // Helper: create an SVG element with attributes
    function el(tag, attrs, children) {
        const e = document.createElementNS('http://www.w3.org/2000/svg', tag);
        if (attrs) for (const k in attrs) e.setAttribute(k, attrs[k]);
        if (children) for (const c of children) e.appendChild(c);
        return e;
    }

    // Shared head geometry — the same across all states. Everything else
    // (eyes, mouth, accessories) is layered on top.
    function buildHead(scale, tilt) {
        // scale: 0..1 size factor; tilt: degrees of rotation for the head group
        const s = scale != null ? scale : 1;
        const t = tilt != null ? tilt : 0;

        const g = el('g', {
            transform: `rotate(${t} 64 64) scale(${s})`,
        });

        // Ears (drawn first so head overlaps them)
        g.appendChild(el('path', {
            d: 'M52 32 L46 18 L60 28 Z',
            fill: C.mane, stroke: C.maneDeep, 'stroke-width': 1.5, 'stroke-linejoin': 'round',
        }));
        g.appendChild(el('path', {
            d: 'M76 32 L82 18 L68 28 Z',
            fill: C.mane, stroke: C.maneDeep, 'stroke-width': 1.5, 'stroke-linejoin': 'round',
        }));

        // Mane behind head — flowing locks
        g.appendChild(el('path', {
            d: 'M40 38 Q28 50 30 70 Q26 76 32 84 Q24 90 32 100 Q26 108 38 110 Q40 118 50 116 Q44 122 50 124 L52 96 Q48 80 52 60 Q48 46 56 38 Z',
            fill: C.mane, stroke: C.maneDeep, 'stroke-width': 1.5, 'stroke-linejoin': 'round',
        }));
        g.appendChild(el('path', {
            d: 'M88 38 Q100 50 98 70 Q102 76 96 84 Q104 90 96 100 Q102 108 90 110 Q88 118 78 116 Q84 122 78 124 L76 96 Q80 80 76 60 Q80 46 72 38 Z',
            fill: C.mane, stroke: C.maneDeep, 'stroke-width': 1.5, 'stroke-linejoin': 'round',
        }));
        // Mane highlight strands
        g.appendChild(el('path', {
            d: 'M44 56 Q40 70 44 86', stroke: C.maneLight, 'stroke-width': 2, fill: 'none', 'stroke-linecap': 'round', opacity: 0.7,
        }));
        g.appendChild(el('path', {
            d: 'M84 56 Q88 70 84 86', stroke: C.maneLight, 'stroke-width': 2, fill: 'none', 'stroke-linecap': 'round', opacity: 0.7,
        }));

        // Head (cream coat, rounded)
        g.appendChild(el('path', {
            d: 'M64 36 Q44 36 40 56 Q36 72 44 86 Q48 100 64 100 Q80 100 84 86 Q92 72 88 56 Q84 36 64 36 Z',
            fill: C.coat, stroke: C.maneDeep, 'stroke-width': 1.8, 'stroke-linejoin': 'round',
        }));

        // Muzzle (lighter)
        g.appendChild(el('ellipse', {
            cx: 64, cy: 84, rx: 14, ry: 10,
            fill: C.muzzle, stroke: C.maneDeep, 'stroke-width': 1.4, opacity: 0.95,
        }));

        // Forelock (a curl of mane between the ears)
        g.appendChild(el('path', {
            d: 'M58 38 Q64 30 70 38 Q66 50 64 48 Q62 50 58 38 Z',
            fill: C.mane, stroke: C.maneDeep, 'stroke-width': 1.4,
        }));

        return g;
    }

    // Eyes — two simple ovals with a white highlight
    function openEyes(scale) {
        const s = scale != null ? scale : 1;
        const g = el('g');
        // Left eye
        g.appendChild(el('ellipse', {
            cx: 55, cy: 68, rx: 5 * s, ry: 6 * s, fill: C.eye,
        }));
        g.appendChild(el('circle', { cx: 56.5, cy: 66.5, r: 1.8, fill: C.eyeWhite }));
        // Right eye
        g.appendChild(el('ellipse', {
            cx: 73, cy: 68, rx: 5 * s, ry: 6 * s, fill: C.eye,
        }));
        g.appendChild(el('circle', { cx: 74.5, cy: 66.5, r: 1.8, fill: C.eyeWhite }));
        return g;
    }

    // Happy closed eyes — upward arches
    function happyEyes() {
        const g = el('g');
        g.appendChild(el('path', {
            d: 'M49 68 Q55 62 61 68', stroke: C.eye, 'stroke-width': 2.2, fill: 'none', 'stroke-linecap': 'round',
        }));
        g.appendChild(el('path', {
            d: 'M67 68 Q73 62 79 68', stroke: C.eye, 'stroke-width': 2.2, fill: 'none', 'stroke-linecap': 'round',
        }));
        return g;
    }

    // Sleepy closed eyes — gentle downward curves
    function sleepyEyes() {
        const g = el('g');
        g.appendChild(el('path', {
            d: 'M49 68 Q55 72 61 68', stroke: C.eye, 'stroke-width': 2, fill: 'none', 'stroke-linecap': 'round',
        }));
        g.appendChild(el('path', {
            d: 'M67 68 Q73 72 79 68', stroke: C.eye, 'stroke-width': 2, fill: 'none', 'stroke-linecap': 'round',
        }));
        return g;
    }

    // Cheeks — soft blush
    function cheeks() {
        const g = el('g', { opacity: 0.6 });
        g.appendChild(el('circle', { cx: 50, cy: 80, r: 4, fill: C.cheek }));
        g.appendChild(el('circle', { cx: 78, cy: 80, r: 4, fill: C.cheek }));
        return g;
    }

    // Smile — a small upward curve
    function smile() {
        return el('path', {
            d: 'M58 88 Q64 94 70 88', stroke: C.eye, 'stroke-width': 1.8, fill: 'none', 'stroke-linecap': 'round',
        });
    }

    // Soft open smile — a slightly bigger curve
    function warmSmile() {
        return el('path', {
            d: 'M56 88 Q64 96 72 88', stroke: C.eye, 'stroke-width': 2, fill: C.cheek, 'stroke-linecap': 'round', opacity: 0.9,
        });
    }

    // Subdued mouth — for wrong, a small flat line with a tiny downturn
    function softFrown() {
        return el('path', {
            d: 'M58 90 Q64 86 70 90', stroke: C.eye, 'stroke-width': 1.8, fill: 'none', 'stroke-linecap': 'round',
        });
    }

    // Sparkle — a 4-point star
    function sparkle(cx, cy, size, color) {
        const s = size || 6;
        const k = color || C.star;
        return el('path', {
            d: `M${cx} ${cy - s} L${cx + s * 0.3} ${cy - s * 0.3} L${cx + s} ${cy} L${cx + s * 0.3} ${cy + s * 0.3} L${cx} ${cy + s} L${cx - s * 0.3} ${cy + s * 0.3} L${cx - s} ${cy} L${cx - s * 0.3} ${cy - s * 0.3} Z`,
            fill: k,
        });
    }

    // Small star
    function smallStar(cx, cy, r) {
        const k = r || 5;
        return el('path', {
            d: `M${cx} ${cy - k} L${cx + k * 0.25} ${cy - k * 0.3} L${cx + k} ${cy} L${cx + k * 0.25} ${cy + k * 0.3} L${cx} ${cy + k} L${cx - k * 0.25} ${cy + k * 0.3} L${cx - k} ${cy} L${cx - k * 0.25} ${cy - k * 0.3} Z`,
            fill: C.star,
        });
    }

    // ---------- State renderers ----------
    // Each returns a complete <svg> element, 128x128 viewport, ready to be sized.
    function stateGreeting() {
        const svg = el('svg', {
            viewBox: '0 0 128 128', xmlns: 'http://www.w3.org/2000/svg',
            'aria-hidden': 'true', role: 'img',
        });
        // Floating little star behind
        svg.appendChild(smallStar(20, 22, 4));
        svg.appendChild(smallStar(108, 30, 3));
        // Head, slightly tilted, with mane
        const head = buildHead(1, -4);
        head.appendChild(openEyes(1));
        head.appendChild(cheeks());
        head.appendChild(warmSmile());
        svg.appendChild(head);
        // One hoof raised in greeting
        svg.appendChild(el('path', {
            d: 'M86 108 Q98 102 102 92 Q108 86 100 84 Q96 96 86 102 Z',
            fill: C.coat, stroke: C.maneDeep, 'stroke-width': 1.6, 'stroke-linejoin': 'round',
        }));
        // Body hint (a soft coat shoulder)
        svg.appendChild(el('path', {
            d: 'M40 110 Q60 122 88 110 Q86 124 64 126 Q42 124 40 110 Z',
            fill: C.coat, stroke: C.maneDeep, 'stroke-width': 1.6, 'stroke-linejoin': 'round',
        }));
        // Mint tail tip
        svg.appendChild(el('path', {
            d: 'M42 116 Q30 122 28 130', stroke: C.tail, 'stroke-width': 6, fill: 'none', 'stroke-linecap': 'round',
        }));
        return svg;
    }

    function stateCorrect() {
        const svg = el('svg', {
            viewBox: '0 0 128 128', xmlns: 'http://www.w3.org/2000/svg',
            'aria-hidden': 'true', role: 'img',
        });
        // Sparkles around — celebration
        svg.appendChild(smallStar(18, 18, 5));
        svg.appendChild(smallStar(110, 22, 4));
        svg.appendChild(smallStar(112, 80, 3));
        svg.appendChild(smallStar(16, 88, 4));
        // Cheek sparkle
        svg.appendChild(sparkle(94, 76, 4, C.maneLight));
        const head = buildHead(1, 0);
        head.appendChild(happyEyes());
        head.appendChild(cheeks());
        head.appendChild(warmSmile());
        svg.appendChild(head);
        // Body
        svg.appendChild(el('path', {
            d: 'M40 110 Q60 122 88 110 Q86 124 64 126 Q42 124 40 110 Z',
            fill: C.coat, stroke: C.maneDeep, 'stroke-width': 1.6, 'stroke-linejoin': 'round',
        }));
        svg.appendChild(el('path', {
            d: 'M42 116 Q30 122 28 130', stroke: C.tail, 'stroke-width': 6, fill: 'none', 'stroke-linecap': 'round',
        }));
        // Little check mark on a stamp
        svg.appendChild(el('circle', {
            cx: 30, cy: 36, r: 9, fill: C.tail, opacity: 0.95,
        }));
        svg.appendChild(el('path', {
            d: 'M25 36 L29 40 L36 32', stroke: '#fff', 'stroke-width': 2.4, fill: 'none', 'stroke-linecap': 'round', 'stroke-linejoin': 'round',
        }));
        return svg;
    }

    function stateWrong() {
        const svg = el('svg', {
            viewBox: '0 0 128 128', xmlns: 'http://www.w3.org/2000/svg',
            'aria-hidden': 'true', role: 'img',
        });
        // Small heart for "no worries"
        svg.appendChild(el('path', {
            d: 'M30 24 C28 20 22 20 22 26 C22 30 30 36 30 36 C30 36 38 30 38 26 C38 20 32 20 30 24 Z',
            fill: C.mane, opacity: 0.85,
        }));
        // Head dipped low
        const head = buildHead(1, 0);
        // Reposition head down a bit by wrapping in a translated group
        const wrap = el('g', { transform: 'translate(0 8)' });
        wrap.appendChild(openEyes(0.9));
        wrap.appendChild(cheeks());
        wrap.appendChild(softFrown());
        head.appendChild(wrap);
        svg.appendChild(head);
        // Body, low
        svg.appendChild(el('path', {
            d: 'M40 110 Q60 122 88 110 Q86 124 64 126 Q42 124 40 110 Z',
            fill: C.coat, stroke: C.maneDeep, 'stroke-width': 1.6, 'stroke-linejoin': 'round',
        }));
        // A hoof reaching out — supportive
        svg.appendChild(el('path', {
            d: 'M88 108 Q98 100 100 90 Q104 96 96 100 Q92 108 88 108 Z',
            fill: C.coat, stroke: C.maneDeep, 'stroke-width': 1.6, 'stroke-linejoin': 'round',
        }));
        return svg;
    }

    function stateStreak() {
        const svg = el('svg', {
            viewBox: '0 0 128 128', xmlns: 'http://www.w3.org/2000/svg',
            'aria-hidden': 'true', role: 'img',
        });
        // Confetti stars
        for (const [cx, cy, r, c] of [
            [16, 18, 5, C.mane], [110, 20, 4, C.tail], [114, 70, 3, C.butter || C.star],
            [14, 90, 4, C.mane], [108, 100, 5, C.tail], [22, 60, 3, C.star],
        ]) {
            svg.appendChild(smallStar(cx, cy, r));
        }
        // Party hat on the head
        svg.appendChild(el('path', {
            d: 'M48 22 L64 4 L80 22 Z',
            fill: C.mane, stroke: C.maneDeep, 'stroke-width': 1.6, 'stroke-linejoin': 'round',
        }));
        svg.appendChild(el('path', {
            d: 'M64 4 L64 16', stroke: C.maneLight, 'stroke-width': 1.6,
        }));
        svg.appendChild(smallStar(64, 6, 3));
        // Head, happy
        const head = buildHead(1, -2);
        head.appendChild(happyEyes());
        head.appendChild(cheeks());
        head.appendChild(warmSmile());
        svg.appendChild(head);
        // Body
        svg.appendChild(el('path', {
            d: 'M40 110 Q60 122 88 110 Q86 124 64 126 Q42 124 40 110 Z',
            fill: C.coat, stroke: C.maneDeep, 'stroke-width': 1.6, 'stroke-linejoin': 'round',
        }));
        svg.appendChild(el('path', {
            d: 'M42 116 Q30 122 28 130', stroke: C.tail, 'stroke-width': 6, fill: 'none', 'stroke-linecap': 'round',
        }));
        return svg;
    }

    function stateExam() {
        const svg = el('svg', {
            viewBox: '0 0 128 128', xmlns: 'http://www.w3.org/2000/svg',
            'aria-hidden': 'true', role: 'img',
        });
        // Subtle star above (a wish for the exam)
        svg.appendChild(smallStar(20, 22, 4));
        svg.appendChild(smallStar(108, 22, 3));
        // Head, focused
        const head = buildHead(1, 0);
        head.appendChild(openEyes(0.85)); // slightly narrowed
        head.appendChild(cheeks());
        head.appendChild(smile());
        svg.appendChild(head);
        // Tiny reading glasses (a thin frame)
        svg.appendChild(el('circle', {
            cx: 55, cy: 68, r: 6, fill: 'none', stroke: C.eye, 'stroke-width': 1.4,
        }));
        svg.appendChild(el('circle', {
            cx: 73, cy: 68, r: 6, fill: 'none', stroke: C.eye, 'stroke-width': 1.4,
        }));
        svg.appendChild(el('path', {
            d: 'M61 68 L67 68', stroke: C.eye, 'stroke-width': 1.4,
        }));
        // Small notebook under the head — focus
        svg.appendChild(el('rect', {
            x: 48, y: 102, width: 32, height: 22, rx: 3, fill: C.coatLight, stroke: C.maneDeep, 'stroke-width': 1.4,
        }));
        svg.appendChild(el('path', {
            d: 'M52 108 L76 108 M52 114 L72 114 M52 120 L74 120',
            stroke: C.maneDeep, 'stroke-width': 1, opacity: 0.6,
        }));
        return svg;
    }

    function stateRest() {
        const svg = el('svg', {
            viewBox: '0 0 128 128', xmlns: 'http://www.w3.org/2000/svg',
            'aria-hidden': 'true', role: 'img',
        });
        // Crescent moon
        svg.appendChild(el('path', {
            d: 'M22 24 A12 12 0 1 0 22 48 A9 9 0 1 1 22 24 Z',
            fill: C.butter, opacity: 0.95,
        }));
        // Tiny stars
        svg.appendChild(smallStar(108, 28, 4));
        svg.appendChild(smallStar(96, 16, 3));
        svg.appendChild(smallStar(16, 70, 3));
        // Head, sleeping
        const head = buildHead(1, 6);
        head.appendChild(sleepyEyes());
        head.appendChild(cheeks());
        head.appendChild(smile());
        svg.appendChild(head);
        // Nightcap
        svg.appendChild(el('path', {
            d: 'M40 38 Q44 12 64 6 Q84 12 88 38 Q84 32 64 32 Q44 32 40 38 Z',
            fill: C.night, stroke: C.maneDeep, 'stroke-width': 1.4, 'stroke-linejoin': 'round',
        }));
        svg.appendChild(el('circle', { cx: 64, cy: 8, r: 4, fill: C.tail }));
        // Blanket
        svg.appendChild(el('path', {
            d: 'M28 110 Q60 124 100 110 L100 124 L28 124 Z',
            fill: C.mane, stroke: C.maneDeep, 'stroke-width': 1.4, 'stroke-linejoin': 'round', opacity: 0.85,
        }));
        // Z's
        svg.appendChild(el('text', {
            x: 96, y: 64, 'font-family': 'Caveat, cursive', 'font-size': 18, fill: C.mane, 'font-weight': 700,
        })).textContent = 'z';
        svg.appendChild(el('text', {
            x: 104, y: 56, 'font-family': 'Caveat, cursive', 'font-size': 14, fill: C.mane, 'font-weight': 700,
        })).textContent = 'z';
        return svg;
    }

    const RENDERERS = {
        greeting: stateGreeting,
        correct: stateCorrect,
        wrong: stateWrong,
        streak: stateStreak,
        exam: stateExam,
        rest: stateRest,
    };

    const STATES = Object.keys(RENDERERS);

    // Public: render(stateName, opts) -> SVGElement
    function render(name, opts) {
        const fn = RENDERERS[name] || RENDERERS.greeting;
        const node = fn(opts);
        if (opts && opts.className) node.setAttribute('class', opts.className);
        if (opts && opts.title) {
            node.setAttribute('role', 'img');
            node.setAttribute('aria-label', opts.title);
            node.removeAttribute('aria-hidden');
        }
        return node;
    }

    // Public: set(container, name, opts) -> container
    // Replaces container's children with the rendered mascot.
    function set(container, name, opts) {
        if (!container) return container;
        while (container.firstChild) container.removeChild(container.firstChild);
        container.setAttribute('data-mascot-state', name || 'greeting');
        // Honor explicit size opt (so per-page sizing still works alongside CSS-driven welcome-row defaults)
        if (opts && opts.size) {
            const px = String(opts.size) + 'px';
            container.style.width = px;
            container.style.height = px;
        }
        container.appendChild(render(name, opts));
        return container;
    }

    // Public: a small bubble — a div with a speech-tag around an optional message
    function bubble(message) {
        const wrap = document.createElement('div');
        wrap.className = 'mascot-bubble';
        wrap.textContent = message;
        return wrap;
    }

    // Public: convenience — build a complete "mascot + bubble" pair
    function pair(name, message, opts) {
        const wrap = document.createElement('div');
        wrap.className = 'mascot-row';
        wrap.style.display = 'flex';
        wrap.style.alignItems = 'center';
        wrap.style.gap = '12px';
        const m = document.createElement('div');
        m.className = (opts && opts.mascotClass) || 'mascot mascot--md mascot--float';
        set(m, name || 'greeting', opts);
        wrap.appendChild(m);
        if (message) wrap.appendChild(bubble(message));
        return wrap;
    }

    window.Mascot = {
        STATES: STATES,
        render: render,
        set: set,
        bubble: bubble,
        pair: pair,
    };
})();
