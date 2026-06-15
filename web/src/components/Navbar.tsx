"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Crest } from "./Crest";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/sectors", label: "Sectors" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/apply", label: "Apply" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${
        scrolled ? "border-line bg-obsidian/80 backdrop-blur-md" : "border-transparent"
      }`}
    >
      <div className="container-x flex h-[78px] items-center justify-between">
        <Link href="/" className="flex items-center gap-3 font-serif text-xl font-bold tracking-wide">
          <Crest />
          Mansa Conquest
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`relative text-sm font-medium tracking-wide transition ${
                  active ? "text-ivory" : "text-sand hover:text-ivory"
                }`}
              >
                {l.label}
                {active && <span className="absolute -bottom-1 left-0 h-px w-full bg-gold" />}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3.5">
          <Link href="/login" className="btn btn-ghost hidden sm:inline-flex">
            Investor Login
          </Link>
          <Link href="/apply" className="btn btn-gold hidden sm:inline-flex">
            Apply to Invest
          </Link>
          <button
            className="p-2 md:hidden"
            aria-label="Toggle menu"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="text-ivory" /> : <Menu className="text-ivory" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-b border-line bg-obsidian/95 px-6 py-4 backdrop-blur-md md:hidden">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="border-b border-line py-3 text-sand">
              {l.label}
            </Link>
          ))}
          <Link href="/login" className="py-3 text-gold">
            Investor Login
          </Link>
        </nav>
      )}
    </header>
  );
}
