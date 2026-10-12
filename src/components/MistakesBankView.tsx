import React, { useState } from 'react';
import { 
  AlertTriangle, 
  Play, 
  CheckCircle2, 
  Search, 
  RotateCcw, 
  Layers, 
  Trash2, 
  Sparkles, 
  ArrowRight,
  Filter
} from 'lucide-react';
import { ExamType, MistakeItem, MockTest, Question } from '../types';
import { buildConfiguredTest, getExamLabel } from '../utils/testBuilder';

interface MistakesBankViewProps {
  mistakes: MistakeItem[];
  onStartMistakeTest: (test: MockTest) => void;
  onClearMistake: (mistakeId: string) => void;
  onAskAiAboutQuestion: (question: Question) => void;
}

export const MistakesBankView: React.FC<MistakesBankViewProps> = ({
  mistakes,
  onStartMistakeTest,
  onClearMistake,
  onAskAiAboutQuestion,
}) => {
  const [selectedExamFilter, setSelectedExamFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMistakes = mistakes.filter((m) => {
    if (selectedExamFilter !== 'all' && m.question.examType !== selectedExamFilter) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        m.question.text.toLowerCase().includes(q) ||
        (m.question.subject && m.question.subject.toLowerCase().includes(q)) ||
        (m.question.topic && m.question.topic.toLowerCase().includes(q))
      );
    }
    return true;
  });

  const handleStartAllMistakes = () => {
    if (filteredMistakes.length === 0) return;
    const examType: ExamType = (selectedExamFilter !== 'all' ? selectedExamFilter : filteredMistakes[0].question.examType) as ExamType;
    const test = buildConfiguredTest(
      {
        examType,
        questionCount: Math.min(30, filteredMistakes.length),
        durationMinutes: Math.max(10, Math.round(filteredMistakes.length * 1.5)),
        mode: 'mistakes_only',
      },
      filteredMistakes.map((m) => m.question),
      filteredMistakes
    );
    onStartMistakeTest(test);
  };

  return (
    <div className="space-y-6 animate-fade-in font-sans">
      {/* Header Banner */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
        <div>
          <div className="flex items-center space-x-2 text-rose-600 dark:text-rose-400 text-xs font-black uppercase tracking-wider mb-1">
            <AlertTriangle className="w-4 h-4" />
            <span>Xatolarim Banki (Mistake Notebook)</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
            Xatolar ustida individual ishlash
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Oldingi testlarda adashgan savollaringiz bu yerda to'planadi. Qayta ishlab o'zlashtiring!
          </p>
        </div>

        {filteredMistakes.length > 0 && (
          <button
            type="button"
            onClick={handleStartAllMistakes}
            className="px-6 py-3 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-black text-xs inline-flex items-center justify-center space-x-2 shadow-md hover:shadow-lg transition-all shrink-0 cursor-pointer"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Xatolardan Test Boshlash ({filteredMistakes.length} ta)</span>
          </button>
        )}
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Exam category pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          {[
            { id: 'all', label: `Barchasi (${mistakes.length})` },
            { id: 'milliy', label: 'Milliy Sertifikat' },
            { id: 'sat', label: 'SAT' },
            { id: 'ielts', label: 'IELTS' },
            { id: 'cefr', label: 'CEFR' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedExamFilter(cat.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedExamFilter === cat.id
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Xatolar ichidan qidirish..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Empty State */}
      {filteredMistakes.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-12 text-center space-y-4 shadow-xs">
          <div className="w-14 h-14 rounded-2xl bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Ajoyib! Hech qanday xatolar yo'q
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto mt-1">
              Siz tanlagan toifada xatolar mavjud emas yoki barcha xatolarni muvaffaqiyatli takrorlab bo'lgansiz.
            </p>
          </div>
        </div>
      ) : (
        /* Mistake Cards List */
        <div className="grid grid-cols-1 gap-4">
          {filteredMistakes.map((m) => (
            <div
              key={m.id}
              className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 shadow-xs space-y-4 hover:border-slate-300 dark:hover:border-slate-700 transition-all"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="px-2.5 py-0.5 rounded-lg bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 font-bold uppercase">
                    {getExamLabel(m.question.examType || 'milliy')}
                  </span>
                  {m.question.subject && (
                    <span className="font-bold text-slate-700 dark:text-slate-300">
                      {m.question.subject}
                    </span>
                  )}
                  {m.question.topic && (
                    <>
                      <span className="text-slate-300 dark:text-slate-700">·</span>
                      <span className="text-slate-500 dark:text-slate-400">{m.question.topic}</span>
                    </>
                  )}
                  <span className="text-slate-300 dark:text-slate-700">·</span>
                  <span className="text-slate-400 text-[11px]">{m.attemptDate}</span>
                </div>

                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => onAskAiAboutQuestion(m.question)}
                    className="p-1.5 rounded-xl text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 text-xs font-bold inline-flex items-center space-x-1 cursor-pointer"
                    title="AI yordamchisidan tushuntirish so'rash"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    <span className="hidden sm:inline">AI Tushuntirish</span>
                  </button>

                  <button
                    onClick={() => onClearMistake(m.id)}
                    className="p-1.5 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
                    title="Ro'yxatdan o'chirish (o'zlashtirildi)"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Question Text */}
              <h4 className="text-sm font-bold text-slate-900 dark:text-white leading-relaxed">
                {m.question.text}
              </h4>

              {/* Options if available */}
              {m.question.options && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {m.question.options.map((opt, optIdx) => {
                    const isCorrect = m.question.correctOption === optIdx;
                    return (
                      <div
                        key={optIdx}
                        className={`p-2.5 rounded-xl border flex items-center justify-between ${
                          isCorrect
                            ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-900 dark:text-emerald-200 font-bold'
                            : 'bg-slate-50 dark:bg-slate-800/40 border-slate-100 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        <div className="flex items-center space-x-2">
                          <span className="font-mono font-bold">
                            {String.fromCharCode(65 + optIdx)})
                          </span>
                          <span>{opt}</span>
                        </div>
                        {isCorrect && (
                          <span className="text-[10px] uppercase font-bold text-emerald-600">
                            To'g'ri
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Explanation box */}
              <div className="p-3.5 rounded-2xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/50 text-xs">
                <span className="font-black text-blue-900 dark:text-blue-300 block mb-1">
                  Yechim izohi:
                </span>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  {m.question.explanation}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
