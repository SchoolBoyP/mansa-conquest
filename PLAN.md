# Mansa Conquest — Platform Plan & Architecture

**Diversified VC / Private Investment Fund · Registered in Kenya & Australia**
*Building Legacies Through Strategic Investments*

Stack: Next.js 15 (App Router) · TypeScript · Tailwind + shadcn/ui + Radix · Supabase (Postgres + Auth + Storage + Edge Functions) · Prisma · Recharts/Tremor · Resend · Zod · Vercel

---

## 1. Current Website — Summary

### Content
The existing site (`mansa-conquest.vercel.app`) is a small static brochure of six pages: Home, About, Investment Sectors, Special Inquiry (SIR), Tech Start-Ups, and Contact.

- **Home** — Hero: "A Legacy of Wealth Creation." Positions the firm as inspired by Mansa Musa, conquering new horizons in wealth creation through innovative investment and resource development. Three CTAs: Explore Opportunities, Learn More, Get in Touch.
- **About** — Frames the company as a "venture capitalist LLC" funded by share funding from visionary investors, deploying capital across a diverse portfolio. Mission: "build legacies that endure," blending profitability with purpose, global outlook.
- **Investment Sectors** — Eight sectors as cards: Real Estate, Tech Start-Ups, Manufacturing, Crypto & Stocks, Mining & Exploration (rare earths, precious stones), Fashion & Clothing, Logistics & Transport, Franchising & Licensing.
- **SIR (Special Inquiry & Requests)** — A bespoke service: investors can hire the firm to research/manage capital in fields outside the core sectors. A genuine differentiator worth elevating.
- **Contact** — Email (mansaconquest@gmail.com), Australia phone (+61 406 339 104), Kenya phone (+254 703 144 338).

### Tone
Aspirational, regal, legacy-oriented. Leans on the Mansa Musa empire metaphor — wealth, conquest, endurance, greatness. Confident and visionary, but currently thin on the substance institutional investors expect (team, track record, governance, regulatory disclosures).

### Visual direction (current)
A simple static HTML/CSS brochure — minimal layout, basic navigation, no imagery system, no portal, no interactivity. It establishes the *name and intent* but not yet the *premium institutional feel* the brand aspires to. The empire-heritage palette (gold / black / deep green) is the right instinct and the foundation to build on.

**Opportunity:** keep the messaging and sector structure, replace the execution entirely with a cohesive, luxurious, trustworthy institutional design plus a real secure platform behind it.

---

## 2. Enhanced Design System

A premium dark, gold-accented identity rooted in African-empire heritage — restrained and institutional, not flashy.

### Color palette

| Token | Hex | Use |
|---|---|---|
| `obsidian` (bg base) | `#0B0B0C` | Page background |
| `onyx` (surface) | `#141416` | Cards, panels |
| `graphite` (surface-2) | `#1E1E22` | Raised elements, inputs |
| `gold` (primary) | `#D4AF37` | Primary accent, CTAs, highlights |
| `gold-bright` | `#E8C658` | Hover / active gold |
| `gold-deep` | `#A8842A` | Pressed / borders on gold |
| `emerald` (secondary) | `#0F5132` | Deep green heritage accent |
| `emerald-light` | `#1A7A4E` | Secondary highlights |
| `ivory` (text) | `#F5F1E6` | Primary text on dark |
| `sand` (muted text) | `#A89F8C` | Secondary text |
| `line` | `#2A2A2E` | Borders / dividers |
| Status | `#3FA66A` success · `#E0A93C` warning · `#D04545` danger · `#4A8FE7` info | Portal data states |

Gold is used sparingly as an accent on a predominantly dark canvas — the institutional cue. Subtle motifs (a refined geometric "MC" / crown-and-coin mark, faint gold filigree dividers) reinforce heritage without clutter.

### Typography

- **Display / headings:** a high-contrast serif with regal character — **Cormorant Garamond** or **Playfair Display** (via `next/font`). Used for hero lines, section titles, and large numbers.
- **Body / UI:** a clean geometric/grotesque sans — **Inter** (or **Satoshi**). Used for paragraphs, navigation, forms, and dashboards for maximum legibility.
- **Numeric / data:** **Inter** with `tabular-nums`, or **IBM Plex Mono** for ledger-style figures in the portal.
- Scale (rem): 0.75 / 0.875 / 1 / 1.125 / 1.25 / 1.5 / 2 / 2.5 / 3.5 / 4.5. Generous line-height (1.6 body), tight tracking on display.

### Design language
- **Spacing:** 4px base grid; generous whitespace; max content width ~1200–1280px.
- **Radius:** 8px controls, 16px cards, full on pills.
- **Elevation:** soft shadows + 1px `line` borders; gold focus rings (`gold` at 40% alpha) for accessibility.
- **Motion:** subtle, slow easings (Framer Motion) — fades and 8–16px rises; nothing bouncy. Restraint = luxury.
- **Imagery:** dark, high-contrast photography (architecture, mining, markets, textiles) with a gold-tinted gradient overlay for consistency.
- **Components:** standardize on **shadcn/ui** primitives themed with the tokens above, exported as a Tailwind theme + CSS variables so marketing site and portal stay perfectly consistent. (The `theme-factory` and `brand-guidelines` skills can generate the concrete token files when we build.)
- **Accessibility:** target WCAG 2.1 AA — verify gold-on-dark and text contrast ratios; visible focus states; keyboard nav throughout the portal.

---

## 3. Database Schema (Prisma)

The complete schema is in **`prisma/schema.prisma`** (saved alongside this file). Highlights:

**Identity & access** — `User` (mapped to Supabase `auth.users` via `authUserId`; password/MFA/magic-link owned by Supabase, not duplicated), `UserRole` enum (`VISITOR`, `INVESTOR`, `ADMIN`, `GENERAL_PARTNER`), self-referential invites, `AuditLog`, `Notification`.

**Investors (LPs)** — `InvestorProfile` with type (individual/entity/trust/SMSF/institutional), `Jurisdiction` (Kenya/Australia/Other), accreditation status, KYC/AML status, and tokenized references for tax IDs and banking details (never raw PII).

**Funds & commitments** — `Fund` (vintage, target/hard-cap, committed/called/distributed totals, fee/carry/hurdle terms), `FundCommitment` (per-LP commitment, called, distributed, ownership %, status).

**Deal pipeline** — `Deal` (stage from `SOURCED` → `INVESTED`/`PASSED`, sector, valuation, probability, owner) with `DealNote`s; converts to `PortfolioCompany`.

**Portfolio** — `PortfolioCompany`, `Investment` (fund→company: type, round, amount, ownership, valuations), and time-series `Valuation` records.

**Capital flows** — `CapitalCall` + per-LP `CapitalCallLineItem` (payment status tracking); `Distribution` + per-LP `DistributionLineItem` (return of capital, gains, dividends).

**Documents** — `Document` against Supabase Storage paths, with `DocumentCategory`, `DocumentVisibility` (private / fund-LPs / all-investors / internal), versioning, and polymorphic scoping to investor/fund/deal/company/call/distribution/report.

**Reporting & comms** — `Report` (quarterly/annual/NAV/capital-account, with NAV, IRR, MOIC, DPI) + `ReportRecipient` read tracking; `Communication` + `MessageRecipient` for announcements/DMs/newsletters.

**Public funnel** — `Inquiry` captures Contact and SIR submissions with type/status pipeline and assignment.

All money is `Decimal(18,2)`; percentages `Decimal(7,4)`. Indexed on the fields the dashboards filter by. Designed to sit behind Supabase **Row Level Security** so LPs can only ever read their own rows.

> Security note: KYC docs, tax IDs, and banking details must be encrypted at the application layer and access-gated by RLS + signed Storage URLs. We'll wire this in during the portal phase.

---

## 4. Feature List

### MVP (Phase 1) — marketing site first, then portal foundation

**A. Public marketing website**
- Upgraded Home, About, Sectors (8 sector detail pages), SIR service page, Tech Start-Ups, Contact — all on the new design system.
- Responsive, SEO-optimized (metadata, OG, sitemap, JSON-LD `Organization`/`FinancialService` schema), fast (Vercel edge, image optimization).
- Contact + SIR forms → Zod-validated server actions → `Inquiry` table + Resend notification to the team.
- Trust elements: leadership/team, regulatory footprint (Kenya & Australia), responsible-investing statement, FAQ.
- Cookie/consent + privacy & terms pages.

**B. Auth & accounts (Supabase Auth)**
- Email + magic link + password, MFA (TOTP), email verification.
- Role-based access (Visitor / Investor / Admin / GP) with middleware route protection.
- Invite-only investor onboarding (GP invites LP → guided signup → KYC start).

**C. Investor (LP) portal — core**
- Dashboard: commitment vs. called vs. distributed, current NAV, simple performance tiles.
- Documents vault (download via signed URLs, filtered by visibility).
- Capital calls: view notices, amount due, due date, payment status.
- Distributions: history and notices.
- Reports: quarterly/NAV statements with read receipts.
- Profile & KYC status; notifications.

**D. Admin / GP dashboard — core**
- Manage investors (invite, KYC review, accreditation).
- Manage funds, commitments, capital calls (issue → track payment), distributions.
- Upload/scope documents; publish reports & communications.
- Inquiry inbox (Contact + SIR) with assignment.
- Audit log view.

### Phase 2 — depth & automation
- Deal pipeline / CRM (kanban by stage, IC notes, convert deal → portfolio company).
- Portfolio analytics: IRR/MOIC/DPI/TVPI engine, valuation history charts, sector allocation (Recharts/Tremor).
- Capital-account statements auto-generated per LP per period (PDF via Edge Function).
- E-signature for subscription docs (DocuSign/Dropbox Sign).
- Payment reconciliation (Stripe/bank webhooks) against capital calls.
- In-app secure messaging GP↔LP; newsletter via Resend audiences.
- Document data-room with watermarking and granular permissions.
- Multi-currency (KES/AUD/USD) with FX, multi-fund/vintage support.
- KYC/AML provider integration; tax-document generation (AU/KE).
- Self-service investor application flow with accreditation questionnaire.
- Admin analytics, exports (CSV/Excel), and scheduled report delivery.

---

## 5. Development Plan (step-by-step)

**Phase 0 — Foundation (setup)**
1. Scaffold Next.js 15 + TypeScript + Tailwind; init shadcn/ui; Vercel project + envs.
2. Create Supabase project (DB, Auth, Storage buckets); add Prisma with `DATABASE_URL`/`DIRECT_URL`.
3. Commit `schema.prisma`, run first migration, generate client.
4. Build the design-token layer (Tailwind theme + CSS vars + fonts) and a shared `ui` package. Establish layout shells, nav, footer.

**Phase 1 — Marketing site (ship first)**
5. Build Home + global layout on the new system.
6. About, Sectors index + 8 sector pages, SIR, Tech Start-Ups, Contact.
7. Contact/SIR forms → server actions → `Inquiry` + Resend.
8. SEO, analytics, legal pages, accessibility pass. **Deploy v1 publicly.**

**Phase 2 — Auth & roles**
9. Supabase Auth (email/magic link/MFA), session middleware, role gating, `User`/`InvestorProfile` sync.
10. Invite flow + onboarding skeleton; protected route groups for `/portal` and `/admin`.

**Phase 3 — Investor portal (core)**
11. LP dashboard + data hooks; Documents vault with signed URLs + RLS.
12. Capital calls, distributions, reports (read views); notifications.

**Phase 4 — Admin/GP dashboard (core)**
13. Investor & fund management; issue capital calls / distributions; document & report publishing; inquiry inbox; audit log.

**Phase 5 — Hardening & launch**
14. Row-Level Security policies for every table; PII encryption; signed-URL expiry; rate limiting.
15. E2E tests (Playwright), unit tests (Vitest), seed data; security review; performance/Lighthouse pass.
16. Staging UAT with a pilot LP → production launch.

**Then Phase 2 feature set** (pipeline, analytics engine, e-sign, payments, messaging) layered in by priority.

---

### Cross-cutting standards
- **Validation:** Zod schemas shared between server actions and forms.
- **Security:** Supabase RLS as the primary guard; never trust client role claims; least-privilege Storage policies; audit every privileged action.
- **Compliance:** Kenya (CMA) and Australia (ASIC/wholesale-investor) considerations flagged — legal review required before any public capital solicitation. *(Not legal advice; confirm with counsel in each jurisdiction.)*
- **Quality gate:** each section ships behind tests + an accessibility check before we move on.

---

*Next step: on your approval of this plan and schema, we begin Phase 0 + Phase 1 (the marketing site), building section by section.*
