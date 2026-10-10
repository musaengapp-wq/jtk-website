import path from 'path';
import { defineConfig, Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import {
  PageKey, SITE_URL, JSON_LD_DESCRIPTION, PAGES, LEGAL, NOT_FOUND,
  isLanding, isLegal, pageMeta, pageMessage,
} from './content';
import { whatsappUrl } from './whatsapp';

// Every page is its own HTML file sharing one React app (see index.tsx).
const PAGE_FILES: Record<string, string> = {
  home: 'index.html',
  arabic: 'learn-arabic-online/index.html',
  quranAdults: 'quran-lessons/adults/index.html',
  kids: 'quran-lessons/kids/index.html',
  reverts: 'reverts-and-older-learners/index.html',
  sisters: 'sisters/index.html',
  privacy: 'privacy/index.html',
  terms: 'terms/index.html',
  safeguarding: 'safeguarding/index.html',
  notFound: '404.html',
};

const OG_IMAGE = `${SITE_URL}/og-image.png`;

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function headFor(page: PageKey): string {
  const meta = pageMeta(page);
  const url = `${SITE_URL}${meta.path || '/'}`;
  const lines = [
    `<meta charset="UTF-8" />`,
    `<meta name="viewport" content="width=device-width, initial-scale=1.0" />`,
    `<title>${esc(meta.title)}</title>`,
    `<meta name="description" content="${esc(meta.description)}" />`,
    meta.noindex ? `<meta name="robots" content="noindex" />` : `<link rel="canonical" href="${url}" />`,
    `<meta property="og:title" content="${esc(meta.title)}" />`,
    `<meta property="og:description" content="${esc(meta.description)}" />`,
    `<meta property="og:type" content="website" />`,
    meta.noindex ? '' : `<meta property="og:url" content="${url}" />`,
    `<meta property="og:site_name" content="JTK Academy" />`,
    `<meta property="og:locale" content="en_GB" />`,
    `<meta property="og:image" content="${OG_IMAGE}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="JTK Academy: online Qur'an and Arabic lessons" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(meta.title)}" />`,
    `<meta name="twitter:description" content="${esc(meta.description)}" />`,
    `<meta name="twitter:image" content="${OG_IMAGE}" />`,
    `<link rel="preconnect" href="https://fonts.googleapis.com" />`,
    `<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />`,
    `<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />`,
  ];
  if (page === 'home') {
    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'EducationalOrganization',
      name: 'Journey to Knowledge Academy',
      alternateName: 'JTK Academy',
      url: `${SITE_URL}/`,
      description: JSON_LD_DESCRIPTION,
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        telephone: '+44-7933-395159',
        availableLanguage: ['English', 'Arabic'],
      },
    };
    lines.push(`<script type="application/ld+json">${JSON.stringify(jsonLd, null, 2)}</script>`);
  }
  return lines.filter(Boolean).join('\n    ');
}

/** Plain HTML shown before React loads (and to anything that doesn't run JavaScript). */
function fallbackFor(page: PageKey): string {
  const link = (text: string) =>
    `<p><a href="${esc(whatsappUrl(pageMessage(page), null))}">${esc(text)}</a></p>`;
  let body: string;
  if (isLanding(page)) {
    const p = PAGES[page];
    body = `<p>${esc(p.eyebrow)}</p><h1>${esc(p.h1)}</h1><p>${esc(p.sub)}</p>${link(p.button)}`;
  } else if (isLegal(page)) {
    const l = LEGAL[page];
    body = `<h1>${esc(l.h1)}</h1><p>${esc(l.intro)}</p>${link('Book my free trial on WhatsApp')}`;
  } else {
    body = `<h1>${esc(NOT_FOUND.h1)}</h1><p>${esc(NOT_FOUND.p)}</p>${link(NOT_FOUND.button)}<p><a href="/">${esc(NOT_FOUND.home)}</a></p>`;
  }
  return `<main style="max-width:48rem;margin:0 auto;padding:6rem 1rem 3rem">${body}</main>`;
}

function jtkPages(): Plugin {
  return {
    name: 'jtk-pages',
    transformIndexHtml: {
      order: 'pre',
      handler(html) {
        const match = html.match(/data-page="([^"]+)"/);
        if (!match) return html;
        const page = match[1] as PageKey;
        return html
          .replace('<!-- jtk:head -->', headFor(page))
          .replace('<!-- jtk:fallback -->', fallbackFor(page));
      },
    },
  };
}

export default defineConfig({
  appType: 'mpa',
  server: {
    port: 3000,
    host: '0.0.0.0',
  },
  plugins: [jtkPages(), react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    },
  },
  build: {
    rollupOptions: {
      input: Object.fromEntries(
        Object.entries(PAGE_FILES).map(([key, file]) => [key, path.resolve(__dirname, file)])
      ),
    },
  },
});
