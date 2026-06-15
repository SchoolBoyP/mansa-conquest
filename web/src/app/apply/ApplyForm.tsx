"use client";

import Link from "next/link";
import { useState } from "react";
import { SECTORS } from "@/lib/data";
import { applicationSchema } from "@/lib/validation";
import { submitApplication } from "./actions";

type Form = {
  firstName: string; lastName: string; email: string; phone: string; country: string;
  investorType: string; ticket: string; accredited: string;
  sectors: string[]; message: string; consent: boolean;
};

const EMPTY: Form = {
  firstName: "", lastName: "", email: "", phone: "", country: "",
  investorType: "", ticket: "", accredited: "", sectors: [], message: "", consent: false,
};

const STEP_LABELS = ["About you", "Investor profile", "Interests", "Review"];
const COUNTRIES = ["Kenya", "Australia", "United Kingdom", "United States", "United Arab Emirates", "Other"];
const INVESTOR_TYPES = [
  ["Individual", "Personal investment"],
  ["Entity / Company", "Corporate vehicle"],
  ["Trust / SMSF", "Trust or super fund"],
  ["Institutional", "Fund / family office"],
];
const TICKETS = ["Under $50,000", "$50,000 – $250,000", "$250,000 – $1,000,000", "$1,000,000 – $5,000,000", "$5,000,000+"];

export function ApplyForm() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<Form>(EMPTY);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const set = <K extends keyof Form>(k: K, v: Form[K]) => setForm((f) => ({ ...f, [k]: v }));
  const toggleSector = (name: string) =>
    setForm((f) => ({ ...f, sectors: f.sectors.includes(name) ? f.sectors.filter((s) => s !== name) : [...f.sectors, name] }));

  function validateStep(n: number): boolean {
    const e: Record<string, string> = {};
    if (n === 1) {
      if (!form.firstName) e.firstName = "Please enter your first name.";
      if (!form.lastName) e.lastName = "Please enter your last name.";
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) e.email = "Please enter a valid email.";
      if (!form.country) e.country = "Please select your country.";
    }
    if (n === 2) {
      if (!form.investorType) e.investorType = "Please choose an investor type.";
      if (!form.ticket) e.ticket = "Please select a commitment range.";
    }
    if (n === 3) {
      if (form.sectors.length === 0) e.sectors = "Select at least one sector.";
      if (!form.consent) e.consent = "Please provide consent to continue.";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function next() {
    if (step <= 3 && !validateStep(step)) return;
    if (step < 4) { setStep(step + 1); return; }
    // submit
    const parsed = applicationSchema.safeParse(form);
    if (!parsed.success) { setErrors({ form: parsed.error.issues[0]?.message ?? "Invalid." }); return; }
    setSubmitting(true);
    const res = await submitApplication(parsed.data);
    setSubmitting(false);
    if (res.ok) setDone(true);
    else setErrors({ form: res.error });
  }

  if (done) {
    return (
      <div className="rounded-2xl border border-line p-8 text-center" style={{ background: "linear-gradient(160deg,#141416,#0e0e10)" }}>
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border-2 border-[#3FA66A] bg-[#3FA66A]/10 text-4xl text-[#3FA66A]">✓</div>
        <h2 className="mb-3 font-serif text-3xl">Application received</h2>
        <p className="mx-auto mb-7 max-w-md text-lg text-sand">
          Thank you. Our investor relations team will be in touch shortly to discuss your legacy with Mansa Conquest.
        </p>
        <Link href="/" className="btn btn-gold">Return home</Link>
      </div>
    );
  }

  const progress = ((Math.min(step, 4) - 1) / 3) * 100;

  return (
    <div>
      {/* Stepper */}
      <div className="relative mb-10 flex justify-between">
        <div className="absolute left-0 top-[18px] h-0.5 w-full bg-line" />
        <div className="absolute left-0 top-[18px] h-0.5 bg-gradient-to-r from-gold-deep to-gold-bright transition-all duration-500" style={{ width: `${progress}%` }} />
        {STEP_LABELS.map((label, i) => {
          const n = i + 1;
          const active = step === n, doneStep = step > n;
          return (
            <div key={label} className="relative z-10 flex-1 text-center">
              <div className={`mx-auto mb-2.5 flex h-[38px] w-[38px] items-center justify-center rounded-full border-2 text-sm font-semibold transition ${
                doneStep ? "border-gold bg-gold text-[#1a1407]" : active ? "border-gold text-gold ring-4 ring-gold/10" : "border-line bg-graphite text-sand"
              }`}>{doneStep ? "✓" : n}</div>
              <div className={`hidden text-xs tracking-wide sm:block ${active ? "text-ivory" : "text-sand"}`}>{label}</div>
            </div>
          );
        })}
      </div>

      {/* Step 1 */}
      {step === 1 && (
        <div>
          <div className="grid gap-4.5 sm:grid-cols-2" style={{ gap: "1.125rem" }}>
            <TextField label="First name" req value={form.firstName} onChange={(v) => set("firstName", v)} error={errors.firstName} placeholder="Mansa" />
            <TextField label="Last name" req value={form.lastName} onChange={(v) => set("lastName", v)} error={errors.lastName} placeholder="Musa" />
          </div>
          <TextField label="Email address" req type="email" value={form.email} onChange={(v) => set("email", v)} error={errors.email} placeholder="you@example.com" />
          <div className="grid gap-[1.125rem] sm:grid-cols-2">
            <TextField label="Phone" value={form.phone} onChange={(v) => set("phone", v)} placeholder="+61 / +254 ..." />
            <SelectField label="Country / Region" req value={form.country} onChange={(v) => set("country", v)} error={errors.country} options={COUNTRIES} />
          </div>
        </div>
      )}

      {/* Step 2 */}
      {step === 2 && (
        <div>
          <div className="mb-5">
            <Label req>Investor type</Label>
            <div className="grid gap-3.5 sm:grid-cols-2">
              {INVESTOR_TYPES.map(([t, d]) => (
                <label key={t} className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition ${form.investorType === t ? "border-gold bg-gold/[.06]" : "border-line hover:border-gold/40"}`}>
                  <input type="radio" name="investorType" className="mt-1 accent-gold" checked={form.investorType === t} onChange={() => set("investorType", t)} />
                  <span><span className="block text-[0.92rem] font-medium text-ivory">{t}</span><span className="block text-xs text-sand">{d}</span></span>
                </label>
              ))}
            </div>
            {errors.investorType && <ErrMsg>{errors.investorType}</ErrMsg>}
          </div>
          <SelectField label="Intended commitment range" req value={form.ticket} onChange={(v) => set("ticket", v)} error={errors.ticket} options={TICKETS} />
          <SelectField label="Accredited / wholesale / sophisticated investor?" value={form.accredited} onChange={(v) => set("accredited", v)} options={["Yes", "No", "Unsure"]} placeholder="Prefer not to say" />
        </div>
      )}

      {/* Step 3 */}
      {step === 3 && (
        <div>
          <div className="mb-5">
            <Label req>Which sectors interest you most?</Label>
            <div className="grid gap-2.5 sm:grid-cols-2">
              {SECTORS.map((s) => (
                <label key={s.slug} className={`flex cursor-pointer items-center gap-2.5 rounded-lg border p-3 transition ${form.sectors.includes(s.name) ? "border-gold bg-gold/[.06]" : "border-line hover:border-gold/40"}`}>
                  <input type="checkbox" className="accent-gold" checked={form.sectors.includes(s.name)} onChange={() => toggleSector(s.name)} />
                  <span className="text-sm text-ivory">{s.icon} {s.name}</span>
                </label>
              ))}
            </div>
            {errors.sectors && <ErrMsg>{errors.sectors}</ErrMsg>}
          </div>
          <div className="mb-5">
            <Label>Tell us about your goals (optional)</Label>
            <textarea className="field-input" rows={4} value={form.message} onChange={(e) => set("message", e.target.value)} placeholder="What legacy are you looking to build? Any specific opportunities or a Special Inquiry?" />
          </div>
          <label className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 ${errors.consent ? "border-[#D04545]" : "border-line"}`}>
            <input type="checkbox" className="mt-1 accent-gold" checked={form.consent} onChange={(e) => set("consent", e.target.checked)} />
            <span className="text-xs text-sand">I consent to Mansa Conquest contacting me about investment opportunities. <span className="text-gold">*</span></span>
          </label>
          {errors.consent && <ErrMsg>{errors.consent}</ErrMsg>}
        </div>
      )}

      {/* Step 4 */}
      {step === 4 && (
        <div>
          <h3 className="mb-4 font-serif text-2xl">Review your application</h3>
          <div className="rounded-xl border border-line bg-graphite p-6">
            {[
              ["Name", `${form.firstName} ${form.lastName}`],
              ["Email", form.email],
              ["Phone", form.phone || "—"],
              ["Country", form.country],
              ["Investor type", form.investorType],
              ["Commitment", form.ticket],
              ["Accredited", form.accredited || "—"],
              ["Sectors", form.sectors.join(", ") || "—"],
              ["Goals", form.message || "—"],
            ].map(([k, v], i, arr) => (
              <div key={k} className={`flex justify-between gap-6 py-3 text-sm ${i < arr.length - 1 ? "border-b border-line" : ""}`}>
                <b className="text-ivory">{k}</b><span className="text-right text-gold">{v}</span>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-sand">
            By submitting, your details are captured as an inquiry and routed to the Mansa Conquest team via a secure server action + email notification.
          </p>
          {errors.form && <ErrMsg>{errors.form}</ErrMsg>}
        </div>
      )}

      {/* Nav */}
      <div className="mt-8 flex justify-between">
        <button type="button" onClick={() => setStep((s) => Math.max(1, s - 1))} className={`btn btn-ghost ${step === 1 ? "invisible" : ""}`}>← Back</button>
        <button type="button" onClick={next} disabled={submitting} className="btn btn-gold disabled:opacity-60">
          {submitting ? "Submitting…" : step === 4 ? "Submit application ✓" : "Continue →"}
        </button>
      </div>
    </div>
  );
}

/* ---- small field primitives ---- */
function Label({ children, req }: { children: React.ReactNode; req?: boolean }) {
  return <label className="mb-2 block text-xs tracking-wide text-sand">{children} {req && <span className="text-gold">*</span>}</label>;
}
function ErrMsg({ children }: { children: React.ReactNode }) {
  return <p className="mt-1.5 text-xs text-[#D04545]">{children}</p>;
}
function TextField({ label, value, onChange, error, req, type = "text", placeholder }: {
  label: string; value: string; onChange: (v: string) => void; error?: string; req?: boolean; type?: string; placeholder?: string;
}) {
  return (
    <div className="mb-5">
      <Label req={req}>{label}</Label>
      <input type={type} className={`field-input ${error ? "border-[#D04545]" : ""}`} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} />
      {error && <ErrMsg>{error}</ErrMsg>}
    </div>
  );
}
function SelectField({ label, value, onChange, error, req, options, placeholder = "Select…" }: {
  label: string; value: string; onChange: (v: string) => void; error?: string; req?: boolean; options: string[]; placeholder?: string;
}) {
  return (
    <div className="mb-5">
      <Label req={req}>{label}</Label>
      <select className={`field-input ${error ? "border-[#D04545]" : ""}`} value={value} onChange={(e) => onChange(e.target.value)}>
        <option value="">{placeholder}</option>
        {options.map((o) => <option key={o}>{o}</option>)}
      </select>
      {error && <ErrMsg>{error}</ErrMsg>}
    </div>
  );
}
