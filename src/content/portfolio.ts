export type Experience = {
  company: string;
  role: string;
  period: string;
  points: string[];
};

// Leave optional links empty to hide them. Keep personal details in this file.
export const portfolio = {
  name: "Bùi Nguyên Phong",
  initials: "BP",
  direction: "Building toward Data Engineering",
  headline: "Learning by building.\nUnderstanding by doing.",
  introduction:
    "I’m Bùi Nguyên Phong, a Data Science graduate building toward Data Engineering through hands-on projects. I work with Python, SQL, and databases to understand how data moves from source to something useful.",
  about:
    "I’m early in my engineering career, with Data Engineering as my main direction. I like tracing what happens underneath an abstraction: how a crawler recovers, how a database stores state, and how a query reaches a user. Building projects helps me turn those questions into stronger fundamentals.",
  aboutSecond:
    "I’m also expanding my understanding of infrastructure, networking, and IT operations. These are areas I’m developing, alongside my work on data pipelines and databases.",
  contact: {
    email: "buinguyenphong2003.work@gmail.com",
    github: "https://github.com/godwindk3",
    linkedin: "https://www.linkedin.com/in/phong-bui-ab41a1408/",
    zalo: "https://zalo.me/0795124069",
    resume: "/resume.pdf",
  },
  currentFocus: [
    {
      number: "01",
      title: "Data Engineering",
      description:
        "Building stronger foundations in ingestion, data modeling, validation, and restartable pipelines.",
    },
    {
      number: "02",
      title: "Infrastructure & operations",
      description:
        "Developing practical understanding of Linux, deployment, networking, and how services are operated.",
    },
    {
      number: "03",
      title: "Systems fundamentals",
      description:
        "Looking beneath the tools: database internals, failure modes, and the lifecycle of a request.",
    },
  ],
  skills: [
    {
      title: "Data & ingestion",
      items: [
        "Python",
        "SQL",
        "Data pipelines",
        "Web scraping",
        "Data validation",
      ],
    },
    {
      title: "Databases & storage",
      items: [
        "PostgreSQL",
        "Data modeling",
        "Full-text search",
        "MinIO",
        "Alembic",
      ],
    },
    {
      title: "Orchestration & delivery",
      items: ["Apache Airflow", "Docker Compose", "Git", "Supabase", "Vercel"],
    },
    {
      title: "Web serving",
      items: ["Next.js", "TypeScript", "React", "Server-side SQL"],
    },
  ],
  learning: [
    "Linux",
    "Networking",
    "Infrastructure operations",
    "Database internals",
  ],
  experience: [
    {
      company: "Smartlog",
      role: "AI Application Developer Intern",
      period: "Jan — Jun 2025",
      points: [
        "Developed a multimodal RAG chatbot and integrated AI features into customer-facing applications.",
        "Built n8n workflows and AI agents, including Gmail-based order management.",
        "Worked with local models through Ollama and text embeddings for multimodal RAG.",
      ],
    },
  ] satisfies Experience[],
  education: {
    school: "VNU University of Science",
    degree: "Bachelor of Data Science",
    period: "2021 — 2026",
  },
  projects: [
    {
      slug: "joblake",
      name: "JobLake",
      category: "Data ingestion · Search · Web",
      period: "Jun 2026 — Present",
      description: "From scattered job postings to searchable data.",
      summary:
        "A personal project connecting a Python ingestion pipeline with a job-search website. Source-specific crawlers collect raw HTML, parsers normalize it, and a separate serving layer makes the results searchable.",
      stack: ["Python", "PostgreSQL", "MinIO", "Airflow", "Next.js"],
      live: "https://joblake-web.vercel.app",
      github: "https://github.com/godwindk3/joblake",
      caseStudy: "/projects/joblake",
    },
  ],
};

export const contactLinks = [
  {
    label: "Email",
    href: portfolio.contact.email ? `mailto:${portfolio.contact.email}` : "",
  },
  { label: "GitHub", href: portfolio.contact.github },
  { label: "LinkedIn", href: portfolio.contact.linkedin },
  { label: "Zalo", href: portfolio.contact.zalo },
  { label: "Resume", href: portfolio.contact.resume },
].filter((link) => link.href);
