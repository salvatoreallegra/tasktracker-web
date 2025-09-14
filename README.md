# TaskTracker Web (React)

A minimal React + TypeScript frontend for the TaskTracker API. It lets you **register**, **log in**, and **manage projects & tasks**. Routes to data pages are **protected** so you don’t hit 401s before logging in.

## Stack

- Vite + React + TypeScript
- React Router
- Axios (single shared client with Bearer token header)
- Tailwind CSS v4 (via `@tailwindcss/postcss`)

---

## Quick Start

1. **Prereqs**

- Node 20+ (or 18+ LTS)
- TaskTracker API running locally (default used here): `http://localhost:7034`

2. **Install**

```bash
npm i
```

Copy .env.example → .env and set:

VITE_API_BASE=http://localhost:7034

3. **run**
   npm run dev
