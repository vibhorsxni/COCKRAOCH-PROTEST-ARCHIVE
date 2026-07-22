// ─────────────────────────────────────────────────────────────────────────────
//  CJP MOVEMENT — Unified Chronological Event Series
//  Built from real sources: The Hindu, NDTV, Wikipedia, CJP Official Website
//
//  Single continuous chronological sequence — NO nested subcategories/subtimelines.
//  Every event is a top-level milestone on the movement chronicle.
// ─────────────────────────────────────────────────────────────────────────────

export const initialEvents = [

  // ══════════════════════════════════════════════════════════════════
  //  PHASE 1 — The Spark: Judicial Remark & Immediate Backlash
  // ══════════════════════════════════════════════════════════════════

  {
    id: 'e_01',
    phase: 'Phase 1: The Spark',
    category: 'Judicial',
    categoryColor: '#ef4444',
    title: 'The "Cockroach" Observation by the Chief Justice',
    timestamp: '2026-05-15T06:00:00Z',   // May 15 • 11:30 AM IST
    location: 'Supreme Court of India, New Delhi',
    thumbnail: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80',
    description:
      'During a hearing on a contempt plea regarding the delay in designating Senior Advocates, a bench led by Chief Justice of India (CJI) Surya Kant and Justice Joymalya Bagchi criticized frivolous litigation and attacks on the judiciary. CJI Kant remarked: "There are youngsters like cockroaches; they don\'t get any employment, and they don\'t have any place in a profession. Some of them become media, some of them become social media, some of them become RTI activists... and they start attacking everyone." He also referred to such individuals as "parasites of society." The remark was recorded by courtroom media and immediately went viral on social media platforms within hours, sparking nationwide outrage.',
    upvotes: 42,
    downvotes: 3,
    contributors: 1,
    isLive: false,
    isMajor: true,
    links: [
      'https://en.wikipedia.org/wiki/2026_Delhi_Jantar_Mantar_protests',
      'https://cockroachjantaparty.raizian.in/about'
    ],
    media: [
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=900&q=80',
        title: 'Supreme Court Courtroom Hearing'
      }
    ]
  },

  {
    id: 'e_02',
    phase: 'Phase 1: The Spark',
    category: 'Judicial',
    categoryColor: '#f87171',
    title: 'CJI\'s Clarification & Public Backlash',
    timestamp: '2026-05-16T12:00:00Z',   // May 16 • 5:30 PM IST
    location: 'Supreme Court of India, New Delhi',
    thumbnail: 'https://images.unsplash.com/photo-1453396450673-3fe83d2db2c4?w=800&q=80',
    description:
      'Facing intense backlash, CJI Surya Kant issued a statement clarifying that his remarks were "misquoted" and specifically targeted individuals entering professions with "fake and bogus degrees," not the youth at large. Despite the clarification, the term "cockroach" had already been adopted by disenchanted youth as a badge of honour. Hashtags like #CockroachRevolution and #WeAreAllCockroaches trended on X (formerly Twitter) and Instagram within 24 hours.',
    upvotes: 38,
    downvotes: 1,
    contributors: 1,
    isLive: false,
    isMajor: false,
    links: [
      'https://www.thehindu.com/news/national/cjp-protest-july-20-2026-cockroach-janata-party-jantar-mantar-parliament-march-sonam-wangchuk/article71242448.ece',
      'https://en.wikipedia.org/wiki/2026_Delhi_Jantar_Mantar_protests'
    ],
    media: [
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1453396450673-3fe83d2db2c4?w=900&q=80',
        title: 'Press Coverage of CJI Statement'
      }
    ]
  },

  // ══════════════════════════════════════════════════════════════════
  //  PHASE 2 — Birth of the Movement
  // ══════════════════════════════════════════════════════════════════

  {
    id: 'e_03',
    phase: 'Phase 2: Birth of Movement',
    category: 'Movement',
    categoryColor: '#f97316',
    title: 'Launch of the Cockroach Janta Party (CJP)',
    timestamp: '2026-05-16T18:30:00Z',   // May 17 • 12:00 AM IST
    location: 'Online (Digital Launch)',
    thumbnail: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&q=80',
    description:
      'Communications strategist Abhijeet Dipke, a former AAP volunteer and Boston University graduate, launched the Cockroach Janta Party (CJP) as a satirical response to the CJI\'s remark — a direct parody of the ruling Bharatiya Janata Party (BJP). Dipke launched a website and social media handles overnight with the tagline "Voice of the Lazy & Unemployed." The movement\'s mock eligibility criteria listed being "unemployed, lazy, chronically online, and able to rant professionally." Within hours, it transformed from a satirical meme into a serious digital-first political pressure front.',
    upvotes: 95,
    downvotes: 4,
    contributors: 2,
    isLive: false,
    isMajor: true,
    links: [
      'https://cockroachjantaparty.raizian.in/',
      'https://cockroachjantaparty.raizian.in/founder',
      'https://www.instagram.com/cockroachjantaparty'
    ],
    media: [
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=900&q=80',
        title: 'CJP Official Platform Launch'
      }
    ]
  },

  {
    id: 'e_04',
    phase: 'Phase 2: Birth of Movement',
    category: 'Viral',
    categoryColor: '#fb923c',
    title: 'Viral Explosion on Social Media (22M+ Followers)',
    timestamp: '2026-05-17T04:00:00Z',   // May 17–21
    location: 'Digital — Instagram & X',
    thumbnail: 'https://images.unsplash.com/photo-1562564055-71e051d33c19?w=800&q=80',
    description:
      'The CJP\'s Instagram account gained over 22 million followers and 350,000 sign-ups within a single week, surpassing the official follower count of the BJP. The movement rapidly transitioned from a meme to an organized digital collective, using AI tools to generate manifestos, campaign posters, and mock election symbols. The cockroach became the de facto mascot of Gen Z discontent in India.',
    upvotes: 110,
    downvotes: 2,
    contributors: 3,
    isLive: false,
    isMajor: false,
    links: [
      'https://www.instagram.com/cockroachjantaparty',
      'https://cockroachjantaparty.raizian.in/'
    ],
    media: [
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1562564055-71e051d33c19?w=900&q=80',
        title: '22M Instagram Follower Surge'
      }
    ]
  },

  // ══════════════════════════════════════════════════════════════════
  //  PHASE 3 — Escalation: NEET Leak & Street Protests
  // ══════════════════════════════════════════════════════════════════

  {
    id: 'e_05',
    phase: 'Phase 3: NEET Leak & Escalation',
    category: 'Scandal',
    categoryColor: '#eab308',
    title: 'NEET-UG 2026 Paper Leak Allegations Surface',
    timestamp: '2026-05-25T04:30:00Z',   // May 25 • 10:00 AM IST
    location: 'National — Multiple Cities',
    thumbnail: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80',
    description:
      'Allegations surfaced that the NEET-UG 2026 question paper had been leaked prior to the exam (which was held on May 3, 2026). Students across multiple states reported receiving papers via WhatsApp hours before the exam. Student unions began protesting, but the movement lacked a unified voice until CJP intervened. CJP adopted the cause, merging the "cockroach" identity with the demand for educational integrity and systemic accountability.',
    upvotes: 84,
    downvotes: 5,
    contributors: 4,
    isLive: false,
    isMajor: true,
    links: [
      'https://en.wikipedia.org/wiki/2026_Delhi_Jantar_Mantar_protests#Scandals',
      'https://www.ndtv.com/india-news/cjp-protest-in-delhi-live-cockroach-janta-party-parliament-protest-abhijeet-dipke-jantar-mantar-sonam-wangchuk-parliament-monsoon-session-saurav-das-11794314'
    ],
    media: [
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=900&q=80',
        title: 'NEET Exam Leak Investigation'
      }
    ]
  },

  {
    id: 'e_06',
    phase: 'Phase 3: NEET Leak & Escalation',
    category: 'Protest',
    categoryColor: '#22c55e',
    title: 'CJP Begins Physical Sit-in at Jantar Mantar',
    timestamp: '2026-06-06T02:00:00Z',   // June 6 • 7:30 AM IST
    location: 'Jantar Mantar, New Delhi',
    thumbnail: 'https://images.unsplash.com/photo-1591955506264-3f5a6834570a?w=800&q=80',
    description:
      'Abhijeet Dipke and CJP supporters established a physical protest site at Jantar Mantar, demanding the resignation of Union Education Minister Dharmendra Pradhan. The protest included community service drives (clean-ups) where volunteers dressed in cockroach costumes, garnering significant media attention and converting online outrage into physical presence.',
    upvotes: 76,
    downvotes: 2,
    contributors: 5,
    isLive: false,
    isMajor: true,
    links: [
      'https://cockroachjantaparty.raizian.in/delhi-protest',
      'https://en.wikipedia.org/wiki/2026_Delhi_Jantar_Mantar_protests#First_protest_at_Jantar_Mantar'
    ],
    media: [
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1591955506264-3f5a6834570a?w=900&q=80',
        title: 'Jantar Mantar Camp Setup'
      }
    ]
  },

  {
    id: 'e_07',
    phase: 'Phase 3: NEET Leak & Escalation',
    category: 'Campaign',
    categoryColor: '#14b8a6',
    title: 'CJP Nationwide Postcard Protest & Petition Drive',
    timestamp: '2026-06-15T04:00:00Z',   // June 15 • 9:30 AM IST
    location: 'Nationwide — Postal & Digital',
    thumbnail: 'https://images.unsplash.com/photo-1586339949916-3e9457bef6d3?w=800&q=80',
    description:
      'CJP launched a nationwide "Postcard Protest" campaign, urging supporters across India to mail physical postcards (costing ₹2.50) to the Ministry of Education demanding the Minister\'s resignation. Simultaneously, an online petition at petition.cockroachjantaparty.org gained over 2 million signatures, and CJP launched its official membership ID card system.',
    upvotes: 68,
    downvotes: 1,
    contributors: 6,
    isLive: false,
    isMajor: false,
    links: [
      'https://cockroachjantaparty.raizian.in/postcard-protest',
      'https://cockroachjantaparty.raizian.in/id-card'
    ],
    media: [
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1586339949916-3e9457bef6d3?w=900&q=80',
        title: 'Postcard Protest Campaign'
      }
    ]
  },

  {
    id: 'e_08',
    phase: 'Phase 3: NEET Leak & Escalation',
    category: 'Scandal',
    categoryColor: '#facc15',
    title: 'NEET Re-examination Conducted Under Heavy Security',
    timestamp: '2026-06-21T01:00:00Z',   // June 21 • 6:30 AM IST
    location: 'National — Exam Centers',
    thumbnail: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80',
    description:
      'A re-examination for NEET was conducted under tight security across affected centers. However, protesters argued this did not address systemic accountability or the suicides of affected students. CJP intensified its rhetoric, calling for a complete overhaul of the examination system.',
    upvotes: 52,
    downvotes: 6,
    contributors: 3,
    isLive: false,
    isMajor: false,
    links: [
      'https://www.thehindu.com/news/national/cjp-protest-july-20-2026-cockroach-janata-party-jantar-mantar-parliament-march-sonam-wangchuk/article71242448.ece',
      'https://en.wikipedia.org/wiki/2026_Delhi_Jantar_Mantar_protests'
    ],
    media: [
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=900&q=80',
        title: 'Re-examination Day Security'
      }
    ]
  },

  {
    id: 'e_09',
    phase: 'Phase 3: NEET Leak & Escalation',
    category: 'Crackdown',
    categoryColor: '#f43f5e',
    title: 'Government Crackdown on CJP Digital Accounts',
    timestamp: '2026-06-21T06:30:00Z',   // June 21 • 12:00 PM IST
    location: 'New Delhi — MeitY & High Court',
    thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80',
    description:
      'MeitY ordered the blocking of CJP\'s X (formerly Twitter) account under Section 69(A) of the IT Act, citing "national security concerns." CJP immediately relaunched under a new handle (\'Cockroach is Back\'). Abhijeet Dipke filed a petition in the Delhi High Court, which eventually led to the unblocking of the account on July 7, 2026.',
    upvotes: 91,
    downvotes: 8,
    contributors: 4,
    isLive: false,
    isMajor: true,
    links: [
      'https://en.wikipedia.org/wiki/2026_Delhi_Jantar_Mantar_protests#Scandals',
      'https://cockroachjantaparty.raizian.in/bulletin'
    ],
    media: [
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=900&q=80',
        title: 'MeitY Account Ban Order'
      }
    ]
  },

  // ══════════════════════════════════════════════════════════════════
  //  PHASE 4 — The Hunger Strike: Entry of Sonam Wangchuk
  // ══════════════════════════════════════════════════════════════════

  {
    id: 'e_10',
    phase: 'Phase 4: The Hunger Strike',
    category: 'Hunger Strike',
    categoryColor: '#3b82f6',
    title: 'Sonam Wangchuk Joins Protest & Announces Hunger Strike',
    timestamp: '2026-06-28T02:30:00Z',   // June 28 • 8:00 AM IST
    location: 'Jantar Mantar, New Delhi',
    thumbnail: 'https://images.unsplash.com/photo-1569426489641-24e9b567a55c?w=800&q=80',
    description:
      'Renowned activist and engineer Sonam Wangchuk, known for his transformative work in Ladakh, joined the CJP protest at Jantar Mantar and announced an indefinite hunger strike. Wangchuk\'s involvement legitimized the movement further, drawing support from opposition parties, student groups (AISA, SFI, AISF), and civil society across India.',
    upvotes: 145,
    downvotes: 3,
    contributors: 7,
    isLive: false,
    isMajor: true,
    links: [
      'https://cockroachjantaparty.raizian.in/support-sonam-wangchuk',
      'https://en.wikipedia.org/wiki/2026_Delhi_Jantar_Mantar_protests#Hunger_strikes'
    ],
    media: [
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1569426489641-24e9b567a55c?w=900&q=80',
        title: 'Sonam Wangchuk Joining Protest'
      }
    ]
  },

  {
    id: 'e_11',
    phase: 'Phase 4: The Hunger Strike',
    category: 'Hunger Strike',
    categoryColor: '#60a5fa',
    title: 'Deterioration of Sonam Wangchuk\'s Health (Day 15–20)',
    timestamp: '2026-07-12T00:00:00Z',   // July 12 • 5:30 AM IST
    location: 'Jantar Mantar, New Delhi',
    thumbnail: 'https://images.unsplash.com/photo-1631815590958-4d5e50c11dd9?w=800&q=80',
    description:
      'As Wangchuk\'s fast entered its third week, his health visibly declined. He survived on water alone and lost significant weight. Medical teams monitored his vital parameters daily as thousands visited Jantar Mantar to show solidarity.',
    upvotes: 112,
    downvotes: 2,
    contributors: 5,
    isLive: false,
    isMajor: false,
    links: [
      'https://www.thehindu.com/news/national/cjp-protest-july-20-2026-cockroach-janata-party-jantar-mantar-parliament-march-sonam-wangchuk/article71242448.ece',
      'https://www.ndtv.com/india-news/cjp-protest-in-delhi-live'
    ],
    media: [
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1631815590958-4d5e50c11dd9?w=900&q=80',
        title: 'On-site Medical Checks'
      }
    ]
  },

  {
    id: 'e_12',
    phase: 'Phase 4: The Hunger Strike',
    category: 'Hunger Strike',
    categoryColor: '#38bdf8',
    title: 'Wangchuk\'s "Ghost" Statement & July 20 Mobilization',
    timestamp: '2026-07-17T06:30:00Z',   // July 17 • 12:00 PM IST
    location: 'Jantar Mantar, New Delhi',
    thumbnail: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80',
    description:
      'On Day 20 of his fast, Sonam Wangchuk vowed to stay alive until July 20 to lead the \'Sansad Chalo\' march, stating he would "return as a ghost" to haunt those who failed India\'s youth if the mobilization failed. SFI leader Adarsh M. Saji and former JNUSU president Aishe Ghosh joined in solidarity.',
    upvotes: 128,
    downvotes: 4,
    contributors: 6,
    isLive: false,
    isMajor: true,
    links: [
      'https://cockroachjantaparty.raizian.in/bulletin/cjp-announces-parliament-march-july-20-sonam-wangchuk',
      'https://en.wikipedia.org/wiki/2026_Delhi_Jantar_Mantar_protests'
    ],
    media: [
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=900&q=80',
        title: 'Broadcast of Ghost Statement'
      }
    ]
  },

  {
    id: 'e_13',
    phase: 'Phase 4: The Hunger Strike',
    category: 'Crackdown',
    categoryColor: '#a855f7',
    title: 'Forced Hospitalization of Sonam Wangchuk to Safdarjung',
    timestamp: '2026-07-18T18:00:00Z',   // July 18 • 11:30 PM IST
    location: 'Jantar Mantar → Safdarjung Hospital, New Delhi',
    thumbnail: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80',
    description:
      'Following a severe health decline, Delhi Police forcibly shifted Wangchuk to Safdarjung Hospital at 11:30 PM IST. Supporters alleged manhandling, while police cited a medical emergency. In solidarity, Abhijeet Dipke immediately began his own indefinite hunger strike at the protest site.',
    upvotes: 135,
    downvotes: 5,
    contributors: 8,
    isLive: false,
    isMajor: true,
    links: [
      'https://en.wikipedia.org/wiki/2026_Delhi_Jantar_Mantar_protests#18_July',
      'https://www.ndtv.com/india-news/cjp-protest-in-delhi-live'
    ],
    media: [
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=900&q=80',
        title: 'Midnight Police Action'
      }
    ]
  },

  // ══════════════════════════════════════════════════════════════════
  //  PHASE 5 — The "Sansad Chalo" March & Clashes (July 19–21)
  // ══════════════════════════════════════════════════════════════════

  {
    id: 'e_14',
    phase: 'Phase 5: Sansad Chalo March',
    category: 'Police Action',
    categoryColor: '#ec4899',
    title: 'Prohibitory Orders (Section 163 BNSS) & Night Vigil',
    timestamp: '2026-07-19T12:00:00Z',   // July 19 • 5:30 PM IST
    location: 'Central Delhi',
    thumbnail: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&q=80',
    description:
      'Anticipating a massive march on Parliament, Delhi Police imposed prohibitory orders under Section 163 of the BNSS, banning assemblies and processions in New Delhi. Dipke urged supporters to gather in even larger numbers to defy the orders. A night vigil was held at Jantar Mantar.',
    upvotes: 89,
    downvotes: 3,
    contributors: 4,
    isLive: false,
    isMajor: false,
    links: [
      'https://en.wikipedia.org/wiki/2026_Delhi_Jantar_Mantar_protests#20_July',
      'https://cockroachjantaparty.raizian.in/bulletin'
    ],
    media: [
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=900&q=80',
        title: 'Police Barricading Central Delhi'
      }
    ]
  },

  {
    id: 'e_15',
    phase: 'Phase 5: Sansad Chalo March',
    category: 'March',
    categoryColor: '#ef4444',
    title: 'The "Sansad Chalo" Parliament March & Clashes',
    timestamp: '2026-07-20T03:00:00Z',   // July 20 • 8:30 AM IST
    location: 'Jantar Mantar → Parliament Street, New Delhi',
    thumbnail: 'https://images.unsplash.com/photo-1555848962-6e79363ec58f?w=800&q=80',
    description:
      'Thousands of protesters attempted to march toward Parliament on the opening day of the Monsoon Session. Clashes erupted near Shastri Bhawan and Hanuman Mandir Road as protesters tried to breach barricades. Delhi Police used lathicharge and tear gas. Over 100 police personnel and ~60 protesters were injured, and roughly 70 were detained. Delhi Metro closed 5 stations and mobile internet was suspended.',
    upvotes: 210,
    downvotes: 12,
    contributors: 12,
    isLive: false,
    isMajor: true,
    links: [
      'https://www.thehindu.com/news/national/cjp-protest-july-20-2026-cockroach-janata-party-jantar-mantar-parliament-march-sonam-wangchuk/article71242448.ece',
      'https://www.ndtv.com/india-news/cjp-protest-in-delhi-live',
      'https://en.wikipedia.org/wiki/2026_Delhi_Jantar_Mantar_protests#Sansad_Chalo_March'
    ],
    media: [
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1555848962-6e79363ec58f?w=900&q=80',
        title: 'March Clashes at Shastri Bhawan'
      }
    ]
  },

  {
    id: 'e_16',
    phase: 'Phase 5: Sansad Chalo March',
    category: 'Negotiation',
    categoryColor: '#fb7185',
    title: 'CJP Delegation Meets Union Minister JP Nadda',
    timestamp: '2026-07-20T06:20:00Z',   // July 20 • 11:50 AM IST
    location: 'Nirman Bhawan, New Delhi',
    thumbnail: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&q=80',
    description:
      'CJP spokespersons Saurav Das and Ashutosh Ranka met Union Health Minister JP Nadda and submitted a memorandum with three demands: (1) Release of Sonam Wangchuk, (2) Resignation of Education Minister Dharmendra Pradhan, (3) ₹1 crore compensation for suicide victims\' families. Nadda urged an end to the protest without firm commitments.',
    upvotes: 94,
    downvotes: 6,
    contributors: 3,
    isLive: false,
    isMajor: false,
    links: [
      'https://www.thehindu.com/news/national/cjp-protest-july-20-2026',
      'https://www.ndtv.com/india-news/cjp-protest-in-delhi-live'
    ],
    media: [
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=900&q=80',
        title: 'Memorandum Submission to JP Nadda'
      }
    ]
  },

  {
    id: 'e_17',
    phase: 'Phase 5: Sansad Chalo March',
    category: 'Hunger Strike',
    categoryColor: '#c084fc',
    title: 'Wangchuk\'s Statement from Safdarjung Hospital Bed',
    timestamp: '2026-07-20T10:00:00Z',   // July 20 • 3:30 PM IST
    location: 'Safdarjung Hospital, New Delhi',
    thumbnail: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80',
    description:
      'From his hospital bed at Safdarjung Hospital, Sonam Wangchuk released a video statement vowing to continue his fast until Parliament formally discusses education integrity. At Wangchuk\'s request, Abhijeet Dipke ended his own hunger strike to lead ongoing site operations.',
    upvotes: 115,
    downvotes: 2,
    contributors: 4,
    isLive: false,
    isMajor: false,
    links: [
      'https://www.thehindu.com/news/national/cjp-protest-july-20-2026',
      'https://www.ndtv.com/india-news/cjp-protest-in-delhi-live'
    ],
    media: [
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=900&q=80',
        title: 'Wangchuk Statement from Hospital Bed'
      }
    ]
  },

  {
    id: 'e_18',
    phase: 'Phase 5: Sansad Chalo March',
    category: 'Police Action',
    categoryColor: '#f43f5e',
    title: 'NHRC Inquiry Ordered & Night Vigil at Kerala House',
    timestamp: '2026-07-20T14:30:00Z',   // July 20 • 8:00 PM IST
    location: 'Kerala House & NHRC, New Delhi',
    thumbnail: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=800&q=80',
    description:
      'Protesters regrouped near Kerala House after the main site was cleared. The National Human Rights Commission (NHRC) ordered an inquiry into reports of a 12-year-old girl being injured during police action. Police announced an investigation into alleged misinformation handles.',
    upvotes: 82,
    downvotes: 4,
    contributors: 5,
    isLive: false,
    isMajor: false,
    links: [
      'https://www.thehindu.com/news/national/cjp-protest-july-20-2026',
      'https://en.wikipedia.org/wiki/2026_Delhi_Jantar_Mantar_protests'
    ],
    media: [
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=900&q=80',
        title: 'Night Vigil at Kerala House'
      }
    ]
  },

  {
    id: 'e_19',
    phase: 'Phase 5: Sansad Chalo March',
    category: 'Live Update',
    categoryColor: '#06b6d4',
    title: 'Protesters Reclaim Jantar Mantar Site (Live)',
    timestamp: '2026-07-21T03:30:00Z',   // July 21 • 9:00 AM IST
    location: 'Jantar Mantar, New Delhi',
    thumbnail: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&q=80',
    description:
      'One day after the violent clashes, Abhijeet Dipke led supporters back to Jantar Mantar to reclaim the protest site. CJP announced it would not vacate until the government formally responds to all three demands. Sonam Wangchuk remains hospitalized and continues his fast.',
    upvotes: 245,
    downvotes: 7,
    contributors: 15,
    isLive: true,
    isMajor: true,
    links: [
      'https://www.thehindu.com/news/national/cjp-protest-july-20-2026-cockroach-janata-party-jantar-mantar-parliament-march-sonam-wangchuk/article71242448.ece',
      'https://cockroachjantaparty.raizian.in/delhi-protest',
      'https://en.wikipedia.org/wiki/2026_Delhi_Jantar_Mantar_protests'
    ],
    media: [
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=900&q=80',
        title: 'Reclaimed Jantar Mantar Site'
      }
    ]
  }
];
