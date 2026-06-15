import type { Sector } from "@/lib/data";

export function SectorCard({ sector }: { sector: Sector }) {
  return (
    <div className="group card-surface hover:-translate-y-1.5 hover:border-gold/45">
      <div className="mb-5 flex h-[52px] w-[52px] items-center justify-center rounded-xl border border-gold/25 bg-gold/10 text-2xl text-gold">
        {sector.icon}
      </div>
      <h3 className="mb-2.5 font-serif text-2xl">{sector.name}</h3>
      <p className="text-sm text-sand">{sector.desc}</p>
      <div className="mt-4 text-xs font-semibold tracking-wide text-gold opacity-0 transition group-hover:opacity-100">
        Strategic mandate →
      </div>
    </div>
  );
}
