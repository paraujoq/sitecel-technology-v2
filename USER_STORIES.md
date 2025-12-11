# 📋 User Stories - Sitecel Technology v2

## Formato de Historia de Usuario

```
**Como** [tipo de usuario]
**Quiero** [realizar alguna acción]
**Para** [obtener algún beneficio/valor]

**Criterios de Aceptación:**
- [ ] Criterio 1
- [ ] Criterio 2

**Estimación:** X Story Points
**Prioridad:** Alta/Media/Baja
**Labels:** epic-name, frontend/backend, etc.
```

---

## ✅ FASE 0: Web Corporativa (COMPLETADAS)

### US-000: Landing Page Principal
**Como** visitante del sitio  
**Quiero** ver una página de inicio profesional con información de la empresa  
**Para** conocer los servicios de Sitecel Technology

**Criterios de Aceptación:**
- [x] Hero section con propuesta de valor clara
- [x] Secciones: Servicios, Sobre Nosotros, Proyectos, Contacto
- [x] Diseño responsive (mobile-first)
- [x] Navegación funcional
- [x] Imágenes optimizadas

**Estimación:** 8 SP  
**Prioridad:** Alta  
**Labels:** `phase-0`, `frontend`, `completed`  
**Estado:** ✅ Completada (Nov 2025)

---

### US-001: Formulario de Contacto
**Como** cliente potencial  
**Quiero** enviar un mensaje de consulta a Sitecel  
**Para** solicitar información sobre servicios

**Criterios de Aceptación:**
- [x] Campos: nombre, email, teléfono, mensaje
- [x] Validación client-side (email válido, campos requeridos)
- [x] Envío de email funcionando
- [x] Mensaje de confirmación al usuario
- [x] Manejo de errores

**Estimación:** 5 SP  
**Prioridad:** Alta  
**Labels:** `phase-0`, `frontend`, `completed`  
**Estado:** ✅ Completada (Nov 2025)

---

### US-002: Sección de Servicios
**Como** visitante  
**Quiero** ver los servicios que ofrece Sitecel  
**Para** evaluar si se ajustan a mis necesidades

**Criterios de Aceptación:**
- [x] 4 servicios principales mostrados con íconos
- [x] Descripción breve de cada servicio
- [x] Diseño consistente y profesional
- [x] Links a mayor detalle (si aplica)

**Estimación:** 3 SP  
**Prioridad:** Media  
**Labels:** `phase-0`, `frontend`, `completed`  
**Estado:** ✅ Completada (Nov 2025)

---

### US-003: Deploy en Producción
**Como** stakeholder  
**Quiero** que el sitio esté disponible en www.sitecel.cl  
**Para** que clientes puedan acceder a la información

**Criterios de Aceptación:**
- [x] Sitio desplegado en Vercel
- [x] Dominio personalizado configurado (sitecel.cl)
- [x] HTTPS habilitado
- [x] CI/CD con GitHub Actions
- [x] Zero downtime

**Estimación:** 5 SP  
**Prioridad:** Alta  
**Labels:** `phase-0`, `devops`, `completed`  
**Estado:** ✅ Completada (Nov 2025)

---

### US-004: SEO Básico
**Como** owner del sitio  
**Quiero** que el sitio esté optimizado para SEO  
**Para** aparecer en búsquedas de Google

**Criterios de Aceptación:**
- [x] Meta tags (title, description) en todas las páginas
- [x] Sitemap.xml generado
- [x] Robots.txt configurado
- [x] Open Graph tags para redes sociales
- [x] Schema.org markup (Organization)

**Estimación:** 3 SP  
**Prioridad:** Media  
**Labels:** `phase-0`, `frontend`, `seo`, `completed`  
**Estado:** ✅ Completada (Nov 2025)

---

## 🚀 FASE 1: Sistema de Gestión de Proyectos (CMS)

### ÉPICA 1.1: Backend API & Database

#### US-101: Diseño de Schema de Base de Datos
**Como** desarrollador backend  
**Quiero** diseñar el schema de PostgreSQL para proyectos  
**Para** almacenar toda la información necesaria

**Criterios de Aceptación:**
- [ ] Tabla `projects` con campos:
  - `id` (UUID, primary key)
  - `title` (VARCHAR, not null)
  - `slug` (VARCHAR, unique, not null)
  - `description` (TEXT)
  - `published` (BOOLEAN, default false)
  - `start_date` (DATE)
  - `duration` (INTEGER, en días)
  - `created_at`, `updated_at` (TIMESTAMP)
- [ ] Tabla `project_images` (1-N):
  - `id`, `project_id`, `url`, `alt_text`, `order`
- [ ] Tabla `project_videos` (1-N):
  - `id`, `project_id`, `video_url`, `thumbnail_url`, `order`
- [ ] Índices en `slug`, `published`, `created_at`
- [ ] Migración inicial con Alembic
- [ ] Documentación del schema (ERD)

**Estimación:** 3 SP  
**Prioridad:** Alta  
**Labels:** `phase-1`, `epic-1.1`, `backend`, `database`

---

#### US-102: Setup de FastAPI Project
**Como** desarrollador backend  
**Quiero** configurar la estructura base del proyecto FastAPI  
**Para** tener un entorno de desarrollo robusto

**Criterios de Aceptación:**
- [ ] Estructura de carpetas según best practices
- [ ] Requirements.txt / Poetry con dependencias
- [ ] Configuración de variables de entorno (.env)
- [ ] Docker Compose para PostgreSQL local
- [ ] Conexión a DB funcionando (SQLAlchemy async)
- [ ] Health check endpoint (`GET /health`)
- [ ] Documentación automática (Swagger en `/docs`)
- [ ] README con instrucciones de setup

**Estimación:** 5 SP  
**Prioridad:** Alta  
**Labels:** `phase-1`, `epic-1.1`, `backend`, `setup`

---

#### US-103: API CRUD de Proyectos
**Como** desarrollador backend  
**Quiero** implementar endpoints RESTful para proyectos  
**Para** permitir operaciones CRUD desde el frontend

**Criterios de Aceptación:**
- [ ] `POST /api/v1/projects` - Crear proyecto
  - Request body: ProjectCreate schema (Pydantic)
  - Response: Project schema con ID generado
  - Validaciones: title no vacío, slug único
- [ ] `GET /api/v1/projects` - Listar proyectos
  - Query params: `page`, `limit`, `published` (filter)
  - Response: Lista paginada + metadata (total, pages)
  - Ordenamiento por `created_at DESC`
- [ ] `GET /api/v1/projects/{id}` - Detalle proyecto
  - Response: Project completo (con images y videos)
  - Error 404 si no existe
- [ ] `PUT /api/v1/projects/{id}` - Actualizar
  - Request body: ProjectUpdate schema
  - Response: Project actualizado
- [ ] `DELETE /api/v1/projects/{id}` - Eliminar
  - Soft delete (flag `deleted_at`)
  - Response: 204 No Content
- [ ] `PATCH /api/v1/projects/{id}/publish` - Toggle published
  - Response: Project con nuevo estado
- [ ] Tests unitarios con pytest (>80% coverage)

**Estimación:** 8 SP  
**Prioridad:** Alta  
**Labels:** `phase-1`, `epic-1.1`, `backend`, `api`

---

#### US-104: Sistema de Autenticación JWT
**Como** administrador  
**Quiero** autenticarme de forma segura en la API  
**Para** proteger endpoints sensibles (CRUD de proyectos)

**Criterios de Aceptación:**
- [ ] Tabla `users` en DB (id, email, hashed_password, role)
- [ ] `POST /api/v1/auth/login` endpoint
  - Request: email + password
  - Response: access_token (JWT) + token_type
  - Validación de credenciales con bcrypt
- [ ] `POST /api/v1/auth/register` (solo admin puede crear usuarios)
- [ ] Middleware de autenticación en endpoints protegidos
- [ ] Decorador `@requires_auth` para proteger rutas
- [ ] Roles: `admin` (full CRUD), `viewer` (solo lectura)
- [ ] Token expiration (1 hora) y refresh token (7 días)
- [ ] Manejo de errores: 401 Unauthorized, 403 Forbidden

**Estimación:** 5 SP  
**Prioridad:** Alta  
**Labels:** `phase-1`, `epic-1.1`, `backend`, `auth`

---

### ÉPICA 1.2: Admin Dashboard (Frontend)

#### US-201: Login Page
**Como** administrador  
**Quiero** iniciar sesión en el admin panel  
**Para** acceder a funcionalidades de gestión

**Criterios de Aceptación:**
- [ ] Ruta `/admin/login` pública
- [ ] Formulario con email y password
- [ ] Validación client-side (email válido, password no vacío)
- [ ] Llamada a `POST /api/v1/auth/login`
- [ ] Guardar JWT en localStorage/cookies seguros
- [ ] Redirect a `/admin` después de login exitoso
- [ ] Mostrar errores (credenciales incorrectas)
- [ ] Loading state durante autenticación
- [ ] Diseño profesional y limpio

**Estimación:** 3 SP  
**Prioridad:** Alta  
**Labels:** `phase-1`, `epic-1.2`, `frontend`, `auth`

---

#### US-202: Protected Routes Middleware
**Como** sistema  
**Quiero** verificar autenticación en rutas admin  
**Para** prevenir acceso no autorizado

**Criterios de Aceptación:**
- [ ] Middleware en Next.js para rutas `/admin/*`
- [ ] Verificar JWT válido en cada request
- [ ] Redirect a `/admin/login` si no autenticado
- [ ] Mostrar loading mientras valida token
- [ ] Refresh token automático si está por expirar
- [ ] Logout automático si token inválido

**Estimación:** 3 SP  
**Prioridad:** Alta  
**Labels:** `phase-1`, `epic-1.2`, `frontend`, `auth`

---

#### US-203: Admin Layout con Sidebar
**Como** administrador  
**Quiero** tener un layout consistente en el admin  
**Para** navegar fácilmente entre secciones

**Criterios de Aceptación:**
- [ ] Sidebar con navegación:
  - Dashboard (home)
  - Proyectos
  - Configuración (futuro)
- [ ] Header con:
  - Nombre del usuario logueado
  - Botón de logout
- [ ] Layout responsive (colapsar sidebar en mobile)
- [ ] Indicador de sección activa
- [ ] Footer con copyright

**Estimación:** 2 SP  
**Prioridad:** Media  
**Labels:** `phase-1`, `epic-1.2`, `frontend`, `ui`

---

#### US-204: Dashboard Home
**Como** administrador  
**Quiero** ver un resumen del sistema en `/admin`  
**Para** tener una visión general

**Criterios de Aceptación:**
- [ ] Cards con métricas:
  - Total de proyectos
  - Proyectos publicados
  - Proyectos en borrador
  - Último proyecto creado
- [ ] Gráfico simple (opcional, barra/línea)
- [ ] Accesos rápidos a "Crear Proyecto", "Ver Proyectos"
- [ ] Diseño con Shadcn/ui components

**Estimación:** 2 SP  
**Prioridad:** Baja  
**Labels:** `phase-1`, `epic-1.2`, `frontend`, `dashboard`

---

#### US-205: Lista de Proyectos (Admin)
**Como** administrador  
**Quiero** ver una tabla con todos los proyectos  
**Para** gestionarlos fácilmente

**Criterios de Aceptación:**
- [ ] Ruta `/admin/projects`
- [ ] Tabla con columnas:
  - Título
  - Estado (Publicado/Borrador) con badge
  - Fecha de creación
  - Acciones (Editar, Eliminar, Toggle Publish)
- [ ] Paginación (10 proyectos por página)
- [ ] Filtros: por estado (publicado/borrador)
- [ ] Búsqueda por título (debounced)
- [ ] Botón "Crear Nuevo Proyecto"
- [ ] Loading state mientras carga datos
- [ ] Empty state si no hay proyectos
- [ ] Confirmación antes de eliminar

**Estimación:** 5 SP  
**Prioridad:** Alta  
**Labels:** `phase-1`, `epic-1.2`, `frontend`, `crud`

---

#### US-206: Formulario Crear/Editar Proyecto
**Como** administrador  
**Quiero** crear o editar un proyecto desde un formulario  
**Para** gestionar el contenido fácilmente

**Criterios de Aceptación:**
- [ ] Rutas: `/admin/projects/new`, `/admin/projects/[id]/edit`
- [ ] Campos del formulario:
  - Título (text input)
  - Slug (auto-generado del título, editable)
  - Descripción (rich text editor: TipTap o Lexical)
  - Fecha de inicio (date picker)
  - Duración en días (number input)
  - Publicado (toggle/checkbox)
- [ ] Upload de imágenes:
  - Drag & drop o botón
  - Preview de imágenes
  - Reordenar (drag & drop)
  - Eliminar imagen
  - Alt text por imagen
- [ ] Videos:
  - Input de URLs (YouTube/Vimeo)
  - Preview de embed
  - Reordenar
- [ ] Validación con React Hook Form + Zod
- [ ] Preview del proyecto antes de guardar
- [ ] Loading state durante save
- [ ] Redirect a lista después de guardar
- [ ] Manejo de errores (mostrar en formulario)

**Estimación:** 13 SP (historia grande, considerar split)  
**Prioridad:** Alta  
**Labels:** `phase-1`, `epic-1.2`, `frontend`, `forms`, `crud`

**Nota:** Considerar dividir en:
- US-206a: Formulario básico (título, descripción, fechas)
- US-206b: Upload de imágenes
- US-206c: Videos e integración completa

---

### ÉPICA 1.3: Integración Frontend-Backend

#### US-301: API Client en Next.js
**Como** desarrollador frontend  
**Quiero** una capa de abstracción para llamadas API  
**Para** manejar requests de forma consistente

**Criterios de Aceptación:**
- [ ] Cliente HTTP con Axios o Fetch
- [ ] Base URL configurable por entorno
- [ ] Interceptors:
  - Request: agregar JWT en header `Authorization`
  - Response: manejar errores 401 (logout), 403, 500
- [ ] Funciones tipadas para cada endpoint:
  - `getProjects()`, `getProjectById()`, `createProject()`, etc.
- [ ] Manejo de errores centralizado
- [ ] TypeScript types compartidos (sincronizar con backend schemas)

**Estimación:** 3 SP  
**Prioridad:** Alta  
**Labels:** `phase-1`, `epic-1.3`, `frontend`, `integration`

---

#### US-302: Consumo de API en Admin
**Como** desarrollador frontend  
**Quiero** integrar el API client en el admin panel  
**Para** mostrar y gestionar datos reales

**Criterios de Aceptación:**
- [ ] Server Components para SSR donde sea posible
- [ ] Client Components con TanStack Query para:
  - Listas con paginación
  - Formularios con mutations
- [ ] Loading states en todas las operaciones
- [ ] Optimistic updates en toggle publish y delete
- [ ] Revalidación automática después de mutations
- [ ] Error boundaries para manejar fallos

**Estimación:** 3 SP  
**Prioridad:** Alta  
**Labels:** `phase-1`, `epic-1.3`, `frontend`, `integration`

---

#### US-303: Tests End-to-End
**Como** equipo de desarrollo  
**Quiero** tests E2E del flujo completo admin  
**Para** asegurar que todo funciona integrado

**Criterios de Aceptación:**
- [ ] Setup de Playwright
- [ ] Test: Login flow
  - Login con credenciales válidas → redirect a /admin
  - Login con credenciales inválidas → error
- [ ] Test: CRUD de proyecto
  - Crear proyecto → verificar en lista
  - Editar proyecto → verificar cambios
  - Toggle publish → verificar cambio de estado
  - Eliminar proyecto → verificar desaparece de lista
- [ ] Tests corren en CI (GitHub Actions)
- [ ] Coverage >70% en flujos críticos

**Estimación:** 5 SP  
**Prioridad:** Media  
**Labels:** `phase-1`, `epic-1.3`, `testing`, `e2e`

---

### ÉPICA 1.4: Proyectos Públicos (Frontend)

#### US-401: Página de Proyectos Pública
**Como** visitante del sitio  
**Quiero** ver todos los proyectos publicados de Sitecel  
**Para** conocer su experiencia y portafolio

**Criterios de Aceptación:**
- [ ] Ruta `/proyectos` pública
- [ ] Grid responsivo de proyectos (3 cols desktop, 1 col mobile)
- [ ] Card por proyecto:
  - Imagen destacada
  - Título
  - Fecha de inicio
  - Extracto de descripción (100 chars)
  - Badge si es reciente (<30 días)
- [ ] Filtros:
  - Por categoría (si se agrega categorías en schema)
  - Por rango de fechas
- [ ] Ordenamiento: más recientes primero
- [ ] Paginación (12 proyectos por página)
- [ ] Empty state si no hay proyectos publicados
- [ ] SEO: meta tags dinámicos por página

**Estimación:** 5 SP  
**Prioridad:** Alta  
**Labels:** `phase-1`, `epic-1.4`, `frontend`, `public`

---

#### US-402: Detalle de Proyecto Público
**Como** visitante  
**Quiero** ver todos los detalles de un proyecto específico  
**Para** entender el alcance y resultados

**Criterios de Aceptación:**
- [ ] Ruta `/proyectos/[slug]`
- [ ] Contenido:
  - Título grande (H1)
  - Fecha de inicio y duración
  - Descripción completa (rich text renderizado)
  - Galería de imágenes:
    - Grid responsive
    - Lightbox al hacer click (ver en grande)
    - Navegación entre imágenes en lightbox
  - Videos embebidos (YouTube/Vimeo)
  - Botón CTA: "Contáctanos para proyectos similares"
- [ ] Breadcrumbs: Inicio > Proyectos > [Nombre]
- [ ] Botones: "Proyecto Anterior" / "Proyecto Siguiente"
- [ ] SEO:
  - Meta tags personalizados (title, description, OG:image)
  - Schema.org markup (Project/Service)
- [ ] Error 404 si proyecto no existe o no está publicado

**Estimación:** 5 SP  
**Prioridad:** Alta  
**Labels:** `phase-1`, `epic-1.4`, `frontend`, `public`, `seo`

---

## 🤖 FASE 2: Chatbot Inteligente con ML

### ÉPICA 2.1: Infraestructura de IA

#### US-501: Evaluación y Setup de LLM
**Como** desarrollador de IA  
**Quiero** elegir y configurar el LLM más adecuado  
**Para** potenciar el chatbot

**Criterios de Aceptación:**
- [ ] Documento de evaluación comparativa:
  - OpenAI GPT-4 (API)
  - Anthropic Claude 3.5 (API)
  - Llama 3 (self-hosted)
  - Criterios: costo, latencia, calidad, rate limits
- [ ] Decisión documentada (ADR)
- [ ] API keys configuradas en variables de entorno
- [ ] Script de prueba básico (prompt → response)
- [ ] Monitoreo de costos (alertas si supera presupuesto)

**Estimación:** 3 SP  
**Prioridad:** Alta  
**Labels:** `phase-2`, `epic-2.1`, `ml`, `research`

---

#### US-502: Vectorización de Contenido
**Como** desarrollador de IA  
**Quiero** convertir contenido de Sitecel a embeddings  
**Para** hacer búsqueda semántica en el chatbot

**Criterios de Aceptación:**
- [ ] Script para extraer datos:
  - Servicios (texto de sitecel.cl)
  - Proyectos (desde PostgreSQL)
  - CVs del equipo (texto estructurado)
  - FAQs (si existen)
- [ ] Generación de embeddings con text-embedding-3-small
- [ ] Almacenamiento en Pinecone:
  - Namespace por tipo: `services`, `projects`, `team`
  - Metadata: source_id, type, updated_at
- [ ] Índices optimizados para búsqueda
- [ ] Job de actualización periódica (cada hora) para proyectos nuevos
- [ ] Monitoring de costo de embeddings

**Estimación:** 8 SP  
**Prioridad:** Alta  
**Labels:** `phase-2`, `epic-2.1`, `ml`, `embeddings`

---

#### US-503: Pipeline RAG (Retrieval-Augmented Generation)
**Como** desarrollador de IA  
**Quiero** implementar RAG para respuestas contextuales  
**Para** que el chatbot responda con información real de Sitecel

**Criterios de Aceptación:**
- [ ] Flujo completo RAG:
  1. Query del usuario → Embedding
  2. Búsqueda semántica en Pinecone (top 5 resultados)
  3. Construcción de contexto con chunks relevantes
  4. Prompt al LLM con contexto + query
  5. Generación de respuesta
- [ ] Sistema de citas:
  - Respuestas incluyen referencias ([1], [2])
  - Footer con fuentes (títulos de proyectos/servicios)
- [ ] Prompt engineering:
  - Instrucciones claras (rol: asistente de Sitecel)
  - Guardrails (no inventar info, admitir si no sabe)
  - Tono profesional pero amigable
- [ ] Memory conversacional:
  - Mantener últimos 5 mensajes en contexto
  - Permitir follow-up questions
- [ ] Fallback para queries fuera de scope:
  - "No tengo información sobre eso, pero puedo conectarte con un asesor"
- [ ] Logs de queries y respuestas (para mejora continua)

**Estimación:** 13 SP  
**Prioridad:** Alta  
**Labels:** `phase-2`, `epic-2.1`, `ml`, `rag`

---

### ÉPICA 2.2: Backend del Chatbot

#### US-601: API Endpoints del Chat
**Como** desarrollador backend  
**Quiero** crear endpoints para el chatbot  
**Para** permitir interacción desde el frontend

**Criterios de Aceptación:**
- [ ] `POST /api/v1/chat/message`
  - Request: `{ session_id, message, user_id? }`
  - Response: `{ message, sources[], typing_time }`
  - Llama al pipeline RAG
  - Streaming con SSE (opcional)
- [ ] `GET /api/v1/chat/history/{session_id}`
  - Response: lista de mensajes de la sesión
  - Últimos 50 mensajes
- [ ] `DELETE /api/v1/chat/history/{session_id}`
  - Limpiar historial de sesión
- [ ] Rate limiting:
  - Max 10 requests/minuto por session_id
  - Max 100 requests/hora por IP
- [ ] Analytics:
  - Log de queries frecuentes
  - Tiempo de respuesta promedio
  - Tasa de satisfacción (si hay feedback)

**Estimación:** 5 SP  
**Prioridad:** Alta  
**Labels:** `phase-2`, `epic-2.2`, `backend`, `api`

---

#### US-602: Business Logic del Chatbot
**Como** desarrollador backend  
**Quiero** implementar lógica de negocio del chat  
**Para** manejar diferentes tipos de consultas

**Criterios de Aceptación:**
- [ ] Intent detection (básico):
  - ¿Pregunta sobre servicios? → namespace `services`
  - ¿Pregunta sobre proyectos? → namespace `projects`
  - ¿Pregunta sobre equipo? → namespace `team`
  - ¿Solicitud de contacto? → trigger handoff
- [ ] Respuestas pre-definidas para intents comunes:
  - Saludo → "¡Hola! Soy el asistente de Sitecel..."
  - Despedida → "¡Gracias por contactarnos!..."
  - Solicitud de contacto → "Te conectaré con un asesor. Dime tu email..."
- [ ] Abuse prevention:
  - Detectar spam (misma query repetida >3 veces)
  - Block por 5 minutos si detecta abuse
- [ ] Error handling:
  - Si LLM falla → fallback a "Disculpa, tuve un problema..."
  - Si Pinecone falla → respuesta sin contexto (degradación graceful)

**Estimación:** 8 SP  
**Prioridad:** Alta  
**Labels:** `phase-2`, `epic-2.2`, `backend`, `ml`

---

### ÉPICA 2.3: Interfaz del Chat

#### US-701: Widget de Chat Flotante
**Como** visitante del sitio  
**Quiero** tener acceso fácil al chat en cualquier página  
**Para** hacer consultas sin salir de donde estoy

**Criterios de Aceptación:**
- [ ] Botón flotante en esquina inferior derecha
- [ ] Al click: ventana de chat se expande (350px ancho)
- [ ] Ventana incluye:
  - Header: logo + "Asistente Sitecel" + botón cerrar
  - Área de mensajes (scrollable)
  - Input de texto + botón enviar
  - Footer: "Powered by IA"
- [ ] Estados:
  - Colapsado (solo botón)
  - Expandido (ventana completa)
  - Minimizado (header visible, mensajes ocultos)
- [ ] Animaciones suaves (slide-in, fade)
- [ ] Z-index alto (siempre visible)
- [ ] Responsive: en mobile ocupar pantalla completa

**Estimación:** 5 SP  
**Prioridad:** Alta  
**Labels:** `phase-2`, `epic-2.3`, `frontend`, `ui`

---

#### US-702: Interfaz de Conversación
**Como** usuario del chat  
**Quiero** una experiencia fluida de conversación  
**Para** obtener respuestas rápidas y claras

**Criterios de Aceptación:**
- [ ] Mensajes del usuario: alineados a la derecha, fondo azul
- [ ] Mensajes del bot: alineados a la izquierda, fondo gris
- [ ] Typing indicator mientras bot escribe ("...")
- [ ] Timestamps en mensajes (relativo: "hace 2 min")
- [ ] Markdown rendering en respuestas del bot:
  - Negrita, cursiva
  - Listas
  - Links
- [ ] Citas/fuentes al final de respuestas:
  - "Basado en: Proyecto ABC, Servicio XYZ"
  - Links clickeables a proyectos
- [ ] Auto-scroll a último mensaje
- [ ] Persistencia de sesión (localStorage):
  - Recuperar historial al reabrir chat
  - Session ID único por visitante
- [ ] Enter para enviar, Shift+Enter para nueva línea
- [ ] Max 500 caracteres por mensaje (validar)

**Estimación:** 8 SP  
**Prioridad:** Alta  
**Labels:** `phase-2`, `epic-2.3`, `frontend`, `ui`

---

#### US-703: UX Enhancements
**Como** usuario del chat  
**Quiero** funcionalidades adicionales para mejor experiencia  
**Para** navegar el chat más fácilmente

**Criterios de Aceptación:**
- [ ] Sugerencias de preguntas frecuentes al inicio:
  - "¿Qué servicios ofrecen?"
  - "Quiero ver sus proyectos"
  - "¿Cómo puedo contactarlos?"
  - Botones clickeables que envían la pregunta
- [ ] Botones de quick reply:
  - Bot pregunta: "¿Te ayudó esto?" → ["Sí", "No"]
  - Bot: "¿Quieres contactar a un asesor?" → ["Sí", "Ahora no"]
- [ ] Handoff a humano:
  - Si usuario dice "hablar con persona"
  - Bot responde con formulario embebido
  - Campos: nombre, email, mensaje
  - Envía email a Sitecel
- [ ] Thumbs up/down en cada respuesta del bot
- [ ] Opción "Nueva conversación" (resetea historial)
- [ ] Mobile: teclado empuja el chat hacia arriba
- [ ] Desktop: mantener posición del widget en todas las páginas

**Estimación:** 8 SP  
**Prioridad:** Media  
**Labels:** `phase-2`, `epic-2.3`, `frontend`, `ux`

---

### ÉPICA 2.4: Entrenamiento y Mejora Continua

#### US-801: Dataset de Entrenamiento
**Como** ML engineer  
**Quiero** crear un dataset de referencia  
**Para** evaluar calidad de respuestas del chatbot

**Criterios de Aceptación:**
- [ ] CSV/JSON con Q&A pairs:
  - ≥50 preguntas comunes
  - Respuestas esperadas (gold standard)
  - Categoría (servicios, proyectos, contacto)
- [ ] Casos de borde:
  - Preguntas ambiguas
  - Preguntas fuera de scope
  - Follow-up questions
- [ ] Script de evaluación:
  - Enviar cada pregunta al chatbot
  - Comparar respuesta con expected
  - Calcular score (similarity semántica)
- [ ] Benchmark inicial (baseline)
- [ ] Target: ≥80% similarity con respuestas esperadas

**Estimación:** 3 SP  
**Prioridad:** Media  
**Labels:** `phase-2`, `epic-2.4`, `ml`, `testing`

---

#### US-802: Sistema de Feedback
**Como** administrador  
**Quiero** monitorear feedback de usuarios  
**Para** mejorar el chatbot continuamente

**Criterios de Aceptación:**
- [ ] Tabla `chat_feedback` en DB:
  - `session_id`, `message_id`, `rating` (1-5 o thumbs)
  - `comment` (opcional), `created_at`
- [ ] Endpoint `POST /api/v1/chat/feedback`
- [ ] Dashboard en admin panel (`/admin/chatbot-analytics`):
  - Gráfico de satisfacción (% positivo/negativo)
  - Top 10 preguntas más comunes
  - Respuestas con peor rating
  - Tiempo de respuesta promedio
- [ ] Alertas:
  - Email si rating promedio <70% en últimas 24h
  - Notificar si aparece nueva pregunta frecuente (>10 veces/día)
- [ ] Export de datos para análisis (CSV)

**Estimación:** 5 SP  
**Prioridad:** Media  
**Labels:** `phase-2`, `epic-2.4`, `backend`, `analytics`

---

## 🔧 FASE 3: Mejoras y Optimización

### US-901: Tests Unitarios Backend
**Como** desarrollador backend  
**Quiero** >80% test coverage en el backend  
**Para** asegurar calidad del código

**Criterios de Aceptación:**
- [ ] Tests con pytest para:
  - Modelos (SQLAlchemy)
  - Schemas (Pydantic validations)
  - Endpoints (status codes, payloads)
  - Auth middleware
- [ ] Mocks de DB y LLM API
- [ ] Fixtures reutilizables
- [ ] Coverage report en CI
- [ ] Fail CI si coverage <80%

**Estimación:** 8 SP  
**Prioridad:** Alta  
**Labels:** `phase-3`, `backend`, `testing`

---

### US-902: Tests de Integración API
**Como** desarrollador  
**Quiero** tests de integración de la API  
**Para** validar flujos completos

**Criterios de Aceptación:**
- [ ] Tests con Postman/Newman:
  - Login → Get JWT
  - CRUD completo de proyecto con JWT
  - Intentar CRUD sin JWT → 401
  - Roles: admin vs viewer
- [ ] Tests corren en CI
- [ ] Newman report en artefactos de CI

**Estimación:** 3 SP  
**Prioridad:** Media  
**Labels:** `phase-3`, `backend`, `testing`

---

### US-903: Lighthouse Optimization
**Como** owner del sitio  
**Quiero** scores de Lighthouse >90  
**Para** mejor SEO y UX

**Criterios de Aceptación:**
- [ ] Performance >90:
  - Lazy loading de imágenes
  - Next.js Image optimization
  - Code splitting
  - Reduce JS bundle size
- [ ] Accessibility >90:
  - ARIA labels
  - Contraste de colores
  - Keyboard navigation
- [ ] SEO >90:
  - Meta tags completos
  - Structured data
  - Mobile-friendly
- [ ] Best Practices >90:
  - HTTPS
  - No console errors
  - Secure headers
- [ ] Tests de Lighthouse en CI (umbral >90)

**Estimación:** 5 SP  
**Prioridad:** Media  
**Labels:** `phase-3`, `frontend`, `optimization`

---

### US-904: CI/CD Completo
**Como** equipo de desarrollo  
**Quiero** pipeline CI/CD robusto  
**Para** deployments seguros y automáticos

**Criterios de Aceptación:**
- [ ] GitHub Actions workflows:
  - **CI (Pull Request):**
    - Linter (ESLint, flake8)
    - Type check (TypeScript, mypy)
    - Tests (frontend + backend)
    - Build check
  - **CD (Push a main):**
    - Deploy frontend a Vercel
    - Deploy backend a Railway/Fly.io
    - Run migrations
    - Smoke tests post-deploy
- [ ] Environments:
  - Staging (branch `develop`)
  - Production (branch `main`)
- [ ] Rollback automático si smoke tests fallan
- [ ] Notificaciones en Slack/Discord

**Estimación:** 5 SP  
**Prioridad:** Alta  
**Labels:** `phase-3`, `devops`, `ci-cd`

---

### US-905: Monitoring y Alertas
**Como** equipo de ops  
**Quiero** monitoreo proactivo  
**Para** detectar y resolver problemas rápido

**Criterios de Aceptación:**
- [ ] Sentry configurado:
  - Frontend: errores de JS, rate de errores
  - Backend: excepciones, performance
  - Alertas en Slack si error rate >5%
- [ ] PostHog (analytics):
  - Page views
  - Eventos: form submissions, chat messages
  - Funnel: home → servicios → contacto
- [ ] Uptime monitoring (UptimeRobot o similar):
  - Ping cada 5 min
  - Alerta si down >2 min
- [ ] Dashboard central (Grafana o similar)

**Estimación:** 3 SP  
**Prioridad:** Media  
**Labels:** `phase-3`, `devops`, `monitoring`

---

### US-906: Documentación Técnica
**Como** nuevo desarrollador  
**Quiero** documentación completa del proyecto  
**Para** onboardearme rápidamente

**Criterios de Aceptación:**
- [ ] README actualizado con setup instructions
- [ ] CONTRIBUTING.md con git workflow
- [ ] ADRs (Architecture Decision Records):
  - ADR-001: Frontend/Backend separation
  - ADR-002: Vector DB choice
  - ADR-003: Monorepo vs Multirepo
- [ ] API documentation (Swagger auto-generado + guía)
- [ ] Deployment guide (paso a paso para prod)
- [ ] Troubleshooting guide (errores comunes)
- [ ] Diagramas:
  - Arquitectura de alto nivel
  - ERD de base de datos
  - Flujo del chatbot

**Estimación:** 5 SP  
**Prioridad:** Media  
**Labels:** `phase-3`, `documentation`

---

## 📊 Resumen de Story Points por Fase

| Fase | Total Story Points | Duración Estimada |
|------|-------------------|-------------------|
| Fase 0 (Completada) | 24 SP | ~4 semanas |
| Fase 1: CMS | 44 SP | 6-8 semanas |
| Fase 2: Chatbot | 34 SP | 6-10 semanas |
| Fase 3: Optimización | 29 SP | 4-6 semanas |
| **TOTAL** | **131 SP** | **20-28 semanas** |

**Nota:** Asumiendo velocidad de ~5-7 SP/semana (trabajo part-time).

---

## 🏷️ Sistema de Labels

**Por Fase:**
- `phase-0`, `phase-1`, `phase-2`, `phase-3`

**Por Épica:**
- `epic-1.1` (Backend API), `epic-1.2` (Admin UI), `epic-2.1` (IA Infra), etc.

**Por Tipo de Trabajo:**
- `frontend`, `backend`, `ml`, `devops`, `testing`, `documentation`

**Por Tecnología:**
- `nextjs`, `fastapi`, `postgresql`, `langchain`, `shadcn`

**Por Prioridad:**
- `priority-high`, `priority-medium`, `priority-low`

**Por Estado:**
- `completed`, `in-progress`, `blocked`, `needs-review`

**Especiales:**
- `good-first-issue` (para nuevos contributors)
- `help-wanted`, `bug`, `enhancement`

---

## 🎯 Definición de Done (DoD)

Una historia se considera **Done** cuando:
- [ ] Código escrito y funcional
- [ ] Tests pasando (unitarios + integración si aplica)
- [ ] Code review aprobado
- [ ] Documentación actualizada (README, comments en código)
- [ ] Deployado en staging y testeado
- [ ] Aprobado por Product Owner (Pedro)
- [ ] Sin deuda técnica crítica

---

## 📝 Plantilla para Crear Issues en GitHub

```markdown
## User Story
**Como** [rol]
**Quiero** [acción]
**Para** [beneficio]

## Acceptance Criteria
- [ ] Criterio 1
- [ ] Criterio 2
- [ ] Criterio 3

## Technical Notes
[Detalles técnicos, decisiones de diseño, etc.]

## Definition of Done
- [ ] Código escrito
- [ ] Tests pasando
- [ ] Code review
- [ ] Docs actualizadas
- [ ] Deployado en staging

## Estimación
X Story Points

## Labels
`phase-X` `epic-X.X` `frontend/backend` `priority-high`
```

---

**Última actualización:** Diciembre 2025  
**Owner:** Pedro Araujo Quintero (@paraujoq)
