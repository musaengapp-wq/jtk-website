import React, { useEffect, useState } from 'react';
import {
  BookOpen, Star, Award, Globe, Heart, Clock,
  Check, ChevronDown, ChevronUp, Menu, X,
  Phone, ArrowRight, Send, User, Mail, PlayCircle
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
  { name: 'Programmes', href: '#programmes' },
  { name: 'How it works', href: '#how-it-works' },
  { name: 'Prices', href: '#pricing' },
  { name: 'Our story', href: '#story' },
  { name: 'FAQs', href: '#faq' },
];

const PROGRAMMES = [
  { title: "Start reading Arabic", points: ["Letters, vowel marks and pronunciation", "Nooraniyah and guided reading practice", "Suitable for complete beginners"], icon: BookOpen },
  { title: "Read Qur'an with more confidence", points: ["Recitation at your current level", "Support with pronunciation", "Guided practice to build fluency"], icon: BookOpen },
  { title: "Improve your tajweed", points: ["Clear explanations of the rules", "Practice with your teacher", "Personal pronunciation correction"], icon: Star },
  { title: "Memorise and revise", points: ["Qur'an memorisation at your level", "A structured revision routine", "Support for steady progress"], icon: Award },
  { title: "Develop your Arabic", points: ["Reading, writing and vocabulary", "Grammatical foundations", "Build your understanding step by step"], icon: Globe },
  { title: "Explore Islamic studies", points: ["Character and ethics", "Prophetic history and Seerah", "Practical Islamic knowledge"], icon: Heart },
];

const PRICING = [
  { id: '30-2', duration: '30', title: '1 hour per week', monthly: '£30', sessions: 'Two 30-minute lessons each week', description: '£7.50 per teaching hour.' },
  { id: '30-3', duration: '30', title: '1.5 hours per week', monthly: '£45', sessions: 'Three 30-minute lessons each week', description: '£7.50 per teaching hour.' },
  { id: '30-4', duration: '30', title: '2 hours per week', monthly: '£60', sessions: 'Four 30-minute lessons each week', description: '£7.50 per teaching hour.' },
  { id: '60-2', duration: '60', title: 'Twice a week', monthly: '£55', sessions: 'Two 60-minute lessons each week', description: 'More time in each session for explanation and practice.' },
  { id: '60-3', duration: '60', title: 'Three times a week', monthly: '£75', sessions: 'Three 60-minute lessons each week', description: 'Three hours of personal tuition each week.' },
  { id: '60-4', duration: '60', title: 'Four times a week', monthly: '£95', sessions: 'Four 60-minute lessons each week', description: 'Four hours of personal tuition each week.' },
];

const FAQS = [
  { q: 'Are lessons suitable for complete beginners?', a: 'Yes. We can help you begin with Arabic letters, vowel marks and reading foundations. Your trial lesson helps us understand where to start.' },
  { q: 'Is the trial lesson free?', a: 'Yes. Your trial lesson is free, with no obligation to enrol. We’ll use it to understand your current level, learning goals and suitable next steps.' },
  { q: 'How much are lessons?', a: 'Paid tuition starts at £30/month for one hour of tuition per week, delivered as two 30-minute one-to-one lessons. All 30-minute lesson plans are equivalent to £7.50 per teaching hour. Other weekly schedules and 60-minute lessons are shown in the pricing section. Monthly payment is made in advance if you decide to enrol.' },
  { q: 'How do online lessons work?', a: 'You meet your teacher one-to-one by video call. Lessons last 30 or 60 minutes, depending on your chosen plan.' },
  { q: 'Can my children share a lesson slot?', a: 'A 60-minute slot may be divided between family members by arrangement. The teaching time is shared within that hour. Tell us about the learners so we can discuss a suitable setup.' },
  { q: 'Who will teach me?', a: 'Lessons are taught by a native Arabic-speaking teacher from Egypt, and the programme is overseen by a director who studied at the University of Madinah.' },
  { q: 'Do you have a female teacher?', a: 'Yes. Sisters, women and children can learn with a female teacher. Let us know your preference when you request your trial lesson.' },
  { q: 'When are lessons available?', a: 'Lesson times are arranged with you, subject to teacher availability. Tell us your preferred days, times and time zone when you enquire.' },
  { q: 'What if I do not know which programme to choose?', a: 'Select “Not sure yet” in the form. We can discuss the options during your trial lesson.' },
  { q: 'How will I know how learning is progressing?', a: 'We provide progress updates and discuss what to work on next.' },
  { q: 'Do you offer more than four lessons a week?', a: 'Ask us about five days a week or a custom family arrangement. We’ll discuss a suitable plan and available times.' },
  { q: 'Do you have a referral programme?', a: 'Yes. Refer a family member or friend, and when they sign up you both get £10 off your next month.' },
];

function BookingForm({ selectedPlan, onPlanChange }: { selectedPlan: string; onPlanChange: (plan: string) => void }) {
  const [name, setName] = useState('');
  const [interest, setInterest] = useState('');
  const [learner, setLearner] = useState('');
  const [times, setTimes] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    trackWhatsAppClick('booking_form_submit');
    const plan = PRICING.find(option => option.id === selectedPlan);
    const planLabel = plan ? `${plan.sessions} — ${plan.monthly}/month` : selectedPlan || 'Not sure yet';
    const lines = [
      `Assalamu alaikum! I'd like to request a free trial lesson.`,
      ``,
      `Name: ${name}`,
      learner ? `Lessons for: ${learner}` : '',
      interest ? `Interested in: ${interest}` : '',
      `Preferred lesson option: ${planLabel}`,
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
      aria-label="Request a free trial lesson via WhatsApp"
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
          placeholder="Your name (parent or guardian for a child)"
        />
      </div>
      <div>
        <label htmlFor="booking-learner" className="block text-sm font-medium text-slate-700 mb-1">Who are lessons for? (optional)</label>
        <select id="booking-learner" value={learner} onChange={e => setLearner(e.target.value)} className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 bg-white">
          <option value="">Select a learner</option>
          <option>Myself</option><option>My child</option><option>More than one family member</option>
        </select>
      </div>
      <div>
        <label htmlFor="booking-plan" className="block text-sm font-medium text-slate-700 mb-1">Preferred lesson option (optional)</label>
        <select id="booking-plan" value={selectedPlan} onChange={e => onPlanChange(e.target.value)} className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 bg-white">
          <option value="">Not sure yet</option>
          <option value="30-minute lessons — schedule to discuss">30-minute lessons — schedule to discuss</option>
          <option value="60-minute lessons — schedule to discuss">60-minute lessons — schedule to discuss</option>
          {PRICING.map(plan => <option key={plan.id} value={plan.id}>{plan.sessions} — {plan.monthly}/month</option>)}
        </select>
        <p className="text-sm text-slate-500 mt-1">You do not need to choose a paid plan to request a free trial lesson.</p>
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
          <option value="Arabic-reading foundations (Nooraniyah)">Arabic-reading foundations (Nooraniyah)</option>
          <option value="Qur'an Recitation">Qur'an Recitation</option>
          <option value="Tajweed Studies">Tajweed Studies</option>
          <option value="Hifz (Memorisation)">Hifz (Memorisation)</option>
          <option value="Arabic Language">Arabic Language</option>
          <option value="Islamic Studies">Islamic Studies</option>
          <option value="Not sure yet">Not sure yet</option>
        </select>
      </div>
      <div>
        <label htmlFor="booking-times" className="block text-sm font-medium text-slate-700 mb-1">Preferred days, times and time zone (optional)</label>
        <input
          id="booking-times"
          name="times"
          type="text"
          value={times}
          onChange={(e) => setTimes(e.target.value)}
          className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary text-slate-700"
          placeholder="e.g. Weekday evenings, UK time"
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
        aria-label="Continue to WhatsApp with your trial lesson request"
        className="w-full bg-primary text-white py-3.5 rounded-lg font-semibold text-lg hover:bg-primary-light transition-colors flex items-center justify-center gap-2"
      >
        <Send size={20} aria-hidden="true" />
        Continue to WhatsApp
      </button>
      <p className="text-center text-sm text-slate-400">
        WhatsApp will open with your message ready. Tap Send there to complete your request. We’ll then reply to arrange your free trial lesson.
      </p>
    </form>
  );
}

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [selectedPlan, setSelectedPlan] = useState('');
  const [pricingTrack, setPricingTrack] = useState<'60' | '30'>('30');

  useEffect(() => {
    // On a fresh visit, the browser may try to follow the hash before React renders its target.
    const targetId = window.location.hash.slice(1);
    if (!targetId) return;

    const frame = window.requestAnimationFrame(() => {
      document.getElementById(targetId)?.scrollIntoView();
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

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
    tier.duration === pricingTrack
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

            <div className="hidden md:flex items-center gap-5">
              {NAV_LINKS.map(link => (
                <a key={link.name} href={link.href} className="text-slate-600 hover:text-primary text-sm font-medium transition-colors">
                  {link.name}
                </a>
              ))}
              <a href="#book"
                onClick={() => trackCtaClick('desktop_nav', 'Free trial lesson')}
                className="bg-primary text-white px-5 py-2 text-sm font-semibold hover:bg-primary-light transition-colors rounded">
                Free trial lesson
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
              trackCtaClick('mobile_nav', 'Free trial lesson');
            }}
              className="block bg-primary text-white text-center py-3 rounded font-semibold mt-2">
              Free trial lesson
            </a>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section className="pt-28 pb-16 md:pt-36 md:pb-24 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl">
            <p className="text-primary font-semibold text-sm tracking-wide uppercase mb-4">One-to-one online tuition for children and adults</p>
            <h1 className="text-3xl md:text-5xl font-extrabold text-dark leading-tight mb-6">
              Learn Qur'an and Arabic, one step at a time.
            </h1>
            <p className="text-lg text-slate-600 mb-8 max-w-xl leading-relaxed">
              Learn with a real teacher who explains clearly and gives you time to practise. Start with Arabic letters, improve your Qur'an recitation or build your understanding of the language.
            </p>
            <p className="text-xl font-bold text-dark mb-3">Start with one hour per week for £30/month—equivalent to £7.50 per teaching hour.</p>
            <p className="text-slate-600 mb-6">Try a lesson for free and find a starting point that fits you. No obligation to enrol.</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a href="#book"
                onClick={() => trackCtaClick('hero', 'Request a free trial lesson')}
                className="inline-flex items-center justify-center bg-primary text-white px-8 py-3.5 font-semibold hover:bg-primary-light transition-colors rounded">
                Request a free trial lesson <ArrowRight className="ml-2" size={18} />
              </a>
              <a href="#pricing"
                className="inline-flex items-center justify-center border-2 border-slate-200 text-slate-700 px-8 py-3.5 font-semibold hover:border-primary hover:text-primary transition-colors rounded">
                See lesson options and prices
              </a>
            </div>
            <a href="#story" className="inline-flex items-center gap-2 mt-6 text-primary font-semibold underline underline-offset-4 hover:text-primary-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">
              <PlayCircle size={20} aria-hidden="true" /> Meet Musa, our founder (47-second video)
            </a>
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 mt-8 text-sm text-slate-500">
              <span className="flex items-center gap-1.5"><Check size={16} className="text-primary" /> Free trial lesson</span>
              <span className="flex items-center gap-1.5"><Check size={16} className="text-primary" /> 30 or 60-minute lessons</span>
              <span className="flex items-center gap-1.5"><Check size={16} className="text-primary" /> For children, adults &amp; families</span>
              <span className="flex items-center gap-1.5"><Check size={16} className="text-primary" /> Female teacher available</span>
            </div>
          </div>
        </div>
      </section>

      <section aria-label="Personal teaching" className="py-10 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 grid md:grid-cols-3 gap-8">
          {[
            ['Your teacher’s attention', 'Learn one-to-one, with time to practise and ask questions.'],
            ['A starting point that fits you', 'Your trial lesson helps us understand your current level and what you want to learn.'],
            ['Lessons around your routine', 'Choose 30 or 60-minute lessons and discuss available times around school, work and family life.'],
          ].map(([title, text]) => <div key={title}><Check className="text-primary mb-3" size={22} /><h2 className="font-bold text-dark mb-2">{title}</h2><p className="text-slate-600">{text}</p></div>)}
        </div>
      </section>

      {/* Programmes */}
      <section id="programmes" className="py-16 md:py-24 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-primary font-semibold text-sm tracking-wide uppercase mb-3">What We Teach</p>
            <h2 className="text-2xl md:text-3xl font-bold text-dark">What would you like to learn?</h2>
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

      <section id="how-it-works" className="py-14 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-dark text-center mb-8">How to get started</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              ['Tell us what you want to learn', 'Complete the short form and send your request through WhatsApp.'],
              ['Arrange your free trial lesson', 'We’ll reply to agree a time. Your trial lesson helps us understand your current level and goals.'],
              ['Choose your lessons', 'If you decide to continue, choose a lesson length and weekly routine that suits you, subject to available times.'],
            ].map(([title, text], i) => <div key={title}><p className="text-primary font-bold mb-2">Step {i + 1}</p><h3 className="font-bold text-dark mb-2">{title}</h3><p className="text-slate-600">{text}</p></div>)}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-primary font-semibold text-sm tracking-wide uppercase mb-3">Monthly tuition</p>
            <h2 className="text-2xl md:text-3xl font-bold text-dark mb-3">Start with a manageable weekly routine.</h2>
            <p className="text-slate-600 mb-2">All lessons are one-to-one. Choose 30-minute sessions for a shorter lesson or 60-minute sessions for more time with your teacher.</p>
            <p className="font-semibold text-dark mb-2">30-minute lesson plans start with one hour per week for £30/month—equivalent to £7.50 per teaching hour. Your trial lesson is free.</p>
            <p className="text-sm text-slate-500">Monthly payment is made in advance if you decide to enrol.</p>
          </div>

          <div className="flex justify-center mb-8">
            <div className="inline-flex w-full max-w-md rounded-xl border border-slate-200 bg-slate-50 p-1">
              <button
                type="button"
                aria-pressed={pricingTrack === '30'}
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
                aria-pressed={pricingTrack === '60'}
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
                60-minute lessons
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {pricingOptions.map((tier) => (
              <div key={tier.id} className="p-6 rounded-xl border border-slate-200 bg-white flex flex-col">
                <div className="text-center mb-5">
                  <h3 className="font-bold text-dark text-xl mb-2">{tier.title}</h3>
                  <p className="text-sm text-slate-600 mb-3">{tier.sessions}</p>
                  <p><span className="text-3xl font-extrabold text-dark">{tier.monthly}</span><span className="text-slate-500 text-sm">/month</span></p>
                </div>
                <p className="text-slate-600 text-sm mb-4">{tier.description}</p>
                <ul className="space-y-2 mb-6 text-sm text-slate-600">
                  <li className="flex gap-2"><Check size={16} className="text-primary" />One-to-one teaching</li>
                  <li className="flex gap-2"><Check size={16} className="text-primary" />Free trial lesson</li>
                </ul>
                <a href="#book" onClick={() => {
                  setSelectedPlan(tier.id);
                  trackEvent('select_item', { item_list_name: 'pricing', item_name: tier.id, price_monthly: Number(tier.monthly.replace('£', '')) });
                }} className="mt-auto block text-center py-3 rounded font-semibold text-sm bg-primary text-white hover:bg-primary-light transition-colors">Request my free trial lesson</a>
              </div>
            ))}
          </div>

          <div className="max-w-4xl mx-auto mt-6">
            <div className="bg-slate-50 rounded-xl p-5 border border-slate-100 text-center">
              <p className="font-semibold text-dark mb-2">Not sure which plan to choose?</p>
              <p className="text-sm text-slate-600 mb-4">Request a free trial lesson first. You do not need to choose a paid plan now.</p>
              <p className="font-semibold text-dark mb-2">Learning as a family?</p>
              <p className="text-sm text-slate-600">A 60-minute slot may be divided between family members by arrangement. We’ll discuss each learner’s needs and how to divide the teaching time.</p>
              <p className="text-sm text-slate-600 mt-3">Need a different schedule? <a href="#book" className="text-primary font-semibold underline">Tell us in your trial lesson request</a>.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Story */}
      <section id="story" className="scroll-mt-16 py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-10 lg:gap-14 items-start">
            <div>
              <p className="text-primary font-semibold text-sm tracking-wide uppercase mb-3">Our story</p>
              <h2 className="text-2xl md:text-3xl font-bold text-dark mb-6">Meet Musa, the founder of JTK Academy</h2>
              <div className="space-y-4 text-slate-600 leading-relaxed">
                <p>Musa came to Islam and studied Arabic in Madinah. He knows what it is like to begin learning the language from scratch.</p>
                <p>In this short video, he shares why he started JTK: to give learners a real teacher, one-to-one attention and a clear path from their current level.</p>
                <p>We support children and adults with Qur'an, Nooraniyah and Arabic. A free trial lesson helps us understand your goals and find the right starting point.</p>
              </div>
              <a href="#book" onClick={() => trackCtaClick('story', 'Request a free trial lesson')}
                className="inline-flex items-center justify-center mt-7 bg-primary text-white px-6 py-3 font-semibold hover:bg-primary-light transition-colors rounded">
                Request a free trial lesson
              </a>
            </div>
            <div className="space-y-6">
              <figure>
                <video
                  className="w-full aspect-[3/2] bg-slate-900 rounded-lg object-cover shadow-lg"
                  controls
                  playsInline
                  preload="none"
                  poster="/media/jtk-founder-story.jpg"
                  aria-label="Musa, founder of JTK Academy, shares his story"
                  onPlay={() => trackEvent('video_start', { video_title: 'founder_story' })}
                >
                  <source src="/media/jtk-founder-story.mp4" type="video/mp4" />
                  <track kind="captions" src="/media/jtk-founder-story.vtt" srcLang="en" label="English captions" default />
                  Your browser does not support video playback.
                </video>
                <figcaption className="text-sm text-slate-500 mt-3">A 47-second introduction from Musa. Press play to hear his story.</figcaption>
              </figure>
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
                    <span><strong>Native Arabic-speaking teacher from Egypt,</strong> with a female teacher available for sisters and children</span>
                  </li>
                </ul>
              </div>
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
            <h2 className="text-2xl md:text-3xl font-bold text-dark mb-3">Request your free trial lesson</h2>
            <p className="text-slate-500">
              Tell us a little about the learner and what you would like help with. We’ll reply on WhatsApp to arrange your free trial lesson. No payment or commitment is needed.
            </p>
          </div>
          <BookingForm selectedPlan={selectedPlan} onPlanChange={setSelectedPlan} />
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-24 bg-primary">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">A clear first step towards learning.</h2>
          <p className="text-teal-100 text-lg mb-8 max-w-lg mx-auto">
            Start with a free trial lesson and find out how JTK can support your learning.
          </p>
              <a href="#book" onClick={() => trackCtaClick('final_cta', 'Request a free trial lesson')}
                className="inline-flex items-center gap-3 bg-white text-primary px-8 py-4 rounded font-bold text-lg hover:bg-teal-50 transition-colors">
            <Phone size={22} />
            Request a free trial lesson
          </a>

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
                JTK Academy offers one-to-one online Qur'an, Nooraniyah and Arabic tuition for children and adults. Personal teaching, clear steps and support at your level.
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
        className="hidden lg:block fixed bottom-6 right-6 z-40 bg-[#25D366] text-white p-3.5 rounded-full shadow-lg hover:scale-110 transition-transform focus:outline-none focus-visible:ring-4 focus-visible:ring-[#25D366]/40"
        title="Chat on WhatsApp"
        aria-label="Chat with Journey to Knowledge Academy on WhatsApp">
        <svg viewBox="0 0 24 24" className="w-7 h-7 fill-current" role="img" aria-hidden="true" focusable="false">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .018 5.396.015 12.03c0 2.12.547 4.189 1.586 6.06L0 24l6.117-1.604a11.774 11.774 0 005.928 1.603h.005c6.634 0 12.032-5.397 12.035-12.032.003-3.218-1.248-6.242-3.523-8.517z"/>
        </svg>
      </a>
    </div>
  );
}
