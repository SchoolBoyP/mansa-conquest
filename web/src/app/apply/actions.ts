"use server";

import { applicationSchema, type ApplicationInput } from "@/lib/validation";

export type SubmitResult = { ok: true } | { ok: false; error: string };

export async function submitApplication(data: ApplicationInput): Promise<SubmitResult> {
  const parsed = applicationSchema.safeParse(data);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid submission." };
  }

  // TODO (portal phase):
  //   1. Persist as an Inquiry row via Prisma (type = INVESTOR_INTEREST).
  //   2. Send a notification email to CONTACT_INBOX via Resend.
  //   3. Send a confirmation email to the applicant.
  // For now we just log on the server.
  console.log("New investor application:", parsed.data);

  return { ok: true };
}
