
import { BookOpen, Heart, Star, Users, Clock, Award, Globe, Type, PenTool, Volume2, Calendar } from 'lucide-react';
import { Programme, FaqItem, ValueItem, StudentStats, Achievement, QuizQuestion, Resource, PricingTier } from './types';

export const NAV_LINKS = [
  { name: 'About', href: '#about' },
  { name: 'Programmes', href: '#programmes' },
  { name: 'Pricing', href: '#pricing' },
  { name: 'Resources', href: '#resources' },
  { name: 'Quran', href: '#quran' },
  { name: 'Contact', href: '#contact' },
];

export const VALUES: ValueItem[] = [
  {
    title: 'Excellence',
    description: 'We deliver high-quality teaching with meticulous care and attention.',
    icon: Star,
  },
  {
    title: 'Adab (Character)',
    description: 'We prioritize discipline and mutual respect in every session.',
    icon: Heart,
  },
  {
    title: 'Methodical Progress',
    description: 'Progress is rooted in focus and clear, structured instruction.',
    icon: BookOpen,
  },
  {
    title: 'Consistency',
    description: 'Scheduled lessons designed to help learners progress steadily.',
    icon: Clock,
  },
  {
    title: 'Personal Guidance',
    description: 'We support adults and families through transparency and regular updates.',
    icon: Users,
  },
];

export const PROGRAMMES: Programme[] = [
  {
    title: "Qur'an Recitation",
    description: [
      "Mastering the Arabic alphabet and pronunciation",
      "Structured reading practice",
      "Developing fluency and accuracy",
      "Tailored for adults and families"
    ],
    icon: BookOpen,
    color: "text-brand-teal",
    bgColor: "bg-teal-50",
  },
  {
    title: "Tajwīd Studies",
    description: [
      "Comprehensive rules for correct recitation",
      "Practical application and drills",
      "Correction of articulation points",
      "Guided focus on classical standards"
    ],
    icon: Star,
    color: "text-brand-orange",
    bgColor: "bg-orange-50",
  },
  {
    title: "Hifz Programme",
    description: [
      "Structured memorisation pathways",
      "Individual and small-group instruction",
      "Disciplined revision scheduling",
      "Focus on long-term retention"
    ],
    icon: Award,
    color: "text-brand-purple",
    bgColor: "bg-purple-50",
  },
  {
    title: "Arabic Language",
    description: [
      "Comprehensive reading and writing skills",
      "Vocabulary building for classical texts",
      "Grammatical foundations explained clearly",
      "Focus on comprehension and literacy"
    ],
    icon: Globe,
    color: "text-brand-blue",
    bgColor: "bg-sky-50",
  },
  {
    title: "Islamic Studies",
    description: [
      "Foundational character and ethics (Akhlaq)",
      "Prophetic History and Seerah",
      "Essential Du'as and Adhkar",
      "Practical jurisprudence for daily life"
    ],
    icon: Heart,
    color: "text-brand-green",
    bgColor: "bg-green-50",
  },
];

export const FAQS: FaqItem[] = [
  {
    question: "Who is this programme for?",
    answer: "Our academy is designed for adults and families seeking a structured and consistent approach to learning Qur'an and Arabic."
  },
  {
    question: "How do the online classes work?",
    answer: "Classes are conducted via secure video conferencing. Our instructors use professional digital tools to ensure lessons remain clear and interactive."
  },
  {
    question: "I am a complete beginner. Where do I start?",
    answer: "We begin with a thorough assessment of your current level and establish a clear path forward, starting with foundational literacy if necessary."
  },
  {
    question: "Is there a specific schedule?",
    answer: "We offer various slots to accommodate professional and family schedules. Consistency is prioritized to ensure steady progress."
  },
  {
    question: "How is progress tracked?",
    answer: "Students and families receive regular updates and summary reports detailing areas of improvement and upcoming objectives."
  },
  {
    question: "Can I discuss my goals before starting?",
    answer: "Yes, we encourage an initial consultation to ensure our teaching style aligns with your personal learning objectives."
  }
];

export const MOCK_STUDENT_STATS: StudentStats = {
  studentName: "Student",
  level: "Juz 30 - Surah Al-Fajr",
  attendance: 95,
  nextClass: "Tomorrow, 5:00 PM",
  progress: {
    reading: 85,
    tajwid: 70,
    memorization: 60,
    vocabulary: 40,
  },
  recentSurahs: [
    { name: "Surah Al-Balad", status: "Completed", date: "2 days ago" },
    { name: "Surah Ash-Shams", status: "Revision", date: "1 week ago" },
    { name: "Surah Al-Layl", status: "In Progress", date: "Just started" }
  ]
};

export const MOCK_ACHIEVEMENTS: Achievement[] = [
  { title: "Level Completion", date: "Oct 2023", icon: Award, color: "text-yellow-500" },
  { title: "Consistent Attendance", date: "Aug 2023", icon: Calendar, color: "text-green-500" }
];

export const FREE_RESOURCES: Resource[] = [
  {
    title: "Alphabet Reference",
    description: "A digital reference for all 28 Arabic letters and their sounds.",
    type: "Tool",
    icon: Type,
    color: "text-brand-teal",
    componentId: "alphabet"
  },
  {
    title: "Writing Practice",
    description: "Interactive workspace for practicing Arabic letter formation.",
    type: "Tool",
    icon: PenTool,
    color: "text-brand-orange",
    componentId: "writing"
  }
];

// --- Added Missing Constants for Pricing and Games ---

export const PRICING_TIERS_1TO1: PricingTier[] = [
  {
    title: "Starter Plan",
    description: "Ideal for foundational learning",
    price: "£40",
    frequency: "/mo",
    features: [
      "1 session per week",
      "Personalized learning plan",
      "Digital student dashboard",
      "Regular progress updates"
    ],
    color: "brand-blue"
  },
  {
    title: "Standard Plan",
    description: "Balanced progress and consistency",
    price: "£72",
    frequency: "/mo",
    features: [
      "2 sessions per week",
      "Priority scheduling",
      "Monthly feedback reports",
      "Access to all digital tools"
    ],
    highlight: true,
    color: "brand-blue"
  },
  {
    title: "Advanced Plan",
    description: "Intensive study for faster growth",
    price: "£105",
    frequency: "/mo",
    features: [
      "3 sessions per week",
      "Direct tutor access",
      "Detailed end-of-unit reviews",
      "Flexible rescheduling options"
    ],
    color: "brand-blue"
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "How many letters are there in the Arabic alphabet?",
    options: ["26", "28", "30", "24"],
    correctAnswer: 1
  },
  {
    id: 2,
    question: "What is the correct pronunciation of the letter 'Ayn (ع)?",
    options: ["Top of the throat", "Middle of the throat", "Back of the tongue", "Tip of the tongue"],
    correctAnswer: 1
  },
  {
    id: 3,
    question: "Which of these is a 'Heavy' letter in Tajweed?",
    options: ["Ba (ب)", "Sad (ص)", "Seen (س)", "Lam (ل)"],
    correctAnswer: 1
  },
  {
    id: 4,
    question: "What is the meaning of the word 'Tajweed'?",
    options: ["To memorize", "To make beautiful", "To read fast", "To write"],
    correctAnswer: 1
  }
];
