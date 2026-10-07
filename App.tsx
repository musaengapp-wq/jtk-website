import React, { useEffect, useState } from 'react';
import {
  BookOpen, Star, Award, Globe, Heart, Clock,
  Check, ChevronDown, ChevronUp, Menu, X,
  Phone, ArrowRight, Send, User, Mail
} from 'lucide-react';

const WHATSAPP_NUMBER = "447933395159";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;
const GOOGLE_TAG_ID = import.meta.env.VITE_GOOGLE_TAG_ID || 'AW-17973797849';
const GOOGLE_ADS_CONTACT_CONVERSION = import.meta.env.VITE_GOOGLE_ADS_CONTACT_CONVERSION || 'AW-17973797849/V8QgCJOcm_4bENnHyfpC';

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

function trackEvent(eventName: string, params: TrackingParams = {}) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') {
    return;
  }

  const cleanedParams = Object.fromEntries(
    Object.entries(params).filter(([, value]) => value !== undefined)
  );

  window.gtag('event', eventName, cleanedParams);
}

function trackCtaClick(location: string, label: string) {
  trackEvent('select_content', {
    content_type: 'cta',
    item_id: `${location}:${label}`,
    link_target: '#book',
  });
}

function trackWhatsAppClick(location: string) {
  // A click opens WhatsApp; it does not prove a message was sent or a booking made.
  trackEvent('whatsapp_click', {
    lead_source: 'whatsapp',
    event_category: 'lead',
    event_label: location,
  });
  trackEvent('conversion', {
    send_to: GOOGLE_ADS_CONTACT_CONVERSION,
    value: 0,
    currency: 'GBP',
    event_category: 'lead',
    event_label: location,
  });
}

const NAV_LINKS = [
  { name: 'Our Story', href: '#story' },
  { name: 'Programmes', href: '#programmes' },
  { name: 'Pricing', href: '#pricing' },
  { name: 'FAQ', href: '#faq' },
  { name: 'Book Assessment', href: '#book' },
];

const PROGRAMMES = [
  {
    title: "Qur'an Recitation",
    points: ["Master the Arabic alphabet and pronunciation", "Structured reading practice for fluency", "Tailored to your current level"],
    icon: BookOpen,
  },
  {
    title: "Tajweed Studies",
    points: ["Comprehensive rules for correct recitation", "Practical drills and correction", "Classical articulation standards"],
    icon: Star,
  },
  {
    title: "Hifz (Memorisation)",
    points: ["Structured memorisation pathways", "Disciplined revision scheduling", "Focus on long-term retention"],
    icon: Award,
  },
  {
    title: "Arabic Language",
    points: ["Reading, writing, and comprehension", "Vocabulary for classical texts", "Grammatical foundations"],
    icon: Globe,
  },
  {
    title: "Islamic Studies",
    points: ["Character and ethics (Akhlaq)", "Prophetic history and Seerah", "Practical jurisprudence"],
    icon: Heart,
  },
];

const PRICING = [
  {
    title: "30-min Starter",
    perHour: "≈ £7.50",
    monthly: "£30",
    sessions: "2 days per week",
    features: ["30-minute 1-to-1 lessons", "Personalised learning plan", "Free initial assessment"],
  },
  {
    title: "30-min Standard",
    perHour: "≈ £7.50",
    monthly: "£45",
    sessions: "3 days per week",
    features: ["30-minute 1-to-1 lessons", "Steady weekly routine", "Free initial assessment"],
  },
  {
    title: "30-min Progress",
    perHour: "≈ £6.88",
    monthly: "£55",
    sessions: "4 days per week",
    features: ["30-minute 1-to-1 lessons", "Best for regular practice", "Free initial assessment"],
  },
  {
    title: "1-hour Starter",
    perHour: "≈ £6.88",
    monthly: "£55",
    sessions: "2 hours per week",
    features: ["1-hour 1-to-1 lessons", "Can be shared by family", "Free initial assessment"],
  },
  {
    title: "1-hour Standard",
    perHour: "≈ £6.25",
    monthly: "£75",
    sessions: "3 hours per week",
    features: ["1-hour 1-to-1 lessons", "Monthly progress updates", "Free initial assessment"],
    highlight: true,
  },
  {
    title: "1-hour Intensive",
    perHour: "≈ £5.94",
    monthly: "£95",
    sessions: "4 hours per week",
    features: ["1-hour 1-to-1 lessons", "More intensive study", "Free initial assessment"],
  },
];

const FAQS = [
  { q: "Who is this for?", a: "Adults and families seeking structured, consistent Qur'an and Arabic tuition. Whether you're a complete beginner or looking to refine your tajweed, we tailor the programme to you." },
  { q: "Can the lesson be shared between family members?", a: "Yes. A 1-hour session can be split across siblings or family members however suits you, for example 3 children at 20 minutes each. One booking, one price, one slot. Perfect for families with multiple children learning together." },
  { q: "How do online classes work?", a: "Classes are conducted 1-to-1 via secure video call with your dedicated teacher. Sessions are typically 60 minutes." },
  { q: "What qualifications do the teachers have?", a: "Our teachers are native Arabic speakers from Egypt with formal ijazah (certification) in Qur'an recitation and years of teaching experience with non-Arabic speakers. The programme is overseen by a director who studied at the University of Madinah." },
  { q: "Can I try before committing?", a: "Absolutely. Every student starts with a free assessment session where we evaluate your level and discuss your goals. No obligation, no pressure." },
  { q: "Is there a specific schedule?", a: "We offer morning, afternoon, and evening slots to fit around work and family commitments. Once booked, your slot is consistent each week." },
  { q: "I'm a complete beginner, is that OK?", a: "That's exactly who we're here for. Our founder started as a non-Arabic speaking convert and learned from scratch. We understand the journey because we've lived it." },
  { q: "How is progress tracked?", a: "You receive regular updates on your progress including areas of improvement and next objectives. We believe in transparency, you always know where you stand." },
  { q: "Do you offer more than 4 lessons a week?", a: "Yes. Serious learners and families can ask for 5 days a week or a custom family arrangement. Get in touch and we'll put together a plan that fits." },
  { q: "Do you have a referral programme?", a: "Yes. Refer a family member or friend, and when they sign up you both get £10 off your next month. Share the reward of spreading the Qur'an." },
];

function BookingForm() {
  const [name, setName] = useState('');
  const [interest, setInterest] = useState('');
  const [times, setTimes] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    trackWhatsAppClick('booking_form_submit');
    const lines = [
      `Assalamu alaikum! I'd like to book a free assessment.`,
      ``,
      `Name: ${name}`,
      interest ? `Interested in: ${interest}` : '',
      times ? `Preferred times: ${times}` : '',
      message ? `Message: ${message}` : '',
    ].filter(Boolean).join('\n');

    const encoded = encodeURIComponent(lines);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 max-w-lg mx-auto"
      aria-label="Book a free assessment via WhatsApp"
    >
      <div>
        <label htmlFor="booking-name" className="block text-sm font-medium text-slate-700 mb-1">Your name *</label>
        <input
          id="booking-name"
          name="name"
          type="text"
          required
          aria-required="true"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary text-slate-700"
          placeholder="Your name"
        />
      </div>
      <div>
        <label htmlFor="booking-interest" className="block text-sm font-medium text-slate-700 mb-1">What are you interested in?</label>
        <select
          id="booking-interest"
          name="interest"
          value={interest}
          onChange={(e) => setInterest(e.target.value)}
          className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary text-slate-700 bg-white"
        >
          <option value="">Select a programme</option>
          <option value="Qur'an Recitation">Qur'an Recitation</option>
          <option value="Tajweed Studies">Tajweed Studies</option>
          <option value="Hifz (Memorisation)">Hifz (Memorisation)</option>
          <option value="Arabic Language">Arabic Language</option>
          <option value="Islamic Studies">Islamic Studies</option>
          <option value="Not sure yet">Not sure yet</option>
        </select>
      </div>
      <div>
        <label htmlFor="booking-times" className="block text-sm font-medium text-slate-700 mb-1">Preferred days / times</label>
        <input
          id="booking-times"
          name="times"
          type="text"
          value={times}
          onChange={(e) => setTimes(e.target.value)}
          className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary text-slate-700"
          placeholder="e.g. Weekday evenings, Saturday mornings"
        />
      </div>
      <div>
        <label htmlFor="booking-message" className="block text-sm font-medium text-slate-700 mb-1">Anything else?</label>
        <textarea
          id="booking-message"
          name="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={3}
          className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary text-slate-700 resize-none"
          placeholder="Tell us about your level, goals, or any questions"
        />
      </div>
      <button
        type="submit"
        aria-label="Submit booking form and open WhatsApp with pre-filled message"
        className="w-full bg-[#25D366] text-white py-3.5 rounded-lg font-semibold text-lg hover:bg-[#20bd5a] transition-colors flex items-center justify-center gap-2"
      >
        <Send size={20} aria-hidden="true" />
        Book Free Assessment via WhatsApp
      </button>
      <p className="text-center text-sm text-slate-400">
        This opens WhatsApp with a pre-filled message. We typically respond within minutes.
      </p>
    </form>
  );
}

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [pricingTrack, setPricingTrack] = useState<'60' | '30'>('60');

  useEffect(() => {
    if (typeof window === 'undefined' || !GOOGLE_TAG_ID || window.gtag) {
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
      page_path: window.location.pathname + window.location.hash,
    });

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GOOGLE_TAG_ID)}`;
    document.head.appendChild(script);
  }, []);

  const pricingOptions = PRICING.filter((tier) =>
    pricingTrack === '60' ? tier.title.startsWith('1-hour') : tier.title.startsWith('30-min')
  );

  return (
    <div className="min-h-screen font-sans">
      {/* Nav */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between h-16 items-center">
            <a href="#" className="flex items-center gap-2">
              <BookOpen className="text-primary" size={24} />
              <span className="font-bold text-dark text-lg">JTK Academy</span>
            </a>

            <div className="hidden md:flex items-center gap-8">
              {NAV_LINKS.map(link => (
                <a key={link.name} href={link.href} className="text-slate-600 hover:text-primary text-sm font-medium transition-colors">
                  {link.name}
                </a>
              ))}
              <a href="#book"
                onClick={() => trackCtaClick('desktop_nav', 'Book Assessment')}
                className="bg-primary text-white px-5 py-2 text-sm font-semibold hover:bg-primary-light transition-colors rounded">
                Book Assessment
              </a>
            </div>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-slate-600"
              aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMenuOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div id="mobile-menu" role="menu" aria-label="Mobile navigation" className="md:hidden bg-white border-t border-slate-100 px-4 py-3 space-y-2">
            {NAV_LINKS.map(link => (
              <a key={link.name} href={link.href} onClick={() => setIsMenuOpen(false)}
                className="block py-2 text-slate-600 font-medium">{link.name}</a>
            ))}
            <a href="#book" onClick={() => {
              setIsMenuOpen(false);
              trackCtaClick('mobile_nav', 'Book Assessment');
            }}
              className="block bg-primary text-white text-center py-3 rounded font-semibold mt-2">
              Book Assessment
            </a>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section className="pt-28 pb-16 md:pt-36 md:pb-24 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl">
            <p className="text-base sm:text-lg font-bold text-slate-700 mb-2">Journey to Knowledge Academy</p>
            <p className="text-primary font-semibold text-sm tracking-wide uppercase mb-4">Online Qur'an &amp; Arabic</p>
            <h1 className="text-3xl md:text-5xl font-extrabold text-dark leading-tight mb-6">
              An online Qur'an &amp; Arabic academy built by someone who walked the path.
            </h1>
            <p className="text-lg text-slate-600 mb-8 max-w-xl leading-relaxed">
              Journey to Knowledge Academy helps children, adults and families learn Qur'an, Nooraniyah and Arabic through structured 1-to-1 online lessons with experienced teachers. Founded by a Muslim convert who learned Arabic from scratch and studied at the University of Madinah.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a href="#book"
                onClick={() => trackCtaClick('hero', 'Book a Free Assessment')}
                className="inline-flex items-center justify-center bg-primary text-white px-8 py-3.5 font-semibold hover:bg-primary-light transition-colors rounded">
                Book a Free Assessment <ArrowRight className="ml-2" size={18} />
              </a>
              <a href="#story"
                className="inline-flex items-center justify-center border-2 border-slate-200 text-slate-700 px-8 py-3.5 font-semibold hover:border-primary hover:text-primary transition-colors rounded">
                Read Our Story
              </a>
            </div>
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 mt-8 text-sm text-slate-500">
              <span className="flex items-center gap-1.5"><Check size={16} className="text-primary" /> Free assessment</span>
              <span className="flex items-center gap-1.5"><Check size={16} className="text-primary" /> Family-share pricing</span>
              <span className="flex items-center gap-1.5"><Check size={16} className="text-primary" /> For children, adults &amp; families</span>
            </div>
          </div>
        </div>
      </section>

      {/* Story */}
      <section id="story" className="py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <p className="text-primary font-semibold text-sm tracking-wide uppercase mb-3">Our Story</p>
              <h2 className="text-2xl md:text-3xl font-bold text-dark mb-6">Why Journey to Knowledge Academy exists</h2>
              <div className="space-y-4 text-slate-600 leading-relaxed">
                <p>
                  Journey to Knowledge Academy was created to help Muslim children, adults and families build a real connection with the Qur'an, Nooraniyah and Arabic through clear, structured 1-to-1 lessons.
                </p>
                <p>
                  The academy is led by a Muslim convert who learned Arabic from scratch before later studying at the University of Madinah. That journey shapes the way we teach: patient, practical and easy to follow for students who are starting from different levels.
                </p>
                <p>
                  Our teachers support each learner step by step, whether the goal is reading Qur'an more confidently, building strong Nooraniyah foundations, improving tajweed, or beginning Arabic in a way that feels manageable.
                </p>
                <p>
                  We know family life is busy, so lessons are designed to be flexible, personal and steady. Students get focused attention, parents get a clear starting point, and everyone begins with a free assessment so the right path is chosen from the start.
                </p>
                <p>
                  Across the world, many Muslims have grown up disconnected from the Arabic language, and with it, disconnected from the Qur'an. Journey to Knowledge Academy exists to rebuild that connection, one student at a time.
                </p>
              </div>
            </div>
            <div className="space-y-6">
              <div className="bg-primary/5 p-8 rounded-lg border border-primary/10">
                <p className="text-2xl font-arabic text-dark leading-loose text-right mb-4" dir="rtl">
                  اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ
                </p>
                <p className="text-slate-600 italic">"Read in the name of your Lord who created."</p>
                <p className="text-sm text-slate-400 mt-2">Surah Al-'Alaq, 96:1</p>
              </div>
              <div className="bg-slate-50 p-6 rounded-lg border border-slate-100">
                <h3 className="font-bold text-dark mb-4">Why choose us</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3 text-sm text-slate-600">
                    <Check size={16} className="text-primary shrink-0 mt-0.5" />
                    <span><strong>Overseen by a programme director</strong> who studied at the University of Madinah, in the city of the Prophet &#xFDFA;</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-slate-600">
                    <Check size={16} className="text-primary shrink-0 mt-0.5" />
                    <span><strong>Founder learned Arabic from zero,</strong> so the pathway is built for students who need clear steps</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-slate-600">
                    <Check size={16} className="text-primary shrink-0 mt-0.5" />
                    <span><strong>Native Arabic-speaking teachers from Egypt</strong> with formal ijazah in Qur'anic recitation</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-12 max-w-3xl mx-auto bg-primary/5 p-8 md:p-10 rounded-lg border border-primary/10">
            <div className="space-y-3 text-slate-700 italic leading-relaxed">
              <p>"Arabic and Qur'an learning should fit real family life.</p>
              <p>Journey to Knowledge Academy was built for children, adults and families who need patient 1-to-1 support, clear steps, and lessons that work around school, work and home routines.</p>
              <p>Our aim is to make the path easier, more flexible, and more meaningful for every learner."</p>
            </div>
          </div>
        </div>
      </section>

      {/* Programmes */}
      <section id="programmes" className="py-16 md:py-24 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-primary font-semibold text-sm tracking-wide uppercase mb-3">What We Teach</p>
            <h2 className="text-2xl md:text-3xl font-bold text-dark">Our Programmes</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROGRAMMES.map((prog, idx) => (
              <div key={idx} className="bg-white p-6 rounded-lg border border-slate-100 hover:border-primary/20 transition-colors">
                <div className="w-10 h-10 bg-primary/10 text-primary rounded flex items-center justify-center mb-4">
                  <prog.icon size={20} />
                </div>
                <h3 className="text-lg font-bold text-dark mb-3">{prog.title}</h3>
                <ul className="space-y-2">
                  {prog.points.map((point, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                      <Check size={14} className="text-primary shrink-0 mt-0.5" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-primary font-semibold text-sm tracking-wide uppercase mb-3">Founder Pricing</p>
            <h2 className="text-2xl md:text-3xl font-bold text-dark mb-3">Choose your lesson length</h2>
            <p className="text-slate-500 mb-2">Simple monthly founder packages for 1-to-1 Qur'an, Nooraniyah and Arabic lessons.</p>
            <p className="text-slate-500 mb-2">Select 30-minute or 1-hour lessons below to view the matching monthly packages.</p>
            <p className="text-slate-500 italic mb-2">Families can share a 1-hour slot across siblings or children where suitable.</p>
            <p className="text-sm text-slate-400">All plans include a free assessment session. Monthly payment in advance.</p>
          </div>

          <div className="flex justify-center mb-8">
            <div className="inline-flex w-full max-w-md rounded-xl border border-slate-200 bg-slate-50 p-1">
              <button
                type="button"
                onClick={() => {
                  setPricingTrack('30');
                  trackEvent('view_item_list', {
                    item_list_name: 'pricing',
                    pricing_track: '30-minute',
                  });
                }}
                className={`flex-1 rounded-lg px-4 py-3 text-sm font-semibold transition-colors ${
                  pricingTrack === '30'
                    ? 'bg-white text-dark shadow-sm'
                    : 'text-slate-500 hover:text-dark'
                }`}
              >
                30-minute lessons
              </button>
              <button
                type="button"
                onClick={() => {
                  setPricingTrack('60');
                  trackEvent('view_item_list', {
                    item_list_name: 'pricing',
                    pricing_track: '1-hour',
                  });
                }}
                className={`flex-1 rounded-lg px-4 py-3 text-sm font-semibold transition-colors ${
                  pricingTrack === '60'
                    ? 'bg-white text-dark shadow-sm'
                    : 'text-slate-500 hover:text-dark'
                }`}
              >
                1-hour lessons
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {pricingOptions.map((tier) => {
              const helperText = tier.highlight
                ? 'Recommended for most families'
                : tier.title.includes('Starter')
                  ? 'Prefer a lighter start?'
                  : tier.title.includes('Progress')
                    ? 'Best for regular progress'
                    : 'More intensive study';

              return (
                <div key={tier.title} className={`p-6 rounded-xl border-2 transition-shadow ${
                  tier.highlight
                    ? 'border-primary bg-primary/5 shadow-lg relative'
                    : 'border-slate-100 bg-white'
                }`}>
                  {tier.highlight && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">
                      Most Popular
                    </div>
                  )}
                  <div className="text-center mb-6">
                    <p className="text-sm font-semibold text-primary mb-2">{helperText}</p>
                    <h3 className="font-bold text-dark text-xl">{tier.sessions}</h3>
                    <p className="text-sm text-slate-500 mb-3">{tier.features[0]}</p>
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-3xl font-extrabold text-dark">{tier.monthly}</span>
                      <span className="text-slate-400 text-sm">/month</span>
                    </div>
                  </div>
                  <ul className="space-y-2.5 mb-6">
                    {tier.features.slice(1).map((feat, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-slate-600">
                        <Check size={14} className="text-primary shrink-0" /> {feat}
                      </li>
                    ))}
                  </ul>
                  <a href="#book"
                    onClick={() => trackEvent('select_item', {
                      item_list_name: 'pricing',
                      item_name: tier.title,
                      price_monthly: Number(tier.monthly.replace('£', '')),
                    })}
                    className={`block text-center py-2.5 rounded font-semibold text-sm transition-colors ${
                      tier.highlight
                        ? 'bg-primary text-white hover:bg-primary-light'
                        : 'border border-slate-200 text-slate-700 hover:border-primary hover:text-primary'
                    }`}>
                    Book Free Assessment
                  </a>
                </div>
              );
            })}
          </div>

          <div className="max-w-4xl mx-auto mt-6">
            <div className="bg-slate-50 rounded-xl p-5 border border-slate-100 text-center">
              <p className="font-semibold text-dark text-sm mb-1">Need a custom family arrangement?</p>
              <p className="text-sm text-slate-600">Need 5 days a week or want siblings to share a 1-hour slot? <a href="#book" onClick={() => trackCtaClick('pricing_custom_family', 'Get in touch')} className="text-primary font-semibold hover:underline">Get in touch</a>.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-16 md:py-24 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-primary font-semibold text-sm tracking-wide uppercase mb-3">Common Questions</p>
            <h2 className="text-2xl md:text-3xl font-bold text-dark">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-3" role="region" aria-label="Frequently asked questions">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              const buttonId = `faq-button-${idx}`;
              const panelId = `faq-panel-${idx}`;
              return (
                <div key={idx} className="bg-white rounded-lg border border-slate-100 overflow-hidden">
                  <button
                    id={buttonId}
                    onClick={() => {
                      setOpenFaq(isOpen ? null : idx);
                      if (!isOpen) {
                        trackEvent('select_content', {
                          content_type: 'faq',
                          item_id: faq.q,
                        });
                      }
                    }}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    className="w-full flex items-center justify-between p-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                  >
                    <span className="font-semibold text-dark">{faq.q}</span>
                    {isOpen
                      ? <ChevronUp size={18} className="text-primary shrink-0" aria-hidden="true" />
                      : <ChevronDown size={18} className="text-slate-400 shrink-0" aria-hidden="true" />}
                  </button>
                  {isOpen && (
                    <div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      className="px-5 pb-5 text-slate-600 text-sm leading-relaxed border-t border-slate-50 pt-3"
                    >
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section id="book" className="py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <p className="text-primary font-semibold text-sm tracking-wide uppercase mb-3">Get Started</p>
            <h2 className="text-2xl md:text-3xl font-bold text-dark mb-3">Book your free assessment</h2>
            <p className="text-slate-500">
              Fill in the form, then send the prepared message in WhatsApp. We'll reply to arrange your free assessment. No commitment, no pressure.
            </p>
          </div>
          <BookingForm />
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-24 bg-primary">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Ready to taste the sweetness of the Qur'an?</h2>
          <p className="text-teal-100 text-lg mb-8 max-w-lg mx-auto">
            Start with a free assessment, no obligation. We'll evaluate your level and recommend the right programme for you.
          </p>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" onClick={() => trackWhatsAppClick('final_cta')}
                className="inline-flex items-center gap-3 bg-white text-primary px-8 py-4 rounded font-bold text-lg hover:bg-teal-50 transition-colors">
            <Phone size={22} />
            Message Us on WhatsApp
          </a>
          <p className="text-teal-200 text-sm mt-4">We typically respond within minutes</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-slate-400 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 text-white mb-4">
                <BookOpen className="text-primary-light" size={20} />
                <span className="font-bold">JTK Academy</span>
              </div>
              <p className="text-sm leading-relaxed">
                Journey to Knowledge Academy offers personalised Qur'an, Nooraniyah and Arabic tuition for children, adults and families. Founded by a convert, built on experience, driven by a mission to reconnect Muslims with the language of the Qur'an.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                {NAV_LINKS.map(link => (
                  <li key={link.name}>
                    <a href={link.href} className="hover:text-white transition-colors">{link.name}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm mb-4">Get in Touch</h4>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" onClick={() => trackWhatsAppClick('footer_contact')}
                className="inline-flex items-center gap-2 text-sm hover:text-white transition-colors mb-2">
                <Phone size={16} /> WhatsApp
              </a>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-6 text-center text-xs text-slate-500">
            <p>&copy; {new Date().getFullYear()} Journey to Knowledge Academy. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp */}
      <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" onClick={() => trackWhatsAppClick('floating_button')}
        className="fixed bottom-6 right-6 z-40 bg-[#25D366] text-white p-3.5 rounded-full shadow-lg hover:scale-110 transition-transform focus:outline-none focus-visible:ring-4 focus-visible:ring-[#25D366]/40"
        title="Chat on WhatsApp"
        aria-label="Chat with Journey to Knowledge Academy on WhatsApp">
        <svg viewBox="0 0 24 24" className="w-7 h-7 fill-current" role="img" aria-hidden="true" focusable="false">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .018 5.396.015 12.03c0 2.12.547 4.189 1.586 6.06L0 24l6.117-1.604a11.774 11.774 0 005.928 1.603h.005c6.634 0 12.032-5.397 12.035-12.032.003-3.218-1.248-6.242-3.523-8.517z"/>
        </svg>
      </a>
    </div>
  );
}
