import Link from "next/link";
import { Crest } from "./Crest";

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-line bg-[#08080a] pb-8 pt-16">
      <div className="container-x">
        <div className="mb-12 grid gap-10 md:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" className="flex items-center gap-3 font-serif text-xl font-bold">
              <Crest /> Mansa Conquest
            </Link>
            <p className="mt-4 max-w-xs text-sm text-sand">
              Building legacies through strategic investments. A diversified venture capital and
              private investment fund operating across Kenya and Australia.
            </p>
          </div>
          <FootCol title="Explore" links={[["Home", "/"], ["About", "/about"], ["Sectors", "/sectors"], ["Portfolio", "/portfolio"]]} />
          <FootCol title="Invest" links={[["Apply to Invest", "/apply"], ["Special Inquiry (SIR)", "/apply"], ["Investor Login", "/login"]]} />
          <div>
            <h5 className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-sand">Contact</h5>
            <a href="mailto:mansaconquest@gmail.com" className="block py-1.5 text-sm text-sand hover:text-gold">mansaconquest@gmail.com</a>
            <a href="tel:+61406339104" className="block py-1.5 text-sm text-sand hover:text-gold">+61 406 339 104 (AU)</a>
            <a href="tel:+254703144338" className="block py-1.5 text-sm text-sand hover:text-gold">+254 703 144 338 (KE)</a>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line pt-6 text-sm text-sand">
          <span>© {new Date().getFullYear()} Mansa Conquest. All rights reserved.</span>
          <span>Operating in 🇰🇪 Kenya &amp; 🇦🇺 Australia · Capital at risk</span>
        </div>
      </div>
    </footer>
  );
}

function FootCol({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div>
      <h5 className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-sand">{title}</h5>
      {links.map(([label, href]) => (
        <Link key={label + href} href={href} className="block py-1.5 text-sm text-sand hover:text-gold">
          {label}
        </Link>
      ))}
    </div>
  );
}
