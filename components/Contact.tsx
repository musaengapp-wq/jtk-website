import React, { useState } from 'react';
import { SectionHeading, Button } from './UIComponents';
import { FAQS } from '../constants';
import { ChevronDown, ChevronUp, MessageCircle } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="bg-gradient-to-b from-white to-sky-50 dark:from-slate-900 dark:to-slate-800">
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          <SectionHeading title="Frequently Asked Questions" />
          <div className="space-y-4">
            {FAQS.map((faq, idx) => (
              <div key={idx} className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
                <button 
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                >
                  <span className="font-bold text-slate-700 dark:text-slate-200 text-lg">{faq.question}</span>
                  {openFaq === idx ? <ChevronUp className="text-brand-teal" /> : <ChevronDown className="text-slate-400" />}
                </button>
                {openFaq === idx && (
                  <div className="px-6 pb-6 text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-50 dark:border-slate-700 pt-4 bg-slate-50/50 dark:bg-slate-900/50">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
             <div className="absolute top-20 left-10 w-20 h-20 bg-brand-yellow rounded-full opacity-20"></div>
             <div className="absolute bottom-20 right-10 w-32 h-32 bg-brand-teal rounded-full opacity-10"></div>
        </div>

        <div className="container mx-auto px-4 md:px-6">
          <div className="bg-white dark:bg-slate-800 rounded-[3rem] shadow-2xl overflow-hidden max-w-4xl mx-auto border border-slate-100 dark:border-slate-700">
            <div className="flex flex-col md:flex-row items-center">
              <div className="bg-brand-teal p-10 md:p-16 text-white md:w-1/2 flex flex-col justify-center h-full">
                <h3 className="font-display text-4xl font-bold mb-6">Book Your Free Assessment</h3>
                <p className="text-teal-50 mb-8 text-xl leading-relaxed">
                  Click below to speak directly with us on WhatsApp. We usually reply within minutes.
                </p>
                <div className="flex items-center gap-4 text-teal-100">
                  <div className="bg-white/20 p-3 rounded-full"><MessageCircle size={24} /></div>
                  <span className="font-bold text-lg">Direct Support Available</span>
                </div>
              </div>

              <div className="p-10 md:p-16 md:w-1/2 flex flex-col items-center justify-center bg-white dark:bg-slate-800 text-center">
                <div className="w-20 h-20 bg-brand-teal/10 text-brand-teal rounded-full flex items-center justify-center mb-8">
                  <MessageCircle size={40} />
                </div>
                <h4 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Ready to Start?</h4>
                <p className="text-slate-600 dark:text-slate-400 mb-10 max-w-xs">
                  Join our academy today and begin your journey to knowledge with expert guidance.
                </p>
                <Button 
                  href="https://wa.me/447933395159" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  size="lg" 
                  className="w-full py-6 text-xl shadow-brand-teal/30 text-white"
                >
                  Start WhatsApp Chat
                </Button>
                <p className="text-xs text-slate-400 mt-6">Average response time: <span className="text-brand-teal font-bold">5 minutes</span></p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};