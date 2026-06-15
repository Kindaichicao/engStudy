# TechEnglish — IT + Business English study site

Two ways to study:

1. **IT English lessons & articles** (`index.html`) — vocabulary for developers grouped by topic.
2. **6-month Business English speaking plan** (`business-english.html`) — 24 weekly lessons + a daily-phrases reference + an **AI Coach** that role-plays workplace scenarios.

Progress (lesson status, scores, streaks) is saved in browser `localStorage` so you can continue any time.

---

## Quick start

### Option A — pure static (no AI Free-Chat)

Just open `index.html` in a browser, or:

```bash
python3 -m http.server 8765
# then visit http://localhost:8765
```

The AI Coach **Scripted mode** works fully offline. The **AI Free-Chat mode** requires a key — either configured server-side (Option B) or pasted in the sidebar.

### Option B — Node server with AI key in `.env` (recommended)

```bash
# 1. Install deps
npm install

# 2. Create your .env (never commit this file)
cp .env.example .env

# 3. Edit .env and paste a key (both providers offer a free tier)
#    GEMINI_API_KEY=AIza...
#    or
#    GROQ_API_KEY=gsk_...

# 4. Run the server
npm start              # production
# or
npm run dev            # auto-restart on save
```

Open <http://localhost:8765>. The AI Coach automatically detects the server and shows **● Server connected** — no key is ever sent to the browser.

Get a free key here:
- Gemini — <https://aistudio.google.com/app/apikey>
- Groq (fast Llama 3.3 70B inference) — <https://console.groq.com/keys>

---

## `.env` reference

| Var | Default | Description |
|---|---|---|
| `PORT` | `8765` | Server port |
| `COACH_PROVIDER` | `gemini` | `gemini` or `groq` — used when both keys are set |
| `GEMINI_API_KEY` | (empty) | Google Gemini key |
| `GEMINI_MODEL` | `gemini-flash-latest` | Override model name |
| `GROQ_API_KEY` | (empty) | Groq key |
| `GROQ_MODEL` | `llama-3.3-70b-versatile` | Override model name |

---

## API endpoints (when the server is running)

### AI Coach proxy
- `GET /api/coach/health` → `{ configured, providers, defaultProvider, geminiModel, groqModel }`
- `POST /api/coach/chat` body `{ provider?, messages }` → `{ reply, provider }`

### Progress database  (single-user — no auth)
- `GET /api/progress/health` → `{ ok: true }`
- `GET /api/progress` → full snapshot `{ lessons, streak, selfCheck, chatLogs }`
- `POST /api/progress/lesson` body `{ lessonId, status }` → upsert lesson status
- `POST /api/progress/scenario` body `{ lessonId, scenarioId, score }` → record an attempt
- `POST /api/progress/chat-log` body `{ lessonId?, scenarioId?, score?, transcript }` → save chat transcript
- `POST /api/progress/self-check` body `{ lessonId, checks: [bool,...] }`
- `POST /api/progress/import` body `<localStorage backup>` → merge an old browser backup into the DB
- `POST /api/progress/reset` → wipe everything

These are only used by the Business English pages and AI Coach; the rest of the site still works without the server.

## Progress store

When the server is running, all Business English progress (lesson status, best
scenario scores, attempt count, streak, self-check, last 30 chat transcripts)
is written to a single JSON file at `data/progress.json`. **Single-user mode**:
every browser pointing at the same server shares the same data automatically —
no login, no IDs to copy.

Why JSON instead of SQLite?

- Boot once → load file into memory → every change writes the file atomically
  (write to `.tmp` + rename). No DB engine, no native compilation.
- The image / build is tiny — pure JS.
- Backup is `cp data/progress.json elsewhere/`. Inspect by opening it in any editor.
- Restore is `cp` in the other direction.

If you switch from localStorage-only to the server later, the client
automatically uploads its existing localStorage snapshot via
`/api/progress/import` on first connect — no data lost.

The Sync panel on the Business English page has an *Export JSON backup* button
for a portable copy you can keep anywhere.

---

## Deploy to Koyeb (free, cross-network access)

If you want to use the app from any network (phone on 4G, laptop at a coffee shop), deploy the server to a public host. **Koyeb's free Eco tier is enough**: 1 free service, public HTTPS URL, region Singapore — perfect for single-user scale.

### One caveat: Koyeb free tier has no persistent volume

The container's `/data/progress.json` is wiped on every redeploy or restart. Three ways to handle this:

1. **Just hit *Export JSON backup* before redeploying** (and *Import* via localStorage on next boot — the client auto-imports). Easiest, $0.
2. **Pay for a Koyeb attached volume** (~$0.10/GB/month) to make `/data` persistent.
3. **Run locally** with `npm start` if cross-network isn't required — file persists on your machine.

The progress file is small (a few KB even after months of use), so option 1 is fine for most people.

### Deploy steps (Git-based, one-time setup)

1. Push this folder to a GitHub repo (private is fine).
2. Sign up at <https://app.koyeb.com> (GitHub login).
3. **Create Service → GitHub** → pick your repo + main branch.
4. Builder: **Dockerfile** (Koyeb auto-detects the `Dockerfile` in this repo).
5. **Instance type:** `Free` (Eco). Region: `sin` (Singapore).
6. **Ports:** expose `8080` HTTP.
7. **Environment variables:**
   - `GEMINI_API_KEY` = your key (mark as Secret)
   - `GROQ_API_KEY` = your key, optional (mark as Secret)
   - `COACH_PROVIDER` = `gemini`
   - `PROGRESS_DB_PATH` = `/data/progress.json` (already in the Dockerfile)
8. Health check: HTTP `/api/progress/health` (optional but recommended).
9. **Deploy**. Build ~1–2 minutes. App URL: `https://<app>-<org>.koyeb.app`.

Open it from any device → same progress (until next redeploy).

### Update code later

```bash
git push        # Koyeb auto-rebuilds and redeploys
```

### Backup / restore

- **Backup:** open the app → Business English page → *Export JSON backup* button.
- **Restore:** the client auto-imports its localStorage on next connect, so just keep using the same browser. To restore on a brand-new browser, hit Import (or paste the backup into localStorage manually under the key `business_progress`).

---

## Alternative: Deploy to Fly.io (paid, but with persistent volume)

If you want the JSON file to survive redeploys without manual export/import, Fly.io has cheap persistent volumes (~$0.15/GB/month) — see `fly.toml`.

```bash
brew install flyctl
fly auth signup
fly launch --no-deploy --copy-config --name techenglish-<suffix>
fly volume create techenglish_data --region sin --size 1
fly secrets set GEMINI_API_KEY="AIza..."
fly deploy
```

The free trial credit covers a few months at single-user scale. After that ~$2–3/month total.

---

## Project layout

```
.
├── index.html                    # IT English landing
├── business-english.html         # 6-month plan overview
├── business-lesson.html          # Single lesson page (?id=w1-intro)
├── coach.html                    # AI Coach chat
├── lesson.html, article.html     # Existing IT lessons / articles
├── css/
├── js/
│   ├── coach.js                  # Coach UI + AI routing
│   ├── business-progress.js      # localStorage progress
│   └── data/
│       ├── business-plan.js      # 24 weekly lessons curriculum
│       ├── daily-phrases.js      # 80 everyday office phrases
│       ├── vocabulary.js, lessons.js, articles.js   # IT English content
├── server.js                     # Node/Express static + AI proxy + progress API
├── db/
│   └── progress-db.js            # JSON-file progress store (in-memory + atomic write)
├── data/                         # progress.json lives here at runtime (gitignored)
│   └── progress.json
├── Dockerfile                    # production image (Koyeb / Fly / any container host)
├── fly.toml                      # Fly.io config (optional)
├── package.json
├── .env.example                  # template
└── .env                          # your secrets (gitignored)
```

---

## Privacy / security

- Your `.env` is gitignored.
- `package.json`, `package-lock.json`, `node_modules/`, `.env`, `.git/`, `server.js` are blocked from being served as static files.
- If you use **Browser-only API Key** mode instead of the server, the key stays in your browser's `localStorage` and is sent directly to the AI provider from your browser — no server middle-man, no server logs.

---

## Suggested study rhythm (English-teacher take)

- **Daily (10 min):** open *Everyday Office Phrases* on the home page, say one group out loud, then drill the current week's first scenario in the AI Coach.
- **Mon / Wed / Fri (25 min):** start a new lesson — vocab + phrases + both scenarios. Try to hit score 80+.
- **Tue / Thu (15 min):** redo last week's scenarios cold.
- **Sat (30 min):** AI Free-Chat mode, freestyle the week's situation.
- **Sun:** rest — but skim daily phrases to keep the streak.

Start with `w1-intro` (Professional Self-Introduction).
