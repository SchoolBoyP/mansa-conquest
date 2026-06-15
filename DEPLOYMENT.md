# Mansa Conquest — Deployment Guide

Deploy the platform with **Vercel** (Next.js frontend + API routes) and **Supabase** (Postgres, Auth, Storage, Edge Functions). This guide takes you from local code → live site, with environment variables, a custom domain, and how to keep costs at $0.

---

## 0. Architecture & free-tier reality check

```
   Browser ──▶ Vercel (Next.js 15 app + API routes / server actions)
                   │
                   ▼
              Supabase  ── Postgres (Prisma)
                         ── Auth (email + magic link + MFA)
                         ── Storage (documents)
                         ── Edge Functions (PDF/reporting later)
```

**Free-tier honesty (verify current limits at the source links at the bottom):**

- **Vercel Hobby** is **free** but **non-commercial use only**. It's perfect for development, previews, and staging. A *production* site for a revenue-generating business (a real VC fund) should be on **Vercel Pro (~$20/seat/mo)** to comply with their terms. You can build the entire thing free and only upgrade when you go live commercially.
- **Supabase Free** gives 500 MB database, 1 GB file storage, 5 GB bandwidth, up to 50,000 monthly active auth users, 2 active projects — and **pauses a project after 7 days of inactivity** (data is preserved; you click "Restore" to wake it). Fine for dev/staging; for production uptime you'd move to Pro (~$25/mo).

> Bottom line: you can develop and demo the whole platform for **$0**. Budget ~$45/mo only when you flip to a commercial production launch.

---

## 1. Prerequisites

- Code pushed to a **GitHub** repo (Vercel deploys from Git).
- A **Vercel** account (sign up with GitHub) — https://vercel.com
- A **Supabase** account — https://supabase.com
- (Optional) A **Resend** account for emails — https://resend.com (free: 3,000 emails/mo)

---

## 2. Push the project to GitHub

From the repo root (`C:\Users\btcco\Claude\Projects\MansaConquest`):

```powershell
git init
git add .
git commit -m "Mansa Conquest platform — marketing site + schema"
# create an EMPTY repo on github.com first (no README), then:
git remote add origin https://github.com/<your-username>/mansa-conquest.git
git branch -M main
git push -u origin main
```

> The Next.js app lives in the **`web/`** subfolder. Note this — you'll set it as Vercel's "Root Directory" in step 4.

---

## 3. Set up Supabase

1. **Create a project** at https://supabase.com/dashboard → *New project*. Pick a strong DB password (save it) and a region close to your users (e.g. Sydney for AU, Frankfurt is closest available for KE).
2. **Get your API keys** → Project *Settings → API*:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` key (secret!) → `SUPABASE_SERVICE_ROLE_KEY`
3. **Get the database connection strings** → *Settings → Database → Connection string*:
   - **Pooled** (Transaction mode, port 6543) → `DATABASE_URL` — used by the app at runtime.
   - **Direct** (Session mode, port 5432) → `DIRECT_URL` — used by Prisma for migrations.
   - Append `?pgbouncer=true&connection_limit=1` to the pooled URL. Example:
     ```
     DATABASE_URL="postgresql://postgres.[ref]:[pwd]@aws-0-[region].pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1"
     DIRECT_URL="postgresql://postgres.[ref]:[pwd]@aws-0-[region].pooler.supabase.com:5432/postgres"
     ```
4. **Create Storage buckets** → *Storage → New bucket*: create `documents` (set to **Private**). Files will be served via signed URLs from the portal.
5. **Configure Auth** → *Authentication → Providers*: enable **Email**; turn on **Confirm email** and **Magic Link**. Under *Authentication → URL Configuration*, set Site URL to your Vercel domain (you'll update this after step 4). MFA (TOTP) is enabled under *Authentication → Multi-Factor*.

### Apply the Prisma schema

Locally, with the two connection strings in `web/.env.local`:

```powershell
cd web
npm install
npx prisma migrate deploy   # or: npx prisma migrate dev --name init   (first time)
npx prisma generate
```

This creates all tables from `prisma/schema.prisma` in your Supabase Postgres.

> **Enable Row Level Security** on every table before going live (Supabase *Table Editor → each table → Enable RLS*), then add policies so an LP can only read their own rows. This is the primary security guard — don't skip it for production.

---

## 4. Deploy to Vercel

1. https://vercel.com/new → **Import** your GitHub repo.
2. **Root Directory:** click *Edit* and select **`web`** (critical — the app isn't at repo root).
3. Framework preset auto-detects **Next.js**. Leave build command (`next build`) and output as default.
4. **Environment Variables** — add all of these (see table in §5) *before* the first deploy. Set them for **Production, Preview, and Development**.
5. Click **Deploy**. You'll get a `https://<project>.vercel.app` URL in ~1–2 min.
6. Go back to **Supabase → Auth → URL Configuration** and set **Site URL** + **Redirect URLs** to your Vercel domain (and later your custom domain), e.g. `https://mansaconquest.com/**`.

Every `git push` to `main` now auto-deploys production; pull requests get preview URLs.

---

## 5. Environment variables

Set these in **Vercel → Project → Settings → Environment Variables** (and mirror them in `web/.env.local` for local dev). Never commit `.env.local`.

| Variable | Where to get it | Secret? |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase → Settings → API | No |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase → Settings → API | No |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase → Settings → API | **Yes** |
| `DATABASE_URL` | Supabase → Database (pooled, 6543) | **Yes** |
| `DIRECT_URL` | Supabase → Database (direct, 5432) | **Yes** |
| `RESEND_API_KEY` | Resend dashboard | **Yes** |
| `CONTACT_INBOX` | your inbox, e.g. `mansaconquest@gmail.com` | No |
| `NEXT_PUBLIC_SITE_URL` | your live URL, e.g. `https://mansaconquest.com` | No |

After changing env vars in Vercel, **redeploy** (Deployments → ⋯ → Redeploy) for them to take effect.

---

## 6. Custom domain

1. Buy a domain (Namecheap, Cloudflare, Porkbun, etc.).
2. **Vercel → Project → Settings → Domains → Add** → enter `mansaconquest.com`. Add `www.mansaconquest.com` too and let Vercel redirect one to the other.
3. Vercel shows the DNS records to create at your registrar:
   - **Apex/root** (`mansaconquest.com`): an **A record** → `76.76.21.21` (Vercel shows the exact value), or an **ALIAS/ANAME** to `cname.vercel-dns.com` if your registrar supports it.
   - **www**: a **CNAME** → `cname.vercel-dns.com`.
4. Save records; DNS propagates in minutes–hours. Vercel issues a free SSL certificate automatically.
5. Update `NEXT_PUBLIC_SITE_URL` (Vercel env) and Supabase **Auth URL Configuration** to the custom domain, then redeploy.

> Cheapest path: domains are the one unavoidable cost (~$10–15/yr). Cloudflare Registrar sells at wholesale with no markup.

---

## 7. Keeping it free (and avoiding surprises)

- **Develop entirely on free tiers.** Hobby + Supabase Free cost $0 for building, previews, and demos.
- **Beat the Supabase 7-day pause** during active dev by simply logging into the dashboard or hitting the site weekly. For a staging site you want always-on, a tiny external cron (e.g. a free uptime pinger) that requests the site keeps the project warm. For real production, upgrade to Supabase Pro.
- **No overage billing on free tiers** — both Vercel Hobby and Supabase Free *stop/pause* rather than charge you. You won't get a surprise bill.
- **Commercial-use line:** the moment this is a live business site, move Vercel to **Pro** to stay within terms. Supabase to **Pro** for always-on + daily backups. Total ~$45/mo + domain.
- **Watch the meters:** Vercel Hobby gives 100 GB bandwidth / 100 build-min / 1M function invocations per month — plenty for a marketing site. Supabase Free: 500 MB DB / 1 GB storage / 5 GB bandwidth.

---

## 8. Post-deploy checklist

- [ ] Site loads on the `*.vercel.app` URL
- [ ] All env vars set for Production + Preview
- [ ] `npx prisma migrate deploy` ran against Supabase; tables exist
- [ ] **RLS enabled** on every table with policies (before any real data)
- [ ] Supabase Auth Site URL + Redirect URLs match the live domain
- [ ] Custom domain resolves with HTTPS
- [ ] Apply/contact form submits (wire the server action to Prisma + Resend)
- [ ] `robots.txt` and `sitemap.xml` reachable (`/robots.txt`, `/sitemap.xml`)

---

## Sources (free-tier limits — verify, these change)

- [Vercel Hobby Plan (official docs)](https://vercel.com/docs/plans/hobby)
- [Vercel Free Tier Limits 2026](https://deploywise.dev/blog/vercel-free-tier-limits-2026)
- [Supabase Free Tier Limits in 2026](https://www.itpathsolutions.com/supabase-free-tier-limits)
- [Supabase Pricing 2026 (UI Bakery)](https://uibakery.io/blog/supabase-pricing)
