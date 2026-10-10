import { whatsappUrl } from './whatsapp';
import { trackWhatsAppClick } from './tracking';

export const LEARNER_OPTIONS = ['Myself', 'My child', 'Me and my child', 'More than one family member'] as const;

export const INTEREST_OPTIONS = [
  'Reading Arabic from the start (Noorani Qaida)',
  "Reading the Qur'an",
  'Tajweed',
  "Memorising the Qur'an",
  'Arabic language',
  'Not sure yet',
] as const;

export const LEVEL_OPTIONS = [
  "Complete beginner (I don't know the letters yet)",
  'I know the letters but read slowly',
  "I can read the Qur'an and want to improve (tajweed)",
  'I know some Arabic and want to go further',
] as const;

export type Enquiry = {
  name: string;
  learner: string;
  childAge: string;
  interest: string;
  level: string;
  times: string;
  message: string;
};

export function includesChild(learner: string): boolean {
  return learner === 'My child' || learner === 'Me and my child' || learner === 'More than one family member';
}

/** The text that arrives in Musa's WhatsApp. "Found you on" is added by whatsappUrl. */
export function buildEnquiryMessage(e: Enquiry): string {
  const childAge = includesChild(e.learner) ? e.childAge.trim() : '';
  return [
    `Assalamu alaikum! I'd like to book a free trial lesson.`,
    ``,
    `Name: ${e.name.trim()}`,
    `Lessons for: ${e.learner}`,
    childAge ? `Child's age: ${childAge}` : null,
    `Interested in: ${e.interest || 'Not sure yet'}`,
    `Level: ${e.level}`,
    e.times.trim() ? `Preferred times: ${e.times.trim()}` : null,
    e.message.trim() ? `Message: ${e.message.trim()}` : null,
  ].filter((line) => line !== null).join('\n');
}

/** Records one conversion and opens WhatsApp. Returns the link so the page can offer a fallback. */
export function sendEnquiry(e: Enquiry, page: string): string {
  const url = whatsappUrl(buildEnquiryMessage(e));
  trackWhatsAppClick(`${page}:form_submit`);
  window.open(url, '_blank', 'noopener,noreferrer');
  return url;
}
