import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { FORM_COPY, LandingKey } from './content';
import { INTEREST_OPTIONS, LEARNER_OPTIONS, LEVEL_OPTIONS, includesChild, sendEnquiry } from './enquiry';
import { WhatsAppLink } from './WhatsAppLink';

const FIELD = 'w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary text-slate-700 bg-white';
const LABEL = 'block text-sm font-medium text-slate-700 mb-1';

export default function BookingForm({ page, defaultLearner }: { page: LandingKey; defaultLearner: string }) {
  const [name, setName] = useState('');
  const [learner, setLearner] = useState(defaultLearner);
  const [childAge, setChildAge] = useState('');
  const [interest, setInterest] = useState('');
  const [level, setLevel] = useState('');
  const [times, setTimes] = useState('');
  const [message, setMessage] = useState('');
  const [sentUrl, setSentUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSentUrl(sendEnquiry({ name, learner, childAge, interest, level, times, message }, page));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <p className="text-primary font-semibold text-sm tracking-wide uppercase mb-3">{FORM_COPY.eyebrow}</p>
        <h2 className="text-2xl md:text-3xl font-bold text-dark mb-3">{FORM_COPY.h2}</h2>
        <p className="text-slate-600">
          {FORM_COPY.intro}{' '}
          <WhatsAppLink page={page} position="form_intro" className="text-primary font-semibold underline underline-offset-4">
            {FORM_COPY.introLink}
          </WhatsAppLink>
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-lg mx-auto" aria-label="Book a free trial lesson via WhatsApp">
        <div>
          <label htmlFor="booking-name" className={LABEL}>Your name *</label>
          <input id="booking-name" name="name" type="text" required aria-required="true" autoComplete="name"
            value={name} onChange={e => setName(e.target.value)} className={FIELD}
            placeholder="Your name (a parent's name for a child)" />
        </div>
        <div>
          <label htmlFor="booking-learner" className={LABEL}>Who are the lessons for? *</label>
          <select id="booking-learner" name="learner" required aria-required="true"
            value={learner} onChange={e => setLearner(e.target.value)} className={FIELD}>
            <option value="" disabled>Choose one</option>
            {LEARNER_OPTIONS.map(o => <option key={o}>{o}</option>)}
          </select>
        </div>
        {includesChild(learner) && (
          <div>
            <label htmlFor="booking-age" className={LABEL}>Child's age</label>
            <input id="booking-age" name="childAge" type="text" inputMode="text"
              value={childAge} onChange={e => setChildAge(e.target.value)} className={FIELD} placeholder="e.g. 7" />
          </div>
        )}
        <div>
          <label htmlFor="booking-interest" className={LABEL}>What would you like to learn?</label>
          <select id="booking-interest" name="interest" value={interest} onChange={e => setInterest(e.target.value)} className={FIELD}>
            <option value="">Choose one</option>
            {INTEREST_OPTIONS.map(o => <option key={o}>{o}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="booking-level" className={LABEL}>{learner === 'My child' ? "Your child's current level" : 'Current level'} *</label>
          <select id="booking-level" name="level" required aria-required="true"
            value={level} onChange={e => setLevel(e.target.value)} className={FIELD}>
            <option value="" disabled>Choose a level</option>
            {LEVEL_OPTIONS.map(o => <option key={o}>{o}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="booking-times" className={LABEL}>Days and times that suit you (UK time)</label>
          <input id="booking-times" name="times" type="text"
            value={times} onChange={e => setTimes(e.target.value)} className={FIELD}
            placeholder="e.g. weekday mornings, after school, Sundays" />
        </div>
        <div>
          <label htmlFor="booking-message" className={LABEL}>Anything else?</label>
          <textarea id="booking-message" name="message" rows={3}
            value={message} onChange={e => setMessage(e.target.value)} className={`${FIELD} resize-none`}
            placeholder="Questions, or anything we should know" />
        </div>
        <button type="submit"
          className="w-full bg-primary text-white py-3.5 rounded-lg font-semibold text-lg hover:bg-primary-light transition-colors flex items-center justify-center gap-2">
          <Send size={20} aria-hidden="true" />
          {FORM_COPY.button}
        </button>
        {sentUrl && (
          <p role="status" className="text-center text-sm font-medium text-dark bg-primary/5 border border-primary/20 rounded-lg p-3">
            {FORM_COPY.afterSubmit}{' '}
            {/* Fallback only: no second conversion is recorded for this tap. */}
            <a href={sentUrl} target="_blank" rel="noopener noreferrer" className="text-primary font-semibold underline underline-offset-4">
              {FORM_COPY.afterSubmitLink}
            </a>.
          </p>
        )}
        <p className="text-center text-sm text-slate-500">{FORM_COPY.under}</p>
      </form>
    </div>
  );
}
