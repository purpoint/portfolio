/* =================================================================== *
 *  CONTENT  —  edit everything about the portfolio from this one file. *
 *  Headlines, copy, links, skills, projects and metrics all live here. *
 * =================================================================== */

/* ---- Personal links --------------------------------------------------
 * Fill these in. Anything left as an empty string ('') will be hidden
 * in the UI rather than rendered as a dead "#" link.
 * -------------------------------------------------------------------- */
export const links = {
  email: 'manan.xf.12@gmail.com',
  phone: '+91 93927 02794',
  github: 'https://github.com/purpoint',
  linkedin: 'https://linkedin.com/in/manan-ghodasara-a85492359',
};

export const hero = {
  navName: 'MANAN',
  kicker: 'FULL-STACK & AI ENGINEER — BENGALURU, INDIA',
  // Rendered word-by-word at poster scale.
  name: ['MANAN', 'GHODASARA'],
  sub: 'I build real-time systems, AI-powered SaaS, and things that actually ship.',
  hint: '↳ TRY HOVERING',
  cue: 'SCROLL TO CONTINUE ↓',
};

export const about = {
  eyebrow: '01 — ABOUT',
  // Each string is a "line" whose words light up as it scrolls through centre.
  statement:
    "I'm a computer-science undergrad who has independently architected and shipped four production full-stack apps — a real-time collaborative system, an AI-powered SaaS, a vector-search RAG engine, and a voice-first accessibility assistant. Each is live, open-source, and hardened with production-grade auth, rate limiting, and 99.9% uptime. I care about the unglamorous parts done right: latency budgets, failure modes, and type-safe data layers.",
  facts: ['BASED IN BENGALURU', "B.E. CS '27", '4 SHIPPED APPS', 'OPEN TO ROLES'],
};

export const education = {
  eyebrow: '02 — EDUCATION',
  school: 'JSS Academy of Technical Education',
  location: 'Bengaluru, India',
  degree: 'B.E. Computer Science',
  dates: 'Sept 2023 – May 2027',
  cgpaValue: 8.6,
  cgpaMax: '/ 10.0',
  cgpaTag: 'Top performer in cohort',
  coursework: [
    'Data Structures & Algorithms',
    'OOP',
    'Operating Systems',
    'Computer Networks',
    'DBMS',
  ],
};

export const skills = {
  eyebrow: '03 — STACK',
  groups: [
    {
      label: 'LANGUAGES',
      items: ['JavaScript (ES2022+)', 'TypeScript', 'Python', 'C++', 'C'],
    },
    {
      label: 'FRONTEND',
      items: ['React.js', 'Next.js 14', 'Vite', 'Redux Toolkit', 'HTML5', 'CSS3', 'REST API integration'],
    },
    {
      label: 'BACKEND',
      items: ['Node.js', 'Express.js', 'REST APIs', 'Socket.IO', 'WebSockets'],
    },
    {
      label: 'DATABASES',
      items: ['MongoDB', 'PostgreSQL (Prisma ORM)', 'Pinecone Vector DB', 'SQL'],
    },
    {
      label: 'AI / ML',
      items: ['RAG Pipelines', 'Groq LLM', 'HuggingFace Embeddings', 'Tesseract.js OCR', 'LLM Integration'],
    },
    {
      label: 'DEVOPS & TOOLS',
      items: ['AWS', 'Docker', 'Git', 'GitHub Actions', 'Vercel', 'Render', 'Prometheus', 'Grafana', 'JWT', 'bcrypt'],
    },
  ],
};

export interface Project {
  id: string;
  index: string;
  name: string;
  tagline: string;
  /** Tailwind-friendly RGB triplet for the per-panel heat glow. */
  glow: string;
  /** Screenshot path under /public. Drop your real screenshots here. */
  image: string;
  stack: string[];
  bullets: string[];
  stats: { value: string; label: string }[];
  live: string; // leave '' to hide the Live demo button
  code: string;
}

export const work = {
  eyebrow: '04 — SELECTED WORK',
  heading: 'SELECTED WORK',
  projects: [
    {
      id: 'collabboard',
      index: '01',
      name: 'CollabBoard',
      tagline: 'Real-time collaborative whiteboard',
      glow: '255, 138, 60',
      image: '/projects/collabboard.png',
      stack: ['React', 'Node.js', 'Express', 'Socket.IO', 'MongoDB', 'Redux Toolkit', 'JWT', 'Vercel', 'Render'],
      bullets: [
        'Miro-inspired multi-user whiteboard, 6 drawing tools, live cursor tracking — sub-100ms sync via Socket.IO event streaming with 30ms cursor throttling.',
        'Ramer–Douglas–Peucker pencil optimisation cut transmitted path points by 60–80%, reducing bandwidth under heavy concurrent sketching.',
        'JWT-secured HTTP + WebSocket layers; rate limiting (100 req/15 min, 10-attempt lockout); soft-delete shape history → collaborative undo across all clients.',
        'Redux Toolkit global canvas state — conflict-free undo, no race conditions or stale state.',
      ],
      stats: [
        { value: '<100ms', label: 'SYNC' },
        { value: '60–80%', label: 'LESS BANDWIDTH' },
        { value: '6', label: 'TOOLS' },
      ],
      live: 'https://collab-board-xi.vercel.app',
      code: 'https://github.com/purpoint/Collab-Board',
    },
    {
      id: 'wasteiq',
      index: '02',
      name: 'WasteIQ',
      tagline: 'AI-powered restaurant waste-management SaaS',
      glow: '255, 91, 46',
      image: '/projects/wasteiq.png',
      stack: ['Next.js 14', 'TypeScript', 'Node.js', 'Express', 'PostgreSQL', 'Prisma', 'Groq AI', 'Vercel', 'Render'],
      bullets: [
        'Full-stack SaaS: real-time inventory, expiry alerts, 6-class waste logging (Spoilage, Expired, Overproduction, Damaged, Quality Issue, Customer Return).',
        'Groq AI assistant grounded in live restaurant data for natural-language inventory queries — sub-200ms responses, 99.9% uptime on Vercel + Render.',
        'Demand-forecasting dashboard over 30 days of sales, dynamic waste-pattern charts, PDF export, role-based JWT for multi-user teams.',
        'Prisma ORM on PostgreSQL — relational integrity, end-to-end type-safe queries.',
      ],
      stats: [
        { value: '<200ms', label: 'API' },
        { value: '99.9%', label: 'UPTIME' },
        { value: '6-CLASS', label: 'MODEL' },
      ],
      live: 'https://waste-iq-plum.vercel.app',
      code: 'https://github.com/purpoint/Waste-IQ',
    },
    {
      id: 'mindvault',
      index: '03',
      name: 'MindVault',
      tagline: 'AI personal knowledge system (RAG)',
      glow: '255, 217, 168',
      image: '/projects/mindvault.png',
      stack: ['React', 'Vite', 'Node.js', 'MongoDB Atlas', 'Pinecone', 'HuggingFace', 'Groq LLM (Llama 3.1 8B)', 'Tesseract.js', 'JWT'],
      bullets: [
        'End-to-end RAG: PDFs chunked into 500-word overlapping segments, embedded to 384-dim vectors (all-MiniLM-L6-v2), stored in Pinecone, retrieved by cosine similarity for grounded, source-cited answers from Groq LLM (Llama 3.1 8B).',
        'Under-2s query response, top-5 chunk retrieval; Tesseract.js OCR for scanned docs; unlimited uploads per authenticated user.',
        'Dual-database architecture — MongoDB Atlas (accounts/metadata) + Pinecone (vectors) — separating relational from semantic search.',
        'Hardened with JWT + bcrypt and express-rate-limit (10 AI queries/min).',
      ],
      stats: [
        { value: '<2s', label: 'QUERY' },
        { value: '384-DIM', label: 'VECTORS' },
        { value: 'TOP-5', label: 'RETRIEVAL' },
      ],
      live: 'https://mindvault-pink.vercel.app',
      code: 'https://github.com/purpoint/mindvault',
    },
    {
      id: 'echovision',
      index: '04',
      name: 'EchoVision AI',
      tagline: 'Voice-first accessibility assistant',
      glow: '200, 52, 27',
      image: '/projects/echovision.png',
      stack: ['React', 'Python', 'FastAPI', 'OpenCV', 'Gemini', 'Groq', 'Tesseract.js', 'PDF.js', 'Web Speech'],
      bullets: [
        'Voice-first assistant that narrates the world for low-vision users — a local OpenCV computer-vision service interprets scenes and objects, paired with spoken output.',
        'Resilient multi-model LLM integration with automatic provider fallback (Gemini primary → Groq fallback) and context-restricted prompting — grounded, available answers even when a provider fails.',
        'Reusable multimodal extraction stack — PDF.js for documents + Tesseract.js OCR for scanned images — powering both retrieval and spoken accessibility narration.',
        'Python (FastAPI) vision backend alongside the Node services; end-to-end TypeScript on the client, JWT-secured APIs with rate limiting, deployed on Vercel + Render.',
      ],
      stats: [
        { value: '2×', label: 'LLM FALLBACK' },
        { value: 'VOICE', label: 'FIRST UX' },
        { value: 'OCR + CV', label: 'MULTIMODAL' },
      ],
      live: '',
      code: 'https://github.com/purpoint/EchovisionAI',
    },
  ] as Project[],
};

export const contact = {
  eyebrow: '05 — LET’S CHAT',
  poster: ["LET'S BUILD", 'SOMETHING.'],
  sub: 'Open to internships, full-time roles, and collaborations.',
  cta: 'Get in touch',
  footnote: '125+ LEETCODE SOLVED · CGPA 8.6/10 · HACKATHON PARTICIPANT',
};

export const nav = [
  { label: 'ABOUT', href: '#about' },
  { label: 'SKILLS', href: '#skills' },
  { label: 'WORK', href: '#work' },
  { label: 'CONTACT', href: '#contact' },
];
