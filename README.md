# 🏗️ Sitecel Technology - Corporate Platform v2

[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.104-green)](https://fastapi.tiangolo.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

> Modern corporate platform for Sitecel Technology SpA - Telecom & IT Infrastructure Company based in Santiago, Chile.

**Live Site:** [www.sitecel.cl](https://www.sitecel.cl)

---

## 📋 Table of Contents

- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Development](#development)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## 🎯 About

**Sitecel Technology v2** is a full-stack corporate platform showcasing our services in:
- 📡 Telecom & IT Infrastructure
- ⚡ Electrical Engineering
- 🏗️ Civil Construction
- 🌱 Clean Energy Solutions

This project serves as both:
1. **Production website** for Sitecel Technology SpA
2. **Learning platform** for modern web development practices (part of my [IT PM to Full Stack Developer journey](https://www.linkedin.com/in/pcaq))

**Why this repo?**
- Apply PM skills (roadmap, user stories, agile) to software development
- Build a real-world project portfolio piece
- Learn full-stack development with modern tools
- Document learning process publicly (#LearningInPublic)

---

## ✨ Features

### ✅ Current (v1 - Deployed)
- 🎨 **Responsive Design** - Mobile-first approach with Tailwind CSS
- ⚡ **Fast Performance** - Next.js 14 with App Router and Server Components
- 📝 **Contact Form** - Functional form with validation
- 🎯 **SEO Optimized** - Meta tags, sitemap, structured data
- 🚀 **CI/CD Pipeline** - Automated deployment via Vercel
- 🌐 **Custom Domain** - Production ready at sitecel.cl

### 🚧 In Progress (v2 - See [Roadmap](./ROADMAP.md))
- 🔐 **Admin Panel** - Private CMS for project management
- 📊 **Project Portfolio** - Dynamic CRUD with PostgreSQL + API
- 🤖 **AI Chatbot** - ML-powered assistant for customer inquiries
- 📱 **Rich Media** - Image galleries and video embeds
- 🔍 **Advanced Search** - Filter and discover projects

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** [Next.js 14](https://nextjs.org/) (App Router, React Server Components)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** [Shadcn/ui](https://ui.shadcn.com/)
- **Forms:** React Hook Form + Zod validation
- **State Management:** Zustand / TanStack Query

### Backend (Coming Soon - Fase 1)
- **Framework:** [FastAPI](https://fastapi.tiangolo.com/) (Python 3.11+)
- **Database:** PostgreSQL 15+
- **ORM:** SQLAlchemy 2.0 (Async)
- **Validation:** Pydantic v2
- **Auth:** JWT (python-jose)

### AI/ML (Coming Soon - Fase 2)
- **LLM:** OpenAI GPT-4 / Anthropic Claude
- **Embeddings:** OpenAI text-embedding-3
- **Vector DB:** Pinecone or pgvector
- **Framework:** LangChain / LlamaIndex

### DevOps
- **Hosting:** Vercel (frontend) + Railway/Fly.io (backend planned)
- **CI/CD:** GitHub Actions
- **Monitoring:** Sentry (errors) + PostHog (analytics, planned)
- **File Storage:** Cloudinary (planned)

---

## 📁 Project Structure

```
sitecel-technology-v2/
├── frontend/                # Next.js application
│   ├── app/                 # App Router pages
│   │   ├── (root)/         # Public pages
│   │   ├── admin/          # Admin panel (protected)
│   │   └── api/            # API routes (if needed)
│   ├── components/         # React components
│   │   ├── ui/             # Shadcn/ui components
│   │   ├── sections/       # Page sections
│   │   └── shared/         # Reusable components
│   ├── lib/                # Utilities and helpers
│   ├── public/             # Static assets
│   └── styles/             # Global styles
│
├── backend/                # FastAPI application (coming soon)
│   ├── app/
│   │   ├── api/            # API endpoints
│   │   ├── core/           # Config, security
│   │   ├── models/         # SQLAlchemy models
│   │   ├── schemas/        # Pydantic schemas
│   │   └── services/       # Business logic
│   ├── alembic/            # Database migrations
│   └── tests/              # pytest tests
│
├── ml-chatbot/             # AI chatbot (coming soon)
│   ├── embeddings/         # Vector generation
│   ├── rag/                # RAG pipeline
│   └── api/                # Chat API
│
├── docs/                   # Documentation
│   ├── ADRs/               # Architecture Decision Records
│   └── guides/             # Development guides
│
├── ROADMAP.md              # Product roadmap
└── README.md               # This file
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm/pnpm
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/paraujoq/sitecel-technology-v2.git
   cd sitecel-technology-v2
   ```

2. **Install dependencies**
   ```bash
   cd frontend
   npm install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` with your values:
   ```env
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   # Add other variables as needed
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```
   
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 💻 Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Check TypeScript types
```

### Code Style

- **Formatter:** Prettier
- **Linter:** ESLint with Next.js config
- **Commit Convention:** Conventional Commits

```bash
# Example commit messages
git commit -m "feat: add project gallery component"
git commit -m "fix: resolve mobile navigation issue"
git commit -m "docs: update README with API endpoints"
```

### Git Workflow

1. Create feature branch: `git checkout -b feature/amazing-feature`
2. Commit changes: `git commit -m "feat: add amazing feature"`
3. Push to branch: `git push origin feature/amazing-feature`
4. Open Pull Request

---

## 🗺️ Roadmap

See [ROADMAP.md](./ROADMAP.md) for detailed product roadmap.

**High-level phases:**
- ✅ **Phase 0:** Corporate Website (Completed)
- 🚀 **Phase 1:** CMS & Project Management (Q1 2025)
- 🤖 **Phase 2:** AI-Powered Chatbot (Q2 2025)
- 🔧 **Phase 3:** Optimization & Testing (Q2 2025)

Track progress in [GitHub Projects](https://github.com/paraujoq/sitecel-technology-v2/projects).

---

## 🤝 Contributing

This is primarily a learning project, but contributions are welcome!

1. **Report Bugs:** Open an issue with `bug` label
2. **Suggest Features:** Open an issue with `enhancement` label
3. **Submit PRs:** Follow git workflow above

Please read [CONTRIBUTING.md](./CONTRIBUTING.md) (coming soon) for details.

---

## 📝 License

This project is licensed under the MIT License - see [LICENSE](./LICENSE) file for details.

**Note:** The Sitecel Technology brand, logo, and content are © 2025 Sitecel Technology SpA.

---

## 📬 Contact

**Sitecel Technology SpA**
- Website: [www.sitecel.cl](https://www.sitecel.cl)
- Email: contacto@sitecel.cl
- Phone: +56 9 9792 8355

**Project Maintainer:**
- **Pedro Araujo Quintero** - Director de Proyectos
- LinkedIn: [linkedin.com/in/pcaq](https://www.linkedin.com/in/pcaq)
- GitHub: [@paraujoq](https://github.com/paraujoq)
- Email: pedro.araujoq@gmail.com

---

## 🙏 Acknowledgments

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/)
- [Shadcn/ui](https://ui.shadcn.com/)
- [Vercel](https://vercel.com) for hosting
- [Anthropic Claude](https://www.anthropic.com) for AI assistance during development

---

## 📊 Project Stats

![GitHub repo size](https://img.shields.io/github/repo-size/paraujoq/sitecel-technology-v2)
![GitHub last commit](https://img.shields.io/github/last-commit/paraujoq/sitecel-technology-v2)
![GitHub issues](https://img.shields.io/github/issues/paraujoq/sitecel-technology-v2)
![GitHub pull requests](https://img.shields.io/github/issues-pr/paraujoq/sitecel-technology-v2)

---

<p align="center">
  Made with ❤️ by <a href="https://www.sitecel.cl">Sitecel Technology SpA</a>
</p>

<p align="center">
  <sub>Building the future of Telecom & IT Infrastructure in Chile 🇨🇱</sub>
</p>

 #   R e v e r t e d   t o   s t a b l e   v e r s i o n  
 