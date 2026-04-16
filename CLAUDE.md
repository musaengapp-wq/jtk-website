# Journey to Knowledge Academy — Website

## What this is

Marketing site for **Journey to Knowledge Academy**, an online 1-to-1 Qur'an and Arabic tuition service. The site is a single-page React app that presents the story, programmes, pricing, FAQ, and a booking form that routes enquiries to WhatsApp.

Production URL: **https://journeytoknowledgeacademy.co.uk**

The site is purely a lead-capture funnel — there is no backend, no authentication, no database. All "booking" goes through a WhatsApp deep link.

## Tech stack

- **React 19** (function components + hooks)
- **TypeScript**
- **Vite 6** (dev server + build)
- **Tailwind CSS v4** (via `@tailwindcss/vite` — no `tailwind.config.js`; theme tokens live in `tailwind.css` under `@theme`)
- **lucide-react** for icons
- **Google Fonts**: Inter (sans) + Amiri (Arabic)
- **Google Ads** conversion tag (`AW-17973797849`) loaded from `index.html`

### File layout

```
index.html        # Root document: meta/SEO/OG/JSON-LD, Google Ads, font + importmap
index.tsx         # React entry point; imports tailwind.css
tailwind.css      # @import "tailwindcss" + @theme tokens (primary, dark, arabic font, etc.)
App.tsx           # Single-file app: nav, hero, story, programmes, pricing, FAQ, booking, footer
vite.config.ts    # Vite config with react() + tailwindcss() plugins
```

All page content — story copy, programme list, pricing tiers, FAQ — is defined as inline constants at the top of `App.tsx`. Edit there for copy changes.

## Running locally

```bash
npm install
npm run dev       # Vite dev server on http://localhost:3000
npm run build     # Production build to dist/
npm run preview   # Serve the production build locally
```

No environment variables are required for the site itself. (The Vite config references `GEMINI_API_KEY` but nothing in the app currently uses it — legacy from the AI Studio scaffold.)

## Deployment

Deployed on **Vercel**. The `redesign` branch is the source of truth for the current look — pushes to `redesign` trigger a Vercel deployment. Production domain `journeytoknowledgeacademy.co.uk` is wired to that project.

The build command is the standard `npm run build`; output directory is `dist/`. No serverless functions, no edge config — static output only.

## WhatsApp booking form flow

The booking form (`BookingForm` component in `App.tsx`) never submits to a server. When the user submits:

1. Form state (`name`, `interest`, `times`, `message`) is formatted into a multi-line message string.
2. That message is `encodeURIComponent`-ed and appended as the `text` query param to `https://wa.me/447933395159`.
3. `window.open(..., '_blank')` is called, which opens WhatsApp (app or web) with the recipient and message pre-filled.
4. The prospect clicks **Send** on their end — that's the actual enquiry.

The business owner receives the message in WhatsApp and replies to book the free assessment lesson.

The WhatsApp number (`447933395159`) is hard-coded as `WHATSAPP_NUMBER` at the top of `App.tsx`. The floating bottom-right WhatsApp button and the final-CTA button both open the same `wa.me` URL *without* a pre-filled message.

## Editing conventions

- **Do not** add backend logic, auth, or data stores — the site is intentionally zero-infrastructure.
- **Do not** edit copy, pricing, or the founder's story without the owner's sign-off.
- Brand colours live in `tailwind.css` under `@theme` — use the `primary`, `primary-light`, `accent`, `dark` tokens rather than raw hex values where possible.
- The site is public — no secrets or tokens should ever land in committed source.
