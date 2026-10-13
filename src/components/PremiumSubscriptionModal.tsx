import React, { useState } from 'react';
import { 
  Crown, 
  Check, 
  X, 
  Sparkles, 
  ShieldCheck, 
  CreditCard, 
  Zap, 
  Lock,
  ArrowRight
} from 'lucide-react';
import { UserProfile } from '../types';
import { SUBSCRIPTION_PLANS, activateUserSubscription } from '../utils/subscriptionService';
import { triggerConfetti } from '../utils/confetti';

interface PremiumSubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  userProfile: UserProfile;
  onSubscriptionSuccess: (updatedProfile: UserProfile) => void;
  targetTestTitle?: string;
}

export const PremiumSubscriptionModal: React.FC<PremiumSubscriptionModalProps> = ({
  isOpen,
  onClose,
  userProfile,
  onSubscriptionSuccess,
  targetTestTitle,
}) => {
  const [selectedPlanId, setSelectedPlanId] = useState<'monthly_pass' | 'quarterly_pass'>('monthly_pass');
  const [paymentProvider, setPaymentProvider] = useState<'payme' | 'click' | 'uzum'>('payme');
  const [phoneNumber, setPhoneNumber] = useState('+998 90 123 45 67');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const selectedPlan = SUBSCRIPTION_PLANS.find((p) => p.id === selectedPlanId) || SUBSCRIPTION_PLANS[0];

  const handlePayAndActivate = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const updated = activateUserSubscription(userProfile, selectedPlanId);
      setIsProcessing(false);
      setIsSuccess(true);
      triggerConfetti();

      setTimeout(() => {
        setIsSuccess(false);
        onSubscriptionSuccess(updated);
        onClose();
      }, 1500);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto animate-fade-in font-sans">
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 max-w-xl w-full shadow-2xl relative my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-2xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="py-12 text-center space-y-4 animate-scale-up">
            <div className="w-16 h-16 rounded-3xl bg-amber-500 text-white flex items-center justify-center mx-auto shadow-lg shadow-amber-500/30">
              <Crown className="w-8 h-8 fill-current" />
            </div>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white">
              Obunangiz Faollashtirildi!
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto">
              Barcha haqiqiy mock testlar, oylik yangi to'plamlar va AI pedagogik tahlillaridan cheklovsiz foydalanishingiz mumkin.
            </p>
            <div className="inline-flex items-center space-x-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-4 py-2 rounded-2xl">
              <ShieldCheck className="w-4 h-4" />
              <span>30 kunlik Premium Mock Pass faol</span>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Header Badge */}
            <div>
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 text-xs font-black uppercase tracking-wider mb-2">
                <Crown className="w-4 h-4 fill-current text-amber-500" />
                <span>Premium Mock Obunasi</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                Haqiqiy Mock Testlar & Oylik Obuna
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                {targetTestTitle ? (
                  <span>
                    <strong className="text-slate-700 dark:text-slate-200">{targetTestTitle}</strong> va boshqa barcha haqiqiy tushgan mock testlarni ishlash uchun oylik obunani faollashtiring.
                  </span>
                ) : (
                  "Haqiqiy oldingi tushgan va har oy yangilanib turadigan eksklyuziv mock testlarni ishlash uchun qulay oylik obuna."
                )}
              </p>
            </div>

            {/* Plan selector cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {SUBSCRIPTION_PLANS.map((plan) => {
                const isSelected = selectedPlanId === plan.id;
                return (
                  <div
                    key={plan.id}
                    onClick={() => setSelectedPlanId(plan.id)}
                    className={`p-4 rounded-2xl border-2 transition-all cursor-pointer relative flex flex-col justify-between ${
                      isSelected
                        ? 'border-amber-500 bg-amber-50/50 dark:bg-amber-950/20 shadow-md shadow-amber-500/10'
                        : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900'
                    }`}
                  >
                    {plan.popular && (
                      <span className="absolute -top-2.5 right-3 bg-amber-500 text-white text-[10px] font-black uppercase px-2 py-0.5 rounded-full shadow-xs">
                        Eng Ommabop
                      </span>
                    )}
                    <div>
                      <h4 className="text-xs font-black text-slate-900 dark:text-white">
                        {plan.name}
                      </h4>
                      <div className="text-lg font-black text-amber-600 dark:text-amber-400 mt-1 font-mono">
                        {plan.formattedPrice}
                      </div>
                    </div>

                    <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-600 dark:text-slate-300 space-y-1">
                      <div className="flex items-center space-x-1.5">
                        <Check className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                        <span>Barcha 4 ta fan (SAT, Math, IELTS, CEFR)</span>
                      </div>
                      <div className="flex items-center space-x-1.5">
                        <Check className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                        <span>Har oy avto-yangilanuvchi testlar</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Payment Method Selector */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                To'lov tizimini tanlang:
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'payme', name: 'Payme', color: 'text-cyan-600 border-cyan-500/40 bg-cyan-50/50 dark:bg-cyan-950/20' },
                  { id: 'click', name: 'Click Up', color: 'text-blue-600 border-blue-500/40 bg-blue-50/50 dark:bg-blue-950/20' },
                  { id: 'uzum', name: 'Uzum Bank', color: 'text-purple-600 border-purple-500/40 bg-purple-50/50 dark:bg-purple-950/20' },
                ].map((prov) => (
                  <button
                    key={prov.id}
                    type="button"
                    onClick={() => setPaymentProvider(prov.id as any)}
                    className={`py-2.5 px-3 rounded-xl border text-xs font-black transition-all cursor-pointer flex items-center justify-center space-x-1.5 ${
                      paymentProvider === prov.id
                        ? `${prov.color} ring-2 ring-offset-1 ring-amber-500`
                        : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    <span>{prov.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Phone Number Input */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Telefon raqamingiz (To'lov hisobi):
              </label>
              <input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-mono font-bold text-slate-900 dark:text-white"
                placeholder="+998 90 123 45 67"
              />
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-2">
              <button
                type="button"
                disabled={isProcessing}
                onClick={handlePayAndActivate}
                className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-black text-sm shadow-lg shadow-amber-500/25 transition-all flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
              >
                {isProcessing ? (
                  <span>To'lov qabul qilinmoqda...</span>
                ) : (
                  <>
                    <Crown className="w-4 h-4 fill-current" />
                    <span>Obunani Sotib Olish ({selectedPlan.formattedPrice})</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="flex items-center justify-center space-x-2 text-[11px] text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>Xavfsiz to'lov • Istalgan vaqt bekor qilish mumkin</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
