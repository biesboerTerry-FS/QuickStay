# QuickStay Deployment Checklist

This guide covers deploying the QuickStay stack (Vite client + Express server + MongoDB) to Vercel.

## Architecture

| Service | Path | Vercel Project | Runtime |
|---------|------|----------------|---------|
| Client | `/client` | `quickstay-web` | Vercel Static |
| API | `/server` | `quickstay-api` | Vercel Node.js Serverless |
| Database | MongoDB Atlas | N/A | MongoDB cluster |

---

## 1. Pre-deployment verification

Run these locally before pushing:

```bash
# Client
npm --prefix client run lint
npm --prefix client run test
npm --prefix client run build

# Server
npm --prefix server install
npm --prefix server start
```

- [ ] `client` build passes with no errors.
- [ ] `client` unit tests pass (22 tests).
- [ ] `server` starts and the root route returns `API is working, yo`.
- [ ] No secrets are committed to Git.
- [ ] `.env` files are listed in `.gitignore`.

---

## 2. Environment variables

### Client (`client/.env` → Vercel Project → Settings → Environment Variables)

| Variable | Example | Purpose |
|----------|---------|---------|
| `VITE_CLERK_PUBLISHABLE_KEY` | `pk_test_...` | Clerk frontend authentication |
| `VITE_API_BASE_URL` | `https://quickstay-api.vercel.app` | Backend API URL |

### Server (`server/.env` → Vercel Project → Settings → Environment Variables)

| Variable | Example | Purpose |
|----------|---------|---------|
| `MONGODB_URI` | `mongodb+srv://user:pass@cluster.mongodb.net/quickstay?retryWrites=true&w=majority` | MongoDB connection |
| `CLERK_PUBLISHABLE_KEY` | `pk_test_...` | Clerk public key |
| `CLERK_SECRET_KEY` | `sk_test_...` | Clerk secret key |
| `CLERK_WEBHOOK_SECRET` | `whsec_...` | Clerk webhook verification |
| `CLOUDINARY_CLOUD_NAME` | `your-cloud` | Image uploads |
| `CLOUDINARY_API_KEY` | `1234567890` | Image uploads |
| `CLOUDINARY_API_SECRET` | `secret` | Image uploads |
| `CORS_ORIGIN` | `https://quickstay-web.vercel.app` | Allowed frontend origin |

- [ ] All variables are copied into Vercel dashboard for `Production`, `Preview`, and `Development`.
- [ ] `VITE_` prefix is used for client variables so Vite exposes them at build time.

---

## 3. MongoDB Atlas setup

1. Create or open your Atlas cluster.
2. Create a database user with read/write privileges.
3. Whitelist Vercel IP ranges **or** set `0.0.0.0/0` for development.
4. Copy the SRV connection string into `MONGODB_URI`.
5. Ensure the hostname resolves (the previous `quickstay.6m37prp.mongodb.net` host did not resolve).

- [ ] Atlas cluster is reachable from Vercel.
- [ ] Connection string uses the correct database name.

---

## 4. Clerk setup

1. In Clerk dashboard, note the **Publishable key** and **Secret key**.
2. Add `https://quickstay-web.vercel.app` to Clerk's allowed origins/redirect URLs.
3. Configure the webhook endpoint in Clerk:
   - URL: `https://quickstay-api.vercel.app/api/clerk`
   - Events: `user.created`, `user.updated`, `user.deleted`
4. Copy the webhook signing secret to `CLERK_WEBHOOK_SECRET`.

- [ ] Frontend Clerk key is set.
- [ ] Backend Clerk middleware has access to secret key.
- [ ] Webhook URL is configured and the signing secret is saved.

---

## 5. Deploy the API

1. Create a new Vercel project and import the repo.
2. Set the **Root Directory** to `server`.
3. Ensure the **Build Command** is empty (Vercel uses `vercel.json` + `package.json`).
4. Add all server environment variables.
5. Deploy.

- [ ] `server/vercel.json` exists and points `@vercel/node` at `server.js`.
- [ ] `server.js` exports a serverless handler and conditionally starts the local listener.
- [ ] CORS is restricted to the production frontend origin via `CORS_ORIGIN`.
- [ ] API base URL is noted for the client.

### Serverless compatibility note

`server.js` now exports a Vercel-compatible handler while still starting `app.listen(...)` for local development.

---

## 6. Deploy the web client

1. Create a new Vercel project and import the repo.
2. Set the **Root Directory** to `client`.
3. Add client environment variables.
4. Deploy.

- [ ] `client/vercel.json` has the SPA rewrite: `{"source": "/(.*)", "destination": "/"}`.
- [ ] `VITE_API_BASE_URL` points to the deployed API.
- [ ] `VITE_CLERK_PUBLISHABLE_KEY` is set.

---

## 7. Custom domain (optional)

1. Add your domain in Vercel dashboard for both projects.
2. Update DNS records as instructed.
3. Update Clerk allowed origins, CORS, and any hardcoded URLs.

- [ ] Frontend domain configured.
- [ ] API domain configured.
- [ ] Clerk redirect URLs updated.
- [ ] `CORS_ORIGIN` server variable updated.

---

## 8. Post-deployment smoke tests

### Web client

- [ ] Homepage loads without console errors.
- [ ] Dark mode toggle works.
- [ ] Navigation links work and scroll to top.
- [ ] Search/filter on `/rooms` returns results.
- [ ] Room details page loads.
- [ ] Booking flow works end-to-end (test card).
- [ ] Footer newsletter subscribes successfully.
- [ ] Dashboard link is visible in footer.
- [ ] 404 page works for unknown routes.

### API

- [ ] `GET https://quickstay-api.vercel.app/` returns the status message.
- [ ] `POST /api/clerk` accepts Clerk webhooks (check Vercel function logs).
- [ ] Database connection logs show success.

### Security / performance

- [ ] Vercel Analytics shows traffic.
- [ ] Vercel Speed Insights is receiving data.
- [ ] `robots.txt` and `sitemap.xml` are accessible.
- [ ] No API secrets leak in the browser bundle.

---

## 9. Mobile app (Expo)

The `mobile/` Expo app is not deployed to Vercel. To ship it:

1. Configure `EXPO_PUBLIC_WEB_URL` in `mobile/.env` to point at the deployed web/API domain.
2. Build with EAS: `npx eas build --platform ios` / `npx eas build --platform android`.
3. Submit to App Store / Play Store.

- [ ] `EXPO_PUBLIC_WEB_URL` points to production API.
- [ ] EAS project is configured.

---

## 10. Common issues

| Symptom | Fix |
|---------|-----|
| `querySrv ENOTFOUND` | Check Atlas hostname and network access whitelist. |
| Client build fails | Ensure `VITE_CLERK_PUBLISHABLE_KEY` is set. |
| API 404 on refresh | `client/vercel.json` SPA rewrite must exist. |
| CORS errors | Update `CORS_ORIGIN` and ensure server uses it. |
| Clerk webhook fails | Verify `CLERK_WEBHOOK_SECRET` and endpoint URL. |
| Images don't upload | Cloudinary credentials missing or unsigned uploads not enabled. |

---

## 11. Rollback plan

- [ ] Vercel deployments keep previous builds; you can instantly promote the last working deployment.
- [ ] MongoDB backups are enabled in Atlas.
- [ ] Clerk users/webhook config remain unchanged during a rollback.

---

Last updated: 2026-11-12
