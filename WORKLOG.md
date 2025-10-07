# Worklog

## Implemented:

### 2025-10-07 - ToDo-App Complete Implementation
- **OpenAPI Specification**: Vollständige API-Spezifikation für Tasks (GET, POST, PUT, DELETE)
  - Task Schema mit title, description, status, dueDate, category
  - Filtering (status, category, search)
  - Sorting (createdAt, dueDate, title)
  - Validation und Error Responses
- **Database (JSON-DB)**:
  - Vollständige Database-Implementierung mit lowdb
  - CRUD-Operationen für Tasks
  - Filtering und Sorting-Logik
  - Automatische Ordner-Erstellung
- **Backend API**:
  - Express.js Server mit TypeScript
  - Zod Validation für alle Requests
  - Error Handling Middleware
  - Health Check Endpoint
  - Tasks CRUD Endpoints mit Filtering/Sorting
- **Frontend (React + Vite)**:
  - Complete Vite + TypeScript + Tailwind CSS Setup
  - TanStack Query für Server State Management
  - React Router für Navigation
  - Wiederverwendbare UI-Components (Button, Input, Checkbox, Card)
  - Task-Components (TaskForm, TaskItem, TaskList, TaskFilters)
  - Responsive, minimalistisches Design
  - Deutsche Lokalisierung
  - Date Formatting mit date-fns
  - Optimistic Updates
- **Features**:
  - ✅ Aufgaben erstellen mit Titel, Beschreibung, Fälligkeitsdatum, Kategorie
  - ✅ Aufgaben als offen/erledigt markieren (Checkbox)
  - ✅ Aufgaben bearbeiten und löschen
  - ✅ Filtern nach Status (alle, offen, erledigt)
  - ✅ Suche in Titel und Beschreibung
  - ✅ Sortierung nach Erstellungsdatum, Fälligkeitsdatum, Titel
  - ✅ Statistik-Dashboard (Gesamt, Offen, Erledigt)
  - ✅ Expandierbare Aufgaben-Details
- **Documentation**:
  - ROADMAP.md mit allen Phasen und Tasks
  - .env.example mit allen benötigten Variablen

### 2025-10-07 - Template-Vervollständigung
- **Basis-Konfiguration**: pnpm-workspace.yaml, tsconfig.json, tsconfig.base.json, .gitignore erstellt
- **Linting & Formatting**: ESLint (flat config), Prettier-Konfiguration hinzugefügt
- **Guardrails**: guardrails.json mit Sicherheits-Patterns, verbotenen Mustern und Required-Commands
- **Package-Struktur**: package.json + tsconfig.json für alle 5 Packages (api, frontend, infra, openapi, routes-portal)
- **Build-Konfiguration**: Vite für Frontend, Next.js für routes-portal, CDK für Infra
- **KI-Dokumentation**: AGENT.md mit detaillierten Instruktionen für KI-Assistenten
- **Einstiegspunkt**: README.md mit Quick-Start, Architektur-Übersicht, Workflow
- **OpenAPI-Spezifikation**: openapi.yaml mit Beispiel-Endpoints (Health, Users CRUD)
- **Package-Designs**: DESIGN.md für jedes Package mit Architektur, Conventions, Testing
- **Validierung**: VALIDATION.md mit automatischen und manuellen Checks, Deployment-Checkliste

### Früher
- Created monorepo skeleton (pnpm, ESLint/Prettier, tsconfig)
- Documented Azure DevOps subtree workflow for `packages/infra`
- Aligned `packages/frontend` and `packages/infra` with workspace tooling
- Installed workspace dependencies via pnpm
- Adopted the frontend-derived OpenAPI spec and regenerated shared types
- Scaffolded `@enercept/api` Lambda handlers
- Added `@enercept/openapi` package with Swagger UI doc builder
- Provisioned temporary public OpenAPI documentation stack (S3 + CloudFront)
- Added workspace build/deploy orchestration scripts
- Introduced docs-only CDK entrypoint
- Centralised OpenAPI-derived typings in `@enercept/shared`
- Created `@enercept/auth-portal` Next.js package with Cognito-based login
- Implemented `AuthPortalStack` CDK construct
- All protected routes secured via API Gateway Cognito Authorizer
- Configured infrastructure to remain in eu-central-1 for GDPR compliance

## Next:
- Optional: Dark Mode implementieren
- Optional: LocalStorage Backup implementieren
- Optional: Kategorien-Management verbessern
- Optional: Tests schreiben (Vitest)
