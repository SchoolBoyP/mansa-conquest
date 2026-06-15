import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { SectorCard } from "@/components/SectorCard";
import { SECTORS } from "@/lib/data";

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-screen items-center overflow-hidden pt-[78px]">
        <div className="pointer-events-none absolute -right-20 -top-32 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(212,175,55,.22),transparent_70%)] blur-3xl" />
        <div className="pointer-events-none absolute -bottom-40 -left-32 h-[480px] w-[480px] rounded-full bg-[radial-gradient(circle,rgba(15,81,50,.35),transparent_70%)] blur-3xl" />
        <div className="container-x relative max-w-[900px]">
          <Reveal>
            <span className="eyebrow">Diversified Venture Capital · Kenya &amp; Australia</span>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="my-6 font-serif text-[clamp(2.8rem,7vw,5.6rem)] font-semibold leading-[1.02]">
              Building Legacies Through <span className="text-shimmer animate-shine">Strategic Investments</span>
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mb-9 max-w-2xl text-xl text-sand">
              Inspired by Mansa Musa — whose wealth shaped empires — we conquer new horizons in wealth
              creation through innovative investment and resource development across eight sectors.
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="flex flex-wrap gap-4">
              <Link href="/apply" className="btn btn-gold">Apply to Invest →</Link>
              <Link href="/sectors" className="btn btn-ghost">Explore Sectors</Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16">
        <div className="container-x">
          <div className="grid grid-cols-2 gap-8 border-y border-line py-12 md:grid-cols-4">
            {[
              ["8", "Investment Sectors"],
              ["2", "Global Jurisdictions"],
              ["360°", "Diversified Strategy"],
              ["∞", "Legacy Horizon"],
            ].map(([n, l], i) => (
              <Reveal key={l} delay={i * 0.08}>
                <div>
                  <div className="font-serif text-[clamp(2.2rem,4vw,3.2rem)] font-semibold leading-none text-gold">{n}</div>
                  <div className="mt-2 text-sm tracking-wide text-sand">{l}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Sectors preview */}
      <section className="py-24">
        <div className="container-x">
          <Reveal>
            <div className="mb-14 max-w-3xl">
              <span className="eyebrow">Our Mandate</span>
              <h2 className="my-4 font-serif text-[clamp(2.1rem,4.5vw,3.4rem)]">A diversified empire of opportunity</h2>
              <p className="text-lg text-sand">
                We harness share funding from visionary investors to fuel innovative research and
                strategic investments — blending profitability with purpose across a deliberately
                diverse portfolio.
              </p>
            </div>
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {SECTORS.slice(0, 4).map((s, i) => (
              <Reveal key={s.slug} delay={(i % 4) * 0.08}>
                <SectorCard sector={s} />
              </Reveal>
            ))}
          </div>
          <div className="mt-11 text-center">
            <Link href="/sectors" className="btn btn-ghost">View all eight sectors →</Link>
          </div>
        </div>
      </section>

      {/* Why split */}
      <section className="py-16">
        <div className="container-x grid items-center gap-16 lg:grid-cols-[1.05fr_.95fr]">
          <Reveal>
            <div>
              <span className="eyebrow">Why Mansa Conquest</span>
              <h2 className="my-4 font-serif text-[clamp(2rem,4vw,3rem)]">Discipline of an institution. Vision of a conqueror.</h2>
              <p className="mb-6 text-sand">
                We pair rigorous diligence and governance with the boldness to enter frontier
                opportunities others overlook — from rare-earth exploration to emerging technology ventures.
              </p>
              <p className="text-sand">
                With operations spanning East Africa and Australia, our global outlook turns regional
                advantage into enduring, cross-border value for our partners.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.16}>
            <div className="relative overflow-hidden rounded-2xl border border-line p-10" style={{ background: "linear-gradient(160deg,#141416,#0e0e10)" }}>
              {[
                ["Investment philosophy", "Profit with purpose"],
                ["Portfolio approach", "Diversified · 8 sectors"],
                ["Presence", "Kenya · Australia"],
                ["Bespoke mandates", "SIR service"],
                ["Horizon", "Generational"],
              ].map(([k, v], i, arr) => (
                <div key={k} className={`flex justify-between py-4 text-[0.95rem] ${i < arr.length - 1 ? "border-b border-line" : ""}`}>
                  <span className="text-sand">{k}</span>
                  <span className="font-semibold text-gold">{v}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* SIR */}
      <section className="py-16">
        <div className="container-x">
          <Reveal>
            <div className="relative overflow-hidden rounded-2xl border border-gold/30 p-14 text-center" style={{ background: "linear-gradient(135deg,rgba(15,81,50,.25),rgba(212,175,55,.08))" }}>
              <span className="eyebrow justify-center">Special Inquiry &amp; Requests</span>
              <h2 className="my-3.5 font-serif text-[clamp(2rem,4vw,3rem)]">Beyond our sectors lies your vision</h2>
              <p className="mx-auto mb-7 max-w-2xl text-lg text-sand">
                Our SIR service offers bespoke research and investment management for any field — an
                emerging industry we don&apos;t yet specialize in, or a unique project within our existing
                sectors. Entrust us to turn your vision into actionable, legacy-building investments.
              </p>
              <Link href="/apply" className="btn btn-gold">Start a special inquiry →</Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="container-x text-center">
          <Reveal>
            <h2 className="mx-auto mb-5 max-w-3xl font-serif text-[clamp(2rem,4.5vw,3.4rem)]">
              Forge your legacy with Mansa Conquest
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mx-auto mb-8 max-w-xl text-lg text-sand">
              Open to visionary investors ready to build wealth that endures.
            </p>
          </Reveal>
          <Reveal delay={0.16}>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/apply" className="btn btn-gold">Apply to Invest</Link>
              <Link href="/login" className="btn btn-ghost">Investor Login</Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
