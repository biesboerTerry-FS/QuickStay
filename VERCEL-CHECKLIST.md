# Vercel Deployment Checklist

## Server fixes applied

- [x] `server/server.js` exports a Vercel serverless handler.
- [x] Local dev still works via conditional `app.listen(...)`.
- [x] CORS restricted to `CORS_ORIGIN` (defaults to local dev).
- [x] DB connection is lazy and won't crash serverless cold starts.
- [x] `server/config/db.js` handles MongoDB URIs that already include a DB name.
- [x] `server/vercel.json` no longer references a non-existent `dist/` folder.
- [x] Clerk webhook handler validates secret, uses correct IDs, and returns proper status codes.
- [x] `User` model fields (`email`, `image`) are optional to avoid webhook failures.

---

## Pre-deploy checks

| # | Task | Command / Action |
|---|------|------------------|
| 1 | Install client deps | `npm --prefix client install` |
| 2 | Lint client | `npm --prefix client run lint` |
| 3 | Test client | `npm --prefix client run test` |
| 4 | Build client | `npm --prefix client run build` |
| 5 | Install server deps | `npm --prefix server install` |
| 6 | Syntax-check server | `node --check server/server.js` |

---

## Vercel project: API (`server`)

| # | Task | Value |
|---|------|-------|
| 1 | Root directory | `server` |
| 2 | Framework preset | Other |
| 3 | Build command | *(leave empty)* |
| 4 | Output directory | *(leave empty)* |
| 5 | Install command | `npm install` |

### API environment variables

| Variable | Required | Notes |
|----------|----------|-------|
| `MONGODB_URI` | Yes | Atlas SRV string |
| `CLERK_PUBLISHABLE_KEY` | Yes | From Clerk dashboard |
| `CLERK_SECRET_KEY` | Yes | From Clerk dashboard |
| `CLERK_WEBHOOK_SECRET` | Yes | From Clerk webhook settings |
| `CORS_ORIGIN` | Yes | Production frontend URL |
| `CLOUDINARY_CLOUD_NAME` | Optional | For image uploads |
| `CLOUDINARY_API_KEY` | Optional | For image uploads |
| `CLOUDINARY_API_SECRET` | Optional | For image uploads |

---

## Vercel project: Web (`client`)

| # | Task | Value |
|---|------|-------|
| 1 | Root directory | `client` |
| 2 | Framework preset | Vite |
| 3 | Build command | `npm run build` |
| 4 | Output directory | `dist` |
| 5 | Install command | `npm install` |

### Web environment variables

| Variable | Required | Notes |
|----------|----------|-------|
| `VITE_CLERK_PUBLISHABLE_KEY` | Yes | Same as `CLERK_PUBLISHABLE_KEY` |
| `VITE_API_BASE_URL` | Yes | Deployed API URL |

---

## Clerk configuration

| # | Task | Location |
|---|------|----------|
| 1 | Add production URL to allowed origins | Clerk → API Keys |
| 2 | Add redirect URLs | Clerk → Sessions / URLs |
| 3 | Create webhook endpoint | Clerk → Webhooks |
| 4 | Webhook URL | `https://<api-project>.vercel.app/api/clerk` |
| 5 | Subscribe to events | `user.created`, `user.updated`, `user.deleted` |

---

## MongoDB Atlas configuration

| # | Task | Notes |
|------|------|-------|
| 1 | Create cluster | M0 free tier is fine for demo |
| 2 | Create database user | Read/write privileges |
| 3 | Whitelist IPs | `0.0.0.0/0` for Vercel, or specific ranges |
| 4 | Copy connection string | Ensure hostname resolves |
| 5 | DB name | `quickstay` (appended automatically if not in URI) |

---

## Post-deploy verification

| # | Test | Expected result |
|---|------|-----------------|
| 1 | `GET /` on API | `API is working, yo` |
| 2 | `GET /health` on API | JSON status response |
| 3 | Load homepage | No console errors |
| 4 | Toggle dark mode | UI switches correctly |
| 5 | Click logo on homepage | Scrolls to top |
| 6 | Search hotels | Returns filtered rooms |
| 7 | Book a room | Test card payment succeeds |
| 8 | Newsletter subscribe | Shows success toast |
| 9 | Footer Dashboard link | Navigates to `/owner` |
| 10 | Unknown route | Shows 404 page |
| 11 | `robots.txt` | Accessible |
| 12 | `sitemap.xml` | Accessible |

---

## Rollback

| # | Task | How |
|---|------|-----|
| 1 | Revert client | Vercel dashboard → Promote previous deployment |
| 2 | Revert API | Vercel dashboard → Promote previous deployment |
| 3 | Database | Restore from Atlas backup |
