# 🗺️ Roadmap - Sitecel Technology v2

## Visión del Proyecto
Plataforma web corporativa con gestión de proyectos, CMS privado y chatbot inteligente para Sitecel Technology SpA, aplicando principios de arquitectura moderna (API-first, microservicios, ML).

---

## 📊 Estado Actual (Completado)

### ✅ Fase 0: Fundación Web (Completada)
**Duración:** Completada  
**Estado:** ✅ Deployed en Vercel

**Logros:**
- [x] Web corporativa funcional en www.sitecel.cl
- [x] Diseño responsive con Next.js 13+ (App Router)
- [x] Formulario de contacto operativo
- [x] Secciones: Home, Servicios, Proyectos (estáticos), Contacto
- [x] Deploy en Vercel con CI/CD
- [x] TypeScript + Tailwind CSS
- [x] SEO básico optimizado

**Stack Tecnológico Actual:**
- Frontend: Next.js 14, React 18, TypeScript
- Styling: Tailwind CSS
- Deployment: Vercel
- Hosting: DNS configurado (sitecel.cl)

---

## 🚀 Próximas Fases

### 📦 Fase 1: Sistema de Gestión de Proyectos (CMS Privado)
**Duración Estimada:** 6-8 semanas  
**Objetivo:** Admin panel privado para CRUD de proyectos con persistencia en base de datos

#### 🎯 Épica 1.1: Backend API & Database
**Story Points:** 21

**Tareas:**
1. **Diseño de Base de Datos** (3 SP)
   - Esquema PostgreSQL para tabla `projects`
   - Campos: `id`, `title`, `description`, `published`, `start_date`, `duration`, `images[]`, `videos[]`, `created_at`, `updated_at`
   - Relaciones: Usuario admin (1-N), Categorías (N-M)
   - Migración inicial con Prisma

2. **Setup FastAPI Backend** (5 SP)
   - Estructura de proyecto FastAPI
   - Configuración de Alembic para migraciones
   - Conexión a PostgreSQL (Railway/Supabase)
   - Variables de entorno (.env)
   - Docker Compose para desarrollo local

3. **API RESTful - Projects CRUD** (8 SP)
   - `POST /api/projects` - Crear proyecto
   - `GET /api/projects` - Listar (con paginación, filtros)
   - `GET /api/projects/{id}` - Detalle proyecto
   - `PUT /api/projects/{id}` - Actualizar
   - `DELETE /api/projects/{id}` - Eliminar
   - `PATCH /api/projects/{id}/publish` - Toggle published
   - Validación con Pydantic v2
   - Documentación automática (Swagger/ReDoc)

4. **Autenticación y Autorización** (5 SP)
   - JWT tokens con FastAPI-Users o Auth0
   - Middleware de autenticación
   - Roles: Admin (CRUD completo), Viewer (solo lectura)
   - Login endpoint (`POST /api/auth/login`)
   - Protected routes en API

**Tecnologías:**
- Backend: FastAPI, Python 3.11+
- ORM: SQLAlchemy 2.0 con Async
- Database: PostgreSQL 15+
- Migrations: Alembic
- Validation: Pydantic v2
- Auth: JWT (python-jose)

---

#### 🎯 Épica 1.2: Admin Dashboard (Frontend)
**Story Points:** 13

**Tareas:**
1. **Auth Flow en Next.js** (3 SP)
   - Login page (`/admin/login`)
   - NextAuth.js o Clerk integration
   - Protected routes middleware
   - Session management

2. **Admin Layout** (2 SP)
   - Sidebar navigation
   - Header con logout
   - Dashboard home (`/admin`)

3. **Projects Management UI** (8 SP)
   - Lista de proyectos (`/admin/projects`)
   - Tabla con acciones: Edit, Delete, Toggle Publish
   - Formulario crear/editar (`/admin/projects/new`, `/admin/projects/[id]/edit`)
   - Upload de imágenes (Cloudinary o S3)
   - Upload de videos (YouTube embeds)
   - Rich text editor para descripción (TipTap/Lexical)
   - Preview antes de publicar
   - Validación client-side (React Hook Form + Zod)

**Tecnologías:**
- Framework: Next.js 14 (App Router)
- State: Zustand o TanStack Query
- Forms: React Hook Form + Zod
- UI Components: Shadcn/ui
- File Upload: Uploadthing o Cloudinary

---

#### 🎯 Épica 1.3: Integración Frontend-Backend
**Story Points:** 5

**Tareas:**
1. **API Client en Next.js** (2 SP)
   - Axios o Fetch wrapper
   - Interceptors para JWT
   - Error handling global

2. **Consumo de API en Admin** (2 SP)
   - Server Components para SSR data fetching
   - Client Components para interactividad
   - Optimistic updates

3. **Testing E2E** (1 SP)
   - Tests básicos con Playwright
   - Login flow
   - CRUD de proyecto

---

#### 🎯 Épica 1.4: Proyectos Públicos (Frontend)
**Story Points:** 5

**Tareas:**
1. **Página de Proyectos Pública** (3 SP)
   - `/proyectos` - Grid de proyectos publicados
   - Filtros: por categoría, fecha
   - Paginación o infinite scroll

2. **Detalle de Proyecto** (2 SP)
   - `/proyectos/[slug]` - Página individual
   - Galería de imágenes (lightbox)
   - Videos embebidos
   - Metadata para SEO

**Total Fase 1:** 44 Story Points (~6-8 semanas)

---

### 🤖 Fase 2: Chatbot Inteligente con ML
**Duración Estimada:** 6-10 semanas  
**Objetivo:** Chatbot conversacional que responde preguntas sobre servicios, experiencia y proyectos

#### 🎯 Épica 2.1: Infraestructura de IA
**Story Points:** 13

**Tareas:**
1. **Selección de Modelo LLM** (2 SP)
   - Evaluación: OpenAI GPT-4, Anthropic Claude, Llama 3
   - Decisión: API hosted vs self-hosted
   - Setup de API keys y rate limits

2. **Vectorización de Contenido** (5 SP)
   - Extracción de datos:
     * Servicios de sitecel.cl
     * Proyectos de la DB
     * CVs del equipo (texto estructurado)
   - Embedding generation (OpenAI text-embedding-3 o sentence-transformers)
   - Vector Database (Pinecone, Weaviate, o pgvector en PostgreSQL)
   - Índices: por tipo de contenido (servicios, proyectos, experiencia)

3. **Pipeline RAG (Retrieval-Augmented Generation)** (6 SP)
   - Búsqueda semántica en vector DB
   - Prompt engineering para respuestas contextuales
   - Sistema de citas (referencias a proyectos/servicios)
   - Fallback para preguntas fuera de contexto
   - Memory/conversation history (últimos N mensajes)

**Tecnologías:**
- LLM: OpenAI API o Anthropic Claude API
- Embeddings: OpenAI text-embedding-3-small
- Vector DB: Pinecone (managed) o pgvector (self-hosted)
- Framework: LangChain o LlamaIndex

---

#### 🎯 Épica 2.2: Backend del Chatbot
**Story Points:** 8

**Tareas:**
1. **API Endpoints** (3 SP)
   - `POST /api/chat/message` - Enviar mensaje
   - `GET /api/chat/history/{session_id}` - Historial
   - WebSocket para streaming (opcional)

2. **Business Logic** (5 SP)
   - Detección de intención (preguntas sobre servicios vs proyectos)
   - Routing a knowledge base correcto
   - Rate limiting y abuse prevention
   - Analytics de preguntas frecuentes

**Tecnologías:**
- Backend: FastAPI async endpoints
- Queue: Redis (opcional para async processing)
- Streaming: Server-Sent Events (SSE) o WebSockets

---

#### 🎯 Épica 2.3: Interfaz del Chat
**Story Points:** 8

**Tareas:**
1. **Widget de Chat** (5 SP)
   - Botón flotante en sitecel.cl
   - Ventana de chat expandible
   - Input de usuario + historial
   - Typing indicators
   - Markdown rendering para respuestas
   - Auto-scroll

2. **UX Enhancements** (3 SP)
   - Sugerencias de preguntas frecuentes
   - Botones de acción rápida ("Conocer servicios", "Ver proyectos")
   - Handoff a contacto humano (link a formulario)
   - Mobile responsive

**Tecnologías:**
- UI Library: Shadcn/ui Chat components
- State: Zustand para chat state
- Real-time: TanStack Query + SSE

---

#### 🎯 Épica 2.4: Entrenamiento y Mejora Continua
**Story Points:** 5

**Tareas:**
1. **Dataset de Entrenamiento** (2 SP)
   - Crear Q&A pairs de referencia
   - Casos de uso comunes
   - Respuestas aprobadas manualmente

2. **Monitoreo y Feedback** (3 SP)
   - Thumbs up/down en respuestas
   - Logging de conversaciones
   - Dashboard de analytics
   - Alertas para respuestas incorrectas

**Total Fase 2:** 34 Story Points (~6-10 semanas)

---

### 🔧 Fase 3: Mejoras y Optimización
**Duración Estimada:** 4 semanas  
**Objetivo:** Performance, testing, CI/CD avanzado

#### Tareas Principales:
- [ ] Tests unitarios (backend): pytest con >80% coverage
- [ ] Tests de integración (API): Postman/Newman
- [ ] Tests E2E (frontend): Playwright
- [ ] Lighthouse scores >90 (Performance, SEO, Accessibility)
- [ ] GitHub Actions CI/CD completo
- [ ] Monitoring: Sentry (errores) + PostHog (analytics)
- [ ] Backup automatizado de DB
- [ ] Documentación técnica (ADRs, deployment guide)

---

## 📅 Timeline General

| Fase | Duración | Inicio Estimado | Fin Estimado |
|------|----------|-----------------|--------------|
| ✅ Fase 0: Web Corporativa | Completada | - | Nov 2025 |
| 🚀 Fase 1: CMS de Proyectos | 6-8 semanas | Dic 2025 | Feb 2026 |
| 🤖 Fase 2: Chatbot ML | 6-10 semanas | Feb 2026 | Abr 2026 |
| 🔧 Fase 3: Optimización | 4 semanas | Abr 2026 | May 2026 |

**Total:** ~16-22 semanas (4-5.5 meses)

---

## 🎯 Métricas de Éxito

### Fase 1 - CMS:
- [ ] Admin puede crear/editar/eliminar proyectos sin código
- [ ] Proyectos se muestran en `/proyectos` en <2 segundos
- [ ] 100% de uptime en producción
- [ ] Mobile-first: funciona en pantallas 320px+

### Fase 2 - Chatbot:
- [ ] Responde correctamente ≥80% preguntas sobre servicios/proyectos
- [ ] Tiempo de respuesta <3 segundos (P95)
- [ ] ≥70% satisfacción (thumbs up)
- [ ] Maneja ≥100 consultas/día sin degradación

### Fase 3 - Calidad:
- [ ] Test coverage ≥80%
- [ ] Lighthouse Performance ≥90
- [ ] Zero critical security vulnerabilities (Snyk/Dependabot)
- [ ] Documentación completa (README, ADRs, API docs)

---

## 🛠️ Stack Tecnológico Completo

**Frontend:**
- Framework: Next.js 14 (App Router)
- Language: TypeScript
- Styling: Tailwind CSS
- UI Components: Shadcn/ui
- State Management: Zustand / TanStack Query
- Forms: React Hook Form + Zod
- Testing: Vitest + Playwright

**Backend:**
- Framework: FastAPI (Python 3.11+)
- ORM: SQLAlchemy 2.0 (Async)
- Validation: Pydantic v2
- Auth: JWT (python-jose)
- Testing: pytest + httpx

**Database:**
- Primary: PostgreSQL 15+
- Vector DB: Pinecone o pgvector
- Cache: Redis (opcional)

**AI/ML:**
- LLM: OpenAI GPT-4 o Anthropic Claude
- Embeddings: text-embedding-3-small
- Framework: LangChain o LlamaIndex

**DevOps:**
- Hosting: Vercel (frontend) + Railway/Fly.io (backend)
- CI/CD: GitHub Actions
- Monitoring: Sentry + PostHog
- File Storage: Cloudinary o AWS S3

---

## 💡 Ideas Futuras (Backlog)

- [ ] Multi-idioma (EN/ES) con i18n
- [ ] Blog/noticias de la empresa (Contentlayer o MDX)
- [ ] Portal de clientes (login para ver proyectos privados)
- [ ] Integración con WhatsApp Business API
- [ ] Sistema de cotizaciones online
- [ ] CRM básico (leads del formulario + chatbot)
- [ ] A/B testing de landing pages

---

## 📝 Notas de Implementación

### Decisiones Arquitectónicas (ADRs):

**ADR-001: Separación Frontend/Backend**
- **Decisión:** API separada (FastAPI) vs Next.js API Routes
- **Razón:** Escalabilidad, reutilización de API (mobile app futuro), especialización de stack
- **Trade-off:** Mayor complejidad de deployment, latencia adicional

**ADR-002: Vector Database para Chatbot**
- **Decisión:** Pinecone (managed) inicialmente, migración a pgvector si crecen costos
- **Razón:** Time to market, no gestionar infra de embeddings
- **Trade-off:** Vendor lock-in, costo mensual

**ADR-003: Monorepo vs Multirepo**
- **Decisión:** Multirepo (frontend/backend separados)
- **Razón:** Diferentes equipos potenciales, diferentes ciclos de release
- **Trade-off:** Sincronización de cambios en contratos (API)

---

## 🤝 Contribuciones

Este roadmap es dinámico y se actualiza según:
- Feedback de stakeholders
- Cambios en prioridades de negocio
- Aprendizajes durante implementación

Para sugerir cambios: abrir issue en GitHub con label `roadmap`.

---

**Última actualización:** Diciembre 2025  
**Versión:** 1.0  
**Owner:** Pedro Araujo Quintero (@paraujoq)
