import React, { useState } from 'react';
import {
  BookOpen, Star, Award, Globe, Heart, Clock, Users,
  Check, ChevronDown, ChevronUp, Menu, X, MessageCircle,
  Phone, ArrowRight
} from 'lucide-react';

const WHATSAPP_URL = "https://wa.me/447933395159";

const NAV_LINKS = [
  { name: 'About', href: '#about' },
  { name: 'Programmes', href: '#programmes' },
  { name: 'Pricing', href: '#pricing' },
  { name: 'FAQ', href: '#faq' },
  { name: 'Contact', href: '#contact' },
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
    title: "Starter",
    price: "£40",
    frequency: "/month",
    sessions: "1 session per week",
    features: ["Personalised learning plan", "Progress tracking", "Free initial assessment"],
  },
  {
    title: "Standard",
    price: "£72",
    frequency: "/month",
    sessions: "2 sessions per week",
    features: ["Priority scheduling", "Monthly progress reports", "Free initial assessment"],
    highlight: true,
  },
  {
    title: "Intensive",
    price: "£105",
    frequency: "/month",
    sessions: "3 sessions per week",
    features: ["Direct tutor access", "Flexible rescheduling", "Free initial assessment"],
  },
];

const FAQS = [
  { q: "Who is this for?", a: "Adults and families seeking structured, consistent Qur'an and Arabic tuition. Whether you're a complete beginner or looking to refine your tajweed, we tailor the programme to you." },
  { q: "How do online classes work?", a: "Classes are conducted 1-to-1 via secure video call with your dedicated teacher. Sessions are typically 45-60 minutes." },
  { q: "What qualifications do the teachers have?", a: "Our teachers are native Arabic speakers from Egypt with formal ijazah (certification) in Qur'an recitation and years of teaching experience with non-Arabic speakers." },
  { q: "Can I try before committing?", a: "Yes. Every student starts with a free assessment session where we evaluate your level and discuss your goals. No obligation." },
  { q: "Is there a specific schedule?", a: "We offer morning, afternoon, and evening slots to fit around work and family commitments. Once booked, your slot is consistent each week." },
  { q: "How is progress tracked?", a: "You receive regular updates on your progress including areas of improvement and next objectives. We believe in transparency — you always know where you stand." },
];

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="min-h-screen font-sans">
      {/* Nav */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between h-16 items-center">
            <a href="#" className="flex items-center gap-2">
              <BookOpen className="text-primary" size={24} />
              <span className="font-bold text-dark text-lg">Journey to Knowledge</span>
            </a>

            <div className="hidden md:flex items-center gap-8">
              {NAV_LINKS.map(link => (
                <a key={link.name} href={link.href} className="text-slate-600 hover:text-primary text-sm font-medium transition-colors">
                  {link.name}
                </a>
              ))}
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
                className="bg-primary text-white px-5 py-2 text-sm font-semibold hover:bg-primary-light transition-colors rounded">
                Enquire Now
              </a>
            </div>

            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 text-slate-600">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-100 px-4 py-3 space-y-2">
            {NAV_LINKS.map(link => (
              <a key={link.name} href={link.href} onClick={() => setIsMenuOpen(false)}
                className="block py-2 text-slate-600 font-medium">{link.name}</a>
            ))}
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
              className="block bg-primary text-white text-center py-3 rounded font-semibold mt-2">
              Enquire Now
            </a>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section className="pt-28 pb-16 md:pt-36 md:pb-24 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl">
            <p className="text-primary font-semibold text-sm tracking-wide uppercase mb-4">Online Qur'an &amp; Arabic Academy</p>
            <h1 className="text-3xl md:text-5xl font-extrabold text-dark leading-tight mb-6">
              Personalised Qur'an and Arabic tuition for adults and families.
            </h1>
            <p className="text-lg text-slate-600 mb-8 max-w-xl leading-relaxed">
              1-to-1 online classes with experienced Egyptian teachers. Structured programmes in recitation, tajweed, memorisation, and Arabic language — tailored to your level and goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-primary text-white px-8 py-3.5 font-semibold hover:bg-primary-light transition-colors rounded">
                Enquire via WhatsApp <ArrowRight className="ml-2" size={18} />
              </a>
              <a href="#programmes"
                className="inline-flex items-center justify-center border-2 border-slate-200 text-slate-700 px-8 py-3.5 font-semibold hover:border-primary hover:text-primary transition-colors rounded">
                View Programmes
              </a>
            </div>
            <div className="flex items-center gap-6 mt-8 text-sm text-slate-500">
              <span className="flex items-center gap-1.5"><Check size={16} className="text-primary" /> Free assessment</span>
              <span className="flex items-center gap-1.5"><Check size={16} className="text-primary" /> From £40/month</span>
              <span className="flex items-center gap-1.5"><Check size={16} className="text-primary" /> Men, women &amp; children</span>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-primary font-semibold text-sm tracking-wide uppercase mb-3">About the Academy</p>
              <h2 className="text-2xl md:text-3xl font-bold text-dark mb-6">Structured learning, personal guidance.</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Journey to Knowledge Academy provides disciplined, personalised Qur'an and Arabic education. Every student works 1-to-1 with a dedicated teacher — no group classes, no one-size-fits-all approach.
              </p>
              <p className="text-slate-600 leading-relaxed mb-6">
                Our teachers are native Arabic speakers from Egypt with formal certification (ijazah) in Qur'anic recitation and extensive experience teaching non-Arabic speakers. We prioritise consistency and depth over speed.
              </p>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-slate-50 rounded">
                  <div className="text-2xl font-bold text-primary">15+</div>
                  <div className="text-xs text-slate-500 mt-1">Years Teaching</div>
                </div>
                <div className="text-center p-4 bg-slate-50 rounded">
                  <div className="text-2xl font-bold text-primary">1-to-1</div>
                  <div className="text-xs text-slate-500 mt-1">All Sessions</div>
                </div>
                <div className="text-center p-4 bg-slate-50 rounded">
                  <div className="text-2xl font-bold text-primary">5</div>
                  <div className="text-xs text-slate-500 mt-1">Programmes</div>
                </div>
              </div>
            </div>
            <div className="bg-primary/5 p-8 rounded-lg border border-primary/10">
              <p className="text-2xl font-arabic text-dark leading-loose text-right mb-4" dir="rtl">
                اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ
              </p>
              <p className="text-slate-600 italic">"Read in the name of your Lord who created."</p>
              <p className="text-sm text-slate-400 mt-2">— Surah Al-'Alaq, 96:1</p>
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
            <p className="text-primary font-semibold text-sm tracking-wide uppercase mb-3">Simple Pricing</p>
            <h2 className="text-2xl md:text-3xl font-bold text-dark mb-3">Invest in your journey</h2>
            <p className="text-slate-500">All plans include a free assessment session. No contracts — cancel anytime.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {PRICING.map((tier, idx) => (
              <div key={idx} className={`p-6 rounded-lg border-2 transition-shadow ${
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
                  <h3 className="font-bold text-dark text-lg">{tier.title}</h3>
                  <p className="text-sm text-slate-500 mb-3">{tier.sessions}</p>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-3xl font-extrabold text-dark">{tier.price}</span>
                    <span className="text-slate-400 text-sm">{tier.frequency}</span>
                  </div>
                </div>
                <ul className="space-y-2.5 mb-6">
                  {tier.features.map((feat, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-slate-600">
                      <Check size={14} className="text-primary shrink-0" /> {feat}
                    </li>
                  ))}
                </ul>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
                  className={`block text-center py-2.5 rounded font-semibold text-sm transition-colors ${
                    tier.highlight
                      ? 'bg-primary text-white hover:bg-primary-light'
                      : 'border border-slate-200 text-slate-700 hover:border-primary hover:text-primary'
                  }`}>
                  Get Started
                </a>
              </div>
            ))}
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
          <div className="space-y-3">
            {FAQS.map((faq, idx) => (
              <div key={idx} className="bg-white rounded-lg border border-slate-100 overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <span className="font-semibold text-dark">{faq.q}</span>
                  {openFaq === idx ? <ChevronUp size={18} className="text-primary shrink-0" /> : <ChevronDown size={18} className="text-slate-400 shrink-0" />}
                </button>
                {openFaq === idx && (
                  <div className="px-5 pb-5 text-slate-600 text-sm leading-relaxed border-t border-slate-50 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact / CTA */}
      <section id="contact" className="py-16 md:py-24 bg-primary">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Ready to begin?</h2>
          <p className="text-teal-100 text-lg mb-8 max-w-lg mx-auto">
            Start with a free assessment — no obligation. We'll evaluate your level and recommend the right programme for you.
          </p>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-white text-primary px-8 py-4 rounded font-bold text-lg hover:bg-teal-50 transition-colors">
            <Phone size={22} />
            Enquire via WhatsApp
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
                <span className="font-bold">Journey to Knowledge</span>
              </div>
              <p className="text-sm leading-relaxed">
                Personalised Qur'an and Arabic tuition for adults and families. Structured, consistent, and tailored to your goals.
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
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm hover:text-white transition-colors">
                <MessageCircle size={16} /> WhatsApp
              </a>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-6 text-center text-xs text-slate-500">
            <p>&copy; {new Date().getFullYear()} Journey to Knowledge Academy. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp */}
      <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 bg-[#25D366] text-white p-3.5 rounded-full shadow-lg hover:scale-110 transition-transform"
        title="Chat on WhatsApp">
        <svg viewBox="0 0 24 24" className="w-7 h-7 fill-current">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .018 5.396.015 12.03c0 2.12.547 4.189 1.586 6.06L0 24l6.117-1.604a11.774 11.774 0 005.928 1.603h.005c6.634 0 12.032-5.397 12.035-12.032.003-3.218-1.248-6.242-3.523-8.517z"/>
        </svg>
      </a>
    </div>
  );
}
