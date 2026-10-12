import React, { useState } from 'react';
import { 
  Calendar, 
  CheckCircle2, 
  Circle, 
  Clock, 
  Target, 
  Sparkles, 
  TrendingUp, 
  Award, 
  RefreshCw, 
  ChevronRight,
  BookOpen
} from 'lucide-react';
import { StudyPlan, UserProfile } from '../types';
import { fetchAiStudyAdvice } from '../services/aiService';

interface StudyPlanViewProps {
  studyPlan: StudyPlan;
  userProfile: UserProfile;
  onToggleTask: (taskId: string) => void;
  onStartTest: (testId: string) => void;
  onOpenProfileModal: () => void;
  onUpdateAiAdvice: (newAdvice: string) => void;
}

export const StudyPlanView: React.FC<StudyPlanViewProps> = ({
  studyPlan,
  userProfile,
  onToggleTask,
  onStartTest,
  onOpenProfileModal,
  onUpdateAiAdvice,
}) => {
  const [isRefreshingAi, setIsRefreshingAi] = useState(false);

  const completedCount = studyPlan.items.filter((item) => item.completed).length;
  const progressPct = Math.round((completedCount / (studyPlan.items.length || 1)) * 100);

  const handleRefreshAiAdvice = async () => {
    setIsRefreshingAi(true);
    try {
      const advice = await fetchAiStudyAdvice({
        targetExam: userProfile.targetExam,
        targetScore: userProfile.targetScore,
        remainingDays: studyPlan.remainingDays,
        dailyHours: userProfile.dailyHours,
        currentLevel: userProfile.currentLevel,
      });
      onUpdateAiAdvice(advice);
    } finally {
      setIsRefreshingAi(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Overview Hero Bar */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-100">
                Individual Reja
              </span>
              <span className="text-xs text-slate-600 font-medium">
                {userProfile.fullName} uchun moslashtirilgan
              </span>
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-1.5">
              {userProfile.targetExam.toUpperCase()} — {userProfile.targetScore} O'quv Rejasi
            </h1>
            <p className="text-xs text-slate-600 mt-1 max-w-2xl">
              Imtihoningizgacha qolgan vaqt va kunlik {userProfile.dailyHours} soatlik tayyorgarlik sur'atingizga asoslangan bosqichma-bosqich yo'l xaritasi.
            </p>
          </div>

          <div className="flex items-center space-x-3 shrink-0">
            <button
              onClick={onOpenProfileModal}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold border border-slate-200 hover:bg-slate-50 text-slate-700 transition-colors"
              id="edit-study-goals-btn"
            >
              Maqsadlarni o'zgartirish
            </button>
            <button
              onClick={() => onStartTest(userProfile.targetExam === 'ielts' ? 'ielts_mock_01' : userProfile.targetExam === 'sat' ? 'sat_mock_01' : userProfile.targetExam === 'milliy' ? 'milliy_mock_01' : 'cefr_mock_01')}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-900 hover:bg-indigo-600 text-white transition-colors shadow-xs flex items-center space-x-1.5"
              id="start-plan-test-btn"
            >
              <span>Mock Testga o'tish</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Key Metrics row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-slate-100">
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
            <div className="flex items-center justify-between text-slate-600 mb-1">
              <span className="text-[11px] font-semibold">Qolgan vaqt</span>
              <Clock className="w-3.5 h-3.5 text-indigo-600" />
            </div>
            <p className="text-xl font-bold font-mono text-slate-900">{studyPlan.remainingDays} kun</p>
            <span className="text-[10px] text-slate-600">{userProfile.examDate} sanasigacha</span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
            <div className="flex items-center justify-between text-slate-600 mb-1">
              <span className="text-[11px] font-semibold">Kunlik yuklama</span>
              <Clock className="w-3.5 h-3.5 text-emerald-600" />
            </div>
            <p className="text-xl font-bold font-mono text-slate-900">{userProfile.dailyHours} soat</p>
            <span className="text-[10px] text-slate-600">~{Math.round(userProfile.dailyHours * 60)} daqiqa / kun</span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
            <div className="flex items-center justify-between text-slate-600 mb-1">
              <span className="text-[11px] font-semibold">Bajarilgan darslar</span>
              <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" />
            </div>
            <p className="text-xl font-bold font-mono text-slate-900">{completedCount} / {studyPlan.items.length}</p>
            <span className="text-[10px] text-slate-600">{progressPct}% o'zlashtirildi</span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
            <div className="flex items-center justify-between text-slate-600 mb-1">
              <span className="text-[11px] font-semibold">Maqsad</span>
              <Target className="w-3.5 h-3.5 text-amber-600" />
            </div>
            <p className="text-xl font-bold font-mono text-slate-900">{userProfile.targetScore}</p>
            <span className="text-[10px] text-slate-600">{userProfile.currentLevel} asosida</span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-5">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-600 mb-1.5">
            <span>Umumiy reja bajarilishi</span>
            <span className="font-mono text-slate-900">{progressPct}%</span>
          </div>
          <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
            <div
              className="h-full bg-slate-900 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progressPct}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* AI Strateg Maslahati Banner */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-sm relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
                <Sparkles className="w-3.5 h-3.5" />
              </div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-300">
                AI Strateg & Imtihon Metodikasi
              </h2>
            </div>
            <button
              onClick={handleRefreshAiAdvice}
              disabled={isRefreshingAi}
              className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/15 text-[11px] font-medium text-slate-200 transition-colors flex items-center space-x-1"
              id="refresh-ai-plan-advice"
            >
              <RefreshCw className={`w-3 h-3 ${isRefreshingAi ? 'animate-spin' : ''}`} />
              <span>{isRefreshingAi ? 'Yangilanmoqda...' : 'Tahlilni yangilash'}</span>
            </button>
          </div>

          <p className="text-xs sm:text-sm text-slate-200 mt-3 leading-relaxed">
            {studyPlan.aiAdvice}
          </p>
        </div>
      </div>

      {/* 3 Preparation Phases */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {studyPlan.phases.map((ph, idx) => (
          <div key={idx} className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                {ph.weeks}
              </span>
              <span className="font-mono text-xs font-semibold text-slate-600">0{idx + 1}</span>
            </div>
            <h3 className="text-sm font-bold text-slate-900 tracking-tight">{ph.title}</h3>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">{ph.description}</p>
            <ul className="mt-3 space-y-1 text-xs text-slate-700">
              {ph.focusAreas.map((area, aIdx) => (
                <li key={aIdx} className="flex items-center space-x-1.5">
                  <span className="w-1 h-1 rounded-full bg-slate-400"></span>
                  <span>{area}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Daily Tasks Interactive Roadmap */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base font-bold text-slate-900 tracking-tight">Kundalik Dars Jadvali & Mashqlar</h2>
            <p className="text-xs text-slate-600 mt-0.5">
              Har bir darsni bajarganingizdan so'ng belgilanadi va umumiy taraqqiyotingizga qo'shiladi.
            </p>
          </div>
          <span className="text-xs font-medium text-slate-600 font-mono">
            {completedCount} / {studyPlan.items.length} dars tayyor
          </span>
        </div>

        <div className="space-y-3">
          {studyPlan.items.map((item) => (
            <div
              key={item.id}
              onClick={() => onToggleTask(item.id)}
              className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start justify-between gap-4 ${
                item.completed
                  ? 'bg-slate-50/70 border-slate-200 text-slate-600'
                  : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-xs text-slate-900'
              }`}
              id={`task-${item.id}`}
            >
              <div className="flex items-start space-x-3.5">
                <button
                  type="button"
                  className={`mt-0.5 transition-colors focus:outline-none ${
                    item.completed ? 'text-indigo-600' : 'text-slate-300 hover:text-slate-400'
                  }`}
                >
                  {item.completed ? (
                    <CheckCircle2 className="w-5 h-5 fill-indigo-50" />
                  ) : (
                    <Circle className="w-5 h-5" />
                  )}
                </button>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                      Kun {item.day} • {item.dateStr}
                    </span>
                    <span className="text-[11px] font-semibold text-indigo-600">
                      {item.category}
                    </span>
                    {item.milestone && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800 border border-amber-200/60">
                        {item.milestone}
                      </span>
                    )}
                  </div>
                  <h3 className={`text-sm font-bold mt-1 tracking-tight ${item.completed ? 'line-through text-slate-600' : 'text-slate-900'}`}>
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              <div className="text-right shrink-0">
                <span className="text-xs font-mono text-slate-600 flex items-center space-x-1">
                  <Clock className="w-3 h-3 text-slate-600" />
                  <span>{item.estimatedMinutes} daq</span>
                </span>
                {item.category === 'Mock Test' && !item.completed && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onStartTest(userProfile.targetExam === 'ielts' ? 'ielts_mock_01' : userProfile.targetExam === 'sat' ? 'sat_mock_01' : userProfile.targetExam === 'milliy' ? 'milliy_mock_01' : 'cefr_mock_01');
                    }}
                    className="mt-2 text-[11px] font-semibold text-indigo-600 hover:text-indigo-800 underline block"
                  >
                    Testni yechish
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
