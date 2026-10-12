import React, { useState } from 'react';
import { X, Calendar, Clock, Target, Award, User, Check } from 'lucide-react';
import { ExamType, UserProfile } from '../types';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  userProfile: UserProfile;
  onSaveProfile: (updated: UserProfile) => void;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({
  isOpen,
  onClose,
  userProfile,
  onSaveProfile,
}) => {
  const [fullName, setFullName] = useState(userProfile.fullName);
  const [email, setEmail] = useState(userProfile.email);
  const [targetExam, setTargetExam] = useState<ExamType>(userProfile.targetExam);
  const [targetScore, setTargetScore] = useState(userProfile.targetScore);
  const [currentLevel, setCurrentLevel] = useState(userProfile.currentLevel);
  const [examDate, setExamDate] = useState(userProfile.examDate);
  const [dailyHours, setDailyHours] = useState(userProfile.dailyHours);

  if (!isOpen) return null;

  // Calculate live days left
  const targetTime = new Date(examDate).getTime();
  const now = new Date().getTime();
  const diffDays = Math.max(0, Math.ceil((targetTime - now) / (1000 * 60 * 60 * 24)));

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveProfile({
      ...userProfile,
      fullName: fullName.trim() || 'Foydalanuvchi',
      email: email.trim() || 'user@sinov.uz',
      targetExam,
      targetScore,
      currentLevel,
      examDate,
      dailyHours: Number(dailyHours),
    });
    onClose();
  };

  const examOptions: { id: ExamType; label: string; defaultScores: string[] }[] = [
    { id: 'ielts', label: 'IELTS Academic / General', defaultScores: ['6.5 Band', '7.0 Band', '7.5 Band', '8.0+ Band'] },
    { id: 'sat', label: 'Digital SAT', defaultScores: ['1350+', '1420+', '1500+', '1550+'] },
    { id: 'milliy', label: 'Milliy Sertifikat', defaultScores: ['B+ (60-69%)', 'A (70-85%)', 'A+ (86-100%)'] },
    { id: 'cefr', label: 'CEFR Multi-Level', defaultScores: ['B1', 'B2', 'C1'] },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 backdrop-blur-xs p-4 overflow-y-auto">
      <div 
        className="bg-white rounded-2xl border border-slate-200/80 shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        id="onboarding-modal-card"
      >
        {/* Header */}
        <div className="px-6 pt-6 pb-4 border-b border-slate-100 flex items-start justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">O'quvchi Profili & Maqsadlar</h2>
            <p className="text-xs text-slate-600 mt-1">
              Imtihon sanasi va kunlik vaqtingiz asosida individual o'quv rejangiz tuziladi.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-600 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            id="close-profile-modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSave} className="p-6 space-y-5">
          {/* Full Name & Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Ism va Familiyangiz</label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Masalan: Sherzodbek Alisherov"
                  className="w-full text-xs font-medium px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-500 focus:bg-white transition-all"
                  id="profile-name-input"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Email manzili</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@mail.com"
                className="w-full text-xs font-medium px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-500 focus:bg-white transition-all"
                id="profile-email-input"
              />
            </div>
          </div>

          {/* Exam Selection */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Tayyorgarlik ko'rayotgan asosiy imtihoningiz</label>
            <div className="grid grid-cols-2 gap-2">
              {examOptions.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => {
                    setTargetExam(opt.id);
                    setTargetScore(opt.defaultScores[1] || opt.defaultScores[0]);
                  }}
                  className={`p-2.5 rounded-xl text-left border transition-all text-xs font-semibold flex items-center justify-between ${
                    targetExam === opt.id
                      ? 'border-indigo-600 bg-indigo-50/50 text-indigo-950'
                      : 'border-slate-200 hover:border-slate-300 text-slate-700'
                  }`}
                >
                  <span>{opt.label}</span>
                  {targetExam === opt.id && <Check className="w-3.5 h-3.5 text-indigo-600" />}
                </button>
              ))}
            </div>
          </div>

          {/* Target Score & Current Level */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Maqsadli natija / Ball</label>
              <input
                type="text"
                value={targetScore}
                onChange={(e) => setTargetScore(e.target.value)}
                placeholder="Masalan: 7.5 Band yoki 1450+"
                className="w-full text-xs font-medium px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-500 focus:bg-white transition-all"
                id="profile-target-score"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Joriy darajangiz</label>
              <select
                value={currentLevel}
                onChange={(e) => setCurrentLevel(e.target.value)}
                className="w-full text-xs font-medium px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-500 focus:bg-white transition-all"
                id="profile-current-level"
              >
                <option value="Boshlang'ich (A2 / 4.5 Band / 1000 SAT)">Boshlang'ich daraja</option>
                <option value="O'rta (B1 / 5.5 Band / 1150 SAT)">O'rta daraja</option>
                <option value="Kuchli o'rta (B2 / 6.5 Band / 1300 SAT)">Kuchli o'rta (B2 / 6.5)</option>
                <option value="Ilg'or (C1 / 7.5+ Band / 1450+ SAT)">Ilg'or (C1 / 7.5+)</option>
              </select>
            </div>
          </div>

          {/* Exam Date & Remaining Days Live Box */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Kutilayotgan imtihon sanasi
              </label>
              <div className="relative">
                <input
                  type="date"
                  required
                  value={examDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setExamDate(e.target.value)}
                  className="w-full text-xs font-medium px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-500 focus:bg-white transition-all font-mono"
                  id="profile-exam-date"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Kuniga dars qilishga ajratasiz
              </label>
              <div className="flex items-center space-x-1.5">
                {[1, 2, 2.5, 3, 4].map((hrs) => (
                  <button
                    key={hrs}
                    type="button"
                    onClick={() => setDailyHours(hrs)}
                    className={`flex-1 py-2 text-xs font-semibold rounded-lg border transition-all ${
                      dailyHours === hrs
                        ? 'bg-slate-900 text-white border-slate-900'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {hrs} s
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Calculation summary badge */}
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
            <div className="flex items-center space-x-2 text-slate-700">
              <Calendar className="w-4 h-4 text-indigo-600 shrink-0" />
              <span>Imtihongacha qolgan vaqt:</span>
            </div>
            <div className="text-right">
              <span className="font-bold font-mono text-indigo-700 text-sm">{diffDays} kun</span>
              <span className="text-[11px] text-slate-600 block">Jami: ~{diffDays * dailyHours} soat tayyorgarlik</span>
            </div>
          </div>

          {/* Actions */}
          <div className="pt-2 flex items-center justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 rounded-lg transition-colors"
            >
              Bekor qilish
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-semibold bg-slate-900 hover:bg-indigo-600 text-white rounded-lg transition-colors shadow-xs"
              id="save-profile-btn"
            >
              Saqlash va Reja tuzish
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
