import { ExamType, Question, QuestionReviewItem, UserTestResult } from '../types';

export function calculateTestResult(
  testIdOrParams:
    | string
    | {
        test: { id: string; title: string; examType: ExamType; subject?: string; questions: Question[] };
        answers: Record<string, any>;
        timeSpentSeconds: number;
        userId: string;
        userName: string;
      },
  testTitle?: string,
  examType?: ExamType,
  userId?: string,
  userName?: string,
  questions?: Question[],
  answers?: Record<string, any>,
  timeSpentSeconds?: number
): UserTestResult {
  let resolvedTestId: string;
  let resolvedTitle: string;
  let resolvedExamType: ExamType;
  let resolvedSubject: string | undefined;
  let resolvedUserId: string;
  let resolvedUserName: string;
  let resolvedQuestions: Question[];
  let resolvedAnswers: Record<string, any>;
  let resolvedTimeSpent: number;

  if (typeof testIdOrParams === 'object') {
    resolvedTestId = testIdOrParams.test.id;
    resolvedTitle = testIdOrParams.test.title;
    resolvedExamType = testIdOrParams.test.examType;
    resolvedSubject = testIdOrParams.test.subject;
    resolvedUserId = testIdOrParams.userId;
    resolvedUserName = testIdOrParams.userName;
    resolvedQuestions = testIdOrParams.test.questions;
    resolvedAnswers = testIdOrParams.answers;
    resolvedTimeSpent = testIdOrParams.timeSpentSeconds;
  } else {
    resolvedTestId = testIdOrParams;
    resolvedTitle = testTitle!;
    resolvedExamType = examType!;
    resolvedUserId = userId!;
    resolvedUserName = userName!;
    resolvedQuestions = questions!;
    resolvedAnswers = answers!;
    resolvedTimeSpent = timeSpentSeconds!;
  }

  let correctCount = 0;
  let wrongCount = 0;
  let unansweredCount = 0;
  const skillMap: Record<string, { total: number; correct: number }> = {};
  const questionReviews: QuestionReviewItem[] = [];

  resolvedQuestions.forEach((q) => {
    const userVal = resolvedAnswers[q.id];
    const skill = q.skillTag || q.section || q.subject || 'General';

    if (!skillMap[skill]) {
      skillMap[skill] = { total: 0, correct: 0 };
    }
    skillMap[skill].total += 1;

    let isCorrect = false;
    let correctAnswerDisplay: any = '';

    if (userVal === undefined || userVal === null || userVal === '') {
      unansweredCount++;
    } else {
      // Evaluate based on question type
      if (q.questionType === 'numeric') {
        const cleanUser = String(userVal).trim();
        const cleanCorrect = String(q.correctTextAnswer || '').trim();
        const userNum = parseFloat(cleanUser.replace(',', '.'));
        const correctNum = parseFloat(cleanCorrect.replace(',', '.'));
        if (!isNaN(userNum) && !isNaN(correctNum) && Math.abs(userNum - correctNum) < 0.0001) {
          isCorrect = true;
        } else {
          isCorrect = cleanUser.toLowerCase() === cleanCorrect.toLowerCase();
        }
        correctAnswerDisplay = q.correctTextAnswer || 'Aniq qiymat';
      } else if (q.questionType === 'short_answer') {
        const cleanUser = String(userVal).trim().toLowerCase().replace(/\s+/g, ' ');
        const cleanCorrect = String(q.correctTextAnswer || '').trim().toLowerCase().replace(/\s+/g, ' ');
        isCorrect = cleanUser === cleanCorrect || cleanUser.replace(',', '.') === cleanCorrect.replace(',', '.');
        correctAnswerDisplay = q.correctTextAnswer || 'Aniq matnli javob';
      } else if (q.questionType === 'multiple_select') {
        const correctSet = new Set(q.correctOptions || []);
        const userSet = new Set(Array.isArray(userVal) ? userVal : []);
        isCorrect = correctSet.size === userSet.size && [...correctSet].every((v) => userSet.has(v));
        correctAnswerDisplay = (q.correctOptions || []).map((i) => `${String.fromCharCode(65 + i)}`).join(', ');
      } else if (q.questionType === 'matching') {
        let allMatched = true;
        (q.matchingPairs || []).forEach((p) => {
          if (userVal[p.id] !== p.right) allMatched = false;
        });
        isCorrect = allMatched && (q.matchingPairs || []).length > 0;
        correctAnswerDisplay = (q.matchingPairs || []).map((p) => `${p.left} → ${p.right}`).join('; ');
      } else if (q.questionType === 'writing_task' || q.questionType === 'speaking_task') {
        isCorrect = typeof userVal === 'string' && userVal.trim().length >= 15;
        correctAnswerDisplay = "Mavzuga mos to'liq topshirilgan vazifa";
      } else {
        // Standard Multiple choice, True/False, Listening, Reading
        isCorrect = Number(userVal) === Number(q.correctOption) || userVal === q.correctOption;
        if (q.options && typeof q.correctOption === 'number' && q.options[q.correctOption]) {
          correctAnswerDisplay = `${String.fromCharCode(65 + q.correctOption)}) ${q.options[q.correctOption]}`;
        } else {
          correctAnswerDisplay = q.correctOption ?? 0;
        }
      }

      if (isCorrect) {
        correctCount++;
        skillMap[skill].correct += 1;
      } else {
        wrongCount++;
      }
    }

    questionReviews.push({
      questionId: q.id,
      questionText: q.text,
      questionType: q.questionType || 'multiple_choice',
      userAnswer: userVal,
      correctAnswer: correctAnswerDisplay,
      isCorrect,
      explanation: q.explanation,
      pointsEarned: isCorrect ? q.points : 0,
      maxPoints: q.points,
    });
  });

  const totalQuestions = resolvedQuestions.length || 1;
  const percentage = Math.round((correctCount / totalQuestions) * 100);
  const averageTimePerQuestion = Math.round(resolvedTimeSpent / totalQuestions);

  // Scaled score & diagnostic level calculation based on exam type
  let scaledScore = '';
  let diagnosticLevel = '';
  const recommendations: string[] = [];
  let isPassed = percentage >= 60;
  let hasCertificate = false;
  let certificateGrade: string | undefined = undefined;
  let certificateLevel: string | undefined = undefined;
  const certificateId = `UZ-CERT-2026-${Math.floor(100000 + Math.random() * 900000)}`;

  if (resolvedExamType === 'ielts') {
    let band = 1.0;
    if (percentage >= 88) band = 8.5;
    else if (percentage >= 80) band = 8.0;
    else if (percentage >= 73) band = 7.5;
    else if (percentage >= 65) band = 7.0;
    else if (percentage >= 58) band = 6.5;
    else if (percentage >= 50) band = 6.0;
    else if (percentage >= 40) band = 5.5;
    else if (percentage >= 30) band = 5.0;
    else if (percentage > 0) band = 4.0;
    else band = 1.0;

    isPassed = band >= 6.0 && percentage >= 50;
    if (isPassed) {
      hasCertificate = true;
      certificateGrade = `Band ${band.toFixed(1)}`;
      certificateLevel = band >= 8.0 
        ? `IELTS Academic Expert (Band ${band.toFixed(1)})` 
        : band >= 7.0 
        ? `IELTS Academic Advanced (Band ${band.toFixed(1)})` 
        : `IELTS Academic Competence (Band ${band.toFixed(1)})`;
      scaledScore = `Band ${band.toFixed(1)} (${correctCount}/${totalQuestions} to'g'ri) · Sertifikat berildi`;
      diagnosticLevel = `Muvaffaqiyatli topshirildi · ${certificateGrade} (${correctCount}/${totalQuestions} to'g'ri)`;
      recommendations.push('Ajoyib natija! Rasmiy IELTS sertifikati talablariga to\'liq javob beradi.');
    } else {
      hasCertificate = false;
      scaledScore = `Band ${band.toFixed(1)} (${correctCount}/${totalQuestions} to'g'ri) · O'tolmadi`;
      diagnosticLevel = `Yetarli daraja to'planmadi (${correctCount}/${totalQuestions} to'g'ri · Sertifikat berilmaydi)`;
      recommendations.push('Sertifikat berilmadi: Sertifikat olish uchun kamida 60% (Band 6.0) natija talab qilinadi.');
    }
  } else if (resolvedExamType === 'sat') {
    const rawScaled = percentage === 0 ? 400 : Math.round(400 + (percentage / 100) * 1200);
    const roundedSat = Math.round(rawScaled / 10) * 10;
    isPassed = percentage >= 60;

    if (isPassed) {
      hasCertificate = true;
      certificateGrade = roundedSat >= 1450 ? 'Elite 99%' : roundedSat >= 1250 ? 'Advanced' : 'Standard';
      certificateLevel = `Digital SAT Certificate (${roundedSat} / 1600)`;
      scaledScore = `${roundedSat} / 1600 (${correctCount}/${totalQuestions} to'g'ri) · Sertifikat berildi`;
      diagnosticLevel = `${certificateLevel} · ${correctCount}/${totalQuestions} to'g'ri`;
      recommendations.push('Tabriklaymiz! SAT bo\'yicha topshirilgan bilim va ko\'nikmalaringiz rasman tasdiqlandi.');
    } else {
      hasCertificate = false;
      scaledScore = `${roundedSat} / 1600 (${correctCount}/${totalQuestions} to'g'ri) · O'tolmadi`;
      diagnosticLevel = `O'tish bali to'planmadi (${correctCount}/${totalQuestions} to'g'ri · Sertifikat berilmaydi)`;
      recommendations.push('Sertifikat berilmadi: Sertifikat uchun kamida 60% to\'g\'ri javob talab etiladi.');
    }
  } else if (resolvedExamType === 'milliy') {
    // Milliy Sertifikat: Must be >= 60% to get any certificate!
    // NEVER show "C" or "S" when failed!
    if (percentage >= 86) {
      // 86-100% (e.g. 10 tadan 9 yoki 10 ta to'g'ri yechsa)
      isPassed = true;
      hasCertificate = true;
      certificateGrade = 'A+';
      certificateLevel = 'A+ Darajali Davlat Sertifikati (100% Maksimal Imtiyoz)';
      scaledScore = `${correctCount}/${totalQuestions} ball (${percentage}%) · A+ Sertifikat`;
      diagnosticLevel = `A+ Darajali Sertifikat (${correctCount}/${totalQuestions} to'g'ri · 100% Imtiyoz)`;
      recommendations.push('Maksimal natija! 10 tadan 9-10 ta yechib, A+ davlat sertifikatiga ega bo\'ldingiz. OTM imtihonida 100% ball beriladi.');
    } else if (percentage >= 70) {
      // 70-85% (e.g. 10 tadan 7-8 ta to'g'ri)
      isPassed = true;
      hasCertificate = true;
      certificateGrade = 'A';
      certificateLevel = 'A Darajali Davlat Sertifikati (Imtiyozli Ball)';
      scaledScore = `${correctCount}/${totalQuestions} ball (${percentage}%) · A Sertifikat`;
      diagnosticLevel = `A Darajali Sertifikat (${correctCount}/${totalQuestions} to'g'ri · Imtiyozli)`;
      recommendations.push('Tabriklaymiz! A darajali sertifikat berildi. A+ darajasiga yetish uchun murakkabroq savollar ustida ishlang.');
    } else if (percentage >= 60) {
      // 60-69% (e.g. 10 tadan 6 ta to'g'ri)
      isPassed = true;
      hasCertificate = true;
      certificateGrade = 'B+';
      certificateLevel = 'B+ Darajali Sertifikat';
      scaledScore = `${correctCount}/${totalQuestions} ball (${percentage}%) · B+ Sertifikat`;
      diagnosticLevel = `B+ Darajali Sertifikat (${correctCount}/${totalQuestions} to'g'ri)`;
      recommendations.push('Muvaffaqiyatli! B+ sertifikati berildi. Bilimingizni yanada mustahkamlash tavsiya etiladi.');
    } else {
      // Under 60% (e.g. 10 tadan 5, 4, 3, 2, 1 ta yechsa) -> NEVER SHOW "C" or "S"!
      isPassed = false;
      hasCertificate = false;
      certificateGrade = undefined;
      certificateLevel = undefined;
      scaledScore = `${correctCount}/${totalQuestions} ball (${percentage}%) · Testdan o'tmadi`;
      diagnosticLevel = `Yetarli ball to'planmadi (${correctCount}/${totalQuestions} to'g'ri · Minimal o'tish: 60%)`;
      recommendations.push('Sertifikat berilmadi! Sertifikat olish uchun kamida 60% (10 tadan kamida 6 ta to\'g\'ri) yechish shart.');
      recommendations.push('Darsliklarni qayta o\'qib, asosiy formulalar va qoidalarni takrorlang hamda testni qayta topshiring.');
    }
  } else {
    // CEFR
    if (percentage >= 85) {
      isPassed = true;
      hasCertificate = true;
      certificateGrade = 'C1';
      certificateLevel = 'CEFR C1 Advanced Certificate';
      scaledScore = `CEFR C1 (${correctCount}/${totalQuestions} to'g'ri) · Sertifikat berildi`;
      diagnosticLevel = `CEFR C1 Advanced · ${correctCount}/${totalQuestions} to'g'ri`;
    } else if (percentage >= 70) {
      isPassed = true;
      hasCertificate = true;
      certificateGrade = 'B2';
      certificateLevel = 'CEFR B2 Independent Certificate';
      scaledScore = `CEFR B2 (${correctCount}/${totalQuestions} to'g'ri) · Sertifikat berildi`;
      diagnosticLevel = `CEFR B2 Independent · ${correctCount}/${totalQuestions} to'g'ri`;
    } else if (percentage >= 60) {
      isPassed = true;
      hasCertificate = true;
      certificateGrade = 'B1';
      certificateLevel = 'CEFR B1 Threshold Certificate';
      scaledScore = `CEFR B1 (${correctCount}/${totalQuestions} to'g'ri) · Sertifikat berildi`;
      diagnosticLevel = `CEFR B1 Threshold · ${correctCount}/${totalQuestions} to'g'ri`;
    } else {
      // Failed: Under 60% (Never display "C" or "S"!)
      isPassed = false;
      hasCertificate = false;
      certificateGrade = undefined;
      certificateLevel = undefined;
      scaledScore = `${correctCount}/${totalQuestions} to'g'ri (${percentage}%) · Testdan o'tmadi`;
      diagnosticLevel = `Yetarli ball to'planmadi (${correctCount}/${totalQuestions} to'g'ri · Minimal o'tish: 60%)`;
      recommendations.push('Sertifikat berilmadi! Sertifikat uchun kamida 60% natija (B1/B2 daraja) talab qilinadi.');
    }
  }

  // Skill breakdown
  const skillBreakdown: Record<string, { total: number; correct: number; percentage: number }> = {};
  const strongSkills: string[] = [];
  const weakSkills: string[] = [];

  for (const [skill, val] of Object.entries(skillMap)) {
    const pct = Math.round((val.correct / val.total) * 100);
    skillBreakdown[skill] = {
      total: val.total,
      correct: val.correct,
      percentage: pct,
    };
    if (pct >= 70) {
      strongSkills.push(skill);
    } else {
      weakSkills.push(skill);
    }
  }

  if (weakSkills.length > 0) {
    recommendations.push(`Ayniqsa ushbu ko'nikmalarni kuchaytirish tavsiya etiladi: ${weakSkills.join(', ')}.`);
  }

  return {
    id: 'res_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
    testId: resolvedTestId,
    testTitle: resolvedTitle,
    examType: resolvedExamType,
    subject: resolvedSubject,
    userId: resolvedUserId,
    userName: resolvedUserName,
    completedAt: new Date().toISOString(),
    score: correctCount,
    maxScore: totalQuestions,
    percentage,
    scaledScore,
    diagnosticLevel,
    timeSpentSeconds: resolvedTimeSpent,
    averageTimePerQuestion,
    answers: resolvedAnswers,
    correctCount,
    wrongCount,
    unansweredCount,
    isPassed,
    hasCertificate,
    certificateId: hasCertificate ? certificateId : undefined,
    certificateGrade,
    certificateLevel,
    skillBreakdown,
    strongSkills,
    weakSkills,
    recommendations,
    questionReviews,
  };
}

export function generateStudyPlan(userProfile: {
  id: string;
  targetExam: ExamType;
  targetScore: string;
  examDate: string;
  dailyHours: number;
}) {
  return generateIndividualStudyPlan(
    userProfile.id,
    userProfile.targetExam,
    userProfile.targetScore,
    userProfile.examDate,
    userProfile.dailyHours
  );
}

export function generateIndividualStudyPlan(
  userId: string,
  targetExam: ExamType,
  targetScore: string,
  examDateStr: string,
  dailyHours: number
) {
  const targetDate = new Date(examDateStr);
  const now = new Date();
  const diffTime = Math.max(1, targetDate.getTime() - now.getTime());
  const remainingDays = Math.max(7, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));

  const examNames: Record<ExamType, string> = {
    ielts: 'IELTS Academic / General',
    sat: 'Digital SAT',
    milliy: 'Milliy Sertifikat',
    cefr: 'Multi-Level CEFR',
  };

  const phases = [
    {
      title: '1-Bosqich: Diagnostika & Baza yaratish',
      weeks: '1-2 haftalar',
      description: 'Dastlabki kamchiliklarni aniqlash, asosiy grammatika, formulalar va lug\'at zaxirasini mustahkamlash.',
      focusAreas: ['Boshlang\'ich mock test', 'Xatolar tahlil daftari ochish', 'Kundalik 45 daqiqa lug\'at/formula yodlash'],
    },
    {
      title: '2-Bosqich: Strategiyalar & Mavzuli mashqlar',
      weeks: 'O\'rta muddat',
      description: 'Har bir bo\'lim bo\'yicha qiyin savollar turlarini yechish, vaqt boshqaruvi (Pacing) ustida ishlash.',
      focusAreas: ['Vaqtga qarab mashq qilish', 'Tez o\'qish (Skimming & Scanning)', 'Murakkab savollar ustida ishlash'],
    },
    {
      title: '3-Bosqich: To\'liq Mock testlar & Yakuniy tayyorgarlik',
      weeks: 'So\'nggi 10-14 kun',
      description: 'Haqiqiy imtihon muhitida sinovlar, xatolarni nolga tushirish va ruhan tayyorlanish.',
      focusAreas: ['Haftada 2-3 ta to\'liq mock test', 'AI yordamchisi bilan xatolarni yechish', 'Imtihon kuni rejasini tasdiqlash'],
    },
  ];

  const items = [];
  const daysToPlan = Math.min(remainingDays, 21);

  for (let d = 1; d <= daysToPlan; d++) {
    const itemDate = new Date();
    itemDate.setDate(now.getDate() + d);
    const dateFormatted = itemDate.toLocaleDateString('uz-UZ', { month: 'short', day: 'numeric' });

    let title = '';
    let desc = '';
    let category = '';
    let milestone = undefined;

    if (d === 1) {
      title = `${examNames[targetExam]} Boshlang'ich Diagnostik Mock Test`;
      desc = `Boshlang'ich darajangizni aniqlash uchun to'liq test topshiring va natijani ko'ring.`;
      category = 'Mock Test';
      milestone = 'Start Chizig\'i';
    } else if (d % 7 === 0) {
      title = `To'liq Haftalik Nazorat Mock Testi (#${Math.floor(d / 7)})`;
      desc = `Hafta davomida o'rganilgan mavzularni to'liq imtihon sharoitida tekshirish.`;
      category = 'Mock Test';
      milestone = `${Math.floor(d / 7)}-Haftalik Natija`;
    } else {
      title = `${examNames[targetExam]} Bo'lim mashg'uloti (#${d})`;
      desc = `Mavzulashtirilgan intensiv mashqlar va xatolar ustida ishlash.`;
      category = 'Mashq';
    }

    items.push({
      id: `plan_day_${d}`,
      day: d,
      dateStr: dateFormatted,
      title,
      description: desc,
      category,
      estimatedMinutes: Math.round(dailyHours * 60),
      completed: d === 1 ? true : false,
      milestone,
    });
  }

  const aiAdvice = `Sizning maqsadingiz — ${targetScore} ball. Imtihongacha ${remainingDays} kun qoldi. Kuniga ${dailyHours} soat muntazam shug'ullanish sizga jami ${remainingDays * dailyHours} soatlik sof tayyorgarlik beradi. Asosiy e'tiboringizni har bir xatoni "AI Yordamchi" bilan tahlil qilishga va haftasiga kamida 1 ta to'liq mock test yechishga qarating.`;

  return {
    id: 'plan_' + Date.now(),
    userId,
    targetExam,
    targetScore,
    remainingDays,
    dailyHours,
    generatedAt: new Date().toISOString(),
    items,
    aiAdvice,
    phases,
  };
}
