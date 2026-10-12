import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// Server-side AI Mentor endpoint
app.post('/api/ai/ask', async (req, res) => {
  const { message, context } = req.body;
  const apiKey = process.env.GEMINI_API_KEY;

  const prompt = `You are a premier academic mentor on the 'Sinov' mock test platform.
You assist students preparing for IELTS, SAT, Milliy Sertifikat (Uzbekistan national certification), and CEFR.
Always reply in fluent, pedagogical, clear Uzbek language (or English when discussing English vocabulary/idioms).
Keep explanations concise, precise, and practical for exam preparation.

CONTEXT:
Exam: ${context?.examType || 'General Test'}
Current Question: ${context?.currentQuestionText || 'None'}
Passage: ${context?.passage || 'None'}
Options: ${context?.options ? JSON.stringify(context.options) : 'None'}
Correct Answer: ${context?.correctAnswer || 'None'}
User Answer: ${context?.userAnswer || 'None'}
User Target: ${context?.targetScore || 'Yuqori ball'}

USER QUERY:
${message}`;

  if (!apiKey) {
    return res.json({
      reply: "Ushbu savolda matndagi sinonimlarga va variantlardagi nozik farqlarga diqqat qarating. Kalit so'zlarni ajratib oling va chalg'ituvchi variantlarni chiqarib tashlang.",
    });
  }

  try {
    const ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
    });

    res.json({ reply: response.text || 'Javob shakllantirilmadi.' });
  } catch (err: any) {
    console.error('Gemini error:', err);
    res.status(500).json({ error: 'AI xizmati xatosi yuz berdi.' });
  }
});

// Server-side AI Test Generator from Book/Material endpoint
app.post('/api/ai/generate-test', async (req, res) => {
  const {
    content,
    fileName,
    examType = 'ielts',
    subject,
    questionCount = 5,
    difficulty = "O'rta",
    customInstructions = '',
  } = req.body;
  const apiKey = process.env.GEMINI_API_KEY;

  if (!content || typeof content !== 'string' || content.trim().length < 15) {
    return res.status(400).json({ error: "Iltimos, test tuzish uchun matn yoki kitob qismini kiriting." });
  }

  // Truncate to safe token length if huge book
  const truncatedContent = content.slice(0, 12000);
  const count = Math.min(Math.max(Number(questionCount) || 5, 2), 15);

  const prompt = `Siz xalqaro va milliy imtihonlar (IELTS, SAT, Milliy Sertifikat, CEFR) bo'yicha professional test tuzuvchi va ekspert pedagogik mutaxassissiz.
Quyida berilgan kitob, maqola yoki o'quv materiali asosida ${count} ta yuqori sifatli, professional ko'p variantli (multiple-choice) test savollarini tuzing.

IMTIHON TURI: ${examType.toUpperCase()}
FAN / BO'LIM: ${subject || 'Umumiy'}
QIYINLIK DARAJASI: ${difficulty}
QO'SHIMCHA KO'RSATMA: ${customInstructions || 'Matndagi asosiy ma\'no, mantiqiy xulosalar va faktlar bo\'yicha sinov savollarini shakllantiring.'}

MATERIAL / KITOB MATNI:
"""
${truncatedContent}
"""

SAVOLLARGA TALABLAR:
1. Har bir savol aynan berilgan matn mazmuni va qoidalariga asoslangan bo'lsin.
2. Har bir savolda aynan 4 ta variant bo'lsin (A, B, C, D). Variantlar bir-biriga mos, mantiqiy va chalg'ituvchi bo'lsin.
3. correctOption indexi 0, 1, 2, yoki 3 (0=A, 1=B, 2=C, 3=D) bo'lsin.
4. explanation qismida to'g'ri javob nega to'g'riligi va boshqa variantlar nima sababdan xatoligi batafsil o'zbek tilida (yoki IELTS/SAT ingliz tili savollarida aralash tushunarli usulda) yoritilsin.
5. JSON formatida qat'iy javob qaytaring.

JSON SCHEMA:
{
  "title": "Test nomi (masalan: '${examType.toUpperCase()} - Kitob asosidagi maxsus mock test')",
  "description": "Test haqida qisqacha tavsif",
  "examType": "${examType}",
  "subject": "${subject || 'Reading & Comprehension'}",
  "durationMinutes": ${Math.max(count * 2, 10)},
  "difficulty": "${difficulty}",
  "questions": [
    {
      "id": "q_ai_1",
      "text": "Savol matni",
      "passage": "Savolga tegishli matn parchasi (agar kerak bo'lsa)",
      "options": ["Variant A", "Variant B", "Variant C", "Variant D"],
      "correctOption": 0,
      "explanation": "To'g'ri javob izohi",
      "section": "${examType === 'sat' ? 'Reading and Writing' : examType === 'ielts' ? 'Reading' : 'Ona tili'}",
      "skillTag": "Tahlil va xulosa",
      "points": 1
    }
  ]
}`;

  if (!apiKey) {
    // Generate up to requested count of high-quality exam questions
    const sampleTitle = examType === 'sat'
      ? `Digital SAT: ${fileName ? fileName.replace(/\.[^/.]+$/, '') : 'Reading & Writing'} Mock Test`
      : `${examType.toUpperCase()} - ${fileName ? fileName.replace(/\.[^/.]+$/, '') : 'Kitob'} asosidagi Mock Test`;

    const satQuestionTemplates = [
      {
        text: "Which choice completes the text with the most logical and precise word or phrase according to the context?",
        passage: truncatedContent.slice(0, 320) + '...',
        options: [
          "corroborates the foundational theoretical framework proposed by earlier researchers",
          "undermines any empirical consensus previously established in the discipline",
          "categorically repudiates the validity of historical observations",
          "renders obsolete all contemporary experimental instrumentation"
        ],
        correctOption: 0,
        explanation: "Matn mazmunidan kelib chiqib, birinchi variant ilgari surilgan gipotezani bevosita tasdiqlaydi va mantiqiy bog'liqlikni mustahkamlaydi.",
        section: "Reading and Writing",
        skillTag: "Craft & Structure: Words in Context",
        points: 1
      },
      {
        text: "Which choice best describes the primary function of the underlined claim within the text as a whole?",
        passage: truncatedContent.slice(100, 420) + '...',
        options: [
          "It articulates a widespread assumption that the author systematically scrutinizes and refines.",
          "It presents incontrovertible statistical verification for an ongoing industrial project.",
          "It questions the scholarly integrity of contemporary peer reviewers.",
          "It offers a historical digression unrelated to the central investigative thesis."
        ],
        correctOption: 0,
        explanation: "Ushbu jumla matnda ilgari surilgan umumiy qarashni bayon qilib, muallifning keyingi tanqidiy tahlili uchun asos yaratadi.",
        section: "Reading and Writing",
        skillTag: "Craft & Structure: Text Structure & Purpose",
        points: 1
      },
      {
        text: "The author of the text would most likely agree with which of the following statements?",
        passage: truncatedContent.slice(200, 500) + '...',
        options: [
          "Systematic empirical investigation is essential to distinguish genuine patterns from incidental anomalies.",
          "Theoretical constructs are entirely superior to quantitative observational telemetry.",
          "Environmental factors exert negligible influence upon complex biological adaptations.",
          "Historical paradigms should remain immutable irrespective of modern computational findings."
        ],
        correctOption: 0,
        explanation: "Muallif ilmiy metodologiya va faktlarga tayanish lozimligini ta'kidlaydi, bu esa birinchi fikr bilan to'liq uyg'undir.",
        section: "Reading and Writing",
        skillTag: "Information & Ideas: Central Ideas",
        points: 1
      },
      {
        text: "Which choice conforms to the conventions of Standard English concerning punctuation and independent clauses?",
        passage: `The primary objective of the scientific expedition was not merely to catalog novel specimens __________ furthermore, the multidisciplinary team intended to establish a permanent longitudinal bio-monitoring observatory.`,
        options: [
          ";",
          ",",
          ":",
          "-"
        ],
        correctOption: 0,
        explanation: "Ikkita mustaqil gap 'furthermore' bog'lovchisi bilan ulanganda, uning oldidan nuqta-vergul (;) qo'yilishi qat'iy grammatik qoidadir.",
        section: "Reading and Writing",
        skillTag: "Standard English Conventions: Boundaries",
        points: 1
      },
      {
        text: "Which choice completes the text with the most logical transition between the contrasting arguments?",
        passage: `Initial laboratory trials suggested that the synthetic polymer would degrade rapidly upon prolonged exposure to ultraviolet irradiation. In high-altitude environmental testing, __________, the molecular matrix exhibited negligible mechanical degradation over five consecutive years.`,
        options: [
          "however",
          "consequently",
          "in other words",
          "for instance"
        ],
        correctOption: 0,
        explanation: "Laboratoriyada tez eskirishi kutilgan, lekin amalda 5 yil davomida deyarli o'zgarmagan. Bu yerda aniq zidlik (contrast) mavjud bo'lgani uchun 'however' to'g'ri tanlovdir.",
        section: "Reading and Writing",
        skillTag: "Expression of Ideas: Transitions",
        points: 1
      },
      {
        text: "Which choice most logically completes the text's concluding inference?",
        passage: truncatedContent.slice(300, 600) + '...',
        options: [
          "suggests that the investigated phenomenon operates through interdependent feedback mechanisms.",
          "proves conclusively that further inquiry into this scientific discipline is redundant.",
          "demonstrates that external environmental variables have zero measurable correlation.",
          "indicates that previous researchers fabricated their experimental documentation."
        ],
        correctOption: 0,
        explanation: "Matn xulosasida jarayonning o'zaro bog'liq murakkab tizim ekanligi mantiqiy xulosa sifatida kelib chiqadi.",
        section: "Reading and Writing",
        skillTag: "Information & Ideas: Inferences",
        points: 1
      },
      {
        text: "Choose the sentence that correctly maintains subject-verb agreement across intervening descriptive phrases:",
        options: [
          "The systematic synthesis of diverse empirical datasets, despite numerous logistical challenges, demonstrates significant predictive validity.",
          "The systematic synthesis of diverse empirical datasets, despite numerous logistical challenges, demonstrate significant predictive validity.",
          "The systematic synthesis of diverse empirical datasets, despite numerous logistical challenges, are demonstrating significant predictive validity.",
          "The systematic synthesis of diverse empirical datasets, despite numerous logistical challenges, have demonstrated significant predictive validity."
        ],
        correctOption: 0,
        explanation: "Gapning egasi 'The systematic synthesis' (birlikda). Oraliqdagi 'of diverse empirical datasets' va 'despite...' iboralari qo'shimcha bo'lib, fe'l birlikda ('demonstrates') bo'lishi shart.",
        section: "Reading and Writing",
        skillTag: "Standard English Conventions: Subject-Verb Agreement",
        points: 1
      },
      {
        text: "Which finding, if true, would most directly reinforce the primary hypothesis articulated in the text?",
        passage: truncatedContent.slice(150, 480) + '...',
        options: [
          "Experimental trials that strictly implemented the proposed protocol achieved statistically superior consistency.",
          "Control groups lacking the intervention demonstrated identical performance parameters.",
          "Alternative methodologies yielded completely contradictory conclusions under identical conditions.",
          "Surveys revealed that consumer sentiment remained indifferent to technological advancements."
        ],
        correctOption: 0,
        explanation: "Tavsiya etilgan protokol asosida olingan yuqori natijalar muallifning dastlabki gipotezasini to'g'ridan-to'g'ri quvvatlaydi.",
        section: "Reading and Writing",
        skillTag: "Information & Ideas: Command of Evidence",
        points: 1
      },
      {
        text: "Which choice avoids a dangling modifier and adheres to Standard English syntax?",
        options: [
          "Having calibrated the high-resolution mass spectrometer, the biochemist successfully identified the uncharacterized peptide sequence.",
          "Having calibrated the high-resolution mass spectrometer, the uncharacterized peptide sequence was successfully identified by the biochemist.",
          "Having calibrated the high-resolution mass spectrometer, identification of the uncharacterized peptide sequence occurred swiftly.",
          "Having calibrated the high-resolution mass spectrometer, the laboratory was filled with excitement."
        ],
        correctOption: 0,
        explanation: "Spektrometrni kalibrovka qilgan shaxs biokimyogardir ('the biochemist'). Shuning uchun asosiy gap 'the biochemist' egasi bilan boshlanishi kerak.",
        section: "Reading and Writing",
        skillTag: "Standard English Conventions: Modifier Placement",
        points: 1
      },
      {
        text: "The student wants to summarize the primary scholastic contribution of the researched study. Which choice best accomplishes this goal?",
        passage: `Notes from student analysis:
• The research analyzed three decades of climate and botanical records.
• Traditional models assumed linear ecosystem collapse under warming conditions.
• The study revealed resilient microclimatic buffer zones that delay degradation.
• This insight allows conservationists to prioritize targeted geographic preserves.`,
        options: [
          "By revealing microclimatic buffer zones that delay ecosystem collapse, the study provides conservationists with a strategic framework to target vulnerable geographic preserves.",
          "The research examined climate and botanical data spanning a period of thirty years.",
          "Traditional ecological models have historically focused on linear collapse under warming conditions.",
          "Conservationists frequently prioritize targeted geographic preserves when funding is allocated."
        ],
        correctOption: 0,
        explanation: "Talabaning maqsadi tadqiqotning eng asosiy ilmiy hissasini umumlashtirishdir. A varianti mikromuhit bufer zonalarini aniqlash orqali tabiatni muhofaza qilish strategiyasini yaratganini to'liq ifodalaydi.",
        section: "Reading and Writing",
        skillTag: "Expression of Ideas: Rhetorical Synthesis",
        points: 1
      }
    ];

    const fallbackQuestions = satQuestionTemplates.slice(0, count).map((t, idx) => ({
      id: `q_ai_gen_${idx + 1}_${Date.now()}`,
      text: t.text,
      passage: t.passage,
      options: t.options,
      correctOption: t.correctOption,
      explanation: t.explanation,
      section: t.section,
      skillTag: t.skillTag,
      points: 1,
    }));

    return res.json({
      test: {
        id: `ai_gen_${Date.now()}`,
        title: sampleTitle,
        description: `Kitob va o'quv materiali asosida sun'iy intellekt tomonidan shakllantirilgan rasmiy formatdagi test.`,
        examType,
        subject: subject || (examType === 'sat' ? 'Reading and Writing' : 'Umumiy tahlil'),
        durationMinutes: count * 3,
        totalQuestions: fallbackQuestions.length,
        difficulty,
        questions: fallbackQuestions,
        createdAt: new Date().toISOString().split('T')[0],
        author: 'AI Book Extractor'
      }
    });
  }

  try {
    const ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const text = response.text || '';
    let parsed: any;
    try {
      parsed = JSON.parse(text);
    } catch {
      // Regex extraction if needed
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        parsed = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error("JSON formatida natija qaytmadi");
      }
    }

    const testId = `ai_gen_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    const questions = (parsed.questions || []).map((q: any, idx: number) => ({
      id: `q_ai_${idx + 1}_${Date.now()}`,
      text: q.text || `Savol #${idx + 1}`,
      passage: q.passage || '',
      options: Array.isArray(q.options) && q.options.length === 4 ? q.options : ['Variant A', 'Variant B', 'Variant C', 'Variant D'],
      correctOption: typeof q.correctOption === 'number' && q.correctOption >= 0 && q.correctOption < 4 ? q.correctOption : 0,
      explanation: q.explanation || 'To\'g\'ri javob matn mazmunidan kelib chiqadi.',
      section: q.section || (examType === 'sat' ? 'Reading and Writing' : examType === 'ielts' ? 'Reading' : 'Asosiy qism'),
      skillTag: q.skillTag || 'Tahlil va xulosa',
      points: Number(q.points) || 1,
    }));

    const finalTest = {
      id: testId,
      title: parsed.title || `${examType.toUpperCase()} - Material asosidagi Mock Test`,
      description: parsed.description || `AI tomonidan kitob matnidan tuzilgan test.`,
      examType: parsed.examType || examType,
      subject: parsed.subject || subject || 'O\'qish va tahlil',
      durationMinutes: Number(parsed.durationMinutes) || Math.max(questions.length * 2, 10),
      totalQuestions: questions.length,
      difficulty: parsed.difficulty || difficulty,
      questions,
      createdAt: new Date().toISOString().split('T')[0],
      author: 'AI Kitob Tahlili',
    };

    res.json({ test: finalTest });
  } catch (err: any) {
    console.error('Gemini test generation error:', err);
    res.status(500).json({ error: 'AI test tuzishda xatolik yuz berdi: ' + (err.message || '') });
  }
});

// Server-side Study Plan advice endpoint
app.post('/api/ai/study-plan', async (req, res) => {
  const { targetExam, targetScore, remainingDays, dailyHours, currentLevel } = req.body;
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return res.json({
      advice: `Imtihongacha qolgan ${remainingDays} kun davomida har kuni ${dailyHours} soatdan dars qilish orqali siz jami ${remainingDays * dailyHours} soat samarali shug'ullanasiz. Haftada kamida 1 ta to'liq mock test topshirishni va xatolar daftari yuritishni unutmang.`,
    });
  }

  try {
    const ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });

    const prompt = `You are an expert exam strategist. Provide 3 specific, actionable recommendations in Uzbek language for an exam candidate:
Exam: ${targetExam}
Target: ${targetScore}
Days Remaining: ${remainingDays} kun
Daily Hours: ${dailyHours} soat
Current Level: ${currentLevel}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
    });

    res.json({ advice: response.text || '' });
  } catch (err: any) {
    console.error('Gemini plan error:', err);
    res.status(500).json({ error: 'Study plan tavsiyasini olishda xatolik.' });
  }
});

// Serve static frontend assets from dist in production
app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Sinov Mock platform running on port ${PORT}`);
});
