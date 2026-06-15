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

## Progress database

When the server is running, all Business English progress (lesson status, best
scenario scores, attempt count, streak, self-check, last 30 chat transcripts)
is mirrored to a SQLite file at `data/progress.db`. **Single-user mode**: every
browser pointing at the same server shares the same data automatically — no
login, no IDs to copy.

Schema lives at `db/schema.sql`. Migration is automatic: the schema is
re-applied with `CREATE TABLE IF NOT EXISTS` on every boot. The `data/` folder
is gitignored.

If you switch from localStorage-only to the server later, the client
automatically uploads its existing localStorage snapshot via
`/api/progress/import` on first connect — no data lost.

To back up the database, just copy `data/progress.db` somewhere safe.
The Sync panel on the Business English page also has an *Export JSON* button
for a portable backup.

---

## Deploy to Fly.io (cross-network access)

If you want to use the app from any network (phone on 4G, laptop at a coffee shop), deploy the server to a public host. Fly.io is the easiest option for **Node + persistent SQLite** — keeps the same `data/progress.db` on a managed disk, single command to deploy. Region `sin` (Singapore) gives the lowest latency from Vietnam.

### Prerequisites

```bash
# Install the Fly CLI (one-time)
brew install flyctl
fly auth signup       # or `fly auth login` if you already have an account
```

### First-time deploy

```bash
# 1. Initialise app (uses the existing fly.toml — pick a unique name)
fly launch --no-deploy --copy-config --name techenglish-<your-suffix>

# 2. Create a 1 GB persistent volume in the same region (free up to 3 GB total)
fly volume create techenglish_data --region sin --size 1

# 3. Set your AI key(s) as secrets (NEVER commit these)
fly secrets set GEMINI_API_KEY="AIza..."
# optional:  fly secrets set GROQ_API_KEY="gsk_..."

# 4. Ship it
fly deploy
```

After deploy, your app is at `https://techenglish-<suffix>.fly.dev`. Open it from anywhere — same progress, same DB.

### Update code later

```bash
fly deploy            # rebuilds + redeploys
```

### Useful Fly commands

```bash
fly logs                  # tail server logs
fly status                # see machine state
fly ssh console           # open a shell inside the running container
fly volumes list          # confirm the volume is attached
fly secrets list          # show which secret names are set (values hidden)
```

### Costs

- First-time accounts get a small trial credit.
- The default config uses `auto_stop_machines = "stop"` — the VM idles to zero when nobody is using the app and wakes up on the next request (~1 second cold start). At single-user scale this typically costs around **$2–3/month** after the trial credit runs out.
- The persistent volume (1 GB in Singapore) is roughly **$0.15/month**.

### Backup / restore

```bash
# Backup the live DB
fly ssh sftp shell
> get /data/progress.db ./progress-backup.db

# Restore
fly ssh sftp shell
> put ./progress-backup.db /data/progress.db
fly machine restart --app techenglish-<suffix>
```

Or just hit *Export JSON backup* in the Sync panel from any browser.

### Alternative: Render free tier + Turso

If you'd rather pay nothing forever and don't mind a 30-second cold start, swap the SQLite layer for [Turso](https://turso.tech) (managed libsql/SQLite, free tier 9 GB) and deploy on Render's free Node service. Ask the assistant for that variant — it's a small refactor of `db/progress-db.js`.

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
│   ├── schema.sql                # SQLite tables
│   └── progress-db.js            # data-access layer (better-sqlite3)
├── data/                         # SQLite file (created at runtime, gitignored)
│   └── progress.db
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
