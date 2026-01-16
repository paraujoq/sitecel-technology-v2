# 📋 Guía: Configurar GitHub Projects (Kanban)

## Objetivo
Crear un tablero Kanban en GitHub Projects para trackear el desarrollo de Sitecel Technology v2.

---

## 🎯 Paso 1: Crear el Project

1. Ve a tu repositorio: `https://github.com/paraujoq/sitecel-technology-v2`
2. Click en la pestaña **"Projects"**
3. Click en **"Link a project"** → **"New project"**
4. Selecciona **"Board"** (vista Kanban)
5. Nombre: **"Sitecel v2 Development"**
6. Descripción: "Full-stack development roadmap for Sitecel Technology platform"
7. Click **"Create project"**

---

## 🗂️ Paso 2: Configurar Columnas del Kanban

Elimina las columnas por defecto y crea estas:

| Columna | Descripción | Límite WIP |
|---------|-------------|------------|
| 📝 Backlog | Historias priorizadas no iniciadas | - |
| 🎯 Ready | Listo para trabajar (próximas 2 semanas) | 10 |
| 🚧 In Progress | En desarrollo activo | 3 |
| 👀 Review | En code review o testing | 5 |
| ✅ Done | Completado y desplegado | - |
| 🧊 Icebox | Ideas futuras (baja prioridad) | - |

**Cómo crear columnas:**
1. Click en **"+"** al lado de columnas existentes
2. Nombre de la columna
3. (Opcional) Descripción
4. Para "In Progress": agregar límite WIP de 3 items

---

## 🏷️ Paso 3: Crear Labels

Ve a **Settings** → **Labels** y crea:

### Por Fase
```
phase-0 - Completada (verde oscuro)
phase-1 - CMS Projects (azul)
phase-2 - AI Chatbot (morado)
phase-3 - Optimization (naranja)
```

### Por Épica
```
epic-1.1 - Backend API (azul claro)
epic-1.2 - Admin UI (azul medio)
epic-1.3 - Integration (azul oscuro)
epic-1.4 - Public Projects (cyan)
epic-2.1 - AI Infrastructure (morado claro)
epic-2.2 - Chat Backend (morado)
epic-2.3 - Chat UI (morado oscuro)
epic-2.4 - ML Training (rosa)
```

### Por Tipo
```
frontend - Next.js/React (verde claro)
backend - FastAPI/Python (amarillo)
ml - AI/ML work (fucsia)
devops - Infrastructure (rojo)
testing - QA/Tests (gris)
documentation - Docs (beige)
```

### Por Prioridad
```
priority-high - Must have (rojo)
priority-medium - Should have (naranja)
priority-low - Nice to have (amarillo)
```

### Por Estado
```
completed - ✅ Done (verde)
in-progress - 🚧 Working (azul)
blocked - 🚫 Impediment (rojo oscuro)
needs-review - 👀 PR open (morado claro)
```

### Especiales
```
good-first-issue - Easy pick (verde lima)
help-wanted - Need support (rosa)
bug - 🐛 Issue (rojo)
enhancement - ✨ Feature (azul cielo)
```

---

## 📝 Paso 4: Crear Issues desde User Stories

### Ejemplo: US-101 (Diseño de Schema DB)

1. Click **"New issue"** en el repo
2. Copiar contenido desde `USER_STORIES.md`:

```markdown
## User Story
**Como** desarrollador backend  
**Quiero** diseñar el schema de PostgreSQL para proyectos  
**Para** almacenar toda la información necesaria

## Acceptance Criteria
- [ ] Tabla `projects` con campos definidos
- [ ] Tabla `project_images` (1-N)
- [ ] Tabla `project_videos` (1-N)
- [ ] Índices en `slug`, `published`, `created_at`
- [ ] Migración inicial con Alembic
- [ ] Documentación del schema (ERD)

## Technical Notes
- Usar UUID para IDs (mejores para distributed systems)
- Considerar soft delete (campo `deleted_at`)
- Index en `published` para queries públicas

## Definition of Done
- [ ] Código escrito
- [ ] Tests pasando (crear/leer schema)
- [ ] Migración aplicada en dev DB
- [ ] ERD diagram en `/docs/schemas/`
- [ ] Code review aprobado

## Estimación
3 Story Points

## Labels
`phase-1` `epic-1.1` `backend` `database` `priority-high`
```

3. Agregar labels correspondientes
4. Asignar a milestone: "Fase 1 - CMS" (crear milestone si no existe)
5. Agregar al Project: "Sitecel v2 Development"
6. Columna inicial: **Backlog** (o **Ready** si es próxima tarea)
7. Click **"Submit new issue"**

---

## 🔄 Paso 5: Crear Milestones

Ve a **Issues** → **Milestones** → **"New milestone"**

Crear estos milestones:

### Milestone: ✅ Fase 0 - Web Corporativa
- **Due date:** Nov 30, 2024 (pasado)
- **Description:** "Sitio corporativo básico desplegado en www.sitecel.cl"
- **Estado:** Cerrado (100% completado)

### Milestone: 🚀 Fase 1 - CMS de Proyectos
- **Due date:** Feb 15, 2025
- **Description:** "Sistema de gestión de proyectos con admin panel y API"
- **Issues esperados:** ~15 (todas las US-1XX, US-2XX, US-3XX, US-4XX)

### Milestone: 🤖 Fase 2 - Chatbot ML
- **Due date:** Abr 30, 2025
- **Description:** "Chatbot inteligente con RAG y embeddings"
- **Issues esperados:** ~10 (US-5XX, US-6XX, US-7XX, US-8XX)

### Milestone: 🔧 Fase 3 - Optimización
- **Due date:** May 31, 2025
- **Description:** "Testing, CI/CD, monitoring y documentación"
- **Issues esperados:** ~6 (US-9XX)

---

## 📊 Paso 6: Configurar Vistas del Project

### Vista 1: Por Fase (Backlog Planning)
1. En tu Project, click **"+"** (nueva vista)
2. Nombre: "Por Fase"
3. Layout: **Table**
4. Agrupar por: **Milestone**
5. Ordenar por: **Priority** (custom field)
6. Filtros: `is:open`

### Vista 2: Kanban (Vista por Defecto)
- Ya creada
- Agrupar por: **Status** (columnas)
- Mostrar: Story Points (custom field)

### Vista 3: Sprint Actual
1. Nueva vista: "Sprint Actual"
2. Layout: **Board**
3. Filtros:
   - `is:open`
   - `milestone:"Fase 1 - CMS"` (o fase actual)
   - `label:in-progress` OR `label:ready`
4. Límite: solo mostrar 15 issues (foco)

### Vista 4: Por Persona (si hay equipo)
1. Nueva vista: "Por Assignee"
2. Layout: **Board**
3. Agrupar por: **Assignee**
4. Útil para balancear carga de trabajo

---

## 🎨 Paso 7: Crear Custom Fields

En el Project:
1. Click **"⋮"** (opciones) → **"Settings"** → **"Custom fields"**

Crear estos campos:

### Story Points (Number)
- Tipo: Number
- Descripción: "Estimación de esfuerzo (1-13)"
- Mostrar en: Todas las vistas

### Fase (Single select)
- Opciones:
  - Fase 0 - Web Corporativa ✅
  - Fase 1 - CMS Projects 🚀
  - Fase 2 - AI Chatbot 🤖
  - Fase 3 - Optimization 🔧

### Epic (Single select)
- Opciones: (copiar de labels de épicas)

### Type of Work (Single select)
- Frontend
- Backend
- ML/AI
- DevOps
- Testing
- Docs

---

## 🚀 Paso 8: Poblar el Backlog (Primeras Issues)

Crear issues en este orden de prioridad:

### 1. Issues de Fase 0 (Marcar como Done)
```
✅ US-000: Landing Page Principal
✅ US-001: Formulario de Contacto
✅ US-002: Sección de Servicios
✅ US-003: Deploy en Producción
✅ US-004: SEO Básico
```
- Crearlas con estado `completed`
- Cerrarlas inmediatamente
- Asignar a milestone "Fase 0"
- Esto te da un historial de lo completado

### 2. Issues de Fase 1 - Sprint 1 (2 semanas)
En columna **Ready**:
```
🎯 US-101: Diseño de Schema DB (3 SP)
🎯 US-102: Setup FastAPI (5 SP)
🎯 US-201: Login Page (3 SP)
```
Total: 11 SP (2 semanas de trabajo part-time)

### 3. Issues de Fase 1 - Sprint 2
En columna **Backlog**:
```
📝 US-103: API CRUD Proyectos (8 SP)
📝 US-104: Autenticación JWT (5 SP)
📝 US-202: Protected Routes (3 SP)
```

### 4. Resto de Fase 1
En columna **Backlog** con prioridad decreciente

### 5. Fases 2 y 3
En columna **Icebox** (no urgente aún)

---

## 🔄 Paso 9: Workflow de Trabajo

### Flujo de una Issue:
```
📝 Backlog
  ↓ (cuando se decide trabajarla)
🎯 Ready
  ↓ (cuando empiezas a codear)
🚧 In Progress (asignar a ti, agregar label `in-progress`)
  ↓ (cuando creas PR)
👀 Review (agregar label `needs-review`, link PR)
  ↓ (cuando PR aprobado y mergeado)
✅ Done (cerrar issue, mover a Done)
```

### Mover Issues:
- Drag & drop entre columnas
- O usar comandos en PR:
  ```
  Closes #12 (US-101)
  ```

### Automatizaciones recomendadas:
- **Issue creado** → Backlog
- **PR abierto con "Closes #X"** → Move #X a Review
- **PR mergeado** → Move issue a Done y cerrar

---

## 📈 Paso 10: Reportes y Métricas

### Burndown Chart (opcional con GitHub Projects Beta)
1. Click **"⋮"** → **"Insights"**
2. Ver progreso de milestone
3. Story Points completados vs. restantes

### Velocidad del Equipo
- Trackear Story Points completados por semana
- Promedio de 2-3 semanas = velocidad estimada
- Ajustar planning de sprints según velocidad real

### Ejemplo:
```
Semana 1: 5 SP completados
Semana 2: 7 SP completados
Semana 3: 6 SP completados
→ Velocidad promedio: 6 SP/semana
→ Fase 1 (44 SP) = ~7 semanas
```

---

## 🎯 Checklist de Setup Completo

- [ ] Project "Sitecel v2 Development" creado
- [ ] 6 columnas del Kanban configuradas
- [ ] Labels creados (fases, épicas, tipos, prioridades)
- [ ] 4 Milestones creados (Fases 0-3)
- [ ] Custom fields agregados (Story Points, Fase, Epic)
- [ ] Issues de Fase 0 creadas y marcadas Done
- [ ] Primeras 3 issues de Fase 1 en columna Ready
- [ ] Resto de issues de Fase 1 en Backlog
- [ ] Issues de Fases 2-3 en Icebox
- [ ] 4 vistas configuradas (Por Fase, Kanban, Sprint, Por Persona)
- [ ] README y ROADMAP en el repo

---

## 💡 Tips de Uso

### Para planear un Sprint:
1. Ir a vista "Por Fase"
2. Seleccionar 5-7 issues de Backlog (según tu velocidad)
3. Moverlas a "Ready"
4. Asignarlas a ti mismo
5. Ordenar por prioridad (drag & drop)

### Para track progreso diario:
1. Abrir vista "Kanban"
2. Mover issues según avances
3. Comentar en issues con updates
4. Crear PRs linkendo issues: `git commit -m "feat: add schema design (US-101)"`

### Para cerrar un Sprint:
1. Mover issues completadas a Done
2. Actualizar Story Points en campo custom
3. Mover issues no completadas de vuelta a Backlog o Ready
4. Hacer retrospectiva (agregar comentario en milestone)

---

## 📚 Recursos

- [GitHub Projects Docs](https://docs.github.com/en/issues/planning-and-tracking-with-projects)
- [Agile Board Best Practices](https://www.atlassian.com/agile/kanban/boards)
- [Writing Good User Stories](https://www.mountaingoatsoftware.com/agile/user-stories)

---

**Última actualización:** Diciembre 2025  
**Owner:** Pedro Araujo Quintero (@paraujoq)
