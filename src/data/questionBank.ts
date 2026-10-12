import { Question } from '../types';

export const INITIAL_QUESTION_BANK: Question[] = [
  // ==========================================
  // MILLIY SERTIFIKAT - MATEMATIKA
  // ==========================================
  {
    id: 'q_milliy_math_1',
    examType: 'milliy',
    subject: 'Matematika',
    topic: 'Algebra & Tenglamalar',
    difficulty: 'Murakkab',
    questionType: 'multiple_choice',
    text: "Tenglamaning haqiqiy ildizlari yig'indisini toping: log₂(x² - 3x) = 2",
    formula: "log₂(x² - 3x) = 2",
    options: ['3', '4', '-1', 'Ildizlari mavjud emas'],
    correctOption: 0,
    explanation: "x² - 3x = 2² => x² - 3x - 4 = 0. Viyet teoremasiga ko'ra ildizlar yig'indisi x₁ + x₂ = 3. Ildizlar 4 va -1, har ikkisi aniqlanish sohasiga (x² - 3x > 0) tushadi. Demak, yig'indi: 3.",
    section: 'Algebra',
    skillTag: 'Logarifmik tenglama',
    points: 1,
    timeLimitSeconds: 120,
    tags: ['logarifm', 'viyet', 'algebra'],
    source: "O'zbekiston Bilimni Baholash Agentligi (BBA) namunaviy varianti",
    sourceYear: '2026',
    isOfficialResource: true
  },
  {
    id: 'q_milliy_math_2',
    examType: 'milliy',
    subject: 'Matematika',
    topic: 'Geometriya',
    difficulty: 'O\'rta',
    questionType: 'numeric',
    text: "To'g'ri burchakli uchburchakning katetlari 6 cm va 8 cm ga teng. Gipotenuzaga tushirilgan balandlik uzunligini (cm) son qiymatini kiriting:",
    correctTextAnswer: '4.8',
    explanation: "Gipotenuza c = √(6² + 8²) = 10 cm. Uchburchak yuzi S = (a * b) / 2 = (c * h) / 2 => h = (6 * 8) / 10 = 4.8 cm.",
    section: 'Geometriya',
    skillTag: 'Planimetriya',
    points: 1,
    timeLimitSeconds: 90,
    tags: ['uchburchak', 'pifagor', 'balandlik'],
    source: 'Milliy sertifikat diagnostika bazasi',
    sourceYear: '2025',
    isOfficialResource: true
  },
  {
    id: 'q_milliy_math_3',
    examType: 'milliy',
    subject: 'Matematika',
    topic: 'Hosila & Matematik analiz',
    difficulty: 'Murakkab',
    questionType: 'multiple_choice',
    text: "f(x) = x³ - 3x² + 5 funksiyaning [0; 3] oraliqdagi eng katta qiymatini toping:",
    formula: "f(x) = x³ - 3x² + 5, x ∈ [0; 3]",
    options: ['5', '9', '1', '4'],
    correctOption: 0,
    explanation: "Hosila: f'(x) = 3x² - 6x = 0 => 3x(x - 2) = 0 => x = 0, x = 2. Qiymatlarni hisoblaymiz: f(0) = 5, f(2) = 8 - 12 + 5 = 1, f(3) = 27 - 27 + 5 = 5. Eng katta qiymat: 5.",
    section: 'Matematik analiz',
    skillTag: 'Funksiyaning ekstremumlari',
    points: 1,
    timeLimitSeconds: 120,
    tags: ['hosila', 'ekstremum', 'analiz'],
    source: 'Davlat Imtihon Markazi',
    isOfficialResource: true
  },
  {
    id: 'q_milliy_math_4',
    examType: 'milliy',
    subject: 'Matematika',
    topic: 'Trigonometriya',
    difficulty: 'O\'rta',
    questionType: 'multiple_choice',
    text: "Ifodani soddalashtiring: sin(2α) / (1 + cos(2α))",
    formula: "sin(2α) / (1 + cos(2α))",
    options: ['tg(α)', 'ctg(α)', '2sin(α)', 'cos(α)'],
    correctOption: 0,
    explanation: "sin(2α) = 2sin(α)cos(α); 1 + cos(2α) = 2cos²(α). Bo'lganda: (2sin(α)cos(α)) / (2cos²(α)) = sin(α) / cos(α) = tg(α).",
    section: 'Trigonometriya',
    skillTag: 'Ayniyatlar',
    points: 1,
    timeLimitSeconds: 90,
    tags: ['trigonometriya', 'ayniyat'],
    source: 'Milliy sertifikat standarti'
  },

  // ==========================================
  // MILLIY SERTIFIKAT - ONA TILI VA ADABIYOT
  // ==========================================
  {
    id: 'q_milliy_lang_1',
    examType: 'milliy',
    subject: 'Ona tili va adabiyot',
    topic: 'Morfologiya & So\'z yasalishi',
    difficulty: 'Murakkab',
    questionType: 'multiple_choice',
    text: "Quyidagi gapda qatnashgan yasama so'zlar sonini aniqlang: \"Bilimli inson o'zining mehnatsevarligi va do'stona munosabati bilan barchaning hurmatini qozonadi.\"",
    options: [
      "3 ta (bilimli, mehnatsevarligi, do'stona)",
      "4 ta (bilimli, mehnatsevarligi, do'stona, qozonadi)",
      "2 ta (bilimli, do'stona)",
      "5 ta"
    ],
    correctOption: 0,
    explanation: "Yasama so'zlar: 1) bilimli (bil -> bilim -> bilimli), 2) mehnatsevarligi (mehnatsevar + lik), 3) do'stona (do'st + ona). 'Qozonadi' so'zida yangi so'z yasovchi qo'shimcha yo'q. Jami: 3 ta.",
    section: 'Ona tili',
    skillTag: 'Morfologiya',
    points: 1,
    timeLimitSeconds: 90,
    tags: ['yasama so\'z', 'morfologiya', 'qo\'shimchalar'],
    source: 'BBA rasmiy test to\'plami',
    isOfficialResource: true
  },
  {
    id: 'q_milliy_lang_2',
    examType: 'milliy',
    subject: 'Ona tili va adabiyot',
    topic: 'Badiiy san\'atlar',
    difficulty: 'O\'rta',
    questionType: 'multiple_choice',
    passage: "Ne ko'rsam, gar desam ko'rganlarimni el hisob etmas,\nQaro baxtim kibi har dam firoqingda qaro bo'ldim.",
    text: "Ushbu baytda qaysi badiiy san'atlar mahorat bilan qo'llangan?",
    options: [
      "Tashbeh (o'xshatish) va Tazod (zidlash)",
      "Tashbeh va Iyhom (ko'p ma'nolilik)",
      "Talmeh (tarixiy ism) va Husni ta'lil",
      "Ruju va Musajja"
    ],
    correctOption: 0,
    explanation: "'Qaro baxtim kibi' — tashbeh (o'xshatish vositasi: kibi). Ayriliqdagi qora kunlar va baxtsizlik o'rtasidagi tazod keltirilgan.",
    section: 'Adabiyot',
    skillTag: 'Badiiy san\'at',
    points: 1,
    tags: ['adabiyot', 'mumtoz', 'tashbeh']
  },
  {
    id: 'q_milliy_lang_3',
    examType: 'milliy',
    subject: 'Ona tili va adabiyot',
    topic: 'Mumtoz adabiyot',
    difficulty: 'Murakkab',
    questionType: 'multiple_choice',
    text: "Alisher Navoiyning 'Xamsa' tarkibidagi qaysi dostonida axloqiy-falsafiy masalalar 20 ta maqolat va 20 ta hikoyat tarzida bayon qilingan?",
    options: [
      'Farhod va Shirin',
      'Hayrat ul-abror (Yaxshi kishilarning hayrati)',
      'Layli va Majnun',
      'Saddi Iskandariy'
    ],
    correctOption: 1,
    explanation: "'Hayrat ul-abror' dostoni Navoiy Xamsasining debochasi bo'lib, 20 maqolat va 20 hikoyatdan iborat axloqiy-ta'limiy asardir.",
    section: 'Adabiyot',
    skillTag: 'Xamsa',
    points: 1,
    tags: ['navoiy', 'xamsa', 'adabiyot']
  },

  // ==========================================
  // MILLIY SERTIFIKAT - FIZIKA
  // ==========================================
  {
    id: 'q_milliy_phys_1',
    examType: 'milliy',
    subject: 'Fizika',
    topic: 'Mexanika',
    difficulty: 'O\'rta',
    questionType: 'multiple_choice',
    text: "Massasi 2 kg bo'lgan jism gorizontal tekislikda 4 m/s tezlik bilan harakatlanmoqda. Jismning kinetik energiyasini hisoblang (J):",
    formula: "E_k = (m * v²) / 2",
    options: ['16 J', '8 J', '32 J', '64 J'],
    correctOption: 0,
    explanation: "E_k = (m * v²) / 2 = (2 * 4²) / 2 = 16 J.",
    section: 'Mexanika',
    skillTag: 'Energiya',
    points: 1,
    tags: ['kinetik energiya', 'fizika']
  },
  {
    id: 'q_milliy_phys_2',
    examType: 'milliy',
    subject: 'Fizika',
    topic: 'Elektr & Zanjir',
    difficulty: 'O\'rta',
    questionType: 'numeric',
    text: "Qarshiligi 10 Om bo'lgan o'tkazgich uchlaridagi kuchlanish 20 V ga teng. Zanjirdan o'tayotgan tok kuchi necha Amper (A) ga teng?",
    correctTextAnswer: '2',
    explanation: "Om qonuniga ko'ra: I = U / R = 20 V / 10 Om = 2 A.",
    section: 'Elektr',
    skillTag: 'Om qonuni',
    points: 1,
    tags: ['om qonuni', 'tok kuchi']
  },

  // ==========================================
  // MILLIY SERTIFIKAT - TARIX
  // ==========================================
  {
    id: 'q_milliy_hist_1',
    examType: 'milliy',
    subject: 'Tarix',
    topic: "O'zbekiston tarixi",
    difficulty: 'O\'rta',
    questionType: 'multiple_choice',
    text: "Amir Temur qaysi yili mashhur Anqara jangida Usmoniylar sultoni Boyazid Yildirim ustidan g'alaba qozongan?",
    options: ['1402-yil', '1370-yil', '1395-yil', '1405-yil'],
    correctOption: 0,
    explanation: "1402-yil 28-iyulda bo'lib o'tgan Anqara jangida Amir Temur Usmonli sultoni Boyazid I ustidan to'liq g'alaba qozonadi.",
    section: 'Tarix',
    skillTag: 'Temuriylar davri',
    points: 1,
    tags: ['amir temur', 'anqara jangi', 'tarix']
  },

  // ==========================================
  // MILLIY SERTIFIKAT - BIOLOGIYA
  // ==========================================
  {
    id: 'q_milliy_bio_1',
    examType: 'milliy',
    subject: 'Biologiya',
    topic: 'Sitologiya & Hujayra',
    difficulty: 'O\'rta',
    questionType: 'multiple_choice',
    text: "Hujayrada oqsil biosintezi qaysi organoidda amalga oshiriladi?",
    options: ['Ribosomalar', 'Mitoxondriyalar', 'Lizosomalar', 'Goldji apparati'],
    correctOption: 0,
    explanation: "Ribosomalar — hujayraning oqsillar sintezini amalga oshiruvchi asosiy membranasiz organoididir.",
    section: 'Sitologiya',
    skillTag: 'Organoidlar',
    points: 1,
    tags: ['ribosoma', 'oqsil', 'biologiya']
  },

  // ==========================================
  // MILLIY SERTIFIKAT - KIMYO
  // ==========================================
  {
    id: 'q_milliy_chem_1',
    examType: 'milliy',
    subject: 'Kimyo',
    topic: 'Anorganik kimyo',
    difficulty: 'O\'rta',
    questionType: 'multiple_choice',
    text: "Sulfat kislotaning (H₂SO₄) nisbiy molekulyar massasini toping (Ar: H=1, S=32, O=16):",
    options: ['98', '80', '96', '100'],
    correctOption: 0,
    explanation: "Mr(H₂SO₄) = 1*2 + 32 + 16*4 = 2 + 32 + 64 = 98.",
    section: 'Kimyo',
    skillTag: 'Molekulyar massa',
    points: 1,
    tags: ['kimyo', 'massa', 'molekula']
  },

  // ==========================================
  // SAT DIGITAL - READING & WRITING
  // ==========================================
  {
    id: 'q_sat_rw_1',
    examType: 'sat',
    subject: 'Reading and Writing',
    topic: 'Craft & Structure',
    difficulty: 'Murakkab',
    questionType: 'multiple_choice',
    passage: `In 1913, botanist Agnes Arber published 'Herbals: Their Origin and Evolution', tracing the illustrated medical treatises of the Renaissance. While contemporaries viewed herbals merely as quaint artifacts of obsolete pharmacological folklore, Arber treated them as critical epistemological bridge-texts that catalyzed modern observational biology through rigorous botanical engraving.`,
    text: "Which choice best describes the function of the underlined phrase in the text as a whole?",
    options: [
      "It introduces a widely held attitude among earlier scholars that Arber successfully contested and reframed.",
      "It provides empirical data confirming that Renaissance herbalists were scientifically accurate in every diagnosis.",
      "It questions the aesthetic caliber of Renaissance woodcut illustrations.",
      "It argues that Arber's methodology was fundamentally flawed and widely rejected."
    ],
    correctOption: 0,
    explanation: "Matnda zamondoshlarning 'quaint artifacts of obsolete...' tarzidagi yuzaki qarashlari keltirilib, Arber ularni zamonaviy biologiyani boshlab bergan muhim ilmiy ko'prik sifatida ko'rsatgani bayon qilingan.",
    section: 'Reading and Writing',
    skillTag: 'Craft and Structure',
    points: 1,
    tags: ['sat', 'reading', 'craft-and-structure'],
    source: 'Official Digital SAT Educator Question Bank',
    isOfficialResource: true
  },
  {
    id: 'q_sat_rw_2',
    examType: 'sat',
    subject: 'Reading and Writing',
    topic: 'Standard English Conventions',
    difficulty: 'O\'rta',
    questionType: 'multiple_choice',
    text: "Biochemist Katalin Karikó spent decades pursuing messenger RNA therapies despite skepticism from grant reviewers; __________, her persistence laid the foundational architecture for rapid vaccine mobilization during global epidemiological crises.",
    options: ['furthermore', 'ultimately', 'conversely', 'otherwise'],
    correctOption: 1,
    explanation: "'Ultimately' (oxir-oqibat, pirovardida) uzoq yillik qiyinchilik va shubhalardan so'ng erishilgan yakuniy yutuqni ifodalaydi.",
    section: 'Reading and Writing',
    skillTag: 'Transitions',
    points: 1,
    tags: ['sat', 'grammar', 'transitions']
  },
  {
    id: 'q_sat_rw_3',
    examType: 'sat',
    subject: 'Reading and Writing',
    topic: 'Information & Ideas',
    difficulty: 'O\'rta',
    questionType: 'true_false',
    passage: "Microbiome researchers observed that dietary polyphenols significantly boosted the proliferation of Bifidobacterium strains in clinical trial participants, whereas simple sucrose diets induced microbial dysbiosis within 72 hours.",
    text: "Based on the passage, is the following statement accurate: 'Polyphenol intake was associated with beneficial probiotic proliferation in trial participants'?",
    options: ['True', 'False'],
    correctOption: 0,
    explanation: "Matnda aniq keltirilgan: 'dietary polyphenols significantly boosted the proliferation of Bifidobacterium strains' (probiotik shtammlar ko'payishi). Statement to'g'ri (True).",
    section: 'Reading and Writing',
    skillTag: 'Inference',
    points: 1,
    tags: ['sat', 'reading']
  },

  // ==========================================
  // SAT DIGITAL - MATH
  // ==========================================
  {
    id: 'q_sat_math_1',
    examType: 'sat',
    subject: 'Math',
    topic: 'Algebra & Linear Equations',
    difficulty: 'O\'rta',
    questionType: 'numeric',
    text: "If 3x + 2y = 18 and 2x - y = 5, what is the value of 5x + y?",
    formula: "3x + 2y = 18, 2x - y = 5",
    correctTextAnswer: '23',
    explanation: "Ikkala tenglamani qo'shib yuboramiz: (3x + 2y) + (2x - y) = 18 + 5 => 5x + y = 23.",
    section: 'Math',
    skillTag: 'Linear Systems',
    points: 1,
    tags: ['sat-math', 'algebra', 'linear']
  },
  {
    id: 'q_sat_math_2',
    examType: 'sat',
    subject: 'Math',
    topic: 'Advanced Math',
    difficulty: 'Murakkab',
    questionType: 'multiple_choice',
    text: "A quadratic function f(x) = x² - 6x + c has exactly one real root. What is the value of constant c?",
    formula: "f(x) = x² - 6x + c = 0, D = 0",
    options: ['9', '-9', '36', '3'],
    correctOption: 0,
    explanation: "Kvadrat tenglama yagona haqiqiy ildizga ega bo'lishi uchun diskriminant D = b² - 4ac = 0 bo'lishi kerak: (-6)² - 4(1)(c) = 36 - 4c = 0 => c = 9.",
    section: 'Math',
    skillTag: 'Quadratics',
    points: 1,
    tags: ['sat-math', 'quadratics', 'advanced-math']
  },
  {
    id: 'q_sat_math_3',
    examType: 'sat',
    subject: 'Math',
    topic: 'Problem Solving & Data Analysis',
    difficulty: 'O\'rta',
    questionType: 'multiple_choice',
    text: "A specimen population increases by 20% on Monday, and then decreases by 20% on Tuesday. What is the net percentage change in the population from its original size?",
    options: ['0% (No change)', '4% decrease', '4% increase', '2% decrease'],
    correctOption: 1,
    explanation: "Boshlang'ich qiymat 100 deb olinsa: Dushanba kuni 100 * 1.20 = 120. Seshanba kuni 120 * 0.80 = 96. Demak: 100 dan 96 ga tushdi, bu 4% ga kamayish demakdir.",
    section: 'Math',
    skillTag: 'Percentages',
    points: 1,
    tags: ['sat-math', 'percentages']
  },

  // ==========================================
  // IELTS - LISTENING, READING, WRITING, SPEAKING
  // ==========================================
  {
    id: 'q_ielts_listen_1',
    examType: 'ielts',
    subject: 'Listening',
    topic: 'Section 1: Academic Orientation',
    difficulty: 'O\'rta',
    questionType: 'listening',
    audioSimulationUrl: 'https://cdn.example.com/audio/ielts_campus_tour.mp3',
    text: "According to the student orientation advisor in the audio recording, what is the deadline for submitting the library research card registration?",
    options: [
      'Friday by 5:00 PM',
      'Monday morning before lecture begins',
      'At the end of the second academic week',
      'Registration is open throughout the entire semester without deadline'
    ],
    correctOption: 0,
    explanation: "Audio yozuvda 'Please ensure you submit your completed research card registration by Friday at five p.m. sharp' deyiladi. To'g'ri javob: Friday by 5:00 PM.",
    section: 'Listening',
    skillTag: 'Specific Detail Extraction',
    points: 1,
    tags: ['ielts', 'listening', 'academic']
  },
  {
    id: 'q_ielts_read_1',
    examType: 'ielts',
    subject: 'Reading',
    topic: 'Academic Reading Passage',
    difficulty: 'Murakkab',
    questionType: 'reading_passage',
    passage: `The preservation of ancient architectural heritage faces unique dilemmas in the 21st century. In historic silk road centers like Samarkand and Bukhara, restoration architects struggle to reconcile authentic medieval earthen brick techniques with modern earthquake-resilient composites. While traditionalists argue that synthetic binders violate historical veracity, seismic engineers demonstrate that unreinforced historic masonry collapses during moderate tectonic shifts. Recent initiatives in Central Asia propose a hybrid compromise: traditional lime mortars are reinforced with concealed micro-fiber tensile meshes, ensuring visual historical fidelity while safeguarding structural survivability for future generations.`,
    text: "According to the passage, what is the primary benefit of the proposed 'hybrid compromise' in historic restoration?",
    options: [
      'It replaces unreinforced masonry completely with modern glass and reinforced concrete structures.',
      'It satisfies historical visual authenticity while dramatically upgrading structural seismic resistance.',
      'It completely eliminates the necessity for traditional lime mortar and artisanal brickwork.',
      'It reduces the overall financial expense of seismic retrofitting to zero.'
    ],
    correctOption: 1,
    explanation: "Matnda 'ensuring visual historical fidelity while safeguarding structural survivability for future generations' deb aniq ko'rsatilgan, ya'ni tarixiy tashqi ko'rinishni saqlagan holda seysmik chidamlilikni oshiradi.",
    section: 'Reading',
    skillTag: 'Main Idea',
    points: 1,
    tags: ['ielts', 'reading', 'heritage']
  },
  {
    id: 'q_ielts_writing_1',
    examType: 'ielts',
    subject: 'Writing',
    topic: 'Task 2 Essay',
    difficulty: 'Murakkab',
    questionType: 'writing_task',
    text: "Some people believe that artificial intelligence will eliminate most professional white-collar careers in the next decade, while others argue that it will merely automate repetitive chores and create new specialized positions. Discuss both views and give your own opinion.",
    passage: "You should write at least 250 words. Provide relevant examples from your own knowledge or experience. Support your argument with logical cohesion and paragraphing.",
    explanation: "High Band (7.5 - 9.0) insho 4 ta asosiy mezonga javob berishi kerak: Task Achievement (har ikki fikr va shaxsiy qarash), Coherence and Cohesion (mantiqiy paragraflar va linking words), Lexical Resource (akademik so'z boyligi va kollokatsiyalar), Grammatical Range and Accuracy (murakkab jumlalar, modal fe'llar, inversiyalar).",
    section: 'Writing',
    skillTag: 'Essay Development',
    points: 9,
    tags: ['ielts', 'writing', 'task-2']
  },
  {
    id: 'q_ielts_speaking_1',
    examType: 'ielts',
    subject: 'Speaking',
    topic: 'Part 2: Cue Card',
    difficulty: 'Murakkab',
    questionType: 'speaking_task',
    text: "Describe an ambition or educational achievement that you have not yet achieved but wish to accomplish in the future. You should say: what it is, why you want to achieve it, what steps you need to take, and explain how you will feel once you succeed.",
    passage: "You have 1 minute to prepare your notes and then 1 to 2 minutes to speak. Click the microphone button to record your answer.",
    explanation: "Examiner Fluency & Coherence, Lexical Resource, Grammatical Range & Accuracy, va Pronunciation (intonatsiya, ravonlik) parametrlarini baholaydi. Fikrlarni o'zaro bog'lovchi kirish iboralaridan foydalaning.",
    section: 'Speaking',
    skillTag: 'Spoken Fluency & Coherence',
    points: 9,
    tags: ['ielts', 'speaking', 'cue-card']
  },

  // ==========================================
  // CEFR MULTI-LEVEL (A1 - C1)
  // ==========================================
  {
    id: 'q_cefr_b2_1',
    examType: 'cefr',
    subject: 'Ingliz tili (CEFR)',
    topic: 'Conditionals & Inversion',
    difficulty: 'Murakkab',
    questionType: 'multiple_choice',
    text: "Had we known about the hazardous meteorological conditions in advance, we __________ our high-altitude expedition.",
    options: [
      'would postpone',
      'would have postponed',
      'will have postponed',
      'postponed'
    ],
    correctOption: 1,
    explanation: "Third Conditional inversiya shakli: 'Had + subject + V3, subject + would have + V3'. O'tgan zamonda yuz bermagan hodisa haqida afsuslanish.",
    section: 'Grammar',
    skillTag: 'Conditionals',
    points: 1,
    tags: ['cefr-c1', 'grammar', 'inversion']
  },
  {
    id: 'q_cefr_b2_2',
    examType: 'cefr',
    subject: 'Ingliz tili (CEFR)',
    topic: 'Collocations & Phrasal Verbs',
    difficulty: 'O\'rta',
    questionType: 'multiple_choice',
    text: "The government's decision to increase taxes on electric vehicles has __________ a great deal of controversy among urban commuters.",
    options: [
      'sparked',
      'ignited',
      'provoked',
      'All of the above are valid figurative collocations'
    ],
    correctOption: 3,
    explanation: "'Spark controversy', 'ignite controversy' va 'provoke controversy' iboralarining barchasi bahs-munozaraga turtki bo'lmoq ma'nosida ishlatiladi.",
    section: 'Vocabulary',
    skillTag: 'Collocations',
    points: 1,
    tags: ['cefr-b2', 'vocabulary']
  },
  {
    id: 'q_cefr_matching_1',
    examType: 'cefr',
    subject: 'Ingliz tili (CEFR)',
    topic: 'Idioms Matching',
    difficulty: 'O\'rta',
    questionType: 'matching',
    text: "Quyidagi inglizcha iboralarni ularning ma'nolari bilan to'g'ri moslashtiring:",
    matchingPairs: [
      { id: 'm1', left: 'Iron out differences', right: 'To resolve disagreements or disputes' },
      { id: 'm2', left: 'Cut corners', right: 'To do something in the easiest or cheapest way' },
      { id: 'm3', left: 'Bark up the wrong tree', right: 'To pursue a mistaken line of thought' },
      { id: 'm4', left: 'Spill the beans', right: 'To reveal confidential information prematurely' }
    ],
    explanation: "Barcha iboralar kundalik va rasmiy ingliz tilida faol qo'llaniladi: Iron out = kelishmoq, Cut corners = oson yo'lini qidirmoq, Bark up the wrong tree = yanglishmoq, Spill the beans = sirni oshkor qilmoq.",
    section: 'Vocabulary',
    skillTag: 'Idiomatic competence',
    points: 2,
    tags: ['cefr', 'idioms', 'matching']
  },
  {
    id: 'q_cefr_c1_sub',
    examType: 'cefr',
    subject: 'Ingliz tili (CEFR)',
    topic: 'Subjunctive Mood',
    difficulty: 'Murakkab',
    questionType: 'multiple_choice',
    text: "It is imperative that every candidate __________ their valid identification card before entering the testing hall.",
    options: ['presents', 'present', 'presented', 'will present'],
    correctOption: 1,
    explanation: "Formal subjunctive (istak mayli): 'It is imperative that + subject + base verb (infinitive without to)'. Shuning uchun 'present' to'g'ri.",
    section: 'Grammar',
    skillTag: 'Subjunctive',
    points: 1,
    tags: ['cefr-c1', 'subjunctive']
  }
];
