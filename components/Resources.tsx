import React, { useState, useRef, useEffect, useCallback } from 'react';
import { SectionHeading, Button, Tooltip } from './UIComponents';
import { FREE_RESOURCES } from '../constants';
import { X, RotateCcw, Volume2, ChevronLeft, ChevronRight, BookOpen, Sparkles, Star, Book as BookIcon, Info, Lightbulb, Music, ArrowUp, Play, Lock, CheckCircle } from 'lucide-react';
import { Resource } from '../types';

const useArabicSpeech = () => {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const findBestArabicVoice = useCallback((availableVoices: SpeechSynthesisVoice[]) => {
    return availableVoices.find(v => v.lang === 'ar-SA') 
           || availableVoices.find(v => v.lang.startsWith('ar'))
           || availableVoices.find(v => v.name.toLowerCase().includes('arabic'));
  }, []);

  useEffect(() => {
    const loadVoices = () => {
      const available = window.speechSynthesis.getVoices();
      if (available.length > 0) {
        setVoices(available);
      }
    };
    loadVoices();
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, []);

  const speak = useCallback((text: string, onEnd?: () => void) => {
    if (!('speechSynthesis' in window)) {
      if (onEnd) onEnd();
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    const bestVoice = findBestArabicVoice(voices.length > 0 ? voices : window.speechSynthesis.getVoices());
    if (bestVoice) {
      utterance.voice = bestVoice;
      utterance.lang = bestVoice.lang;
    } else {
      utterance.lang = 'ar-SA';
    }
    utterance.rate = 0.75;
    utterance.onend = () => { if (onEnd) onEnd(); };
    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  }, [voices, findBestArabicVoice]);

  return { speak };
};

const ARABIC_ALPHABET_DATA = [
  { char: 'ا', translit: 'Alif', name: 'ألف' }, { char: 'ب', translit: 'Ba', name: 'باء' }, { char: 'ت', translit: 'Ta', name: 'تاء' }, { char: 'ث', translit: 'Tha', name: 'ثاء' }, 
  { char: 'ج', translit: 'Jeem', name: 'جيم' }, { char: 'ح', translit: 'Ha', name: 'حاء' }, { char: 'خ', translit: 'Kha', name: 'خاء' }, { char: 'د', translit: 'Dal', name: 'دال' }, 
  { char: 'ذ', translit: 'Thal', name: 'ذال' }, { char: 'ر', translit: 'Ra', name: 'راء' }, { char: 'ز', translit: 'Zay', name: 'زاي' }, { char: 'س', translit: 'Seen', name: 'سين' }, 
  { char: 'ش', translit: 'Sheen', name: 'شين' }, { char: 'ص', translit: 'Sad', name: 'صاد' }, { char: 'ض', translit: 'Dad', name: 'ضاد' }, { char: 'ط', translit: 'Ta', name: 'طاء' }, 
  { char: 'ظ', translit: 'Za', name: 'ظاء' }, { char: 'ع', translit: 'Ayn', name: 'عين' }, { char: 'غ', translit: 'Ghayn', name: 'غين' }, { char: 'ف', translit: 'Fa', name: 'فاء' }, 
  { char: 'ق', translit: 'Qaf', name: 'قاف' }, { char: 'ك', translit: 'Kaf', name: 'كاف' }, { char: 'ل', translit: 'Lam', name: 'لام' }, { char: 'م', translit: 'Meem', name: 'ميم' }, 
  { char: 'ن', translit: 'Noon', name: 'نون' }, { char: 'ه', translit: 'Ha', name: 'هاء' }, { char: 'و', translit: 'Waw', name: 'واو' }, { char: 'ي', translit: 'Ya', name: 'ياء' }
];

const ALPHABET_COLORS = [
  { bg: 'bg-teal-50', text: 'text-teal-600', border: 'border-teal-100', active: 'bg-brand-teal text-white shadow-brand-teal/30' },
  { bg: 'bg-orange-50', text: 'text-orange-600', border: 'border-orange-100', active: 'bg-brand-orange text-white shadow-brand-orange/30' },
  { bg: 'bg-purple-50', text: 'text-purple-600', border: 'border-purple-100', active: 'bg-brand-purple text-white shadow-brand-purple/30' },
  { bg: 'bg-sky-50', text: 'text-sky-600', border: 'border-sky-100', active: 'bg-brand-blue text-white shadow-brand-blue/30' },
  { bg: 'bg-green-50', text: 'text-green-600', border: 'border-green-100', active: 'bg-brand-green text-white shadow-brand-green/30' },
];

const AlphabetInteractive: React.FC = () => {
  const [activeChar, setActiveChar] = useState<string | null>(null);
  const { speak } = useArabicSpeech();

  const normalizeArabic = (text: string) => text.replace(/[\u064B-\u065F]/g, "").trim();

  const handleLetterClick = (letter: { char: string; translit: string }) => {
    setActiveChar(letter.char);
    speak(letter.char, () => {
      setTimeout(() => setActiveChar(null), 500);
    });
  };

  return (
    <div className="flex flex-col items-center py-4">
      <div className="mb-12 relative">
        <div className={`bg-white p-8 rounded-[3rem] shadow-premium border-2 flex flex-col items-center justify-center w-48 h-48 md:w-56 md:h-56 transition-all duration-500 border-slate-100`}>
          {activeChar ? (
            <div className="flex flex-col items-center">
              <span className={`text-7xl md:text-8xl font-bold font-arabic mb-2 text-brand-teal`}>
                {activeChar}
              </span>
              <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">
                {ARABIC_ALPHABET_DATA.find(l => l.char === activeChar)?.translit}
              </span>
            </div>
          ) : (
            <div className="flex flex-col items-center text-slate-300 gap-3">
              <Volume2 size={48} strokeWidth={1.5} />
              <p className="text-[10px] font-bold uppercase tracking-widest">Select a Letter</p>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-4 sm:grid-cols-7 gap-4 max-w-4xl w-full" dir="rtl">
        {ARABIC_ALPHABET_DATA.map((letter, idx) => {
          const color = ALPHABET_COLORS[idx % ALPHABET_COLORS.length];
          const isActive = activeChar === letter.char;
          return (
            <div key={idx} className="relative group/btn">
              <button
                onClick={() => handleLetterClick(letter)}
                className={`w-full aspect-square rounded-3xl flex flex-col items-center justify-center transition-all duration-300 border-2 ${isActive ? `${color.active} shadow-xl border-transparent` : `${color.bg} ${color.text} ${color.border} hover:bg-white`}`}
              >
                <span className={`text-4xl font-bold font-arabic mb-1 ${isActive ? 'text-white' : ''}`}>{letter.char}</span>
                <span className={`text-[9px] font-bold uppercase tracking-wider opacity-60 ${isActive ? 'text-white' : ''}`}>{letter.translit}</span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const WritingPadInteractive: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [letter, setLetter] = useState('أ');
  const startDrawing = (e: any) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    setIsDrawing(true);
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || e.touches[0].clientX) - rect.left;
    const y = (e.clientY || e.touches[0].clientY) - rect.top;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineWidth = 10;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#fb923c';
  };
  const draw = (e: any) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || e.touches[0].clientX) - rect.left;
    const y = (e.clientY || e.touches[0].clientY) - rect.top;
    ctx.lineTo(x, y);
    ctx.stroke();
  };
  const clear = () => { canvasRef.current?.getContext('2d')?.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height); };
  return (
    <div className="flex flex-col items-center w-full">
      <div className="mb-8 flex gap-3">
        {['أ', 'ب', 'ت', 'ث'].map(l => (<button key={l} onClick={() => { setLetter(l); clear(); }} className={`w-14 h-14 rounded-2xl font-bold text-3xl border-2 ${letter === l ? 'bg-brand-orange text-white border-brand-orange' : 'bg-white text-slate-400'}`}>{l}</button>))}
      </div>
      <div className="relative border-2 border-slate-100 rounded-[3rem] shadow-soft bg-white overflow-hidden w-full max-w-xl aspect-[4/3]">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03]"><span className="text-[20rem] font-bold font-arabic">{letter}</span></div>
          <canvas ref={canvasRef} width={600} height={450} className="cursor-crosshair w-full h-full" onMouseDown={startDrawing} onMouseMove={draw} onMouseUp={() => setIsDrawing(false)} onTouchStart={startDrawing} onTouchMove={draw} onTouchEnd={() => setIsDrawing(false)} />
      </div>
      <div className="mt-8"><Button variant="outline" onClick={clear} className="gap-2"><RotateCcw size={18} /> Reset Pad</Button></div>
    </div>
  );
};

const ResourceModal: React.FC<{ isOpen: boolean; onClose: () => void; resource: Resource | null }> = ({ isOpen, onClose, resource }) => {
  if (!isOpen || !resource) return null;
  const renderContent = () => {
    switch (resource.componentId) {
      case 'alphabet': return <AlphabetInteractive />;
      case 'writing': return <WritingPadInteractive />;
      default: return null;
    }
  };
  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />
      <div className="bg-white rounded-[3.5rem] w-full max-w-5xl max-h-[92vh] overflow-y-auto shadow-2xl relative z-10 flex flex-col">
        <div className="p-8 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white z-20">
          <div className="flex items-center gap-4">
             <div className={`p-4 rounded-2xl bg-slate-50 ${resource.color}`}><resource.icon size={32} /></div>
             <h3 className="font-display text-2xl md:text-3xl font-bold text-slate-800">{resource.title}</h3>
          </div>
          <button onClick={onClose} className="p-3 text-slate-400 hover:text-slate-600 bg-slate-50 rounded-full transition-all"><X size={28} /></button>
        </div>
        <div className="p-6 md:p-12 bg-white flex-1">{renderContent()}</div>
      </div>
    </div>
  );
};

export const ResourcesSection: React.FC = () => {
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  return (
    <section id="resources" className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <SectionHeading title="Study Tools" subtitle="Guided digital resources to supplement personal study and consistency in progress." />
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {FREE_RESOURCES.map((resource, idx) => (
            <button key={idx} onClick={() => setSelectedResource(resource)} className="group bg-white rounded-[3rem] p-8 border-2 border-slate-100 shadow-soft hover:shadow-premium hover:border-brand-teal/30 transition-all duration-300 text-left flex flex-col h-full">
              <div className={`w-16 h-16 rounded-2xl ${resource.color.replace('text-', 'bg-')}/10 flex items-center justify-center mb-6`}><resource.icon className={resource.color} size={32} /></div>
              <h3 className="font-display text-2xl font-bold text-slate-800 mb-3">{resource.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-8 flex-1">{resource.description}</p>
              <div className="flex items-center gap-3 pt-6 border-t border-slate-50 text-brand-teal font-bold text-xs uppercase tracking-widest">Select Tool</div>
            </button>
          ))}
        </div>
      </div>
      <ResourceModal isOpen={!!selectedResource} resource={selectedResource} onClose={() => setSelectedResource(null)} />
    </section>
  );
};