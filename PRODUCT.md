# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Specific design target: Vlada.** The app is being designed specifically for Vlada and is expected to reflect her personality. This is a binding product fact and the calibration anchor for every future visual and tonal decision.
- **Operator on the project: the requester.** In the init interview the requester self-described the user base as "du + ggf. weitere Lernende" — meaning themselves as operator, with Vlada as the primary learner.
- **Data model is multi-user capable.** Authentication, sessions, and per-user profiles already exist on the server. One device is still one learner state, but the server-side model does not preclude additional users later.
- The single-person design target and the multi-user data layer are intentionally separate facts: future visual work is tuned to Vlada, future data work remains multi-user safe.

## Product Purpose

A self-hosted, local-first study web app that prepares a learner for the written **Fachhochschulreife (FHR)** exam in Baden-Württemberg, focused on the three exam subjects **Deutsch, Englisch, Mathematik**. Success means the learner reaches exam day **15.05.2027** with measurable progress, a working weekly study plan, and practiced recall across all three subjects.

## Positioning

- **Self-authored, exam-shaped content.** Lessons and exercises are original and built around the BW operator list and the FHR written-exam format. A weekly study plan is generated from the learner's profile (hours/week, available days, subject distribution).
- **Local-first, no vendor lock-in.** All learner data lives in the browser (`localStorage` under the key `fhr-app`, schema v2 with automatic v1→v2 migration). The full content corpus is shipped; the app works completely without an API key.
- **Honest, optional AI.** A server-side proxy against **Google Gemini** (primary) or **Anthropic Claude** (fallback) handles free-text feedback and dynamic task generation. The app never claims a real model answered when none did: without a key it returns structured local feedback (word count, keywords, operator coverage) and generates tasks from the local catalogue.
- **Strictly bound to a specific school and exam.** Carl-Hofer-Schule Karlsruhe, Berufskolleg Grafikdesign, FHR Baden-Württemberg, exam 15.05.2027.

## Operating Context

- **Learner.** Vlada; school context Carl-Hofer-Schule Karlsruhe, Berufskolleg Grafikdesign.
- **Exam date.** 15.05.2027 (configurable in profile, default is hardcoded).
- **Weekly study budget.** 5 hours per week, configurable in profile.
- **Three exam subjects.** Deutsch (21 lessons, 65 exercises), Englisch (22 lessons, 66 exercises), Mathematik (29 lessons, 77 exercises). Plus a companion "Grafikdesign" track with 30 portfolio-style tasks that is not part of the exam itself.
- **Practice surface.** 12 routes (dashboard, plan, deutsch, englisch, mathematik, grafik, pruefung, fehler, notizen, fortschritt, profil, quellen), plus lernkarten and onboarding, served via hash routing.
- **Exercise types.** 12 types: multiple choice, fill-blank, match-pairs, sort-order, error-correction, free-text, flashcards, timed-writing, cloze, math-input, mini-exam, mock-exam (sequential).
- **Exam simulation.** 3 variants per subject (DE, EN, MATH), 240 minutes each, auto-save, structured per-section scoring.
- **Review surface.** A Fehlerjournal (error journal) with a 1-3-7-14-30 day spaced-repetition schedule and self-rating.
- **Test surface (all currently green).** 198 headless Node unit tests, 12-route browser smoke test, and a 19-step real-browser E2E (Playwright) that exercises 533 buttons.

## Capabilities and Constraints

- **Architecture.**
  - No build step, no framework. Each module is a self-registering IIFE that attaches a single object to `window` (`Store`, `Router`, `Icons`, `I18N`, `ContentDE`, `ContentEN`, `ContentMATH`, `ContentGRAF`, `ContentExtras`, `PlanTemplate`, `Review`, `Sources`, `ExerciseEngine`, `Exercises`, `Pages`, `AI`).
  - The script order in `index.html` is load-bearing: helpers → data (incl. `content-extra.js` and `ContentExtras.apply()`) → exercises → pages → `app.js`.
  - The server (`server.js`, ~1.1k lines) is a static file server plus an authenticated `/api/ai` proxy with timeouts, provider fallback, and rate limiting. The app must work completely without a server too.
- **Data.**
  - `localStorage` key `fhr-app`, schema v2; v1→v2 migration runs automatically.
  - Server-side `data/` directory (gitignored) holds `users.json`, `sessions.json`, `profiles.json`, `ratelimit.json` — at least one learner is already registered.
- **AI integration (optional).**
  - Gemini is primary, Anthropic is fallback; the proxy only sets one provider active at a time.
  - The key is read server-side only, never written to HTML, client JS, `localStorage`, or logs.
  - Requests run with a 12 s timeout; 401/403/429 and bad JSON trigger fallback or, ultimately, the local feedback path.
- **Voice and terminology.**
  - All UI strings are German and live centrally in `assets/i18n.js`.
  - Operators and exam-specific terms are quoted by meaning, not verbatim from the official BW operator list. If a source is found to be under copyright, the README commits to replacing or removing it (sources are listed on the "Quellen" page with retrieval dates).
- **Out of scope (intentional).**
  - Cloud sync of learner state.
  - Multiple learners on a single device.
  - Real-time collaboration.
- **Open product decisions.**
  - No formal accessibility conformance target is recorded. The README mentions landmarks, skip link, and ARIA where natural, but a WCAG-level commitment has not been made.
  - Mobile navigation uses an off-canvas menu; long lessons may scroll horizontally on very small viewports — acknowledged as a known limitation.

## Brand Commitments

These commitments are user-stated and binding. They are recorded here exactly as given; visual implementation is owned by a later `new-work` step. **Do not** interpret, soften, or generalize them in product work.

- **Specific design target.** The app is designed specifically for Vlada and must reflect her personality. This is binding.
- **Visual language is deliberately playful, dreamy, cute, and personal.** Ponies and horses, flowers, stars, glitter, small surprises, charming illustrations, and lively, harmonious colors are explicitly desired. The app may look fairytale-like, emotional, and idiosyncratic.
- **What the app must not look like.** A sterile, minimalist SaaS dashboard. A sober school platform. An ultramodern generic look. Interchangeable AI-template aesthetics. Cold performance-pressure framing.
- **Decoration is functional, not decorative-only.** Decoration creates joy and motivation, but it must never cover tasks, texts, or controls. The active learning goal, the learner's path, navigation, and readability stay clear in every state.
- **Voice.** Warm, encouraging, humorous, fully in German. No English UI strings. No generic gamification floskeln. No corporate cool.
- **School binding.** Carl-Hofer-Schule Karlsruhe, Berufskolleg Grafikdesign, FHR Baden-Württemberg, exam 15.05.2027 — strictly bound. The school name, the exam date, and the BW operator reference are part of identity, not flavor.

## Evidence on Hand

- **README.md** (175 lines) — current scope, content counts, data model, test results, architecture map, known limitations.
- **Complete source under `assets/`.** ~1200 lines of CSS, IIFE modules, content files for DE/EN/MATH/Grafik, plan template, sources, exercise engines, page renderers.
- **Test suites currently green.**
  - `tests/run-node.js` — 198 headless Node unit tests.
  - `tests/browser-smoke.js` — 12 routes, expects 0 console errors.
  - `tests/browser-e2e.js` — 19-step real-browser E2E with 533 button interactions.
- **Test page.** `tests.html` renders test results in-DOM, viewable in the browser.
- **Source list.** `assets/data/sources.js` with retrieval dates; the user-facing "Quellen" page mirrors it.
- **Live state on disk.** `data/profiles.json`, `data/sessions.json`, `data/users.json`, `data/ratelimit.json` — evidence of at least one registered learner.

## Product Principles

1. **Local-first and honest.** The learner owns their data, the app works offline, and any AI assistance is opt-in, transparent, and gracefully absent.
2. **Plan as the spine.** A weekly plan, generated from a real profile, drives the dashboard, the review queue, and the exam-simulation cadence — not a generic course catalogue.
3. **Practice over polish.** Every lesson and every exercise earns its place by mapping to a real exam operator or a real recall gap surfaced by the Fehlerjournal.
4. **One design target, not a demographic.** Visual and tonal decisions are calibrated to Vlada specifically — that is a sharper constraint, not a looser one.
5. **Decoration is functional.** Cute and dreamy are means; the active learning goal, the next step, and the current state must always be readable at a glance.

## Accessibility & Inclusion

- Document language is set: `lang="de"`.
- A skip link jumps to `#main`. Semantic landmarks include `<header role="banner">`, `<main>`, `<nav aria-label="…">`, and off-canvas menus that toggle `aria-expanded`.
- `aria-live` regions are declared for toasts and the page root; the theme toggle carries an `aria-label` that updates with the resulting theme.
- Icon-only buttons ship with `aria-label`; decorative SVGs are `aria-hidden`.
- Mobile navigation uses an off-canvas menu; long lessons may scroll horizontally on very small viewports (acknowledged in README limitations).
- **No formal accessibility conformance target has been set.** WCAG level, assistive-tech test matrix, or user-research findings have not been recorded. This is an open decision.
