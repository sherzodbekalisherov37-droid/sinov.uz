import React, { useState } from 'react';
import { 
  Layers, 
  Clock, 
  FileText, 
  Award, 
  Play, 
  Sparkles, 
  CheckCircle2, 
  BarChart3, 
  ArrowUpRight,
  Plus,
  BookOpen,
  Zap,
  Globe,
  UploadCloud,
  ChevronRight,
  Filter,
  Check,
  Calculator,
  Languages,
  FlaskConical,
  Scale,
  Atom,
  Landmark,
  BookMarked,
  Headphones,
  Edit3,
  Mic,
  GraduationCap,
  ShieldCheck,
  TrendingUp,
  Sliders,
  ArrowUpDown,
  ChevronDown,
  Flame,
  Calendar,
  Crown
} from 'lucide-react';
import { CustomSubject, ExamType, MockTest, SortOption, UserProfile } from '../types';
import { getExamLabel } from '../utils/testBuilder';
import { isUserSubscribed } from '../utils/subscriptionService';

interface TestCatalogViewProps {
  mockTests: MockTest[];
  onStartTest: (testId: string) => void;
  userProfile: UserProfile;
  onOpenAiDrawer: () => void;
  isAdmin: boolean;
  onOpenCreateTestModal: () => void;
  selectedCategory: 'all' | ExamType;
  onSelectCategory: (cat: 'all' | ExamType, subjectFilter?: string) => void;
  subjectFilter?: string;
  onClearSubjectFilter?: () => void;
  onOpenAiBookModal: () => void;
  onOpenConfigurator: (examType: ExamType, subject?: string) => void;
  onGoToResults: () => void;
  onOpenSubscriptionModal?: (targetTitle?: string) => void;
  customSubjects?: CustomSubject[];
}

const USER_REVIEWS = [
  {
    name: 'Farruh Temirov',
    role: 'SAT 1520',
    avatar: 'F',
    rating: '5.0',
    comment: "Digital SAT rasmiy Bluebook formatiga to'liq mos keladi. Math va Reading bo'yicha tushuntirishlar va Desmos uslubidagi qulayliklar ajoyib!",
  },
  {
    name: 'Laylo Karimova',
    role: 'IELTS 8.0',
    avatar: 'L',
    rating: '5.0',
    comment: "IELTS mock imtihonlari juda realistik. Listening audio pleeri va Writing bo'limidagi so'z hisoblagich bilan xuddi kompyuterli imtihondagidek ishladim.",
  },
  {
    name: 'Madina Umarova',
    role: 'Milliy Sertifikat A+',
    avatar: 'M',
    rating: '4.9',
    comment: "Matematika va Ona tili bo'yicha DTM ning 2026 yangi baholash mezonlari asosidagi 30 talik variantlar orqali A+ sertifikat oldim!",
  },
  {
    name: 'Jahongir Aliyev',
    role: 'CEFR C1',
    avatar: 'J',
    rating: '4.9',
    comment: "Multi-level testlari uchun eng qulay maydon. Natijani topshirish bilanoq to'liq pedagogik tahlil va zaif mavzular bo'yicha tavsiyalar oldim.",
  },
];

const PLATFORM_ADVANTAGES = [
  {
    icon: ShieldCheck,
    title: 'Rasmiy Standartlar',
    desc: 'DTM (BBA), College Board va Cambridge rasmiy talablariga mos tuzilgan autentik savollar.',
  },
  {
    icon: Zap,
    title: '2026 Yangi Test Engine',
    desc: 'Audio tinglash, mikrofon orqali gapirish, insho yozish va moslashuvchan test algoritmlari.',
  },
  {
    icon: TrendingUp,
    title: 'Chuqur Diagnostika',
    desc: 'Har bir topshirishdan so\'ng zaif mavzular aniqlanadi va aynan shu bo\'yicha yangi mashq tuziladi.',
  },
  {
    icon: Sparkles,
    title: 'AI Pedagogik Tahlil',
    desc: 'Har bir savol bo\'yicha to\'g\'ri yechim va xatoni tushuntiruvchi aqlli ta\'lim yordamchisi.',
  },
];

export const TestCatalogView: React.FC<TestCatalogViewProps> = ({
  mockTests,
  onStartTest,
  userProfile,
  onOpenAiDrawer,
  isAdmin,
  onOpenCreateTestModal,
  selectedCategory,
  onSelectCategory,
  subjectFilter,
  onClearSubjectFilter,
  onOpenAiBookModal,
  onOpenConfigurator,
  onGoToResults,
  onOpenSubscriptionModal,
  customSubjects = [],
}) => {
  const [onlyEasyFilter, setOnlyEasyFilter] = useState(false);

  const filteredTests = mockTests.filter((t) => {
    if (selectedCategory !== 'all' && t.examType !== selectedCategory) {
      return false;
    }
    if (onlyEasyFilter && t.difficulty !== 'Oson' && !t.tags?.includes('Yangi kirganlarga')) {
      return false;
    }
    if (subjectFilter && subjectFilter.trim()) {
      const matchSubject = t.subject?.toLowerCase().includes(subjectFilter.toLowerCase());
      const matchSection = t.questions.some(q => q.section?.toLowerCase().includes(subjectFilter.toLowerCase()));
      const matchTitle = t.title.toLowerCase().includes(subjectFilter.toLowerCase());
      if (!matchSubject && !matchSection && !matchTitle) {
        return false;
      }
    }
    return true;
  });

  const [sortBy, setSortBy] = useState<SortOption>('Popularity');

  const getDifficultyRank = (difficulty?: string): number => {
    switch (difficulty) {
      case 'Oson':
      case 'Easy':
        return 1;
      case 'O\'rta':
      case 'Orta':
      case 'Medium':
        return 2;
      case 'Murakkab':
      case 'Qiyin':
      case 'Hard':
        return 3;
      default:
        return 2;
    }
  };

  const getTestPopularity = (t: MockTest): number => {
    if (typeof t.attemptsCount === 'number') return t.attemptsCount;
    if (typeof t.popularity === 'number') return t.popularity * 100;
    return 1000;
  };

  const getTestDateTimestamp = (t: MockTest): number => {
    if (t.createdAt) {
      const ts = new Date(t.createdAt).getTime();
      if (!isNaN(ts)) return ts;
    }
    return 0;
  };

  const sortedTests = [...filteredTests].sort((a, b) => {
    if (sortBy === 'Difficulty: Easy to Hard') {
      const diffA = getDifficultyRank(a.difficulty);
      const diffB = getDifficultyRank(b.difficulty);
      if (diffA !== diffB) {
        return diffA - diffB;
      }
      return getTestPopularity(b) - getTestPopularity(a);
    }

    if (sortBy === 'Newest First') {
      const timeA = getTestDateTimestamp(a);
      const timeB = getTestDateTimestamp(b);
      if (timeA !== timeB) {
        return timeB - timeA;
      }
      return getTestPopularity(b) - getTestPopularity(a);
    }

    if (sortBy === 'Popularity') {
      const popA = getTestPopularity(a);
      const popB = getTestPopularity(b);
      if (popA !== popB) {
        return popB - popA;
      }
      return getTestDateTimestamp(b) - getTestDateTimestamp(a);
    }

    return 0;
  });

  const filterTabs: { id: 'all' | ExamType; label: string; count: number }[] = [
    { id: 'all', label: 'Barcha Testlar', count: mockTests.length },
    { id: 'milliy', label: 'Milliy Sertifikat', count: mockTests.filter(t => t.examType === 'milliy').length },
    { id: 'sat', label: 'Digital SAT', count: mockTests.filter(t => t.examType === 'sat').length },
    { id: 'ielts', label: 'IELTS Academic', count: mockTests.filter(t => t.examType === 'ielts').length },
    { id: 'cefr', label: 'CEFR Multi-Level', count: mockTests.filter(t => t.examType === 'cefr').length },
  ];

  // Strictly Certificate subjects: Matematika + admin-added custom subjects
  const MILLIY_SUBJECTS = [
    { title: 'Matematika', desc: 'Algebra, Geometriya, Trigonometriya & DTM Standarti', icon: Calculator },
    ...(customSubjects || []).filter((s) => s.examType === 'milliy').map((s) => ({
      title: s.name,
      desc: s.description,
      icon: Calculator,
    })),
  ];

  // Strictly Certificate subjects: CEFR English + admin-added custom subjects
  const CEFR_LANGUAGES = [
    { title: 'Ingliz tili', desc: 'CEFR B1-C1 Davlat Multi-Level Imtihoni', icon: Languages },
    ...(customSubjects || []).filter((s) => s.examType === 'cefr').map((s) => ({
      title: s.name,
      desc: s.description,
      icon: Languages,
    })),
  ];

  const SAT_SECTIONS = [
    { title: 'Reading & Writing', desc: 'Module 1 & 2 • Verbal drill', icon: BookOpen },
    { title: 'Math (No Calculator & Calc)', desc: 'Algebra, Geometry, Data', icon: Zap },
    { title: 'Advanced Math Drill', desc: 'Equations, Functions, Quadratics', icon: Layers },
  ];

  const IELTS_SECTIONS = [
    { title: 'Full Mock Test', desc: "4 ta to'liq modul • 2 soat 45 min", icon: Award },
    { title: 'Reading', desc: '60 daqiqa • 3 passages', icon: BookOpen },
    { title: 'Listening', desc: '30 daqiqa • 4 sections audio', icon: Headphones },
    { title: 'Writing', desc: 'Task 1 & Task 2 insholari', icon: Edit3 },
    { title: 'Speaking', desc: 'Part 1, 2 & 3 audio mashq', icon: Mic },
  ];

  const scrollToCatalog = () => {
    const el = document.getElementById('tests-catalog-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-12 animate-fade-in font-sans">
      
      {/* 1. HERO SECTION (Exact Brief Requirements) */}
      <section className="relative overflow-hidden rounded-3xl bg-linear-to-br from-blue-600 via-blue-700 to-indigo-900 text-white p-6 sm:p-12 shadow-xl">
        {/* Subtle background decoration */}
        <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-white/10 blur-2xl pointer-events-none" />
        <div className="absolute -left-20 -bottom-20 w-80 h-80 rounded-full bg-indigo-500/20 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-5">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-xs font-black tracking-wide uppercase text-blue-100">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>2026 Raqamli Imtihon Standarti</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-[1.15]">
            Imtihoningizga aqlli tayyorlaning.
          </h1>

          <p className="text-base sm:text-xl text-blue-100 font-medium leading-relaxed max-w-2xl">
            SAT, Milliy Sertifikat, IELTS va CEFR — barcha testlar bir platformada.
          </p>

          {/* EXACT HERO CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-3">
            <button
              onClick={() => onOpenConfigurator(selectedCategory !== 'all' ? selectedCategory : 'milliy')}
              className="px-6 py-3.5 rounded-2xl bg-white hover:bg-slate-100 text-blue-900 font-black text-xs sm:text-sm shadow-lg hover:shadow-xl transition-all flex items-center space-x-2 cursor-pointer"
              id="hero-start-test-cta"
            >
              <Play className="w-4 h-4 fill-blue-900" />
              <span>Testni boshlash</span>
            </button>

            <button
              onClick={scrollToCatalog}
              className="px-5 py-3.5 rounded-2xl bg-white/15 hover:bg-white/25 text-white font-black text-xs sm:text-sm border border-white/25 transition-all flex items-center space-x-2 cursor-pointer backdrop-blur-md"
              id="hero-catalog-cta"
            >
              <BookOpen className="w-4 h-4" />
              <span>Testlar katalogi</span>
            </button>

            <button
              onClick={onGoToResults}
              className="px-5 py-3.5 rounded-2xl bg-white/15 hover:bg-white/25 text-white font-black text-xs sm:text-sm border border-white/25 transition-all flex items-center space-x-2 cursor-pointer backdrop-blur-md"
              id="hero-my-results-cta"
            >
              <BarChart3 className="w-4 h-4" />
              <span>Natijalarim</span>
            </button>

            {isAdmin && (
              <button
                onClick={onOpenAiBookModal}
                className="px-4 py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs sm:text-sm shadow-md transition-all flex items-center space-x-2 cursor-pointer"
                title="Faqat Administrator uchun: Darslikdan test tuzish"
              >
                <Sparkles className="w-4 h-4" />
                <span>Kitobdan test tuzish</span>
              </button>
            )}
          </div>
        </div>

        {/* Floating Quick Stat Bar inside Hero */}
        <div className="mt-10 pt-6 border-t border-white/15 grid grid-cols-2 sm:grid-cols-4 gap-4 relative z-10 text-xs">
          <div>
            <span className="text-xl sm:text-2xl font-black font-mono block">80,000+</span>
            <span className="text-blue-200">Topshirilgan sinovlar</span>
          </div>
          <div>
            <span className="text-xl sm:text-2xl font-black font-mono block">94%</span>
            <span className="text-blue-200">Kutilgan natijaga erishish</span>
          </div>
          <div>
            <span className="text-xl sm:text-2xl font-black font-mono block">150+</span>
            <span className="text-blue-200">Autentik variantlar</span>
          </div>
          <div>
            <span className="text-xl sm:text-2xl font-black font-mono block">AI Tahlil</span>
            <span className="text-blue-200">24/7 har savol izohi</span>
          </div>
        </div>
      </section>

      {/* 2. THE 4 PRIMARY EXAM DIRECTION CARDS */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 text-xs font-black uppercase tracking-wider mb-1">
              <Layers className="w-4 h-4" />
              <span>Imtihon Yo'nalishlari</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              O'zingizga mos imtihonni tanlang
            </h2>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Kerakli yo'nalishni bosing va parametrlar bo'yicha moslashtirilgan test boshlang.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Card 1: Milliy Sertifikat */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs hover:border-blue-500 dark:hover:border-blue-500 hover:shadow-md transition-all flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-950/50 flex items-center justify-center border border-blue-100 dark:border-blue-900 text-blue-600 dark:text-blue-400">
                <GraduationCap className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-900 dark:text-white">
                  Milliy Sertifikat
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                  DTM va Bilimni Baholash Agentligi talablari asosidagi A+ daraja sinovlari.
                </p>
              </div>

              <div className="space-y-1.5 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <span>9 ta asosiy fan</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <span>30 talik standart format</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <span>Rasmiy A+, A, B+, B shkalasi</span>
                </div>
              </div>
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={() => {
                  onSelectCategory('milliy');
                  onOpenConfigurator('milliy');
                }}
                className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs transition-colors flex items-center justify-center space-x-1.5 cursor-pointer shadow-xs"
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>Fanlarni tanlash & Boshlash</span>
              </button>
            </div>
          </div>

          {/* Card 2: SAT */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs hover:border-sky-500 dark:hover:border-sky-500 hover:shadow-md transition-all flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-sky-50 dark:bg-sky-950/50 flex items-center justify-center border border-sky-100 dark:border-sky-900 text-sky-600 dark:text-sky-400">
                <Zap className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-900 dark:text-white">
                  Digital SAT
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                  College Board rasmiy Bluebook formati, Math va Reading & Writing.
                </p>
              </div>

              <div className="space-y-1.5 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                  <span>Reading and Writing moduli</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                  <span>Math kalkulyatorli modul</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                  <span>400 – 1600 rasmiy ball</span>
                </div>
              </div>
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={() => {
                  onSelectCategory('sat');
                  onOpenConfigurator('sat');
                }}
                className="w-full py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-black text-xs transition-colors flex items-center justify-center space-x-1.5 cursor-pointer shadow-xs"
              >
                <Play className="w-3.5 h-3.5 fill-white" />
                <span>Boshlash</span>
              </button>
            </div>
          </div>

          {/* Card 3: IELTS */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs hover:border-indigo-500 dark:hover:border-indigo-500 hover:shadow-md transition-all flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-indigo-50 dark:bg-indigo-950/50 flex items-center justify-center border border-indigo-100 dark:border-indigo-900 text-indigo-600 dark:text-indigo-400">
                <Headphones className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-900 dark:text-white">
                  IELTS Academic
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                  Listening, Reading, Writing va Speaking to'liq 4 bo'limli autentik mock testlar.
                </p>
              </div>

              <div className="space-y-1.5 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                  <span>Audio pleer & ovoz yozish</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                  <span>Insho so'z sanagich</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                  <span>Band 0.0 - 9.0 hisoblash</span>
                </div>
              </div>
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={() => {
                  onSelectCategory('ielts');
                  onOpenConfigurator('ielts');
                }}
                className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs transition-colors flex items-center justify-center space-x-1.5 cursor-pointer shadow-xs"
              >
                <Play className="w-3.5 h-3.5 fill-white" />
                <span>Boshlash</span>
              </button>
            </div>
          </div>

          {/* Card 4: CEFR */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs hover:border-purple-500 dark:hover:border-purple-500 hover:shadow-md transition-all flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-purple-50 dark:bg-purple-950/50 flex items-center justify-center border border-purple-100 dark:border-purple-900 text-purple-600 dark:text-purple-400">
                <Globe className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-900 dark:text-white">
                  CEFR Multi-Level
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                  Ingliz, rus, nemis, turk va boshqa xorijiy tillar bo'yicha diagnostika.
                </p>
              </div>

              <div className="space-y-1.5 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                  <span>A1, A2, B1, B2, C1 darajalar</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                  <span>Grammatika va lug'at</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                  <span>Xalqaro sertifikat mezoni</span>
                </div>
              </div>
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={() => {
                  onSelectCategory('cefr');
                  onOpenConfigurator('cefr');
                }}
                className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-black text-xs transition-colors flex items-center justify-center space-x-1.5 cursor-pointer shadow-xs"
              >
                <Play className="w-3.5 h-3.5 fill-white" />
                <span>Darajani tanlash & Boshlash</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. DYNAMIC SUBJECT REVEAL FOR MILLIY SERTIFIKAT */}
      {selectedCategory === 'milliy' && (
        <section className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-blue-200 dark:border-blue-900/60 shadow-xs space-y-5 animate-fade-in">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-2xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center font-black">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                  BBA Milliy Sertifikat Fanlari
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Matematika va admin tomonidan kiritilgan rasmiy yo'nalishlar.
                </p>
              </div>
            </div>

            {subjectFilter && (
              <button
                onClick={() => onSelectCategory('milliy')}
                className="px-3.5 py-1.5 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-xs font-bold flex items-center space-x-1.5 cursor-pointer"
              >
                <span>Barcha fanlar filtri</span>
                <span>✕</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {MILLIY_SUBJECTS.map((subj) => {
              const isSelected = subjectFilter?.toLowerCase() === subj.title.toLowerCase();
              return (
                <button
                  key={subj.title}
                  onClick={() => {
                    onSelectCategory('milliy', subj.title);
                    onOpenConfigurator('milliy', subj.title);
                  }}
                  className={`p-3.5 rounded-2xl text-left border transition-all flex items-start space-x-3 cursor-pointer group ${
                    isSelected
                      ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                      : 'bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 group-hover:text-blue-600'
                  }`}>
                    <subj.icon className="w-4 h-4" />
                  </div>
                  <div>
                    <p className={`text-xs sm:text-sm font-bold leading-tight ${isSelected ? 'text-white' : 'text-slate-900 dark:text-white'}`}>
                      {subj.title}
                    </p>
                    <p className={`text-[11px] leading-snug mt-0.5 ${isSelected ? 'text-blue-100' : 'text-slate-500 dark:text-slate-400'}`}>
                      {subj.desc}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </section>
      )}

      {/* 4. TESTS CATALOG SECTION */}
      <section id="tests-catalog-section" className="space-y-6 pt-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-xl font-black text-slate-900 dark:text-white">
              Tayyor Mock Testlar Katalogi
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              To'liq vaqt nazorati va avtomatik diagnostika bilan ishlovchi variantlar.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onOpenConfigurator(selectedCategory !== 'all' ? selectedCategory : 'milliy')}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs inline-flex items-center space-x-1.5 shadow-xs cursor-pointer"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>O'z testingizni yarating</span>
            </button>
          </div>
        </div>

        {/* Category Filters Bar & Sorting Dropdown */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Category Tabs & Quick Toggles */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-1 max-w-full">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  onSelectCategory(tab.id);
                  if (onClearSubjectFilter) onClearSubjectFilter();
                }}
                className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all flex items-center space-x-2 cursor-pointer ${
                  selectedCategory === tab.id
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
                }`}
              >
                <span>{tab.label}</span>
                <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded-md ${
                  selectedCategory === tab.id ? 'bg-white/20 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                }`}>
                  {tab.count}
                </span>
              </button>
            ))}

            {/* Quick Filter: Yangi kirganlarga oson testlar */}
            <button
              onClick={() => setOnlyEasyFilter(!onlyEasyFilter)}
              className={`px-3.5 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all flex items-center space-x-1.5 cursor-pointer shrink-0 ${
                onlyEasyFilter
                  ? 'bg-emerald-600 text-white shadow-xs ring-2 ring-emerald-400'
                  : 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>Yangi kirganlarga oson testlar</span>
            </button>

            {/* Quick Action: Oylik Premium Mock Pass */}
            <button
              onClick={() => onOpenSubscriptionModal?.()}
              className="px-3.5 py-2 rounded-2xl text-xs font-black whitespace-nowrap bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-xs hover:from-amber-600 hover:to-amber-700 flex items-center space-x-1.5 cursor-pointer shrink-0"
            >
              <Crown className="w-3.5 h-3.5 fill-current" />
              <span>Oylik Obuna (Premium Pass)</span>
            </button>
          </div>

          {/* Sorting Dropdown */}
          <div className="flex items-center space-x-2 self-start md:self-center shrink-0 bg-white dark:bg-slate-900 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs">
            <label
              htmlFor="test-sort-dropdown"
              className="text-xs font-bold text-slate-500 dark:text-slate-400 flex items-center space-x-1.5 pl-2 cursor-pointer whitespace-nowrap"
            >
              <ArrowUpDown className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
              <span className="hidden sm:inline">Saralash:</span>
            </label>
            <div className="relative">
              <select
                id="test-sort-dropdown"
                data-testid="sorting-dropdown"
                aria-label="Sort mock tests"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="appearance-none bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 font-bold text-xs rounded-xl pl-3 pr-8 py-1.5 shadow-2xs hover:border-slate-300 dark:hover:border-slate-600 focus:outline-hidden focus:ring-2 focus:ring-blue-500 cursor-pointer"
              >
                <option value="Popularity">Popularity</option>
                <option value="Newest First">Newest First</option>
                <option value="Difficulty: Easy to Hard">Difficulty: Easy to Hard</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Test Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {sortedTests.length === 0 ? (
            <div className="col-span-full py-12 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
              <p className="text-sm font-bold text-slate-600 dark:text-slate-400">
                Ushbu parametrlar bo'yicha testlar topilmadi.
              </p>
            </div>
          ) : (
            sortedTests.map((test) => {
              const isSubscribed = isUserSubscribed(userProfile);
              const requiresSub = test.isPremium && !isSubscribed;

              return (
                <div
                  key={test.id}
                  className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs hover:border-blue-400 dark:hover:border-blue-600 transition-all flex flex-col justify-between space-y-4"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-black uppercase tracking-wider px-2.5 py-1 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-900">
                          {getExamLabel(test.examType)}
                        </span>
                        {test.isPremium && (
                          <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-700 flex items-center space-x-1">
                            <Crown className="w-3 h-3 text-amber-500 fill-current" />
                            <span>Premium Mock</span>
                          </span>
                        )}
                        {test.monthYearTag && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300">
                            {test.monthYearTag}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center space-x-1.5 text-xs text-slate-500 dark:text-slate-400 font-mono">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{test.durationMinutes} daqiqa</span>
                      </div>
                    </div>

                    <h4 className="text-base font-bold text-slate-900 dark:text-white leading-snug">
                      {test.title}
                    </h4>

                    {test.subject && (
                      <p className="text-xs font-bold text-blue-600 dark:text-blue-400 mt-1">
                        {test.subject}
                      </p>
                    )}

                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                      {test.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-2 mt-3 text-xs">
                      <span className="inline-flex items-center space-x-1 text-[11px] font-bold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-lg">
                        <FileText className="w-3 h-3 text-slate-400" />
                        <span>{test.totalQuestions || test.questions.length} ta savol</span>
                      </span>

                      {/* Difficulty Badge */}
                      <span className={`inline-flex items-center space-x-1 text-[11px] font-bold px-2.5 py-1 rounded-lg border ${
                        test.difficulty === 'Oson'
                          ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800'
                          : test.difficulty === 'O\'rta'
                          ? 'bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800'
                          : 'bg-purple-50 dark:bg-purple-950/50 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800'
                      }`}>
                        <Layers className="w-3 h-3 opacity-70" />
                        <span>{test.difficulty}</span>
                      </span>

                      {/* Popularity Badge */}
                      {test.attemptsCount ? (
                        <span className="inline-flex items-center space-x-1 text-[11px] font-bold text-orange-700 dark:text-orange-300 bg-orange-50 dark:bg-orange-950/50 border border-orange-200 dark:border-orange-800/60 px-2.5 py-1 rounded-lg">
                          <Flame className="w-3 h-3 text-orange-500" />
                          <span>{test.attemptsCount >= 1000 ? `${(test.attemptsCount / 1000).toFixed(1)}k` : test.attemptsCount} topshirilgan</span>
                        </span>
                      ) : null}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <span className="text-[11px] text-slate-400">
                      {test.isPremium ? "Haqiqiy imtihon mezonlari" : "Avto-tekshiruv bilan"}
                    </span>
                    {requiresSub ? (
                      <button
                        onClick={() => onOpenSubscriptionModal?.(test.title)}
                        className="px-4 py-2.5 rounded-xl text-xs font-black bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white flex items-center space-x-1.5 shadow-md shadow-amber-500/20 cursor-pointer transition-all"
                      >
                        <Crown className="w-3.5 h-3.5 fill-current" />
                        <span>Obunani ochish (Mock Pass)</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => onStartTest(test.id)}
                        className="px-5 py-2.5 rounded-xl text-xs font-black bg-blue-600 hover:bg-blue-700 text-white flex items-center space-x-1.5 shadow-xs cursor-pointer transition-colors"
                      >
                        <Play className="w-3.5 h-3.5 fill-white" />
                        <span>Sinovni Boshlash</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </section>

      {/* 5. NIMA UCHUN BIZ? (PLATFORMA AFZALLIKLARI) */}
      <section className="bg-slate-50 dark:bg-slate-900/60 rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-black uppercase tracking-wider text-blue-600 dark:text-blue-400">
            Nima Uchun Aynan Sinov.uz?
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
            O'zbekiston o'quvchilari uchun maxsus loyihalangan platforma
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Faqat quruq testlar emas, balki bilimlaringizdagi bo'shliqlarni aniq to'ldiruvchi tizim.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 pt-2">
          {PLATFORM_ADVANTAGES.map((adv, idx) => {
            const Icon = adv.icon;
            return (
              <div
                key={idx}
                className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3 shadow-2xs"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-black text-slate-900 dark:text-white">
                  {adv.title}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {adv.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 6. FOYDALANUVCHILAR FIKRI (USER REVIEWS) */}
      <section className="space-y-6">
        <div className="text-center max-w-lg mx-auto space-y-2">
          <span className="text-xs font-black uppercase tracking-wider text-blue-600 dark:text-blue-400">
            Haqiqiy Natijalar
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
            O'quvchilarimiz qanday natijaga erishdi?
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {USER_REVIEWS.map((rev, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 space-y-3 shadow-2xs flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2.5">
                    <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-black text-xs flex items-center justify-center">
                      {rev.avatar}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white">{rev.name}</h4>
                      <p className="text-[10px] text-blue-600 dark:text-blue-400 font-bold">{rev.role}</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-amber-500 font-mono">★ {rev.rating}</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed italic">
                  "{rev.comment}"
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
