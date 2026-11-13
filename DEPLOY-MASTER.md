# QuickStay Deployment Master Checklist

Use this as the single source of truth for deploying to Vercel.

## Suggestions before deploying

1. **Environment variables**: create `.env.example` files for both projects so you don't lose track of required keys. *(Done)*
2. **Backend API**: the server currently only syncs Clerk users. If you want real bookings/rooms stored in MongoDB, add routes for rooms, bookings, and payments before going live.
3. **Image uploads**: Cloudinary credentials exist but aren't wired up. Decide whether to enable uploads or keep static/demo images for the first release.
4. **Error tracking**: add Sentry, LogRocket, or Vercel Analytics alerts to catch production errors.
5. **Rate limiting**: install `express-rate-limit` on the API before exposing public endpoints.
6. **CI/CD**: connect GitHub so Vercel auto-deploys preview branches.
7. **Domain**: purchase/configure a custom domain for both web and API projects.
8. **Backups**: enable MongoDB Atlas automated backups.
9. **Webhook testing**: after deploying the API, use Clerk's "Send test event" to verify `/api/clerk`.
10. **Mobile app**: update `EXPO_PUBLIC_WEB_URL` in `mobile/.env` to the production API URL before building with EAS.

---

## Phase 1 — Repository hygiene

| # | Task | Status |
|---|------|--------|
| 1 | All secrets removed from Git | ☐ |
| 2 | `.env` files are in `.gitignore` | ☐ |
| 3 | `client/.env.example` filled out | ✅ |
| 4 | `server/.env.example` filled out | ✅ |
| 5 | `client` builds without errors | ☐ |
| 6 | `client` tests pass | ☐ |
| 7 | `server` starts without syntax errors | ☐ |

---

## Phase 2 — MongoDB Atlas

| # | Task | Status |
|---|------|--------|
| 1 | Cluster created | ☐ |
| 2 | Database user created | ☐ |
| 3 | Network access whitelist set (Vercel IPs or `0.0.0.0/0`) | ☐ |
| 4 | Connection string copied to `MONGODB_URI` | ☐ |
| 5 | Backups enabled | ☐ |

---

## Phase 3 — Clerk

| # | Task | Status |
|---|------|--------|
| 1 | Publishable key copied | ☐ |
| 2 | Secret key copied | ☐ |
| 3 | Production frontend URL added to allowed origins | ☐ |
| 4 | Production redirect URLs configured | ☐ |
| 5 | Webhook endpoint created: `https://<api>.vercel.app/api/clerk` | ☐ |
| 6 | Webhook signing secret copied | ☐ |
| 7 | Subscribed to `user.created`, `user.updated`, `user.deleted` | ☐ |

---

## Phase 4 — Deploy API

Create a Vercel project with root directory `server`.

| # | Task | Value / Status |
|---|------|----------------|
| 1 | Root directory | `server` |
| 2 | Framework preset | Other |
| 3 | Environment variables added | ☐ |
| 4 | Deploy successful | ☐ |
| 5 | `GET /` returns status message | ☐ |
| 6 | `GET /health` returns JSON | ☐ |
| 7 | Webhook test event succeeds | ☐ |

---

## Phase 5 — Deploy Web Client

Create a Vercel project with root directory `client`.

| # | Task | Value / Status |
|---|------|----------------|
| 1 | Root directory | `client` |
| 2 | Framework preset | Vite |
| 3 | Build command | `npm run build` |
| 4 | Output directory | `dist` |
| 5 | `VITE_API_BASE_URL` points to deployed API | ☐ |
| 6 | `VITE_CLERK_PUBLISHABLE_KEY` set | ☐ |
| 7 | Deploy successful | ☐ |

---

## Phase 6 — Smoke tests

| # | Test | Expected | Status |
|---|------|----------|--------|
| 1 | Load homepage | Renders hero, search, no console errors | ☐ |
| 2 | Dark mode toggle | Switches theme | ☐ |
| 3 | Click logo on homepage | Smooth scroll to top | ☐ |
| 4 | Search hotels | Filtered results appear | ☐ |
| 5 | Room details | Availability check works | ☐ |
| 6 | Booking flow | Test card payment succeeds | ☐ |
| 7 | My bookings | Booking appears, can cancel | ☐ |
| 8 | Saved rooms | Heart toggle persists | ☐ |
| 9 | Newsletter footer | Success toast | ☐ |
| 10 | Footer Dashboard link | Navigates to `/owner` | ☐ |
| 11 | 404 page | Unknown route shows 404 | ☐ |
| 12 | `robots.txt` | Accessible at `/robots.txt` | ☐ |
| 13 | `sitemap.xml` | Accessible at `/sitemap.xml` | ☐ |
| 14 | Analytics / Speed Insights | Receiving data in Vercel dashboard | ☐ |

---

## Phase 7 — Go-live extras

| # | Task | Status |
|---|------|--------|
| 1 | Custom domain configured | ☐ |
| 2 | API domain updated in `CORS_ORIGIN` | ☐ |
| 3 | Clerk origins/redirects updated to custom domain | ☐ |
| 4 | Mobile app `EXPO_PUBLIC_WEB_URL` updated | ☐ |
| 5 | Production smoke test from a clean browser/incognito | ☐ |
| 6 | Rollback plan documented | ✅ |

---

## Rollback

| # | Step | How |
|---|------|-----|
| 1 | Revert client | Vercel dashboard → Promote previous deployment |
| 2 | Revert API | Vercel dashboard → Promote previous deployment |
| 3 | Database | Restore from Atlas backup |
