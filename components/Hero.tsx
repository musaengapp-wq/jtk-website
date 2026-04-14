import React, { useEffect, useState } from 'react';
import { Button } from './UIComponents';
import { ChevronRight, Star, Sparkles, Heart, BookOpen, Sun } from 'lucide-react';

export const Hero: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const parallaxLayers = {
    back: scrollY * 0.15,
    mid: scrollY * 0.25,
    front: scrollY * 0.4,
  };

  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-40 overflow-hidden mesh-bg">
      <div 
        className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-brand-yellow/30 rounded-full blur-[120px] animate-pulse-slow pointer-events-none"
        style={{ transform: `translateY(${parallaxLayers.back}px)` }}
      ></div>
      <div 
        className="absolute bottom-[10%] left-[-10%] w-[400px] h-[400px] bg-brand-teal/20 rounded-full blur-[100px] animate-pulse-slow pointer-events-none"
        style={{ transform: `translateY(${parallaxLayers.mid}px)` }}
      ></div>

      <div className="absolute inset-0 w-full h-full opacity-30 pointer-events-none z-0">
        <div 
          className="absolute top-20 left-20" 
          style={{ transform: `translateY(${parallaxLayers.front}px)` }}
        >
          <div className="animate-float" style={{ animationDelay: '0s' }}>
            <Sparkles className="text-brand-orange opacity-40" size={40} />
          </div>
        </div>
        <div 
          className="absolute bottom-40 right-20" 
          style={{ transform: `translateY(${-parallaxLayers.mid}px)` }}
        >
          <div className="animate-float" style={{ animationDelay: '2s' }}>
            <Heart className="text-brand-purple opacity-40" size={32} />
          </div>
        </div>
        <div 
          className="absolute top-1/3 right-1/4" 
          style={{ transform: `translateY(${parallaxLayers.mid}px)` }}
        >
          <div className="animate-float" style={{ animationDelay: '1s' }}>
            <Sun className="text-brand-yellow opacity-40" size={48} />
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-20">
          
          <div className="flex-1 text-center md:text-left animate-slide-up relative z-20 pb-12 md:pb-0">
            <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-md px-5 py-2.5 rounded-full shadow-soft mb-8 border border-white/50">
              <Star size={18} className="text-brand-yellow fill-brand-yellow" />
              <span className="text-sm font-bold text-slate-700 tracking-tight">Structured Online Academy for Guided Learning</span>
            </div>
            
            <h1 className="font-display text-4xl md:text-5xl lg:text-7xl font-bold text-slate-900 leading-[1.2] mb-12 md:mb-10 tracking-tight drop-shadow-sm max-w-4xl">
              Personalised Qur’an and Arabic learning for adults and families.
            </h1>
            
            <div className="flex flex-col sm:flex-row flex-wrap items-center gap-4 justify-center md:justify-start">
              <Button href="https://wa.me/447933395159" target="_blank" rel="noopener noreferrer" size="lg" className="w-full sm:w-auto group px-10 shadow-xl text-white">
                Enquire via WhatsApp
                <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button href="#about" variant="outline" size="lg" className="w-full sm:w-auto px-10 bg-white/50 backdrop-blur-sm">
                About Us
              </Button>
 
              <Button href="#programmes" variant="ghost" size="lg" className="w-full sm:w-auto px-10">
                Our Programmes
              </Button>
            </div>
          </div>

          <div 
            className="flex-1 w-full relative z-10 md:scale-125 lg:scale-150 transform-gpu" 
            style={{ transform: `translateY(${-parallaxLayers.back * 0.4}px)` }}
          >
            <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="relative group max-w-sm mx-auto md:max-w-none">
                 <div className="absolute inset-0 bg-brand-teal rounded-[4rem] rotate-6 scale-95 opacity-20 transition-transform group-hover:rotate-12 duration-1000"></div>
                 <div className="relative bg-white rounded-[4rem] rounded-tr-[8rem] p-4 shadow-premium transform -rotate-2 hover:rotate-0 transition-all duration-700">
                    <div className="overflow-hidden rounded-[3.5rem] rounded-tr-[7.5rem] aspect-[4/5] relative bg-slate-100 shadow-inner">
                      <img 
                        src="https://images.unsplash.com/photo-1609599006353-e629aaabfeae?q=80&w=1200&auto=format&fit=crop" 
                        alt="The Noble Holy Quran" 
                        className="w-full h-full object-cover transition-transform duration-1000 block"
                      />
                      
                      <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md p-6 rounded-3xl shadow-xl border border-white/50 flex items-center gap-4 animate-slide-up" style={{ animationDelay: '1s' }}>
                         <div className="w-12 h-12 bg-brand-orange text-white rounded-2xl flex items-center justify-center shrink-0 shadow-brand-orange/20">
                            <BookOpen size={24} />
                         </div>
                         <div>
                            <p className="text-xs font-black text-brand-orange uppercase tracking-widest mb-1">Academy Overview</p>
                            <p className="text-sm font-bold text-slate-800">Guided study pathways for sincere learners.</p>
                         </div>
                      </div>
                    </div>
                 </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};