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
  Filter,
  ChevronDown,
  ChevronUp,
  Lightbulb,
  Check,
  XCircle,
  HelpCircle,
  BookOpen
} from 'lucide-react';
import { ExamType, MistakeItem, MockTest, Question, AiBreakdownStep } from '../types';
import { buildConfiguredTest, getExamLabel } from '../utils/testBuilder';
import { generateStepByStepMistakeAnalysis } from '../utils/aiMistakeAnalyzer';
import { triggerConfetti } from '../utils/confetti';

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
  
  // Track expanded AI breakdowns
  const [expandedAiIds, setExpandedAiIds] = useState<Record<string, boolean>>({});
  
  // Interactive retake state per mistake: { mistakeId: selectedOptionIndex }
  const [retakeAnswers, setRetakeAnswers] = useState<Record<string, number | null>>({});
  const [retakeStatus, setRetakeStatus] = useState<Record<string, 'correct' | 'wrong' | null>>({});

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

  const toggleAiBreakdown = (mistakeId: string) => {
    setExpandedAiIds((prev) => ({
      ...prev,
      [mistakeId]: !prev[mistakeId],
    }));
  };

  const handleInteractiveAnswer = (mistakeId: string, question: Question, chosenIdx: number) => {
    setRetakeAnswers((prev) => ({ ...prev, [mistakeId]: chosenIdx }));
    const isCorrect = question.correctOption === chosenIdx;
    setRetakeStatus((prev) => ({ ...prev, [mistakeId]: isCorrect ? 'correct' : 'wrong' }));
    
    if (isCorrect) {
      triggerConfetti();
    }
  };

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
            Xatolarim va AI Qanday Ishlanishi Tahlili
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Oldingi testlarda adashgan savollaringiz. Har bir savol ostida AI bosqichma-bosqich qanday ishlanishini tushuntirib beradi!
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
            { id: 'milliy', label: 'Milliy Matematika' },
            { id: 'sat', label: 'SAT (English & Math)' },
            { id: 'ielts', label: 'IELTS Academic' },
            { id: 'cefr', label: 'CEFR Multi-Level' },
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
              Siz tanlagan toifada xatolar mavjud emas. Yangi mock testlar ishlab o'z bilimingizni sinab boring!
            </p>
          </div>
        </div>
      ) : (
        /* Mistake Cards List */
        <div className="grid grid-cols-1 gap-5">
          {filteredMistakes.map((m) => {
            const isAiExpanded = !!expandedAiIds[m.id];
            const aiBreakdown = m.aiBreakdown || generateStepByStepMistakeAnalysis(m.question, m.userWrongAnswer ?? m.userAnswer);
            const userRetakeAnswer = retakeAnswers[m.id];
            const currentRetakeStatus = retakeStatus[m.id];

            return (
              <div
                key={m.id}
                className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-5 sm:p-7 shadow-xs space-y-4 hover:border-slate-300 dark:hover:border-slate-700 transition-all"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="px-2.5 py-0.5 rounded-lg bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 font-black uppercase">
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
                        <span className="text-slate-500 dark:text-slate-400 font-medium">{m.question.topic}</span>
                      </>
                    )}
                    <span className="text-slate-300 dark:text-slate-700">·</span>
                    <span className="text-slate-400 text-[11px] font-mono">{m.attemptDate}</span>
                  </div>

                  <div className="flex items-center space-x-1.5">
                    {/* Toggle AI Step-by-Step Button */}
                    <button
                      type="button"
                      onClick={() => toggleAiBreakdown(m.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-black inline-flex items-center space-x-1.5 transition-all cursor-pointer ${
                        isAiExpanded
                          ? 'bg-purple-600 text-white shadow-xs'
                          : 'bg-purple-50 dark:bg-purple-950/50 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800 hover:bg-purple-100'
                      }`}
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-400 fill-current" />
                      <span>{isAiExpanded ? 'AI Tahlilni yopish' : 'AI Qanday Ishlanishi Tahlili'}</span>
                      {isAiExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>

                    {/* Ask AI Tutor in drawer */}
                    <button
                      type="button"
                      onClick={() => onAskAiAboutQuestion(m.question)}
                      className="p-1.5 rounded-xl text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 text-xs font-bold inline-flex items-center space-x-1 cursor-pointer"
                      title="AI Ustoz chatida savol berish"
                    >
                      <span className="hidden sm:inline">AI Ustoz</span>
                    </button>

                    {/* Delete mistake */}
                    <button
                      type="button"
                      onClick={() => onClearMistake(m.id)}
                      className="p-1.5 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
                      title="O'zlashtirildi deb o'chirish"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Question Passage if any */}
                {m.question.passage && (
                  <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 font-serif italic max-h-32 overflow-y-auto">
                    {m.question.passage}
                  </div>
                )}

                {/* Question Text */}
                <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white leading-relaxed">
                  {m.question.text}
                </h4>

                {/* Interactive Retake Options */}
                {m.question.options && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs text-slate-500 font-bold mb-1">
                      <span>Variantlar (Qayta javob berib o'zingizni sinab ko'ring):</span>
                      {currentRetakeStatus === 'correct' && (
                        <span className="text-emerald-600 font-black inline-flex items-center space-x-1">
                          <Check className="w-3.5 h-3.5" />
                          <span>To'g'ri topdingiz!</span>
                        </span>
                      )}
                      {currentRetakeStatus === 'wrong' && (
                        <span className="text-rose-600 font-black inline-flex items-center space-x-1">
                          <XCircle className="w-3.5 h-3.5" />
                          <span>Qayta urinib ko'ring!</span>
                        </span>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {m.question.options.map((opt, optIdx) => {
                        const isOriginalCorrect = m.question.correctOption === optIdx;
                        const isUserChosenRetake = userRetakeAnswer === optIdx;
                        const isOriginalWrong = m.userWrongAnswer === optIdx || m.userAnswer === optIdx;

                        let styleClasses = "bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300";

                        if (userRetakeAnswer !== undefined && userRetakeAnswer !== null) {
                          if (isOriginalCorrect) {
                            styleClasses = "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-900 dark:text-emerald-200 font-bold";
                          } else if (isUserChosenRetake) {
                            styleClasses = "bg-rose-50 dark:bg-rose-950/40 border-rose-500 text-rose-900 dark:text-rose-200 font-bold";
                          }
                        } else if (isOriginalWrong && !isOriginalCorrect) {
                          styleClasses = "bg-rose-50/70 dark:bg-rose-950/30 border-rose-200 dark:border-rose-900/40 text-rose-800 dark:text-rose-300";
                        }

                        return (
                          <button
                            key={optIdx}
                            type="button"
                            onClick={() => handleInteractiveAnswer(m.id, m.question, optIdx)}
                            className={`p-3 rounded-2xl border text-left flex items-center justify-between transition-all cursor-pointer ${styleClasses}`}
                          >
                            <div className="flex items-center space-x-2.5">
                              <span className="font-mono font-black text-xs w-5">
                                {String.fromCharCode(65 + optIdx)})
                              </span>
                              <span>{opt}</span>
                            </div>
                            {isOriginalCorrect && userRetakeAnswer !== undefined && (
                              <span className="text-[10px] uppercase font-black text-emerald-600 bg-emerald-100 dark:bg-emerald-900/60 px-2 py-0.5 rounded-md">
                                To'g'ri
                              </span>
                            )}
                            {isOriginalWrong && userRetakeAnswer === undefined && (
                              <span className="text-[10px] uppercase font-bold text-rose-600 bg-rose-100 dark:bg-rose-900/50 px-2 py-0.5 rounded-md">
                                Siz tanlagan xato
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* AI STEP-BY-STEP DEEP BREAKDOWN ACCORDION */}
                {isAiExpanded && (
                  <div className="mt-4 p-5 rounded-3xl bg-gradient-to-br from-purple-50/80 via-indigo-50/40 to-blue-50/60 dark:from-purple-950/30 dark:via-indigo-950/20 dark:to-blue-950/20 border-2 border-purple-200 dark:border-purple-800/80 space-y-4 animate-scale-up">
                    <div className="flex items-center space-x-2 text-purple-900 dark:text-purple-300 font-black text-sm">
                      <Sparkles className="w-4 h-4 text-amber-500 fill-current" />
                      <span>AI Tahlili: Ushbu test qanday ishlanishi kerak?</span>
                    </div>

                    {/* Step 1: Root Cause */}
                    <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900/90 border border-purple-100 dark:border-purple-900/50 text-xs space-y-1">
                      <div className="flex items-center space-x-1.5 font-black text-rose-600 dark:text-rose-400">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        <span>1. Xatoning Ildiz Sababi:</span>
                      </div>
                      <p className="text-slate-700 dark:text-slate-300 leading-relaxed pl-5">
                        {aiBreakdown.rootCause}
                      </p>
                    </div>

                    {/* Step 2: Step-by-Step Solution */}
                    <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900/90 border border-purple-100 dark:border-purple-900/50 text-xs space-y-2">
                      <div className="flex items-center space-x-1.5 font-black text-indigo-600 dark:text-indigo-400">
                        <Layers className="w-3.5 h-3.5" />
                        <span>2. Qanday Ishlanishi Kerak? (Bosqichma-bosqich yechim):</span>
                      </div>
                      <div className="space-y-1.5 pl-5">
                        {aiBreakdown.howToSolve.map((step, sIdx) => (
                          <div key={sIdx} className="flex items-start space-x-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
                            <p className="text-slate-800 dark:text-slate-200 font-medium leading-relaxed">
                              {step}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Step 3: Core Rule or Formula */}
                    <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900/90 border border-purple-100 dark:border-purple-900/50 text-xs space-y-1">
                      <div className="flex items-center space-x-1.5 font-black text-amber-600 dark:text-amber-400">
                        <Lightbulb className="w-3.5 h-3.5" />
                        <span>3. Asosiy Qoida / Formula:</span>
                      </div>
                      <p className="text-slate-700 dark:text-slate-300 leading-relaxed pl-5 font-mono text-[11px] bg-amber-50/50 dark:bg-amber-950/30 p-2 rounded-xl">
                        {aiBreakdown.ruleOrFormula}
                      </p>
                    </div>

                    {/* Step 4: Correct Answer Insight */}
                    <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900/90 border border-purple-100 dark:border-purple-900/50 text-xs space-y-1">
                      <div className="flex items-center space-x-1.5 font-black text-emerald-600 dark:text-emerald-400">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>4. To'g'ri Javob Asosi:</span>
                      </div>
                      <p className="text-slate-700 dark:text-slate-300 leading-relaxed pl-5">
                        {aiBreakdown.correctAnswerInsight}
                      </p>
                    </div>

                    {/* Step 5: Recommended Practice Tip */}
                    <div className="text-[11px] text-purple-700 dark:text-purple-300 flex items-center space-x-1.5 font-bold pl-2">
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Maslahat: {aiBreakdown.recommendedPracticeTip}</span>
                    </div>
                  </div>
                )}

                {/* Default compact explanation if AI breakdown is not expanded */}
                {!isAiExpanded && (
                  <div className="p-3 rounded-2xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/50 text-xs flex items-center justify-between">
                    <div>
                      <span className="font-black text-blue-900 dark:text-blue-300 mr-1.5">
                        Qisqa Yechim:
                      </span>
                      <span className="text-slate-700 dark:text-slate-300">
                        {m.question.explanation}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => toggleAiBreakdown(m.id)}
                      className="text-xs font-black text-purple-600 dark:text-purple-400 hover:underline shrink-0 ml-3"
                    >
                      Batafsil AI tahlil →
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
