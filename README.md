# 🏗️ Sitecel Technology - Corporate Platform v2

[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.115-green)](https://fastapi.tiangolo.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

> Modern corporate platform for Sitecel Technology SpA - Telecom & IT Infrastructure Company based in Santiago, Chile.

**Live Site:** [www.sitecel.cl](https://www.sitecel.cl)  
**Admin Panel:** [www.sitecel.cl/admin](https://www.sitecel.cl/admin) 🔐

---

## 📋 Table of Contents

- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
- [Development](#development)
- [Deployment](#deployment)
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

### ✅ Completed & Live
- 🎨 **Responsive Design** - Mobile-first approach with Tailwind CSS
- ⚡ **Fast Performance** - Next.js 16 with App Router and ISR (5min revalidation)
- 🔐 **Admin Panel** - Complete CMS with authentication (JWT)
- 📊 **Project Management** - Full CRUD for projects with rich media
- 🖼️ **Media Management** - Image galleries and embedded videos (YouTube, Google Drive)
- 🤖 **AI Chatbot** - Customer support powered by Google Gemini 2.0
- 🗄️ **REST API** - FastAPI backend with PostgreSQL database
- 📝 **Contact Form** - Functional form with validation
- 🎯 **SEO Optimized** - Meta tags, sitemap, structured data
- 🚀 **CI/CD Pipeline** - Automated deployment via Vercel & Render
- 🌐 **Custom Domain** - Production ready at sitecel.cl

### 🚧 Roadmap (See [Issues](https://github.com/paraujoq/sitecel-technology-v2/issues))
- 📧 **Email Notifications** - Contact form submissions
- 📊 **Analytics Dashboard** - Usage metrics and insights
- 🔍 **Advanced Search** - Full-text search and filters
- 🖼️ **Image Optimization** - Next.js Image + CDN
- ✅ **Testing Suite** - E2E and unit tests
- 📚 **API Documentation** - Enhanced Swagger docs

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** [Next.js 16](https://nextjs.org/) (App Router, React Server Components)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** Custom components with Tailwind
- **Forms:** Native form handling with validation
- **State Management:** React hooks + URL state
- **Deployment:** [Vercel](https://vercel.com)

### Backend
- **Framework:** [FastAPI](https://fastapi.tiangolo.com/) (Python 3.11+)
- **Database:** [PostgreSQL 15](https://www.postgresql.org/) on [Neon](https://neon.tech)
- **ORM:** SQLAlchemy 2.0 (Async)
- **Validation:** Pydantic v2
- **Auth:** JWT with python-jose
- **Deployment:** [Render](https://render.com)

### AI/ML
- **LLM:** Google Gemini 2.0 Flash
- **Framework:** Google AI SDK (generative-ai-python)
- **Use Case:** Customer support chatbot

### DevOps & Infrastructure
- **Version Control:** Git + GitHub
- **Frontend Hosting:** Vercel (with ISR)
- **Backend Hosting:** Render (Free tier)
- **Database:** Neon (Serverless Postgres)
- **CI/CD:** Automatic deployments on push to `main`
- **Monitoring:** Browser console (Sentry planned)

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────┐
│           Frontend (Next.js 16)                  │
│                                                  │
│  - Server Components (ISR 5min)                 │
│  - Client Components (Auth, Forms, Chat)        │
│  - Public Routes: /, /proyectos, /servicios    │
│  - Protected Routes: /admin/*                   │
│                                                  │
│  Deployed on: Vercel                            │
│  URL: https://www.sitecel.cl                    │
└────────────────┬────────────────────────────────┘
                 │
                 │ HTTPS/REST
                 │
┌────────────────▼────────────────────────────────┐
│         Backend API (FastAPI)                   │
│                                                  │
│  Endpoints:                                     │
│  - /api/v1/projects (CRUD)                     │
│  - /api/v1/auth (Login, Verify)                │
│  - /api/v1/chat (AI Chatbot)                   │
│                                                  │
│  Deployed on: Render                            │
│  URL: sitecel-technology-v2.onrender.com       │
└────────────────┬────────────────────────────────┘
                 │
    ┌────────────┼────────────┐
    │            │            │
    ▼            ▼            ▼
┌─────────┐ ┌─────────┐ ┌──────────┐
│PostgreSQL│ │ Google  │ │ Storage  │
│  (Neon)  │ │ Gemini  │ │(Planned) │
│          │ │   AI    │ │          │
│Projects  │ │Chatbot  │ │Images/   │
│Users     │ │         │ │Videos    │
│Images    │ │         │ │          │
│Videos    │ │         │ │          │
└─────────┘ └─────────┘ └──────────┘
```

### Data Flow Examples

**1. Public User views projects:**
```
User → Next.js (ISR cached) → [If cache expired] → FastAPI → PostgreSQL
                           → Rendered HTML
```

**2. Admin creates project:**
```
Admin → Login (JWT) → /admin/projects/new → Form Submit
      → FastAPI /projects (POST) → PostgreSQL INSERT
      → Success → Redirect to /admin/projects
```

**3. User chats with bot:**
```
User → ChatWidget (Client) → FastAPI /chat
     → Gemini AI API → Response → User
```

---

## 📁 Project Structure

```
sitecel-technology-v2/
├── app/                      # Next.js App Router
│   ├── (public)/            # Public pages
│   │   ├── page.tsx         # Home
│   │   ├── proyectos/       # Projects gallery
│   │   ├── servicios/       # Services
│   │   └── contacto/        # Contact
│   ├── admin/               # Protected admin area
│   │   ├── layout.tsx       # Auth layout
│   │   ├── login/           # Login page
│   │   ├── projects/        # Project CRUD
│   │   └── dashboard/       # Admin dashboard
│   └── api/                 # API routes (if needed)
│
├── components/              # React components
│   ├── admin/              # Admin-specific components
│   │   ├── ProjectForm.tsx
│   │   └── Sidebar.tsx
│   ├── ChatWidget.tsx      # AI chatbot
│   ├── ProjectCard.tsx     # Project card (public)
│   └── Navbar.tsx          # Navigation
│
├── lib/                    # Utilities
│   ├── api.ts             # API client functions
│   ├── config.ts          # Environment config
│   └── utils.ts           # Helper functions
│
├── public/                # Static assets
│   ├── images/
│   └── favicon.ico
│
└── styles/                # Global styles
    └── globals.css

Backend (separate repo/directory - not included here):
└── app/
    ├── api/v1/
    │   ├── auth.py       # Authentication
    │   ├── projects.py   # Projects CRUD
    │   └── chat.py       # AI Chatbot
    ├── models/           # SQLAlchemy models
    ├── schemas/          # Pydantic schemas
    └── core/
        ├── config.py     # Settings
        └── security.py   # JWT handling
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm/pnpm
- Git
- (Optional) Python 3.11+ for backend development

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/paraujoq/sitecel-technology-v2.git
   cd sitecel-technology-v2
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local`:
   ```env
   NEXT_PUBLIC_API_URL=https://sitecel-technology-v2.onrender.com/api/v1
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```
   
   Open [http://localhost:3000](http://localhost:3000)

---

## 💻 Development

### Available Scripts

```bash
npm run dev          # Start development server (localhost:3000)
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Check TypeScript types
```

### Code Style

- **Formatter:** Prettier (auto-format on save recommended)
- **Linter:** ESLint with Next.js config
- **Commit Convention:** Conventional Commits

```bash
# Example commit messages
git commit -m "feat: add project search functionality"
git commit -m "fix: resolve mobile navigation bug"
git commit -m "perf: optimize ISR revalidation time"
git commit -m "docs: update README with architecture diagram"
```

### Git Workflow

1. **Ensure you're on `main`:** `git checkout main`
2. **Pull latest:** `git pull origin main`
3. **Create branch** (optional): `git checkout -b feature/my-feature`
4. **Make changes and commit:**
   ```bash
   git add .
   git commit -m "feat: add amazing feature"
   ```
5. **Push:** `git push origin main` (or your branch)
6. **Automatic deployment:** Vercel detects push and deploys

---

## 🌐 Deployment

### Frontend (Vercel)
- **Automatic:** Pushes to `main` trigger deployment
- **URL:** https://www.sitecel.cl
- **Environment Variables:** Set in Vercel dashboard
  - `NEXT_PUBLIC_API_URL`

### Backend (Render)
- **Automatic:** Pushes to `main` trigger deployment
- **URL:** https://sitecel-technology-v2.onrender.com
- **Free tier:** May spin down after inactivity (50s cold start)
- **Environment Variables:** Set in Render dashboard
  - `DATABASE_URL` (Neon PostgreSQL)
  - `SECRET_KEY` (JWT)
  - `GEMINI_API_KEY` (Google AI)

### Database (Neon)
- **Serverless PostgreSQL**
- **Automatic backups**
- **Connection pooling enabled**

---

## 🗺️ Roadmap

**Current Status:** ✅ **Phase 1 Complete** - Core functionality live

### Completed
- ✅ Phase 0: Corporate Website
- ✅ Phase 1: Admin Panel & CMS
- ✅ Phase 1.5: AI Chatbot Integration

### Up Next (Q1 2025)
- 📧 Email notifications (contact form)
- 🔍 Advanced search & filters
- 📊 Analytics dashboard
- 🖼️ Image optimization (Next.js Image + CDN)

### Future (Q2 2025+)
- ✅ Testing suite (E2E + Unit)
- 🔐 Role-based access control (if team grows)
- 📱 Mobile app (React Native - maybe)
- 🌍 Internationalization (EN/ES)

Track progress: [GitHub Issues](https://github.com/paraujoq/sitecel-technology-v2/issues) & [Projects](https://github.com/paraujoq/sitecel-technology-v2/projects)

---

## 🤝 Contributing

This is primarily a learning project, but contributions are welcome!

### How to Contribute
1. **Fork the repo**
2. **Create your feature branch:** `git checkout -b feature/AmazingFeature`
3. **Commit your changes:** `git commit -m 'feat: add amazing feature'`
4. **Push to the branch:** `git push origin feature/AmazingFeature`
5. **Open a Pull Request**

### Reporting Issues
- **Bug reports:** Use `bug` label
- **Feature requests:** Use `enhancement` label
- **Questions:** Use `question` label

---

## 📝 License

This project is licensed under the MIT License - see [LICENSE](./LICENSE) file for details.

**Note:** The Sitecel Technology brand, logo, and business content are © 2025 Sitecel Technology SpA. Code is MIT licensed.

---

## 📬 Contact

**Sitecel Technology SpA**
- 🌐 Website: [www.sitecel.cl](https://www.sitecel.cl)
- 📧 Email: contacto@sitecel.cl
- 📱 Phone: +56 9 9792 8355
- 📍 Location: Santiago, Chile

**Project Maintainer:**
- **Pedro Araujo Quintero** - Director de Proyectos & Developer
- 💼 LinkedIn: [linkedin.com/in/pcaq](https://www.linkedin.com/in/pcaq)
- 🐙 GitHub: [@paraujoq](https://github.com/paraujoq)
- 📧 Email: pedro.araujoq@gmail.com

---

## 🙏 Acknowledgments

**Technologies & Services:**
- [Next.js](https://nextjs.org/) & [Vercel](https://vercel.com) - Amazing DX
- [FastAPI](https://fastapi.tiangolo.com/) - Modern Python API
- [Tailwind CSS](https://tailwindcss.com/) - Rapid styling
- [Neon](https://neon.tech) - Serverless Postgres
- [Render](https://render.com) - Free backend hosting
- [Google Gemini](https://deepmind.google/technologies/gemini/) - AI chatbot

**Learning Resources:**
- [Anthropic Claude](https://www.anthropic.com) - AI pair programming assistant
- [Next.js Docs](https://nextjs.org/docs) - Excellent documentation
- [FastAPI Tutorial](https://fastapi.tiangolo.com/tutorial/) - Clear examples

**Inspiration:**
- Modern corporate websites in tech/telecom space
- Full-stack project best practices
- The dev community on X/Twitter and LinkedIn

---

## 📊 Project Stats

![GitHub repo size](https://img.shields.io/github/repo-size/paraujoq/sitecel-technology-v2)
![GitHub last commit](https://img.shields.io/github/last-commit/paraujoq/sitecel-technology-v2)
![GitHub issues](https://img.shields.io/github/issues/paraujoq/sitecel-technology-v2)
![GitHub stars](https://img.shields.io/github/stars/paraujoq/sitecel-technology-v2?style=social)

**Live Stats:**
- 🚀 In Production: Yes
- 📊 Projects Published: 4+
- 🤖 AI Chatbot: Active
- ⚡ Uptime: 99%+

---

<p align="center">
  Made with ❤️ and ☕ by <a href="https://www.sitecel.cl">Sitecel Technology SpA</a>
</p>

<p align="center">
  <sub>Building the future of Telecom & IT Infrastructure in Chile 🇨🇱</sub>
</p>

<p align="center">
  <sub>Learning in public | PM → Full Stack Developer Journey</sub>
</p>
