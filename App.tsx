import React, { useEffect, useState } from 'react';
import {
  BookOpen, BookMarked, Star, Award, Languages,
  Check, ChevronDown, ChevronUp, Menu, X, PlayCircle, ShieldCheck, ArrowRight,
} from 'lucide-react';
import {
  PageKey, LandingKey, LegalKey, PageSection, Faq,
  PAGES, LEGAL, TRIAL, PROGRAMMES_COPY, PRICE_TRACKS, PRICING_COPY, STORY, CHILD_SAFETY,
  FAQS, FAQ_COPY, FINAL_CTA, FOOTER, NOT_FOUND, LAST_UPDATED,
  BUTTON_SMALL_LINE, FORM_LINK_TEXT, DEFAULT_BUTTON,
  isLanding, isLegal,
} from './content';
import { SHOW_FOUNDER_VIDEO, SHOW_FOUNDING_OFFER, SHOW_MUSA_QUOTES, TEACHER_NAME } from './flags';
import { isProductionHost, trackCtaClick, trackEvent } from './tracking';
import BookingForm from './BookingForm';
import { WhatsAppIcon, WhatsAppLink } from './WhatsAppLink';

// ---------------------------------------------------------------------------
// Small building blocks

const PRIMARY_BUTTON =
  'inline-flex w-full sm:w-auto items-center justify-center gap-2 bg-primary text-white px-6 py-3.5 rounded-lg font-semibold text-base md:text-lg hover:bg-primary-light transition-colors focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/30';

function buttonLabel(page: PageKey): string {
  return isLanding(page) ? PAGES[page].button : DEFAULT_BUTTON;
}

/** The primary WhatsApp button, with the small line and the form link under it. */
function PrimaryCta({ page, position, formHref, centred = false }: {
  page: PageKey; position: string; formHref: string; centred?: boolean;
}) {
  return (
    <div className={centred ? 'text-center' : ''}>
      <WhatsAppLink page={page} position={position} className={PRIMARY_BUTTON}>
        <WhatsAppIcon />
        {buttonLabel(page)}
      </WhatsAppLink>
      <p className="text-sm text-slate-500 mt-2">{BUTTON_SMALL_LINE}</p>
      <a
        href={formHref}
        onClick={() => trackCtaClick(`${page}:${position}_form_link`, formHref)}
        className="inline-block text-sm text-primary font-semibold underline underline-offset-4 mt-1 hover:text-primary-light"
      >
        {FORM_LINK_TEXT}
      </a>
    </div>
  );
}

/** Highlighted note for something Musa still has to confirm. Shown on previews only, never on the live site. */
function ConfirmMarker({ label }: { label: string }) {
  if (isProductionHost()) return null;
  return <mark className="bg-amber-200 text-amber-950 px-1 rounded font-semibold">[{label}]</mark>;
}

function SectionHeading({ eyebrow, h2, centred = true }: { eyebrow?: string; h2: string; centred?: boolean }) {
  return (
    <div className={`${centred ? 'text-center mx-auto' : ''} max-w-2xl mb-10`}>
      {eyebrow && <p className="text-primary font-semibold text-sm tracking-wide uppercase mb-3">{eyebrow}</p>}
      <h2 className="text-2xl md:text-3xl font-bold text-dark">{h2}</h2>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Nav

function Nav({ page, base }: { page: PageKey; base: string }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const links = [
    { name: 'What we teach', href: `${base}#programmes` },
    { name: 'Prices', href: `${base}#pricing` },
    { name: 'Our story', href: `${base}#story` },
    { name: 'FAQs', href: `${base}#faq` },
  ];
  const trialHref = `${base}#how-it-works`;

  return (
    <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 border-b border-slate-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between h-16 items-center">
          <a href="/" className="flex items-center gap-2">
            <BookOpen className="text-primary" size={24} aria-hidden="true" />
            <span className="font-bold text-dark text-lg">JTK Academy</span>
          </a>

          <div className="hidden md:flex items-center gap-5">
            {links.map(link => (
              <a key={link.name} href={link.href} className="text-slate-600 hover:text-primary text-sm font-medium transition-colors">
                {link.name}
              </a>
            ))}
            <a href={trialHref}
              onClick={() => trackCtaClick(`${page}:desktop_nav`, trialHref)}
              className="bg-primary text-white px-5 py-2 text-sm font-semibold hover:bg-primary-light transition-colors rounded">
              Free trial
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
        <div id="mobile-menu" aria-label="Mobile navigation" className="md:hidden bg-white border-t border-slate-100 px-4 py-3 space-y-2">
          {links.map(link => (
            <a key={link.name} href={link.href} onClick={() => setIsMenuOpen(false)}
              className="block py-2 text-slate-600 font-medium">{link.name}</a>
          ))}
          <a href={trialHref} onClick={() => {
            setIsMenuOpen(false);
            trackCtaClick(`${page}:mobile_nav`, trialHref);
          }}
            className="block bg-primary text-white text-center py-3 rounded font-semibold mt-2">
            Free trial
          </a>
        </div>
      )}
    </nav>
  );
}

// ---------------------------------------------------------------------------
// Hero

function Hero({ page }: { page: LandingKey }) {
  const p = PAGES[page];
  return (
    <section className="pt-20 pb-12 md:pt-32 md:pb-20 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:flex lg:items-center lg:gap-12">
        <div className="max-w-3xl lg:flex-1">
          <p className="text-primary font-semibold text-[13px] sm:text-sm sm:tracking-wide sm:uppercase mb-3">{p.eyebrow}</p>
          <h1 className="text-[28px] sm:text-4xl md:text-5xl font-extrabold text-dark leading-tight mb-4 md:mb-6">{p.h1}</h1>
          <p className="text-base md:text-lg text-slate-600 mb-4 md:mb-6 max-w-2xl leading-relaxed">{p.sub}</p>
          <ul className="grid grid-cols-2 gap-x-3 gap-y-1.5 sm:flex sm:flex-wrap sm:gap-x-6 sm:gap-y-2 text-sm text-slate-600 mb-5 md:mb-8">
            {p.ticks.map((tick, i) => (
              <li key={tick} className={`flex items-start gap-1.5 ${p.ticks.length % 2 === 1 && i === p.ticks.length - 1 ? 'col-span-2' : ''}`}>
                <Check size={16} className="text-primary shrink-0 mt-0.5" aria-hidden="true" />{tick}
              </li>
            ))}
          </ul>
          <PrimaryCta page={page} position="hero" formHref="#book" />
          {page === 'home' && (
            <a href="#story" className="inline-flex items-center gap-2 mt-5 text-primary font-semibold underline underline-offset-4 hover:text-primary-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">
              <PlayCircle size={20} aria-hidden="true" /> Meet Musa, our founder (47-second video)
            </a>
          )}
        </div>
        {/* Decoration only (large screens): the first Arabic letters on brand teal. */}
        <div aria-hidden="true" className="hidden lg:grid shrink-0 w-80 h-80 rounded-3xl bg-primary grid-cols-3 place-items-center p-8 shadow-xl" dir="rtl">
          {['ا', 'ب', 'ت', 'ث', 'ج', 'ح'].map(letter => (
            <span key={letter} className="text-7xl font-bold text-white/30" style={{ fontFamily: '"Geeza Pro", "Noto Naskh Arabic", "Segoe UI", "Arial", serif' }}>{letter}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Page-specific sections

function PageSections({ sections }: { sections: PageSection[] }) {
  const visible = sections.filter(s => s.type !== 'musaQuote' || SHOW_MUSA_QUOTES);
  if (visible.length === 0) return null;
  return (
    <section className="py-14 md:py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-14">
        {visible.map((s, i) => <React.Fragment key={i}><PageSectionBlock section={s} /></React.Fragment>)}
      </div>
    </section>
  );
}

function PageSectionBlock({ section: s }: { section: PageSection }) {
  switch (s.type) {
    case 'audienceCards':
      return (
        <div>
          <SectionHeading h2={s.h2} />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {s.cards.map(card => (
              <a key={card.title} href={card.href} className="group block bg-slate-50 p-6 rounded-lg border border-slate-100 hover:border-primary/30 transition-colors">
                <h3 className="text-lg font-bold text-dark mb-2">{card.title}</h3>
                <p className="text-slate-600 text-sm mb-4">{card.text}</p>
                <span className="text-primary font-semibold text-sm group-hover:underline underline-offset-4">{card.link}</span>
              </a>
            ))}
          </div>
        </div>
      );
    case 'steps':
      return (
        <div className="max-w-3xl mx-auto">
          <SectionHeading h2={s.h2} />
          <ol className="space-y-5">
            {s.steps.map((step, i) => (
              <li key={step.lead} className="flex gap-4">
                <span className="shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center">{i + 1}</span>
                <p className="text-slate-600 pt-1"><strong className="text-dark">{step.lead}</strong> {step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      );
    case 'bullets':
      return (
        <div className="max-w-3xl mx-auto">
          <SectionHeading h2={s.h2} />
          {s.intro && <p className="text-slate-600 leading-relaxed mb-6">{s.intro}</p>}
          <ul className="space-y-3">
            {s.bullets.map(b => (
              <li key={b} className="flex items-start gap-3 text-slate-600">
                <Check size={18} className="text-primary shrink-0 mt-0.5" aria-hidden="true" />{b}
              </li>
            ))}
          </ul>
        </div>
      );
    case 'cards':
      return (
        <div>
          <SectionHeading h2={s.h2} />
          <div className="grid md:grid-cols-3 gap-5">
            {s.cards.map(card => (
              <div key={card.title} className="bg-slate-50 p-6 rounded-lg border border-slate-100">
                <h3 className="font-bold text-dark mb-2">{card.title}</h3>
                <p className="text-slate-600 text-sm">{card.text}</p>
              </div>
            ))}
          </div>
          {s.closing && <p className="text-center text-slate-700 font-medium mt-8 max-w-2xl mx-auto">{s.closing}</p>}
        </div>
      );
    case 'qa':
      return (
        <div>
          <SectionHeading h2={s.h2} />
          <div className="grid md:grid-cols-2 gap-5">
            {s.items.map(item => (
              <div key={item.q} className="bg-slate-50 p-6 rounded-lg border border-slate-100">
                <h3 className="font-bold text-dark mb-2">{item.q}</h3>
                <p className="text-slate-600 text-sm">{item.a}</p>
                {item.link && <a href={item.link.href} className="inline-block mt-3 text-primary font-semibold text-sm underline underline-offset-4">{item.link.text}</a>}
              </div>
            ))}
          </div>
        </div>
      );
    case 'musaQuote':
      return (
        <figure className="max-w-2xl mx-auto bg-slate-50 border-l-4 border-primary rounded-r-lg p-6">
          <p className="text-primary font-semibold text-sm tracking-wide uppercase mb-3">A note from Musa</p>
          <blockquote className="text-slate-700 leading-relaxed">“{s.text}”</blockquote>
          <figcaption className="text-sm text-slate-500 mt-3">Musa, founder</figcaption>
        </figure>
      );
  }
}

// ---------------------------------------------------------------------------
// Shared sections

function TrialSection({ page }: { page: LandingKey }) {
  return (
    <section id="how-it-works" className="py-14 md:py-20 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionHeading eyebrow={TRIAL.eyebrow} h2={TRIAL.h2} />
        <ol className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {TRIAL.steps.map((step, i) => (
            <li key={step.lead} className="bg-white p-6 rounded-lg border border-slate-100">
              <p className="text-primary font-bold mb-2">Step {i + 1}</p>
              <h3 className="font-bold text-dark mb-2">{step.lead}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{step.text}</p>
            </li>
          ))}
        </ol>
        <PrimaryCta page={page} position="trial_section" formHref="#book" centred />
      </div>
    </section>
  );
}

const PROGRAMME_ICONS: Record<string, typeof BookOpen> = {
  read: BookOpen, quran: BookMarked, tajweed: Star, hifz: Award, arabic: Languages,
};

function Programmes() {
  return (
    <section id="programmes" className="py-14 md:py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionHeading eyebrow={PROGRAMMES_COPY.eyebrow} h2={PROGRAMMES_COPY.h2} />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROGRAMMES_COPY.items.map(prog => {
            const Icon = PROGRAMME_ICONS[prog.key];
            return (
              <div key={prog.key} className="bg-slate-50 p-6 rounded-lg border border-slate-100">
                <div className="w-10 h-10 bg-primary/10 text-primary rounded flex items-center justify-center mb-4">
                  <Icon size={20} aria-hidden="true" />
                </div>
                <h3 className="text-lg font-bold text-dark mb-3">{prog.title}</h3>
                <ul className="space-y-2">
                  {prog.points.map(point => (
                    <li key={point} className="flex items-start gap-2 text-sm text-slate-600">
                      <Check size={14} className="text-primary shrink-0 mt-0.5" aria-hidden="true" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  const [trackKey, setTrackKey] = useState<'30' | '60'>('30');
  const track = PRICE_TRACKS.find(t => t.key === trackKey)!;

  return (
    <section id="pricing" className="py-14 md:py-20 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <p className="text-primary font-semibold text-sm tracking-wide uppercase mb-3">{PRICING_COPY.eyebrow}</p>
          <h2 className="text-2xl md:text-3xl font-bold text-dark mb-3">{PRICING_COPY.h2}</h2>
          <p className="text-slate-600">{PRICING_COPY.intro}</p>
        </div>

        <div className="flex justify-center mb-4">
          <div className="inline-flex w-full max-w-md rounded-xl border border-slate-200 bg-white p-1">
            {PRICE_TRACKS.map(t => (
              <button
                key={t.key}
                type="button"
                aria-pressed={trackKey === t.key}
                onClick={() => {
                  setTrackKey(t.key);
                  trackEvent('view_item_list', { item_list_name: 'pricing', pricing_track: t.tab });
                }}
                className={`flex-1 rounded-lg px-3 py-3 text-sm font-semibold transition-colors ${
                  trackKey === t.key ? 'bg-primary text-white shadow-sm' : 'text-slate-600 hover:text-dark'
                }`}
              >
                {t.tab}
              </button>
            ))}
          </div>
        </div>
        <p className="text-center text-sm text-slate-600 max-w-xl mx-auto mb-8">{track.note}</p>

        <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {track.plans.map(plan => (
            <div key={plan.id} className={`relative p-6 rounded-xl bg-white flex flex-col border ${plan.suggestion ? 'border-primary ring-1 ring-primary' : 'border-slate-200'}`}>
              {plan.suggestion && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap">{PRICING_COPY.suggestion}</span>
              )}
              <div className="text-center mb-5">
                <h3 className="font-bold text-dark text-xl mb-2">{plan.title}</h3>
                <p className="text-sm text-slate-600 mb-3">{plan.sessions}</p>
                <p><span className="text-3xl font-extrabold text-dark">£{plan.price}</span> <span className="text-slate-500 text-sm">{PRICING_COPY.per}</span></p>
              </div>
              <a href="#how-it-works" onClick={() => {
                trackEvent('select_item', { item_list_name: 'pricing', item_name: plan.id, price_per_4_weeks: plan.price });
              }} className="mt-auto block text-center py-3 rounded font-semibold text-sm bg-primary text-white hover:bg-primary-light transition-colors">
                {PRICING_COPY.cardButton}
              </a>
            </div>
          ))}
        </div>

        <div className="max-w-3xl mx-auto mt-8 bg-white rounded-xl p-5 md:p-6 border border-slate-200 space-y-3 text-sm text-slate-600">
          <p><strong className="text-dark">{PRICING_COPY.payment.lead}</strong> {PRICING_COPY.payment.text}</p>
          <p><strong className="text-dark">{PRICING_COPY.family.lead}</strong> {PRICING_COPY.family.text}</p>
          {SHOW_FOUNDING_OFFER && <p>{PRICING_COPY.founding}</p>}
          <p>{PRICING_COPY.schedule}</p>
        </div>
      </div>
    </section>
  );
}

function Story() {
  return (
    <section id="story" className="py-14 md:py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-2 gap-10 lg:gap-14 items-start">
          <div>
            <p className="text-primary font-semibold text-sm tracking-wide uppercase mb-3">{STORY.eyebrow}</p>
            <h2 className="text-2xl md:text-3xl font-bold text-dark mb-6">{STORY.h2}</h2>
            <div className="space-y-4 text-slate-600 leading-relaxed">
              <p>{STORY.p1}</p>
              {STORY.p1b && <p>{STORY.p1b}</p>}
              <p>{STORY.p2}</p>
              <p>{STORY.p3}</p>
            </div>
            <div className="bg-slate-50 p-6 rounded-lg border border-slate-100 mt-8">
              <h3 className="font-bold text-dark mb-3">{STORY.teacherH3}</h3>
              {TEACHER_NAME
                ? <p className="font-semibold text-dark mb-2">Ustadha {TEACHER_NAME}</p>
                : <p className="mb-2"><ConfirmMarker label="CONFIRM-TEACHER-NAME: leave empty or add a name" /></p>}
              <p className="text-sm text-slate-600 leading-relaxed">{STORY.teacherText}</p>
              {STORY.maleTeacher && <p className="text-sm text-slate-600 mt-2">{STORY.maleTeacher}</p>}
            </div>
          </div>
          <div className="space-y-6">
            {SHOW_FOUNDER_VIDEO && (
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
                <figcaption className="text-sm text-slate-500 mt-3">{STORY.videoCaption}</figcaption>
              </figure>
            )}
            <div className="bg-slate-50 p-6 rounded-lg border border-slate-100">
              <h3 className="font-bold text-dark mb-4">{STORY.whatYouGetH3}</h3>
              <ul className="space-y-3">
                {STORY.whatYouGet.map(item => (
                  <li key={item} className="flex items-start gap-3 text-sm text-slate-600">
                    <Check size={16} className="text-primary shrink-0 mt-0.5" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ChildSafety() {
  return (
    <section aria-labelledby="child-safety" className="py-12 md:py-16 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 md:p-8">
          <h3 id="child-safety" className="flex items-center gap-2 text-xl font-bold text-dark mb-4">
            <ShieldCheck className="text-primary" size={24} aria-hidden="true" />{CHILD_SAFETY.h3}
          </h3>
          <ul className="space-y-3 mb-5">
            {CHILD_SAFETY.bullets.map(b => (
              <li key={b} className="flex items-start gap-3 text-slate-600">
                <Check size={18} className="text-primary shrink-0 mt-0.5" aria-hidden="true" />{b}
              </li>
            ))}
          </ul>
          <a href="/safeguarding" className="text-primary font-semibold underline underline-offset-4">{CHILD_SAFETY.link}</a>
        </div>
      </div>
    </section>
  );
}

function FaqSection({ faqs }: { faqs: Faq[] }) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  return (
    <section id="faq" className="py-14 md:py-20 bg-slate-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <SectionHeading eyebrow={FAQ_COPY.eyebrow} h2={FAQ_COPY.h2} />
        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            const buttonId = `faq-button-${idx}`;
            const panelId = `faq-panel-${idx}`;
            return (
              <div key={faq.q} className="bg-white rounded-lg border border-slate-100 overflow-hidden">
                <button
                  id={buttonId}
                  onClick={() => {
                    setOpenFaq(isOpen ? null : idx);
                    if (!isOpen) trackEvent('select_content', { content_type: 'faq', item_id: faq.q });
                  }}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  className="w-full flex items-center justify-between gap-3 p-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                >
                  <span className="font-semibold text-dark">{faq.q}</span>
                  {isOpen
                    ? <ChevronUp size={18} className="text-primary shrink-0" aria-hidden="true" />
                    : <ChevronDown size={18} className="text-slate-400 shrink-0" aria-hidden="true" />}
                </button>
                {isOpen && (
                  <div id={panelId} role="region" aria-labelledby={buttonId}
                    className="px-5 pb-5 text-slate-600 text-sm leading-relaxed border-t border-slate-50 pt-3">
                    {faq.a}
                    {faq.link && <> <a href={faq.link.href} className="text-primary font-semibold underline underline-offset-4">{faq.link.text}</a></>}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function FinalCta({ page }: { page: PageKey }) {
  return (
    <section className="py-14 md:py-20 bg-primary">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">{FINAL_CTA.h2}</h2>
        <p className="text-teal-50 text-lg mb-8 max-w-lg mx-auto">{FINAL_CTA.p}</p>
        <WhatsAppLink page={page} position="final_cta"
          className="inline-flex w-full sm:w-auto items-center justify-center gap-2 bg-white text-primary px-6 py-4 rounded-lg font-bold text-base md:text-lg hover:bg-teal-50 transition-colors">
          <WhatsAppIcon />
          {buttonLabel(page)}
        </WhatsAppLink>
      </div>
    </section>
  );
}

function Footer({ page }: { page: PageKey }) {
  return (
    <footer className="bg-dark text-slate-400 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 text-white mb-4">
              <BookOpen className="text-primary-light" size={20} aria-hidden="true" />
              <span className="font-bold">JTK Academy</span>
            </div>
            <p className="text-sm leading-relaxed">{FOOTER.about}</p>
          </div>
          <div>
            <h2 className="text-white font-semibold text-sm mb-4">Links</h2>
            <ul className="grid grid-cols-2 gap-2 text-sm">
              {FOOTER.links.map(link => (
                <li key={link.text}><a href={link.href} className="hover:text-white transition-colors">{link.text}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-white font-semibold text-sm mb-4">Contact</h2>
            <WhatsAppLink page={page} position="footer"
              className="inline-flex items-center gap-2 text-sm hover:text-white transition-colors">
              <WhatsAppIcon className="w-4 h-4" /> {FOOTER.contact}
            </WhatsAppLink>
          </div>
        </div>
        <div className="border-t border-slate-800 pt-6 text-center text-xs text-slate-500">
          <p>&copy; {new Date().getFullYear()} Journey to Knowledge Academy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

function FloatingWhatsApp({ page }: { page: PageKey }) {
  // Mobile: sits in the nav bar, left of the menu button. Desktop: bottom-right.
  return (
    <WhatsAppLink page={page} position="floating"
      className="block fixed top-2 right-20 md:top-auto md:bottom-6 md:right-6 z-[60] md:z-40 bg-[#25D366] text-white p-2.5 md:p-3.5 rounded-full shadow-lg hover:scale-110 transition-transform focus:outline-none focus-visible:ring-4 focus-visible:ring-[#25D366]/40"
      title="Chat on WhatsApp"
      ariaLabel="Chat with JTK Academy on WhatsApp">
      <WhatsAppIcon className="w-6 h-6 sm:w-7 sm:h-7" />
    </WhatsAppLink>
  );
}

// ---------------------------------------------------------------------------
// Page layouts

function LandingPageView({ page }: { page: LandingKey }) {
  const config = PAGES[page];
  return (
    <>
      <Hero page={page} />
      <PageSections sections={config.sections} />
      <TrialSection page={page} />
      <Programmes />
      <Pricing />
      <Story />
      {config.childSafety && <ChildSafety />}
      <FaqSection faqs={FAQS} />
      <section id="book" className="py-14 md:py-20 bg-white">
        <BookingForm page={page} defaultLearner={config.defaultLearner} />
      </section>
      <FinalCta page={page} />
    </>
  );
}

function LegalPageView({ page }: { page: LegalKey }) {
  const legal = LEGAL[page];
  return (
    <>
      <main className="pt-24 pb-14 md:pt-32 md:pb-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h1 className="text-3xl md:text-4xl font-extrabold text-dark mb-3">{legal.h1}</h1>
          {legal.updated && <p className="text-sm text-slate-500 mb-4">Last updated: {LAST_UPDATED}</p>}
          <p className="text-slate-600 mb-10">{legal.intro}</p>
          <div className="space-y-7">
            {legal.items.map(item => (
              <section key={item.heading}>
                <h2 className="text-lg font-bold text-dark mb-2">{item.heading}</h2>
                <p className="text-slate-600 leading-relaxed">
                  {item.text}
                  {item.confirm && <> <ConfirmMarker label={item.confirm} /></>}
                  {item.after && <> {item.after}</>}
                </p>
              </section>
            ))}
          </div>
        </div>
      </main>
      <FinalCta page={page} />
    </>
  );
}

function NotFoundView() {
  return (
    <main className="pt-28 pb-20 md:pt-40 md:pb-28 bg-slate-50">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
        <h1 className="text-3xl md:text-4xl font-extrabold text-dark mb-4">{NOT_FOUND.h1}</h1>
        <p className="text-lg text-slate-600 mb-8">{NOT_FOUND.p}</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <WhatsAppLink page="notFound" position="hero" className={PRIMARY_BUTTON}>
            <WhatsAppIcon />
            {NOT_FOUND.button}
          </WhatsAppLink>
          <a href="/" className="inline-flex w-full sm:w-auto items-center justify-center gap-2 border-2 border-slate-200 text-slate-700 px-6 py-3.5 rounded-lg font-semibold hover:border-primary hover:text-primary transition-colors">
            {NOT_FOUND.home} <ArrowRight size={18} aria-hidden="true" />
          </a>
        </div>
      </div>
    </main>
  );
}

export default function App({ page }: { page: PageKey }) {
  useEffect(() => {
    // On a fresh visit, the browser may try to follow the hash before React renders its target.
    const targetId = window.location.hash.slice(1);
    if (!targetId) return;

    let userScrolled = false;
    const markScrolled = () => { userScrolled = true; };
    const jump = () => {
      if (!userScrolled) document.getElementById(targetId)?.scrollIntoView({ behavior: 'instant' as ScrollBehavior });
    };
    window.addEventListener('wheel', markScrolled, { once: true, passive: true });
    window.addEventListener('touchstart', markScrolled, { once: true, passive: true });
    const frame = window.requestAnimationFrame(jump);
    // Web fonts arriving can shift the page, so jump again once they've loaded (e.g. links to /#pricing from ads).
    document.fonts?.ready.then(jump);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('wheel', markScrolled);
      window.removeEventListener('touchstart', markScrolled);
    };
  }, []);

  // Landing pages have every section, so in-page anchors work; other pages link back to home.
  const base = isLanding(page) ? '' : '/';

  return (
    <div className="min-h-screen font-sans">
      <Nav page={page} base={base} />
      {isLanding(page) && <LandingPageView page={page} />}
      {isLegal(page) && <LegalPageView page={page} />}
      {page === 'notFound' && <NotFoundView />}
      <Footer page={page} />
      <FloatingWhatsApp page={page} />
    </div>
  );
}
