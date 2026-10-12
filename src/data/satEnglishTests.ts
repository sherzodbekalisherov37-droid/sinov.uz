import { MockTest } from '../types';

export const SAT_OFFICIAL_TESTS: MockTest[] = [
  // 1. DIGITAL SAT READING & WRITING OFFICIAL PRACTICE TEST #1
  {
    id: 'sat_rw_official_01',
    title: 'Digital SAT: Reading & Writing Official Practice #1 (College Board & Erica Meltzer)',
    examType: 'sat',
    subject: 'Reading and Writing',
    description: 'Rasmiy Digital SAT formati: Craft & Structure, Information & Ideas, Standard English Conventions va Expression of Ideas bo\'yicha 10 talik to\'liq variant.',
    durationMinutes: 32,
    totalQuestions: 10,
    difficulty: 'Murakkab',
    createdAt: '2026-03-22',
    popularity: 99,
    attemptsCount: 22400,
    questions: [
      {
        id: 'sat_rw1_q1',
        section: 'Reading and Writing',
        skillTag: 'Craft & Structure: Words in Context',
        passage: `The botanist's hypothesis was initially dismissed by academic peers as overly speculative. However, after extensive field trials across three continents yielded uniform results, even the most skeptical reviewers were forced to acknowledge that her observations were __________.`,
        text: 'Which choice completes the text with the most logical and precise word?',
        options: [
          'irrefutable',
          'ephemeral',
          'superfluous',
          'tentative'
        ],
        correctOption: 0,
        explanation: 'Matnda avval gipoteza "spekulyativ" (taxminiy) deb rad etilgani, biroq uchta qit\'adagi sinovlardan so\'ng hatto eng skeptik taqrizchilar ham uning haqiqatligini tan olishga majbur bo\'lgani aytilmoqda. Shu sababli "irrefutable" (rad etib bo\'lmas, shubhasiz) so\'zi eng to\'g\'ri mos keladi.',
        points: 1
      },
      {
        id: 'sat_rw1_q2',
        section: 'Reading and Writing',
        skillTag: 'Craft & Structure: Text Purpose',
        passage: `In 1899, Charles Chesnutt published 'The Conjure Woman', a collection of interconnected dialect stories set in North Carolina. While local-color contemporaries depicted the American South through nostalgic lenses of romantic plantation mythology, Chesnutt strategically subverted pastoral tropes. Beneath humorous trickster anecdotes, his narratives rigorously documented the institutionalized cruelty and systemic exploitation intrinsic to antebellum chattel slavery.`,
        text: 'Which choice best describes the main purpose of the text?',
        options: [
          'To argue that Chesnutt’s work undermined conventional nostalgic portrayals to expose historical oppression.',
          'To demonstrate that dialect fiction was overwhelmingly popular among late nineteenth-century American critics.',
          'To explain why Chesnutt eventually abandoned North Carolina folklore in favor of legal essays.',
          'To prove that local-color writers shared Chesnutt\'s critical stance on plantation nostalgia.'
        ],
        correctOption: 0,
        explanation: 'Matn Chesnutt boshqa zamondoshlarining nostalgik qarashlarini rad etib ("subverted pastoral tropes"), kulgili hikoyalar zamirida qullikning vahshiyligi va shafqatsiz tizimini fosh etganini ko\'rsatadi. A varianti bu maqsadni to\'liq ifodalaydi.',
        points: 1
      },
      {
        id: 'sat_rw1_q3',
        section: 'Reading and Writing',
        skillTag: 'Craft & Structure: Cross-Text Connections',
        passage: `Text 1: Evolutionary biologist Ernst Mayr argued that allopatric speciation—where geographic barriers isolate subpopulations—is the primary driver of biodiversity. Without physical separation preventing gene flow, divergent selection pressures are almost always swamped by interbreeding.
Text 2: Recent genomic analyses of cichlid fish in volcanic crater lakes demonstrate that sympatric speciation occurs far more frequently than Mayr assumed. In tiny lakes devoid of physical barriers, distinct feeding morphs evolved rapidly through assertive assortative mating based on nuptial coloration.`,
        text: 'Based on the texts, how would the author of Text 2 most likely respond to the claim made by Mayr in Text 1?',
        options: [
          'By pointing out that behavioral isolation and sexual selection can induce speciation even in the absence of geographic barriers.',
          'By asserting that physical isolation is the sole mechanism responsible for aquatic speciation.',
          'By agreeing that cichlid fish provide definitive verification of allopatric divergence.',
          'By claiming that interbreeding completely eliminates any evolutionary adaptation in crater lakes.'
        ],
        correctOption: 0,
        explanation: 'Text 2 da vulqon ko\'llarida hech qanday geografik to\'siq bo\'lmasa ham, baliqlar o\'zaro juftlashish tanlovi (assortative mating) orqali yangi turlarga ajralgani (sympatric speciation) isbotlangan. Demak, Text 2 muallifi jismoniy to\'siqsiz ham turlar paydo bo\'lishini ta\'kidlaydi.',
        points: 1
      },
      {
        id: 'sat_rw1_q4',
        section: 'Reading and Writing',
        skillTag: 'Information & Ideas: Central Ideas',
        passage: `Spectroscopic observations by the James Webb Space Telescope of the rocky exoplanet TRAPPIST-1b have ruled out a thick, volatile-rich primary atmosphere. Thermal emission measurements indicate that the planet radiates virtually all incident stellar irradiation back into space as heat, a thermodynamic behavior characteristic of a bare, airless terrestrial body subjected to extreme ultraviolet radiation from its host red dwarf star.`,
        text: 'According to the text, what did researchers conclude about TRAPPIST-1b?',
        options: [
          'It is likely an airless terrestrial world lacking a substantial atmosphere.',
          'It possesses dense water vapor clouds shielding it from stellar flares.',
          'Its thermal emissions suggest subterranean ocean circulation.',
          'It experiences minimal ultraviolet radiation from its parent star.'
        ],
        correctOption: 0,
        explanation: 'Matnda "ruled out a thick... atmosphere" va "characteristic of a bare, airless terrestrial body" deyilgan, ya\'ni sayyora qalin atmosferaga ega emas va quruq toshloq havosiz jismdir.',
        points: 1
      },
      {
        id: 'sat_rw1_q5',
        section: 'Reading and Writing',
        skillTag: 'Information & Ideas: Inferences',
        passage: `For decades, primatologists observed chimpanzees fashioning twigs to fish for termites in Gombe National Park. When captive chimpanzees with no prior exposure to wild conspecifics were provided similar raw materials in laboratory enclosures, they spontaneously invented identical termite-fishing techniques within hours. This discovery suggests that termite fishing __________.`,
        text: 'Which choice most logically completes the text?',
        options: [
          'is not exclusively dependent on generational social learning or imitation.',
          'is entirely absent in chimpanzee populations inhabiting savanna habitats.',
          'can only be performed when human researchers demonstrate tool use.',
          'requires complex verbal communication among primates.'
        ],
        correctOption: 0,
        explanation: 'Hech qachon yovvoyi maymunlarni ko\'rmagan laboratoriya shimpanzelari ham bir necha soatda bu qurolni o\'zlari ixtiro qila olgani, ushbu xatti-harakat faqatgina avloddan-avlodga o\'tuvchi ijtimoiy taqlidga bog\'liq emasligini (mustaqil kognitiv qobiliyat ekanligini) ko\'rsatadi.',
        points: 1
      },
      {
        id: 'sat_rw1_q6',
        section: 'Reading and Writing',
        skillTag: 'Information & Ideas: Command of Evidence',
        passage: `Ecologist Maria Santos hypothesized that high herbivorous reef fish diversity protects coral ecosystems from macroalgal overgrowth following acute bleaching episodes. To evaluate this, her research team surveyed 40 Caribbean marine sanctuaries with varying fish biodiversity indices two years after a catastrophic marine heatwave.`,
        text: 'Which finding, if true, would most strongly support Santos’s hypothesis?',
        options: [
          'Sanctuaries hosting greater numbers of distinct herbivorous fish species exhibited significantly lower macroalgal density and higher juvenile coral recruitment.',
          'Sanctuaries with the highest coral mortality rates also contained the largest commercial shark populations.',
          'Macroalgal growth expanded uniformly across all surveyed reefs regardless of fish species richness.',
          'Bleaching severity was identical in both marine reserves and unprotected artisanal fishing zones.'
        ],
        correctOption: 0,
        explanation: 'Santos gipotezasi o\'txo\'r baliq turlarining xilma-xilligi marjonlarni suv o\'tlaridan himoya qilishini aytadi. Agar baliq turlari ko\'p bo\'lgan joylarda suv o\'tlari kamayib, yosh marjonlar ko\'paysa, bu gipotezani bevosita tasdiqlaydi.',
        points: 1
      },
      {
        id: 'sat_rw1_q7',
        section: 'Reading and Writing',
        skillTag: 'Standard English Conventions: Boundaries',
        text: 'The architectural firm completed the sustainable high-rise six months ahead of schedule __________ furthermore, the building earned net-zero carbon certification due to its rooftop photovoltaic array.',
        options: [
          ';',
          ',',
          ':',
          '-'
        ],
        correctOption: 0,
        explanation: 'Ikkita mustaqil gap (independent clause) o\'rtasida "furthermore" bog\'lovchi ravishi (conjunctive adverb) kelganda, uning oldidan nuqta-vergul (;), ketidan vergul (,) qo\'yiladi.',
        points: 1
      },
      {
        id: 'sat_rw1_q8',
        section: 'Reading and Writing',
        skillTag: 'Standard English Conventions: Subject-Verb Agreement',
        text: 'The collection of rare Mesoamerican ceramic vessels, which includes polychrome funerary urns recovered from highland tomb excavations, __________ on public display at the metropolitan museum throughout the autumn semester.',
        options: [
          'is',
          'are',
          'were',
          'have been'
        ],
        correctOption: 0,
        explanation: 'Gapning asosiy egasi "The collection" (birlikda). "of rare Mesoamerican ceramic vessels" va "which includes..." iboralari egaga tegishli qo\'shimcha aniqlovchidir. Birlikdagi ega uchun fe\'l ham birlikda bo\'lishi shart: "is".',
        points: 1
      },
      {
        id: 'sat_rw1_q9',
        section: 'Reading and Writing',
        skillTag: 'Expression of Ideas: Transitions',
        passage: `In conventional semiconductors, electrical resistance increases noticeably as ambient temperature climbs toward the thermal threshold. In newly engineered high-entropy ceramic alloys, __________, electrical resistance remains virtually flat across a two-thousand-degree operating spectrum.`,
        text: 'Which choice completes the text with the most logical transition?',
        options: [
          'by contrast',
          'furthermore',
          'for instance',
          'consequently'
        ],
        correctOption: 0,
        explanation: 'Birinchi gapda an\'anaviy yarimo\'tkazgichlarda harorat ko\'tarilganda qarshilik oshishi, ikkinchi gapda esa yangi keramika qotishmalarida qarshilik mutlaqo o\'zgarmasligi (zidlik/kontrast) aytilmoqda. "By contrast" (aksincha, taqqoslaganda) to\'g\'ri bog\'lovchidir.',
        points: 1
      },
      {
        id: 'sat_rw1_q10',
        section: 'Reading and Writing',
        skillTag: 'Expression of Ideas: Rhetorical Synthesis',
        passage: `While researching a paper on astronomer Henrietta Swan Leavitt, a student took the following notes:
• Leavitt worked as a human "computer" at the Harvard College Observatory in the early 1900s.
• She cataloged thousands of variable stars in photographic glass plates of the Magellanic Clouds.
• In 1912, she discovered that brighter Cepheid variables have longer pulsation periods.
• This period-luminosity relation enabled astronomers like Edwin Hubble to calculate precise cosmic distances.`,
        text: 'The student wants to emphasize the significance of Leavitt’s discovery for the field of astronomy. Which choice most effectively uses relevant information from the notes to accomplish this goal?',
        options: [
          'Leavitt’s discovery of the period-luminosity relation in Cepheid variables was pivotal because it provided astronomers with a reliable method to measure cosmic distances.',
          'In the early 1900s, Leavitt analyzed photographic glass plates while employed at the Harvard College Observatory.',
          'Henrietta Swan Leavitt was one of several women who examined variable stars in the Magellanic Clouds.',
          'Edwin Hubble was an astronomer who studied galaxies in the years following 1912.'
        ],
        correctOption: 0,
        explanation: 'Talabaning maqsadi Livittning kashfiyoti astronomiya sohasi uchun qanchalik muhim ahamiyatga ega bo\'lganini ko\'rsatishdir. A varianti davr-yorqinlik qonuniyati fazoviy masofalarni o\'lchash imkonini berganini aniq ta\'kidlaydi.',
        points: 1
      }
    ]
  },

  // 2. DIGITAL SAT ENGLISH - ADVANCED CONVENTIONS & CRAFT TEST #2
  {
    id: 'sat_rw_official_02',
    title: 'Digital SAT English: Standard Conventions & Advanced Grammar (Erica Meltzer Style)',
    examType: 'sat',
    subject: 'Reading and Writing',
    description: 'Erica Meltzer kitobi uslubidagi chuqur grammatik va leksik tahlil: Modifier placement, apostrophes, parallelism va rhetorical synthesis.',
    durationMinutes: 30,
    totalQuestions: 10,
    difficulty: 'Murakkab',
    createdAt: '2026-03-23',
    popularity: 98,
    attemptsCount: 19100,
    questions: [
      {
        id: 'sat_rw2_q1',
        section: 'Reading and Writing',
        skillTag: 'Standard English Conventions: Modifiers',
        text: 'Having examined the ancient parchment under multi-spectral ultraviolet imaging, __________. Which choice completes the text so that it conforms to the conventions of Standard English?',
        options: [
          'the conservator discovered an erased palimpsest text hidden beneath the medieval prayer hymns.',
          'an erased palimpsest text was discovered beneath the medieval prayer hymns by the conservator.',
          'the discovery of an erased palimpsest text surprised the museum conservation team.',
          'multi-spectral imaging revealed an erased palimpsest text to the conservator.'
        ],
        correctOption: 0,
        explanation: 'Dangling modifier qoidasi: "Having examined..." sifatdosh iborasi qadimgi qo\'lyozmani tekshirgan shaxsga ("the conservator") tegishlidir. Bosh gap aynan "the conservator" egasi bilan boshlanishi shart.',
        points: 1
      },
      {
        id: 'sat_rw2_q2',
        section: 'Reading and Writing',
        skillTag: 'Standard English Conventions: Apostrophes & Plurals',
        text: 'The archaeological team recovered dozens of stone __________ dating from the late Neolithic era, each bearing intricate geometric incisions around __________ rim.',
        options: [
          'vessels / its',
          'vessel\'s / its',
          'vessels\' / it\'s',
          'vessels / it\'s'
        ],
        correctOption: 0,
        explanation: '"vessels" — ko\'plik shakli (hech qanday egalik qo\'shimchasisiz). "its" esa "har birining hoshiyasi" ma\'nosida egalik olmoshi (it\'s bu "it is" qisqartmasi bo\'lib, bu yerga to\'g\'ri kelmaydi).',
        points: 1
      },
      {
        id: 'sat_rw2_q3',
        section: 'Reading and Writing',
        skillTag: 'Standard English Conventions: Parallel Structure',
        text: 'The renewable energy initiative aims not only to reduce municipal greenhouse gas emissions by forty percent but also __________ sustainable industrial employment in disadvantaged urban sectors.',
        options: [
          'to generate',
          'generating',
          'generates',
          'generation of'
        ],
        correctOption: 0,
        explanation: 'Parallel tuzilma: "not only to reduce... but also to generate...". Ikkala qism ham bir xil infinitiv forma bilan bog\'lanishi shart.',
        points: 1
      },
      {
        id: 'sat_rw2_q4',
        section: 'Reading and Writing',
        skillTag: 'Craft & Structure: Words in Context',
        passage: `Although urban planners feared that closing the downtown thoroughfare to vehicular traffic would create catastrophic gridlock on surrounding avenues, the pedestrianization project proved remarkably __________: commuters readily transitioned to metro lines, and local retail revenue surged by thirty percent.`,
        text: 'Which choice completes the text with the most logical and precise word?',
        options: [
          'salutary',
          'precarious',
          'pernicious',
          'anomalous'
        ],
        correctOption: 0,
        explanation: '"Salutary" — foydali, xayrli, ijobiy oqibat keltiruvchi (beneficial, producing good effects) degan ma\'noni bildiradi. Matndagi odamlar metroga o\'tgani va savdo 30% oshgani bu natijaning ijobiyligini tasdiqlaydi.',
        points: 1
      },
      {
        id: 'sat_rw2_q5',
        section: 'Reading and Writing',
        skillTag: 'Information & Ideas: Inferences',
        passage: `In subterranean ant colonies, individual foragers make trail-following decisions based on pheromone concentration gradients. When artificial labyrinths present ants with an abrupt bifurcation between a steep, pheromone-rich ramp and a flat, un-scented corridor, over ninety-five percent of foragers consistently traverse the steep ramp despite expending threefold more caloric energy.`,
        text: 'The author implies which of the following about ant navigation?',
        options: [
          'Chemical communication signals exert stronger behavioral motivation than energetic efficiency optimization.',
          'Subterranean ants lack physiological capacity to perceive elevation gradients.',
          'Pheromone evaporation rates are significantly higher along horizontal trajectories.',
          'Foragers deliberately avoid scent trails established by sibling colonies.'
        ],
        correctOption: 0,
        explanation: 'Chumolilar 3 barobar ko\'p energiya sarflansa ham hid izidan borishni tanlagani, feromon signallari jismoniy energiya tejashdan ko\'ra kuchliroq turtki berishini ko\'rsatadi.',
        points: 1
      },
      {
        id: 'sat_rw2_q6',
        section: 'Reading and Writing',
        skillTag: 'Standard English Conventions: Pronouns',
        text: 'Neither the lead astrophysicist nor the computer simulation engineers __________ able to account for the anomalous gravitational lensing detected near the galactic core.',
        options: [
          'were',
          'was',
          'is',
          'has been'
        ],
        correctOption: 0,
        explanation: '"Neither... nor..." tuzilmasida fe\'l o\'ziga eng yaqin turgan ega bilan moslashadi. Bu yerda fe\'lga eng yaqin ega "the computer simulation engineers" (ko\'plikda), shuning uchun o\'tgan zamonda ko\'plik shakli "were" to\'g\'ri.',
        points: 1
      },
      {
        id: 'sat_rw2_q7',
        section: 'Reading and Writing',
        skillTag: 'Expression of Ideas: Transitions',
        passage: `Proponents of urban vertical farming emphasize that indoor hydroponic installations eliminate pesticide runoff and consume ninety-five percent less freshwater than conventional agriculture. __________, the immense electrical demand required for twenty-four-hour LED lighting matrices currently results in a substantial carbon footprint unless paired directly with dedicated nuclear or geothermal power.`,
        text: 'Which choice completes the text with the most logical transition?',
        options: [
          'However',
          'Specifically',
          'Furthermore',
          'Consequently'
        ],
        correctOption: 0,
        explanation: 'Birinchi gap vertikal fermerlikning ijobiy tomonlarini keltirsa, ikkinchi gap uning ulkan elektr sarfi va uglerod izini (kamchilik va qarama-qarshilik) ta\'kidlaydi. "However" (Biroq, ammo) eng to\'g\'ri bog\'lovchidir.',
        points: 1
      },
      {
        id: 'sat_rw2_q8',
        section: 'Reading and Writing',
        skillTag: 'Information & Ideas: Command of Evidence',
        passage: `A literature scholar claims that Mary Shelley’s 1818 novel Frankenstein was fundamentally shaped by contemporary debates over vitalism—the scientific belief that a non-physical principle distinguishes living organisms from inanimate matter. To support this claim, the scholar cites correspondence between Shelley and physiologist William Lawrence.`,
        text: 'Which piece of evidence from Shelley’s letters would most directly substantiate the scholar’s claim?',
        options: [
          'Passages where Shelley explicitly discusses Lawrence’s lectures on organic vitality and integrates his physiological theories into Victor Frankenstein’s laboratory experiments.',
          'A note mentioning that Shelley attended a dramatic theatrical production of Hamlet during her stay in Geneva.',
          'A letter in which Shelley inquires about the publication costs of travel memoirs in London.',
          'Records showing that Percy Bysshe Shelley proofread typographical errors in the manuscript.'
        ],
        correctOption: 0,
        explanation: 'Olimning da\'vosi Shilli romanining vitalizm nazariyasi bo\'yicha bahslar ta\'sirida yaratilgani haqida. Agar xatlarda Shilli Uilyam Lorensning organik hayotiylik ma\'ruzalarini bevosita muhokama qilib, uni laboratoriya tajribalariga kiritgani ko\'rsatilsa, bu eng kuchli bevosita dalildir.',
        points: 1
      },
      {
        id: 'sat_rw2_q9',
        section: 'Reading and Writing',
        skillTag: 'Standard English Conventions: Relative Clauses',
        text: 'The James Webb Space Telescope, __________ mirror consists of eighteen gold-plated beryllium hexagonal segments, captured unprecedented infrared spectra of primordial protogalaxies.',
        options: [
          'whose',
          'who\'s',
          'which',
          'that'
        ],
        correctOption: 0,
        explanation: 'Egalik nisbati uchun "whose" ("uning oynasi" ma\'nosida) to\'g\'ri keladi. "who\'s" bu "who is" degani, "which" va "that" esa egalik bildirmaydi.',
        points: 1
      },
      {
        id: 'sat_rw2_q10',
        section: 'Reading and Writing',
        skillTag: 'Expression of Ideas: Rhetorical Synthesis',
        passage: `Notes taken by a student researching the Harlem Renaissance sculptor Augusta Savage:
• In 1929, Savage created 'Gamin', a lifelike bronze bust of an African American youth.
• The bust won critical acclaim and secured her a Julius Rosenwald Fellowship to study in Paris.
• Savage later founded the Harlem Community Art Center, mentoring legendary artists including Jacob Lawrence.
• In 1939, she sculpted 'The Harp' for the New York World's Fair, celebrating black musical heritage.`,
        text: 'The student wants to highlight Augusta Savage\'s commitment to artistic mentorship. Which choice most effectively uses relevant information from the notes to accomplish this goal?',
        options: [
          'Beyond her own celebrated sculptures, Savage demonstrated a profound dedication to artistic mentorship by founding the Harlem Community Art Center and training emerging talents like Jacob Lawrence.',
          'Augusta Savage created notable artworks such as \'Gamin\' in 1929 and \'The Harp\' in 1939.',
          'After winning a Julius Rosenwald Fellowship for \'Gamin\', Savage traveled to Paris to pursue formal sculpting techniques.',
          'The Harlem Renaissance was characterized by diverse community initiatives and celebrated bronze busts.'
        ],
        correctOption: 0,
        explanation: 'Talabaning asosiy maqsadi Savage\'ning murabbiylik (mentorship) faoliyatini yoritishdir. A varianti Harlem San\'at markazini tashkil etib, Jacob Lawrence kabi yosh iste\'dodlarni tarbiyalaganini aniq ta\'kidlaydi.',
        points: 1
      }
    ]
  },

  // 3. DIGITAL SAT MATH OFFICIAL PRACTICE TEST #1
  {
    id: 'sat_math_official_01',
    title: 'Digital SAT: Math Official Practice #1 (Algebra & Advanced Math)',
    examType: 'sat',
    subject: 'Math',
    description: 'Rasmiy College Board talablari: Chiziqli tenglamalar sistemasi, kvadratik funksiyalar, eksponentsial o\'sish va koordinatalar geometriyasi.',
    durationMinutes: 35,
    totalQuestions: 10,
    difficulty: 'Murakkab',
    createdAt: '2026-03-24',
    popularity: 97,
    attemptsCount: 20800,
    questions: [
      {
        id: 'sat_m1_q1',
        section: 'Math',
        skillTag: 'Heart of Algebra: Linear Systems',
        text: 'If 4x + 3y = 25 and 3x - y = 9, what is the value of 7x + 2y?',
        options: [
          '34',
          '16',
          '28',
          '42'
        ],
        correctOption: 0,
        explanation: 'Ikkala tenglamani o\'zaro qo\'shamiz: (4x + 3y) + (3x - y) = 25 + 9 => 7x + 2y = 34. To\'g\'ridan-to\'g\'ri yechim: 34.',
        points: 1
      },
      {
        id: 'sat_m1_q2',
        section: 'Math',
        skillTag: 'Passport to Advanced Math: Quadratics',
        text: 'A parabola in the xy-plane has its vertex at (3, -4) and passes through the point (5, 8). Which equation represents this parabola?',
        options: [
          'y = 3(x - 3)² - 4',
          'y = 2(x - 3)² - 4',
          'y = 3(x + 3)² - 4',
          'y = (x - 3)² + 8'
        ],
        correctOption: 0,
        explanation: 'Parabola cho\'qqi formasi: y = a(x - h)² + k. Cho\'qqi (3, -4) bo\'lgani uchun y = a(x - 3)² - 4. Nuqta (5, 8) ni qo\'yamiz: 8 = a(5 - 3)² - 4 => 12 = 4a => a = 3. Demak, y = 3(x - 3)² - 4.',
        points: 1
      },
      {
        id: 'sat_m1_q3',
        section: 'Math',
        skillTag: 'Heart of Algebra: No Solution Condition',
        text: 'For what value of k will the system of equations have no solution? \nkx + 6y = 14 \n4x + 3y = 7',
        options: [
          '8',
          '4',
          '2',
          '12'
        ],
        correctOption: 0,
        explanation: 'Tenglamalar sistemasining yechimi bo\'lmasligi uchun to\'g\'ri chiziqlar parallel bo\'lishi kerak: k / 4 = 6 / 3 != 14 / 7. 6 / 3 = 2, demak k / 4 = 2 => k = 8.',
        points: 1
      },
      {
        id: 'sat_m1_q4',
        section: 'Math',
        skillTag: 'Problem Solving: Exponential Growth',
        text: 'A bacterial culture initially contains 500 cells and doubles in population every 4 hours. Which function P(t) models the population after t hours?',
        options: [
          'P(t) = 500(2)^(t/4)',
          'P(t) = 500(4)^(t/2)',
          'P(t) = 500(2)^(4t)',
          'P(t) = 2(500)^(t/4)'
        ],
        correctOption: 0,
        explanation: 'Boshlang\'ich miqdor 500, ko\'paytma omili 2 va har 4 soatda ikkilanadi. Formula: P(t) = P₀ * 2^(t/4) = 500 * (2)^(t/4).',
        points: 1
      },
      {
        id: 'sat_m1_q5',
        section: 'Math',
        skillTag: 'Geometry: Circle Equation',
        text: 'The equation of a circle in the xy-plane is x² + y² - 8x + 10y + 5 = 0. What is the radius of the circle?',
        options: [
          '6',
          '36',
          '5',
          '√36'
        ],
        correctOption: 0,
        explanation: 'To\'liq kvadratlarga ajratamiz: (x² - 8x + 16) + (y² + 10y + 25) = -5 + 16 + 25 => (x - 4)² + (y + 5)² = 36. Radius: r² = 36 => r = 6.',
        points: 1
      },
      {
        id: 'sat_m1_q6',
        section: 'Math',
        skillTag: 'Passport to Advanced Math: Polynomials',
        text: 'If (2x - 3) is a factor of 2x³ - x² - 7x + 6, what is the value of the polynomial when x = 3/2?',
        options: [
          '0',
          '3',
          '-3',
          '6'
        ],
        correctOption: 0,
        explanation: 'Bezu teoremasiga (Factor Theorem) ko\'ra, agar (2x - 3) ko\'phadning ko\'paytuvchisi bo\'lsa, uning ildizi x = 3/2 qo\'yilganda qiymat aniq 0 ga teng bo\'ladi.',
        points: 1
      },
      {
        id: 'sat_m1_q7',
        section: 'Math',
        skillTag: 'Additional Topics: Trigonometry',
        text: 'In a right-angled triangle ABC with right angle at C, if sin(A) = 5/13, what is the value of cos(B)?',
        options: [
          '5/13',
          '12/13',
          '13/5',
          '12/5'
        ],
        correctOption: 0,
        explanation: 'To\'g\'ri burchakli uchburchakda A va B o\'tkir burchaklari qo\'shimcha burchaklardir (A + B = 90°). Kofunksiya ayniyatiga ko\'ra: cos(B) = sin(A) = 5/13.',
        points: 1
      },
      {
        id: 'sat_m1_q8',
        section: 'Math',
        skillTag: 'Problem Solving: Percentages',
        text: 'A retailer increased the price of a laptop by 20%, and then discounted the new price by 20% for a seasonal sale. The final sale price is what percent of the original price?',
        options: [
          '96%',
          '100%',
          '98%',
          '94%'
        ],
        correctOption: 0,
        explanation: 'Boshlang\'ich narx 100 bo\'lsa: 20% oshirilgach 120 bo\'ladi. Keyin 120 ning 20% i (24) chegirma qilinsa: 120 - 24 = 96 bo\'ladi. Demak, boshlang\'ich narxning 96% i.',
        points: 1
      },
      {
        id: 'sat_m1_q9',
        section: 'Math',
        skillTag: 'Passport to Advanced Math: Rational Functions',
        text: 'For what real value of x is the rational expression (x² - 16) / (x² - 2x - 8) undefined and represents a removable discontinuity (hole)?',
        options: [
          '4',
          '-2',
          '-4',
          '2'
        ],
        correctOption: 0,
        explanation: 'Surat: (x - 4)(x + 4). Maxraj: (x - 4)(x + 2). Maxraj x = 4 va x = -2 da 0 bo\'ladi. x = 4 da surat ham, maxraj ham 0 bo\'lib, qisqarib ketadi (removable discontinuity / teshik). x = -2 esa vertikal asimptotadir.',
        points: 1
      },
      {
        id: 'sat_m1_q10',
        section: 'Math',
        skillTag: 'Heart of Algebra: Inequalities',
        text: 'Which ordered pair (x, y) satisfies the system of inequalities: y > 2x - 3 and y <= -x + 4?',
        options: [
          '(1, 2)',
          '(3, 1)',
          '(0, -4)',
          '(4, 0)'
        ],
        correctOption: 0,
        explanation: '(1, 2) ni tekshiramiz: 2 > 2(1) - 3 => 2 > -1 (to\'g\'ri). 2 <= -1 + 4 => 2 <= 3 (to\'g\'ri). Ikkala shart ham qanoatlantirildi.',
        points: 1
      }
    ]
  }
];
