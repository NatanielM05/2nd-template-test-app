# Projekt Roadmap

Die Roadmap beschreibt die Entwicklung in **Phasen**.
Jede Phase umfasst abgeschlossene Arbeitspakete (Features, Integrationen, Infrastruktur).
Eine Phase ist abgeschlossen, wenn **alle Punkte** erledigt und getestet sind.

---

## Pflegehinweise für KI-Agents

- Phasen-Status: `open` | `in-progress` | `closed`.
- Phasen **nicht löschen**, nur den Status ändern.
- Einzelne Tasks in einer Phase:
  - ✅ markieren = erledigt (mit Datum, z. B. [2025-10-07]).
  - ❌ markieren = verworfen (mit Datum).
- Änderungen **immer chronologisch** dokumentieren.
- Verweise auf ADRs ergänzen, falls eine Entscheidung betroffen ist.
- Roadmap **nicht mit Business-Logik füllen** → nur Struktur + Fortschritt.

---

## Phase 0 – Bootstrap – closed
- ✅ [2025-10-07] Initiales Monorepo eingerichtet
- ✅ [2025-10-07] CI-Basis erstellt

---

## Phase 1 – ToDo-App Implementation – in-progress

### 1.1 API-Design (Contract-First)
- ✅ [2025-10-07] OpenAPI Schema für Tasks erweitern (Task, CreateTaskRequest, UpdateTaskRequest)
- ✅ [2025-10-07] Endpoints definieren (GET /tasks, POST /tasks, PUT /tasks/:id, DELETE /tasks/:id)
- ✅ [2025-10-07] Validierung (title, description, dueDate, status)
- ✅ [2025-10-07] OpenAPI-Spec validieren

### 1.2 Backend Implementation
- ✅ [2025-10-07] Database Schema erweitern (tasks Collection)
- ✅ [2025-10-07] Task Repository implementieren (CRUD-Operationen)
- ✅ [2025-10-07] Task Service implementieren (Business-Logik)
- ✅ [2025-10-07] Task Handlers implementieren (HTTP-Endpoints)
- [ ] Backend Tests schreiben

### 1.3 Frontend Implementation
- ✅ [2025-10-07] Vite Config + TypeScript Setup
- ✅ [2025-10-07] Tailwind CSS Setup
- ✅ [2025-10-07] API-Client Setup (Axios + Interceptors)
- ✅ [2025-10-07] TanStack Query Setup
- ✅ [2025-10-07] Task Hooks (useTasks, useCreateTask, useUpdateTask, useDeleteTask)
- ✅ [2025-10-07] Common Components (Button, Input, Card, Checkbox)
- ✅ [2025-10-07] Task Components (TaskList, TaskForm, TaskItem, TaskFilters)
- ✅ [2025-10-07] Pages (TaskPage)
- ✅ [2025-10-07] Router Setup (React Router)
- ✅ [2025-10-07] Styling (minimalistisch, clean)
- [ ] Frontend Tests schreiben

### 1.4 Optional Features (implementiert)
- ✅ [2025-10-07] Kategorien/Tags System
- ✅ [2025-10-07] Suchfeld/Filter-Funktion
- [ ] LocalStorage Backup
- [ ] Dark Mode Toggle

### 1.5 Integration & Testing
- [ ] End-to-End Testing
- [ ] Manuelle Testing-Checkliste
- [ ] `pnpm install` Test
- [ ] `pnpm dev` Test (alle Services starten)

### 1.6 Dokumentation
- ✅ [2025-10-07] WORKLOG.md aktualisieren
- ✅ [2025-10-07] README.md erweitern (App-Beschreibung)
- [ ] ADR erstellen (falls Architektur-Entscheidungen)
