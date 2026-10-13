import { Question, AiBreakdownStep } from '../types';

/**
 * Generates structured pedagogical step-by-step breakdown
 * of how a missed question should be solved.
 */
export const generateStepByStepMistakeAnalysis = (
  question: Question,
  userWrongAnswer: any
): AiBreakdownStep => {
  const options = question.options || [];
  const correctOptIdx = question.correctOption ?? 0;
  const correctOptText = options[correctOptIdx] || question.correctTextAnswer || "To'g'ri variant";
  const userOptText = typeof userWrongAnswer === 'number' && options[userWrongAnswer] 
    ? options[userWrongAnswer] 
    : userWrongAnswer !== undefined && userWrongAnswer !== null
    ? String(userWrongAnswer)
    : "Belgilanmagan / Tashlab ketilgan";

  const isMath = question.subject?.toLowerCase().includes('matematika') || 
                 question.subject?.toLowerCase().includes('math') || 
                 question.examType === 'sat' && question.section?.toLowerCase().includes('math');

  const isEnglishOrReading = question.subject?.toLowerCase().includes('english') ||
                             question.subject?.toLowerCase().includes('reading') ||
                             question.subject?.toLowerCase().includes('cefr') ||
                             question.subject?.toLowerCase().includes('ielts');

  if (isMath) {
    return {
      rootCause: `Siz tanlagan javob: "${userOptText}". Bu xato ko'pincha oraliq hisob-kitobdagi ishora adashuvi, tenglamaning aniqlanish sohasini e'tibordan chetda qoldirish yoki savolda so'ralgan kattalikni (masalan x emas, balki x+5 ni) to'liq o'qimaslik natijasida kelib chiqadi.`,
      howToSolve: [
        "1-qadam (Shart tahlili): Savolning boshlang'ich ma'lumotlarini qog'ozga aniq yozib oling va noma'lum kattalikni belgilang.",
        "2-qadam (Formulani tanlash): Ushbu mavzuga xos standart matematik qoida yoki formulani (masalan diskriminant, Viyet teoremasi, Pifagor teoremasi yoki hosila qoidasi) qo'llang.",
        "3-qadam (Hisoblash): Qavslarni ochish va amallarni bajarishda ishoralarga (+/-) qat'iy e'tibor qarating.",
        `4-qadam (Tekshirish): Chiqqan natijani dastlabki tenglama yoki geometrik shartga qo'yib tekshirib ko'ring. Yakuniy to'g'ri natija: "${correctOptText}".`,
      ],
      ruleOrFormula: question.explanation || "Matematik masalalarda doimo: 1) Aniqlanish sohasi, 2) Ekvivalent almashtirishlar, 3) Javobni dastlabki shartga qo'yib tekshirish oltin qoidadir.",
      correctAnswerInsight: `To'g'ri javob: "${correctOptText}". ${question.explanation}`,
      recommendedPracticeTip: "Keyingi safar ushbu turdagi masalalarni yechishda oraliq amallarni xayolda emas, qoralama qog'ozda to'liq yozib bajaring.",
    };
  }

  if (isEnglishOrReading) {
    return {
      rootCause: `Siz tanlagan javob: "${userOptText}". Ushbu noto'g'ri variant ko'pincha matndagi chalg'ituvchi so'zlarga (distractor) aldanib qolish, grammatik bog'lanish (ega-kesim moslashuvi, predloglar) yoki kontekstdagi qat'iy mantiqiy zidlikni ilg'amaslik oqibatida yuzaga keladi.`,
      howToSolve: [
        "1-qadam (Kalit so'zlarni aniqlash): Gapdagi yoki savoldagi asosiy grammatik subyekt (ega) va predikat (fe'l)ni toping.",
        "2-qadam (Mantiqiy bog'lovchini tekshirish): Gaplar orasida qarama-qarshilik (however, by contrast), sabab-oqibat (therefore, consequently) yoki qo'shimcha fikr (furthermore) borligini aniqlang.",
        "3-qadam (Variantlarni chiqarib tashlash): Chalg'ituvchi, juda umumiy yoki matnga to'g'ri kelmaydigan variantlarni bittalab istisno qiling (Elimination technique).",
        `4-qadam (To'g'ri variantni qo'yib o'qish): To'g'ri variant ("${correctOptText}") bilan butun gapni to'liq o'qib, uning Standard English qoidalariga 100% mosligiga ishonch hosil qiling.`,
      ],
      ruleOrFormula: question.explanation || "Ingliz tili imtihonlarida (SAT, IELTS, CEFR): 1) Gapning mustaqilligi (independent clause), 2) Parallelizm, 3) Kontekstual aniqlik birinchi o'rinda turadi.",
      correctAnswerInsight: `To'g'ri javob: "${correctOptText}". ${question.explanation}`,
      recommendedPracticeTip: "Savol ustida ishlaganda avval to'g'ri javobni qidirmang, balki 3 ta noto'g'ri variant nima uchun xato ekanligini isbotlab chiqarib tashlang.",
    };
  }

  // General fallback
  return {
    rootCause: `Siz tanlagan variant: "${userOptText}". Ushbu variant mavzuning asosiy qoidasiga to'liq mos kelmaydi.`,
    howToSolve: [
      "1-qadam: Savol matnidagi asosiy talab va shartni diqqat bilan qayta o'qing.",
      "2-qadam: Rasmiy imtihon mezonlariga mos nazariy qoidani xotirlang.",
      "3-qadam: Noto'g'ri variantlarni birma-bir chiqarib tashlang.",
      `4-qadam: To'g'ri yechim asosida yakuniy javobni belgilang: "${correctOptText}".`,
    ],
    ruleOrFormula: question.explanation || "To'g'ri yechim rasmiy nazariy ta'rif va qoidalarga to'liq tayanadi.",
    correctAnswerInsight: `To'g'ri javob: "${correctOptText}". ${question.explanation}`,
    recommendedPracticeTip: "Ushbu mavzu bo'yicha yana 3-5 ta shunga o'xshash mashq ishlash orqali bilimlarni mustahkamlash tavsiya etiladi.",
  };
};
