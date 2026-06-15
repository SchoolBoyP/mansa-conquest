import type { Metadata } from "next";
import { ApplyForm } from "./ApplyForm";

export const metadata: Metadata = {
  title: "Apply to Invest",
  description: "Begin your investor application with Mansa Conquest. A short, multi-step form to start the conversation.",
};

export default function ApplyPage() {
  return (
    <section className="pb-16 pt-36">
      <div className="container-x mx-auto max-w-[760px]">
        <div className="mb-10 text-center">
          <span className="eyebrow justify-center">Investor Application</span>
          <h2 className="mb-3 mt-4 font-serif text-[clamp(1.9rem,4vw,2.8rem)]">Begin building your legacy</h2>
          <p className="mx-auto max-w-xl text-lg text-sand">A few details to start the conversation. Takes about three minutes.</p>
        </div>
        <ApplyForm />
      </div>
    </section>
  );
}
