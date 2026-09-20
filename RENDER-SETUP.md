# Wunderatlas on Render

Deploy the whole Node application, including its interface and API, as one web service. The blueprint uses a paid Starter service and a 1 GB persistent disk in Frankfurt. Review Render's current price before creating it. No paid resource is created merely by committing this file.

1. Create an account at https://dashboard.render.com/register and sign in.
2. Open https://dashboard.render.com/select-repo?type=blueprint and connect `tomuki/wunderatlas`. Select branch `main` and its `render.yaml`.
3. Fill `GEMINI_API_KEY` directly in Render with your Gemini key. Do not paste it into chat or GitHub. Set `AI_ALLOWED_EMAILS` to the email you will use to register in Wunderatlas; multiple addresses can be separated by commas. This is a server-only access list, not an automatically created account.
4. Review the service and disk price, then create the Blueprint. Wait for the deployment to become Live.
5. In the Render service's Environment page, copy the automatically generated `REGISTRATION_CODE`. Open the HTTPS address Render assigns. Register your Wunderatlas account with the allowed email and paste this code in “Einladungscode”. Keep the code private. The public site requires login for AI; unrelated accounts cannot spend the Gemini quota.
6. In a mathematics task enter a solution and choose “Rechenweg mit KI prüfen”. Verify a Gemini response with eight criteria. In the profile, “Gemini konfiguriert” alone only confirms presence of a key.

The repository's production code has no third-party runtime dependencies, so the build checks syntax and starts Node directly. Render supplies PORT. DATA_DIR points to the persistent disk: do not remove the disk or scale this JSON-file store to multiple instances. Localhost settings continue to work separately.

## Existing progress

GitHub Pages, localhost and the new Render address have separate browser storage. Before moving, export your profile/progress using the existing export control, then import it on the new site. Keep the original export as a backup and check your work after importing. Local user accounts are not automatically copied to Render. Not every project artifact is synchronized between devices.

## Verification after deployment

- `/healthz` returns `{ "ok": true }`.
- The library, projects and exams load on the Render URL.
- Registration and login work over HTTPS; the session cookie has Secure and HttpOnly.
- Anonymous and unlisted users cannot use `/api/ai`.
- A permitted user receives an actual Gemini review.
- Restart the Render service and verify the account still exists on disk.
- `/.env.local`, `/data/users.json` and `/server.js` return 404.

GitHub Pages remains available; it is not the AI-enabled address. Do not redirect it until the new service has passed these checks.

References: https://render.com/docs/blueprint-spec and https://render.com/docs/disks
