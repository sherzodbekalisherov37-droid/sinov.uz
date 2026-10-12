import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, Plugin } from 'vite';
import { GoogleGenAI } from '@google/genai';

function geminiServerPlugin(): Plugin {
  return {
    name: 'gemini-server-plugin',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = req.url || '';

        if (!url.startsWith('/api/ai/')) {
          return next();
        }

        // Helper to parse JSON body
        const getBody = () =>
          new Promise<any>((resolve) => {
            let data = '';
            req.on('data', (chunk) => {
              data += chunk;
            });
            req.on('end', () => {
              try {
                resolve(JSON.parse(data || '{}'));
              } catch {
                resolve({});
              }
            });
          });

        res.setHeader('Content-Type', 'application/json');

        const apiKey = process.env.GEMINI_API_KEY;

        try {
          if (url === '/api/ai/ask' && req.method === 'POST') {
            const body = await getBody();
            const { message, context } = body;

            let prompt = `You are an elite academic tutor and exam coach on the 'Sinov' mock test platform.
You assist students preparing for IELTS, SAT, Milliy Sertifikat (Uzbekistan national exam), and CEFR tests.
Answer in clear, highly pedagogical, polite Uzbek language (or English if the user asked in English or wants vocabulary/idiom explanations).
Be concise, clear, and focused on exam tactics, grammatical precision, or mathematical formulas.

CONTEXT:
Exam: ${context?.examType || 'General Test'}
Current Question: ${context?.currentQuestionText || 'None'}
Passage: ${context?.passage || 'None'}
Options: ${context?.options ? JSON.stringify(context.options) : 'None'}
Correct Answer: ${context?.correctAnswer || 'None'}
User Selected: ${context?.userAnswer || 'None'}
Target Goal: ${context?.targetScore || 'Yuqori ball'}

USER QUESTION:
${message}
`;

            if (apiKey) {
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

              return res.end(JSON.stringify({ reply: response.text || 'Javob shakllantirilmadi.' }));
            } else {
              return res.end(
                JSON.stringify({
                  reply:
                    "Savolingiz qabul qilindi! Ushbu savol bo'yicha asosiy maslahat: variantlar ichidagi kalit so'zlarga (keywords) va matndagi ma'nodosh (paraphrased) so'zlarga diqqat qiling. Agar variantda 'always', 'never', 'completely' kabi o'ta qat'iy so'zlar bo'lsa, ularni ehtiyotkorlik bilan tekshiring.",
                })
              );
            }
          }

          if (url === '/api/ai/study-plan' && req.method === 'POST') {
            const body = await getBody();
            const { targetExam, targetScore, remainingDays, dailyHours, currentLevel } = body;

            const prompt = `You are an expert exam strategist. Create a compact, highly actionable study recommendation for an exam candidate.
Target Exam: ${targetExam}
Target Score: ${targetScore}
Days Remaining: ${remainingDays} kun
Daily Study Hours: ${dailyHours} soat
Current Level: ${currentLevel}

Provide 3 targeted, high-impact strategies in Uzbek language. Keep it encouraging, professional, and practical.`;

            if (apiKey) {
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

              return res.end(JSON.stringify({ advice: response.text || '' }));
            } else {
              return res.end(
                JSON.stringify({
                  advice: `Imtihongacha qolgan ${remainingDays} kun davomida har kuni ${dailyHours} soatdan dars qilish orqali siz jami ${remainingDays * dailyHours} soat samarali shug'ullanasiz. Har haftada kamida 1 ta to'liq mock test topshirishni va xatolar daftari yuritishni unutmang.`,
                })
              );
            }
          }

          if (url === '/api/ai/generate-test' && req.method === 'POST') {
            const body = await getBody();
            const {
              content,
              fileName,
              examType = 'ielts',
              subject,
              questionCount = 5,
              difficulty = "O'rta",
              customInstructions = '',
            } = body;

            if (!content || typeof content !== 'string' || content.trim().length < 15) {
              res.statusCode = 400;
              return res.end(JSON.stringify({ error: 'Iltimos, test tuzish uchun matn yoki kitob qismini kiriting.' }));
            }

            const truncatedContent = content.slice(0, 12000);
            const count = Math.min(Math.max(Number(questionCount) || 5, 2), 15);

            const prompt = `Siz xalqaro va milliy imtihonlar (IELTS, SAT, Milliy Sertifikat, CEFR) bo'yicha professional test tuzuvchi va ekspert pedagogik mutaxassissiz.
Quyida berilgan kitob, maqola yoki o'quv materiali asosida ${count} ta yuqori sifatli, professional ko'p variantli (multiple-choice) test savollarini tuzing.

IMTIHON TURI: ${String(examType).toUpperCase()}
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
4. explanation qismida to'g'ri javob nega to'g'riligi va boshqa variantlar nima sababdan xatoligi batafsil o'zbek tilida yoritilsin.
5. JSON formatida qat'iy javob qaytaring.

JSON SCHEMA:
{
  "title": "${String(examType).toUpperCase()} - ${fileName ? fileName.replace(/\\.[^/.]+$/, '') : 'Kitob'} asosidagi Mock Test",
  "description": "AI tomonidan kitob tahlili asosida shakllantirilgan diagnostik test.",
  "examType": "${examType}",
  "subject": "${subject || 'Reading & Comprehension'}",
  "durationMinutes": ${Math.max(count * 2, 10)},
  "difficulty": "${difficulty}",
  "questions": [
    {
      "id": "q_ai_1",
      "text": "Savol matni",
      "passage": "Savolga tegishli matn parchasi",
      "options": ["Variant A", "Variant B", "Variant C", "Variant D"],
      "correctOption": 0,
      "explanation": "To'g'ri javob izohi",
      "section": "${examType === 'sat' ? 'Reading and Writing' : examType === 'ielts' ? 'Reading' : 'Ona tili'}",
      "skillTag": "Tahlil va xulosa",
      "points": 1
    }
  ]
}`;

            if (apiKey) {
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
                const jsonMatch = text.match(/\\{[\\s\\S]*\\}/);
                if (jsonMatch) {
                  parsed = JSON.parse(jsonMatch[0]);
                } else {
                  throw new Error('JSON formatida natija olinmadi');
                }
              }

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
                id: `ai_gen_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
                title: parsed.title || `${String(examType).toUpperCase()} - Material asosidagi Mock Test`,
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

              return res.end(JSON.stringify({ test: finalTest }));
            } else {
              // Fallback demo mock
              const sampleTitle = `${String(examType).toUpperCase()} - ${fileName ? fileName.replace(/\\.[^/.]+$/, '') : 'Kitob'} asosidagi Mock Test`;
              const fallbackQuestions = [
                {
                  id: 'q_gen_1',
                  text: `Ushbu keltirilgan materialdagi asosiy g'oya va muallifning birlamchi xulosasi qaysi variantda to'g'ri aks etgan?`,
                  passage: truncatedContent.slice(0, 300) + '...',
                  options: [
                    "Matnda ilgari surilgan asosiy tushuncha va dalillar o'zaro bog'liq tizimni ifodalaydi",
                    "Mavzu faqat bitta tor yo'nalishdagi cheklangan hodisani bayon qiladi",
                    "Keltirilgan faktlar faqatgina tarixiy qiyos uchun keltirilgan bo'lib, amaliy ahamiyatga ega emas",
                    "Muallif berilgan hodisaning kelajakdagi rivojiga nisbatan salbiy munosabatda"
                  ],
                  correctOption: 0,
                  explanation: "Matn tahliliga ko'ra, asosiy diqqat o'rganilayotgan hodisaning tizimli xususiyatlari va mantiqiy bog'liqligiga qaratilgan.",
                  section: examType === 'sat' ? 'Reading and Writing' : examType === 'ielts' ? 'Reading' : 'Asosiy qism',
                  skillTag: 'Main Idea & Inference',
                  points: 1
                },
                {
                  id: 'q_gen_2',
                  text: `Matn mazmunidan kelib chiqib, quyidagi ta'kidlardan qaysi biri to'g'ri (True) hisoblanadi?`,
                  passage: truncatedContent.slice(150, 450) + '...',
                  options: [
                    "Muallif ilgari surgan dalillar keltirilgan misollar orqali tasdiqlanadi",
                    "Matnda hech qanday aniq xulosa yoki amaliy tavsiya berilmagan",
                    "Barcha keltirilgan ko'rsatkichlar o'zgarishsiz qolishi kutilmoqda",
                    "Berilgan ma'lumotlar faqatgina umumiy taxminlarga asoslangan"
                  ],
                  correctOption: 0,
                  explanation: "Matndagi keltirilgan misollar bevosita muallif tezisini quvvatlash uchun xizmat qiladi.",
                  section: examType === 'sat' ? 'Evidence-based Reading' : examType === 'ielts' ? 'Reading' : 'Ona tili',
                  skillTag: 'Detail Analysis',
                  points: 1
                },
                {
                  id: 'q_gen_3',
                  text: `Ushbu materialdagi ma'lumotlar asosida qaysi savolga to'liq javob topish mumkin?`,
                  passage: truncatedContent.slice(0, 250) + '...',
                  options: [
                    "Ko'rib chiqilayotgan jarayonning asosiy tamoyillari nimalardan iborat?",
                    "Jarayonning barcha moliyaviy xarajatlari qancha miqdorni tashkil etadi?",
                    "Ushbu sohaning 50 yildan keyingi to'liq bashorati qanday bo'ladi?",
                    "Hodisaga daxldor barcha shaxslarning to'liq biografiyasi nima?"
                  ],
                  correctOption: 0,
                  explanation: "Matnda aynan jarayonning tamoyillari va asosiy xususiyatlari bayon etilgan bo'lib, qolgan variantlardagi ma'lumotlar matnda yo'q.",
                  section: 'Reading',
                  skillTag: 'Comprehension',
                  points: 1
                }
              ];

              return res.end(
                JSON.stringify({
                  test: {
                    id: `ai_gen_${Date.now()}`,
                    title: sampleTitle,
                    description: `Sun'iy intellekt tomonidan yuklangan material tahlili asosida shakllantirilgan diagnostik test.`,
                    examType,
                    subject: subject || 'Kitob tahlili',
                    durationMinutes: count * 3,
                    totalQuestions: fallbackQuestions.length,
                    difficulty,
                    questions: fallbackQuestions,
                    createdAt: new Date().toISOString().split('T')[0],
                    author: 'AI Book Extractor'
                  }
                })
              );
            }
          }

          res.statusCode = 404;
          return res.end(JSON.stringify({ error: 'Endpoint not found' }));
        } catch (err: any) {
          console.error('Server AI error:', err);
          res.statusCode = 500;
          return res.end(JSON.stringify({ error: err.message || 'AI xizmati vaqtincha band' }));
        }
      });
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), geminiServerPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
