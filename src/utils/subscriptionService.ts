import { UserProfile } from '../types';

export interface SubscriptionPlanOption {
  id: 'monthly_pass' | 'quarterly_pass';
  name: string;
  durationDays: number;
  priceUzs: number;
  formattedPrice: string;
  popular?: boolean;
  features: string[];
}

export const SUBSCRIPTION_PLANS: SubscriptionPlanOption[] = [
  {
    id: 'monthly_pass',
    name: '1 Oylik Haqiqiy Mock Pass',
    durationDays: 30,
    priceUzs: 49000,
    formattedPrice: "49 000 so'm / oy",
    popular: true,
    features: [
      "Barcha haqiqiy oldingi tushgan mock testlar (SAT, Milliy, IELTS, CEFR)",
      "Har oy avtomatik yangilanadigan yangi eksklyuziv mock to'plamlari",
      "Rasmiy mezonlar bo'yicha baholash va rasmiy sertifikat",
      "Xatolar ustida AI bosqichma-bosqich yechim tahlili",
      "Cheksiz qayta topshirish imkoniyati",
    ],
  },
  {
    id: 'quarterly_pass',
    name: '3 Oylik Imtihonga To\'liq Tayyorgarlik',
    durationDays: 90,
    priceUzs: 119000,
    formattedPrice: "119 000 so'm (3 oy)",
    popular: false,
    features: [
      "3 oylik to'liq cheklovsiz barcha mock testlar",
      "Oylik avtomatik yangilanishlarning barcha to'plamlari",
      "AI shaxsiy o'quv rejasi va kunlik tavsiyalar",
      "Barcha fanga va rasmiy sertifikatlarga to'liq kafolat",
      "20% chegirma bilan tejash imkoniyati",
    ],
  },
];

/**
 * Checks whether user has an active premium subscription
 */
export const isUserSubscribed = (user?: UserProfile | null): boolean => {
  if (!user) return false;
  if (!user.isPremium) return false;
  if (!user.subscriptionExpiresAt) return true; // lifetime / active
  const expires = new Date(user.subscriptionExpiresAt).getTime();
  return expires > Date.now();
};

/**
 * Activates subscription for user
 */
export const activateUserSubscription = (
  user: UserProfile,
  planId: 'monthly_pass' | 'quarterly_pass'
): UserProfile => {
  const plan = SUBSCRIPTION_PLANS.find((p) => p.id === planId) || SUBSCRIPTION_PLANS[0];
  const now = new Date();
  const expireDate = new Date(now.getTime() + plan.durationDays * 24 * 60 * 60 * 1000);

  const updatedProfile: UserProfile = {
    ...user,
    isPremium: true,
    subscriptionPlan: planId,
    subscriptionExpiresAt: expireDate.toISOString(),
  };

  try {
    localStorage.setItem('sinov_user_profile', JSON.stringify(updatedProfile));
  } catch (e) {
    console.warn(e);
  }

  return updatedProfile;
};
