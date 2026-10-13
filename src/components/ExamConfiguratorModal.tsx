import React, { useState } from 'react';
import { 
  X, 
  BookOpen, 
  Sparkles, 
  Clock, 
  HelpCircle, 
  Shuffle, 
  AlertTriangle, 
  CheckCircle2, 
  Layers, 
  Play,
  ArrowRight,
  Headphones,
  FileEdit,
  Mic,
  Calculator,
  Compass,
  Atom,
  Flame,
  Globe,
  Award,
  Scale
} from 'lucide-react';
import { ExamConfig, ExamType, MockTest, Question, MistakeItem } from '../types';
import { buildConfiguredTest } from '../utils/testBuilder';

interface ExamConfiguratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  examType: ExamType;
  initialSubject?: string;
  allQuestions: Question[];
  userMistakes: MistakeItem[];
  onStartConfiguredTest: (test: MockTest) => void;
  existingTests: MockTest[];
}

export const ExamConfiguratorModal: React.FC<ExamConfiguratorModalProps> = ({
  isOpen,
  onClose,
  examType,
  initialSubject,
  allQuestions,
  userMistakes,
  onStartConfiguredTest,
  existingTests,
}) => {
  if (!isOpen) return null;

  // Custom subjects added by admin from Admin Panel
  const customSubjectsList: { id: string; label: string; icon: any; color: string }[] = (() => {
    try {
      const saved = localStorage.getItem('sinov_custom_subjects');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed.filter((s: any) => s.examType === 'milliy').map((s: any) => ({
            id: s.name,
            label: s.name,
            icon: Calculator,
            color: 'text-indigo-500',
          }));
        }
      }
    } catch {}
    return [];
  })();

  // Certificate subjects strictly: Matematika (+ admin-added custom subjects)
  const milliySubjects = [
    { id: 'Matematika', label: 'Matematika (Milliy Sertifikat)', icon: Calculator, color: 'text-blue-500' },
    ...customSubjectsList,
  ];

  // SAT Sections & Domains
  const satSections = [
    { id: 'Reading and Writing', label: 'Reading and Writing', desc: 'Craft & Structure, Information & Ideas, Standard English Conventions' },
    { id: 'Math', label: 'Math', desc: 'Algebra, Advanced Math, Problem-Solving & Geometry' }
  ];

  const satDomains = [
    'Barcha mavzular',
    'Algebra & Linear Equations',
    'Advanced Math & Quadratics',
    'Problem Solving & Data Analysis',
    'Geometry & Trigonometry',
    'Craft & Structure',
    'Information & Ideas',
    'Standard English Conventions',
  ];

  // IELTS Sections
  const ieltsSections = [
    { id: 'Listening', label: 'Listening (Tinglab tushunish)', icon: Headphones, desc: 'Audio yozuv, transkript tahlili va savollar' },
    { id: 'Reading', label: 'Reading (Akademik o\'qish)', icon: BookOpen, desc: '3 ta ilmiy matn, True/False/Not Given va sarlavhalar' },
    { id: 'Writing', label: 'Writing (Insho va hisobot)', icon: FileEdit, desc: 'Task 1 grafik tahlili & Task 2 argumentli esse' },
    { id: 'Speaking', label: 'Speaking (Og\'zaki suhbat)', icon: Mic, desc: 'Part 1, 2 va 3 bo\'yicha real audio yozuv bilan mashq' },
  ];

  // CEFR Levels & Sections
  const cefrLevels = ['A1', 'A2', 'B1', 'B2', 'C1'];
  const cefrSections = [
    'Grammar & Structure',
    'Vocabulary & Collocations',
    'Reading Comprehension',
    'Listening Skills',
    'Writing Task',
    'Speaking Practice',
  ];

  // Form states
  const [selectedSubject, setSelectedSubject] = useState<string>(
    initialSubject || (examType === 'milliy' ? 'Matematika' : examType === 'sat' ? 'Math' : examType === 'ielts' ? 'Reading' : 'Grammar & Structure')
  );
  const [selectedTopic, setSelectedTopic] = useState<string>('Barcha mavzular');
  const [difficulty, setDifficulty] = useState<'all' | 'Oson' | 'O\'rta' | 'Murakkab'>('all');
  const [questionCount, setQuestionCount] = useState<number>(30);
  const [durationMinutes, setDurationMinutes] = useState<number>(45);
  const [testMode, setTestMode] = useState<'standard' | 'random' | 'mistakes_only'>('standard');
  const [selectedCefrLevel, setSelectedCefrLevel] = useState<string>('B2');

  const mistakesCountForExam = userMistakes.filter((m) => m.question.examType === examType).length;

  const handleLaunchTest = () => {
    const config: ExamConfig = {
      examType,
      subject: selectedSubject,
      topic: selectedTopic === 'Barcha mavzular' ? undefined : selectedTopic,
      difficulty,
      questionCount,
      durationMinutes,
      mode: testMode,
    };

    const newTest = buildConfiguredTest(config, allQuestions, userMistakes);
    onStartConfiguredTest(newTest);
    onClose();
  };

  const getExamTitle = () => {
    switch (examType) {
      case 'milliy': return 'Milliy Sertifikat Imtihon Konstruktori';
      case 'sat': return 'Digital SAT Test Konfiguratori';
      case 'ielts': return 'IELTS Mock & Section Practice';
      case 'cefr': return 'CEFR Multi-Level Test Konstruktori';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 w-full max-w-3xl shadow-2xl overflow-hidden my-6">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/40">
          <div>
            <span className="text-[11px] font-bold tracking-wider uppercase text-blue-600 dark:text-blue-400">
              Imtihon Konfiguratori
            </span>
            <h2 className="text-xl font-black text-slate-900 dark:text-white mt-0.5">
              {getExamTitle()}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* STEP 1: Select Subject / Section */}
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
              1. Kerakli Fan yoki Bo'limni Tanlang
            </label>

            {examType === 'milliy' && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {milliySubjects.map((sub) => {
                  const Icon = sub.icon;
                  const isSelected = selectedSubject === sub.id;
                  return (
                    <button
                      key={sub.id}
                      type="button"
                      onClick={() => setSelectedSubject(sub.id)}
                      className={`p-3 rounded-2xl border text-left flex items-center space-x-3 transition-all cursor-pointer ${
                        isSelected
                          ? 'border-blue-600 bg-blue-50/80 dark:bg-blue-950/40 shadow-xs ring-2 ring-blue-500/20'
                          : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900'
                      }`}
                    >
                      <div className={`p-2 rounded-xl bg-slate-100 dark:bg-slate-800 ${sub.color}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className={`text-xs font-bold leading-tight ${isSelected ? 'text-blue-900 dark:text-blue-300 font-extrabold' : 'text-slate-700 dark:text-slate-200'}`}>
                        {sub.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}

            {examType === 'sat' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {satSections.map((sec) => {
                  const isSelected = selectedSubject === sec.id;
                  return (
                    <button
                      key={sec.id}
                      type="button"
                      onClick={() => setSelectedSubject(sec.id)}
                      className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'border-blue-600 bg-blue-50/80 dark:bg-blue-950/40 shadow-xs ring-2 ring-blue-500/20'
                          : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900'
                      }`}
                    >
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">{sec.label}</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{sec.desc}</p>
                    </button>
                  );
                })}
              </div>
            )}

            {examType === 'ielts' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {ieltsSections.map((sec) => {
                  const Icon = sec.icon;
                  const isSelected = selectedSubject === sec.id;
                  return (
                    <button
                      key={sec.id}
                      type="button"
                      onClick={() => setSelectedSubject(sec.id)}
                      className={`p-3.5 rounded-2xl border text-left flex items-start space-x-3 transition-all cursor-pointer ${
                        isSelected
                          ? 'border-blue-600 bg-blue-50/80 dark:bg-blue-950/40 shadow-xs ring-2 ring-blue-500/20'
                          : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900'
                      }`}
                    >
                      <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-blue-600 dark:text-blue-400 shrink-0">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900 dark:text-white">{sec.label}</h4>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{sec.desc}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}

            {examType === 'cefr' && (
              <div className="space-y-3">
                {/* Level selection */}
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-500 font-bold">Darajani tanlang:</span>
                  <div className="flex gap-1.5">
                    {cefrLevels.map((lvl) => (
                      <button
                        key={lvl}
                        type="button"
                        onClick={() => setSelectedCefrLevel(lvl)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          selectedCefrLevel === lvl
                            ? 'bg-blue-600 text-white shadow-xs'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                        }`}
                      >
                        {lvl}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Section selection */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {cefrSections.map((sec) => {
                    const isSelected = selectedSubject === sec;
                    return (
                      <button
                        key={sec}
                        type="button"
                        onClick={() => setSelectedSubject(sec)}
                        className={`p-2.5 rounded-xl border text-left text-xs font-bold transition-all cursor-pointer ${
                          isSelected
                            ? 'border-blue-600 bg-blue-50 dark:bg-blue-950/40 text-blue-900 dark:text-blue-300'
                            : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                        }`}
                      >
                        {sec}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* STEP 2: Configure Mode, Difficulty, Questions, Time */}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-4">
            <label className="block text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
              2. Test Parametrlari
            </label>

            {/* Test Mode */}
            <div>
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-2">
                Test Rejimi:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <button
                  type="button"
                  onClick={() => setTestMode('standard')}
                  className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                    testMode === 'standard'
                      ? 'border-blue-600 bg-blue-50/70 dark:bg-blue-950/40 shadow-xs'
                      : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <Layers className="w-4 h-4 text-blue-600" />
                    <span className="text-xs font-bold">Standart Variant</span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                    Rasmiy imtihon formatidagi muvozanatli savollar to'plami
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setTestMode('random')}
                  className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                    testMode === 'random'
                      ? 'border-blue-600 bg-blue-50/70 dark:bg-blue-950/40 shadow-xs'
                      : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <Shuffle className="w-4 h-4 text-purple-600" />
                    <span className="text-xs font-bold">Tasodifiy Test</span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                    Bazada mavjud barcha savollardan avtomatik random yig'ish
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setTestMode('mistakes_only')}
                  className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                    testMode === 'mistakes_only'
                      ? 'border-rose-600 bg-rose-50/70 dark:bg-rose-950/40 shadow-xs'
                      : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className="w-4 h-4 text-rose-600" />
                    <span className="text-xs font-bold">Xatolarim Testi</span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                    Faqat ilgari xato qilingan savollar ({mistakesCountForExam} ta mavjud)
                  </p>
                </button>
              </div>
            </div>

            {/* Questions count & Duration */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-2">
                  Savollar Soni:
                </span>
                <div className="flex gap-2">
                  {[10, 20, 30, 45].map((cnt) => (
                    <button
                      key={cnt}
                      type="button"
                      onClick={() => {
                        setQuestionCount(cnt);
                        // automatically adjust time proportionally
                        setDurationMinutes(Math.round(cnt * 1.5));
                      }}
                      className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                        questionCount === cnt
                          ? 'border-blue-600 bg-blue-600 text-white shadow-xs'
                          : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                      }`}
                    >
                      {cnt} ta
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-2">
                  Ajratilgan Vaqt:
                </span>
                <div className="flex gap-2">
                  {[20, 45, 60, 90].map((mins) => (
                    <button
                      key={mins}
                      type="button"
                      onClick={() => setDurationMinutes(mins)}
                      className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                        durationMinutes === mins
                          ? 'border-blue-600 bg-blue-600 text-white shadow-xs'
                          : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                      }`}
                    >
                      {mins} daqiqa
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Qiyinchilik darajasi */}
            <div>
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-2">
                Qiyinchilik Darajasi:
              </span>
              <div className="flex gap-2">
                {[
                  { id: 'all', label: 'Barchasi (Aralash)' },
                  { id: 'Oson', label: 'Oson' },
                  { id: 'O\'rta', label: 'O\'rta' },
                  { id: 'Murakkab', label: 'Murakkab / Qiyin' }
                ].map((dif) => (
                  <button
                    key={dif.id}
                    type="button"
                    onClick={() => setDifficulty(dif.id as any)}
                    className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      difficulty === dif.id
                        ? 'border-blue-600 bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border-2'
                        : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                    }`}
                  >
                    {dif.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* STEP 3: Live Summary Card */}
          <div className="bg-slate-100 dark:bg-slate-800/80 rounded-2xl p-4 border border-slate-200 dark:border-slate-700">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Tanlangan konfiguratsiya:
                </span>
                <div className="text-sm font-black text-slate-900 dark:text-white mt-1 flex flex-wrap items-center gap-1.5">
                  <span className="text-blue-600 dark:text-blue-400 uppercase">{examType}</span>
                  <span className="text-slate-400">→</span>
                  <span>{selectedSubject}</span>
                  <span className="text-slate-400">→</span>
                  <span className="text-slate-700 dark:text-slate-300">{questionCount} ta savol</span>
                  <span className="text-slate-400">→</span>
                  <span className="text-slate-700 dark:text-slate-300">{durationMinutes} daqiqa</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleLaunchTest}
                className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-sm inline-flex items-center justify-center space-x-2 shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Testni Boshlash</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
