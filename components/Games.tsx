import React, { useState, useEffect, useCallback } from 'react';
import { SectionHeading, Button } from './UIComponents';
import { Sparkles, RefreshCw, CheckCircle, XCircle, Timer, Zap, Trophy, Link as LinkIcon } from 'lucide-react';
import { QUIZ_QUESTIONS } from '../constants';

// --- Memory Game Logic ---
type CardItem = {
  id: number;
  content: string;
  isFlipped: boolean;
  isMatched: boolean;
};

const ARABIC_LETTERS = ['ا', 'ب', 'ت', 'ث', 'ج', 'ح'];

const MemoryGame: React.FC = () => {
  const [cards, setCards] = useState<CardItem[]>([]);
  const [flippedIds, setFlippedIds] = useState<number[]>([]);
  const [matches, setMatches] = useState<number>(0);
  const [isChecking, setIsChecking] = useState(false);

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    const duplicatedLetters = [...ARABIC_LETTERS, ...ARABIC_LETTERS];
    const shuffled = duplicatedLetters
      .sort(() => Math.random() - 0.5)
      .map((letter, index) => ({
        id: index,
        content: letter,
        isFlipped: false,
        isMatched: false,
      }));
    setCards(shuffled);
    setFlippedIds([]);
    setMatches(0);
    setIsChecking(false);
  };

  const handleCardClick = (id: number) => {
    if (isChecking || cards[id].isMatched || cards[id].isFlipped) return;

    const newCards = cards.map((card, index) => 
      index === id ? { ...card, isFlipped: true } : card
    );
    setCards(newCards);

    const newFlippedIds = [...flippedIds, id];
    setFlippedIds(newFlippedIds);

    if (newFlippedIds.length === 2) {
      setIsChecking(true);
      const [firstId, secondId] = newFlippedIds;
      
      if (newCards[firstId].content === newCards[secondId].content) {
        setTimeout(() => {
          setCards(prev => prev.map((card, index) => 
            (index === firstId || index === secondId) 
              ? { ...card, isMatched: true, isFlipped: true } 
              : card
          ));
          setMatches(m => m + 1);
          setFlippedIds([]);
          setIsChecking(false);
        }, 500);
      } else {
        setTimeout(() => {
          setCards(prev => prev.map((card, index) => 
            (index === firstId || index === secondId) 
              ? { ...card, isFlipped: false } 
              : card
          ));
          setFlippedIds([]);
          setIsChecking(false);
        }, 1000);
      }
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 shadow-lg border-2 border-brand-teal/20 h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-display text-2xl font-bold text-brand-teal">Huruf Memory Match</h3>
        <button 
          onClick={initializeGame} 
          className="p-2 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors text-slate-600"
          title="Restart Game"
        >
          <RefreshCw size={20} />
        </button>
      </div>
      
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 md:gap-4 mb-6 flex-1 content-start">
        {cards.map((card, index) => (
          <div
            key={card.id}
            onClick={() => handleCardClick(index)}
            className={`aspect-square rounded-xl cursor-pointer flex items-center justify-center text-3xl md:text-4xl font-bold shadow-sm transition-all duration-300 select-none ${
              card.isFlipped || card.isMatched
                ? 'bg-brand-teal text-white scale-100 rotate-0'
                : 'bg-slate-100 text-slate-300 hover:bg-slate-200 hover:text-slate-400 scale-95'
            }`}
          >
            {(card.isFlipped || card.isMatched) ? card.content : '?'}
          </div>
        ))}
      </div>
      
      <div className="text-center min-h-[24px]">
        {matches === ARABIC_LETTERS.length ? (
          <div className="text-brand-orange font-bold animate-bounce flex items-center justify-center gap-2">
            <span>Masha'Allah! All pairs found!</span>
            <span className="text-2xl">🎉</span>
          </div>
        ) : (
          <div className="text-slate-400 text-sm font-medium">Matches found: {matches} / {ARABIC_LETTERS.length}</div>
        )}
      </div>
    </div>
  );
};

// --- Quiz Game Logic ---
const QuizGame: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const currentQ = QUIZ_QUESTIONS[currentQuestionIndex];

  const handleAnswer = (optionIndex: number) => {
    if (selectedOption !== null) return;
    setSelectedOption(optionIndex);

    if (optionIndex === currentQ.correctAnswer) {
      setScore(s => s + 1);
    }

    setTimeout(() => {
      if (currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
        setSelectedOption(null);
      } else {
        setShowResult(true);
      }
    }, 1500);
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setScore(0);
    setShowResult(false);
  };

  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 shadow-lg border-2 border-brand-orange/20 h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-display text-2xl font-bold text-brand-orange">Islamic Quiz</h3>
        {!showResult && <span className="text-xs font-bold bg-orange-100 text-brand-orange px-3 py-1 rounded-full">Q {currentQuestionIndex + 1}/{QUIZ_QUESTIONS.length}</span>}
      </div>

      {showResult ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6 py-8 animate-fade-in">
          <div className="w-24 h-24 bg-yellow-100 rounded-full flex items-center justify-center text-brand-orange animate-bounce">
            <Trophy size={48} />
          </div>
          <div>
            <h4 className="text-2xl font-bold text-slate-800 mb-2">Quiz Completed!</h4>
            <p className="text-lg text-slate-600">You scored <span className="font-bold text-brand-teal">{score}</span> out of {QUIZ_QUESTIONS.length}</p>
          </div>
          <Button onClick={resetQuiz} variant="primary">Play Again</Button>
        </div>
      ) : (
        <div className="flex-1 flex flex-col animate-fade-in">
          <p className="text-lg font-medium text-slate-700 mb-8 flex-1 min-h-[60px]">{currentQ.question}</p>
          <div className="space-y-3">
            {currentQ.options.map((option, idx) => {
              let btnClass = "w-full p-4 rounded-xl text-left font-medium transition-all border-2 duration-200 ";
              if (selectedOption === null) {
                btnClass += "border-slate-100 hover:border-brand-blue/50 hover:bg-sky-50 text-slate-600";
              } else if (idx === currentQ.correctAnswer) {
                btnClass += "border-brand-green bg-green-50 text-brand-green ring-1 ring-brand-green";
              } else if (selectedOption === idx) {
                btnClass += "border-red-200 bg-red-50 text-red-500";
              } else {
                btnClass += "border-slate-50 text-slate-300 opacity-50 cursor-not-allowed";
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleAnswer(idx)}
                  disabled={selectedOption !== null}
                  className={btnClass}
                >
                  <div className="flex items-center justify-between">
                    <span>{option}</span>
                    {selectedOption !== null && idx === currentQ.correctAnswer && <CheckCircle size={20} />}
                    {selectedOption === idx && idx !== currentQ.correctAnswer && <XCircle size={20} />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

// --- Speed Tap Game Logic ---
const ARABIC_NUMERALS = ['١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩', '١٠'];

const SpeedTapGame: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [targetNumber, setTargetNumber] = useState(1);
  const [feedback, setFeedback] = useState<'none' | 'correct' | 'wrong'>('none');

  const speakArabic = useCallback((text: string) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ar-SA';
    utterance.rate = 1.0;
    window.speechSynthesis.speak(utterance);
  }, []);

  useEffect(() => {
    let timer: number;
    if (isPlaying && timeLeft > 0) {
      timer = window.setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsPlaying(false);
    }
    return () => clearInterval(timer);
  }, [isPlaying, timeLeft]);

  const startGame = () => {
    setScore(0);
    setTimeLeft(30);
    setIsPlaying(true);
    setTargetNumber(Math.floor(Math.random() * 10) + 1);
    setFeedback('none');
  };

  const handleTap = (numIndex: number) => {
    if (!isPlaying) return;

    // Read the number aloud
    speakArabic(ARABIC_NUMERALS[numIndex]);

    if (numIndex + 1 === targetNumber) {
      setScore(s => s + 1);
      setFeedback('correct');
      setTargetNumber(Math.floor(Math.random() * 10) + 1);
      setTimeout(() => setFeedback('none'), 200);
    } else {
      setFeedback('wrong');
      // Penalty? Optional.
      setTimeout(() => setFeedback('none'), 200);
    }
  };

  return (
    <div className={`bg-white rounded-3xl p-6 md:p-8 shadow-lg border-2 h-full flex flex-col transition-colors duration-200 ${
      feedback === 'correct' ? 'border-green-400 bg-green-50' : 
      feedback === 'wrong' ? 'border-red-400 bg-red-50' : 'border-brand-purple/20'
    }`}>
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-display text-2xl font-bold text-brand-purple">Number Speed Tap</h3>
        <div className="flex items-center gap-2 bg-purple-50 px-3 py-1 rounded-full border border-purple-100">
           <Timer size={16} className="text-brand-purple" />
           <span className="font-bold text-brand-purple">{timeLeft}s</span>
        </div>
      </div>

      {!isPlaying && timeLeft === 0 ? (
         <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6 py-8 animate-fade-in">
           <div className="text-4xl mb-2">🚀</div>
           <div>
             <h4 className="text-2xl font-bold text-slate-800 mb-2">Time's Up!</h4>
             <p className="text-lg text-slate-600">Final Score: <span className="font-bold text-brand-purple">{score}</span></p>
           </div>
           <Button onClick={startGame} className="bg-brand-purple text-white hover:bg-purple-600">Try Again</Button>
         </div>
      ) : !isPlaying ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6">
          <Zap size={48} className="text-brand-purple" />
          <p className="text-slate-600 max-w-xs">Match the English number to the Arabic numeral as fast as you can!</p>
          <Button onClick={startGame} className="bg-brand-purple text-white hover:bg-purple-600">Start Game</Button>
        </div>
      ) : (
        <div className="flex-1 flex flex-col">
           <div className="flex-1 flex flex-col items-center justify-center mb-6">
              <span className="text-sm text-slate-400 font-bold uppercase tracking-widest mb-2">Tap This Number</span>
              <div className="text-6xl font-bold text-slate-800">{targetNumber}</div>
           </div>
           
           <div className="grid grid-cols-5 gap-2">
              {ARABIC_NUMERALS.map((num, idx) => (
                <button
                  key={idx}
                  onClick={() => handleTap(idx)}
                  className="aspect-square bg-white border-2 border-slate-100 hover:border-brand-purple hover:bg-purple-50 rounded-xl text-2xl font-bold text-slate-700 shadow-sm active:scale-95 transition-all"
                >
                  {num}
                </button>
              ))}
           </div>
           <div className="text-center mt-4 font-bold text-slate-400">Score: {score}</div>
        </div>
      )}
    </div>
  );
};

// --- Prophet Matching Game ---
type MatchPair = { id: number; prophet: string; item: string };
const PAIRS: MatchPair[] = [
  { id: 1, prophet: "Nuh (AS)", item: "The Ark" },
  { id: 2, prophet: "Musa (AS)", item: "The Staff" },
  { id: 3, prophet: "Ibrahim (AS)", item: "The Ka'bah" },
  { id: 4, prophet: "Muhammad (SAW)", item: "The Qur'an" },
];

const ProphetMatchingGame: React.FC = () => {
  const [selectedProphet, setSelectedProphet] = useState<number | null>(null);
  const [matchedIds, setMatchedIds] = useState<number[]>([]);
  const [shuffledItems, setShuffledItems] = useState<MatchPair[]>([]);

  useEffect(() => {
    // Shuffle items on mount
    setShuffledItems([...PAIRS].sort(() => Math.random() - 0.5));
  }, []);

  const handleProphetClick = (id: number) => {
    if (matchedIds.includes(id)) return;
    setSelectedProphet(id);
  };

  const handleItemClick = (id: number) => {
    if (matchedIds.includes(id) || selectedProphet === null) return;

    if (selectedProphet === id) {
      setMatchedIds(prev => [...prev, id]);
      setSelectedProphet(null);
    } else {
      // Error feedback could go here
      setSelectedProphet(null);
    }
  };

  const resetGame = () => {
    setMatchedIds([]);
    setSelectedProphet(null);
    setShuffledItems([...PAIRS].sort(() => Math.random() - 0.5));
  };

  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 shadow-lg border-2 border-brand-blue/20 h-full flex flex-col">
       <div className="flex justify-between items-center mb-6">
        <h3 className="font-display text-2xl font-bold text-brand-blue">Prophet Connections</h3>
        <button 
          onClick={resetGame} 
          className="p-2 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors text-slate-600"
        >
          <RefreshCw size={20} />
        </button>
      </div>

      {matchedIds.length === PAIRS.length ? (
         <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6 animate-fade-in">
           <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center text-brand-blue animate-pulse">
             <LinkIcon size={40} />
           </div>
           <div>
             <h4 className="text-2xl font-bold text-slate-800 mb-2">Excellent!</h4>
             <p className="text-slate-600">You matched all the connections correctly.</p>
           </div>
           <Button onClick={resetGame} variant="secondary" className="bg-brand-blue hover:bg-blue-600">Play Again</Button>
         </div>
      ) : (
        <div className="flex gap-4 h-full">
           {/* Prophets Column */}
           <div className="flex-1 space-y-3">
              <p className="text-xs font-bold text-slate-400 uppercase text-center mb-2">Prophet</p>
              {PAIRS.map((pair) => (
                <button
                  key={pair.id}
                  onClick={() => handleProphetClick(pair.id)}
                  disabled={matchedIds.includes(pair.id)}
                  className={`w-full p-3 text-sm md:text-base rounded-xl font-bold text-left transition-all border-2 ${
                    matchedIds.includes(pair.id) ? 'bg-green-50 border-green-200 text-green-600 opacity-50' :
                    selectedProphet === pair.id ? 'bg-blue-50 border-brand-blue text-brand-blue shadow-md scale-105' :
                    'bg-white border-slate-100 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {pair.prophet}
                </button>
              ))}
           </div>

           {/* Items Column (Shuffled) */}
           <div className="flex-1 space-y-3">
              <p className="text-xs font-bold text-slate-400 uppercase text-center mb-2">Connection</p>
              {shuffledItems.map((pair) => (
                 <button
                   key={pair.id}
                   onClick={() => handleItemClick(pair.id)}
                   disabled={matchedIds.includes(pair.id)}
                   className={`w-full p-3 text-sm md:text-base rounded-xl font-bold text-right transition-all border-2 ${
                     matchedIds.includes(pair.id) ? 'bg-green-50 border-green-200 text-green-600 opacity-50' :
                     'bg-white border-slate-100 text-slate-600 hover:bg-slate-50'
                   }`}
                 >
                   {pair.item}
                 </button>
              ))}
           </div>
        </div>
      )}
    </div>
  );
};


export const GamesSection: React.FC = () => {
  return (
    <section id="games" className="py-20 bg-gradient-to-b from-white to-yellow-50/30 relative overflow-hidden">
       {/* Background Elements */}
       <div className="absolute top-10 left-[-50px] w-32 h-32 bg-brand-teal/10 rounded-full blur-2xl"></div>
       <div className="absolute bottom-10 right-[-50px] w-40 h-40 bg-brand-orange/10 rounded-full blur-2xl"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <SectionHeading 
          title="Fun Learning Zone" 
          subtitle="Play games to practice your Arabic letters and Islamic knowledge!"
          color="text-slate-800"
        />

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <MemoryGame />
          <QuizGame />
          <SpeedTapGame />
          <ProphetMatchingGame />
        </div>
        
        <div className="text-center mt-12">
          <p className="text-slate-500 mb-4">More games unlock as you progress in your classes!</p>
          <Button href="#contact" variant="outline">Join for Free to Unlock More</Button>
        </div>
      </div>
    </section>
  );
};