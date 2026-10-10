export const WHATSAPP_NUMBER = '447933395159';
export const WHATSAPP_DISPLAY = '07933 395159';

export type VisitSource = 'Google' | 'TikTok' | 'Facebook/Instagram';

const SOURCE_KEY = 'jtk_visit_source';
let visitSource: VisitSource | null = null;

/** Works out where the visitor came from using the landing URL's ad click IDs or utm_source. */
export function sourceFromSearch(search: string): VisitSource | null {
  const params = new URLSearchParams(search);
  const utm = (params.get('utm_source') || '').trim().toLowerCase();
  if (params.has('gclid') || params.has('gbraid') || params.has('wbraid') || utm === 'google') return 'Google';
  if (params.has('ttclid') || utm === 'tiktok') return 'TikTok';
  if (params.has('fbclid') || utm === 'facebook' || utm === 'instagram') return 'Facebook/Instagram';
  return null;
}

/** Call once on load. Remembers the source for the rest of the visit (sessionStorage). */
export function initVisitSource(): VisitSource | null {
  if (typeof window === 'undefined') return null;
  const detected = sourceFromSearch(window.location.search);
  try {
    if (detected) {
      window.sessionStorage.setItem(SOURCE_KEY, detected);
    } else {
      visitSource = window.sessionStorage.getItem(SOURCE_KEY) as VisitSource | null;
    }
  } catch {
    // Storage can be blocked (private mode); the source then only lasts for this page.
  }
  if (detected) visitSource = detected;
  return visitSource;
}

export function getVisitSource(): VisitSource | null {
  return visitSource;
}

/** A last line like "Child's age: " that the visitor fills in after WhatsApp opens. */
const OPEN_QUESTION = /\n([^\n:]+: )$/;

/**
 * Adds the "Found you on" line when a source was detected. It goes last, or just above a last
 * open question (e.g. "Child's age: ") so the cursor lands on the question.
 * Never adds click IDs or personal data.
 */
export function withSourceLine(message: string, source: VisitSource | null = visitSource): string {
  if (!source) return message;
  const line = `Found you on: ${source}`;
  const question = message.match(OPEN_QUESTION);
  if (!question) return `${message}\n${line}`;
  return `${message.slice(0, question.index)}\n${line}\n${question[1]}`;
}

/** Builds every WhatsApp link on the site. */
export function whatsappUrl(message: string, source: VisitSource | null = visitSource): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(withSourceLine(message, source))}`;
}
