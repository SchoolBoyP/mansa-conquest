# Connect the Apply form to Supabase + Resend

This makes investor applications **save to your database** and **email you**. Free on both services. Follow in order.

---

## Part A — Supabase (database)

1. Go to https://supabase.com → sign in (use GitHub) → **New project**.
2. Name it `mansa-conquest`, set a **database password** (save it somewhere safe), pick a region near you (e.g. Sydney). Create — wait ~2 min for it to provision.
3. In the project, open **Settings → Database → Connection string** and copy two values:
   - **Transaction** pooler (port **6543**) → this is your `DATABASE_URL`
   - **Session** / direct (port **5432**) → this is your `DIRECT_URL`
   - Replace `[YOUR-PASSWORD]` in each with the password from step 2.
   - Add `?pgbouncer=true&connection_limit=1` to the **end** of the 6543 one.

They look like:
```
DATABASE_URL="postgresql://postgres.abcd:[email protected]:6543/postgres?pgbouncer=true&connection_limit=1"
DIRECT_URL="postgresql://postgres.abcd:[email protected]:5432/postgres"
```

## Part B — Resend (email)

1. Go to https://resend.com → sign up → **API Keys → Create API Key** → copy it (starts with `re_`). That's `RESEND_API_KEY`.
2. No domain setup needed yet — the code sends from Resend's shared `onboarding@resend.dev` address so it works immediately. (Later, verify `mansaconquest.com` in Resend to send from your own address.)

---

## Part C — Local env file

Create a file at **`web/.env`** (note: `.env`, used by Prisma) with:

```
DATABASE_URL="...(the 6543 pooled URL)..."
DIRECT_URL="...(the 5432 direct URL)..."
RESEND_API_KEY="re_..."
CONTACT_INBOX="mansaconquest@gmail.com"
```

> `web/.env` is already git-ignored — it will not be committed.

## Part D — Create the database tables

In PowerShell:

```powershell
cd "C:\Users\btcco\Claude\Projects\MansaConquest\web"
npm install
npx prisma migrate dev --name init
```

This creates every table from the schema (including `inquiries`) in your Supabase database. You should see "Your database is now in sync." You can view the tables in Supabase → **Table Editor**.

## Part E — Add the same secrets to Vercel

So the live site can reach the database and send email:

1. Vercel → project → **Settings → Environment Variables** → add each of these (Production + Preview + Development):
   - `DATABASE_URL`
   - `DIRECT_URL`
   - `RESEND_API_KEY`
   - `CONTACT_INBOX` = `mansaconquest@gmail.com`
2. Save.

## Part F — Push & deploy

```powershell
cd "C:\Users\btcco\Claude\Projects\MansaConquest"
git add -A
git commit -m "Wire Apply form to Supabase (Prisma) + Resend email"
git push
```

Vercel auto-deploys. When it's live, submit a test application at **https://mansaconquest.com/apply** — you should get an email, and a row should appear in Supabase → Table Editor → `inquiries`.

---

## Important: before real investor data

Turn on **Row Level Security** (Supabase → Table Editor → each table → Enable RLS) and add policies before storing sensitive data. For the public `inquiries` table specifically, inserts come only from the server action (using your secret connection), so keep RLS on with **no public read** policy.

## Troubleshooting

- **`migrate` can't connect** → re-check the password in both URLs and that you added `?pgbouncer=true&connection_limit=1` only to the 6543 one.
- **No email arrives** → check the Resend dashboard "Emails" log; confirm `RESEND_API_KEY` is set in Vercel and you redeployed. Check spam.
- **Build fails on Vercel with Prisma** → ensure `DATABASE_URL` and `DIRECT_URL` are set in Vercel env vars, then redeploy.
- **Application shows success but no row** → look at the Vercel deployment's **Functions logs** for the error message the action printed.
