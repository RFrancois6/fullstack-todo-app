# Fullstack Todo App — Node.js / React / Vue.js

> A personal exploration project to deepen my understanding of Node.js (Express), React, and Vue.js on a shared backend.

🚧 **Status: in active development** — ongoing iterations.

---

## Goal

Build a single REST backend (Node.js + Express + SQLite, JWT auth) consumed by **two different frontends** (React, then Vue.js) implementing the same todo management feature.

The goal is educational: compare React (hooks, props/state, Context) and Vue (Composition API, reactivity, directives) in depth on the exact same problem with an identical backend.

## Architecture

```
┌─────────────────────────────────────────┐
│  React Frontend  │  Vue Frontend        │
│  (port 3000)     │  (port 3001)         │
└────────┬─────────┴──────────┬───────────┘
         │      REST API      │
         ▼                    ▼
┌─────────────────────────────────────────┐
│           Node.js / Express             │
│              (port 5000)                │
│  - JWT Authentication                   │
│  - Todos CRUD                           │
│  - SQLite (better-sqlite3)              │
└─────────────────────────────────────────┘
```

## Tech stack

- **Backend**: Node.js, Express, SQLite (better-sqlite3), JWT, bcrypt
- **React frontend**: Vite, React 18, React Router, Context API
- **Vue frontend**: Vite, Vue 3 (Composition API), Vue Router

## Progress

- [x] Backend — Auth (register / login) with JWT and bcrypt
- [x] Backend — Route protection middleware
- [x] Backend — Protected Todos CRUD (`GET`, `POST`, `PATCH`, `DELETE`)
- [x] React frontend — AuthContext + Login/Register
- [x] React frontend — Todos page with optimistic updates
- [x] Vue frontend — same features, rewritten
- [ ] New features for both frontend

## Run locally

```bash
# Backend
cd backend
npm install
npm run dev

# Vite frontend (in another terminal)
cd frontend_vite
npm install
npm run dev

# Vue frontend (in one more terminal)
cd frontend_vue
npm install
npm run dev
```

## Notes

This repo also doubles as a learning journal. Commits are intentionally granular (one commit = one concept learned or one step completed) so I can come back to them as a reference.
