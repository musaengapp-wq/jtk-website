import React, { useState } from 'react';
import { SectionHeading, Button, Card } from './UIComponents';
import { PRICING_TIERS_1TO1 } from '../constants';
import { Check } from 'lucide-react';

export const PricingSection: React.FC = () => {
  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeading 
          title="Simple Pricing" 
          subtitle="Invest in your child's future with affordable, flexible plans."
        />

        {/* Content */}
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {PRICING_TIERS_1TO1.map((tier, idx) => (
              <div key={idx} className={`relative rounded-3xl p-8 border-2 transition-transform hover:-translate-y-2 ${tier.highlight ? 'border-brand-blue bg-sky-50 shadow-xl z-10 scale-105 md:scale-110' : 'border-slate-100 bg-white shadow-lg'}`}>
                {tier.highlight && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand-blue text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wide">
                    Most Popular
                  </div>
                )}
                <div className="text-center mb-6">
                  <h3 className="font-display font-bold text-xl text-slate-800">{tier.title}</h3>
                  <p className="text-slate-500 text-sm mb-4">{tier.description}</p>
                  <div className="flex justify-center items-baseline gap-1">
                    <span className="text-4xl font-bold text-slate-800">{tier.price}</span>
                    <span className="text-slate-500">{tier.frequency}</span>
                  </div>
                </div>
                <ul className="space-y-3 mb-8">
                  {tier.features.map((feat, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-slate-600">
                      <div className={`p-1 rounded-full ${tier.highlight ? 'bg-brand-blue/20 text-brand-blue' : 'bg-slate-100 text-slate-400'}`}>
                         <Check size={12} strokeWidth={3} />
                      </div>
                      {feat}
                    </li>
                  ))}
                  <li className="flex items-center gap-3 text-sm text-slate-600">
                      <div className={`p-1 rounded-full ${tier.highlight ? 'bg-brand-blue/20 text-brand-blue' : 'bg-slate-100 text-slate-400'}`}>
                         <Check size={12} strokeWidth={3} />
                      </div>
                      Free Assessment
                  </li>
                </ul>
                <Button 
                  href="#contact"
                  variant={tier.highlight ? 'primary' : 'outline'} 
                  className="w-full"
                >
                  Choose Plan
                </Button>
              </div>
            ))}
            {/* Additional tiers text removed to maintain consistency with new pricing */}
          </div>
        </div>

      </div>
    </section>
  );
};