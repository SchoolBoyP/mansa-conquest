import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "About",
  description:
    "Inspired by Mansa Musa, Mansa Conquest is a venture capital firm building enduring legacies through diversified, disciplined investment across Kenya and Australia.",
};

export default function AboutPage() {
  return (
    <>
      <section className="px-0 pb-16 pt-40">
        <div className="container-x">
          <Reveal>
            <div className="mb-14 max-w-3xl">
              <span className="eyebrow">About Mansa Conquest</span>
              <h2 className="my-4 font-serif text-[clamp(2.1rem,4.5vw,3.4rem)]">
                The legacy of an empire, reimagined for modern wealth
              </h2>
              <p className="text-lg text-sand">
                Inspired by Mansa Musa, the legendary ruler whose wealth shaped empires, Mansa Conquest
                is a venture capital firm dedicated to conquering new horizons in wealth creation.
              </p>
            </div>
          </Reveal>

          <div className="grid items-center gap-16 lg:grid-cols-[1.05fr_.95fr]">
            <Reveal>
              <div>
                <p className="mb-5 text-[1.05rem]">
                  We harness the power of share funding from visionary investors to fuel innovative
                  research and strategic investments across a diverse portfolio. From real estate and
                  manufacturing to crypto, mining, fashion, logistics, and franchising, we seek
                  opportunities that blend profitability with purpose.
                </p>
                <p className="text-sand">
                  With a global outlook and a commitment to excellence, Mansa Conquest empowers
                  entrepreneurs and investors alike to forge their own paths to greatness. Our mission is
                  simple and enduring: build legacies that last.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.16}>
              <div className="rounded-2xl border border-line p-10" style={{ background: "linear-gradient(160deg,#141416,#0e0e10)" }}>
                <h3 className="mb-4 font-serif text-2xl">Our presence</h3>
                {[
                  ["🇰🇪 Kenya", "East African operations"],
                  ["🇦🇺 Australia", "Asia-Pacific operations"],
                  ["Structure", "Private investment fund"],
                  ["Founded on", "Legacy & diligence"],
                ].map(([k, v], i, arr) => (
                  <div key={k} className={`flex justify-between py-4 text-[0.95rem] ${i < arr.length - 1 ? "border-b border-line" : ""}`}>
                    <span className="text-sand">{k}</span>
                    <span className="font-semibold text-gold">{v}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16">
        <div className="container-x">
          <Reveal>
            <div className="mb-14 text-center">
              <span className="eyebrow justify-center">Our Values</span>
              <h2 className="mt-4 font-serif text-[clamp(2rem,4vw,3rem)]">Principles that endure</h2>
            </div>
          </Reveal>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              ["Legacy First", "We invest on generational horizons, prioritizing durable value over fleeting gains."],
              ["Profit with Purpose", "Every mandate blends return with meaningful resource and community development."],
              ["Bold Diligence", "The courage to enter frontier markets, tempered by institutional rigor and governance."],
            ].map(([t, d], i) => (
              <Reveal key={t} delay={i * 0.08}>
                <div className="border-l-2 border-gold p-7" style={{ background: "linear-gradient(90deg,rgba(212,175,55,.05),transparent)" }}>
                  <h4 className="mb-2 font-serif text-xl text-ivory">{t}</h4>
                  <p className="text-sm text-sand">{d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Journey + leadership */}
      <section className="py-16">
        <div className="container-x grid gap-16 lg:grid-cols-2">
          <Reveal>
            <div>
              <span className="eyebrow">Our Journey</span>
              <h2 className="my-4 font-serif text-[clamp(2rem,4vw,2.8rem)]">From vision to empire</h2>
              <div className="relative pl-8" style={{ borderLeft: "none" }}>
                {[
                  ["Origins", "Founded on the conviction that diversified, disciplined capital can build lasting legacies."],
                  ["Today", "Operating across Kenya and Australia, deploying capital across eight strategic sectors."],
                  ["Tomorrow", "Scaling a diversified portfolio and bespoke SIR mandates into a global investment platform."],
                ].map(([yr, d]) => (
                  <div key={yr} className="relative mb-8 border-l border-gold/40 pl-6">
                    <span className="absolute -left-[7px] top-1.5 h-3 w-3 rounded-full border-2 border-gold bg-obsidian" />
                    <div className="font-serif text-xl text-gold">{yr}</div>
                    <p className="text-sm text-sand">{d}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.16}>
            <div>
              <span className="eyebrow">Leadership</span>
              <h2 className="my-4 font-serif text-[clamp(2rem,4vw,2.8rem)]">Stewards of capital</h2>
              <div className="grid grid-cols-2 gap-6">
                {[
                  ["MC", "General Partner", "Founder & GP", "Sets investment strategy and stewards partner capital."],
                  ["IR", "Investor Relations", "Partner Relations", "Guides LPs through onboarding, reporting and mandates."],
                ].map(([initials, name, role, d]) => (
                  <div key={name}>
                    <div className="mb-4 flex aspect-square items-center justify-center rounded-2xl border border-line font-serif text-5xl text-gold" style={{ background: "linear-gradient(160deg,#1e1e22,#141416)" }}>
                      {initials}
                    </div>
                    <h4 className="font-serif text-lg">{name}</h4>
                    <div className="mb-2 text-xs tracking-wide text-gold">{role}</div>
                    <p className="text-sm text-sand">{d}</p>
                  </div>
                ))}
              </div>
              <p className="mt-3.5 text-xs text-sand">Team profiles shown as placeholders — ready for real bios.</p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
