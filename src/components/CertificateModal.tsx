import React, { useRef } from 'react';
import { 
  Award, 
  Download, 
  Printer, 
  X, 
  CheckCircle2, 
  ShieldCheck, 
  Calendar, 
  Share2,
  Sparkles,
  QrCode
} from 'lucide-react';
import { UserTestResult } from '../types';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: UserTestResult;
  studentName?: string;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  isOpen,
  onClose,
  result,
  studentName = 'Sherzodbek Alisherov',
}) => {
  const certificateRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  // Format date in Uzbek
  const testDate = new Date(result.completedAt || Date.now());
  const formattedDate = testDate.toLocaleDateString('uz-UZ', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const certNumber = result.certificateId || `UZ-CERT-2026-${Math.floor(100000 + Math.random() * 900000)}`;
  const grade = result.certificateGrade || (result.percentage >= 86 ? 'A+' : result.percentage >= 70 ? 'A' : 'B+');

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl w-full max-w-4xl max-h-[96vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Modal Toolbar */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold tracking-tight">Rasmiy Elektron Sertifikat</h3>
              <p className="text-[11px] text-slate-400">№ {certNumber} · Davlat va Xalqaro Standart</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-black flex items-center space-x-1.5 transition-colors cursor-pointer shadow-sm"
              title="PDF sifatida saqlash yoki chop etish"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Chop etish / PDF</span>
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Certificate Display Container */}
        <div className="p-4 sm:p-8 overflow-y-auto bg-slate-100 dark:bg-slate-950 flex items-center justify-center">
          
          {/* Printable Certificate Canvas */}
          <div 
            ref={certificateRef}
            className="w-full max-w-3xl bg-white text-slate-900 rounded-2xl shadow-xl p-8 sm:p-12 border-8 border-amber-500/80 relative overflow-hidden print:m-0 print:border-4 print:shadow-none"
            style={{
              backgroundImage: 'radial-gradient(#f1f5f9 1.5px, transparent 1.5px)',
              backgroundSize: '24px 24px',
            }}
          >
            {/* Watermark / Background Crest */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03]">
              <Award className="w-96 h-96 text-slate-900" />
            </div>

            {/* Inner Gold Border */}
            <div className="border border-amber-600/40 p-6 sm:p-8 rounded-xl relative">
              
              {/* Corner Ornaments */}
              <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-amber-600" />
              <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-amber-600" />
              <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-amber-600" />
              <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-amber-600" />

              {/* Certificate Header */}
              <div className="text-center space-y-2">
                <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-[10px] font-black uppercase tracking-widest">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
                  <span>Bilimni Baholash & Sertifikatsiyalash Markazi</span>
                </div>

                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 uppercase tracking-wider font-serif">
                  MALAKA SERTIFIKATI
                </h1>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest">
                  CERTIFICATE OF ACADEMIC ACHIEVEMENT & PROFICIENCY
                </p>
                <div className="w-24 h-1 bg-amber-500 mx-auto rounded-full mt-2" />
              </div>

              {/* Recipient */}
              <div className="text-center my-6 sm:my-8 space-y-1">
                <p className="text-xs text-slate-500 italic">Ushbu sertifikat rasman tasdiqlaydi:</p>
                <h2 className="text-xl sm:text-3xl font-black text-blue-950 font-serif tracking-tight border-b-2 border-slate-200 pb-2 inline-block px-8">
                  {studentName || result.userName || 'Sherzodbek Alisherov'}
                </h2>
                <p className="text-xs text-slate-600 mt-2">
                  quyidagi fan va diagnostik imtihon bo'yicha yuqori malakaviy natijani qayd etdi:
                </p>
              </div>

              {/* Exam & Score Details */}
              <div className="bg-slate-50 rounded-2xl border border-slate-200/80 p-5 sm:p-6 my-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                  
                  <div className="border-b sm:border-b-0 sm:border-r border-slate-200 pb-3 sm:pb-0">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                      Fan / Yo'nalish
                    </span>
                    <span className="text-sm font-black text-slate-900 mt-1 block">
                      {result.testTitle || result.subject || 'Milliy Sertifikat'}
                    </span>
                    <span className="text-[11px] font-semibold text-blue-600 uppercase">
                      {result.examType.toUpperCase()} Standarti
                    </span>
                  </div>

                  <div className="border-b sm:border-b-0 sm:border-r border-slate-200 pb-3 sm:pb-0">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                      To'plangan Aniq Natija
                    </span>
                    <span className="text-xl font-black text-emerald-600 font-mono mt-1 block">
                      {result.correctCount} / {result.maxScore} to'g'ri
                    </span>
                    <span className="text-[11px] font-bold text-emerald-700">
                      Aniqlik darajasi: {result.percentage}%
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                      Berilgan Malaka Darajasi
                    </span>
                    <span className="text-xl font-black text-amber-600 font-serif mt-1 block">
                      {grade} Daraja
                    </span>
                    <span className="text-[11px] font-bold text-amber-700">
                      {result.percentage >= 86 ? '100% Maksimal Imtiyoz' : result.percentage >= 70 ? 'Imtiyozli Ball' : 'O\'tish Bali'}
                    </span>
                  </div>

                </div>
              </div>

              {/* Footer with Seal and Signatures */}
              <div className="grid grid-cols-3 items-end pt-4 border-t border-slate-200 gap-4 text-center sm:text-left">
                
                {/* QR Code Verification */}
                <div className="flex items-center space-x-2.5">
                  <div className="w-16 h-16 bg-white p-1 rounded-xl border border-slate-300 shadow-xs flex items-center justify-center shrink-0">
                    <QrCode className="w-12 h-12 text-slate-800" />
                  </div>
                  <div className="text-[10px] text-slate-500 leading-tight">
                    <p className="font-bold text-slate-800">QR Tasdiq:</p>
                    <p className="font-mono text-[9px]">{certNumber}</p>
                    <p className="text-[9px] text-emerald-600 font-bold">Haqiqiy / Tasdiqlangan</p>
                  </div>
                </div>

                {/* Golden Seal */}
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-600 to-amber-400 p-0.5 shadow-md flex items-center justify-center">
                    <div className="w-full h-full rounded-full border border-dashed border-white/80 flex flex-col items-center justify-center text-white">
                      <Sparkles className="w-4 h-4 text-amber-100" />
                      <span className="text-[8px] font-black uppercase tracking-widest mt-0.5">SINOV 2026</span>
                    </div>
                  </div>
                  <span className="text-[9px] font-extrabold text-amber-800 uppercase tracking-wider mt-1">
                    Rasmiy Muhr
                  </span>
                </div>

                {/* Date & Signature */}
                <div className="text-right text-[10px] text-slate-600 space-y-1">
                  <p className="font-bold text-slate-800">
                    Berilgan sana: {formattedDate}
                  </p>
                  <p className="italic text-slate-500 font-serif">
                    Akademik Kengash Raisi
                  </p>
                  <div className="w-24 h-0.5 bg-slate-300 ml-auto mt-1" />
                  <p className="text-[9px] text-slate-400 font-mono">
                    Elektron Imzo: #VERIFIED_HASH_89F4
                  </p>
                </div>

              </div>

            </div>
          </div>
        </div>

        {/* Modal Bottom Actions */}
        <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center space-x-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Ushbu sertifikat {result.correctCount} / {result.maxScore} to'g'ri natijaga ko'ra to'liq asoslangan.</span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center space-x-1.5 transition-colors cursor-pointer shadow-xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Chop etish / PDF</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold transition-colors cursor-pointer"
            >
              Yopish
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
