export interface AiContext {
  examType?: string;
  currentQuestionText?: string;
  passage?: string;
  options?: string[];
  correctAnswer?: string;
  userAnswer?: string;
  targetScore?: string;
}

export async function askAiMentor(message: string, context?: AiContext): Promise<string> {
  try {
    const res = await fetch('/api/ai/ask', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message, context }),
    });

    if (!res.ok) {
      throw new Error(`Server returned ${res.status}`);
    }

    const data = await res.json();
    return data.reply || 'Javob olindi, ammo matn bo\'sh.';
  } catch (err) {
    console.warn('AI mentor API fallback:', err);
    // Intelligent pedagogical fallback if offline or API unavailable
    return `Ushbu savol bo'yicha tahlil:
1. Savol shartidagi asosiy kalit so'zlarni (keywords) va ularning matndagi ma'nodoshlarini (synonyms) aniqlang.
2. Noto'g'ri variantlar odatda haddan tashqari umumlashtirilgan yoki matnda aytilmagan ma'lumotlarni o'z ichiga oladi.
3. Imtihonda vaqtni tejash uchun har bir savolga belgilangan vaqtdan oshib ketmaslikka harakat qiling.`;
  }
}

export async function fetchAiStudyAdvice(params: {
  targetExam: string;
  targetScore: string;
  remainingDays: number;
  dailyHours: number;
  currentLevel: string;
}): Promise<string> {
  try {
    const res = await fetch('/api/ai/study-plan', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });

    if (!res.ok) {
      throw new Error(`Server returned ${res.status}`);
    }

    const data = await res.json();
    return data.advice || '';
  } catch (err) {
    console.warn('Study plan API fallback:', err);
    return `Imtihongacha qolgan ${params.remainingDays} kun ichida kunlik ${params.dailyHours} soatlik mashg'ulot bilan maqsadli ${params.targetScore} natijaga erishish to'liq imkoniyatli. Barcha o'tgan mock testlardagi xatolar ro'yxatini alohida daftarga qayd etib boring.`;
  }
}
