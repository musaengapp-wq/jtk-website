# Changelog

## 2026-10-08 — Recover live source into GitHub
- Imported the source that is live on jtkacademy.com (deployed from Vercel CLI on 6 Oct 2026 out of a Codex working folder, never pushed).
- Verified: `npm run build` from this commit produces a JS bundle byte-identical to the live `index-B7Dkg_pL.js`. CSS differs only by unused utilities (`.visible`, blur vars) picked up from stray files in the old folder.
- Includes 'Meet Musa' founder video (`public/media/`), booking-form fields 'Who are lessons for?' and 'Preferred lesson option', Google Ads tag AW-17973797849 and WhatsApp conversion event.
- From now on: deploy only from this repo's `main`. Older copies (~/JTK_Website, ~/Projects/jtk-website, the Codex folder) are retired.
