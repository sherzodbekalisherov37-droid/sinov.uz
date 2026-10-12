import React, { useState } from 'react';
import { 
  BarChart2, 
  TrendingUp, 
  Award, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  Target, 
  Calendar,
  Layers,
  ChevronRight,
  ShieldCheck,
  Printer
} from 'lucide-react';
import { UserProfile, UserTestResult, MockTest } from '../types';
import { CertificateModal } from './CertificateModal';

interface AnalyticsViewProps {
  userProfile: UserProfile;
  testResults: UserTestResult[];
  onStartTest: (testId: string) => void;
  onViewResultDetails: (result: UserTestResult) => void;
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({
  userProfile,
  testResults,
  onStartTest,
  onViewResultDetails,
}) => {
  const [selectedCertResult, setSelectedCertResult] = useState<UserTestResult | null>(null);

  const userResults = testResults.filter((r) => r.userId === userProfile.id || r.userName === userProfile.fullName);
  const resultsToDisplay = userResults.length > 0 ? userResults : testResults;

  // Filter only results where hasCertificate is true
  const earnedCertificates = resultsToDisplay.filter((r) => r.hasCertificate);

  const totalTests = resultsToDisplay.length;
  const avgPercentage = totalTests
    ? Math.round(resultsToDisplay.reduce((acc, r) => acc + r.percentage, 0) / totalTests)
    : 0;
  const totalCorrect = resultsToDisplay.reduce((acc, r) => acc + r.correctCount, 0);
  const totalQuestions = resultsToDisplay.reduce((acc, r) => acc + r.maxScore, 0);

  // Latest diagnostic level
  const latestResult = resultsToDisplay[resultsToDisplay.length - 1];
  const currentDiagnostic = latestResult ? latestResult.diagnosticLevel : userProfile.currentLevel;

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-100">
                Tahliliy Ko'rsatkichlar
              </span>
              <span className="text-xs text-slate-600 font-medium">
                {userProfile.fullName}
              </span>
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-1.5">
              Daraja va Ko'nikmalar Diagnostikasi
            </h1>
            <p className="text-xs text-slate-600 mt-1">
              Topshirilgan mock testlar asosida aniqlangan rasmiy darajangiz va dinamikangiz.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 text-white shrink-0 text-center sm:text-right">
            <span className="text-[11px] text-slate-300 block">Joriy Baholash Darajasi</span>
            <span className="text-xl font-extrabold text-indigo-300 font-mono">
              {latestResult ? latestResult.scaledScore : userProfile.targetScore}
            </span>
            <span className="text-[10px] text-slate-400 block mt-0.5 max-w-[160px] truncate">
              {currentDiagnostic}
            </span>
          </div>
        </div>

        {/* 4 Metric cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-slate-100">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
            <div className="flex items-center justify-between text-slate-600 mb-1">
              <span className="text-[11px] font-semibold">Topshirilgan Testlar</span>
              <Layers className="w-3.5 h-3.5 text-indigo-600" />
            </div>
            <p className="text-xl font-bold font-mono text-slate-900">{totalTests} ta</p>
            <span className="text-[10px] text-slate-600">To'liq sinovlar</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
            <div className="flex items-center justify-between text-slate-600 mb-1">
              <span className="text-[11px] font-semibold">O'rtacha Aniqlik</span>
              <Target className="w-3.5 h-3.5 text-emerald-600" />
            </div>
            <p className="text-xl font-bold font-mono text-slate-900">{avgPercentage}%</p>
            <span className="text-[10px] text-slate-600">Javoblar sifati</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
            <div className="flex items-center justify-between text-slate-600 mb-1">
              <span className="text-[11px] font-semibold">To'g'ri / Umumiy</span>
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
            </div>
            <p className="text-xl font-bold font-mono text-slate-900">{totalCorrect} / {totalQuestions}</p>
            <span className="text-[10px] text-slate-600">Savollar tahlili</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
            <div className="flex items-center justify-between text-slate-600 mb-1">
              <span className="text-[11px] font-semibold">Maqsad Sari</span>
              <TrendingUp className="w-3.5 h-3.5 text-amber-600" />
            </div>
            <p className="text-xl font-bold font-mono text-slate-900">{userProfile.targetScore}</p>
            <span className="text-[10px] text-slate-600">{userProfile.targetExam.toUpperCase()} bo'yicha</span>
          </div>
        </div>
      </div>

      {/* EARNED CERTIFICATES SECTION */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 tracking-tight">
                Rasmiy Sertifikatlarim ({earnedCertificates.length} ta)
              </h2>
              <p className="text-xs text-slate-500">
                Kamida 60% (masalan, 10 tadan 6 ta va undan ko'p to'g'ri) yechilgan imtihonlar uchun berilgan rasmiy sertifikatlar.
              </p>
            </div>
          </div>
        </div>

        {earnedCertificates.length === 0 ? (
          <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 text-center">
            <Award className="w-8 h-8 text-slate-300 mx-auto mb-2" />
            <p className="text-xs font-bold text-slate-700">Hozircha rasmiy sertifikat mavjud emas</p>
            <p className="text-[11px] text-slate-500 mt-1 max-w-md mx-auto leading-relaxed">
              Sertifikatga ega bo'lish uchun testlarda kamida 60% natija (masalan, 10 tadan 6 ta, 9 ta yoki 10 ta to'g'ri) ko'rsatishingiz lozim. Sinovdan o'tolmagan testlarga sertifikat taqdim etilmaydi.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {earnedCertificates.map((cert) => (
              <div 
                key={cert.id}
                className="p-4.5 rounded-2xl border-2 border-amber-500/40 bg-gradient-to-br from-amber-50/40 via-white to-amber-50/20 shadow-xs flex flex-col justify-between space-y-3"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md bg-amber-500 text-slate-950 font-mono">
                      {cert.certificateGrade || 'A+'} DARAJA
                    </span>
                    <span className="text-[11px] text-slate-500 font-mono">
                      {new Date(cert.completedAt).toLocaleDateString('uz-UZ')}
                    </span>
                  </div>
                  <h3 className="text-sm font-black text-slate-900 mt-2">
                    {cert.testTitle}
                  </h3>
                  <div className="mt-2 flex items-center space-x-2 text-xs">
                    <span className="font-bold text-emerald-700 font-mono">
                      {cert.correctCount} / {cert.maxScore} to'g'ri ({cert.percentage}%)
                    </span>
                    <span className="text-slate-300">•</span>
                    <span className="text-slate-600 font-medium">
                      {cert.scaledScore.split('·')[0]}
                    </span>
                  </div>
                </div>

                <div className="pt-2 border-t border-amber-200/60 flex items-center justify-between">
                  <span className="text-[10px] text-amber-800 font-mono font-bold">
                    ID: {cert.certificateId || 'UZ-CERT-2026'}
                  </span>
                  <button
                    onClick={() => setSelectedCertResult(cert)}
                    className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-black flex items-center space-x-1.5 transition-colors cursor-pointer shadow-xs"
                  >
                    <Award className="w-3.5 h-3.5" />
                    <span>Sertifikatni Ko'rish / Chop etish</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Test History List */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base font-bold text-slate-900 tracking-tight">
              Sinov Natijalari Tarixi
            </h2>
            <p className="text-xs text-slate-600 mt-0.5">
              Har bir topshirilgan test hisobotini qayta ko'rib chiqish va xatolarni tahlil qilish mumkin.
            </p>
          </div>
        </div>

        {resultsToDisplay.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-xs text-slate-600">Hali hech qanday mock test topshirilmadi.</p>
            <button
              onClick={() => onStartTest('ielts_mock_01')}
              className="mt-3 px-4 py-2 rounded-xl text-xs font-bold bg-slate-900 hover:bg-indigo-600 text-white transition-colors cursor-pointer"
            >
              Birinchi testni boshlash
            </button>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {resultsToDisplay.map((res) => (
              <div
                key={res.id}
                onClick={() => onViewResultDetails(res)}
                className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/60 p-2 rounded-xl transition-colors"
              >
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                      {res.examType}
                    </span>
                    <span className="text-xs font-mono text-slate-600">
                      {new Date(res.completedAt).toLocaleDateString('uz-UZ')}
                    </span>
                    {res.hasCertificate ? (
                      <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                        <Award className="w-3 h-3 text-amber-600" />
                        <span>{res.certificateGrade || 'A+'} Sertifikat berildi</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-100">
                        <span>Sertifikat berilmadi</span>
                      </span>
                    )}
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 mt-1 tracking-tight">
                    {res.testTitle}
                  </h3>
                  <div className="flex items-center space-x-3 text-xs text-slate-600 mt-1">
                    <span>Aniqlangan: <strong className="text-slate-900">{res.diagnosticLevel}</strong></span>
                    <span>•</span>
                    <span>{Math.floor(res.timeSpentSeconds / 60)} daqiqa</span>
                  </div>
                </div>

                <div className="flex items-center space-x-4 shrink-0">
                  <div className="text-right">
                    <span className="text-lg font-extrabold font-mono text-slate-900 block">
                      {res.scaledScore}
                    </span>
                    <span className="text-xs font-bold font-mono text-emerald-700">
                      {res.percentage}% ({res.correctCount}/{res.maxScore})
                    </span>
                  </div>

                  <div className="p-2 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors">
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Certificate Modal */}
      {selectedCertResult && (
        <CertificateModal
          isOpen={true}
          onClose={() => setSelectedCertResult(null)}
          result={selectedCertResult}
          studentName={userProfile.fullName}
        />
      )}
    </div>
  );
};
