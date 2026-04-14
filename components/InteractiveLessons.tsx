import React, { useState, useEffect, useRef, useMemo } from 'react';
import { GoogleGenAI, Modality } from "@google/genai";
import { LessonUnit, DialogueLine, VocabWord } from '../types';
import { Button } from './UIComponents';
import { 
  ArrowLeft, BookOpen, Volume2, Globe, CheckCircle, 
  ChevronRight, ChevronLeft, Languages, BookOpenText, 
  LayoutGrid, XCircle, Trophy, RotateCcw, Sparkles, 
  Smile, MessageSquare, Loader2, Info, HelpCircle, Star
} from 'lucide-react';

// --- Data for Units of "Al-Arabiyyah Bayna Yadayk" ---
const LESSONS: LessonUnit[] = [
  {
    id: 1,
    title: "Unit 1: Greetings",
    subtitle: "At-Tahiyyah wa At-Ta'aruf",
    dialogue: [
      { speaker: "Khalid", arabic: "السَّلامُ عَلَيكُم", english: "Peace be upon you", transliteration: "As-salāmu 'alaykum", gender: "male" },
      { speaker: "Khalil", arabic: "وَعَلَيكُمُ السَّلام", english: "And upon you be peace", transliteration: "Wa 'alaykumu s-salām", gender: "male" },
      { speaker: "Khalid", arabic: "اِسمِي خَالِد. مَا اِسمُكَ؟", english: "My name is Khalid. What is your name?", transliteration: "Ismī Khālid. Mā ismuka?", gender: "male" },
      { speaker: "Khalil", arabic: "اِسمِي خَلِيل", english: "My name is Khalil", transliteration: "Ismī Khalīl", gender: "male" },
      { speaker: "Khalid", arabic: "كَيفَ حَالُكَ؟", english: "How are you?", transliteration: "Kayfa hāluka?", gender: "male" },
      { speaker: "Khalil", arabic: "بِخَيرٍ وَالحَمدُ لله. وَكَيفَ حَالُكَ أَنتَ؟", english: "Good, praise be to Allah. And how are you?", transliteration: "Bikhayrin wa-l-ḥamdu lillāh. Wa-kayfa ḥāluka anta?", gender: "male" },
      { speaker: "Khalid", arabic: "بِخَيرٍ وَالحَمدُ لله", english: "Good, praise be to Allah", transliteration: "Bikhayrin wa-l-ḥamdu lillāh", gender: "male" },
      { speaker: "Khalid", arabic: "مِن أَينَ أَنتَ؟", english: "Where are you from?", transliteration: "Min ayna anta?", gender: "male" },
      { speaker: "Khalil", arabic: "أَنَا مِن بَاكِستَان", english: "I am from Pakistan", transliteration: "Anā min Bākistān", gender: "male" },
      { speaker: "Khalid", arabic: "هَل أَنتَ بَاكِستَانِيّ؟", english: "Are you Pakistani?", transliteration: "Hal anta Bākistāniyy?", gender: "male" },
      { speaker: "Khalil", arabic: "نَعَم، أَنَا بَاكِستَانِيّ. وَمَا جِنسِيَّتُكَ أَنتَ؟", english: "Yes, I am Pakistani. And what is your nationality?", transliteration: "Na'am, anā Bākistāniyy. Wa-mā jinsiyyatuka anta?", gender: "male" },
      { speaker: "Khalid", arabic: "أَنَا تُركِيّ. أَنَا مِن تُركِيَا", english: "I am Turkish. I am from Turkey", transliteration: "Anā Turkiyy. Anā min Turkiyā", gender: "male" },
    ],
    vocabulary: [
      { arabic: "مُدَرِّس", english: "Teacher", transliteration: "Mudarris", image: "https://images.unsplash.com/photo-1577896851231-70ef1460011e?w=400&h=400&fit=crop" },
      { arabic: "طَالِب", english: "Student", transliteration: "Ṭālib", image: "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=400&h=400&fit=crop" },
      { arabic: "طَبِيبَة", english: "Doctor", transliteration: "Ṭabībah", image: "https://images.unsplash.com/photo-1559839734-2b71f1536783?w=400&h=400&fit=crop" },
      { arabic: "مُهَندِس", english: "Engineer", transliteration: "Muhandis", image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=400&fit=crop" },
      { arabic: "أَخ", english: "Brother", transliteration: "Akh", image: "https://images.unsplash.com/photo-1551009175-8a68da93d5f9?w=400&h=400&fit=crop" },
      { arabic: "صَدِيق", english: "Friend", transliteration: "Ṣadīq", image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&h=400&fit=crop" },
    ],
    quizzes: [
      { id: 1, question: "Where is Khalil from?", options: ["Egypt", "Pakistan", "Turkey", "Jordan"], correctAnswer: 1 },
      { id: 2, question: "What is Khalid's nationality?", options: ["Pakistani", "Jordanian", "Egyptian", "Turkish"], correctAnswer: 3 },
      { id: 3, question: "How do you say 'How are you?' in Arabic?", options: ["Ma ismuka?", "Kaifa haluka?", "Min ayna anta?", "Ana bikhayr"], correctAnswer: 1 },
      { id: 4, question: "Which word means 'Teacher'?", options: ["Talib", "Tabib", "Mudarris", "Muhandis"], correctAnswer: 2 }
    ]
  },
  {
    id: 2,
    title: "Unit 2: Family",
    subtitle: "Al-Usrah",
    dialogue: [
      { speaker: "Ali", arabic: "هَذِهِ صُورَةُ أُسرَتِي", english: "This is a picture of my family", transliteration: "Hadhihi ṣūratu usratī", gender: "male" },
      { speaker: "Ammar", arabic: "مَا شَاءَ الله! مَن هَذَا؟", english: "Masha'Allah! Who is this?", transliteration: "Mā shā' Allāh! Man hādhā?", gender: "male" },
      { speaker: "Ali", arabic: "هَذَا وَالِدِي عَدنان، وَهُوَ مُهَندِس", english: "This is my father Adnan, and he is an engineer", transliteration: "Hādhā wālidī 'Adnān, wa-huwa muhandis", gender: "male" },
      { speaker: "Ammar", arabic: "وَمَن هَذِهِ؟", english: "And who is this?", transliteration: "Wa-man hadhihi?", gender: "male" },
      { speaker: "Ali", arabic: "هَذِهِ وَالِدَتِي سَعِيدَة، وَهِيَ طَبِيبَة", english: "This is my mother Sa'idah, and she is a doctor", transliteration: "Hadhihi wālidatī Sa'īdah, wa-hiya ṭabībah", gender: "male" },
      { speaker: "Ali", arabic: "هَذَا أَخِي عِيسَى، وَهُوَ طَالِب", english: "This is my brother Isa, and he is a student", transliteration: "Hādhā akhī 'Īsā, wa-huwa ṭālib", gender: "male" },
      { speaker: "Ali", arabic: "هَذِهِ أُختِي عَبلَة, وَهِيَ مُعَلِّمَة", english: "This is my sister Ablah, and she is a teacher", transliteration: "Hadhihi ukhtī 'Ablah, wa-hiya mu'allimah", gender: "female" },
      { speaker: "Ali", arabic: "وَهَذَا جَدِّي وَهَذِهِ جَدَّتِي", english: "And this is my grandfather and this is my grandmother", transliteration: "Wa-hādhā jaddī wa-hadhihi jaddatī", gender: "male" },
    ],
    vocabulary: [
      { arabic: "أُسرَة", english: "Family", transliteration: "Usrah", image: "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=400&h=400&fit=crop" },
      { arabic: "جَدّ", english: "Grandfather", transliteration: "Jadd", image: "https://images.unsplash.com/photo-1533227268428-f9ed0900fb3b?w=400&h=400&fit=crop" },
      { arabic: "جَدَّة", english: "Grandmother", transliteration: "Jaddah", image: "https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?w=400&h=400&fit=crop" },
      { arabic: "شَجَرَة", english: "Tree", transliteration: "Shajarah", image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=400&h=400&fit=crop" },
      { arabic: "عَمّ", english: "Uncle", transliteration: "'Amm", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop" },
      { arabic: "أَوْلاد", english: "Children", transliteration: "Awlād", image: "https://images.unsplash.com/photo-1471286174890-9c112ffca5b4?w=400&h=400&fit=crop" },
    ],
    quizzes: [
      { id: 1, question: "What is the profession of Ali's father?", options: ["Doctor", "Student", "Teacher", "Engineer"], correctAnswer: 3 },
      { id: 2, question: "What is the name of Ali's mother?", options: ["Ablah", "Sa'idah", "Fatima", "Zainab"], correctAnswer: 1 },
      { id: 3, question: "What does 'Jadd' mean?", options: ["Grandmother", "Grandfather", "Brother", "Father"], correctAnswer: 1 },
      { id: 4, question: "Which word means 'Family' in Arabic?", options: ["Shajarah", "Usrah", "Awalad", "Walidah"], correctAnswer: 1 }
    ]
  },
  {
    id: 3,
    title: "Unit 3: Residence",
    subtitle: "As-Sakan",
    dialogue: [
      { speaker: "Ahmed", arabic: "أَيْنَ تَسكُنُ؟", english: "Where do you live?", transliteration: "Ayna taskunu?", gender: "male" },
      { speaker: "Hassan", arabic: "أَسكُنُ فِي حَيِّ المَطَار", english: "I live in the Airport District", transliteration: "Askun fī ḥayyi l-maṭār", gender: "male" },
      { speaker: "Ahmed", arabic: "هَل تَسكُنُ فِي بَيْت؟", english: "Do you live in a house?", transliteration: "Hal taskun fī bayt?", gender: "male" },
      { speaker: "Hassan", arabic: "لا، أَسكُنُ فِي شَقَّة", english: "No, I live in an apartment", transliteration: "Lā, askun fī shaqqah", gender: "male" },
      { speaker: "Ahmed", arabic: "مَا رَقْمُ شَقَّتِكَ؟", english: "What is your apartment number?", transliteration: "Mā raqmu shaqqatika?", gender: "male" },
      { speaker: "Hassan", arabic: "خَمْسَة", english: "Five", transliteration: "Khamsah", gender: "male" },
    ],
    vocabulary: [
      { arabic: "بَيْت", english: "House", transliteration: "Bayt", image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=400&h=400&fit=crop" },
      { arabic: "شَقَّة", english: "Apartment", transliteration: "Shaqqah", image: "https://images.unsplash.com/photo-1545324418-f1d3ac59749d?w=400&h=400&fit=crop" },
      { arabic: "غُرْفَة", english: "Room", transliteration: "Ghurfah", image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=400&h=400&fit=crop" },
      { arabic: "حَمَّام", english: "Bathroom", transliteration: "Ḥammām", image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&h=400&fit=crop" },
      { arabic: "أَثَاث", english: "Furniture", transliteration: "Athāth", image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=400&fit=crop" },
      { arabic: "مَطْبَخ", english: "Kitchen", transliteration: "Maṭbakh", image: "https://images.unsplash.com/photo-1556911220-e1502232128e?w=400&h=400&fit=crop" },
    ],
    quizzes: [
      { id: 1, question: "Where does Hassan live?", options: ["Airport District", "University District", "School District", "Market District"], correctAnswer: 0 },
      { id: 2, question: "What type of residence is it?", options: ["House", "Dorm", "Apartment", "Hotel"], correctAnswer: 2 },
      { id: 3, question: "What is the apartment number?", options: ["3", "5", "10", "12"], correctAnswer: 1 },
      { id: 4, question: "What does 'Ghurfah' mean?", options: ["Kitchen", "Room", "Bathroom", "Living Room"], correctAnswer: 1 }
    ]
  }
];

interface InteractiveLessonsProps {
  onBack: () => void;
  onPractice?: () => void;
}

type TabType = 'dialogue' | 'vocabulary' | 'quiz';

function decodeBase64(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer, data.byteOffset, data.byteLength / 2);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

const normalizeArabic = (text: string) => {
  return text.replace(/[\u064B-\u065F]/g, "").trim().toLowerCase();
};

const WordTooltip: React.FC<{ word: VocabWord; children: React.ReactNode }> = ({ word, children }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <span 
      className="relative inline-block cursor-help group"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onClick={() => setIsVisible(!isVisible)}
    >
      <span className="border-b-2 border-dotted border-brand-teal/50 pb-0.5 hover:bg-teal-50 rounded px-0.5 transition-colors">
        {children}
      </span>
      {isVisible && (
        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-48 bg-slate-800 text-white text-xs p-3 rounded-xl shadow-xl z-[100] animate-fade-in pointer-events-none">
          <span className="block font-bold text-brand-teal mb-1">{word.english}</span>
          <span className="block text-slate-400 italic mb-2">{word.transliteration}</span>
          {word.image && <img src={word.image} alt={word.english} className="w-full h-20 object-cover rounded-lg mb-1" />}
          <span className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-slate-800"></span>
        </span>
      )}
    </span>
  );
};

export const InteractiveLessons: React.FC<InteractiveLessonsProps> = ({ onBack, onPractice }) => {
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioSourceRef = useRef<AudioBufferSourceNode | null>(null);
  const recognitionRef = useRef<any>(null);
  const [isSpeaking, setIsSpeaking] = useState<string | null>(null);
  const [audioCache, setAudioCache] = useState<Record<string, AudioBuffer>>({});
  const [currentUnitIdx, setCurrentUnitIdx] = useState(() => {
    const saved = localStorage.getItem('jtk_current_unit_idx');
    const idx = saved !== null ? parseInt(saved, 10) : 0;
    return idx >= 0 && idx < LESSONS.length ? idx : 0;
  });
  const [activeTab, setActiveTab] = useState<TabType>(() => {
    const saved = localStorage.getItem('jtk_active_tab');
    return (saved as TabType) || 'dialogue';
  });

  useEffect(() => { localStorage.setItem('jtk_current_unit_idx', currentUnitIdx.toString()); }, [currentUnitIdx]);
  useEffect(() => { localStorage.setItem('jtk_active_tab', activeTab); }, [activeTab]);

  const [showEnglish, setShowEnglish] = useState(true);
  const [quizState, setQuizState] = useState({ currentQuestion: 0, score: 0, showResult: false, selectedOption: null as number | null, isAnswered: false });
  const [vocabFeedback, setVocabFeedback] = useState<Record<string, 'success' | 'error' | null>>({});

  const unit = LESSONS[currentUnitIdx];

  const handleNextUnit = () => { if (currentUnitIdx < LESSONS.length - 1) { setCurrentUnitIdx(prev => prev + 1); setActiveTab('dialogue'); resetQuiz(); } };
  const handlePrevUnit = () => { if (currentUnitIdx > 0) { setCurrentUnitIdx(prev => prev - 1); setActiveTab('dialogue'); resetQuiz(); } };
  const resetQuiz = () => { setQuizState({ currentQuestion: 0, score: 0, showResult: false, selectedOption: null, isAnswered: false }); };

  const playFeedbackSound = (type: 'success' | 'error') => {
    if (!audioContextRef.current) audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
    const ctx = audioContextRef.current;
    if (ctx.state === 'suspended') ctx.resume();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain); gain.connect(ctx.destination);
    if (type === 'success') { osc.type = 'sine'; osc.frequency.setValueAtTime(523.25, ctx.currentTime); osc.frequency.exponentialRampToValueAtTime(1046.50, ctx.currentTime + 0.1); gain.gain.setValueAtTime(0.1, ctx.currentTime); gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2); osc.start(); osc.stop(ctx.currentTime + 0.2); }
    else { osc.type = 'sawtooth'; osc.frequency.setValueAtTime(150, ctx.currentTime); osc.frequency.linearRampToValueAtTime(100, ctx.currentTime + 0.2); gain.gain.setValueAtTime(0.1, ctx.currentTime); gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3); osc.start(); osc.stop(ctx.currentTime + 0.3); }
  };

  const stopAudio = () => { if (audioSourceRef.current) { try { audioSourceRef.current.stop(); } catch(e) {} audioSourceRef.current = null; } setIsSpeaking(null); };

  const speakBrowserFallback = (text: string) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    const voices = window.speechSynthesis.getVoices();
    const arabicVoice = voices.find(v => v.lang.startsWith('ar')) || voices.find(v => v.lang === 'ar-SA');
    if (arabicVoice) utterance.voice = arabicVoice;
    utterance.lang = 'ar-SA';
    utterance.onend = () => setIsSpeaking(null);
    window.speechSynthesis.speak(utterance);
  };

  const speakDialogue = async (line: DialogueLine | { arabic: string; gender: string }) => {
    if (!line.arabic) return;
    
    // warm up context on user gesture
    if (!audioContextRef.current) audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
    if (audioContextRef.current.state === 'suspended') audioContextRef.current.resume();

    stopAudio();
    setIsSpeaking(line.arabic);
    const cacheKey = `${line.arabic}_${(line as any).gender || 'male'}`;
    try {
      const ctx = audioContextRef.current;
      let buffer: AudioBuffer;
      if (audioCache[cacheKey]) { buffer = audioCache[cacheKey]; } else {
        try {
          const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
          const response = await ai.models.generateContent({ model: "gemini-2.5-flash-preview-tts", contents: [{ parts: [{ text: `Say clearly: ${line.arabic}` }] }], config: { responseModalities: [Modality.AUDIO], speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: (line as any).gender === 'female' ? 'Kore' : 'Charon' } } } } });
          let base64Audio = null;
          if (response.candidates?.[0]?.content?.parts) { for (const part of response.candidates[0].content.parts) { if (part.inlineData?.data) { base64Audio = part.inlineData.data; break; } } }
          if (!base64Audio) throw new Error("No audio returned");
          buffer = await decodeAudioData(decodeBase64(base64Audio), ctx, 24000, 1);
          setAudioCache(prev => ({ ...prev, [cacheKey]: buffer }));
        } catch (innerErr) { speakBrowserFallback(line.arabic); return; }
      }
      const source = ctx.createBufferSource(); source.buffer = buffer; source.connect(ctx.destination); source.onended = () => setIsSpeaking(null); audioSourceRef.current = source; source.start();
    } catch (err) { setIsSpeaking(null); }
  };

  const handleQuizAnswer = (idx: number) => {
    if (quizState.isAnswered) return;
    const isCorrect = idx === unit.quizzes[quizState.currentQuestion].correctAnswer;
    setQuizState(prev => ({ ...prev, selectedOption: idx, isAnswered: true, score: isCorrect ? prev.score + 1 : prev.score }));
    if (isCorrect) playFeedbackSound('success'); else playFeedbackSound('error');
    setTimeout(() => { if (quizState.currentQuestion < unit.quizzes.length - 1) { setQuizState(prev => ({ ...prev, currentQuestion: prev.currentQuestion + 1, selectedOption: null, isAnswered: false })); } else { setQuizState(prev => ({ ...prev, showResult: true })); } }, 1500);
  };

  useEffect(() => { return () => { if (audioSourceRef.current) audioSourceRef.current.stop(); }; }, []);

  const processDialogueText = (text: string) => {
    const words = text.split(/\s+/);
    return words.map((word, i) => {
      const normalizedWord = normalizeArabic(word);
      const vocabMatch = unit.vocabulary.find(v => normalizeArabic(v.arabic) === normalizedWord);
      return vocabMatch ? <React.Fragment key={i}><WordTooltip word={vocabMatch}>{word}</WordTooltip>{i < words.length - 1 ? ' ' : ''}</React.Fragment> : word + (i < words.length - 1 ? ' ' : '');
    });
  };

  const isArabicText = (text: string) => /[\u0600-\u06FF]/.test(text);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <div className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={onBack} className="p-2.5 hover:bg-slate-100 rounded-2xl text-slate-500"><ArrowLeft size={24} /></button>
            <div className="flex flex-col">
              <h1 className={`font-display font-bold text-xl md:text-2xl text-slate-800 ${isArabicText(unit.title) ? 'font-arabic' : ''}`}>{unit.title}</h1>
              <p className={`text-xs font-bold text-brand-teal uppercase ${isArabicText(unit.subtitle) ? 'font-arabic' : ''}`}>{unit.subtitle}</p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-2 bg-slate-50 p-1 rounded-2xl border border-slate-200">
            <button onClick={handlePrevUnit} disabled={currentUnitIdx === 0} className="p-2 hover:bg-white rounded-xl disabled:opacity-30"><ChevronLeft size={20} /></button>
            <div className="px-4 text-xs font-bold text-slate-400">Unit {unit.id} / {LESSONS.length}</div>
            <button onClick={handleNextUnit} disabled={currentUnitIdx === LESSONS.length - 1} className="p-2 hover:bg-white rounded-xl disabled:opacity-30"><ChevronRight size={20} /></button>
          </div>
          <button onClick={() => setShowEnglish(!showEnglish)} className={`p-2.5 rounded-2xl transition-all border ${showEnglish ? 'bg-brand-orange/10 text-brand-orange' : 'bg-slate-50 text-slate-400'}`}><Languages size={20} /></button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8 bg-white p-4 rounded-3xl border border-slate-100 shadow-sm flex flex-wrap gap-4 items-center justify-center">
            {[ { id: 'dialogue', label: 'Dialogue', icon: MessageSquare }, { id: 'vocabulary', label: 'Vocabulary', icon: LayoutGrid }, { id: 'quiz', label: 'Check Point', icon: CheckCircle } ].map((tab) => (
              <button key={tab.id} onClick={() => { setActiveTab(tab.id as TabType); }} className={`flex items-center gap-2.5 px-6 py-3 rounded-2xl font-bold transition-all ${activeTab === tab.id ? 'bg-brand-teal text-white' : 'bg-slate-50 text-slate-400'}`}><tab.icon size={18} /><span className="text-sm">{tab.label}</span></button>
            ))}
          </div>

          {activeTab === 'dialogue' && (
            <div className="max-w-3xl mx-auto space-y-8 animate-fade-in">
              {unit.dialogue.map((line, idx) => (
                <div key={idx} className={`flex flex-col ${idx % 2 === 0 ? 'items-start' : 'items-end'}`}>
                  <div className={`group flex items-start gap-4 max-w-[95%] md:max-w-[85%] ${idx % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                    <div className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center font-bold text-white ${idx % 2 === 0 ? 'bg-brand-teal' : 'bg-brand-purple'}`}>{line.speaker[0]}</div>
                    <div className="flex flex-col gap-2">
                       <span className={`text-[10px] font-black uppercase text-slate-400 ${idx % 2 === 0 ? 'text-left' : 'text-right'}`}>{line.speaker}</span>
                       <div className={`p-6 rounded-3xl shadow-sm border transition-all relative ${idx % 2 === 0 ? 'bg-white rounded-tl-none' : 'bg-white rounded-tr-none'}`}>
                         <div className="text-right" dir="rtl"><div className="text-3xl md:text-4xl font-arabic font-bold text-slate-800 leading-[1.8] mb-4">{processDialogueText(line.arabic)}</div></div>
                         {showEnglish && (
                           <div className="space-y-2 border-t border-slate-50 pt-4 mt-2">
                              <p className="text-sm font-bold text-brand-orange italic"><Languages size={14} className="inline mr-2" /> {line.english}</p>
                              {line.transliteration && <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">{line.transliteration}</p>}
                           </div>
                         )}
                         <button onClick={() => speakDialogue(line)} className={`absolute -bottom-3 ${idx % 2 === 0 ? '-right-3' : '-left-3'} w-10 h-10 rounded-full flex items-center justify-center bg-white text-brand-teal border border-teal-50 shadow-md`}><Volume2 size={20} /></button>
                       </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'vocabulary' && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-fade-in">
               {unit.vocabulary.map((vocab, idx) => (
                 <div key={idx} className={`bg-white p-6 rounded-[2.5rem] border-2 shadow-soft text-center flex flex-col items-center ${vocabFeedback[vocab.arabic] === 'success' ? 'border-brand-green' : vocabFeedback[vocab.arabic] === 'error' ? 'border-red-100' : 'border-slate-100'}`}>
                   <div className="relative mb-6 w-full aspect-square rounded-[2rem] overflow-hidden bg-slate-50 border border-slate-100">
                     <img src={vocab.image} alt={vocab.english} className="w-full h-full object-cover" />
                   </div>
                   <h4 className="text-3xl font-arabic font-bold text-slate-800 mb-2" dir="rtl">{vocab.arabic}</h4>
                   <p className="text-lg font-bold text-brand-teal mb-1">{vocab.english}</p>
                   <div className="flex gap-3 w-full mt-auto">
                        <button onClick={() => speakDialogue({ arabic: vocab.arabic, gender: 'male' })} className="flex-1 p-3 rounded-2xl bg-slate-50 text-slate-400 hover:bg-brand-teal hover:text-white"><Volume2 size={18} /></button>
                   </div>
                 </div>
               ))}
            </div>
          )}

          {activeTab === 'quiz' && (
            <div className="max-w-2xl mx-auto animate-fade-in">
              {quizState.showResult ? (
                <div className="bg-white p-12 rounded-[3.5rem] shadow-premium text-center border border-slate-100 flex flex-col items-center">
                   <div className="w-24 h-24 bg-yellow-50 rounded-full flex items-center justify-center text-brand-yellow mb-8 animate-bounce"><Trophy size={60} /></div>
                   <h3 className="text-4xl font-display font-bold text-slate-800 mb-4">Masha'Allah!</h3>
                   <p className="text-xl text-slate-500 mb-8 font-medium">You scored <span className="text-brand-teal font-black">{quizState.score}</span> out of {unit.quizzes.length}</p>
                   <div className="flex gap-4"><Button onClick={resetQuiz} variant="outline">Retry</Button><Button onClick={handleNextUnit} disabled={currentUnitIdx === LESSONS.length - 1}>Next Unit</Button></div>
                </div>
              ) : (
                <div className="bg-white p-10 rounded-[3rem] shadow-soft border border-slate-100">
                  <span className="px-5 py-2 bg-slate-50 rounded-2xl text-xs font-bold text-slate-400 uppercase tracking-widest mb-10 block w-fit">Question {quizState.currentQuestion + 1} / {unit.quizzes.length}</span>
                  <h3 className="text-2xl font-bold text-slate-800 mb-10 leading-relaxed">{unit.quizzes[quizState.currentQuestion].question}</h3>
                  <div className="space-y-4">
                    {unit.quizzes[quizState.currentQuestion].options.map((option, idx) => (
                        <button key={idx} onClick={() => handleQuizAnswer(idx)} disabled={quizState.isAnswered} className={`w-full p-6 rounded-3xl text-left font-bold transition-all border-2 text-lg flex items-center justify-between ${!quizState.isAnswered ? 'bg-white border-slate-100 hover:border-brand-teal' : idx === unit.quizzes[quizState.currentQuestion].correctAnswer ? 'bg-green-50 border-brand-green text-brand-green' : quizState.selectedOption === idx ? 'bg-red-50 border-red-500 text-red-500' : 'bg-slate-50 text-slate-300 opacity-50'}`}>
                          {option}{quizState.isAnswered && idx === unit.quizzes[quizState.currentQuestion].correctAnswer && <CheckCircle size={24} />}{quizState.isAnswered && quizState.selectedOption === idx && idx !== unit.quizzes[quizState.currentQuestion].correctAnswer && <XCircle size={24} />}
                        </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};