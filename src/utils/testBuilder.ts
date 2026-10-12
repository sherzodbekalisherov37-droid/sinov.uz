import { ExamConfig, ExamType, MockTest, Question, MistakeItem } from '../types';

export function buildConfiguredTest(
  config: ExamConfig,
  allQuestions: Question[],
  userMistakes: MistakeItem[] = []
): MockTest {
  const { examType, subject, topic, difficulty, questionCount, durationMinutes, mode } = config;

  // 1. If mode is mistakes_only, prioritize questions user failed previously
  if (mode === 'mistakes_only') {
    let mistakeQuestions = userMistakes
      .filter((m) => m.question.examType === examType)
      .map((m) => m.question);

    if (subject) {
      mistakeQuestions = mistakeQuestions.filter(
        (q) => !q.subject || q.subject.toLowerCase() === subject.toLowerCase()
      );
    }

    // Deduplicate
    const uniqueMistakes = Array.from(new Map(mistakeQuestions.map((q) => [q.id, q])).values());

    if (uniqueMistakes.length > 0) {
      const selected = uniqueMistakes.slice(0, questionCount);
      return {
        id: `mistake_test_${Date.now()}`,
        title: `${getExamLabel(examType)}: Xatolar ustida ishlash testi`,
        examType,
        subject: subject || 'Barcha fanlar',
        description: `Oldingi testlarda xato qilingan ${selected.length} ta savol bo'yicha qayta mustahkamlash sinovi.`,
        durationMinutes: Math.max(10, Math.round(selected.length * 1.5)),
        totalQuestions: selected.length,
        difficulty: 'Murakkab',
        questions: selected,
        createdAt: new Date().toISOString().split('T')[0],
        author: 'Xatolar Tizimi',
        tags: ['mistake-practice', examType],
      };
    }
  }

  // 2. Filter base question pool
  let pool = allQuestions.filter((q) => q.examType === examType);

  if (subject && subject !== 'all') {
    pool = pool.filter((q) => !q.subject || q.subject.toLowerCase().includes(subject.toLowerCase()));
  }

  if (topic && topic !== 'all') {
    pool = pool.filter((q) => q.topic && q.topic.toLowerCase().includes(topic.toLowerCase()));
  }

  if (difficulty && difficulty !== 'all') {
    pool = pool.filter((q) => q.difficulty === difficulty);
  }

  // If pool is too small, relax filters gracefully so user gets a valid test
  if (pool.length < questionCount) {
    const fallback = allQuestions.filter((q) => q.examType === examType);
    pool = [...pool, ...fallback.filter((f) => !pool.some((p) => p.id === f.id))];
  }

  if (pool.length === 0) {
    pool = allQuestions; // Ultimate fallback
  }

  // 3. Balanced Random Selection Algorithm
  let selectedQuestions: Question[] = [];

  if (mode === 'random' || mode === 'standard' || mode === 'topic_drill') {
    // Group by topic to balance representation
    const topicMap = new Map<string, Question[]>();
    pool.forEach((q) => {
      const t = q.topic || 'Umumiy';
      if (!topicMap.has(t)) topicMap.set(t, []);
      topicMap.get(t)!.push(q);
    });

    const topics = Array.from(topicMap.keys());
    let tIdx = 0;
    const shuffledPool = [...pool].sort(() => Math.random() - 0.5);

    // Pick evenly across topics
    while (selectedQuestions.length < questionCount && shuffledPool.length > 0) {
      const targetTopic = topics[tIdx % topics.length];
      const topicQuestions = topicMap.get(targetTopic) || [];
      const candidate = topicQuestions.pop() || shuffledPool.pop();
      if (candidate && !selectedQuestions.some((s) => s.id === candidate.id)) {
        selectedQuestions.push(candidate);
      }
      tIdx++;
      if (shuffledPool.length === 0 && selectedQuestions.length < questionCount) {
        // If question count > unique pool, duplicate with new ID
        const dup = { ...pool[selectedQuestions.length % pool.length], id: `q_rnd_${Date.now()}_${selectedQuestions.length}` };
        selectedQuestions.push(dup);
      }
    }
  } else {
    selectedQuestions = pool.slice(0, questionCount);
  }

  const examLabel = getExamLabel(examType);
  const subjectLabel = subject ? ` - ${subject}` : '';

  return {
    id: `custom_test_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    title: `${examLabel}${subjectLabel} Mock Test`,
    examType,
    subject: subject || 'Asosiy yo\'nalish',
    topic: topic || 'Aralash mavzular',
    description: `Foydalanuvchi parametri bo'yicha shakllantirilgan imtihon sinovi. ${selectedQuestions.length} ta savol, ${durationMinutes} daqiqa.`,
    durationMinutes,
    totalQuestions: selectedQuestions.length,
    difficulty: (difficulty && difficulty !== 'all' ? difficulty : 'O\'rta') as any,
    questions: selectedQuestions,
    createdAt: new Date().toISOString().split('T')[0],
    author: 'Sinov Platformasi',
    isRandomGenerated: true,
  };
}

export function getExamLabel(type: ExamType): string {
  switch (type) {
    case 'milliy':
      return 'Milliy Sertifikat';
    case 'sat':
      return 'Digital SAT';
    case 'ielts':
      return 'IELTS Mock';
    case 'cefr':
      return 'CEFR Multi-Level';
    default:
      return 'Imtihon';
  }
}
