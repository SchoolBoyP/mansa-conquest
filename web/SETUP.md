# Local Setup — Windows

Run the Mansa Conquest site on your own machine. Use **PowerShell** (or Windows Terminal).

> Note: `npm install` (step 3) needs internet **once** to download packages into `node_modules`. After that, `npm run dev` runs fully offline.

## 1. Install prerequisites (one time)

- **Node.js 20 LTS** — download from https://nodejs.org (the "LTS" installer). Next.js 15 needs Node 18.18+; 20 is recommended.
- **Git** (optional, for version control) — https://git-scm.com/download/win
- **VS Code** (recommended editor) — https://code.visualstudio.com

Verify the install (open a NEW terminal after installing):

```powershell
node -v   # should print v20.x (or v18.18+)
npm -v    # should print 10.x
```

## 2. Go to the project folder

```powershell
cd "C:\Users\btcco\Claude\Projects\MansaConquest\web"
```

## 3. Install dependencies (needs internet, ~1–2 min)

```powershell
npm install
```

## 4. (Optional) environment file

Not needed just to view the site. When you start wiring Supabase/Resend:

```powershell
copy .env.example .env.local
notepad .env.local
```

## 5. Start the dev server

```powershell
npm run dev
```

Open **http://localhost:3000** in your browser. Edits to files under `src/` hot-reload instantly. Press `Ctrl + C` in the terminal to stop.

## 6. Production build (optional)

```powershell
npm run build
npm run start
```

---

## Just want to preview without Node?

Double-click `..\prototype\mansa-conquest.html` — it opens in your browser with no install at all.

## Troubleshooting

- **`npm not recognized`** → Node isn't installed or you didn't open a new terminal after installing. Close and reopen the terminal.
- **PowerShell script error running npm** → run once: `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned` and confirm with `Y`.
- **Port 3000 in use** → run `npm run dev -- -p 3001` and open http://localhost:3001.
- **Old Node version** → uninstall it, install Node 20 LTS, reopen terminal.
- **Behind a proxy/firewall for `npm install`** → set `npm config set registry https://registry.npmjs.org/` or configure your proxy with `npm config set proxy http://...`.
