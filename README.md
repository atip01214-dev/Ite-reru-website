# ITE RERU Website — Monorepo

```
ite-reru-website/
├── frontend/   Next.js 16 (App Router) + Tailwind CSS v4
└── backend/    Express + Prisma + SQLite
```

## Quick Start

### 1. Install dependencies
```bash
npm run install:all
```

### 2. Setup backend database (first time)
```bash
npm run db:migrate     # creates dev.db
npm run db:seed        # seeds all content from original site.ts
```

### 3. Run both services
```bash
# Terminal 1 — backend (port 4000)
npm run dev:backend

# Terminal 2 — frontend (port 3000)
npm run dev:frontend
```

Open [http://localhost:3000](http://localhost:3000)

## Admin CMS
- URL: [http://localhost:3000/admin](http://localhost:3000/admin)
- Login: `admin` / `ite2026` (set in `backend/.env`)

## Environment Variables

### backend/.env
| Key | Default | Description |
|---|---|---|
| `DATABASE_URL` | `file:./dev.db` | SQLite DB path |
| `JWT_SECRET` | `ite-reru-super-secret...` | Sign JWT tokens |
| `ADMIN_USERNAME` | `admin` | Admin login |
| `ADMIN_PASSWORD` | `ite2026` | Admin password |
| `PORT` | `4000` | Backend port |
| `FRONTEND_URL` | `http://localhost:3000` | CORS origin |

### frontend/.env.local
| Key | Default |
|---|---|
| `NEXT_PUBLIC_API_URL` | `http://localhost:4000` |

## API Endpoints (backend)

| Method | Path | Auth | Description |
|---|---|---|---|
| POST | `/api/auth/login` | ❌ | Login, returns JWT |
| GET | `/api/hero` | ❌ | Hero banner data |
| PUT | `/api/hero` | ✅ | Update hero |
| GET | `/api/stats` | ❌ | Stats array |
| PUT | `/api/stats` | ✅ | Replace stats |
| GET | `/api/about` | ❌ | About data |
| PUT | `/api/about` | ✅ | Update about |
| GET | `/api/news` | ❌ | All news |
| POST | `/api/news` | ✅ | Create news |
| PUT | `/api/news/:id` | ✅ | Update news |
| DELETE | `/api/news/:id` | ✅ | Delete news |
| GET | `/api/faculty` | ❌ | All faculty |
| POST | `/api/faculty` | ✅ | Create |
| PUT | `/api/faculty/:id` | ✅ | Update |
| DELETE | `/api/faculty/:id` | ✅ | Delete |
| GET | `/api/curriculum/programs` | ❌ | Programs |
| GET | `/api/curriculum/courses` | ❌ | Courses |
| GET | `/api/curriculum/careers` | ❌ | Careers |
| GET | `/api/facilities` | ❌ | Facilities |
| GET | `/api/contact` | ❌ | Contact info |
| GET | `/api/partners` | ❌ | Partners |
| POST | `/api/upload/image` | ✅ | Upload image |
