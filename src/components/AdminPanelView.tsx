import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Plus, 
  Trash2, 
  Users, 
  FileText, 
  BarChart3, 
  Calendar, 
  CheckCircle2, 
  X, 
  Clock, 
  Award,
  Search,
  BookOpen,
  Filter,
  Download,
  Upload,
  Copy,
  Layers,
  Database,
  Tag,
  AlertCircle,
  HelpCircle,
  ExternalLink,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { ExamType, MockTest, Question, QuestionType, UserProfile, UserRole, UserTestResult } from '../types';
import { getExamLabel } from '../utils/testBuilder';

interface AdminPanelViewProps {
  mockTests: MockTest[];
  questionBank: Question[];
  onAddQuestionToBank: (q: Question) => void;
  onBulkAddQuestions: (questions: Question[]) => void;
  onDeleteQuestionFromBank: (id: string) => void;
  onAddMockTest: (test: MockTest) => void;
  onDeleteMockTest: (testId: string) => void;
  students: UserProfile[];
  testResults: UserTestResult[];
  currentUserRole: UserRole;
  onChangeUserRole: (role: UserRole) => void;
  onBackToStudentView: () => void;
  onOpenAiBookModal: () => void;
}

export const AdminPanelView: React.FC<AdminPanelViewProps> = ({
  mockTests,
  questionBank,
  onAddQuestionToBank,
  onBulkAddQuestions,
  onDeleteQuestionFromBank,
  onAddMockTest,
  onDeleteMockTest,
  students,
  testResults,
  currentUserRole,
  onChangeUserRole,
  onBackToStudentView,
  onOpenAiBookModal,
}) => {
  const [adminTab, setAdminTab] = useState<'dashboard' | 'questions' | 'tests' | 'students' | 'sources'>('dashboard');
  
  // Question Bank search & filter
  const [qbSearch, setQbSearch] = useState('');
  const [qbExamFilter, setQbExamFilter] = useState<string>('all');
  const [qbDifficultyFilter, setQbDifficultyFilter] = useState<string>('all');
  
  // New Question Modal
  const [showNewQuestionModal, setShowNewQuestionModal] = useState(false);
  const [newQExam, setNewQExam] = useState<ExamType>('milliy');
  const [newQSubject, setNewQSubject] = useState('Matematika');
  const [newQTopic, setNewQTopic] = useState('');
  const [newQDifficulty, setNewQDifficulty] = useState<'Oson' | 'O\'rta' | 'Murakkab'>('O\'rta');
  const [newQType, setNewQType] = useState<QuestionType>('multiple_choice');
  const [newQText, setNewQText] = useState('');
  const [newQPassage, setNewQPassage] = useState('');
  const [newQOptions, setNewQOptions] = useState<string[]>(['', '', '', '']);
  const [newQCorrectOption, setNewQCorrectOption] = useState<number>(0);
  const [newQTextAnswer, setNewQTextAnswer] = useState('');
  const [newQExplanation, setNewQExplanation] = useState('');
  const [newQSource, setNewQSource] = useState('Rasmiy DTM / BBA namunaviy bazasi');
  const [newQIsOfficial, setNewQIsOfficial] = useState(true);

  // CSV Import Modal
  const [showCsvModal, setShowCsvModal] = useState(false);
  const [csvRawText, setCsvRawText] = useState('');
  const [parsedCsvQuestions, setParsedCsvQuestions] = useState<Question[]>([]);

  // Analytics Metrics computation
  const totalUsers = students.length;
  const totalAttempts = testResults.length;
  const avgScore = totalAttempts > 0 
    ? Math.round(testResults.reduce((acc, r) => acc + r.percentage, 0) / totalAttempts) 
    : 0;

  // Exam popularity
  const examCounts = testResults.reduce((acc: Record<string, number>, r) => {
    acc[r.examType] = (acc[r.examType] || 0) + 1;
    return acc;
  }, {});
  const mostPopularExam = Object.entries(examCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'milliy';

  // Question bank filtering
  const filteredQuestions = questionBank.filter((q) => {
    if (qbExamFilter !== 'all' && q.examType !== qbExamFilter) return false;
    if (qbDifficultyFilter !== 'all' && q.difficulty !== qbDifficultyFilter) return false;
    if (qbSearch.trim()) {
      const s = qbSearch.toLowerCase();
      return (
        q.text.toLowerCase().includes(s) ||
        (q.subject && q.subject.toLowerCase().includes(s)) ||
        (q.topic && q.topic.toLowerCase().includes(s))
      );
    }
    return true;
  });

  // Handle Save New Question
  const handleSaveNewQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQText.trim()) return;

    const newQuestion: Question = {
      id: `qb_q_${Date.now()}`,
      examType: newQExam,
      subject: newQSubject,
      topic: newQTopic || 'Umumiy',
      difficulty: newQDifficulty,
      questionType: newQType,
      text: newQText,
      passage: newQPassage || undefined,
      options: newQType === 'numeric' || newQType === 'short_answer' ? undefined : newQOptions,
      correctOption: newQType === 'multiple_choice' || newQType === 'true_false' ? newQCorrectOption : undefined,
      correctTextAnswer: newQType === 'numeric' || newQType === 'short_answer' ? newQTextAnswer : undefined,
      explanation: newQExplanation || "To'g'ri javob asoslangan yechim.",
      points: 1,
      source: newQSource,
      isOfficialResource: newQIsOfficial,
    };

    onAddQuestionToBank(newQuestion);
    setShowNewQuestionModal(false);
    // Reset
    setNewQText('');
    setNewQPassage('');
    setNewQExplanation('');
  };

  // CSV parser preview
  const handleParseCsv = () => {
    const lines = csvRawText.trim().split('\n');
    if (lines.length < 2) return;

    const parsed: Question[] = [];
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;
      const parts = line.split(',');
      if (parts.length >= 6) {
        parsed.push({
          id: `imp_${Date.now()}_${i}`,
          examType: (parts[0].trim().toLowerCase() as ExamType) || 'milliy',
          subject: parts[1].trim(),
          difficulty: 'O\'rta',
          questionType: 'multiple_choice',
          text: parts[2].trim(),
          options: [parts[3].trim(), parts[4].trim(), parts[5]?.trim() || '', parts[6]?.trim() || ''],
          correctOption: 0,
          explanation: parts[7]?.trim() || "Standart pedagogik yechim.",
          points: 1,
          source: 'CSV Import orqali yuklangan',
          isOfficialResource: true,
        });
      }
    }
    setParsedCsvQuestions(parsed);
  };

  const handleConfirmCsvImport = () => {
    if (parsedCsvQuestions.length > 0) {
      onBulkAddQuestions(parsedCsvQuestions);
      setParsedCsvQuestions([]);
      setCsvRawText('');
      setShowCsvModal(false);
    }
  };

  // Export JSON
  const handleExportBankJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(questionBank, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `sinov_savollar_bazasi_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="space-y-8 animate-fade-in font-sans">
      {/* Top Admin Header Bar */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xs">
        <div>
          <div className="flex items-center space-x-2 text-indigo-600 dark:text-indigo-400 text-xs font-black uppercase tracking-wider mb-1">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>Administrator & O'qituvchi Boshqaruv Markazi</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
            Sinov Test Platformasi Admin Paneli
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Savollar banki, test konstruktori, foydalanuvchilar tahlili va rasmiy manbalar nazorati.
          </p>
        </div>

        {/* Action and Role Switcher */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Role selector so anyone can test any permission! */}
          <div className="flex items-center space-x-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl border border-slate-200 dark:border-slate-700">
            <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 px-2">Rol:</span>
            {(['super_admin', 'admin', 'teacher', 'student'] as UserRole[]).map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => onChangeUserRole(r)}
                className={`px-2.5 py-1 rounded-xl text-[11px] font-bold transition-all cursor-pointer ${
                  currentUserRole === r
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
                }`}
              >
                {r === 'super_admin' ? 'Super Admin' : r === 'admin' ? 'Admin' : r === 'teacher' ? 'O\'qituvchi' : 'O\'quvchi'}
              </button>
            ))}
          </div>

          <button
            onClick={onBackToStudentView}
            className="px-4 py-2 rounded-2xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200 transition-colors cursor-pointer"
          >
            O'quvchi ko'rinishiga qaytish
          </button>
        </div>
      </div>

      {/* Admin Tab Navigation */}
      <div className="flex items-center space-x-2 border-b border-slate-200 dark:border-slate-800 overflow-x-auto pb-px">
        {[
          { id: 'dashboard', label: 'Boshqaruv Paneli (Stats)', icon: BarChart3 },
          { id: 'questions', label: `Savollar Bazasi (${questionBank.length})`, icon: Database },
          { id: 'tests', label: `Testlar To'plami (${mockTests.length})`, icon: Layers },
          { id: 'students', label: `O'quvchilar (${students.length})`, icon: Users },
          { id: 'sources', label: 'Rasmiy Manbalar', icon: BookOpen },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = adminTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setAdminTab(tab.id as any)}
              className={`px-4 py-3 text-xs font-bold whitespace-nowrap border-b-2 flex items-center space-x-2 transition-all cursor-pointer ${
                isActive
                  ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* 1. DASHBOARD OVERVIEW TAB */}
      {adminTab === 'dashboard' && (
        <div className="space-y-6">
          {/* Key Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs">
              <span className="text-xs text-slate-500 dark:text-slate-400 font-bold block mb-1">
                Jami O'quvchilar
              </span>
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-black text-slate-900 dark:text-white font-mono">
                  {totalUsers} ta
                </span>
                <span className="text-xs text-emerald-600 font-bold">+12% bu hafta</span>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs">
              <span className="text-xs text-slate-500 dark:text-slate-400 font-bold block mb-1">
                Jami Test Topshirishlar
              </span>
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-black text-slate-900 dark:text-white font-mono">
                  {totalAttempts} ta
                </span>
                <span className="text-xs text-blue-600 font-bold">Faol sessiyalar</span>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs">
              <span className="text-xs text-slate-500 dark:text-slate-400 font-bold block mb-1">
                O'rtacha Natija (Aniqlik)
              </span>
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-black text-slate-900 dark:text-white font-mono">
                  {avgScore}%
                </span>
                <span className="text-xs text-emerald-600 font-bold">Yaxshi ko'rsatkich</span>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs">
              <span className="text-xs text-slate-500 dark:text-slate-400 font-bold block mb-1">
                Eng Ko'p Ishlangan Imtihon
              </span>
              <div className="flex items-baseline justify-between">
                <span className="text-xl font-black text-blue-600 dark:text-blue-400 uppercase">
                  {getExamLabel(mostPopularExam as ExamType)}
                </span>
                <span className="text-xs text-slate-500">Top yo'nalish</span>
              </div>
            </div>
          </div>

          {/* Quick Actions Panel */}
          <div className="bg-slate-50 dark:bg-slate-800/40 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                Tezkor Administrator Amallari
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Savol qo'shish, kitobdan test generatsiya qilish yoki CSV bazasini import qilish.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <button
                onClick={() => setShowNewQuestionModal(true)}
                className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs inline-flex items-center space-x-1.5 shadow-xs cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Yangi Savol Qo'shish</span>
              </button>

              <button
                onClick={() => setShowCsvModal(true)}
                className="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 font-bold text-xs inline-flex items-center space-x-1.5 cursor-pointer"
              >
                <Upload className="w-4 h-4" />
                <span>CSV / Excel Import</span>
              </button>

              <button
                onClick={onOpenAiBookModal}
                className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs inline-flex items-center space-x-1.5 shadow-xs cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>AI Kitobdan Test Yaratish</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. QUESTION BANK TAB */}
      {adminTab === 'questions' && (
        <div className="space-y-6">
          {/* Controls Bar */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <div className="relative w-64 sm:w-80">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Savol matni yoki fan bo'yicha qidirish..."
                  value={qbSearch}
                  onChange={(e) => setQbSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Exam filter */}
              <select
                value={qbExamFilter}
                onChange={(e) => setQbExamFilter(e.target.value)}
                className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs text-slate-700 dark:text-slate-300 font-bold focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Barcha imtihonlar</option>
                <option value="milliy">Milliy Sertifikat</option>
                <option value="sat">SAT</option>
                <option value="ielts">IELTS</option>
                <option value="cefr">CEFR</option>
              </select>

              {/* Difficulty filter */}
              <select
                value={qbDifficultyFilter}
                onChange={(e) => setQbDifficultyFilter(e.target.value)}
                className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs text-slate-700 dark:text-slate-300 font-bold focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Barcha darajalar</option>
                <option value="Oson">Oson</option>
                <option value="O'rta">O'rta</option>
                <option value="Murakkab">Murakkab</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleExportBankJson}
                className="px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs inline-flex items-center space-x-1.5 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>JSON Eksport</span>
              </button>

              <button
                onClick={() => setShowNewQuestionModal(true)}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs inline-flex items-center space-x-1.5 shadow-xs cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>+ Yangi Savol</span>
              </button>
            </div>
          </div>

          {/* Questions Table / List */}
          <div className="space-y-3">
            {filteredQuestions.map((q, idx) => (
              <div
                key={q.id}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-5 shadow-xs space-y-3 hover:border-slate-300 dark:hover:border-slate-700 transition-all"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="px-2 py-0.5 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 font-bold uppercase">
                      {q.examType}
                    </span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">
                      {q.subject || 'Asosiy'}
                    </span>
                    {q.topic && (
                      <>
                        <span className="text-slate-300 dark:text-slate-700">·</span>
                        <span className="text-slate-500 dark:text-slate-400">{q.topic}</span>
                      </>
                    )}
                    <span className="text-slate-300 dark:text-slate-700">·</span>
                    <span className="px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[11px] font-bold">
                      {q.difficulty}
                    </span>
                    {q.isOfficialResource && (
                      <span className="px-2 py-0.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 text-[11px] font-bold">
                        Rasmiy Manba
                      </span>
                    )}
                  </div>

                  <div className="flex items-center space-x-1">
                    <button
                      onClick={() => onDeleteQuestionFromBank(q.id)}
                      className="p-1.5 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
                      title="Savolni o'chirish"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <h4 className="text-sm font-bold text-slate-900 dark:text-white leading-relaxed">
                  {q.text}
                </h4>

                {/* Options display */}
                {q.options && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {q.options.map((opt, optIdx) => (
                      <div
                        key={optIdx}
                        className={`p-2 rounded-xl border ${
                          q.correctOption === optIdx
                            ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-400 text-emerald-900 dark:text-emerald-200 font-bold'
                            : 'bg-slate-50 dark:bg-slate-800/40 border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                        }`}
                      >
                        <span className="font-mono font-bold mr-1.5">{String.fromCharCode(65 + optIdx)})</span>
                        <span>{opt}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Explanation */}
                <div className="text-xs text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/30 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800">
                  <span className="font-bold text-slate-700 dark:text-slate-300 mr-1">Izoh:</span>
                  {q.explanation}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. TESTS TAB */}
      {adminTab === 'tests' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-black text-slate-900 dark:text-white">
              Platformadagi Barcha Test Variantlari
            </h3>
            <button
              onClick={onOpenAiBookModal}
              className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs inline-flex items-center space-x-1.5 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>+ Yangi Test Yaratish</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mockTests.map((t) => (
              <div
                key={t.id}
                className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2.5 py-0.5 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 text-xs font-bold uppercase">
                      {t.examType}
                    </span>
                    <button
                      onClick={() => onDeleteMockTest(t.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                      title="Testni o'chirish"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white">{t.title}</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{t.description}</p>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                  <span>{t.totalQuestions || t.questions.length} ta savol</span>
                  <span>{t.durationMinutes} daqiqa</span>
                  <span className="font-bold text-slate-700 dark:text-slate-300">{t.difficulty}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. STUDENTS TAB */}
      {adminTab === 'students' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-4">
          <h3 className="text-sm font-black text-slate-900 dark:text-white">
            Ro'yxatdan O'tgan O'quvchilar
          </h3>
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {students.map((st) => (
              <div key={st.id} className="py-3.5 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">{st.fullName}</h4>
                  <p className="text-[11px] text-slate-500">@{st.username} · {st.email}</p>
                </div>
                <div className="text-right text-xs">
                  <span className="px-2 py-0.5 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 font-bold uppercase">
                    {st.targetExam}
                  </span>
                  <p className="text-[11px] text-slate-500 mt-0.5">Maqsad: {st.targetScore}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. SOURCES TAB */}
      {adminTab === 'sources' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-4">
          <div>
            <h3 className="text-sm font-black text-slate-900 dark:text-white">
              Rasmiy Manbalar Boshqaruvi
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Platformadagi savollar va testlar qaysi rasmiy agentliklar va manbalardan olinganligi.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { name: 'O\'zbekiston Bilimni Baholash Agentligi (BBA / DTM)', scope: 'Milliy Sertifikat barcha fanlar', status: 'Tasdiqlangan rasmiy bazalar', isOfficial: true },
              { name: 'College Board Digital SAT Suite', scope: 'Reading, Writing, Math', status: 'Official Educator Bank', isOfficial: true },
              { name: 'Cambridge Assessment English & IDP IELTS', scope: 'Listening, Reading, Writing, Speaking', status: 'Authentic Practice Papers', isOfficial: true },
              { name: 'Council of Europe CEFR Multi-Level Standards', scope: 'A1, A2, B1, B2, C1 English Framework', status: 'European Framework', isOfficial: true },
            ].map((src, idx) => (
              <div key={idx} className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">{src.name}</h4>
                  <span className="px-2 py-0.5 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-[10px] font-black uppercase">
                    Rasmiy
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">{src.scope}</p>
                <div className="text-[11px] text-slate-400 flex items-center space-x-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span>{src.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* NEW QUESTION MODAL */}
      {showNewQuestionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 max-w-2xl w-full shadow-2xl space-y-5 my-8 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="text-base font-black text-slate-900 dark:text-white">
                Savollar Bazisiga Yangi Savol Qo'shish
              </h3>
              <button
                onClick={() => setShowNewQuestionModal(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveNewQuestion} className="space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
                    Imtihon turi
                  </label>
                  <select
                    value={newQExam}
                    onChange={(e) => setNewQExam(e.target.value as ExamType)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-bold"
                  >
                    <option value="milliy">Milliy Sertifikat</option>
                    <option value="sat">SAT</option>
                    <option value="ielts">IELTS</option>
                    <option value="cefr">CEFR</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
                    Fan / Bo'lim
                  </label>
                  <input
                    type="text"
                    value={newQSubject}
                    onChange={(e) => setNewQSubject(e.target.value)}
                    placeholder="Matematika, Reading, etc."
                    className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
                    Qiyinchilik
                  </label>
                  <select
                    value={newQDifficulty}
                    onChange={(e) => setNewQDifficulty(e.target.value as any)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-bold"
                  >
                    <option value="Oson">Oson</option>
                    <option value="O'rta">O'rta</option>
                    <option value="Murakkab">Murakkab</option>
                  </select>
                </div>
              </div>

              {/* Question Type */}
              <div>
                <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
                  Savol Turi
                </label>
                <select
                  value={newQType}
                  onChange={(e) => setNewQType(e.target.value as QuestionType)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-bold"
                >
                  <option value="multiple_choice">Oddiy test (A, B, C, D variantli)</option>
                  <option value="numeric">Sonli javob (Raqam kiritish)</option>
                  <option value="short_answer">Qisqa matnli javob</option>
                  <option value="true_false">True / False</option>
                  <option value="reading_passage">Matnli savol (Reading)</option>
                  <option value="writing_task">Writing (Insho topshirig'i)</option>
                  <option value="speaking_task">Speaking (Audio topshirig'i)</option>
                </select>
              </div>

              {/* Passage if reading */}
              {newQType === 'reading_passage' && (
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
                    Matn (Reading Passage)
                  </label>
                  <textarea
                    rows={4}
                    value={newQPassage}
                    onChange={(e) => setNewQPassage(e.target.value)}
                    placeholder="Matn mazmunini kiriting..."
                    className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs"
                  />
                </div>
              )}

              {/* Question Text */}
              <div>
                <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
                  Savol Matni *
                </label>
                <textarea
                  rows={3}
                  value={newQText}
                  onChange={(e) => setNewQText(e.target.value)}
                  placeholder="Savolni to'liq kiriting..."
                  className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs"
                  required
                />
              </div>

              {/* Options for Multiple Choice */}
              {newQType === 'multiple_choice' && (
                <div className="space-y-2">
                  <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400">
                    Variantlar va to'g'ri javobni tanlang:
                  </label>
                  {newQOptions.map((opt, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="correctOpt"
                        checked={newQCorrectOption === idx}
                        onChange={() => setNewQCorrectOption(idx)}
                        className="w-4 h-4 text-blue-600"
                      />
                      <span className="text-xs font-bold w-5">{String.fromCharCode(65 + idx)})</span>
                      <input
                        type="text"
                        value={opt}
                        onChange={(e) => {
                          const copy = [...newQOptions];
                          copy[idx] = e.target.value;
                          setNewQOptions(copy);
                        }}
                        placeholder={`Variant ${String.fromCharCode(65 + idx)}`}
                        className="flex-1 p-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs"
                        required
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* Numeric / short answer */}
              {(newQType === 'numeric' || newQType === 'short_answer') && (
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
                    To'g'ri qiymat / javob matni
                  </label>
                  <input
                    type="text"
                    value={newQTextAnswer}
                    onChange={(e) => setNewQTextAnswer(e.target.value)}
                    placeholder="Masalan: 4.8 yoki 23"
                    className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs"
                    required
                  />
                </div>
              )}

              {/* Explanation */}
              <div>
                <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
                  Pedagogik Yechim & Izoh *
                </label>
                <textarea
                  rows={2}
                  value={newQExplanation}
                  onChange={(e) => setNewQExplanation(e.target.value)}
                  placeholder="Foydalanuvchiga to'g'ri javob sababini batafsil tushuntiring..."
                  className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs"
                  required
                />
              </div>

              {/* Source info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
                    Rasmiy manba nomi
                  </label>
                  <input
                    type="text"
                    value={newQSource}
                    onChange={(e) => setNewQSource(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs"
                  />
                </div>
                <div className="flex items-center space-x-2 pt-5">
                  <input
                    type="checkbox"
                    id="isOfficialCheck"
                    checked={newQIsOfficial}
                    onChange={(e) => setNewQIsOfficial(e.target.checked)}
                    className="w-4 h-4 rounded-sm text-blue-600"
                  />
                  <label htmlFor="isOfficialCheck" className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Rasmiy material sifatida belgilash
                  </label>
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowNewQuestionModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-bold"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs shadow-md"
                >
                  Bazaga Saqlash
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CSV IMPORT MODAL */}
      {showCsvModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 max-w-xl w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="text-base font-black text-slate-900 dark:text-white">
                CSV / Excel Formatidan Savollar Import Qilish
              </h3>
              <button onClick={() => setShowCsvModal(false)} className="p-1.5 text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400">
              Format namunasi: <br />
              <code className="text-slate-700 dark:text-slate-300 font-mono text-[11px] bg-slate-100 dark:bg-slate-800 p-1 rounded-sm block mt-1">
                examType,subject,questionText,optionA,optionB,optionC,optionD,explanation
              </code>
            </p>

            <textarea
              rows={6}
              value={csvRawText}
              onChange={(e) => setCsvRawText(e.target.value)}
              placeholder="CSV matnini shu yerga nusxalab qo'ying..."
              className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-mono"
            />

            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={handleParseCsv}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs"
              >
                Matnni Tahlil Qilish
              </button>
              {parsedCsvQuestions.length > 0 && (
                <span className="text-xs text-emerald-600 font-bold">
                  {parsedCsvQuestions.length} ta savol aniqlandi!
                </span>
              )}
            </div>

            {parsedCsvQuestions.length > 0 && (
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 max-h-36 overflow-y-auto text-xs space-y-1">
                {parsedCsvQuestions.map((q, i) => (
                  <div key={i} className="truncate text-slate-700 dark:text-slate-300">
                    {i + 1}. [{(q.examType || 'milliy').toUpperCase()}] {q.text}
                  </div>
                ))}
              </div>
            )}

            <div className="flex justify-end space-x-2 pt-2">
              <button
                onClick={() => setShowCsvModal(false)}
                className="px-4 py-2 rounded-xl border border-slate-300 text-xs font-bold"
              >
                Bekor qilish
              </button>
              <button
                disabled={parsedCsvQuestions.length === 0}
                onClick={handleConfirmCsvImport}
                className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold text-xs"
              >
                Importni Tasdiqlash
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
