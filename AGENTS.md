# AGENTS.md

This file provides guidance to Codex (Codex.ai/code) when working with this codebase.

## Project Overview

**LinkedEye-FinSpot** is an enterprise-grade IT Service Management (ITSM) and Network Monitoring platform built as a full-stack application. It enables organizations to manage Incidents, Changes, Problems, Assets, and Network Topology in real-time.

## Tech Stack

### Frontend (client/)
- **Framework**: React 19 with Vite 7
- **Routing**: React Router DOM v7
- **HTTP Client**: Axios
- **Charting**: Chart.js with react-chartjs-2
- **Styling**: Standard CSS with CSS Variables

### Backend (server/)
- **Runtime**: Node.js (CommonJS modules)
- **Framework**: Express.js v5
- **Database ORM**: Prisma v7
- **Database**: PostgreSQL (SQLite for dev)
- **Authentication**: JWT-based

## Project Structure

```
linkedeye-finspot/
├── client/                 # React Frontend
│   └── src/
│       ├── components/     # Reusable UI components
│       ├── layouts/        # Page layouts (DashboardLayout, AuthLayout)
│       ├── pages/          # Route pages
│       ├── services/       # API integration layer
│       └── assets/         # Static assets
├── server/                 # Express Backend
│   └── src/
│       ├── app.js          # Application entry point
│       ├── config/         # Database & environment config
│       ├── controllers/    # Request handlers
│       ├── middleware/     # Auth & error handling middleware
│       ├── models/         # Data models
│       ├── routes/         # API route definitions
│       └── utils/          # Helper functions
└── *.html                  # Static HTML mockups (reference only)
```

## Common Commands

### Backend (from /server)
```bash
npm install              # Install dependencies
node src/app.js          # Start server (runs on port 5000)
npx prisma generate      # Generate Prisma client
npx prisma migrate dev   # Run database migrations
npx prisma studio        # Open Prisma database GUI
```

### Frontend (from /client)
```bash
npm install              # Install dependencies
npm run dev              # Start dev server (runs on port 5173)
npm run build            # Production build
npm run lint             # Run ESLint
npm run preview          # Preview production build
```

## API Endpoints

- Base URL: `http://localhost:5000`
- Auth endpoint: `POST /api/auth/login`

## Demo Credentials

- **Email**: admin@finspot.com
- **Password**: Admin@123

## Key Features

- **Dashboard**: Real-time stats, system health, and activity timelines
- **Incident Management**: Tracking, filtering, and resolving IT incidents
- **Change Management**: CAB workflows and approval chains
- **Network Topology**: Infrastructure visualization
- **Auto-Remediation**: Integration with automation tools

## Development Notes

- The root directory contains static HTML mockups (`linkedeye-*.html`) used as design references
- The `/old` directory contains legacy code (do not modify)
- Frontend connects to backend via Axios (configure base URL in services)
- Prisma schema is located at `server/prisma/schema.prisma`
