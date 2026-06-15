import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { PORTFOLIO } from "@/lib/data";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "A glimpse of the diversified ventures across Mansa Conquest's sectors. Illustrative placeholders — full portfolio coming soon.",
};

export default function PortfolioPage() {
  return (
    <section className="pb-16 pt-40">
      <div className="container-x">
        <Reveal>
          <div className="mb-10 text-center">
            <span className="eyebrow justify-center">Portfolio</span>
            <h2 className="my-4 font-serif text-[clamp(2.1rem,4.5vw,3.4rem)]">Where capital meets conquest</h2>
            <p className="mx-auto max-w-2xl text-lg text-sand">A glimpse of the diversified ventures across our sectors.</p>
          </div>
        </Reveal>

        <Reveal>
          <div className="mb-10 rounded-xl border border-dashed border-gold/40 px-6 py-4 text-center text-sm text-sand" style={{ background: "linear-gradient(135deg,rgba(212,175,55,.12),rgba(15,81,50,.15))" }}>
            ✦ Illustrative placeholders — sample companies shown to demonstrate layout. Real portfolio coming soon.
          </div>
        </Reveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PORTFOLIO.map((p, i) => (
            <Reveal key={p.name} delay={(i % 3) * 0.08}>
              <div className="overflow-hidden rounded-2xl border border-line transition hover:-translate-y-1.5 hover:border-gold/40" style={{ background: "linear-gradient(160deg,#141416,#1e1e22)" }}>
                <div className="flex h-36 items-center justify-center border-b border-line font-serif text-3xl text-gold" style={{ background: "radial-gradient(circle at 50% 0%,rgba(212,175,55,.12),transparent 70%)" }}>
                  {p.logo}
                </div>
                <div className="p-6">
                  <div className="text-xs uppercase tracking-widest text-gold">{p.sector}</div>
                  <h4 className="my-1.5 font-serif text-xl">{p.name}</h4>
                  <p className="text-sm text-sand">{p.desc}</p>
                  <div className="mt-4 flex justify-between border-t border-line pt-3.5 text-xs text-sand">
                    <span>Stage<br /><b className="font-serif text-base text-ivory">{p.stage}</b></span>
                    <span className="text-right">Region<br /><b className="font-serif text-base text-ivory">{p.geo}</b></span>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="mx-auto mb-6 max-w-xl text-lg text-sand">Interested in co-investing alongside Mansa Conquest?</p>
          <Link href="/apply" className="btn btn-gold">Apply to Invest</Link>
        </div>
      </div>
    </section>
  );
}
