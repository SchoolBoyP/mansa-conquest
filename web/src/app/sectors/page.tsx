import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { SectorCard } from "@/components/SectorCard";
import { SECTORS } from "@/lib/data";

export const metadata: Metadata = {
  title: "Investment Sectors",
  description:
    "Eight horizons of opportunity: real estate, tech start-ups, manufacturing, crypto & stocks, mining & exploration, fashion, logistics, and franchising & licensing.",
};

export default function SectorsPage() {
  return (
    <>
      <section className="pb-16 pt-40">
        <div className="container-x">
          <Reveal>
            <div className="mb-14 text-center">
              <span className="eyebrow justify-center">Investment Sectors</span>
              <h2 className="my-4 font-serif text-[clamp(2.1rem,4.5vw,3.4rem)]">Eight horizons of opportunity</h2>
              <p className="mx-auto max-w-2xl text-lg text-sand">
                A deliberately diversified strategy — spanning tangible assets, frontier resources, and
                the technologies shaping tomorrow.
              </p>
            </div>
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SECTORS.map((s, i) => (
              <Reveal key={s.slug} delay={(i % 3) * 0.08}>
                <SectorCard sector={s} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-x">
          <Reveal>
            <div className="relative overflow-hidden rounded-2xl border border-gold/30 p-14 text-center" style={{ background: "linear-gradient(135deg,rgba(15,81,50,.25),rgba(212,175,55,.08))" }}>
              <span className="eyebrow justify-center">Don&apos;t see your field?</span>
              <h2 className="my-3.5 font-serif text-[clamp(2rem,4vw,3rem)]">Special Inquiry &amp; Requests</h2>
              <p className="mx-auto mb-7 max-w-2xl text-lg text-sand">
                Through our SIR service, we conduct bespoke research and manage capital in virtually any
                domain using our proven venture capital expertise.
              </p>
              <Link href="/apply" className="btn btn-gold">Submit an inquiry →</Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
