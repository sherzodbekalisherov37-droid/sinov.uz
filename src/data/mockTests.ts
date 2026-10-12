import { MockTest } from '../types';
import { SAT_OFFICIAL_TESTS } from './satEnglishTests';

export const INITIAL_MOCK_TESTS: MockTest[] = [
  // 1. IELTS ACADEMIC MOCK TEST
  {
    id: 'ielts_mock_01',
    title: 'IELTS Academic: Reading & Language Skills Mock #1',
    examType: 'ielts',
    description: 'Haqiqiy IELTS formati: Akademik ilmiy matnlar, True/False/Not Given, sarlavhalar mosligi va mantiqiy xulosalar tahlili.',
    durationMinutes: 40,
    totalQuestions: 8,
    difficulty: 'Murakkab',
    createdAt: '2026-03-15',
    popularity: 96,
    attemptsCount: 15600,
    questions: [
      {
        id: 'ielts_q1',
        section: 'Reading',
        skillTag: 'Main Idea / Gist',
        passage: `The preservation of ancient architectural heritage faces unique dilemmas in the 21st century. In historic silk road centers like Samarkand and Bukhara, restoration architects struggle to reconcile authentic medieval earthen brick techniques with modern earthquake-resilient composites. While traditionalists argue that synthetic binders violate historical veracity, seismic engineers demonstrate that unreinforced historic masonry collapses during moderate tectonic shifts. Recent initiatives in Central Asia propose a hybrid compromise: traditional lime mortars are reinforced with concealed micro-fiber tensile meshes, ensuring visual historical fidelity while safeguarding structural survivability for future generations.`,
        text: 'According to the passage, what is the primary benefit of the proposed "hybrid compromise" in historic restoration?',
        options: [
          'It replaces unreinforced masonry completely with modern glass and reinforced concrete structures.',
          'It satisfies historical visual authenticity while dramatically upgrading structural seismic resistance.',
          'It completely eliminates the necessity for traditional lime mortar and artisanal brickwork.',
          'It reduces the overall financial expense of seismic retrofitting to zero.'
        ],
        correctOption: 1,
        explanation: 'Matnda "ensuring visual historical fidelity while safeguarding structural survivability for future generations" deb aniq ko\'rsatilgan, ya\'ni tarixiy tashqi ko\'rinishni saqlagan holda seysmik chidamlilikni oshiradi.',
        points: 1
      },
      {
        id: 'ielts_q2',
        section: 'Reading',
        skillTag: 'Inference',
        passage: `The preservation of ancient architectural heritage faces unique dilemmas in the 21st century. In historic silk road centers like Samarkand and Bukhara, restoration architects struggle to reconcile authentic medieval earthen brick techniques with modern earthquake-resilient composites. While traditionalists argue that synthetic binders violate historical veracity, seismic engineers demonstrate that unreinforced historic masonry collapses during moderate tectonic shifts. Recent initiatives in Central Asia propose a hybrid compromise: traditional lime mortars are reinforced with concealed micro-fiber tensile meshes, ensuring visual historical fidelity while safeguarding structural survivability for future generations.`,
        text: 'What can be inferred about the attitude of "traditionalists" mentioned in the text?',
        options: [
          'They prioritize historical material purity over engineering advancements.',
          'They strongly advocate for the immediate demolition of fragile monuments.',
          'They believe modern earthquake engineering is completely infallible.',
          'They prefer synthetic polymers over organic lime mortar.'
        ],
        correctOption: 0,
        explanation: 'Traditsionalistlar synthetic materiallar tarixiy haqqoniylikni buzadi deb hisoblaydi ("argue that synthetic binders violate historical veracity"), demak ular tarixiy material tozaligini zamonaviy muhandislikdan ustun qo\'yishadi.',
        points: 1
      },
      {
        id: 'ielts_q3',
        section: 'Reading',
        skillTag: 'True/False/Not Given',
        passage: `Recent archaeological digs in the Fergana Valley have unearthed agricultural granaries dating back to the late Bronze Age. Paleobotanists identified carbonized seeds of ancient millet and barley, alongside primitive copper irrigation canal gates. Although earlier historians presumed pastoral nomadism was the exclusive livelihood in this territory prior to 1000 BCE, these sedimentary discoveries furnish incontrovertible evidence of settled agrarian communities with sophisticated hydrological coordination.`,
        text: 'Do the following statement agree with the information given in the passage? "Prior to recent discoveries, historians believed people in this region were primarily nomadic before 1000 BCE."',
        options: [
          'TRUE (Berilgan ma\'lumot matnga to\'liq mos keladi)',
          'FALSE (Berilgan ma\'lumot matnga qarama-qarshi)',
          'NOT GIVEN (Matnda bu haqda ma\'lumot berilmagan)',
          'PARTIALLY TRUE (Faqat qisman to\'g\'ri)'
        ],
        correctOption: 0,
        explanation: 'Matnda: "earlier historians presumed pastoral nomadism was the exclusive livelihood in this territory prior to 1000 BCE" deyilgan. Savol jumlasi bu ma\'lumotga 100% mos keladi, shuning uchun javob: TRUE.',
        points: 1
      },
      {
        id: 'ielts_q4',
        section: 'Reading',
        skillTag: 'Vocabulary in Context',
        passage: `Although earlier historians presumed pastoral nomadism was the exclusive livelihood in this territory prior to 1000 BCE, these sedimentary discoveries furnish incontrovertible evidence of settled agrarian communities with sophisticated hydrological coordination.`,
        text: 'The word "incontrovertible" in the passage is closest in meaning to:',
        options: [
          'Ambiguous and disputable',
          'Indisputable and beyond question',
          'Temporary and provisional',
          'Speculative and theoretical'
        ],
        correctOption: 1,
        explanation: '"Incontrovertible" — rad etib bo\'lmas, shubhasiz (indisputable, undeniable, beyond doubt) degan ma\'noni bildiradi.',
        points: 1
      },
      {
        id: 'ielts_q5',
        section: 'Listening & Grammar',
        skillTag: 'Academic Collocation',
        text: 'Choose the sentence that correctly utilizes formal academic voice and appropriate collocations for IELTS Task 2 Writing:',
        options: [
          'A lot of folks reckon that climate change is gonna mess up economies pretty badly.',
          'Substantial empirical evidence suggests that anthropogenic climate variation poses acute socioeconomic hazards.',
          'Climate problems are making things super terrible for everyone around the whole globe.',
          'Everyone knows that weather issues are really big deals for business people nowadays.'
        ],
        correctOption: 1,
        explanation: 'B variantida akademik leksika ("substantial empirical evidence", "anthropogenic", "poses acute socioeconomic hazards") va ob\'yektiv ilmiy ohang (hedging: "suggests") mukammal ishlatilgan.',
        points: 1
      },
      {
        id: 'ielts_q6',
        section: 'Reading',
        skillTag: 'Matching Headings',
        passage: `Paragraph A: The transition from fossil fuels to renewable sources requires unprecedented quantities of rare earth elements, such as neodymium and dysprosium. However, the geographic concentration of mining and refining facilities in a handful of nations creates acute supply-chain vulnerabilities, provoking geopolitical competition.`,
        text: 'Which heading best captures the primary theme of Paragraph A?',
        options: [
          'The Complete Elimination of Global Energy Needs',
          'Geopolitical Dependencies and Resource Vulnerabilities in Green Transition',
          'Why Solar Panels Do Not Require Rare Metals',
          'Historical Origins of Coal Mining in Western Europe'
        ],
        correctOption: 1,
        explanation: 'Paragrafda yashil energiyaga o\'tishda zarur bo\'lgan nodir metallar va ularning bir nechta davlat qo\'lida to\'plangani sababli yuzaga kelayotgan geosiyosiy xavflar yoritilgan.',
        points: 1
      },
      {
        id: 'ielts_q7',
        section: 'Reading',
        skillTag: 'Sentence Completion',
        passage: `Cognitive psychologists have long documented the "hyperbolic discounting" phenomenon, wherein individuals disproportionately prefer smaller immediate payoffs over substantially greater future returns. This psychological bias explains chronic procrastination in retirement savings and academic study schedules.`,
        text: 'According to the passage, hyperbolic discounting causes people to value immediate rewards __________ larger rewards that require patience.',
        options: [
          'significantly higher than',
          'in precisely the same ratio as',
          'much lower than',
          'only after mathematically calculating'
        ],
        correctOption: 0,
        explanation: 'Matnda "disproportionately prefer smaller immediate payoffs over substantially greater future returns" deyilgan, ya\'ni darhol olinadigan kichik mukofotni uzoq kutiladigan kattaroq mukofotdan sezilarli darajada ustun qo\'yishadi.',
        points: 1
      },
      {
        id: 'ielts_q8',
        section: 'Writing & Language',
        skillTag: 'Cohesion & Coherence',
        text: 'Which transition phrase best connects these two thoughts: "Renewable energy infrastructure demands massive initial capital investments. __________, its marginal operating expenses over a 30-year life cycle are negligible compared to coal-fired plants."',
        options: [
          'Consequently',
          'Nevertheless',
          'Similarly',
          'For instance'
        ],
        correctOption: 1,
        explanation: 'Birinchi gap boshlang\'ich xarajat yuqoriligini, ikkinchi gap esa uzoq muddatda operatsion xarajat nihoyatda arzonligini (zidlik/kontrast) ko\'rsatadi. Bu o\'rinda "Nevertheless" (shunga qaramay) eng to\'g\'ri bog\'lovchidir.',
        points: 1
      }
    ]
  },

  // 2. SAT DIGITAL MOCK TEST
  {
    id: 'sat_mock_01',
    title: 'Digital SAT: Reading, Writing & Math Diagnostic Test #1',
    examType: 'sat',
    description: 'Digital SAT formati: Craft and Structure, Information & Ideas, Standard English Conventions va Math (Algebra & Problem Solving).',
    durationMinutes: 45,
    totalQuestions: 8,
    difficulty: 'Murakkab',
    createdAt: '2026-03-18',
    popularity: 97,
    attemptsCount: 17800,
    questions: [
      {
        id: 'sat_q1',
        section: 'Reading & Writing',
        skillTag: 'Craft & Structure',
        passage: `In 1913, botanist Agnes Arber published 'Herbals: Their Origin and Evolution', tracing the illustrated medical treatises of the Renaissance. While contemporaries viewed herbals merely as quaint artifacts of obsolete pharmacological folklore, Arber treated them as critical epistemological bridge-texts that catalyzed modern observational biology through rigorous botanical engraving.`,
        text: 'Which choice best describes the function of the underlined phrase in the text as a whole?',
        options: [
          'It introduces a widely held attitude among earlier scholars that Arber successfully contested and reframed.',
          'It provides empirical data confirming that Renaissance herbalists were scientifically accurate in every diagnosis.',
          'It questions the aesthetic caliber of Renaissance woodcut illustrations.',
          'It argues that Arber\'s methodology was fundamentally flawed and widely rejected.'
        ],
        correctOption: 0,
        explanation: 'Matnda zamondoshlarining eskirgan folklor sifatidagi yuzaki qarashlari ("quaint artifacts of obsolete...") keltirilib, Arber ularni zamonaviy biologiyani boshlab bergan muhim ilmiy ko\'prik deb isbotlagani bayon qilingan.',
        points: 1
      },
      {
        id: 'sat_q2',
        section: 'Reading & Writing',
        skillTag: 'Standard English Conventions',
        text: 'Biochemist Katalin Karikó spent decades pursuing messenger RNA therapies despite skepticism from grant reviewers; __________, her persistence laid the foundational architecture for rapid vaccine mobilization during global epidemiological crises.',
        options: [
          'furthermore',
          'ultimately',
          'conversely',
          'otherwise'
        ],
        correctOption: 1,
        explanation: '"Ultimately" (oxir-oqibat, pirovardida) uzoq yillik qiyinchilik va shubhalardan so\'ng erishilgan yakuniy yutuqni mantiqiy ifodalaydi.',
        points: 1
      },
      {
        id: 'sat_q3',
        section: 'Reading & Writing',
        skillTag: 'Punctuation & Syntax',
        text: 'The solar telescope at Mount Wilson Observatory was engineered with extraordinary precision __________ its primary focal length of 150 feet required continuous thermal stabilization to eliminate optical distortion.',
        options: [
          '; because',
          ':',
          ',',
          ';'
        ],
        correctOption: 1,
        explanation: 'Ikkinchi qism birinchi qismdagi favqulodda aniqlik nima sababdan va qanday talab qilinganini izohlovchi mustaqil fikrdir. Izoh yoki tafsilot keltirishda ikki nuqta (:) to\'g\'ri tinish belgisidir.',
        points: 1
      },
      {
        id: 'sat_q4',
        section: 'Math',
        skillTag: 'Algebra & Linear Equations',
        text: 'If 3x + 2y = 18 and 2x - y = 5, what is the value of 5x + y?',
        options: [
          '23',
          '13',
          '15',
          '31'
        ],
        correctOption: 0,
        explanation: 'Ikkala tenglamani qo\'shib yuboramiz: (3x + 2y) + (2x - y) = 18 + 5 => 5x + y = 23. Algebraning eng tezkor va qulay usuli.',
        points: 1
      },
      {
        id: 'sat_q5',
        section: 'Math',
        skillTag: 'Advanced Math / Quadratics',
        text: 'A quadratic function f(x) = x² - 6x + c has exactly one real root. What is the value of constant c?',
        options: [
          '9',
          '-9',
          '36',
          '3'
        ],
        correctOption: 0,
        explanation: 'Kvadrat tenglama yagona haqiqiy ildizga ega bo\'lishi uchun diskriminant D = b² - 4ac = 0 bo\'lishi kerak: (-6)² - 4(1)(c) = 36 - 4c = 0 => 4c = 36 => c = 9.',
        points: 1
      },
      {
        id: 'sat_q6',
        section: 'Math',
        skillTag: 'Problem Solving & Percentages',
        text: 'A laboratory specimen population increases by 20% on Monday, and then decreases by 20% on Tuesday. What is the net percentage change in the population from its original size?',
        options: [
          '0% (No change)',
          '4% decrease',
          '4% increase',
          '2% decrease'
        ],
        correctOption: 1,
        explanation: 'Boshlang\'ich qiymat 100 deb olinsa: Dushanba kuni 100 * 1.20 = 120. Seshanba kuni 120 * 0.80 = 96. Demak: 100 dan 96 ga tushdi, bu 4% kamayish demakdir.',
        points: 1
      },
      {
        id: 'sat_q7',
        section: 'Reading & Writing',
        skillTag: 'Rhetorical Synthesis',
        passage: `While researching a topic, a student took the following notes:
• The James Webb Space Telescope (JWST) uses infrared astronomy.
• Infrared light penetrates dense cosmic dust clouds that obscure visible light.
• In 2022, JWST imaged the Carina Nebula, revealing previously invisible protostars.
• The student wants to emphasize how JWST\'s technology enables astronomers to detect obscured celestial phenomena.`,
        text: 'Which choice most effectively uses the relevant information from the notes to accomplish this goal?',
        options: [
          'Launched recently, the James Webb Space Telescope took famous photographs in 2022.',
          'By utilizing infrared astronomy to pierce through dense cosmic dust, the JWST allows scientists to observe stellar nurseries that were previously hidden in visible light.',
          'Cosmic dust clouds obscure visible light in nebulae such as the Carina Nebula.',
          'The Carina Nebula contains protostars that astronomers have studied for many decades.'
        ],
        correctOption: 1,
        explanation: 'Talabaning asosiy maqsadi — JWST texnologiyasi (infraqizil astronomiya) yashiringan kosmik jismlarni aniqlashga qanday imkon berishini ko\'rsatishdir. B varianti ushbu maqsadni to\'liq va lo\'nda ifodalaydi.',
        points: 1
      },
      {
        id: 'sat_q8',
        section: 'Math',
        skillTag: 'Geometry & Coordinate Plane',
        text: 'In the xy-plane, a circle with center (3, -2) has a radius of 5. Which of the following points lies on the circle?',
        options: [
          '(6, 2)',
          '(7, 1)',
          '(0, 0)',
          '(3, 5)'
        ],
        correctOption: 1,
        explanation: 'Aylana tenglamasi: (x - 3)² + (y + 2)² = 25. (7, 1) nuqtani qo\'yamiz: (7 - 3)² + (1 + 2)² = 4² + 3² = 16 + 9 = 25. Aynan to\'g\'ri!',
        points: 1
      }
    ]
  },

  // 3. MILLIY SERTIFIKAT MOCK TEST
  {
    id: 'milliy_mock_01',
    title: 'Milliy Sertifikat: Ona tili va Adabiyot (A+ Tayyorgarlik)',
    examType: 'milliy',
    subject: 'Ona tili va adabiyot',
    description: 'Milliy baholash tizimi standarti: Morfologik tahlil, sintaktik munosabatlar, badiiy san\'atlar va matn ustida ishlash.',
    durationMinutes: 45,
    totalQuestions: 8,
    difficulty: 'Murakkab',
    createdAt: '2026-03-10',
    popularity: 93,
    attemptsCount: 12400,
    questions: [
      {
        id: 'milliy_q1',
        section: 'Ona tili',
        skillTag: 'Morfologiya & So\'z yasalishi',
        text: 'Quyidagi gapda qatnashgan yasama so\'zlar sonini aniqlang: "Bilimli inson o\'zining mehnatsevarligi va do\'stona munosabati bilan barchaning hurmatini qozonadi."',
        options: [
          '3 ta (bilimli, mehnatsevarligi, do\'stona)',
          '4 ta (bilimli, mehnatsevarligi, do\'stona, qozonadi)',
          '2 ta (bilimli, do\'stona)',
          '5 ta'
        ],
        correctOption: 0,
        explanation: 'Yasama so\'zlar: 1) bilimli (bil -> bilim -> bilimli), 2) mehnatsevarligi (mehnatsevar + lik), 3) do\'stona (do\'st + ona). "Qozonadi" tub so\'z (morfema yasovchi emas, shakl yasovchi). Jami: 3 ta.',
        points: 1
      },
      {
        id: 'milliy_q2',
        section: 'Ona tili',
        skillTag: 'Sintaksis & Ergashgan gaplar',
        text: 'Quyidagi qo\'shma gap turini aniqlang: "Kimki ilmning mashaqqatini chekmasa, u kelajakda johillikning xorligini ko\'radi."',
        options: [
          'Bosh gap oldin kelgan ergash gapli qo\'shma gap',
          'Ergash gap oldin kelgan, bosh gapdagi egaga bog\'langan ega ergash gapli qo\'shma gap',
          'Bog\'langan qo\'shma gap',
          'Ketma-ket tobe bog\'langan ko\'p komponentli qo\'shma gap'
        ],
        correctOption: 1,
        explanation: 'Gapda "kimki... -sa" vositasida bog\'langan ergash gap bosh gapdagi "u" (ega) ko\'rsatkichiga bog\'langan. Ergash gap bosh gapdan oldin kelgan ega ergash gap hisoblanadi.',
        points: 1
      },
      {
        id: 'milliy_q3',
        section: 'Adabiyot',
        skillTag: 'Badiiy san\'atlar',
        passage: `Ne ko'rsam, gar desam ko'rganlarimni el hisob etmas,\nQaro baxtim kibi har dam firoqingda qaro bo'ldim.`,
        text: 'Ushbu baytda qaysi badiiy san\'atlar mahorat bilan qo\'llangan?',
        options: [
          'Tashbeh (o\'xshatish) va Tazod (zidlash)',
          'Tashbeh va Iyhom (ko\'p ma\'nolilik / so\'z o\'yini)',
          'Talmeh (tarixiy ism) va Husni ta\'lil',
          'Ruju va Musajja'
        ],
        correctOption: 0,
        explanation: '"Qaro baxtim kibi" — tashbeh (o\'xshatish). Ayriliqda qorong\'ulik va baxtsizlik kontrastlari keltirilgan.',
        points: 1
      },
      {
        id: 'milliy_q4',
        section: 'Ona tili',
        skillTag: 'Imlo & Tinish belgilari',
        text: 'Qaysi qatorda tinish belgilari qoidaga muvofiq to\'liq va xatosiz qo\'yilgan?',
        options: [
          'Ustoz: "Kitob — insonning eng yaqin do\'sti", — deb ta\'kidladi.',
          'Ustoz, "Kitob: insonning eng yaqin do\'sti" — deb ta\'kidladi.',
          'Ustoz — "Kitob, insonning eng yaqin do\'sti!" deb ta\'kidladi.',
          'Ustoz: "Kitob insonning eng yaqin do\'sti" deb ta\'kidladi.'
        ],
        correctOption: 0,
        explanation: 'Muallif gapi ko\'chirma gapdan oldin kelsa ikki nuqta, ko\'chirma gapdan keyin esa vergul va tire qo\'yiladi: Muallif: "Ko\'chirma", — muallif.',
        points: 1
      },
      {
        id: 'milliy_q5',
        section: 'Adabiyot',
        skillTag: 'Dostonlar & Mumtoz adabiyot',
        text: 'Alisher Navoiyning "Xamsa" tarkibidagi qaysi dostonida axloqiy-falsafiy masalalar, adolatli shoh g\'oyasi 20 ta maqolat va 20 ta hikoyat tarzida bayon qilingan?',
        options: [
          'Farhod va Shirin',
          'Hayrat ul-abror (Yaxshi kishilarning hayrati)',
          'Layli va Majnun',
          'Saddi Iskandariy'
        ],
        correctOption: 1,
        explanation: '"Hayrat ul-abror" dostoni Navoiy Xamsasining debochasi bo\'lib, 20 maqolat va unga ilova qilingan 20 hikoyatdan iborat axloqiy-ta\'limiy dostondir.',
        points: 1
      },
      {
        id: 'milliy_q6',
        section: 'Ona tili',
        skillTag: 'Fonetika & Tovush o\'zgarishi',
        text: 'Qaysi so\'zda tovush tushishi hodisasi yuz bergan?',
        options: [
          'Ko\'ngli (ko\'ngil + i)',
          'Kechki (kech + ki)',
          'Sarg\'aydi (sariq + aydi)',
          'A va C javoblarning ikkalasida ham'
        ],
        correctOption: 3,
        explanation: 'Ko\'ngil + i -> ko\'ngli ("i" unlisi tushgan); sariq + aydi -> sarg\'aydi ("i" unlisi tushgan va q->g\' o\'zgargan). Ikkalasida ham tovush tushishi mavjud.',
        points: 1
      },
      {
        id: 'milliy_q7',
        section: 'Ona tili',
        skillTag: 'Leksikologiya & Frazeologiya',
        text: '"Tepasi sochi tikka bo\'lmoq" frazeologizmining ma\'nodoshini aniqlang:',
        options: [
          'Qo\'li ochiq bo\'lmoq',
          'Terisi sig\'may ketmoq / Qattiq g\'azablanmoq',
          'Ko\'ngli joyiga tushmoq',
          'Yuragi orqasiga tortib ketmoq'
        ],
        correctOption: 1,
        explanation: '"Tepasi sochi tikka bo\'lmoq" — o\'ta darajada achchiqlanmoq, g\'azablanmoq ma\'nosini bildiradi.',
        points: 1
      },
      {
        id: 'milliy_q8',
        section: 'Adabiyot',
        skillTag: 'Jadid adabiyoti',
        text: '"Millatni uyg\'otish — maktab va maorif orqali amalga oshadi" g\'oyasini ilgari surgan, "Padarkush" dramasi muallifi kim?',
        options: [
          'Abdulla Qodiriy',
          'Mahmudxo\'ja Behbudiy',
          'Abdulhamid Cho\'lpon',
          'Abdurauf Fitrat'
        ],
        correctOption: 1,
        explanation: 'Mahmudxo\'ja Behbudiy — Turkiston jadidlarining yetakchisi va o\'zbek dramaturgiyasining ilk namunasi bo\'lmish "Padarkush" (1911) dramasining muallifidir.',
        points: 1
      }
    ]
  },

  // 4. CEFR MULTI-LEVEL MOCK TEST
  {
    id: 'cefr_mock_01',
    title: 'CEFR Multi-Level: Comprehensive B1/B2/C1 Assessment',
    examType: 'cefr',
    description: 'O\'zbekiston DTM / Bilimni baholash agentligi CEFR Multi-level standarti: Lexical competence, grammar structures and reading comprehension.',
    durationMinutes: 40,
    totalQuestions: 8,
    difficulty: 'O\'rta',
    createdAt: '2026-03-12',
    popularity: 88,
    attemptsCount: 9200,
    questions: [
      {
        id: 'cefr_q1',
        section: 'Grammar',
        skillTag: 'Conditionals & Inversion',
        text: 'Had we known about the hazardous meteorological conditions in advance, we __________ our high-altitude expedition.',
        options: [
          'would postpone',
          'would have postponed',
          'will have postponed',
          'postponed'
        ],
        correctOption: 1,
        explanation: 'Third Conditional (o\'tgan zamondagi amalga oshmagan shart gap) inversiya shakli: "Had + subject + V3, subject + would have + V3".',
        points: 1
      },
      {
        id: 'cefr_q2',
        section: 'Vocabulary',
        skillTag: 'Collocations & Phrasal Verbs',
        text: 'The government\'s decision to increase taxes on electric vehicles has __________ a great deal of controversy among urban commuters.',
        options: [
          'sparked',
          'ignited',
          'provoked',
          'All of the above are valid figurative collocations'
        ],
        correctOption: 3,
        explanation: '"Spark controversy", "ignite controversy" va "provoke controversy" birikmalarining barchasi bahs-munozaraga sabab bo\'lmoq ma\'nosida to\'g\'ri ishlatiladi.',
        points: 1
      },
      {
        id: 'cefr_q3',
        section: 'Grammar',
        skillTag: 'Subjunctive & Cleft Sentences',
        text: 'It is imperative that every candidate __________ their valid identification card before entering the testing hall.',
        options: [
          'presents',
          'present',
          'presented',
          'will present'
        ],
        correctOption: 1,
        explanation: 'Formal subjunctive (istak mayli): "It is imperative that + subject + base verb (infinitive without to)". Shuning uchun "present" to\'g\'ri.',
        points: 1
      },
      {
        id: 'cefr_q4',
        section: 'Reading',
        skillTag: 'Comprehension & Paraphrasing',
        passage: `The widespread adoption of remote telework has catalyzed substantial decentralized migration from metropolitan centers to provincial towns. While urban planners welcome the mitigation of traffic gridlock, municipal councils in smaller municipalities frequently lament the sudden strain exerted upon local wastewater utilities and broadband bandwidth.`,
        text: 'What is a major challenge encountered by smaller provincial towns according to the passage?',
        options: [
          'A catastrophic decline in their residential population.',
          'Infrastructure strain on public utilities and internet capacity.',
          'An acute lack of available agricultural land.',
          'Prohibitive increases in international shipping tariffs.'
        ],
        correctOption: 1,
        explanation: 'Matnda "sudden strain exerted upon local wastewater utilities and broadband bandwidth" deb yozilgan, ya\'ni kommunal tarmoqlar va internet infratuzilmasiga yuklama ortishi.',
        points: 1
      },
      {
        id: 'cefr_q5',
        section: 'Vocabulary',
        skillTag: 'Advanced Adjectives (C1)',
        text: 'The speaker delivered an exceedingly __________ argument that left virtually no room for doubt or ambiguity.',
        options: [
          'cogent',
          'flimsy',
          'tentative',
          'convoluted'
        ],
        correctOption: 0,
        explanation: '"Cogent" — ishonarli, asosli va mantiqan puxta degan ma\'noni beradi (convincing, compelling). Flimsy esa mo\'rt, asoslanmagan degani.',
        points: 1
      },
      {
        id: 'cefr_q6',
        section: 'Grammar',
        skillTag: 'Negative Inversion',
        text: 'Seldom __________ such extraordinary craftsmanship in modern industrial furniture production.',
        options: [
          'one witnesses',
          'does one witness',
          'one does witness',
          'has one witnessed not'
        ],
        correctOption: 1,
        explanation: 'Gap salbiy ma\'noli ravish (Seldom, Rarely, Never) bilan boshlansa, so\'roq gap shaklidagi inversiya sodir bo\'ladi: Seldom + yordamchi fe\'l (does) + ega (one) + asosiy fe\'l (witness).',
        points: 1
      },
      {
        id: 'cefr_q7',
        section: 'Reading',
        skillTag: 'Textual Inference',
        passage: `Linguistic diversity is diminishing at an alarming cadence: approximately one indigenous dialect vanishes every fortnight as younger generations assimilate into dominant national lingua francas. Preserving this intangible heritage requires not merely digital audio archives, but the deliberate cultivation of bilingual classroom immersion.`,
        text: 'The author suggests that simply recording indigenous languages into audio files is:',
        options: [
          'The ultimate and sole required remedy for dialect extinction.',
          'Insufficient on its own without active educational immersion.',
          'Harmful to children\'s cognitive linguistic acquisition.',
          'Far too expensive for contemporary governments to undertake.'
        ],
        correctOption: 1,
        explanation: 'Matnda: "requires not merely digital audio archives, but the deliberate cultivation of bilingual classroom immersion" deyilgan. Ya\'ni faqatgina audio yozib olish yetarli emas, ta\'lim orqali saqlab qolish kerak.',
        points: 1
      },
      {
        id: 'cefr_q8',
        section: 'Vocabulary',
        skillTag: 'Idiomatic Language',
        text: 'After months of tedious negotiations, the committee finally managed to __________ and reached a unanimous consensus.',
        options: [
          'cut corners',
          'iron out their differences',
          'bark up the wrong tree',
          'spill the beans'
        ],
        correctOption: 1,
        explanation: '"Iron out their differences" — o\'zaro kelishmovchilik va tafovutlarni bartaraf etib kelishuvga erishmoq ma\'nosidagi tabiiy inglizcha iboradir.',
        points: 1
      }
    ]
  },

  // 5. MILLIY SERTIFIKAT - MATEMATIKA
  {
    id: 'milliy_math_01',
    title: 'Milliy Sertifikat: Matematika (Algebra & Geometriya A+)',
    examType: 'milliy',
    subject: 'Matematika',
    description: 'Davlat ta\'lim standarti: Funksiyalar, logarifmlar, hosila, integrallar va fazoviy geometriya masalalari.',
    durationMinutes: 90,
    totalQuestions: 6,
    difficulty: 'Murakkab',
    createdAt: '2026-03-19',
    popularity: 99,
    attemptsCount: 24500,
    questions: [
      {
        id: 'm_math_1',
        section: 'Algebra',
        skillTag: 'Tenglamalar & Logarifm',
        text: 'Tenglamaning haqiqiy ildizlari yig\'indisini toping: log₂(x² - 3x) = 2',
        options: [
          '3',
          '4',
          '-1',
          'Ildizlari mavjud emas'
        ],
        correctOption: 0,
        explanation: 'x² - 3x = 2² => x² - 3x - 4 = 0. Viyet teoremasiga ko\'ra x₁ + x₂ = 3. Ildizlar: x₁ = 4, x₂ = -1. Har ikkisi logarifm aniqlanish sohasi (x² - 3x > 0) ga to\'g\'ri keladi: 4² - 12 = 4 > 0 va (-1)² - 3(-1) = 4 > 0. Yig\'indi: 4 + (-1) = 3.',
        points: 1
      },
      {
        id: 'm_math_2',
        section: 'Geometriya',
        skillTag: 'Planimetriya',
        text: 'To\'g\'ri burchakli uchburchakning katetlari 6 cm va 8 cm ga teng. Gipotenuzaga tushirilgan balandlikni hisoblang.',
        options: [
          '4.8 cm',
          '5.0 cm',
          '4.2 cm',
          '5.4 cm'
        ],
        correctOption: 0,
        explanation: 'Gipotenuza c = √(6² + 8²) = 10 cm. Uchburchak yuzi: S = (a * b) / 2 = (c * h) / 2 => h = (a * b) / c = (6 * 8) / 10 = 4.8 cm.',
        points: 1
      },
      {
        id: 'm_math_3',
        section: 'Matematik analiz',
        skillTag: 'Hosila & Ekstremum',
        text: 'f(x) = x³ - 3x² + 5 funksiyaning [0; 3] kesmadagi eng kichik qiymatini toping.',
        options: [
          '1',
          '5',
          '-2',
          '0'
        ],
        correctOption: 0,
        explanation: 'Hosila olamiz: f\'(x) = 3x² - 6x = 3x(x - 2) = 0 => statsionar nuqtalar x = 0 va x = 2. f(0) = 5; f(2) = 8 - 12 + 5 = 1; f(3) = 27 - 27 + 5 = 5. Eng kichik qiymat 1 ga teng (x = 2 da).',
        points: 1
      },
      {
        id: 'm_math_4',
        section: 'Trigonometriya',
        skillTag: 'Ayniyatlar',
        text: 'Agar sin α + cos α = 1.2 bo\'lsa, sin 2α ning qiymatini toping.',
        options: [
          '0.44',
          '0.24',
          '0.64',
          '0.36'
        ],
        correctOption: 0,
        explanation: '(sin α + cos α)² = 1.2² => sin² α + 2sin α cos α + cos² α = 1.44 => 1 + sin 2α = 1.44 => sin 2α = 0.44.',
        points: 1
      },
      {
        id: 'm_math_5',
        section: 'Kombinatorika',
        skillTag: 'Ehtimollar nazariyasi',
        text: 'Qutida 5 ta oq va 7 ta qora shar bor. Tavakkaliga olingan 2 ta sharning ikkalasi ham oq bo\'lish ehtimolini toping.',
        options: [
          '5/33',
          '5/12',
          '2/11',
          '10/33'
        ],
        correctOption: 0,
        explanation: 'Jami kombinatsiyalar: C(12, 2) = (12 * 11) / 2 = 66. Oq sharlardan 2 ta tanlash: C(5, 2) = (5 * 4) / 2 = 10. Ehtimollik: 10 / 66 = 5 / 33.',
        points: 1
      },
      {
        id: 'm_math_6',
        section: 'Stereometriya',
        skillTag: 'Prizma va piramida',
        text: 'Muntazam to\'rtburchakli piramidaning asos tomoni 6 cm, balandligi 4 cm ga teng. Piramidaning to\'la sirtini toping.',
        options: [
          '96 cm²',
          '84 cm²',
          '72 cm²',
          '108 cm²'
        ],
        correctOption: 0,
        explanation: 'Asos yuzi: 6² = 36 cm². Apofema l = √(4² + 3²) = 5 cm. Yon sirti: 4 * (1/2 * 6 * 5) = 60 cm². To\'la sirti: 36 + 60 = 96 cm².',
        points: 1
      }
    ]
  },

  // 6. MILLIY SERTIFIKAT - FIZIKA
  {
    id: 'milliy_physics_01',
    title: 'Milliy Sertifikat: Fizika (Mexanika, Optika va Termodinamika)',
    examType: 'milliy',
    subject: 'Fizika',
    description: 'Kinematika, Nyuton qonunlari, elektr zanjirlari, elektromagnit induksiya va geometrik optika masalalari.',
    durationMinutes: 80,
    totalQuestions: 5,
    difficulty: 'Murakkab',
    createdAt: '2026-03-20',
    popularity: 90,
    attemptsCount: 9800,
    questions: [
      {
        id: 'm_phys_1',
        section: 'Mexanika',
        skillTag: 'Kinematika & Dinamika',
        text: 'Boshlang\'ich tezligi nol bo\'lgan jism erkin tushib, oxirgi 1 sekundda 25 m masofani bosib o\'tdi. Jismning umumiy tushish vaqtini toping (g = 10 m/s²).',
        options: [
          '3 s',
          '2.5 s',
          '4 s',
          '5 s'
        ],
        correctOption: 0,
        explanation: 'Oxirgi 1 sekunddagi yo\'l: h = v₀t + gt²/2 emas, balki h_oxirgi = g(t - 0.5) = 10 * (t - 0.5) = 25 => t - 0.5 = 2.5 => t = 3 sekund.',
        points: 1
      },
      {
        id: 'm_phys_2',
        section: 'Elektr',
        skillTag: 'Om qonuni & Zanjirlar',
        text: 'Har birining qarshiligi 12 Om bo\'lgan uchta bir xil o\'tkazgich parallel ulanganda, ularning umumiy qarshiligi qancha bo\'ladi?',
        options: [
          '4 Om',
          '36 Om',
          '6 Om',
          '8 Om'
        ],
        correctOption: 0,
        explanation: 'Bir xil n ta o\'tkazgich parallel ulanganda R_umumiy = R / n = 12 / 3 = 4 Om.',
        points: 1
      },
      {
        id: 'm_phys_3',
        section: 'Optika',
        skillTag: 'Yorug\'likning sinishi',
        text: 'Yorug\'lik nuri suvdan (n = 1.33) havoga o\'tayotganda to\'la ichki qaytish chegaraviy burchagi sinosi qanday aniqlanadi?',
        options: [
          'sin α₀ = 1 / n',
          'sin α₀ = n',
          'sin α₀ = n²',
          'sin α₀ = √(n)'
        ],
        correctOption: 0,
        explanation: 'Optik zichroq muhitdan kamroq muhitga o\'tishda to\'la ichki qaytishning kritik burchagi: sin α₀ = n₂ / n₁ = 1 / n.',
        points: 1
      },
      {
        id: 'm_phys_4',
        section: 'Termodinamika',
        skillTag: 'Issiqlik mashinalari',
        text: 'Karno sikli bo\'yicha ishlayotgan issiqlik mashinasining isitkich temperaturasi 500 K, sovitkichniki 300 K. Uning foydali ish koeffitsiyentini toping.',
        options: [
          '40%',
          '60%',
          '20%',
          '50%'
        ],
        correctOption: 0,
        explanation: 'FIK = (T_isitkich - T_sovitkich) / T_isitkich = (500 - 300) / 500 = 200 / 500 = 0.40 (40%).',
        points: 1
      },
      {
        id: 'm_phys_5',
        section: 'Molekulyar fizika',
        skillTag: 'Ideal gaz qonunlari',
        text: 'Ideal gazning bosimi 2 marta orttirilib, hajmi 4 marta kamaytirilsa, uning absolyut temperaturasi qanday o\'zgaradi?',
        options: [
          '2 marta kamayadi',
          '2 marta ortadi',
          'O\'zgarmaydi',
          '4 marta kamayadi'
        ],
        correctOption: 0,
        explanation: 'Mendeleyev-Klapeyron tenglamasi: P₁V₁ / T₁ = P₂V₂ / T₂ => T₂ = T₁ * (P₂/P₁) * (V₂/V₁) = T₁ * 2 * (1/4) = T₁ / 2 (2 marta kamayadi).',
        points: 1
      }
    ]
  },

  // 7. MILLIY SERTIFIKAT - TARIX
  {
    id: 'milliy_history_01',
    title: 'Milliy Sertifikat: O\'zbekiston va Jahon Tarixi (A+ Tayyorgarlik)',
    examType: 'milliy',
    subject: 'Tarix',
    description: 'Qadimgi davlatlar, Amir Temur va Temuriylar davri, Xonliklar va zamonaviy O\'zbekiston tarixi diagnostikasi.',
    durationMinutes: 60,
    totalQuestions: 5,
    difficulty: 'Oson',
    createdAt: '2026-03-21',
    popularity: 81,
    attemptsCount: 5400,
    questions: [
      {
        id: 'm_hist_1',
        section: 'O\'zbekiston tarixi',
        skillTag: 'Temuriylar davri',
        text: 'Amir Temurning "Rostlik — najotdir" (Rosti-rusti) shiori qayerda o\'yib yozilgan edi?',
        options: [
          'Amir Temurning davlat muhrida va uzugida',
          'Oqsaroy peshtoqida',
          'Bibixonim madrasasi darvozasida',
          'Go\'ri Amir maqbarasi qabrtoshida'
        ],
        correctOption: 0,
        explanation: '"Rosti-rusti" (Kuch adolatda, Rostlikda najot) shiori Sohibqiron Amir Temurning davlat muhrida zarb etilgan bo\'lib, saltanatning bosh ma\'naviy qoidasi bo\'lgan.',
        points: 1
      },
      {
        id: 'm_hist_2',
        section: 'Qadimgi tarix',
        skillTag: 'Ilk sivilizatsiyalar',
        text: 'O\'zbekiston hududidagi ilk davlatchilik tuzilmalaridan biri bo\'lgan "Qadimgi Baqtriya" davlatining poytaxti qaysi shahar bo\'lgan?',
        options: [
          'Zariaspa (Baxdi / Balx)',
          'Afrosiyob (Samarqand)',
          'Tuproqqal\'a',
          'Merv'
        ],
        correctOption: 0,
        explanation: 'Qadimgi Baqtriya podsholigining poytaxti Zariaspa (yunon manbalarida Baxdi, hozirgi Balx) shahri bo\'lgan.',
        points: 1
      },
      {
        id: 'm_hist_3',
        section: 'Jahon tarixi',
        skillTag: 'Yangi davr',
        text: '1789-yilda boshlangan Buyuk Fransuz inqilobining boshlanish ramzi hisoblangan voqea qaysi?',
        options: [
          'Bastiliya qal\'asining qamal qilinishi va egallanishi',
          'Versal sulhining imzolanishi',
          'Vaterloo jangidagi mag\'lubiyat',
          'Napoleon Bonapartning imperator deb e\'lon qilinishi'
        ],
        correctOption: 0,
        explanation: '1789-yil 14-iyulda Bastiliya qal\'a-turmasining xalq tomonidan zabt etilishi Buyuk Fransuz inqilobining boshlang\'ich ramzi bo\'lib xizmat qiladi.',
        points: 1
      },
      {
        id: 'm_hist_4',
        section: 'Xonliklar davri',
        skillTag: 'Buxoro amirligi',
        text: 'Buxoroda Mang\'itlar sulolasiga asos solgan va o\'zini amir deb e\'lon qilgan hukmdor kim?',
        options: [
          'Muhammad Rahimxon (1756-1758)',
          'Amir Shohmurod',
          'Amir Nasrullo',
          'Subhonqulixon'
        ],
        correctOption: 0,
        explanation: '1756-yilda Muhammad Rahimxon Buxoro taxtiga o\'tirib, Mang\'itlar sulolasiga va Buxoro amirligiga asos solgan.',
        points: 1
      },
      {
        id: 'm_hist_5',
        section: 'Zamonaviy tarix',
        skillTag: 'Mustaqillik davri',
        text: 'O\'zbekiston Respublikasi Birlashgan Millatlar Tashkilotiga (BMT) qachon to\'laqonli a\'zo bo\'lib qabul qilingan?',
        options: [
          '1992-yil 2-mart',
          '1991-yil 1-sentyabr',
          '1992-yil 8-dekabr',
          '1993-yil 1-iyun'
        ],
        correctOption: 0,
        explanation: 'O\'zbekiston Respublikasi 1992-yil 2-mart kuni Nyu-Yorkda BMT Bosh Assambleyasi qarori bilan tashkilotga a\'zo bo\'lgan va BMT binosi oldida bayrog\'imiz ko\'tarilgan.',
        points: 1
      }
    ]
  },

  // 8. MILLIY SERTIFIKAT - BIOLOGIYA & KIMYO
  {
    id: 'milliy_biology_01',
    title: 'Milliy Sertifikat: Biologiya (Botanika, Zoologiya & Genetika)',
    examType: 'milliy',
    subject: 'Biologiya',
    description: 'Hujayra biologiyasi, sitologiya, Mendel qonunlari, odam anatomiyasi va fiziologiyasi bo\'yicha testlar.',
    durationMinutes: 70,
    totalQuestions: 5,
    difficulty: 'O\'rta',
    createdAt: '2026-03-22',
    popularity: 85,
    attemptsCount: 6900,
    questions: [
      {
        id: 'm_bio_1',
        section: 'Genetika',
        skillTag: 'Mendel qonunlari',
        text: 'Digeterozigota organizmlar (AaBb x AaBb) chatishtirilganda, fenotip bo\'yicha qanday nisbatda ajralish kuzatiladi (genlar mustaqil taqsimlanganda)?',
        options: [
          '9 : 3 : 3 : 1',
          '3 : 1',
          '1 : 2 : 1',
          '9 : 7'
        ],
        correctOption: 0,
        explanation: 'Mendelning uchinchi qonuni (belgilarning mustaqil irsiylanishi) bo\'yicha digeterozigotalar chatishtirilganda fenotipik nisbat aynan 9:3:3:1 bo\'ladi.',
        points: 1
      },
      {
        id: 'm_bio_2',
        section: 'Sitologiya',
        skillTag: 'Hujayra organellalari',
        text: 'Eukariot hujayralarda ATF (adenozintrifosfat) sintez qiluvchi, "hujayraning quvvat stansiyasi" hisoblangan organoid qaysi?',
        options: [
          'Mitoxondriya',
          'Ribosoma',
          'Lizosoma',
          'Golji apparati'
        ],
        correctOption: 0,
        explanation: 'Mitoxondriya aerob nafas olish va oksidlanish-fosforillanish reaksiyalari orqali makroergik ATF molekulalarini sintezlaydi.',
        points: 1
      },
      {
        id: 'm_bio_3',
        section: 'Botanika',
        skillTag: 'O\'simliklar anatomiyasi',
        text: 'O\'simliklarda suv va erigan mineral moddalarni ildizdan barglarga yuqoriga qarab o\'tkazuvchi to\'qima qaysi?',
        options: [
          'Ksilema (yog\'ochlik naylari)',
          'Floema (elaksimon naylar)',
          'Kambiy',
          'Kollenxima'
        ],
        correctOption: 0,
        explanation: 'Ksilema orqali o\'suvchi oqim (suv va minerallar ildizdan barglarga) harakatlanadi; floema orqali esa organik moddalar oqimi tushadi.',
        points: 1
      },
      {
        id: 'm_bio_4',
        section: 'Fiziologiya',
        skillTag: 'Qon aylanish sistemasi',
        text: 'Odam yuragining qaysi qismidan katta qon aylanish doirasi boshlanadi?',
        options: [
          'Chap qorinchadan (aorta orqali)',
          'O\'ng qorinchadan',
          'Chap bo\'lmachadan',
          'O\'ng bo\'lmachadan'
        ],
        correctOption: 0,
        explanation: 'Katta qon aylanish doirasi yurakning chap qorinchasidan aorta qon tomiri bilan boshlanadi va butun tana a\'zolarini kislorod bilan ta\'minlaydi.',
        points: 1
      },
      {
        id: 'm_bio_5',
        section: 'Molekulyar biologiya',
        skillTag: 'DNK replikatsiyasi',
        text: 'Agar DNK qo\'sh spiralining bir zanjirida A-T-G-C-C-A ketma-ketligi bo\'lsa, unga komplementar ikkinchi zanjir qanday bo\'ladi?',
        options: [
          'T-A-C-G-G-T',
          'U-A-C-G-G-U',
          'A-T-G-C-C-A',
          'G-C-A-T-T-G'
        ],
        correctOption: 0,
        explanation: 'DNK da komplementarlik qoidasi: A-T, G-C. Shuning uchun A->T, T->A, G->C, C->G, C->G, A->T natijada T-A-C-G-G-T hosil bo\'ladi.',
        points: 1
      }
    ]
  },

  // 9. MILLIY SERTIFIKAT - HUQUQSHUNOSLIK
  {
    id: 'milliy_law_01',
    title: 'Milliy Sertifikat: Huquqshunoslik (Konstitutsiya & Qonunchilik)',
    examType: 'milliy',
    subject: 'Huquqshunoslik',
    description: 'Yangi tahrirdagi O\'zbekiston Respublikasi Konstitutsiyasi, davlat va huquq nazariyasi, fuqarolik va jinoiy qonunchilik.',
    durationMinutes: 60,
    totalQuestions: 5,
    difficulty: 'Oson',
    createdAt: '2026-03-24',
    popularity: 76,
    attemptsCount: 3800,
    questions: [
      {
        id: 'm_law_1',
        section: 'Konstitutsiya',
        skillTag: 'Davlat tuzilishi',
        text: 'Yangi tahrirdagi O\'zbekiston Respublikasi Konstitutsiyasining 1-moddasiga ko\'ra, O\'zbekiston qanday davlat deb e\'tirof etilgan?',
        options: [
          'Boshqaruvning respublika shakliga ega bo\'lgan suveren, demokratik, huquqiy, ijtimoiy va dunyoviy davlat',
          'Unitar, monarxik va diniy davlat',
          'Federativ va konfederativ respublika',
          'Prezidentlik va parlamentar monarxiya'
        ],
        correctOption: 0,
        explanation: 'Konstitutsiya 1-moddasi: "O\'zbekiston — boshqaruvning respublika shakliga ega bo\'lgan suveren, demokratik, huquqiy, ijtimoiy va dunyoviy davlatdir".',
        points: 1
      },
      {
        id: 'm_law_2',
        section: 'Huquq nazariyasi',
        skillTag: 'Hokimiyatlar bo\'linishi',
        text: 'O\'zbekiston Respublikasida davlat hokimiyatining uch bo\'g\'inli tizimi qaysilardan iborat?',
        options: [
          'Qonun chiqaruvchi, ijro etuvchi va sud hokimiyati',
          'Prezident, Vazirlar Mahkamasi va Hokimliklar',
          'Senat, Qonunchilik palatasi va Prokuratura',
          'Davlat xavfsizlik xizmati, Ichki ishlar va Adliya'
        ],
        correctOption: 0,
        explanation: 'Konstitutsiyaning 11-moddasiga binoan, O\'zbekiston Respublikasi davlat hokimiyatining tizimi hokimiyatlarning qonun chiqaruvchi, ijro etuvchi va sud hokimiyatiga bo\'linishi prinsipiga asoslanadi.',
        points: 1
      },
      {
        id: 'm_law_3',
        section: 'Inson huquqlari',
        skillTag: 'Shaxsiy daxlsizlik',
        text: 'Odam o\'z aybini bo\'yniga olmasa, sud hukmi qonuniy kuchga kirmaguncha u aybsiz deb hisoblanishi qanday nomlanadi?',
        options: [
          'Aybsizlik prezumpsiyasi',
          'Jazo muqarrarligi prinsipi',
          'Advokat immuniteti',
          'Sud mustaqilligi kafolati'
        ],
        correctOption: 0,
        explanation: 'Aybsizlik prezumpsiyasi (Konstitutsiya 28-moddasi): Jinoyat sodir etganlikda ayblanayotgan shaxs uning aybi qonunda nazarda tutilgan tartibda oshkora sud muhokamasi yo\'li bilan isbotlanmaguncha va sudning qonuniy kuchga kirgan hukmi bilan aniqlanmaguncha aybsiz hisoblanadi.',
        points: 1
      },
      {
        id: 'm_law_4',
        section: 'Saylov huquqi',
        skillTag: 'Demokratik tamoyillar',
        text: 'O\'zbekiston fuqarolari necha yoshdan boshlab saylash huquqiga ega bo\'ladilar?',
        options: [
          '18 yoshdan',
          '16 yoshdan',
          '21 yoshdan',
          '25 yoshdan'
        ],
        correctOption: 0,
        explanation: 'O\'zbekiston Respublikasi fuqarolari 18 yoshga to\'lgan kundan boshlab faol saylov huquqiga (ovoz berish huquqiga) ega bo\'ladilar.',
        points: 1
      },
      {
        id: 'm_law_5',
        section: 'Mehnat huquqi',
        skillTag: 'Mehnat shartnomasi',
        text: 'O\'zbekiston Respublikasi Mehnat kodeksiga ko\'ra, qaysi yoshdan boshlab ota-onaning roziligi bilan yengil mehnatga qabul qilishga yo\'l qo\'yiladi?',
        options: [
          '15 yoshdan (maktab ta\'limidan bo\'sh vaqtda)',
          '14 yoshdan',
          '12 yoshdan',
          'Faqat 18 yoshdan'
        ],
        correctOption: 0,
        explanation: 'Mehnat kodeksiga asosan umumiy ishga qabul qilish 16 yoshdan, biroq 15 yoshga to\'lgan shaxslarni ota-onasidan birining yozma roziligi bilan ta\'limdan bo\'sh vaqtda yengil ishlarga qabul qilishga ruxsat etiladi.',
        points: 1
      }
    ]
  },

  // 10. MILLIY SERTIFIKAT - GEOGRAFIYA
  {
    id: 'milliy_geography_01',
    title: 'Milliy Sertifikat: Geografiya (Fizik va Iqtisodiy Geografiya)',
    examType: 'milliy',
    subject: 'Geografiya',
    description: 'O\'zbekiston tabiati, qazilma boyliklar, iqlim mintaqalari, materiklar va jahon iqtisodiy geografiyasi.',
    durationMinutes: 60,
    totalQuestions: 5,
    difficulty: 'Oson',
    createdAt: '2026-03-23',
    popularity: 84,
    attemptsCount: 6100,
    questions: [
      {
        id: 'm_geo_1',
        section: 'O\'zbekiston geografiyasi',
        skillTag: 'Tabiiy geografiya',
        text: 'O\'zbekiston Respublikasining eng baland nuqtasi qaysi cho\'qqi hisoblanadi va uning balandligi qancha?',
        options: [
          'Hazrati Sulton cho\'qqisi (Hisor tizmasi, 4643 m)',
          'Adelunga cho\'qqisi (Piskom tizmasi, 4301 m)',
          'Beshtor cho\'qqisi (4299 m)',
          'Bobotog\' cho\'qqisi (2292 m)'
        ],
        correctOption: 0,
        explanation: 'O\'zbekistonning eng baland nuqtasi — Surxondaryo viloyatidagi Hisor tog\' tizmasida joylashgan Hazrati Sulton cho\'qqisi (4643 metr).',
        points: 1
      },
      {
        id: 'm_geo_2',
        section: 'Iqtisodiy geografiya',
        skillTag: 'Sanoat va metallurgiya',
        text: 'O\'zbekistonda yirik gaz-kimyo majmualari (Sho\'rtan va Ustyurt) qaysi tabiiy xomashyolarni qayta ishlashga ixtisoslashgan?',
        options: [
          'Tabiiy gaz va gaz kondensatidan polimerlar (polietilen va polipropilen) ishlab chiqarish',
          'Temir rudasi va po\'lat eritish',
          'Paxta tolasini qayta ishlash',
          'Rangli metallar ishlab chiqarish'
        ],
        correctOption: 0,
        explanation: 'Sho\'rtan va Ustyurt gaz-kimyo majmualari tabiiy gazni chuqur qayta ishlab polietilen, polipropilen va polimer mahsulotlari ishlab chiqaradi.',
        points: 1
      },
      {
        id: 'm_geo_3',
        section: 'Jahon fizik geografiyasi',
        skillTag: 'Materiklar va okeanlar',
        text: 'Dunyodagi eng uzun tog\' tizmasi qaysi materikda joylashgan?',
        options: [
          'Janubiy Amerikadagi And tog\'lari (taxminan 9000 km)',
          'Osiyodagi Himoloy tog\'lari',
          'Shimoliy Amerikadagi Qoyali tog\'lar',
          'Yevropadagi Alp tog\'lari'
        ],
        correctOption: 0,
        explanation: 'And tog\'lari Janubiy Amerika materigining g\'arbiy qirg\'og\'i bo\'ylab 9000 km cho\'zilgan bo\'lib, quruqlikdagi eng uzun tog\' zanjiridir.',
        points: 1
      },
      {
        id: 'm_geo_4',
        section: 'Gidrologiya',
        skillTag: 'Daryolar va ko\'llar',
        text: 'O\'rta Osiyoning eng sersuv va eng uzun daryolari qaysilar hisoblanadi?',
        options: [
          'Amudaryo (eng sersuv) va Sirdaryo (eng uzun)',
          'Zarafshon va Qashqadaryo',
          'Chirchiq va Ohangaron',
          'Norin va Qoradaryo'
        ],
        correctOption: 0,
        explanation: 'Amudaryo — mintaqadagi eng sersuv daryo, Sirdaryo esa 3019 km uzunligi bilan O\'rta Osiyoning eng uzun daryosi hisoblanadi.',
        points: 1
      },
      {
        id: 'm_geo_5',
        section: 'Iqlimshunoslik',
        skillTag: 'Iqlim zonalari',
        text: 'O\'zbekiston hududi qaysi iqlim mintaqasida joylashgan va unga qanday xususiyat xos?',
        options: [
          'Mo\'tadil va subtropik mintaqadagi keskin kontinental iqlim (issiq quruq yoz, sovuq qish)',
          'Ekvatorial nam iqlim',
          'Dengizbo\'yi mo\'tadil iqlimi',
          'Arktika iqlimi'
        ],
        correctOption: 0,
        explanation: 'O\'zbekiston okeanlardan uzoqda ichki materikda joylashgani sababli keskin kontinental iqlimga ega: havo quruq, yoz juda issiq, qish esa sovuq bo\'ladi.',
        points: 1
      }
    ]
  },

  // 11. TILLAR - NEMIS TILI
  {
    id: 'tillar_german_01',
    title: 'Tillar: Nemis Tili (Goethe-Zertifikat B1/B2 Diagnostika)',
    examType: 'cefr',
    subject: 'Nemis tili',
    description: 'Leseverstehen, Sprachbausteine und Grammatik (Passiv, Konjunktiv II, Nebensätze).',
    durationMinutes: 45,
    totalQuestions: 4,
    difficulty: 'O\'rta',
    createdAt: '2026-03-16',
    popularity: 79,
    attemptsCount: 4300,
    questions: [
      {
        id: 'de_q1',
        section: 'Grammatik',
        skillTag: 'Konjunktiv II',
        text: 'Welcher Satz steht im korrekten Konjunktiv II der Gegenwart?',
        options: [
          'Wenn ich mehr Zeit hätte, würde ich nach Berlin reisen.',
          'Wenn ich mehr Zeit habe, reise ich nach Berlin.',
          'Wenn ich mehr Zeit hatte, reiste ich nach Berlin.',
          'Wenn ich mehr Zeit haben werde, reise ich.'
        ],
        correctOption: 0,
        explanation: 'Irrealer Bedingungssatz in der Gegenwart: "hätte" und "würde + Infinitiv" drücken einen Wunsch oder eine hypothetische Situation aus.',
        points: 1
      },
      {
        id: 'de_q2',
        section: 'Grammatik',
        skillTag: 'Passiv',
        text: 'Verwandeln Sie den Satz ins Vorgangspassiv: "Der Mechaniker repariert das Auto."',
        options: [
          'Das Auto wird von dem Mechaniker repariert.',
          'Das Auto ist repariert worden.',
          'Das Auto wurde repariert.',
          'Das Auto hat der Mechaniker repariert.'
        ],
        correctOption: 0,
        explanation: 'Präsens Passiv: Subjekt (Akkusativobjekt wird Subjekt) + wird + von + Dativ + Partizip II ("wird ... repariert").',
        points: 1
      },
      {
        id: 'de_q3',
        section: 'Wortschatz',
        skillTag: 'Nomen-Verb-Verbindungen',
        text: 'Welches Verb passt in die Wendung: "eine Entscheidung __________" (bir qarorga kelmoq)?',
        options: [
          'treffen',
          'machen',
          'nehmen',
          'setzen'
        ],
        correctOption: 0,
        explanation: '"Eine Entscheidung treffen" ist die korrekte feste Nomen-Verb-Verbindung im Deutschen.',
        points: 1
      },
      {
        id: 'de_q4',
        section: 'Lesen',
        skillTag: 'Leseverstehen',
        passage: 'Nachhaltige Mobilität gewinnt in deutschen Großstädten zunehmend an Bedeutung. Immer mehr Bürger nutzen das Deutschlandticket für den öffentlichen Nahverkehr.',
        text: 'Was wird im Text über den öffentlichen Nahverkehr gesagt?',
        options: [
          'Er wird von immer mehr Bürgern über das Deutschlandticket genutzt.',
          'Niemand möchte mehr Busse und Bahnen nutzen.',
          'Das Ticket ist nur auf dem Land gültig.',
          'Die Städte verbieten den öffentlichen Nahverkehr.'
        ],
        correctOption: 0,
        explanation: 'Im Text steht eindeutig: "Immer mehr Bürger nutzen das Deutschlandticket für den öffentlichen Nahverkehr."',
        points: 1
      }
    ]
  },

  // 12. TILLAR - RUS TILI
  {
    id: 'tillar_russian_01',
    title: 'Tillar: Rus Tili (ТРКИ B1/B2 & Grammatika Testi)',
    examType: 'cefr',
    subject: 'Rus tili',
    description: 'Падежи, глаголы движения, синтаксис сложного предложения и лексика.',
    durationMinutes: 40,
    totalQuestions: 4,
    difficulty: 'O\'rta',
    createdAt: '2026-03-17',
    popularity: 82,
    attemptsCount: 5100,
    questions: [
      {
        id: 'ru_q1',
        section: 'Грамматика',
        skillTag: 'Глаголы движения',
        text: 'Выберите правильный глагол: "Каждое утро я __________ в университет на автобусе."',
        options: [
          'езжу (повторяющееся действие)',
          'еду (прямо сейчас в один конец)',
          'поеду',
          'уехал'
        ],
        correctOption: 0,
        explanation: '"Каждое утро" указывает на регулярное, повторяющееся разнонаправленное действие, поэтому используется глагол "езжу".',
        points: 1
      },
      {
        id: 'ru_q2',
        section: 'Синтаксис',
        skillTag: 'Причастные обороты',
        text: 'В каком предложении причастный оборот выделен запятыми верно?',
        options: [
          'Студенты, успешно сдавшие экзамен, получили сертификаты.',
          'Студенты успешно сдавшие экзамен получили сертификаты.',
          'Студенты успешно сдавшие, экзамен получили сертификаты.',
          'Студенты, успешно сдавшие экзамен получили, сертификаты.'
        ],
        correctOption: 0,
        explanation: 'Причастный оборот "успешно сдавшие экзамен" стоит после определяемого слова "Студенты", поэтому выделяется запятыми с обеих сторон.',
        points: 1
      },
      {
        id: 'ru_q3',
        section: 'Падежи',
        skillTag: 'Управление глаголов',
        text: 'Укажите правильную падежную форму: "Мы долго восхищались __________ (красивый древний город)."',
        options: [
          'красивым древним городом (Творительный падеж)',
          'красивого древнего города',
          'красивому древнему городу',
          'красивый древний город'
        ],
        correctOption: 0,
        explanation: 'Глагол "восхищаться" управляет творительным падежом (кем? чем?): восхищаться красивым древним городом.',
        points: 1
      },
      {
        id: 'ru_q4',
        section: 'Лексика',
        skillTag: 'Фразеология',
        text: 'Что означает фразеологизм "спустя рукава"?',
        options: [
          'Небрежно, плохо и без старания',
          'Очень быстро и качественно',
          'В новой чистой одежде',
          'Без денег'
        ],
        correctOption: 0,
        explanation: '"Работать спустя рукава" — делать что-либо небрежно, лениво, без должного усердия.',
        points: 1
      }
    ]
  },
  ...SAT_OFFICIAL_TESTS
];

