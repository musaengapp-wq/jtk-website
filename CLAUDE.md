# JTK Academy (Journey to Knowledge Academy) — Website

## What this is

Marketing site for **JTK Academy**, one-to-one online Qur'an and Arabic lessons. Every enquiry goes to WhatsApp (447933395159). There is no backend, no login and no database.

Production URL: **https://jtkacademy.com** (www and the journeytoknowledgeacademy.* domains are aliases on the same Vercel project).

Owner: Musa (non-technical). Copy, prices and the founder's story change only with his sign-off.

## Release rules

- **Source of truth is `main`.** Work on a feature branch, never commit straight to `main`.
- **Previews first.** Deploy a preview (`vercel deploy`, no `--prod`) and send Musa the link.
- **Production only after Musa writes "yes, go live".** Then merge to `main` and run `vercel --prod` from `main`.
- The Vercel project (`jtk-website`) is **not connected to Git**: pushing a branch deploys nothing. Previews and production are made with the Vercel CLI only. Preview URLs are behind Vercel login.

## Tech stack

React 19 + TypeScript + Vite 6 + Tailwind CSS v4 (`@tailwindcss/vite`, theme tokens in `tailwind.css` under `@theme`), lucide-react icons, Inter from Google Fonts.

## Pages (multi-page Vite build, one shared React app)

| Path | HTML file | `data-page` |
|---|---|---|
| `/` | `index.html` | `home` |
| `/learn-arabic-online` | `learn-arabic-online/index.html` | `arabic` |
| `/quran-lessons/adults` | `quran-lessons/adults/index.html` | `quranAdults` |
| `/quran-lessons/kids` (also `/quran-lessons/uk-families`) | `quran-lessons/kids/index.html` | `kids` |
| `/reverts-and-older-learners` | `reverts-and-older-learners/index.html` | `reverts` |
| `/sisters` | `sisters/index.html` | `sisters` |
| `/privacy`, `/terms`, `/safeguarding` | `<name>/index.html` | `privacy` / `terms` / `safeguarding` |
| anything else | `404.html` | `notFound` |

Each HTML file is a tiny shell: `<!-- jtk:head -->` and `<div id="root" data-page="…"><!-- jtk:fallback --></div>`. At build (and in dev) the `jtk-pages` plugin in `vite.config.ts` fills in the title, description, canonical, Open Graph tags, JSON-LD (home only) and a plain-HTML fallback (H1, sub-paragraph, WhatsApp link) from `content.ts`. `index.tsx` reads `data-page` and renders `<App page={…} />`.

To add a page: add it to `PAGES`/`LEGAL` in `content.ts`, create its HTML shell, add it to `PAGE_FILES` in `vite.config.ts`, and add it to `public/sitemap.xml`.

### File layout

```
content.ts        # ALL copy: per-page hero/sections/meta (PAGES), prices, FAQ, form, legal pages
flags.ts          # Content switches Musa decides (Madinah line, male teacher, teacher name, quotes, video…)
App.tsx           # Layout and shared sections (nav, hero, trial, programmes, prices, story, FAQ, footer…)
BookingForm.tsx   # The "Tell us a bit first" form
WhatsAppLink.tsx  # The one component every WhatsApp link uses (real href + tracked click)
whatsapp.ts       # wa.me link builder and "Found you on" source detection (sessionStorage)
enquiry.ts        # Form message format + send (window.open)
tracking.ts       # Google tag (loads only on jtkacademy.com / www) and click events
vercel.json       # cleanUrls, uk-families rewrite, short-link redirects
public/           # robots.txt, sitemap.xml, og-image.png, founder video
print/            # Old print flyer, kept in the repo but not deployed
verify-enquiry.cjs # node verify-enquiry.cjs — checks the form message; never sends anything
```

Page order (home and landing pages): Nav → Hero → page-specific section(s) → Trial (`#how-it-works`) → What we teach (`#programmes`) → Prices (`#pricing`) → Story (`#story`) → Keeping children safe (home, kids) → FAQ (`#faq`) → Form (`#book`) → Final CTA → Footer. Keep those anchor ids: Google Ads sitelinks use them.

## WhatsApp and tracking

- Every WhatsApp link is built by `whatsappUrl()` in `whatsapp.ts`: `https://wa.me/447933395159?text=<page message>`, plus a last line `Found you on: Google | TikTok | Facebook/Instagram` when the visit came from an ad click ID or `utm_source`. Click IDs and personal data never go in the message.
- Every WhatsApp link is a real `<a href>` with `onClick → trackWhatsAppClick("<page>:<position>")`, e.g. `kids:hero`.
- The Google Ads tag (`AW-17973797849`, conversion `AW-17973797849/V8QgCJOcm_4bENnHyfpC`) loads **only** on `jtkacademy.com` / `www.jtkacademy.com`, so previews and localhost never record conversions. No cookie banner, Consent Mode, GA4, TikTok or Meta pixel yet.
- `[CONFIRM-…]` markers (open decisions for Musa) are highlighted on previews and hidden on the live site.

## Running locally

```bash
npm ci
npm run dev       # http://localhost:3000 (use trailing slashes locally, e.g. /sisters/)
npm run build     # dist/
npm run preview   # serve dist/
node verify-enquiry.cjs
```

## Editing conventions

- No backend logic, auth or data stores.
- No new runtime dependencies without a good reason.
- UK English. Prices are "per 4 weeks", never "per month".
- Never use: "ijazah", "qualified", "certified", "experienced", "expert", "graduate", "programme director", "Most popular", testimonials, review counts, fake urgency, images of women, music. "University of Madinah" only in the one approved story sentence (behind `MADINAH_CONFIRMED`).
- Brand colours: use the `primary`, `primary-light`, `accent`, `dark` tokens in `tailwind.css`.
- The site is public: no secrets or tokens in source.
