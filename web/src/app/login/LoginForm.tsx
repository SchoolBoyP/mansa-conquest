"use client";

import Link from "next/link";
import { useState } from "react";
import { Crest } from "@/components/Crest";

export function LoginForm() {
  const [tab, setTab] = useState<"login" | "magic">("login");

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pb-16 pt-32">
      <div className="pointer-events-none absolute -top-24 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(212,175,55,.16),transparent_70%)] blur-3xl" />
      <div className="relative z-10 w-full max-w-md rounded-2xl border border-line p-11" style={{ background: "linear-gradient(160deg,#141416,#0e0e10)" }}>
        <Link href="/" className="mb-6 flex items-center gap-3 font-serif text-lg font-bold">
          <Crest /> Mansa Conquest
        </Link>

        <div className="mb-6 flex gap-2 rounded-xl bg-graphite p-1.5">
          {(["login", "magic"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 rounded-lg py-2.5 text-sm font-semibold transition ${
                tab === t ? "bg-obsidian text-gold" : "text-sand"
              }`}
            >
              {t === "login" ? "Sign in" : "Magic link"}
            </button>
          ))}
        </div>

        {tab === "login" ? (
          <div>
            <h2 className="font-serif text-3xl">Investor Portal</h2>
            <p className="mb-7 mt-1 text-sm text-sand">Welcome back. Access your dashboard, documents and reports.</p>
            <Field label="Email" type="email" placeholder="you@example.com" />
            <Field label="Password" type="password" placeholder="••••••••" />
            <button className="btn btn-gold w-full justify-center" type="button">Sign in securely</button>
            <p className="mt-4 text-center text-xs text-sand">Protected by multi-factor authentication.</p>
          </div>
        ) : (
          <div>
            <h2 className="font-serif text-3xl">Magic Link</h2>
            <p className="mb-7 mt-1 text-sm text-sand">We&apos;ll email you a secure one-time sign-in link.</p>
            <Field label="Email" type="email" placeholder="you@example.com" />
            <button className="btn btn-gold w-full justify-center" type="button">Send magic link</button>
          </div>
        )}

        <div className="my-6 flex items-center gap-3.5 text-xs text-sand">
          <span className="h-px flex-1 bg-line" />New to Mansa Conquest?<span className="h-px flex-1 bg-line" />
        </div>
        <Link href="/apply" className="btn btn-ghost w-full justify-center">Apply to Invest</Link>
      </div>
    </section>
  );
}

function Field({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="mb-5">
      <label className="mb-2 block text-xs tracking-wide text-sand">{label}</label>
      <input className="field-input" {...props} />
    </div>
  );
}
