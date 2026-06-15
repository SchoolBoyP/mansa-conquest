# Mansa Conquest — Marketing Website

The overhauled public marketing site for **Mansa Conquest**, a diversified venture capital / private investment fund (Kenya & Australia). Built on the approved stack: **Next.js 15 (App Router) · TypeScript · Tailwind CSS · Framer Motion · Zod**.

> Want to see it instantly? Open `../prototype/mansa-conquest.html` in any browser — it's a self-contained preview of the full design (all pages, animations, multi-step form) with no build step.

## Pages

| Route | Description |
|---|---|
| `/` | Hero with the exact tagline, stats, sector preview, "why us", SIR highlight, CTA |
| `/about` | Mansa Musa story, mission, values, journey timeline, leadership placeholders |
| `/sectors` | All eight investment sectors + SIR call-to-action |
| `/portfolio` | Placeholder portfolio grid (clearly labeled illustrative samples) |
| `/apply` | 4-step investor application (validation, progress bar, review, success) |
| `/login` | Investor portal entry (password + magic-link tabs) — demo UI |

Plus `sitemap.ts`, `robots.ts`, a branded `not-found.tsx`, and JSON-LD `FinancialService` structured data in the root layout.

## Design system

Tokens live in `tailwind.config.ts` and `src/app/globals.css`: obsidian/onyx/graphite dark surfaces, gold `#D4AF37` accents (bright/deep variants), emerald heritage green, ivory text. Display type is **Cormorant Garamond**, UI type is **Inter** (both via `next/font`). Scroll-reveal animations use Framer Motion (`src/components/Reveal.tsx`).

## Run locally

```bash
cd web
npm install
cp .env.example .env.local   # fill in when wiring Supabase/Resend (not required to view the site)
npm run dev                  # http://localhost:3000
```

`npm run build` to produce a production build; deploy on Vercel.

## What's stubbed vs. real

- **Real:** all pages, responsive layout, animations, SEO metadata, the multi-step form with client + server (Zod) validation.
- **Stubbed for the portal phase:** `src/app/apply/actions.ts` currently logs the application server-side. The `TODO` there marks where to (1) persist an `Inquiry` via Prisma, (2) send team + applicant emails via Resend. Login is demo UI; Supabase Auth (email + magic link + MFA) wires in during the portal build.
- **Placeholder content:** portfolio companies and team bios are illustrative — see `src/lib/data.ts`.

## Project layout

```
web/
  src/
    app/        # routes (App Router) + sitemap/robots/not-found
    components/ # Navbar, Footer, Crest, Reveal, SectorCard
    lib/        # data.ts (sectors/portfolio), validation.ts (Zod)
prototype/
  mansa-conquest.html   # instant, no-build visual preview
prisma/
  schema.prisma         # full database schema (from the approved plan)
```
