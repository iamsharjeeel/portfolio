export const DEFAULT_LEAD_WEBHOOK_URL =
  "https://services.leadconnectorhq.com/hooks/ELmgviKqKUd3zxoPoph4/webhook-trigger/f50df772-6ff4-4794-8b4b-29a1a5382ff0";

export type LeadWebhookPayload = {
  source: "sharjeel.cc";
  page: "/contact" | "/book";
  type: "form" | "booking";
  name: string;
  email: string;
  phone: string;
  project: string;
  message?: string;
  date?: string;
  time?: string;
  timezone?: string;
  notes?: string;
  submittedAt: string;
};

export function leadWebhookUrl(): string {
  return process.env.LEAD_WEBHOOK_URL || DEFAULT_LEAD_WEBHOOK_URL;
}

export async function sendLeadWebhook(
  payload: LeadWebhookPayload
): Promise<{ ok: true } | { ok: false; error: string }> {
  try {
    const res = await fetch(leadWebhookUrl(), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      return {
        ok: false,
        error: text || `Webhook returned ${res.status}`,
      };
    }
    return { ok: true };
  } catch {
    return { ok: false, error: "Webhook request failed." };
  }
}

export function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function isValidPhone(value: string) {
  const digits = value.replace(/\D/g, "");
  return digits.length >= 7 && digits.length <= 15 && value.length <= 24;
}
