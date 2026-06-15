import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY;
const contactInbox = process.env.CONTACT_INBOX ?? "mansaconquest@gmail.com";

// Until a custom sending domain is verified in Resend, use their shared sender.
const FROM = "Mansa Conquest <onboarding@resend.dev>";

export type ApplicationEmail = {
  fullName: string;
  email: string;
  phone?: string;
  country: string;
  investorType: string;
  ticket: string;
  accredited?: string;
  sectors: string[];
  message?: string;
};

/**
 * Sends (1) a notification to the Mansa Conquest inbox and (2) a confirmation
 * to the applicant. Fails soft: returns false on error so the form still
 * succeeds for the user even if email delivery hiccups.
 */
export async function sendApplicationEmails(data: ApplicationEmail): Promise<boolean> {
  if (!resendApiKey) {
    console.warn("RESEND_API_KEY not set — skipping email send.");
    return false;
  }
  const resend = new Resend(resendApiKey);

  const rows = [
    ["Name", data.fullName],
    ["Email", data.email],
    ["Phone", data.phone || "—"],
    ["Country", data.country],
    ["Investor type", data.investorType],
    ["Commitment", data.ticket],
    ["Accredited", data.accredited || "—"],
    ["Sectors", data.sectors.join(", ") || "—"],
    ["Goals", data.message || "—"],
  ];
  const tableRows = rows
    .map(([k, v]) => `<tr><td style="padding:6px 14px 6px 0;color:#A89F8C">${k}</td><td style="padding:6px 0;color:#0B0B0C"><b>${escapeHtml(v)}</b></td></tr>`)
    .join("");

  try {
    await resend.emails.send({
      from: FROM,
      to: contactInbox,
      replyTo: data.email,
      subject: `New investor application — ${data.fullName}`,
      html: `<div style="font-family:Inter,Arial,sans-serif"><h2 style="color:#A8842A">New Investor Application</h2><table>${tableRows}</table></div>`,
    });

    await resend.emails.send({
      from: FROM,
      to: data.email,
      subject: "We received your application — Mansa Conquest",
      html: `<div style="font-family:Inter,Arial,sans-serif;color:#0B0B0C">
        <h2 style="color:#A8842A">Thank you, ${escapeHtml(data.fullName.split(" ")[0] || "there")}</h2>
        <p>We've received your application to invest with <b>Mansa Conquest</b>. Our investor relations team will be in touch shortly to discuss building your legacy with us.</p>
        <p style="color:#A89F8C;font-size:13px">Building Legacies Through Strategic Investments · Kenya &amp; Australia</p>
      </div>`,
    });
    return true;
  } catch (err) {
    console.error("Resend email error:", err);
    return false;
  }
}

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!));
}
