import React, { useState, useEffect, useRef } from 'react';
import { Search, PlayCircle, PauseCircle, ChevronRight, ChevronLeft, ArrowLeft, BookOpen, AlertCircle, Headset, X, Languages } from 'lucide-react';
import { Button } from './UIComponents';

// Types for API responses
interface Surah {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: string;
}

interface Ayah {
  number: number;
  text: string;
  numberInSurah: number;
  juz: number;
  manzil: number;
  page: number;
  ruku: number;
  hizbQuarter: number;
  sajda: boolean;
}

interface SurahDetail {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  revelationType: string;
  numberOfAyahs: number;
  ayahs: Ayah[];
  englishAyahs?: Ayah[]; // Merged manually from second API call
}

interface Reciter {
  id: string;
  name: string;
}

interface Translation {
  id: string;
  name: string;
}

const RECITERS: Reciter[] = [
  { id: 'ar.alafasy', name: 'Mishary Rashid Alafasy' },
  { id: 'ar.abdulbasitmurattal', name: 'Abdul Basit (Murattal)' },
  { id: 'ar.sudais', name: 'Abdurrahmaan As-Sudais' },
  { id: 'ar.husary', name: 'Mahmoud Khalil Al-Husary' },
  { id: 'ar.shuraym', name: 'Saud Al-Shuraim' },
  { id: 'ar.mahermuaiqly', name: 'Maher Al Muaiqly' },
  { id: 'ar.minshawi', name: 'Mohamed Siddiq Al-Minshawi' },
  { id: 'ar.ahmedajamy', name: 'Ahmed Al-Ajamy' },
];

const TRANSLATIONS: Translation[] = [
  { id: 'en.sahih', name: 'Sahih International' },
  { id: 'en.asad', name: 'Muhammad Asad' },
  { id: 'en.pickthall', name: 'Marmaduke Pickthall' },
  { id: 'en.yusufali', name: 'Abdullah Yusuf Ali' },
  { id: 'en.arberry', name: 'A. J. Arberry' },
  { id: 'en.ahmedali', name: 'Ahmed Ali' },
];

interface QuranReaderProps {
  onBack: () => void;
}

// Helper to remove Arabic diacritics (Harakat) for cleaner searching
const normalizeArabic = (text: string) => {
  return text.replace(/[\u064B-\u065F]/g, "");
};

export const QuranReader: React.FC<QuranReaderProps> = ({ onBack }) => {
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSurah, setSelectedSurah] = useState<SurahDetail | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeReciter, setActiveReciter] = useState<string>('ar.alafasy');
  const [activeTranslation, setActiveTranslation] = useState<string>('en.sahih');
  const [activeAyahIndex, setActiveAyahIndex] = useState<number>(-1);
  
  // Audio Ref
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const ayahRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Fetch Surah List
  useEffect(() => {
    const fetchSurahs = async () => {
      try {
        const response = await fetch('https://api.alquran.cloud/v1/surah');
        const data = await response.json();
        if (data.code === 200) {
          setSurahs(data.data);
        } else {
          setError('Failed to fetch Surahs');
        }
      } catch (err) {
        setError('Connection error. Please check your internet.');
      } finally {
        setLoading(false);
      }
    };
    fetchSurahs();
  }, []);

  // Update English translation only when activeTranslation changes
  useEffect(() => {
    if (selectedSurah) {
      updateTranslation(selectedSurah.number, activeTranslation);
    }
  }, [activeTranslation]);

  const updateTranslation = async (number: number, edition: string) => {
    try {
      const res = await fetch(`https://api.alquran.cloud/v1/surah/${number}/${edition}`);
      const data = await res.json();
      if (data.code === 200) {
        setSelectedSurah(prev => prev ? { ...prev, englishAyahs: data.data.ayahs } : null);
      }
    } catch (err) {
      console.error("Failed to update translation", err);
    }
  };

  // Fetch Surah Details (Arabic + English)
  const loadSurah = async (number: number) => {
    setLoading(true);
    setIsPlaying(false);
    setActiveAyahIndex(-1);
    stopAudio();

    try {
      const [arabicRes, englishRes] = await Promise.all([
        fetch(`https://api.alquran.cloud/v1/surah/${number}`),
        fetch(`https://api.alquran.cloud/v1/surah/${number}/${activeTranslation}`)
      ]);

      const arabicData = await arabicRes.json();
      const englishData = await englishRes.json();

      if (arabicData.code === 200 && englishData.code === 200) {
        const detail: SurahDetail = {
          ...arabicData.data,
          englishAyahs: englishData.data.ayahs
        };
        setSelectedSurah(detail);
        ayahRefs.current = new Array(detail.ayahs.length).fill(null);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setError('Could not load Surah details.');
      }
    } catch (err) {
      setError('Failed to load Surah. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filteredSurahs = surahs.filter(s => {
    const term = searchTerm.trim();
    if (!term) return true;

    const normalizedArabicName = normalizeArabic(s.name);
    const normalizedEnglishName = s.englishName.toLowerCase();
    const normalizedTranslation = s.englishNameTranslation.toLowerCase();
    const surahNumber = s.number.toString();

    return (
      normalizedArabicName.includes(term) ||
      normalizedEnglishName.includes(term) ||
      normalizedTranslation.includes(term) ||
      surahNumber.includes(term) ||
      (term.startsWith('surah ') && surahNumber === term.replace('surah ', ''))
    );
  });

  const stopAudio = () => {
    if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
        audioRef.current = null;
    }
    setIsPlaying(false);
  };

  const playAyah = (index: number) => {
    if (!selectedSurah || index >= selectedSurah.ayahs.length) {
      setIsPlaying(false);
      setActiveAyahIndex(-1);
      return;
    }

    const ayah = selectedSurah.ayahs[index];
    setActiveAyahIndex(index);
    setIsPlaying(true);

    // Scroll into view
    ayahRefs.current[index]?.scrollIntoView({ behavior: 'smooth', block: 'center' });

    const audioUrl = `https://cdn.islamic.network/quran/audio/128/${activeReciter}/${ayah.number}.mp3`;
    
    if (audioRef.current) {
      audioRef.current.src = audioUrl;
    } else {
      audioRef.current = new Audio(audioUrl);
    }

    audioRef.current.play().catch(e => {
      console.error("Playback failed", e);
      setIsPlaying(false);
    });

    audioRef.current.onended = () => {
      playAyah(index + 1);
    };
  };

  const toggleAudio = () => {
    if (!selectedSurah) return;

    if (isPlaying) {
      if (audioRef.current) audioRef.current.pause();
      setIsPlaying(false);
    } else {
      // If we were paused at an index, resume that index. Otherwise start from 0.
      const startIndex = activeAyahIndex === -1 ? 0 : activeAyahIndex;
      
      if (audioRef.current && audioRef.current.src && activeAyahIndex !== -1) {
        audioRef.current.play().catch(e => {
            playAyah(startIndex);
        });
        setIsPlaying(true);
      } else {
        playAyah(startIndex);
      }
    }
  };

  // Handle Reciter Change
  const handleReciterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setActiveReciter(e.target.value);
    if (isPlaying) {
      const currentIndex = activeAyahIndex;
      stopAudio();
      // Restart current ayah with new reciter after a small delay
      setTimeout(() => playAyah(currentIndex), 100);
    } else {
      stopAudio();
    }
  };

  const handleTranslationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setActiveTranslation(e.target.value);
  };

  // Cleanup audio on unmount or switch
  useEffect(() => {
    return () => stopAudio();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
           <div className="flex items-center gap-4">
             {selectedSurah ? (
               <button 
                onClick={() => {
                  stopAudio();
                  setSelectedSurah(null);
                }}
                className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-600"
               >
                 <ArrowLeft size={24} />
               </button>
             ) : (
                <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-600">
                    <ArrowLeft size={24} />
                </button>
             )}
             <div className="flex flex-col">
               <h1 className="font-display font-bold text-lg md:text-xl text-slate-800 leading-tight">
                  {selectedSurah ? `${selectedSurah.englishName}` : "Noble Qur'an"}
               </h1>
               {selectedSurah && <span className="text-xs text-slate-500 hidden md:inline">{selectedSurah.name}</span>}
             </div>
           </div>
           
           <div className="flex items-center gap-3">
             {selectedSurah && (
               <>
                 {/* Translation Selector - Desktop */}
                 <div className="relative group hidden lg:block">
                   <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-200">
                     <Languages size={16} className="text-brand-orange" />
                     <select 
                        value={activeTranslation}
                        onChange={handleTranslationChange}
                        className="bg-transparent text-sm font-medium text-slate-700 focus:outline-none cursor-pointer appearance-none pr-4"
                     >
                       {TRANSLATIONS.map(t => (
                         <option key={t.id} value={t.id}>{t.name}</option>
                       ))}
                     </select>
                   </div>
                 </div>

                 {/* Reciter Selector - Desktop */}
                 <div className="relative group hidden md:block">
                   <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-200">
                     <Headset size={16} className="text-brand-teal" />
                     <select 
                        value={activeReciter}
                        onChange={handleReciterChange}
                        className="bg-transparent text-sm font-medium text-slate-700 focus:outline-none cursor-pointer appearance-none pr-4"
                     >
                       {RECITERS.map(r => (
                         <option key={r.id} value={r.id}>{r.name}</option>
                       ))}
                     </select>
                   </div>
                 </div>

                 <button 
                   onClick={toggleAudio}
                   className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold text-sm transition-all shadow-sm ${isPlaying ? 'bg-brand-teal text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
                 >
                   {isPlaying ? <PauseCircle size={20} /> : <PlayCircle size={20} />}
                   <span className="hidden sm:inline">{isPlaying ? 'Pause' : 'Play'}</span>
                 </button>
               </>
             )}
           </div>
        </div>
      </div>
      
      {/* Secondary Header for Mobile Selection */}
      {selectedSurah && (
        <div className="md:hidden bg-white border-b border-slate-100 p-2 flex flex-col gap-2 shadow-inner">
            <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-200 w-full mx-auto max-w-xs">
                <Headset size={16} className="text-brand-teal shrink-0" />
                <select 
                  value={activeReciter}
                  onChange={handleReciterChange}
                  className="bg-transparent text-sm font-medium text-slate-700 focus:outline-none cursor-pointer w-full"
                >
                  {RECITERS.map(r => (
                    <option key={r.id} value={r.id}>{r.name}</option>
                  ))}
                </select>
            </div>
            <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-200 w-full mx-auto max-w-xs">
                <Languages size={16} className="text-brand-orange shrink-0" />
                <select 
                  value={activeTranslation}
                  onChange={handleTranslationChange}
                  className="bg-transparent text-sm font-medium text-slate-700 focus:outline-none cursor-pointer w-full"
                >
                  {TRANSLATIONS.map(t => (
                    <option key={t.id} value={t.id}>{t.name}</option>
                  ))}
                </select>
            </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-8">
        {loading && !selectedSurah && (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-4 border-brand-teal border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {error && (
           <div className="flex flex-col items-center justify-center py-20 text-center">
             <AlertCircle size={48} className="text-red-400 mb-4" />
             <p className="text-slate-600">{error}</p>
             <Button onClick={() => window.location.reload()} className="mt-4" variant="outline">Retry</Button>
           </div>
        )}

        {/* Surah List View */}
        {!selectedSurah && !loading && !error && (
          <>
             <div className="relative max-w-lg mx-auto mb-10 group">
               <input 
                 type="text" 
                 placeholder="Search Surah Name, Meaning or Number..." 
                 className="w-full pl-12 pr-12 py-4 rounded-2xl border-2 border-slate-200 focus:border-brand-teal focus:ring-4 focus:ring-brand-teal/10 focus:outline-none transition-all shadow-sm"
                 value={searchTerm}
                 onChange={handleSearch}
               />
               <Search className="absolute left-4 top-4.5 text-slate-400 group-focus-within:text-brand-teal transition-colors" size={20} />
               {searchTerm && (
                 <button 
                  onClick={() => setSearchTerm('')}
                  className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100 transition-all"
                  aria-label="Clear Search"
                 >
                   <X size={18} />
                 </button>
               )}
             </div>

             {filteredSurahs.length === 0 ? (
                <div className="text-center py-20 animate-fade-in bg-white rounded-[3rem] border border-slate-100 shadow-sm max-w-lg mx-auto">
                   <div className="bg-slate-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
                      <Search size={40} strokeWidth={1.5} />
                   </div>
                   <h3 className="text-2xl font-display font-bold text-slate-800 mb-2">No Surahs Found</h3>
                   <p className="text-slate-500 px-8">We couldn't find any surah matching "<span className="font-bold text-brand-teal">{searchTerm}</span>". Try searching by number or name.</p>
                   <button 
                     onClick={() => setSearchTerm('')}
                     className="mt-8 text-brand-teal font-bold hover:underline bg-teal-50 px-6 py-2 rounded-full"
                   >
                     Show all Surahs
                   </button>
                </div>
             ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredSurahs.map((surah) => (
                    <div 
                      key={surah.number}
                      onClick={() => loadSurah(surah.number)}
                      className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-brand-teal hover:shadow-md transition-all cursor-pointer group flex items-center justify-between"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center font-bold text-slate-500 group-hover:bg-brand-teal group-hover:text-white transition-colors">
                          {surah.number}
                        </div>
                        <div>
                          <h3 className="font-bold text-slate-800">{surah.englishName}</h3>
                          <p className="text-xs text-slate-500 font-medium">{surah.englishNameTranslation}</p>
                        </div>
                      </div>
                      <div className="text-right">
                         <span className="block font-arabic text-xl text-slate-700">{surah.name}</span>
                         <span className="text-xs text-slate-400">{surah.numberOfAyahs} Ayahs</span>
                      </div>
                    </div>
                  ))}
                </div>
             )}
          </>
        )}

        {/* Surah Detail View */}
        {selectedSurah && !loading && (
           <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden min-h-[80vh]">
              {/* Bismillah */}
              <div className="bg-slate-50 p-8 text-center border-b border-slate-100">
                 <h2 className="font-arabic text-4xl leading-loose text-slate-800">
                   بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ
                 </h2>
              </div>

              {/* Ayahs */}
              <div className="divide-y divide-slate-100">
                {selectedSurah.ayahs.map((ayah, index) => (
                  <div 
                    key={ayah.number} 
                    // Fixed: Wrap ref assignment in curly braces to return void, satisfying TypeScript's Ref type.
                    ref={el => { ayahRefs.current[index] = el; }}
                    onClick={() => playAyah(index)}
                    className={`p-6 md:p-8 transition-all duration-300 cursor-pointer relative group ${activeAyahIndex === index ? 'bg-teal-50/70' : 'hover:bg-slate-50/50'}`}
                  >
                     {/* Highlight Indicator */}
                     {activeAyahIndex === index && (
                        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-brand-teal"></div>
                     )}

                     <div className="flex flex-col gap-6">
                        {/* Arabic */}
                        <div className="w-full text-right" dir="rtl">
                           <p className={`font-arabic text-3xl md:text-4xl leading-[2.5] transition-colors duration-300 ${activeAyahIndex === index ? 'text-brand-teal drop-shadow-sm' : 'text-slate-800'}`}>
                             {ayah.text} 
                             <span className={`inline-flex items-center justify-center w-8 h-8 md:w-10 md:h-10 border-2 rounded-full text-sm md:text-base mr-2 align-middle font-sans transition-colors ${activeAyahIndex === index ? 'bg-brand-teal text-white border-brand-teal' : 'border-brand-teal/30 text-brand-teal'}`}>
                               {ayah.numberInSurah}
                             </span>
                           </p>
                        </div>
                        {/* English */}
                        <div className="w-full text-left">
                           <p className={`text-lg leading-relaxed font-serif transition-colors duration-300 ${activeAyahIndex === index ? 'text-slate-800 font-medium' : 'text-slate-600'}`}>
                             {selectedSurah.englishAyahs?.[index]?.text}
                           </p>
                        </div>
                     </div>
                  </div>
                ))}
              </div>

              {/* Footer Navigation */}
              <div className="p-6 border-t border-slate-200 bg-slate-50 flex justify-between">
                 <Button 
                   onClick={() => {
                     const prev = selectedSurah.number - 1;
                     if(prev > 0) loadSurah(prev);
                   }}
                   disabled={selectedSurah.number <= 1}
                   variant="outline" size="sm"
                   className="gap-2"
                 >
                   <ChevronLeft size={16} /> Previous Surah
                 </Button>
                 <Button 
                   onClick={() => {
                     const next = selectedSurah.number + 1;
                     if(next <= 114) loadSurah(next);
                   }}
                   disabled={selectedSurah.number >= 114}
                   variant="outline" size="sm"
                   className="gap-2"
                 >
                   Next Surah <ChevronRight size={16} />
                 </Button>
              </div>
           </div>
        )}
      </div>
    </div>
  );
};