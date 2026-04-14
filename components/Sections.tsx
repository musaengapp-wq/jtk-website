import React from 'react';
import { SectionHeading, Card, IconWrapper, Button } from './UIComponents';
import { PROGRAMMES, VALUES } from '../constants';
import { CheckCircle, Star, BookOpen, Heart } from 'lucide-react';

// --- About Section ---
export const AboutSection: React.FC = () => (
  <section id="about" className="py-32 bg-white relative overflow-hidden">
    <div className="absolute top-40 left-0 w-64 h-64 bg-brand-teal/5 rounded-full -translate-x-1/2 blur-3xl"></div>
    
    <div className="container mx-auto px-4 md:px-6 relative z-10">
      <SectionHeading 
        title="Our Commitment to Progress" 
        subtitle="Empowering adults and families with methodical instruction and authentic guidance."
        theme="teal"
      />
      
      <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-32">
        <div className="relative animate-fade-in max-w-2xl mx-auto lg:max-w-none">
          <div className="absolute -top-6 -left-6 w-32 h-32 bg-brand-yellow/20 rounded-full blur-2xl"></div>
          <div className="rounded-[3rem] shadow-premium border-[12px] border-slate-50 overflow-hidden bg-slate-100">
            <img 
              src="https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?q=80&w=1000&auto=format&fit=crop" 
              alt="Islamic Library" 
              className="w-full h-auto object-cover relative z-10 block"
            />
          </div>
          <div className="absolute -bottom-10 -right-10 bg-white p-6 rounded-[2.5rem] shadow-premium z-20 border border-slate-50 hidden md:block max-w-[200px] text-center">
            <div className="text-3xl font-bold text-brand-teal mb-1">15+</div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Years of Teaching Experience</p>
          </div>
        </div>
        
        <div className="space-y-10 animate-slide-up">
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 flex items-center gap-3">
              <span className="w-10 h-1 bg-brand-teal rounded-full"></span> Our Mission
            </h3>
            <p className="text-slate-600 leading-relaxed text-lg md:text-xl font-medium">
              We provide a bridge between traditional standards and modern instructional clarity. Every learner is unique, and our mission is to ensure adults and families develop a sustainable and sincere connection with the Qur'an through disciplined study.
            </p>
          </div>
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 flex items-center gap-3">
              <span className="w-10 h-1 bg-brand-orange rounded-full"></span> Our Approach
            </h3>
            <p className="text-slate-600 leading-relaxed text-lg md:text-xl font-medium">
              To be a trusted partner in Arabic and Qur'an education, where consistency is prioritized over speed, and progress is measured by depth of understanding and accuracy.
            </p>
          </div>
          <div className="pt-4 flex flex-col sm:flex-row gap-4">
            <Button href="#programmes" variant="secondary" className="px-10">Our Curriculum</Button>
            <Button 
              href="https://wa.me/447933395159" 
              target="_blank" 
              rel="noopener noreferrer" 
              variant="outline" 
              className="px-10"
            >
              Enquire via WhatsApp
            </Button>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// --- Programmes Section ---
export const ProgrammesSection: React.FC = () => (
  <section id="programmes" className="py-32 bg-slate-50 relative">
    <div className="container mx-auto px-4 md:px-6">
      <SectionHeading 
        title="Our Programmes" 
        subtitle="Structured courses designed for adults and families who value clarity and consistency."
        theme="orange"
      />
      
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {PROGRAMMES.map((prog, idx) => (
          <Card key={idx} className="flex flex-col h-full p-8 md:p-10">
            <IconWrapper icon={prog.icon} color={prog.color} bgColor={prog.bgColor} />
            <h3 className="text-xl md:text-2xl font-bold text-slate-800 mb-6">{prog.title}</h3>
            <ul className="space-y-3 md:space-y-4 mb-10 flex-1">
              {prog.description.map((desc, i) => (
                <li key={i} className="flex items-start gap-3 text-slate-600">
                  <CheckCircle size={18} className="text-brand-teal shrink-0 mt-1" />
                  <span className="text-sm md:text-base font-medium leading-relaxed">{desc}</span>
                </li>
              ))}
            </ul>
            <Button 
              href="https://wa.me/447933395159" 
              target="_blank" 
              rel="noopener noreferrer" 
              variant="outline" 
              size="md" 
              className="w-full"
            >
              Enquire via WhatsApp
            </Button>
          </Card>
        ))}
      </div>
    </div>
  </section>
);

// --- Why Us Section ---
export const WhyUsSection: React.FC = () => (
  <section className="py-32 bg-white overflow-hidden">
    <div className="container mx-auto px-4 md:px-6">
      <SectionHeading 
        title="Our Methodology" 
        subtitle="We prioritize disciplined progress and personal guidance for every student."
        theme="purple"
      />
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
        {VALUES.map((value, idx) => (
          <div key={idx} className="group p-8 rounded-[2.5rem] bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-premium transition-all duration-500">
            <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center text-brand-purple mb-6 transition-transform">
              <value.icon size={32} />
            </div>
            <h4 className="text-xl font-bold text-slate-800 mb-4">{value.title}</h4>
            <p className="text-slate-500 leading-relaxed font-medium">{value.description}</p>
          </div>
        ))}
      </div>
      
      <div className="mt-20 bg-brand-teal rounded-[3rem] p-10 md:p-16 text-white flex flex-col md:flex-row items-center justify-between gap-10 shadow-premium relative overflow-hidden">
         <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
         <div className="relative z-10 text-center md:text-left">
            <h3 className="text-3xl md:text-4xl font-bold mb-4 text-white">Begin your study today</h3>
            <p className="text-teal-50 text-lg md:text-xl font-medium opacity-90">Enquire about your free trial today!</p>
         </div>
         <Button 
           href="https://wa.me/447933395159" 
           target="_blank" 
           rel="noopener noreferrer" 
           variant="primary" 
           className="bg-white hover:bg-teal-50 border-none px-10 text-brand-teal"
         >
           Enquire via WhatsApp
         </Button>
      </div>
    </div>
  </section>
);