# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**LinkedEye-FinSpot** is an enterprise-grade IT Service Management (ITSM) and Network Monitoring platform. It enables organizations to manage Incidents, Changes, Problems, Assets, and Network Topology in real-time.

## Tech Stack

### Frontend (`client/`)

- React 19 + Vite 7, React Router DOM v7
- Axios installed but pages currently use `fetch()` directly against hardcoded `http://localhost:5001`
- Chart.js / react-chartjs-2 for metrics; plain CSS with CSS Variables for styling

### Backend (`server/`)

- Node.js (CommonJS), Express.js v5, port **5001** (not 5000)
- Prisma v7 + `@prisma/client` installed but **not yet wired up** — all data is currently mock/hardcoded in `server/src/routes/api.js`
- JWT auth stub: login accepts `admin@finspot.com` / `Admin@123` and returns a hardcoded mock token

## Commands

### Backend (run from `server/`)

```bash
npm install
npm run dev        # nodemon hot-reload on port 5001
node src/app.js    # plain start
npx prisma generate
npx prisma migrate dev
npx prisma studio
```

### Frontend (run from `client/`)

```bash
npm install
npm run dev        # Vite dev server on port 5173
npm run build
npm run lint
```

## Architecture & Current State

### What exists vs. what is planned


The folder structure in `PROJECT_PLAN.md` describes the **target** architecture. The actual implementation is early-stage:

- **`server/src/`** contains only `app.js` and `routes/api.js`. The planned `controllers/`, `middleware/`, `models/`, `config/`, and `utils/` subdirectories do not exist yet.
- **`server/prisma/schema.prisma`** does not exist yet. Prisma has not been initialised.
- **All API responses are mock data** defined inline in `routes/api.js`. Active endpoints: `POST /api/auth/login`, `GET /api/dashboard/stats`, `GET /api/incidents`.
- **`client/src/`** has `Login`, `Dashboard`, `IncidentList`, `IncidentDetail`, `ChangeList` pages and `DashboardLayout`. Most pages that appear in the sidebar nav (`/problems`, `/network`, `/analytics`, etc.) have no corresponding page component yet and will hit the catch-all "Page Not Found" route.

### Frontend data flow

Pages fetch from `http://localhost:5001/api/…` and fall back to hardcoded dummy data on failure, so the UI works even without the backend running. Auth state is checked via `localStorage.getItem('token')` in `App.jsx` but routes are not actually guarded — the `isAuthenticated` variable is computed but unused.

### `client 2/` directory

A near-empty Vite scaffold (only `App.jsx` / `main.jsx` present). It is a stale parallel copy; work in `client/` only.

## Design References

- Root-level `linkedeye-*.html` files are static HTML mockups — the authoritative visual reference for implementing new pages.
- `old/` contains legacy code and design docs; do not modify.
- `PROJECT_PLAN.md` contains the target DB schema (Users, Incidents, Assets) and Mermaid diagrams for auth flow and incident lifecycle.

## Demo Credentials

- **Email**: `admin@finspot.com`
- **Password**: `Admin@123`
