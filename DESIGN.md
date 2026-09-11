# DESIGN.md — FHR-Vorbereitung (study-app)

> Synthesized from: `assets/styles.css` (1909 lines), `assets/mascot.js`, `assets/motifs.js`, `assets/icons.js`, `PRODUCT.md`, `.impeccable/briefs/shape-fhr-vorbereitung.md`. The design world is already shipped (not theoretical).

---

## 1. Brand promise (binding — from PRODUCT.md)

- **Design target: Vlada.** Every visual / tonal decision is calibrated to her specifically, not a demographic. Binding.
- **Not:** a sterile SaaS dashboard, sober school platform, ultramodern generic UI, interchangeable AI-template aesthetic.
- **Must be:** playful, dreamy, cute, personal, fairytale-like, emotional, idiosyncratic — ponies/horses, flowers, stars, glitter, charming illustrations, lively harmonious colors. Decoration is **functional** (creates joy + motivation, never covers tasks / text / controls).
- **Voice:** warm, encouraging, humorous. German only. No English UI strings. No generic gamification floskeln. No corporate cool.

---

## 2. Design language (keywords, from brief + CSS header)

**Sticker album / kawaii / personal / warm.** The `assets/styles.css` header reads: *"Calm, professional educational platform. No random colors, no emoji."* The shipped world is the deliberate opposite (per brief anti-reference): loud, character-driven sticker-album aesthetic.

**Signature patterns (live in CSS):**
- `card--sticker`: `border-radius: var(--radius-sticker)` (asymmetric 22/26/22/26), `box-shadow: var(--shadow-stamp)`, `transform: rotate(-0.4deg)` — cards are hand-cut stickers, never flat rectangles.
- `btn--primary` (berry), `btn--mint`, `btn--butter`: single-weight shiny buttons (not glassy, not noisy).
- `welcome-row`: the page-level greeting with the pony mascot (`.welcome-row__mascot`) + title (`.welcome-row__greeting`) + optional flourish.
- `step-row` + `.step-key` (36px) + `.step-key-gap` (6px): the plan page's candy-key interaction is the signature flow.
- `.motif` / `Motifs.render()`: inline decorative SVGs (`flower`, `sparkle`, `star`, `heart`, `cloud`, `leaf`, `ribbon`, `comet`). Never overlaid on text.
- `edge-flourish`: CSS custom property (`1` in light, `0.7` in dark); a decorative-corner intensity knob.

---

## 3. Mascot — Vlada's pony (shipped, not pending)

- **Character:** one pony, no formal name (`assets/mascot.js` header: "Mascot — Vlada's pony"). Cream coat (`#fff1e0`), berry mane (`#e14d6e`), big eye with highlight, small star tucked in mane.
- **Usage:** rendered via inline SVG by `Mascot.render()` and injected with `Mascot.set(slot, 'state', { size })`. The pony lives in `.welcome-row__mascot` (dashboard, subject pages, onboarding hero) and `plan.stampEl` (plan stamps).
- **States (6, live):** `greeting` (default, tilted head, raised hoof, soft breathe animation 4.5s), `correct` (bounce 0.9s × 2), `wrong` (sway 2.4s infinite), `streak` (party hat + confetti), `exam` (glasses + notebook), `rest` (nightcap, moon, zzz).
- **Sizes (CSS-driven):** `var(--mascot-size)` (64px), `--mascot-size-lg` (96px), `--mascot-size-xl` (128px).

---

## 4. Decorative motifs (shipped — `assets/motifs.js`)

`Motifs.render(name, opts)` produces inline SVG decorations. All live in the current build:

| Motif | Color default | Used on |
|---|---|---|
| `star` | `#f0b945` (butter) | Page-corner stars, stamps |
| `sparkle` | `#e14d6e` (berry) | Small twinkles |
| `flower` | `#e14d6e` (berry) | Page-corner flowers (`quellen`, `grafik`, `profil`) |
| `cloud` | `#fff3e2` (cream) | Weather / celestial |
| `heart` | `#e14d6e` (berry) | Soft affirmation |
| `leaf` | `#46b890` (mint) | Mint accents |
| `ribbon` | `#e14d6e` (berry) | Bookmark / banner |
| `comet` | `#f0b945` (butter) | Streak trail |

**Live page-level usage (confirmed in `.impeccable/review/` screenshots):**
- `dashboard`: welcome-row pony + greeting. `--edge-flourish` active.
- `plan`: candy-key step rows (`step-key` 36px). Plan stamps (pony state `streak` / `greeting`). No overlay on grid.
- `deutsch` / `englisch` / `mathematik`: lesson card (`card--sticker`), welcome-row pony (`greeting` or `correct` / `wrong`), subject-tint tags (`tag--de` / `--en` / `--math`).
- `grafik`: corner `flower` (primary), `sparkle` (butter), `star` (mint) — 3 motifs per page (max expression).
- `pruefung`: corner `star` (butter) — exam-day focus.
- `fehler`: error journal with spaced-repetition schedule.
- `notizen`: notes / vocabulary.
- `fortschritt`: progress charts.
- `profil`: profile + pony greeting (`greeting`, 80px).
- `lernkarten`: flashcards (`card--sticker` + `Motifs`).
- `onboarding`: hero pony (`greeting` / `rest`), sparkle + flower flourishes.
- `quellen`: source list with corner motifs (`flower` + `sparkle`).

---

## 5. Color system (CSS custom properties — `assets/styles.css`, fully live)

### Light theme (default, `data-theme` not set):
- `--bg`: `#fff3e2` (warm cream paper)
- `--primary`: `#e14d6e` (raspberry / berry)
- `--mint`: `#46b890`
- `--butter`: `#f0b945`
- `--text`: `#3a1e2c`
- `--text-muted`: `#7a5466`
- `--border`: `#f0d3a8`
- `--font-display`: `"Caveat", "Comic Sans MS", ...` (system fallbacks — no Google Fonts actually loaded)
- `--font-sans`: `"Quicksand", -apple-system, ...` (same — only fallbacks render)
- `--font-mono`: `"JetBrains Mono", ui-monospace, ...`

### Dark theme (`:root[data-theme="dark"]`):
- `--bg`: `#1f1422` (deep velvet purple)
- `--bg-elev`: `#2a1a30`
- `--primary`: `#ff7a96` (brighter berry)
- `--mint`: `#6cd9b0`
- `--butter`: `#f5c46a`
- `--text`: `#f7e8d4` (warm cream text)
- `--text-muted`: `#c4a3b3`
- `--border`: `#4a2c55`
- Decoration stays visible; dark is "a nighttime version of the same place" (moon + star motifs, deeper purples), not an inverted grey slab.

### Subject tints (used by `tag--de`, `tag--en`, `tag--math`):
- `--de` / `--de-soft`: berry (`#e14d6e` / `#fde2e9`)
- `--en` / `--en-soft`: mint (`#46b890` / `#d8f1e5`)
- `--math` / `--math-soft`: purple-blue (`#6b6bd6` / `#e1e1f5`)

---

## 6. Typography (live tokens — full CSS scale)

| Element | Family | Size | Weight | Tracking |
|---|---|---|---|---|
| `h1` (display) | `--font-display` (`Caveat` fallback) | `2.4rem` | 700 | `-0.01em` |
| `h2` | sans (`Quicksand` fallback) | `1.35rem` | 700 | `-0.005em` |
| `h3` | sans | `1.10rem` | 700 | `-0.005em` |
| Body (`body`) | `--font-sans` | `inherit` (15px base on `html`, `1.55` line-height) | 400 | — |
| `.stat__value` (big numbers) | `--font-display` | `2.4rem` | 700 | `-0.01em` |
| `.app-brand__name` | sans | `1.6rem` | 700 | — |

Tabular numerals (`font-variant-numeric: tabular-nums`) applied to: `.stat__value`, `.timer`, `.step-row__label`, `.day__date`.

---

## 7. Spacing + layout tokens (live)

- Scale: `--space-1` 4px → `--space-8` 64px.
- `--header-h`: `72px`
- `--content-max`: `1140px`
- `--radius-sm`: 10px / `--radius-md`: 14px / `--radius-lg`: 20px / `--radius-xl`: 28px / `--radius-sticker`: `22px 26px 22px 26px / 24px 22px 24px 22px` (asymmetric, hand-cut) / `--radius-chip`: 999px.
- `--focus-ring`: `0 0 0 2px var(--bg), 0 0 0 4px var(--primary)` (same in both themes).
- Breakpoints: `(max-width: 480px)`, `(max-width: 560px)`, `(max-width: 700px)`, `(max-width: 800px)`, `(max-width: 880px)`, `(max-width: 900px)`, `(min-width: 721px) and (max-width: 1024px)`, `(pointer: coarse)`. Responsive is fully live (mobile off-canvas nav; reduced-motion honored via `prefers-reduced-motion` at line 412 / 1824).

---

## 8. Component patterns (all live in CSS + page modules)

### Card (`.card--sticker`)
Asymmetric radius, stamp shadow, slight rotation (`rotate(-0.4deg)` / `rotate(0.5deg)` for `.card--right`), flat-pressed at `pointer: coarse`. Not a flat grey pill.

### Buttons (`.btn--primary` / `.btn--mint` / `.btn--butter` / `.btn--ghost` / `.btn--danger`)
Single-color flush; no glass, no gradients, no noisy patterns. Hover states use `var(--primary-hover)` or `var(--mint-soft)`. `min-height: 40px` on touch (`pointer: coarse`).

### Tags / chips (`.tag--de` / `.tag--en` / `.tag--math` / `.tag--gr` / `.tag--mint` / `.tag--butter` / `.tag--warn` / `.tag--danger` / `.tag--ai` / `.tag--local`)
Sticker-chips — never grey pills. Each subject has its own tint (`--de-soft`, `--en-soft`, `--math-soft`).

### Modal (`.modal--wide` max-width 800px)
Hairline `1px solid var(--border)`; dashed header separator; `box-shadow: var(--shadow-lg)`; overlay `rgba(36,17,32,0.45)` (light) / `rgba(8,4,12,0.6)` (dark).

### Toast (`.toast--ok` / `.toast--err`)
Live `aria-live` region (`#toast-root`). Small stamps, quick in.

### Progress (`.progress--thin` 6px)
Thin bar, no decorative overlay.

---

## 9. Page-level design (live — from `.impeccable/review/` screenshots + `.impeccable/briefs/`)

| Route | Signature | Pony state | Decoration | Note |
|---|---|---|---|---|
| `#/dashboard` | Welcome row + stat tiles | `greeting` | Corner flourish (`edge-flourish`) | Next step loudest |
| `#/plan` | Candy-key step rows (`.step-key` 36px) | `streak` stamp | Minimal (work is loudest) | Signature interaction |
| `#/deutsch` | Lesson card (`card--sticker`) | `greeting` / `correct` / `wrong` | Tag `--de` | Subject page |
| `#/englisch` | Lesson card | `greeting` / `correct` / `wrong` | Tag `--en` | Subject page |
| `#/mathematik` | Lesson card | `greeting` / `correct` / `wrong` | Tag `--math` | Subject page |
| `#/grafik` | Portfolio card | `greeting` | Flower + sparkle + star (3 motifs, max expression) | Non-exam track |
| `#/pruefung` | Exam timer (`.timer`) | `exam` | Star (butter) | Focus state |
| `#/fehler` | Error journal (spaced-repetition: 1-3-7-14-30) | `greeting` | Minimal (work is loudest) | Review surface |
| `#/notizen` | Notes / vocabulary | `greeting` | Minimal | Clean surface |
| `#/fortschritt` | Charts / stats | — | Minimal | Progress tracking |
| `#/profil` | Profile + pony greeting | `greeting` (80px) | Flower + sparkle | User identity |
| `#/quellen` | Source list | — | Flower + sparkle | Reference |
| `#/lernkarten` | Flashcards (`card--sticker`) | — | Sticker rotation | Drill surface |
| `#/onboarding` | Hero pony + wizard (`.wizard`) | `greeting` / `rest` | Sparkle + flower | First-run experience |

---

## 10. Accessibility + interaction (live commitments)

- `lang="de"` (`index.html`). Skip link (`.skip-link`) to `#main`. Semantic landmarks: `<header role="banner">`, `<main>`, `<nav aria-label="Hauptnavigation">`, off-canvas burger with `aria-expanded` / `hidden` toggle, `aria-live` (`#toast-root` polite + atomic; `#page-root` polite). Theme toggle (`#theme-toggle`) with `aria-label` that updates. Icon-only buttons carry `aria-label`; decorative SVGs are `aria-hidden`.
- Focus ring (`--focus-ring`): 2px bg ring + 4px primary ring — visible in both themes, same formula.
- `prefers-reduced-motion`: animations removed (line 412 / 1824). `prefers-color-scheme: dark`: `:root:not([data-theme="light"])` activates at line 1897; `:root[data-theme="dark"]` at line 1903.
- No formal WCAG conformance level is set in `PRODUCT.md` — the brief's position is: high bar (AA on body + interactive text) as default, surfaced as an open decision. Already implemented: `lang="de"`, landmarks, focus rings, reduced-motion, contrast in both themes.
- Mobile: off-canvas nav (`#nav-toggle`); `pointer: coarse` removes sticker rotation (cards stay flat when held); touch targets `min-height: 40px`. Horizontal scroll is a known limitation (acknowledged in README, kept in brief).

---

## 11. What to actively avoid (anti-references — from brief §8)

- The *previous* CSS header's intent: "Calm, professional educational platform. No random colors, no emoji." The new world is the opposite — loud sticker-album, character-driven, berry + mint + butter palette.
- Sterile grey-blue (`#f4f6f9` background, `#2563eb` navy primary) — replaced by warm cream (`#fff3e2`) + berry (`#e14d6e`).
- System-sans-only typography — replaced by `Caveat` (display, handwritten feel) + `Quicksand` (sans, rounded, friendly) — but both load as fallbacks only; no external font files ship.
- Emoji-free stance — replaced by inline decorative SVG motifs (`flower`, `sparkle`, `star`, `heart`, `cloud`, `leaf`, `ribbon`, `comet`) registered under `window.Motifs`.
- Flat grey pill chips — replaced by `tag--de` / `--en` / `--math` sticker-chips with subject tints.
- Flat grey cards — replaced by `card--sticker` (asymmetric radius, stamp shadow, slight rotation).

---

## 12. Implementation notes (binding architecture)

- No build step. No framework. Each module is a self-registering IIFE (`assets/*.js` → single `window.*` object). `index.html` script order is load-bearing: helpers (`icons.js`, `mascot.js`, `motifs.js`, `i18n.js`, `state.js`, `router.js`, `review.js`) → data (`sources.js`, `content-de/en/math/grafik/extra.js` + `ContentExtras.apply()`) → exercises → pages (`dashboard`, `plan`, `deutsch`, `englisch`, `mathematik`, `grafik`, `pruefung`, `fehler`, `notizen`, `fortschritt`, `profil`, `lernkarten`, `onboarding`, `quellen`) → `learner.js`, `ai.js`, `auth.js`, `app.js`.
- New components live in `assets/styles.css` (CSS variables) or as inline SVG registered through `assets/mascot.js` (`window.Mascot`) / `assets/motifs.js` (`window.Motifs`). No external font files unless they ship locally.
- `assets/components.js` does **not** exist. `assets/icons.js` exists (`window.Icons`). There is no centralized component module — each page renders its own surface via its `render()` function.
- Server (`server.js`, ~1.1k lines, port `3456` by default): static file server + `/api/auth/*` (register / login / logout / forgot / reset) + `/api/ai` proxy (Gemini primary, Anthropic fallback). App must work without server (`localStorage` `fhr-app`, schema v2).
- Font tokens (`--font-display` / `--font-sans` / `--font-mono`) reference `Caveat` / `Quicksand` / `JetBrains Mono` but only their fallbacks render — no `@import` or `<link>` to Google Fonts exists in `index.html`.

---

## 13. Evidence in repo

- `assets/styles.css` — full token system (1909 lines), all sections 1–34.
- `assets/mascot.js` — `STATES` (6), `render()`, `set()`, `bubble()`, `pair()`.
- `assets/motifs.js` — `Motifs.render()` (flower, sparkle, star, heart, cloud, leaf, ribbon, comet).
- `assets/icons.js` — `window.Icons.icon()` (24 icons, inline SVG).
- `.impeccable/review/` — 13 routes × desktop + mobile screenshots (`01-dashboard` through `14-lernkarten`, plus onboarding `03-onboarding`).
- `tests/run-node.js` — 267/267 passed (live green line). `tests/browser-smoke.js` — 12 routes, 0 console errors. `tests/browser-e2e.js` — 19 steps, 533 buttons.
- `PRODUCT.md` — brand commitments, operating context, open decisions (accessibility conformance, mobile horizontal-scroll limitation).
- `.impeccable/briefs/shape-fhr-vorbereitung.md` — the contract this document fulfills.

---

*Last updated: 2026-09-04. Design world is already shipped — all tokens above are live in `assets/styles.css`, all mascot states in `assets/mascot.js`, all motifs in `assets/motifs.js`, all icons in `assets/icons.js`, and all page surfaces in `assets/pages/*.js`.*
