import React, { useState } from 'react';
import { 
  Award, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  TrendingUp, 
  AlertTriangle, 
  Sparkles, 
  ArrowLeft, 
  RotateCcw, 
  Share2, 
  HelpCircle,
  BarChart2,
  ChevronDown,
  ChevronUp,
  Target,
  FileQuestion,
  Zap,
  BookOpen,
  ShieldCheck,
  ShieldAlert,
  FileCheck
} from 'lucide-react';
import { MockTest, Question, UserTestResult } from '../types';
import { CertificateModal } from './CertificateModal';

interface TestResultViewProps {
  result: UserTestResult;
  test: MockTest;
  onBackToCatalog: () => void;
  onRetakeTest: () => void;
  onGoToStudyPlan: () => void;
  onAskAiAboutQuestion: (q: Question, userAnswerIndex?: any) => void;
  onGenerateWeakAreasTest?: (weakSkills: string[]) => void;
}

export const TestResultView: React.FC<TestResultViewProps> = ({
  result,
  test,
  onBackToCatalog,
  onRetakeTest,
  onGoToStudyPlan,
  onAskAiAboutQuestion,
  onGenerateWeakAreasTest,
}) => {
  const [filterMode, setFilterMode] = useState<'all' | 'mistakes' | 'correct'>('all');
  const [expandedExplanations, setExpandedExplanations] = useState<Record<string, boolean>>({});
  const [showCertificateModal, setShowCertificateModal] = useState(false);

  const toggleExplanation = (qId: string) => {
    setExpandedExplanations((prev) => ({
      ...prev,
      [qId]: !prev[qId],
    }));
  };

  const formatMinutes = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m} daqiqa ${s} soniya`;
  };

  // Find reviews or compute
  const filteredQuestions = test.questions.filter((q) => {
    const review = result.questionReviews?.find((r) => r.questionId === q.id);
    const isCorrect = review !== undefined ? review.isCorrect : (result.answers[q.id] === q.correctOption);

    if (filterMode === 'mistakes') return !isCorrect;
    if (filterMode === 'correct') return isCorrect;
    return true;
  });

  return (
    <div className="space-y-8 animate-fade-in font-sans">
      {/* Top Header with Back action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <button
          onClick={onBackToCatalog}
          className="flex items-center space-x-1.5 text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Barcha testlarga qaytish</span>
        </button>

        <div className="flex items-center gap-2 flex-wrap">
          {result.hasCertificate && (
            <button
              onClick={() => setShowCertificateModal(true)}
              className="px-3.5 py-1.5 rounded-xl text-xs font-black bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 flex items-center space-x-1.5 shadow-sm transition-all cursor-pointer"
            >
              <Award className="w-3.5 h-3.5 text-slate-950" />
              <span>Sertifikatni Ko'rish</span>
            </button>
          )}

          {result.weakSkills.length > 0 && onGenerateWeakAreasTest && (
            <button
              onClick={() => onGenerateWeakAreasTest(result.weakSkills)}
              className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-purple-600 hover:bg-purple-700 text-white flex items-center space-x-1.5 shadow-xs transition-colors cursor-pointer"
            >
              <Zap className="w-3.5 h-3.5 text-amber-300" />
              <span>Zaif mavzulardan test yaratish</span>
            </button>
          )}

          <button
            onClick={onRetakeTest}
            className="px-3.5 py-1.5 rounded-xl text-xs font-bold border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center space-x-1.5 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Qayta topshirish</span>
          </button>

          <button
            onClick={onGoToStudyPlan}
            className="px-4 py-1.5 rounded-xl text-xs font-black bg-blue-600 hover:bg-blue-700 text-white transition-colors shadow-xs cursor-pointer"
          >
            O'quv Rejasini Ko'rish
          </button>
        </div>
      </div>

      {/* Hero Diagnostic Result Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left score highlight - Strictly based on correct answer count */}
          <div className="lg:col-span-5 text-center lg:text-left border-b lg:border-b-0 lg:border-r border-slate-100 dark:border-slate-800 pb-6 lg:pb-0 lg:pr-8">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              {result.examType.toUpperCase()} Rasmiy Tahliliy Natijasi
            </span>

            {/* Prominent Real Score based directly on correct answers */}
            <div className="mt-3">
              <div className="flex items-baseline justify-center lg:justify-start space-x-2">
                <span className="text-4xl sm:text-6xl font-black font-mono text-blue-600 dark:text-blue-400 tracking-tight">
                  {result.correctCount} / {result.maxScore}
                </span>
                <span className="text-lg sm:text-2xl font-black text-slate-800 dark:text-slate-200 font-sans">
                  to'g'ri ({result.percentage}%)
                </span>
              </div>
              <div className="mt-2.5 inline-flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 text-xs font-bold border border-emerald-200 dark:border-emerald-800/60">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>To'plangan aniq ball: <strong>{result.score} ball</strong> (Jami {result.maxScore} balldan)</span>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-center lg:justify-start gap-2">
              <div className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-xs font-extrabold text-blue-900 dark:text-blue-300 border border-blue-200 dark:border-blue-900/40">
                <Award className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                <span>Rasmiy shkala: {result.scaledScore}</span>
              </div>
              <div className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300">
                <span>{result.diagnosticLevel}</span>
              </div>
            </div>

            {/* Dynamic Certificate Status Banner */}
            {result.hasCertificate ? (
              <div className="mt-4 p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between gap-3 text-left">
                <div className="flex items-center space-x-2.5">
                  <div className="w-8 h-8 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-black shrink-0">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-black text-amber-900 dark:text-amber-300 block">
                      🎉 Tabriklaymiz! Sizga {result.certificateGrade || 'A+'} darajali sertifikat berildi!
                    </span>
                    <span className="text-[11px] text-amber-800/80 dark:text-amber-400">
                      {result.correctCount} / {result.maxScore} to'g'ri ({result.percentage}%) natijangiz bilan sertifikatni yuklab olishingiz mumkin.
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setShowCertificateModal(true)}
                  className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold shrink-0 transition-colors cursor-pointer"
                >
                  Ko'rish
                </button>
              </div>
            ) : (
              <div className="mt-4 p-3.5 rounded-2xl bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/40 flex items-start space-x-2.5 text-left text-rose-900 dark:text-rose-300">
                <div className="w-7 h-7 rounded-lg bg-rose-100 dark:bg-rose-900/50 flex items-center justify-center text-rose-600 dark:text-rose-400 shrink-0 mt-0.5">
                  <XCircle className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-black block">
                    ❌ Sertifikat berilmadi (Yetarli ball to'planmadi)
                  </span>
                  <span className="text-[11px] text-rose-700 dark:text-rose-400 block mt-0.5 leading-relaxed">
                    Sertifikat olish uchun kamida 60% (10 tadan kamida 6 ta to'g'ri) to'plash shart. Siz {result.correctCount} / {result.maxScore} ({result.percentage}%) to'pladingiz. Qayta topshirib, sertifikat olishingiz mumkin.
                  </span>
                </div>
              </div>
            )}

            <p className="text-xs text-slate-600 dark:text-slate-400 mt-3 leading-relaxed">
              Tavakkal ball yo'q: Siz ishlagan {result.maxScore} ta savoldan {result.correctCount} tasiga to'g'ri javob berdingiz va shunga qarab aniq {result.score} ball ({result.percentage}%) hisoblandi.
            </p>
          </div>

          {/* Right Metrics Grid */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="bg-emerald-50/50 dark:bg-emerald-950/20 p-4 rounded-2xl border border-emerald-100 dark:border-emerald-900/40">
              <div className="flex items-center space-x-1.5 text-xs text-emerald-700 dark:text-emerald-400 font-bold mb-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>To'g'ri Javoblar</span>
              </div>
              <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400 font-mono">
                {result.correctCount} ta
              </span>
              <p className="text-[11px] text-emerald-600/80 font-bold mt-0.5">+{result.correctCount} ball</p>
            </div>

            <div className="bg-rose-50/50 dark:bg-rose-950/20 p-4 rounded-2xl border border-rose-100 dark:border-rose-900/40">
              <div className="flex items-center space-x-1.5 text-xs text-rose-700 dark:text-rose-400 font-bold mb-1">
                <XCircle className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
                <span>Xato Javoblar</span>
              </div>
              <span className="text-2xl font-black text-rose-600 dark:text-rose-400 font-mono">
                {result.wrongCount} ta
              </span>
              <p className="text-[11px] text-rose-600/80 font-bold mt-0.5">0 ball</p>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
              <div className="flex items-center space-x-1.5 text-xs text-slate-500 dark:text-slate-400 font-bold mb-1">
                <Clock className="w-3.5 h-3.5 text-blue-500" />
                <span>Sarflangan Vaqt</span>
              </div>
              <span className="text-base font-bold text-slate-900 dark:text-white font-mono">
                {formatMinutes(result.timeSpentSeconds)}
              </span>
              <p className="text-[10px] text-slate-400 mt-0.5">
                O'rtacha {result.averageTimePerQuestion || Math.round(result.timeSpentSeconds / (result.maxScore || 1))} soniya / savol
              </p>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 col-span-2 sm:col-span-3">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-2">
                Pedagogik Tavsiyalar & Tahlil:
              </span>
              <ul className="space-y-1.5">
                {result.recommendations.map((rec, i) => (
                  <li key={i} className="text-xs text-slate-600 dark:text-slate-400 flex items-start space-x-2">
                    <span className="text-blue-500 font-bold mt-0.5">•</span>
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* QUESTIONS REVIEW SECTION */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-lg font-black text-slate-900 dark:text-white">
              Savollarni Batafsil Ko'rish
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Har bir savol bo'yicha bergan javobingiz, to'g'ri yechim va pedagogik tushuntirish.
            </p>
          </div>

          {/* Filter tabs: All, Mistakes only, Correct only */}
          <div className="flex items-center p-1 bg-slate-200/70 dark:bg-slate-800 rounded-xl">
            <button
              onClick={() => setFilterMode('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                filterMode === 'all'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              Barchasi ({test.questions.length})
            </button>
            <button
              onClick={() => setFilterMode('mistakes')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                filterMode === 'mistakes'
                  ? 'bg-white dark:bg-slate-900 text-rose-600 dark:text-rose-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              Xatolarim ({result.wrongCount + result.unansweredCount})
            </button>
            <button
              onClick={() => setFilterMode('correct')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                filterMode === 'correct'
                  ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              To'g'ri ({result.correctCount})
            </button>
          </div>
        </div>

        {/* Questions list */}
        <div className="space-y-4">
          {filteredQuestions.map((q, idx) => {
            const userAns = result.answers[q.id];
            const review = result.questionReviews?.find((r) => r.questionId === q.id);
            const isCorrect = review !== undefined ? review.isCorrect : false;

            return (
              <div
                key={q.id}
                className={`bg-white dark:bg-slate-900 rounded-3xl border p-5 sm:p-6 transition-all ${
                  isCorrect
                    ? 'border-emerald-200 dark:border-emerald-950/60'
                    : 'border-rose-200 dark:border-rose-950/60'
                }`}
              >
                {/* Question item header */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center space-x-2">
                    <span
                      className={`w-6 h-6 rounded-lg text-xs font-bold flex items-center justify-center ${
                        isCorrect
                          ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                          : 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
                      }`}
                    >
                      {isCorrect ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                    </span>
                    <span className="text-xs font-bold text-slate-900 dark:text-white">
                      Savol #{idx + 1}
                    </span>
                    <span className="text-slate-300 dark:text-slate-700">·</span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      {q.section || q.subject || 'Umumiy'}
                    </span>
                    <span className="text-slate-300 dark:text-slate-700">·</span>
                    <span className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded-md ${
                      isCorrect 
                        ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300' 
                        : 'bg-rose-50 dark:bg-rose-950/50 text-rose-700 dark:text-rose-300'
                    }`}>
                      {isCorrect ? '+1 ball (To\'g\'ri)' : '0 ball (Xato)'}
                    </span>
                  </div>

                  <button
                    onClick={() => onAskAiAboutQuestion(q, userAns)}
                    className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 inline-flex items-center space-x-1 cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    <span>AI dan tushuntirish so'rash</span>
                  </button>
                </div>

                {/* Question text */}
                <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-3">
                  {q.text}
                </h4>

                {/* Multiple choice / True-False / Listening options */}
                {q.options && q.questionType !== 'multiple_select' && (
                  <div className="space-y-2 mb-4">
                    {q.options.map((opt, optIdx) => {
                      const isUserChoice = userAns === optIdx;
                      const isTargetCorrect = q.correctOption === optIdx;

                      let style = 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300';
                      if (isTargetCorrect) {
                        style = 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 dark:border-emerald-700 text-emerald-900 dark:text-emerald-200 font-bold';
                      } else if (isUserChoice && !isCorrect) {
                        style = 'bg-rose-50 dark:bg-rose-950/40 border-rose-500 dark:border-rose-700 text-rose-900 dark:text-rose-200 line-through';
                      }

                      return (
                        <div
                          key={optIdx}
                          className={`p-3 rounded-xl border text-xs flex items-center justify-between ${style}`}
                        >
                          <div className="flex items-center space-x-2">
                            <span className="font-mono font-bold">
                              {String.fromCharCode(65 + optIdx)})
                            </span>
                            <span>{opt}</span>
                          </div>

                          {isTargetCorrect && (
                            <span className="text-[11px] font-black uppercase text-emerald-700 dark:text-emerald-400">
                              To'g'ri Javob
                            </span>
                          )}
                          {isUserChoice && !isTargetCorrect && (
                            <span className="text-[11px] font-black uppercase text-rose-600 dark:text-rose-400">
                              Sizning xato javobingiz
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Multiple select options */}
                {q.options && q.questionType === 'multiple_select' && (
                  <div className="space-y-2 mb-4">
                    {q.options.map((opt, optIdx) => {
                      const userSelectedList = Array.isArray(userAns) ? userAns : [];
                      const isUserChoice = userSelectedList.includes(optIdx);
                      const isTargetCorrect = (q.correctOptions || []).includes(optIdx);

                      let style = 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300';
                      if (isTargetCorrect && isUserChoice) {
                        style = 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 dark:border-emerald-700 text-emerald-900 dark:text-emerald-200 font-bold';
                      } else if (isTargetCorrect && !isUserChoice) {
                        style = 'bg-amber-50 dark:bg-amber-950/40 border-amber-400 dark:border-amber-700 text-amber-900 dark:text-amber-200 font-bold';
                      } else if (isUserChoice && !isTargetCorrect) {
                        style = 'bg-rose-50 dark:bg-rose-950/40 border-rose-500 dark:border-rose-700 text-rose-900 dark:text-rose-200 line-through';
                      }

                      return (
                        <div
                          key={optIdx}
                          className={`p-3 rounded-xl border text-xs flex items-center justify-between ${style}`}
                        >
                          <div className="flex items-center space-x-2">
                            <span className="font-mono font-bold">
                              {String.fromCharCode(65 + optIdx)})
                            </span>
                            <span>{opt}</span>
                          </div>

                          {isTargetCorrect && (
                            <span className="text-[11px] font-black uppercase text-emerald-700 dark:text-emerald-400">
                              To'g'ri Variant
                            </span>
                          )}
                          {isUserChoice && !isTargetCorrect && (
                            <span className="text-[11px] font-black uppercase text-rose-600 dark:text-rose-400">
                              Xato tanlangan
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Numeric / Short Answer display */}
                {(q.questionType === 'numeric' || q.questionType === 'short_answer') && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4 text-xs font-mono">
                    <div className={`p-3 rounded-xl border ${
                      isCorrect 
                        ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200' 
                        : 'bg-rose-50 dark:bg-rose-950/30 border-rose-300 dark:border-rose-800 text-rose-900 dark:text-rose-200'
                    }`}>
                      <span className="block font-sans text-[11px] font-bold text-slate-500 dark:text-slate-400 mb-1">
                        Siz kiritgan javob:
                      </span>
                      <span className="font-bold">
                        {userAns !== undefined && userAns !== '' ? String(userAns) : '(Bo\'sh qoldirilgan)'}
                      </span>
                    </div>

                    <div className="p-3 rounded-xl border bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200">
                      <span className="block font-sans text-[11px] font-bold text-slate-500 dark:text-slate-400 mb-1">
                        To'g'ri standart qiymat:
                      </span>
                      <span className="font-bold">
                        {q.correctTextAnswer || review?.correctAnswer || 'Standart yechim'}
                      </span>
                    </div>
                  </div>
                )}

                {/* Matching Question display */}
                {q.questionType === 'matching' && q.matchingPairs && (
                  <div className="space-y-2 mb-4">
                    <span className="text-xs font-bold text-slate-600 dark:text-slate-400 block mb-1">
                      Moslashtirish natijalari:
                    </span>
                    <div className="grid grid-cols-1 gap-2 text-xs">
                      {q.matchingPairs.map((pair) => {
                        const pairUserChoice = (userAns as Record<string, string>)?.[pair.id];
                        const pairIsCorrect = pairUserChoice === pair.right;
                        return (
                          <div
                            key={pair.id}
                            className={`p-2.5 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-2 ${
                              pairIsCorrect
                                ? 'bg-emerald-50/60 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200'
                                : 'bg-rose-50/60 dark:bg-rose-950/30 border-rose-200 dark:border-rose-800 text-rose-900 dark:text-rose-200'
                            }`}
                          >
                            <span className="font-bold">{pair.left}</span>
                            <div className="flex items-center space-x-2 text-[11px]">
                              <span>Siz: <strong>{pairUserChoice || '(Tanlanmagan)'}</strong></span>
                              <span>→</span>
                              <span>To'g'ri: <strong>{pair.right}</strong></span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Explanation accordion */}
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                  <div className="p-3.5 rounded-2xl bg-blue-50/50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/50 text-xs">
                    <span className="font-black text-blue-900 dark:text-blue-300 block mb-1">
                      To'g'ri javob izohi & pedagogik tahlil:
                    </span>
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                      {q.explanation}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Official Certificate Modal */}
      {result.hasCertificate && (
        <CertificateModal
          isOpen={showCertificateModal}
          onClose={() => setShowCertificateModal(false)}
          result={result}
          studentName={result.userName || 'Sherzodbek Alisherov'}
        />
      )}
    </div>
  );
};
