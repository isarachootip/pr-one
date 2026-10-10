# PR One — company website + event backend (Next.js)

Dark "tech event" redesign of pr-one.com with a real backend for events and registrations.

## What's inside

**Public site — 6 languages** (`/th`, `/en`, `/zh`, `/vi`, `/de`, `/ar`)
- Every visitor-facing string is translated (`src/i18n/dictionaries/*.ts`). Arabic is laid out right-to-left.
- `/` sends visitors to their browser language (Thai by default) and remembers the last language they picked.
- **Landing page** features the latest event: the featured or next upcoming event with a live countdown and "Reserve my seat", or — when nothing is scheduled — the most recent past event with its photo.
- Upcoming events with type filter, `/[lang]/events` (upcoming + past), `/[lang]/events/<slug>` detail page with registration form (PDPA consent, duplicate check, seat limit).
- Roadmap of past events by year, services, 66 client logos, team, LINE / socials, newsletter, proposal request form.

**Admin — `/admin`** (login with `ADMIN_USER` / `ADMIN_PASSWORD`)
- Dashboard: upcoming events, registration counts, new proposal requests, subscribers.
- Events: create / edit / delete, title + summary + venue + audience + description **per language** (empty languages fall back to English), date & time (Bangkok), type, format, client, seat limit, registration open/closed, draft/published, "feature on home page", cover photo upload.
- Registrations per event, proposal requests inbox (mark handled), subscribers — all downloadable as CSV (opens in Excel with Thai text).

**Data** — SQLite file in `DATA_DIR` (`pr-one.sqlite`) plus uploaded covers in `DATA_DIR/uploads`. On first start it is filled with the 25 past events from pr-one.com.

## Run locally
```bash
npm install
cp .env.example .env.local   # set ADMIN_PASSWORD
npm run dev                  # http://localhost:3000  → admin at /admin
```
Requires Node 22.13+ (uses the built-in `node:sqlite`, no database server needed).

## Deploy on Coolify
1. New application from this GitHub repo, build pack **Dockerfile**, port **3000**.
2. Environment variables: `ADMIN_USER`, `ADMIN_PASSWORD`, `ADMIN_SECRET` (long random string), `SITE_URL` (your domain).
3. **Persistent storage**: mount a volume at `/app/data` — it holds the database and uploaded photos. Without it, every redeploy wipes events and registrations.
4. Deploy, open `/admin`, log in and create your first upcoming event.

Back up `/app/data/pr-one.sqlite` regularly (it is one file).

## Where to edit
| What | File |
|---|---|
| Website text in each language | `src/i18n/dictionaries/<lang>.ts` |
| Team, client logos, contacts, address, socials / LINE ID | `src/data/site.ts` |
| Events | `/admin` (no code needed) |
| Images (work photos, team, logos) | `public/img` |
| Colors and fonts | `src/app/globals.css` |
