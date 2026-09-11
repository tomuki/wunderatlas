# Wunderatlas — research source and decision ledger

Research date: 6 September 2026. Scope: personal German FHR preparation app, existing German/English/math/design curriculum. Objective: distinctive visual identity and reliable learning interactions. No paid competitor accounts purchased, no deployment requested, no exam-success guarantees.

## Findings and application

1. Sofatutor publicly describes diverse exercise formats, immediate feedback, hints and context-specific video assistance. Its public homepage was also visually inspected. Adopt the connection between explanation, practice and help, not the commercial landing-page styling. Implemented: separate Verstehen/Anwenden panels over existing lessons and a single active exercise. No video library or teacher service invented. Source: https://www.sofatutor.com/informationen/uebungen
2. Studyflix places practice alongside explanatory material and organizes worked examples around concrete topics. Adopt a searchable chapter index and the ability to return to the explanation without losing an active answer. Source: https://studyflix.de/mathematik/ableiten-4212/aufgaben
3. Brilliant's teaching description emphasizes small conceptual steps and active problem solving. Adopt one active task, clear answer feedback and explicit navigation between tasks. This is a product-design inference, not a claim that this app implements Brilliant's pedagogy or achieves equivalent outcomes. Source: https://brilliant.org/resources/choosing-brilliant/how-brilliant-teaches-math/
4. Khan Academy describes hints during practice and explanations after answers. This reinforces the need to distinguish attempting, seeing a solution and completing work. Source: https://blog.khanacademy.org/how-should-people-practice-on-khan-academy/
5. Roediger & Karpicke (2006), Psychological Science, reports delayed retention benefits from retrieval practice versus restudy in its experimental setting. This supports maintaining active practice; it does not validate the app's existing spaced-review schedule or predict an individual's exam result. Primary abstract: https://pubmed.ncbi.nlm.nih.gov/16507066/

## Evidence ledger

| Claim | Evidence | Confidence / limits | Decision |
|---|---|---|---|
| Competitors connect explanations and practice | First-party public product and exercise pages | High for public description; authenticated flow not independently tested | Reading/practice tabs |
| One task can make a learning step easier to follow | Brilliant description + product inference | Medium; no user study of this redesign | Single active exercise plus navigable overview |
| Reset can suppress the next action | Existing source: modules gated onResult on scoring dedup | High; reproduced and tested locally | Separate UI transitions from score persistence |
| Returning to an exercise loses local answer state | Sequential renderer rebuilt exercise DOM | High; regression assertions + browser checks | Cache each active exercise mount within session |
| Portfolio Start falsely implies completion | Existing grafik.js click handler immediately added completion | High; source inspected | Open a real work brief; explicit reversible completion |
| Existing readiness percentage is not a validated forecast | Existing formula: 60% accuracy + 40% topic coverage | High for formula; no validation evidence supplied | Replace with factual practice results |
| Calendar day can shift in Europe/Berlin | toISOString used for local midnight | High; date assertions | Serialize local calendar date without UTC conversion |

## Visual direction — an original interpretation

An illustrated learning atlas: warm paper, book-like typography, subject volumes, chapter numbers, ruled journals, botanical pony artwork. Plum ink, rose, sage, indigo and ochre. Square functional controls; arches and circular seals are intentional exceptions. Illustration is original code-native SVG, not copied competitor artwork. Motion is short and local, with prefers-reduced-motion respected. Calm work surfaces take precedence over decoration.

## Delivery and limitations

The existing curriculum, account backend, notes, flashcards and exam engine are retained. Redesigned compositions: dashboard, plan, three subject indices, lesson workspace, design studio and progress. Other screens receive shared typography, colors, forms and responsive fixes. No claim that every existing backend/security edge case has been audited.

Figma: personal team, file RyRsRXwb6v6O4vfD5nkfw8. Live homepage captured and visually inspected. No existing Code Connect files, local design-system variables or subscribed libraries were found. Available libraries were generic OS/Material kits, inappropriate for this direction. Georgia/Arial were not listed as available editable fonts by Figma's font discovery; the capture is the visual reference, not a completed native component library.

GitHub discovery returned no matching installed repository. Original study-app is not a Git repository. Work stayed local; nothing pushed, published or made public.

## QA record

- Existing core suite: 267/267 assertions pass after changes.
- New targeted lifecycle suite: reset before checking, retry after checking, result callback on repeated exercise, single scoring, return/back state, one active form, completion guard and keyboard navigation.
- New rendering suite: 14 pages and 5 lesson/project details; generated local calendar weekdays match dates.
- Real browser: reported MC reset sequence, wrong-answer retry, Back preserving answer and feedback, overview, search. Mobile 390px: 14 routes render without page-level failure or horizontal overflow after fixes.
- Further QA is recorded in the implementation handoff; do not imply that these checks cover all possible input and account states.

## Unresolved questions

- No access to authenticated paid competitor experiences; no claims about their hidden implementation.
- Existing instructional claims and source citations were preserved, not independently re-certified against the entire FHR syllabus.
- Personal aesthetic approval remains with the user. Unusual composition is a design choice, not an objective proof of quality.
