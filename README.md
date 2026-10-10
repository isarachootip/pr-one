# PR One — company website (Next.js)

Built from the **PR One Website Redesign** design (dark "tech event" look, lime accent).

## What's inside
- **Home page**: hero in 6 languages (EN / ไทย / 中文 / VI / DE / عربي), next-event card with live countdown, stats, trusted-by, upcoming events with type filter, 2020–2026 roadmap by year, services and industries, clients, LINE and social links, newsletter, contacts and a "request a proposal" form.
- **Event registration**: `/events/<slug>` with a form (PDPA consent) → saved to `data/registrations.json`.
- **Proposal requests** (`/api/contact`) and **newsletter** (`/api/subscribe`) → saved as JSON.
- **Admin**: `/admin` (basic auth) shows all submissions with CSV download (opens in Excel with Thai text).

## Edit content
All text, events, roadmap, clients and contacts live in **`src/data/site.ts`**.
Anything in `[brackets]` is a placeholder to fill in. Set `startsAt` on an event
(e.g. `"2026-11-20T09:00:00+07:00"`) to start the countdown and the "+ Calendar" button.

## Run locally
```bash
npm install
cp .env.example .env.local   # set ADMIN_PASSWORD
npm run dev                  # http://localhost:3000
```

## Deploy on Coolify
1. Push this folder to Git and create a new Coolify app from the repo.
2. Build pack: **Dockerfile** (included). Port **3000**.
3. Environment variables: `ADMIN_USER`, `ADMIN_PASSWORD`, `DATA_DIR=/app/data`.
4. Add a **persistent storage** volume mounted at `/app/data` so submissions survive redeploys.
