const GOOGLE_TAG_ID = import.meta.env.VITE_GOOGLE_TAG_ID || 'AW-17973797849';
const GOOGLE_ADS_CONTACT_CONVERSION = import.meta.env.VITE_GOOGLE_ADS_CONTACT_CONVERSION || 'AW-17973797849/V8QgCJOcm_4bENnHyfpC';

// Only the live site records conversions. Previews and localhost never load the tag.
const PRODUCTION_HOSTS = ['jtkacademy.com', 'www.jtkacademy.com'];

declare global {
  interface ImportMetaEnv {
    readonly VITE_GOOGLE_TAG_ID?: string;
    readonly VITE_GOOGLE_ADS_CONTACT_CONVERSION?: string;
  }

  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }

  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

type TrackingParams = Record<string, string | number | boolean | undefined>;

export function isProductionHost(): boolean {
  return typeof window !== 'undefined' && PRODUCTION_HOSTS.includes(window.location.hostname);
}

export function initGoogleTag() {
  if (!isProductionHost() || !GOOGLE_TAG_ID || window.gtag) {
    return;
  }

  window.dataLayer = window.dataLayer || [];
  // gtag.js expects an Arguments object, not a rest-parameter Array.
  window.gtag = function () {
    window.dataLayer?.push(arguments);
  };
  window.gtag('set', 'allow_ad_personalization_signals', false);
  window.gtag('js', new Date());
  window.gtag('config', GOOGLE_TAG_ID, {
    page_title: document.title,
    page_path: window.location.pathname,
  });

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GOOGLE_TAG_ID)}`;
  document.head.appendChild(script);
}

export function trackEvent(eventName: string, params: TrackingParams = {}) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') {
    return;
  }

  const cleanedParams = Object.fromEntries(
    Object.entries(params).filter(([, value]) => value !== undefined)
  );

  window.gtag('event', eventName, cleanedParams);
}

export function trackCtaClick(location: string, target: string) {
  trackEvent('select_content', {
    content_type: 'cta',
    item_id: location,
    link_target: target,
  });
}

/** location is `${page}:${position}`, e.g. "kids:hero". */
export function trackWhatsAppClick(location: string) {
  // A click opens WhatsApp; it does not prove a message was sent or a booking made.
  trackEvent('whatsapp_click', {
    lead_source: 'whatsapp',
    event_category: 'lead',
    event_label: location,
    transport_type: 'beacon',
  });
  trackEvent('conversion', {
    send_to: GOOGLE_ADS_CONTACT_CONVERSION,
    value: 0,
    currency: 'GBP',
    event_category: 'lead',
    event_label: location,
    transport_type: 'beacon',
  });
}
