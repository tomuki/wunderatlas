/* =========================================================================
   Motifs — the small decorative flourishes used at page corners and
   card edges. CSS-only would be simpler, but inline SVG gives us a
   small set of named, recolourable, size-aware flourishes that pages
   can drop in with a single class. They never sit on top of text or
   controls — corner motifs only.

   Public surface:
     window.Motifs = {
       render(name, opts) -> SVGElement
       set(el, name, opts) -> el
     }

   Names:
     star, sparkle, flower, cloud, heart, leaf, ribbon, comet
   ========================================================================= */
(function () {
    'use strict';

    function el(tag, attrs, children) {
        const e = document.createElementNS('http://www.w3.org/2000/svg', tag);
        if (attrs) for (const k in attrs) e.setAttribute(k, attrs[k]);
        if (children) for (const c of children) e.appendChild(c);
        return e;
    }

    function star(color) {
        const c = color || '#f0b945';
        const svg = el('svg', {
            viewBox: '0 0 24 24', xmlns: 'http://www.w3.org/2000/svg',
            'aria-hidden': 'true', role: 'presentation',
        });
        svg.appendChild(el('path', {
            d: 'M12 2 L14.5 9.5 L22 12 L14.5 14.5 L12 22 L9.5 14.5 L2 12 L9.5 9.5 Z',
            fill: c, stroke: c, 'stroke-width': 0.5, 'stroke-linejoin': 'round', opacity: 0.95,
        }));
        // Inner small star highlight
        svg.appendChild(el('path', {
            d: 'M12 7 L13 11 L17 12 L13 13 L12 17 L11 13 L7 12 L11 11 Z',
            fill: '#fff3e2', opacity: 0.5,
        }));
        return svg;
    }

    function sparkle(color) {
        const c = color || '#e14d6e';
        const svg = el('svg', {
            viewBox: '0 0 24 24', xmlns: 'http://www.w3.org/2000/svg',
            'aria-hidden': 'true', role: 'presentation',
        });
        // Four-point sparkle
        svg.appendChild(el('path', {
            d: 'M12 2 Q13 11 22 12 Q13 13 12 22 Q11 13 2 12 Q11 11 12 2 Z',
            fill: c, opacity: 0.9,
        }));
        return svg;
    }

    function flower(petalColor, centerColor) {
        const p = petalColor || '#f78fa3';
        const ct = centerColor || '#ffd56e';
        const svg = el('svg', {
            viewBox: '0 0 36 36', xmlns: 'http://www.w3.org/2000/svg',
            'aria-hidden': 'true', role: 'presentation',
        });
        // Five round petals around a center
        const positions = [
            [18, 6], [30, 14], [26, 28], [10, 28], [6, 14],
        ];
        for (const [cx, cy] of positions) {
            svg.appendChild(el('circle', {
                cx, cy, r: 6, fill: p, stroke: '#c83a5b', 'stroke-width': 0.6, opacity: 0.95,
            }));
        }
        svg.appendChild(el('circle', { cx: 18, cy: 18, r: 4, fill: ct, stroke: '#8a5a14', 'stroke-width': 0.5 }));
        // Tiny dots in center
        svg.appendChild(el('circle', { cx: 17, cy: 17, r: 0.8, fill: '#8a5a14' }));
        svg.appendChild(el('circle', { cx: 19, cy: 19, r: 0.8, fill: '#8a5a14' }));
        return svg;
    }

    function cloud(color) {
        const c = color || '#fff8ed';
        const svg = el('svg', {
            viewBox: '0 0 100 40', xmlns: 'http://www.w3.org/2000/svg',
            'aria-hidden': 'true', role: 'presentation',
        });
        svg.appendChild(el('path', {
            d: 'M20 32 Q4 32 4 22 Q4 14 14 14 Q14 6 24 6 Q32 6 34 14 Q40 8 50 8 Q62 8 62 18 Q70 16 76 22 Q86 22 86 30 Q86 36 78 36 L22 36 Q20 36 20 32 Z',
            fill: c, stroke: '#e7bf86', 'stroke-width': 1, opacity: 0.9, 'stroke-linejoin': 'round',
        }));
        return svg;
    }

    function heart(color) {
        const c = color || '#e14d6e';
        const svg = el('svg', {
            viewBox: '0 0 24 24', xmlns: 'http://www.w3.org/2000/svg',
            'aria-hidden': 'true', role: 'presentation',
        });
        svg.appendChild(el('path', {
            d: 'M12 21 C12 21 3 14 3 8 C3 5 5 3 8 3 C10 3 11 4 12 6 C13 4 14 3 16 3 C19 3 21 5 21 8 C21 14 12 21 12 21 Z',
            fill: c, stroke: '#a63655', 'stroke-width': 0.8,
        }));
        return svg;
    }

    function leaf(color) {
        const c = color || '#7ad6b4';
        const svg = el('svg', {
            viewBox: '0 0 24 24', xmlns: 'http://www.w3.org/2000/svg',
            'aria-hidden': 'true', role: 'presentation',
        });
        svg.appendChild(el('path', {
            d: 'M4 20 Q4 4 20 4 Q20 20 4 20 Z',
            fill: c, stroke: '#3a8264', 'stroke-width': 0.8, 'stroke-linejoin': 'round',
        }));
        svg.appendChild(el('path', {
            d: 'M4 20 L18 6', stroke: '#3a8264', 'stroke-width': 0.8, fill: 'none', opacity: 0.6,
        }));
        return svg;
    }

    function ribbon(color) {
        const c = color || '#e14d6e';
        const svg = el('svg', {
            viewBox: '0 0 24 24', xmlns: 'http://www.w3.org/2000/svg',
            'aria-hidden': 'true', role: 'presentation',
        });
        svg.appendChild(el('path', {
            d: 'M4 4 L20 4 L18 12 L20 20 L4 20 L6 12 Z',
            fill: c, stroke: '#a63655', 'stroke-width': 0.8, 'stroke-linejoin': 'round',
        }));
        svg.appendChild(el('circle', { cx: 12, cy: 12, r: 3, fill: '#fff3e2', stroke: '#a63655', 'stroke-width': 0.6 }));
        return svg;
    }

    function comet(color) {
        const c = color || '#f0b945';
        const svg = el('svg', {
            viewBox: '0 0 60 24', xmlns: 'http://www.w3.org/2000/svg',
            'aria-hidden': 'true', role: 'presentation',
        });
        svg.appendChild(el('path', {
            d: 'M2 12 Q12 10 24 12 Q12 14 2 12 Z',
            fill: c, opacity: 0.85,
        }));
        svg.appendChild(el('circle', { cx: 36, cy: 12, r: 4, fill: c }));
        svg.appendChild(el('circle', { cx: 50, cy: 12, r: 2.5, fill: c, opacity: 0.6 }));
        svg.appendChild(el('circle', { cx: 56, cy: 12, r: 1.5, fill: c, opacity: 0.4 }));
        return svg;
    }

    const RENDERERS = {
        star: star,
        sparkle: sparkle,
        flower: flower,
        cloud: cloud,
        heart: heart,
        leaf: leaf,
        ribbon: ribbon,
        comet: comet,
    };

    function render(name, opts) {
        const fn = RENDERERS[name] || RENDERERS.star;
        const node = fn(opts && opts.color, opts && opts.color2);
        if (opts && opts.size) {
            node.setAttribute('width', opts.size);
            node.setAttribute('height', opts.size);
        }
        return node;
    }

    function set(container, name, opts) {
        if (!container) return container;
        while (container.firstChild) container.removeChild(container.firstChild);
        container.appendChild(render(name, opts));
        return container;
    }

    window.Motifs = {
        render: render,
        set: set,
        names: Object.keys(RENDERERS),
    };
})();
