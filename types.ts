
import { LucideIcon } from 'lucide-react';

export interface Programme {
  title: string;
  description: string[];
  icon: LucideIcon;
  color: string;
  bgColor: string;
}

export interface Teacher {
  name: string;
  country: string;
  bio: string;
  qualifications: string[];
  funFact: string;
  image: string;
}

export interface PricingTier {
  title: string;
  description: string;
  price: string;
  frequency: string;
  features: string[];
  highlight?: boolean;
  color: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface ValueItem {
  title: string;
  description: string;
  icon: LucideIcon;
}

// --- New Types for Dashboard & Games ---

export interface StudentStats {
  studentName: string;
  level: string;
  attendance: number;
  nextClass: string;
  progress: {
    reading: number;
    tajwid: number;
    memorization: number;
    vocabulary: number;
  };
  recentSurahs: { name: string; status: 'Completed' | 'In Progress' | 'Revision'; date: string }[];
}

export interface Achievement {
  title: string;
  date: string;
  icon: LucideIcon;
  color: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface Resource {
  title: string;
  description: string;
  type: 'Interactive' | 'Audio' | 'Tool';
  icon: LucideIcon;
  color: string;
  componentId: 'alphabet' | 'writing';
}

// --- AI Chat Types ---
export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  translation?: string; // Optional translation for learning
  timestamp: Date;
}

// --- Lesson Types ---
export interface DialogueLine {
  speaker: string;
  arabic: string;
  english: string;
  transliteration?: string;
  gender: 'male' | 'female';
}

export interface VocabWord {
  arabic: string;
  english: string;
  transliteration?: string;
  image?: string;
}

export interface LessonUnit {
  id: number;
  title: string;
  subtitle: string;
  dialogue: DialogueLine[];
  vocabulary: VocabWord[];
  quizzes: QuizQuestion[];
}

// --- Settings Type ---
export interface AppSettings {
  theme: 'default' | 'warm' | 'cool' | 'dark' | 'nature' | 'lavender' | 'sunset';
  fontSize: 'normal' | 'large' | 'xl';
}
