// All site copy lives here. UK English. Prices are per 4 weeks.
// This file is also read by vite.config.ts to write each page's <head> and fallback HTML,
// so keep it plain data: no React, no icons.
import {
  ARABIC_GRAMMAR_CONFIRMED,
  MADINAH_CONFIRMED,
  MALE_TEACHER_AVAILABLE,
} from './flags';

export const SITE_URL = 'https://jtkacademy.com';

export type PageKey =
  | 'home' | 'arabic' | 'quranAdults' | 'kids' | 'reverts' | 'sisters'
  | 'privacy' | 'terms' | 'safeguarding' | 'notFound';

export type LandingKey = 'home' | 'arabic' | 'quranAdults' | 'kids' | 'reverts' | 'sisters';
export type LegalKey = 'privacy' | 'terms' | 'safeguarding';

export const LANDING_KEYS: LandingKey[] = ['home', 'arabic', 'quranAdults', 'kids', 'reverts', 'sisters'];
export const LEGAL_KEYS: LegalKey[] = ['privacy', 'terms', 'safeguarding'];

export function isLanding(page: PageKey): page is LandingKey {
  return (LANDING_KEYS as PageKey[]).includes(page);
}

export function isLegal(page: PageKey): page is LegalKey {
  return (LEGAL_KEYS as PageKey[]).includes(page);
}

export type Meta = {
  /** Path without a trailing slash; '' for home. */
  path: string;
  title: string;
  description: string;
  noindex?: boolean;
};

// ---------------------------------------------------------------------------
// Shared button text and WhatsApp messages

export const BUTTON_SMALL_LINE = 'No card needed. Musa replies to every message personally.';
export const FORM_LINK_TEXT = 'Prefer a form? Tell us a bit first';
export const DEFAULT_BUTTON = 'Book my free trial on WhatsApp';
export const HOME_MESSAGE = "Assalamu alaikum, I'd like to book a free trial lesson.";

// ---------------------------------------------------------------------------
// Page-specific sections

export type PageSection =
  | { type: 'audienceCards'; h2: string; cards: { title: string; text: string; link: string; href: string }[] }
  | { type: 'steps'; h2: string; steps: { lead: string; text: string }[] }
  | { type: 'bullets'; h2: string; intro?: string; bullets: string[] }
  | { type: 'cards'; h2: string; cards: { title: string; text: string }[]; closing?: string }
  | { type: 'qa'; h2: string; items: { q: string; a: string; link?: { text: string; href: string } }[] }
  | { type: 'musaQuote'; text: string };

export type LandingPage = {
  meta: Meta;
  eyebrow: string;
  h1: string;
  sub: string;
  ticks: string[];
  button: string;
  message: string;
  /** Default answer for "Who are the lessons for?" in the form. */
  defaultLearner: string;
  sections: PageSection[];
  /** Show "Keeping children safe" near the FAQ. */
  childSafety: boolean;
};

export const PAGES: Record<LandingKey, LandingPage> = {
  home: {
    meta: {
      path: '',
      title: 'Online Qur\'an & Arabic Lessons, One-to-One | JTK Academy',
      description: 'One-to-one online Qur\'an and Arabic lessons for adults and children. Total beginners welcome. Female teacher available. Free 30-minute trial. From £30 per 4 weeks.',
    },
    eyebrow: 'Online one-to-one lessons for adults and children',
    h1: "Learn to read Arabic and the Qur'an, one-to-one",
    sub: 'Patient online lessons with your own native Arabic-speaking teacher. Start from the very first letter, or build on what you already know.',
    ticks: ['Free 30-minute trial', 'Female teacher available', 'Total beginners welcome', 'From £30 per 4 weeks'],
    button: DEFAULT_BUTTON,
    message: HOME_MESSAGE,
    defaultLearner: '',
    childSafety: true,
    sections: [
      {
        type: 'audienceCards',
        h2: 'Who we teach',
        cards: [
          { title: 'Adults starting Arabic', text: 'Learn to read and understand Arabic, from the alphabet up.', link: 'Arabic lessons for adults →', href: '/learn-arabic-online' },
          { title: 'Reverts and older learners', text: "It's never too late. Gentle lessons at your pace.", link: 'Start from the beginning →', href: '/reverts-and-older-learners' },
          { title: 'Sisters', text: "Learn Qur'an and Arabic with a female teacher, one-to-one.", link: 'Learn with a female teacher →', href: '/sisters' },
          { title: 'Children', text: "Qur'an lessons that fit around school, with a parent nearby.", link: "Qur'an lessons for children →", href: '/quran-lessons/kids' },
        ],
      },
    ],
  },

  arabic: {
    meta: {
      path: '/learn-arabic-online',
      title: 'Learn Arabic Online: One-to-One Lessons for Adults | JTK Academy',
      description: 'Learn Arabic online with your own native Arabic-speaking teacher. Start from the alphabet or build on what you know. Free 30-minute trial. From £30 per 4 weeks.',
    },
    eyebrow: 'Arabic lessons for adults',
    h1: 'Learn Arabic online with your own teacher',
    sub: 'One-to-one lessons with a native Arabic speaker, at a pace that suits adults. Start from the alphabet, or build on what you already know.',
    ticks: ['Free 30-minute trial', 'Total beginners welcome', 'Female teacher available', 'From £30 per 4 weeks'],
    button: DEFAULT_BUTTON,
    message: "Assalamu alaikum, I'd like to book a free trial Arabic lesson for myself.",
    defaultLearner: 'Myself',
    childSafety: false,
    sections: [
      {
        type: 'steps',
        h2: 'How your Arabic grows, step by step',
        steps: [
          { lead: 'Letters and sounds.', text: 'Read and write every letter, with the short vowel marks, until they feel familiar.' },
          { lead: 'Reading.', text: 'Join letters into words and read with confidence, using the Noorani Qaida, a step-by-step reading book.' },
          { lead: 'Words and meaning.', text: 'Build everyday and Qur\'anic vocabulary, so what you read starts to make sense.' },
          ARABIC_GRAMMAR_CONFIRMED
            ? { lead: 'Grammar, explained simply.', text: 'Learn how Arabic sentences work, in plain English, one small step at a time.' }
            : { lead: 'Next steps, planned with you.', text: 'Once you can read comfortably, your teacher plans what comes next: vocabulary, writing and understanding.' },
        ],
      },
      {
        type: 'bullets',
        h2: 'Why one-to-one works for adults',
        bullets: [
          'No class to keep up with. Your teacher goes at your pace.',
          'Ask anything, as often as you need. No question is too basic.',
          "Lessons at times that fit around work and family: daytime, evenings or weekends, depending on the teacher's free slots.",
          '30-minute or 60-minute lessons, from once to four times a week.',
        ],
      },
      {
        type: 'musaQuote',
        text: "I've been learning Arabic as an adult for years, and I've done a lot of courses. What helped most was a patient teacher and a clear next step. That's what we give you at JTK.",
      },
    ],
  },

  quranAdults: {
    meta: {
      path: '/quran-lessons/adults',
      title: "Qur'an Lessons for Adults, Online and One-to-One | JTK Academy",
      description: "Learn to read the Qur'an at your own pace, from the first letters to tajweed. One-to-one online lessons. Female teacher available. Free 30-minute trial.",
    },
    eyebrow: "Qur'an lessons for adults",
    h1: "Learn to read the Qur'an, at your own pace",
    sub: 'Patient one-to-one lessons for adults, from the very first letters to reading with tajweed. Just you and your teacher, with no class to keep up with.',
    ticks: ['Free 30-minute trial', 'Start from the letters', 'Female teacher available', 'From £30 per 4 weeks'],
    button: DEFAULT_BUTTON,
    message: "Assalamu alaikum, I'd like to book a free trial Qur'an lesson for myself.",
    defaultLearner: 'Myself',
    childSafety: false,
    sections: [
      {
        type: 'cards',
        h2: "Wherever you're starting from",
        cards: [
          { title: 'Never learned to read Arabic?', text: "You start with the letters and their sounds, then the Noorani Qaida, step by step, until you can read the Qur'an." },
          { title: 'Read slowly, or unsure of your pronunciation?', text: 'Your teacher listens as you read and corrects you gently.' },
          { title: 'Already reading?', text: 'Learn the main tajweed rules and practise them with your teacher, or start memorising.' },
        ],
        closing: "Didn't get the chance to learn properly as a child? Many adults are in the same position. It's never too late to start.",
      },
    ],
  },

  reverts: {
    meta: {
      path: '/reverts-and-older-learners',
      title: 'Arabic for Reverts and Older Learners | JTK Academy',
      description: "Always wanted to learn Arabic? It's never too late. Gentle one-to-one lessons from the alphabet. Female teacher available. Free 30-minute trial.",
    },
    eyebrow: 'For reverts and older learners',
    h1: "Always wanted to learn Arabic? It's never too late.",
    sub: "Gentle one-to-one lessons for adults starting from zero, whether you're new to Islam or have meant to learn for years. Start with the alphabet and learn to read the Qur'an, step by step.",
    ticks: ['Start from the alphabet', 'Female teacher available', 'Free 30-minute trial', 'From £30 per 4 weeks'],
    button: DEFAULT_BUTTON,
    message: "Assalamu alaikum, I'd like to book a free trial lesson. I'm starting from the beginning.",
    defaultLearner: 'Myself',
    childSafety: false,
    sections: [
      {
        type: 'bullets',
        h2: "You won't be rushed",
        intro: "Many people come to us after years of putting it off, or after trying apps that didn't stick. One-to-one lessons mean nobody rushes you and nobody judges you. Your teacher goes at your pace, repeats things as often as you need, and you can ask anything.",
        bullets: [
          "Start with the letters. You don't need to know any Arabic.",
          'Short 30-minute lessons if you prefer, or a full hour.',
          "Daytime lessons can be arranged, depending on the teacher's free slots.",
          "Not confident with technology? We'll help you set up Zoom before your first lesson. A phone, tablet or laptop is all you need.",
        ],
      },
      {
        type: 'musaQuote',
        text: "I came to Islam and started learning Arabic as an adult, so I know what it feels like to begin from nothing. Take the first step, and we'll help you with every one after it.",
      },
    ],
  },

  sisters: {
    meta: {
      path: '/sisters',
      title: "Qur'an & Arabic with a Female Teacher, Online | JTK Academy",
      description: "One-to-one online Qur'an and Arabic lessons for sisters, with a female teacher. Total beginners welcome. Free 30-minute trial. From £30 per 4 weeks.",
    },
    eyebrow: 'For sisters',
    h1: "Learn Qur'an and Arabic with a female teacher",
    sub: 'One-to-one online lessons for sisters, taught by a sister from Egypt who is a native Arabic speaker. Start from the letters or improve your recitation, at times that fit around home, work and family.',
    ticks: ['Taught by a sister', 'Free 30-minute trial', 'Total beginners welcome', 'From £30 per 4 weeks'],
    button: 'Book a free trial with a female teacher',
    message: "Assalamu alaikum, I'd like to book a free trial lesson with a female teacher.",
    defaultLearner: 'Myself',
    childSafety: false,
    sections: [
      {
        type: 'bullets',
        h2: 'Learn with peace of mind',
        bullets: [
          'One-to-one: just you and your teacher.',
          "Lessons on JTK's own Zoom account, and all messages through JTK's WhatsApp number, never a personal number.",
          'Learn to read from the very first letter, improve your recitation and tajweed, or start memorising.',
          'Learning with your daughters? Your teacher can teach them too, and each extra learner in the family gets 10% off.',
        ],
      },
    ],
  },

  kids: {
    meta: {
      path: '/quran-lessons/kids',
      title: "Online Qur'an Classes for Kids, One-to-One | JTK Academy",
      description: "One-to-one online Qur'an lessons for children, from Noorani Qaida to reading the Qur'an. Female teacher available. Free 30-minute trial. From £32 per 4 weeks.",
    },
    eyebrow: "Qur'an lessons for children",
    h1: "Online Qur'an lessons for your child, one-to-one",
    sub: "Patient lessons with a native Arabic-speaking teacher, from the first letters (Noorani Qaida) to reading the Qur'an. Short 30-minute lessons that fit around school.",
    ticks: ['Free 30-minute trial', 'Female teacher available', '2 lessons a week from £32 per 4 weeks'],
    button: 'Book a free trial for my child',
    message: "Assalamu alaikum, I'd like to book a free trial Qur'an lesson for my child.\nChild's age: ",
    defaultLearner: 'My child',
    childSafety: true,
    sections: [
      {
        type: 'qa',
        h2: 'What parents ask us',
        items: [
          {
            q: 'Is it safe?',
            a: "Lessons are on JTK's own Zoom account, and all messages go through JTK's WhatsApp number, never a teacher's personal number. For children under 12, a parent or guardian stays nearby during lessons. Lessons are only recorded with your consent.",
            link: { text: 'Read our safeguarding policy →', href: '/safeguarding' },
          },
          { q: 'Is there a female teacher for girls?', a: 'Yes. Our current teacher is a sister.' },
          { q: 'How will I know my child is progressing?', a: "After your child's 4th lesson you get a short progress note, then one every 4 weeks." },
          { q: 'What times?', a: "After school, evenings and weekends, depending on the teacher's free slots. After-school times fill first, so tell us which times suit you when you message." },
          { q: 'How long are lessons?', a: 'Most children do best with two or three 30-minute lessons a week. Short, frequent lessons help the letters stick.' },
          { q: 'More than one child?', a: 'Each extra child gets 10% off, and lessons can be back to back.' },
        ],
      },
    ],
  },
};

// ---------------------------------------------------------------------------
// Trial section (id="how-it-works")

export const TRIAL = {
  eyebrow: 'Free trial',
  h2: 'Your free 30-minute trial: what happens',
  steps: [
    { lead: 'Message us on WhatsApp.', text: "Tell us who the lessons are for and what you'd like to learn. We'll offer you some times that suit you." },
    { lead: 'Get your Zoom link.', text: "We send it with a reminder the evening before and an hour before. New to Zoom? We'll help you set it up." },
    { lead: 'Have your trial lesson.', text: '30 minutes on Zoom: a few minutes about your goals, about 15 minutes of real teaching so you leave having learned something, a gentle check of your level (no test), then a short chat about a plan. For children, a parent stays nearby.' },
    { lead: 'Decide in your own time.', text: "Afterwards we send you a short note on your level and the plan we'd suggest. The trial is free, with no card details and no obligation." },
  ],
};

// ---------------------------------------------------------------------------
// What we teach (id="programmes")

export const PROGRAMMES_COPY = {
  eyebrow: 'What we teach',
  h2: 'What would you like to learn?',
  items: [
    { key: 'read', title: 'Read Arabic from the start', points: ['The letters, their sounds and the vowel marks', 'Joining letters and reading words with the Noorani Qaida', 'Made for complete beginners'] },
    { key: 'quran', title: "Read the Qur'an", points: ['Read at your level, with your teacher listening', 'Gentle correction of your pronunciation', 'Build fluency week by week'] },
    { key: 'tajweed', title: 'Tajweed', points: ['The main tajweed rules, explained simply', 'Practise them with your teacher', 'Personal correction as you recite'] },
    { key: 'hifz', title: "Memorise the Qur'an", points: ['Memorise at a pace that suits you', 'A simple revision routine', "Help to keep what you've learned"] },
    { key: 'arabic', title: 'Arabic language', points: ['Reading, writing and vocabulary', ARABIC_GRAMMAR_CONFIRMED ? 'Grammar, step by step' : 'Writing and vocabulary, step by step', 'Understand more of what you read'] },
  ],
};

// ---------------------------------------------------------------------------
// Prices (id="pricing"). Starter £16 is deliberately not shown.

export type Plan = { id: string; title: string; price: number; sessions: string; suggestion?: boolean };
export type PriceTrack = { key: '30' | '60'; tab: string; note: string; plans: Plan[] };

export const PRICE_TRACKS: PriceTrack[] = [
  {
    key: '30',
    tab: '30-minute lessons',
    note: 'Short, frequent lessons suit beginners and children: the letters stick better. £8 an hour.',
    plans: [
      { id: '30-2', title: '2 lessons a week', price: 32, sessions: 'Two 30-minute lessons each week' },
      { id: '30-3', title: '3 lessons a week', price: 48, sessions: 'Three 30-minute lessons each week', suggestion: true },
      { id: '30-4', title: '4 lessons a week', price: 64, sessions: 'Four 30-minute lessons each week' },
    ],
  },
  {
    key: '60',
    tab: '60-minute lessons',
    note: 'Longer lessons suit adults who want more time to practise. £7.50 an hour.',
    plans: [
      { id: '60-1', title: 'Once a week', price: 30, sessions: 'One 60-minute lesson each week' },
      { id: '60-2', title: 'Twice a week', price: 60, sessions: 'Two 60-minute lessons each week' },
      { id: '60-3', title: '3 times a week', price: 90, sessions: 'Three 60-minute lessons each week' },
    ],
  },
];

export const PRICING_COPY = {
  eyebrow: 'Prices',
  h2: 'Simple prices, paid every 4 weeks',
  intro: "All lessons are one-to-one. Start with a free 30-minute trial. You don't need to choose a plan until afterwards.",
  per: 'per 4 weeks',
  suggestion: 'Our suggestion',
  cardButton: 'Start with a free trial',
  payment: { lead: 'How payment works:', text: 'You pay by card every 4 weeks, before your lessons. Each payment covers exactly 4 weeks of lessons (13 payments a year). Cancel any time before your next payment.' },
  family: { lead: 'Learning as a family?', text: 'Each extra learner in the same family gets 10% off.' },
  founding: 'Founding families: the first 10 families to join keep their price for 12 months.',
  schedule: 'Need a different schedule? Tell us when you message.',
};

// ---------------------------------------------------------------------------
// Story (id="story")

export const STORY = {
  eyebrow: 'Our story',
  h2: 'Meet Musa, the founder',
  p1: 'Musa came to Islam and has spent years learning Arabic as an adult, through many courses. He knows how it feels to start from nothing, and how easy it is to give up without a patient teacher and a clear next step.',
  p1b: MADINAH_CONFIRMED ? "He spent six years at the Islamic University of Madinah, including two years in the Faculty of Da'wah." : '',
  p2: 'He started JTK to give every learner both: one-to-one lessons with a real teacher, and a plan that fits your level.',
  p3: "Musa isn't your teacher. He looks after you: a welcome message after your trial, a check-in every 4 weeks, and help whenever you get stuck.",
  videoCaption: 'A 47-second hello from Musa. Press play to hear his story.',
  teacherH3: 'Your teacher',
  teacherText: 'Lessons are taught by a sister from Egypt who is a native Arabic speaker. She teaches children and sisters, from the first letters with the Noorani Qaida to reading the Qur\'an' + (ARABIC_GRAMMAR_CONFIRMED ? ' and beginner Arabic.' : '.'),
  maleTeacher: MALE_TEACHER_AVAILABLE ? 'Brothers can ask for a male teacher.' : '',
  whatYouGetH3: 'What you get',
  whatYouGet: [
    'One-to-one lessons with a native Arabic-speaking teacher',
    'A female teacher for sisters and children',
    'A free 30-minute trial before you pay anything',
    'A progress note after lesson 4, then every 4 weeks',
    'Personal check-ins from Musa',
    'Simple prices, paid every 4 weeks; cancel before your next payment',
  ],
};

// ---------------------------------------------------------------------------
// Keeping children safe (home and kids)

export const CHILD_SAFETY = {
  h3: 'Keeping children safe',
  bullets: [
    "Lessons are one-to-one on JTK's own Zoom account, never a teacher's personal account.",
    "All messages go through the JTK WhatsApp number. Teachers don't contact families on personal numbers.",
    'Children under 12 have a parent or guardian present or within earshot during lessons.',
    "Lessons are only recorded with a parent's consent.",
    'Musa is the named safeguarding contact. Message the JTK WhatsApp any time.',
  ],
  link: 'Read our safeguarding policy →',
};

// ---------------------------------------------------------------------------
// FAQ (id="faq")

export type Faq = { q: string; a: string; link?: { text: string; href: string } };

export const FAQ_COPY = { eyebrow: 'Questions', h2: 'Frequently asked questions' };

export const FAQS: Faq[] = [
  { q: "I'm a complete beginner. I don't even know the letters. Can I start?", a: "Yes. Many of our learners start from zero. Your teacher begins with the letters and their sounds, then moves on to joining letters and reading, using the Noorani Qaida, a step-by-step beginner's reading book. You go at your own pace." },
  { q: 'Am I too old to learn?', a: 'No. Adults of every age learn to read Arabic. One-to-one lessons mean nobody rushes you, you can repeat things as often as you need, and you can ask anything. Our founder, Musa, learned as an adult himself.' },
  { q: 'Is there a female teacher?', a: 'Yes. Our current teacher is a sister, so sisters and children can learn with a female teacher. Tell us your preference when you message.' + (MALE_TEACHER_AVAILABLE ? ' Brothers can ask for a male teacher.' : '') },
  { q: 'What happens in the free trial?', a: "It's 30 minutes on Zoom: a few minutes about your goals, about 15 minutes of real teaching, a gentle check of your level and a short chat about a plan that suits you. Afterwards we send you a short note on your level and our suggestion. It's free, with no card details and no obligation." },
  { q: 'How much are lessons?', a: "You pay every 4 weeks. 30-minute lessons: 2 a week £32, 3 a week £48, 4 a week £64. 60-minute lessons: once a week £30, twice a week £60, three times a week £90. That's £8 an hour for 30-minute lessons and £7.50 an hour for 60-minute lessons. Each payment covers exactly 4 weeks of lessons, so there are 13 payments a year." },
  { q: 'How do I pay, and can I cancel?', a: "You pay by card every 4 weeks, before your lessons. You can cancel any time before your next payment and you won't be charged again. If you change your mind within 14 days of signing up, you're refunded for any lessons you haven't had. To move a lesson, give us 24 hours' notice. If your teacher has to cancel, you get a make-up lesson." },
  { q: "Are lessons on Zoom? I'm not very good with technology.", a: "Yes. Lessons are on Zoom, on JTK's own account. You can join on a phone, tablet or laptop. If you've never used Zoom, we'll help you set it up before your trial, step by step." },
  { q: 'What times are lessons?', a: "We arrange times with you: weekday daytime, after school, evenings and weekends, depending on the teacher's free slots. Your teacher is in Egypt, but every time we give you is in UK time. Tell us what suits you and we'll offer you real times." },
  { q: 'Who will teach me or my child?', a: 'A sister from Egypt who is a native Arabic speaker. Musa, our founder, looks after every learner personally: a welcome after your trial, a check-in every 4 weeks, and help if you get stuck.' },
  { q: 'How do you keep children safe?', a: "Lessons are on JTK's own Zoom account, never a teacher's personal one. All messages go through the JTK WhatsApp number. Children under 12 have a parent or guardian nearby during lessons, and lessons are only recorded with a parent's consent. Musa is the named contact for any concern.", link: { text: 'See our safeguarding page for more.', href: '/safeguarding' } },
  { q: "How will I know I'm making progress?", a: "After your 4th lesson you get a short progress note: what you've learned and what comes next. Then you get another every 4 weeks." },
  { q: 'Can more than one person in my family learn?', a: 'Yes. Each extra learner in the same family gets 10% off their plan, and lessons can be arranged back to back.' },
];

// ---------------------------------------------------------------------------
// Form (id="book")

export const FORM_COPY = {
  eyebrow: 'Free trial',
  h2: 'Tell us a bit first',
  intro: 'Fill this in and WhatsApp will open with your message ready to send. Prefer to just message us?',
  introLink: 'Book my free trial on WhatsApp',
  button: 'Send my request on WhatsApp',
  under: "WhatsApp will open with your message ready. Tap Send there, and we'll reply to arrange your free trial. If WhatsApp doesn't open, message us on 07933 395159.",
  afterSubmit: "WhatsApp should be opening now. If it didn't,",
  afterSubmitLink: 'tap here to open it',
};

// ---------------------------------------------------------------------------
// Final CTA, footer, 404

export const FINAL_CTA = {
  h2: 'Ready to take the first step?',
  p: 'Book a free 30-minute trial. No card needed and no obligation. Musa will reply personally on WhatsApp.',
};

export const FOOTER = {
  about: 'JTK Academy (Journey to Knowledge Academy) teaches Qur\'an and Arabic one-to-one online, to adults and children in the UK.',
  links: [
    { text: 'Prices', href: '/#pricing' },
    { text: 'Free trial', href: '/#how-it-works' },
    { text: 'FAQs', href: '/#faq' },
    { text: 'Safeguarding', href: '/safeguarding' },
    { text: 'Terms', href: '/terms' },
    { text: 'Privacy', href: '/privacy' },
  ],
  contact: 'WhatsApp 07933 395159',
};

export const NOT_FOUND = {
  meta: { path: '/404', title: 'Page not found | JTK Academy', description: 'Sorry, we couldn\'t find that page. Book a free 30-minute trial or go to the JTK Academy homepage.', noindex: true } as Meta,
  h1: "Sorry, we couldn't find that page",
  p: 'It may have moved. You can still book a free 30-minute trial, or go to our homepage.',
  button: DEFAULT_BUTTON,
  home: 'Go to the homepage',
};

// ---------------------------------------------------------------------------
// Legal pages. Items marked `confirm` show a highlighted [CONFIRM-…] marker on previews only.

export const LAST_UPDATED = '10 October 2026';

export type LegalItem = { heading: string; text: string; confirm?: string; after?: string };

export const LEGAL: Record<LegalKey, { meta: Meta; h1: string; intro: string; updated: boolean; items: LegalItem[] }> = {
  terms: {
    meta: { path: '/terms', title: 'Terms of lessons | JTK Academy', description: 'How JTK Academy lessons work: the free trial, paying every 4 weeks, cancelling, moving a lesson and complaints.' },
    h1: 'Terms of lessons',
    intro: 'How our lessons, payments and cancellations work, in plain words.',
    updated: true,
    items: [
      { heading: 'Who we are', text: 'JTK Academy (Journey to Knowledge Academy).', confirm: 'CONFIRM-ADDRESS: trading name and contact address', after: 'Contact: WhatsApp 07933 395159.' },
      { heading: 'Free trial', text: 'One free 30-minute trial per learner. No payment details needed.' },
      { heading: 'Payment', text: 'You pay by card every 4 weeks, in advance, through Stripe. Each payment covers 4 weeks of lessons. No interest, no late fees and no buy-now-pay-later.' },
      { heading: 'Cooling-off', text: "You can cancel within 14 days of signing up. If lessons have started at your request, you're refunded for the lessons you haven't had." },
      { heading: 'Cancelling', text: "Cancel any time before your next payment date and you won't be charged again. Your lessons continue until the end of the 4 weeks you've paid for." },
      { heading: 'Moving or missing a lesson', text: "Give at least 24 hours' notice to move a lesson. A lesson missed without 24 hours' notice counts as taught, because the teacher's time was reserved for you. If your teacher cancels, you get a make-up lesson or a refund for that lesson." },
      { heading: 'Children', text: 'A parent or guardian books and pays, and stays nearby during lessons for under-12s.' },
      { heading: 'Price changes', text: "We give at least 4 weeks' notice of any price change." },
      { heading: 'Complaints', text: 'Message us on WhatsApp. We reply within 48 hours.' },
    ],
  },
  privacy: {
    meta: { path: '/privacy', title: 'Privacy | JTK Academy', description: 'What information JTK Academy keeps, why we keep it, who sees it, how long we keep it and your rights.' },
    h1: 'Privacy',
    intro: 'What we keep about you, why, and what you can ask us to do with it.',
    updated: true,
    items: [
      { heading: 'Who we are', text: 'JTK Academy.', confirm: 'CONFIRM-ADDRESS', after: 'Contact: WhatsApp 07933 395159.' },
      { heading: 'What we keep', text: 'What you send us on WhatsApp (your name, number, who the lessons are for, level and preferred times), lesson and progress notes, and payment records from Stripe. We never see your full card number.' },
      { heading: 'Why', text: 'To arrange and teach lessons, send reminders and progress notes, and take payment.' },
      { heading: 'Who sees it', text: 'Musa and your teacher. Stripe handles payments, Zoom runs lessons and WhatsApp carries messages.' },
      { heading: 'How long', text: "If you don't become a student, we delete your details after 12 months. Payment records are kept as long as UK tax law requires." },
      { heading: 'This website', text: "It uses Google Ads conversion tracking (cookies) to tell us when someone who clicked an ad goes on to contact us. It can't see your WhatsApp messages." },
      { heading: 'Recordings', text: 'Lessons are only recorded with consent, and recordings are deleted after 30 days.' },
      { heading: 'Your rights', text: 'You can ask us to show, correct or delete your data by messaging us on WhatsApp. You can also complain to the ICO (ico.org.uk).' },
    ],
  },
  safeguarding: {
    meta: { path: '/safeguarding', title: 'Safeguarding | JTK Academy', description: 'How JTK Academy keeps children safe in online lessons, and how to raise a concern with our named safeguarding contact.' },
    h1: 'Safeguarding',
    intro: 'How we keep children safe in online lessons, and how to raise a concern.',
    updated: false,
    items: [
      { heading: 'Our own Zoom account', text: "Lessons are one-to-one on JTK's own Zoom account, never a teacher's personal account." },
      { heading: 'Messages', text: "All messages go through the JTK WhatsApp number. Teachers don't contact families on personal numbers." },
      { heading: 'A parent nearby', text: 'Children under 12 have a parent or guardian present or within earshot during lessons.' },
      { heading: 'Recordings', text: "Lessons are recorded only with a parent's consent, for quality and safety, and deleted after 30 days." },
      { heading: 'What we teach', text: "Our teachers teach Qur'an, tajweed and Arabic only. Questions about religious rulings are referred back to you as the parent." },
      { heading: 'Raising a concern', text: 'Named safeguarding contact: Musa. To raise a concern, message the JTK WhatsApp at any time and start your message with "Safeguarding".' },
    ],
  },
};

// ---------------------------------------------------------------------------
// Helpers used by both the app and the HTML head writer

export function pageMeta(page: PageKey): Meta {
  if (isLanding(page)) return PAGES[page].meta;
  if (isLegal(page)) return LEGAL[page].meta;
  return NOT_FOUND.meta;
}

export function pageMessage(page: PageKey): string {
  return isLanding(page) ? PAGES[page].message : HOME_MESSAGE;
}

export const JSON_LD_DESCRIPTION = 'One-to-one online Qur\'an and Arabic lessons for adults and children in the UK, taught by a native Arabic-speaking teacher from Egypt. Female teacher available. Free 30-minute trial.';
