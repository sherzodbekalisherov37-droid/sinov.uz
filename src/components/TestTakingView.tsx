import React, { useState, useEffect, useRef } from 'react';
import { 
  Clock, 
  Flag, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  X, 
  HelpCircle,
  Layers,
  Pause,
  Play,
  RotateCcw,
  Wifi,
  WifiOff,
  Maximize2
} from 'lucide-react';
import { MockTest, Question } from '../types';
import { AudioListeningPlayer } from './AudioListeningPlayer';
import { SpeakingAudioRecorder } from './SpeakingAudioRecorder';
import { WritingEssayEditor } from './WritingEssayEditor';

interface TestTakingViewProps {
  test: MockTest;
  onFinishTest: (answers: Record<string, any>, timeSpentSeconds: number) => void;
  onExitTest: () => void;
  onAskAiWithContext: (question: Question, selectedAnswer?: any) => void;
}

export const TestTakingView: React.FC<TestTakingViewProps> = ({
  test,
  onFinishTest,
  onExitTest,
  onAskAiWithContext,
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  
  // Local storage key for auto-saving current attempt
  const storageKey = `sinov_attempt_${test.id}`;

  const [answers, setAnswers] = useState<Record<string, any>>(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.answers) return parsed.answers;
      }
    } catch {}
    return {};
  });

  const [flaggedQuestions, setFlaggedQuestions] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.flagged) return parsed.flagged;
      }
    } catch {}
    return {};
  });

  const [secondsRemaining, setSecondsRemaining] = useState(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (typeof parsed.secondsRemaining === 'number' && parsed.secondsRemaining > 0) {
          return parsed.secondsRemaining;
        }
      }
    } catch {}
    return test.durationMinutes * 60;
  });

  const [isPaused, setIsPaused] = useState(false);
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const [showQuestionsDrawer, setShowQuestionsDrawer] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [autoSaveStatus, setAutoSaveStatus] = useState<'saved' | 'saving'>('saved');

  const initialSecondsRef = useRef(test.durationMinutes * 60);

  // Network offline listener
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Countdown timer
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setSecondsRemaining((prev: number) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitTest();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isPaused]);

  // Auto-save attempt to localStorage
  useEffect(() => {
    setAutoSaveStatus('saving');
    try {
      localStorage.setItem(
        storageKey,
        JSON.stringify({
          testId: test.id,
          answers,
          flagged: flaggedQuestions,
          secondsRemaining,
          updatedAt: new Date().toISOString(),
        })
      );
      setTimeout(() => setAutoSaveStatus('saved'), 300);
    } catch (e) {
      console.warn('Auto-save error', e);
    }
  }, [answers, flaggedQuestions, secondsRemaining, test.id]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const currentQuestion = test.questions[currentQuestionIndex] || test.questions[0];
  const totalQuestions = test.questions.length;

  // Handlers for different question types
  const handleSelectOption = (index: number) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: index,
    }));
  };

  const handleToggleMultiSelect = (index: number) => {
    const current = (answers[currentQuestion.id] as number[]) || [];
    const updated = current.includes(index)
      ? current.filter((i) => i !== index)
      : [...current, index];
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: updated,
    }));
  };

  const handleTextAnswerChange = (val: string) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: val,
    }));
  };

  const handleMatchingAnswer = (pairId: string, selectedRight: string) => {
    const currentMatch = (answers[currentQuestion.id] as Record<string, string>) || {};
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: {
        ...currentMatch,
        [pairId]: selectedRight,
      },
    }));
  };

  const handleClearAnswer = () => {
    setAnswers((prev) => {
      const copy = { ...prev };
      delete copy[currentQuestion.id];
      return copy;
    });
  };

  const handleToggleFlag = (qId: string) => {
    setFlaggedQuestions((prev) => ({
      ...prev,
      [qId]: !prev[qId],
    }));
  };

  const handleSubmitTest = () => {
    try {
      localStorage.removeItem(storageKey);
    } catch {}
    const timeSpent = initialSecondsRef.current - secondsRemaining;
    onFinishTest(answers, Math.max(1, timeSpent));
  };

  const answeredCount = Object.keys(answers).length;
  const unansweredCount = totalQuestions - answeredCount;
  const flaggedCount = Object.values(flaggedQuestions).filter(Boolean).length;
  const isLowTime = secondsRemaining <= 300; // less than 5 mins

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 flex flex-col -mt-8 -mx-4 sm:-mx-6 lg:-mx-8 font-sans">
      {/* Network Alert if offline */}
      {!isOnline && (
        <div className="bg-amber-600 text-white px-4 py-2 text-xs font-bold text-center flex items-center justify-center space-x-2">
          <WifiOff className="w-4 h-4" />
          <span>Internet aloqasi uzildi. Xavotir olmang, javoblaringiz brauzerda xavfsiz saqlanmoqda.</span>
        </div>
      )}

      {/* Top Test Navigation Bar */}
      <header className="sticky top-0 z-30 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 sm:px-8 py-3 flex items-center justify-between shadow-xs">
        <div className="flex items-center space-x-3">
          <button
            type="button"
            onClick={() => setShowExitConfirm(true)}
            className="px-3.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-rose-50 hover:border-rose-300 hover:text-rose-600 dark:hover:bg-rose-950/40 dark:hover:text-rose-400 text-xs font-bold transition-colors cursor-pointer flex items-center space-x-1.5 shadow-2xs"
            title="Testdan chiqish"
          >
            <X className="w-3.5 h-3.5 text-rose-500" />
            <span>Chiqish</span>
          </button>

          <div className="hidden sm:block">
            <h1 className="text-sm font-bold text-slate-900 dark:text-white truncate max-w-xs md:max-w-md">
              {test.title}
            </h1>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">
              {test.subject || test.examType.toUpperCase()} · Savol {currentQuestionIndex + 1} / {totalQuestions}
            </span>
          </div>
        </div>

        {/* Center: Timer & Status */}
        <div className="flex items-center space-x-3">
          <div
            className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-xl font-mono text-xs font-bold border transition-colors ${
              isLowTime
                ? 'bg-rose-50 dark:bg-rose-950/50 text-rose-700 dark:text-rose-400 border-rose-200 dark:border-rose-800 animate-pulse'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700'
            }`}
          >
            <Clock className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>{formatTime(secondsRemaining)}</span>
          </div>

          <button
            onClick={() => setIsPaused(!isPaused)}
            className="p-2 rounded-xl text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            title={isPaused ? "Davom ettirish" : "Vaqtni to'xtatish"}
          >
            {isPaused ? <Play className="w-4 h-4 text-emerald-600 fill-current" /> : <Pause className="w-4 h-4" />}
          </button>
        </div>

        {/* Right: Navigator toggle & Submit button */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowQuestionsDrawer(!showQuestionsDrawer)}
            className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold flex items-center space-x-1.5 cursor-pointer"
          >
            <Layers className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Palitra</span>
            <span className="text-[11px] text-blue-600 dark:text-blue-400 font-bold">
              ({answeredCount}/{totalQuestions})
            </span>
          </button>

          <button
            onClick={() => setShowSubmitConfirm(true)}
            className="px-4 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
          >
            Yakunlash
          </button>
        </div>
      </header>

      {/* Main Examination Layout */}
      <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 flex flex-col lg:flex-row gap-6">
        {/* Left/Main Column: Question Content */}
        <div className="flex-1 space-y-6">
          {/* Question Card */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs relative">
            {/* Question Header Bar */}
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100 dark:border-slate-800 text-xs">
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                  Savol {currentQuestionIndex + 1}
                </span>
                <span className="text-slate-300 dark:text-slate-700">·</span>
                <span className="text-slate-500 dark:text-slate-400 font-medium">
                  {currentQuestion.section || currentQuestion.subject || 'Asosiy'}
                </span>
                {currentQuestion.skillTag && (
                  <>
                    <span className="text-slate-300 dark:text-slate-700">·</span>
                    <span className="text-slate-600 dark:text-slate-400">{currentQuestion.skillTag}</span>
                  </>
                )}
              </div>

              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={() => handleToggleFlag(currentQuestion.id)}
                  className={`p-2 rounded-xl transition-colors cursor-pointer flex items-center space-x-1 text-xs font-bold ${
                    flaggedQuestions[currentQuestion.id]
                      ? 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-400'
                      : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                  title="Savolni keyin qayta tekshirish uchun belgilash"
                >
                  <Flag className={`w-3.5 h-3.5 ${flaggedQuestions[currentQuestion.id] ? 'fill-current' : ''}`} />
                  <span className="hidden sm:inline">
                    {flaggedQuestions[currentQuestion.id] ? 'Belgilangan' : 'Bayroqcha'}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => onAskAiWithContext(currentQuestion, answers[currentQuestion.id])}
                  className="p-2 rounded-xl text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 text-xs font-bold inline-flex items-center space-x-1 cursor-pointer"
                  title="Ushbu savol bo'yicha AI yordamchisidan maslahat olish"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span className="hidden sm:inline">AI Ko'mak</span>
                </button>
              </div>
            </div>

            {/* Audio Listening player if listening question */}
            {currentQuestion.questionType === 'listening' && (
              <AudioListeningPlayer
                audioUrl={currentQuestion.audioSimulationUrl}
                sectionTitle={`Audio Yozuv: ${currentQuestion.section || 'Listening Track'}`}
              />
            )}

            {/* Reading Passage if present */}
            {currentQuestion.passage && currentQuestion.questionType !== 'writing_task' && (
              <div className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-4 sm:p-5 border border-slate-200 dark:border-slate-700 mb-6 text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-serif max-h-72 overflow-y-auto whitespace-pre-line">
                {currentQuestion.passage}
              </div>
            )}

            {/* Question Text */}
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-6 leading-relaxed">
              {currentQuestion.text}
            </h3>

            {/* Math Formula if present */}
            {currentQuestion.formula && (
              <div className="bg-blue-50/50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 rounded-xl p-3 mb-6 font-mono text-sm text-blue-900 dark:text-blue-200 text-center">
                {currentQuestion.formula}
              </div>
            )}

            {/* QUESTION INTERACTIVE INPUT AREA */}
            <div className="mt-6">
              {/* 1. Multiple Choice / True-False / Listening */}
              {(currentQuestion.questionType === 'multiple_choice' ||
                currentQuestion.questionType === 'true_false' ||
                currentQuestion.questionType === 'listening' ||
                currentQuestion.questionType === 'reading_passage' ||
                (!currentQuestion.questionType && currentQuestion.options)) && (
                <div className="space-y-3">
                  {currentQuestion.options?.map((option, idx) => {
                    const isSelected = answers[currentQuestion.id] === idx;
                    const letter = String.fromCharCode(65 + idx);
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleSelectOption(idx)}
                        className={`w-full p-4 rounded-2xl border text-left flex items-start space-x-3 transition-all cursor-pointer ${
                          isSelected
                            ? 'border-blue-600 bg-blue-50/80 dark:bg-blue-950/40 text-blue-900 dark:text-blue-100 shadow-xs ring-2 ring-blue-500/20'
                            : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200'
                        }`}
                      >
                        <span
                          className={`w-7 h-7 rounded-xl font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 ${
                            isSelected
                              ? 'bg-blue-600 text-white shadow-xs'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                          }`}
                        >
                          {letter}
                        </span>
                        <span className="text-sm font-medium leading-relaxed pt-0.5">
                          {option}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* 2. Multiple Select (Checkboxes) */}
              {currentQuestion.questionType === 'multiple_select' && (
                <div className="space-y-3">
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">
                    Bir nechta to'g'ri javobni tanlashingiz mumkin:
                  </p>
                  {currentQuestion.options?.map((option, idx) => {
                    const selectedList = (answers[currentQuestion.id] as number[]) || [];
                    const isSelected = selectedList.includes(idx);
                    const letter = String.fromCharCode(65 + idx);
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleToggleMultiSelect(idx)}
                        className={`w-full p-4 rounded-2xl border text-left flex items-start space-x-3 transition-all cursor-pointer ${
                          isSelected
                            ? 'border-blue-600 bg-blue-50/80 dark:bg-blue-950/40 text-blue-900 dark:text-blue-100 shadow-xs'
                            : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200'
                        }`}
                      >
                        <div
                          className={`w-6 h-6 rounded-lg border flex items-center justify-center shrink-0 mt-0.5 ${
                            isSelected
                              ? 'bg-blue-600 border-blue-600 text-white'
                              : 'border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-transparent'
                          }`}
                        >
                          <CheckCircle2 className="w-4 h-4" />
                        </div>
                        <span className="text-sm font-medium leading-relaxed pt-0.5">
                          <span className="font-bold mr-1.5">{letter})</span>
                          {option}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* 3. Short Answer / Numeric Input */}
              {(currentQuestion.questionType === 'short_answer' || currentQuestion.questionType === 'numeric') && (
                <div className="space-y-3 max-w-md">
                  <label className="block text-xs font-bold text-slate-600 dark:text-slate-400">
                    Javobingizni quyidagi maydonga kiriting:
                  </label>
                  <input
                    type={currentQuestion.questionType === 'numeric' ? 'text' : 'text'}
                    value={answers[currentQuestion.id] || ''}
                    onChange={(e) => handleTextAnswerChange(e.target.value)}
                    placeholder={currentQuestion.questionType === 'numeric' ? "Masalan: 4.8 yoki 23" : "Javob matnini yozing..."}
                    className="w-full p-3.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-mono text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              )}

              {/* 4. Matching Question */}
              {currentQuestion.questionType === 'matching' && currentQuestion.matchingPairs && (
                <div className="space-y-3">
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">
                    Har bir tushuncha uchun mos ta'rifni tanlang:
                  </p>
                  <div className="grid grid-cols-1 gap-3">
                    {currentQuestion.matchingPairs.map((pair) => {
                      const userSelected = (answers[currentQuestion.id] as Record<string, string>)?.[pair.id] || '';
                      return (
                        <div key={pair.id} className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                            {pair.left}
                          </span>
                          <select
                            value={userSelected}
                            onChange={(e) => handleMatchingAnswer(pair.id, e.target.value)}
                            className="p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-800 dark:text-slate-200 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="">-- Mosini tanlang --</option>
                            {currentQuestion.matchingPairs?.map((opt) => (
                              <option key={opt.id} value={opt.right}>
                                {opt.right}
                              </option>
                            ))}
                          </select>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* 5. Writing Essay Task */}
              {currentQuestion.questionType === 'writing_task' && (
                <WritingEssayEditor
                  questionId={currentQuestion.id}
                  taskPrompt={currentQuestion.text}
                  value={answers[currentQuestion.id] || ''}
                  onChange={handleTextAnswerChange}
                  minWordCount={250}
                />
              )}

              {/* 6. Speaking Task */}
              {currentQuestion.questionType === 'speaking_task' && (
                <SpeakingAudioRecorder
                  questionId={currentQuestion.id}
                  onAudioRecorded={(url) => handleTextAnswerChange(url)}
                />
              )}
            </div>

            {/* Clear Answer Button */}
            {answers[currentQuestion.id] !== undefined && (
              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
                <button
                  type="button"
                  onClick={handleClearAnswer}
                  className="text-xs text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 inline-flex items-center space-x-1 cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Javobni bekor qilish</span>
                </button>
              </div>
            )}
          </div>

          {/* Bottom Question Navigation Actions */}
          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              disabled={currentQuestionIndex === 0}
              onClick={() => setCurrentQuestionIndex((prev) => Math.max(0, prev - 1))}
              className={`px-5 py-2.5 rounded-xl border text-xs font-bold inline-flex items-center space-x-2 transition-all cursor-pointer ${
                currentQuestionIndex === 0
                  ? 'opacity-40 cursor-not-allowed border-slate-200 dark:border-slate-800 text-slate-400'
                  : 'border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:bg-slate-50'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Oldingi Savol</span>
            </button>

            <div className="text-xs font-bold text-slate-500 dark:text-slate-400">
              {currentQuestionIndex + 1} / {totalQuestions}
            </div>

            {currentQuestionIndex < totalQuestions - 1 ? (
              <button
                type="button"
                onClick={() => setCurrentQuestionIndex((prev) => Math.min(totalQuestions - 1, prev + 1))}
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold inline-flex items-center space-x-2 transition-all shadow-xs cursor-pointer"
              >
                <span>Keyingi Savol</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setShowSubmitConfirm(true)}
                className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold inline-flex items-center space-x-2 transition-all shadow-sm cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Testni Yakunlash</span>
              </button>
            )}
          </div>
        </div>

        {/* Right Column: Question Palette Drawer / Sidebar */}
        <aside
          className={`lg:w-80 shrink-0 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs h-fit ${
            showQuestionsDrawer ? 'block' : 'hidden lg:block'
          }`}
        >
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100 dark:border-slate-800">
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Savollar Xaritasi
            </h4>
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400">
              {answeredCount}/{totalQuestions} yechildi
            </span>
          </div>

          {/* Palette Legend */}
          <div className="grid grid-cols-3 gap-2 text-[11px] text-slate-600 dark:text-slate-400 mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center space-x-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
              <span>Yechilgan</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
              <span>Bayroqcha</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-700"></span>
              <span>Qolgan</span>
            </div>
          </div>

          {/* Palette Grid */}
          <div className="grid grid-cols-5 gap-2">
            {test.questions.map((q, idx) => {
              const isCurrent = idx === currentQuestionIndex;
              const isAnswered = answers[q.id] !== undefined;
              const isFlagged = flaggedQuestions[q.id];

              let bgStyle = 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200';
              if (isAnswered) {
                bgStyle = 'bg-blue-600 text-white font-bold';
              }
              if (isFlagged) {
                bgStyle = 'bg-amber-500 text-white font-bold';
              }

              return (
                <button
                  key={q.id}
                  type="button"
                  onClick={() => {
                    setCurrentQuestionIndex(idx);
                    setShowQuestionsDrawer(false);
                  }}
                  className={`h-9 rounded-xl text-xs font-mono transition-all relative flex items-center justify-center cursor-pointer ${bgStyle} ${
                    isCurrent ? 'ring-2 ring-blue-500 ring-offset-2 dark:ring-offset-slate-900 font-extrabold scale-105' : ''
                  }`}
                >
                  {idx + 1}
                  {isFlagged && (
                    <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-white"></span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Quick Stats in Drawer */}
          <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2 text-xs text-slate-500 dark:text-slate-400">
            <div className="flex justify-between">
              <span>Belgilangan:</span>
              <span className="font-bold text-slate-800 dark:text-slate-200">{answeredCount} ta</span>
            </div>
            <div className="flex justify-between">
              <span>Belgilanmagan:</span>
              <span className="font-bold text-slate-800 dark:text-slate-200">{unansweredCount} ta</span>
            </div>
            <div className="flex justify-between">
              <span>Bayroqchalar:</span>
              <span className="font-bold text-amber-600">{flaggedCount} ta</span>
            </div>
          </div>

          {/* Exit test button in drawer */}
          <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={() => {
                setShowQuestionsDrawer(false);
                setShowExitConfirm(true);
              }}
              className="w-full py-2.5 px-3 rounded-xl border border-rose-200 dark:border-rose-900/60 bg-rose-50/60 dark:bg-rose-950/20 text-rose-700 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-900/40 text-xs font-bold flex items-center justify-center space-x-1.5 cursor-pointer transition-colors"
            >
              <X className="w-4 h-4 text-rose-500" />
              <span>Testdan chiqish</span>
            </button>
          </div>
        </aside>
      </div>

      {/* Exit Confirmation Modal */}
      {showExitConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-7 max-w-md w-full shadow-2xl space-y-5">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-rose-100 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 flex items-center justify-center mx-auto">
                <AlertCircle className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white">
                Testdan chiqmoqchimisiz?
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Hozir testdan chiqsangiz, test jarayoni to'xtatiladi va kiritilgan javoblaringiz saqlanmaydi. Testlar katalogiga qaytishni tasdiqlaysizmi?
              </p>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-4 border border-slate-100 dark:border-slate-800 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-600 dark:text-slate-400">Jami savollar:</span>
                <span className="font-bold text-slate-900 dark:text-white">{totalQuestions} ta</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600 dark:text-slate-400">Javob berilgan savollar:</span>
                <span className="font-bold text-blue-600 dark:text-blue-400">{answeredCount} ta</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600 dark:text-slate-400">Qolgan vaqt:</span>
                <span className="font-bold font-mono text-slate-800 dark:text-slate-200">{formatTime(secondsRemaining)}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setShowExitConfirm(false)}
                className="flex-1 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer transition-colors"
              >
                Bekor qilish (Davom etish)
              </button>
              <button
                type="button"
                onClick={() => {
                  try {
                    localStorage.removeItem(storageKey);
                  } catch {}
                  setShowExitConfirm(false);
                  onExitTest();
                }}
                className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-black shadow-xs cursor-pointer transition-colors"
              >
                Ha, testdan chiqish
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Submit Confirmation Modal */}
      {showSubmitConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-5">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white">
                Testni yakunlaysizmi?
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Natijangiz hisoblanadi va diagnostik baholash hisoboti tuziladi.
              </p>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-4 border border-slate-100 dark:border-slate-800 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-600 dark:text-slate-400">Jami savollar:</span>
                <span className="font-bold text-slate-900 dark:text-white">{totalQuestions} ta</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600 dark:text-slate-400">Belgilangan javoblar:</span>
                <span className="font-bold text-emerald-600">{answeredCount} ta</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600 dark:text-slate-400">Belgilanmagan (bo'sh):</span>
                <span className="font-bold text-rose-600">{unansweredCount} ta</span>
              </div>
              {flaggedCount > 0 && (
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Qayta ko'rish belgilangan:</span>
                  <span className="font-bold text-amber-600">{flaggedCount} ta</span>
                </div>
              )}
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setShowSubmitConfirm(false)}
                className="flex-1 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
              >
                Savollarga qaytish
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowSubmitConfirm(false);
                  handleSubmitTest();
                }}
                className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-black shadow-md cursor-pointer"
              >
                Ha, yakunlash
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
