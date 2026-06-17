"use server";

import { applicationSchema, type ApplicationInput } from "@/lib/validation";
import { prisma } from "@/lib/prisma";
import { sendApplicationEmails } from "@/lib/email";

export type SubmitResult = { ok: true } | { ok: false; error: string };

export async function submitApplication(data: ApplicationInput): Promise<SubmitResult> {
  const parsed = applicationSchema.safeParse(data);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid submission." };
  }
  const d = parsed.data;
  const fullName = `${d.firstName} ${d.lastName}`.trim();

  // Compose a readable summary into the Inquiry.message field (the Inquiry
  // model keeps one message; structured fields live here for now).
  const summary = [
    `Investor type: ${d.investorType}`,
    `Commitment: ${d.ticket}`,
    `Accredited: ${d.accredited || "—"}`,
    `Country: ${d.country}`,
    `Sectors of interest: ${d.sectors.join(", ")}`,
    d.message ? `Goals: ${d.message}` : null,
  ].filter(Boolean).join("\n");

  // Save to the database and notify by email independently, so a failure in one
  // never silently loses the inquiry. As long as at least one succeeds, the
  // applicant sees success.
  let dbOk = false;
  let emailOk = false;

  try {
    await prisma.inquiry.create({
      data: {
        type: "INVESTOR_INTEREST",
        status: "NEW",
        fullName,
        email: d.email,
        phone: d.phone || null,
        message: summary,
        source: "apply-form",
      },
    });
    dbOk = true;
  } catch (err) {
    console.error("Failed to persist inquiry:", err);
  }

  try {
    emailOk = await sendApplicationEmails({
      fullName,
      email: d.email,
      phone: d.phone,
      country: d.country,
      investorType: d.investorType,
      ticket: d.ticket,
      accredited: d.accredited,
      sectors: d.sectors,
      message: d.message,
    });
  } catch (err) {
    console.error("Failed to send application emails:", err);
  }

  if (!dbOk && !emailOk) {
    return { ok: false, error: "We couldn't submit your application. Please try again shortly." };
  }
  return { ok: true };
}
