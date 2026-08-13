import { Resend } from "resend";
import { buildBookingNotificationEmail } from "@/lib/contact-email";
import {
  isValidEmail,
  isValidPhone,
  sendLeadWebhook,
} from "@/lib/lead-webhook";

export const runtime = "nodejs";

const NOTIFY_TO = "iamsharjeeel@gmail.com";

type Body = {
  name?: string;
  email?: string;
  phone?: string;
  project?: string;
  date?: string;
  time?: string;
  timezone?: string;
  notes?: string;
  website?: string;
};

function isValidDate(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const parsed = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(parsed.getTime());
}

function isValidTime(value: string) {
  return /^([01]\d|2[0-3]):[0-5]\d$/.test(value);
}

async function sendResendNotice(input: {
  name: string;
  email: string;
  phone: string;
  project: string;
  date: string;
  time: string;
  timezone: string;
  notes: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return;
  const from =
    process.env.CONTACT_FROM_EMAIL ||
    "Sharjeel Portfolio <onboarding@resend.dev>";
  const to = process.env.CONTACT_NOTIFY_TO || NOTIFY_TO;
  const { subject, html, text } = buildBookingNotificationEmail(input);
  const resend = new Resend(apiKey);
  await resend.emails.send({
    from,
    to: [to],
    replyTo: input.email,
    subject,
    html,
    text,
  });
}

export async function POST(request: Request) {
  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return Response.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  if (body.website) {
    return Response.json({ ok: true });
  }

  const name = (body.name || "").trim();
  const email = (body.email || "").trim();
  const phone = (body.phone || "").trim();
  const project = (body.project || "").trim();
  const date = (body.date || "").trim();
  const time = (body.time || "").trim();
  const timezone = (body.timezone || "").trim();
  const notes = (body.notes || "").trim();

  if (name.length < 2 || name.length > 80) {
    return Response.json({ error: "Please enter your name." }, { status: 400 });
  }
  if (!isValidEmail(email) || email.length > 120) {
    return Response.json({ error: "Please enter a valid email." }, { status: 400 });
  }
  if (!isValidPhone(phone)) {
    return Response.json({ error: "Please enter a valid phone number." }, { status: 400 });
  }
  if (project.length > 80) {
    return Response.json({ error: "Project type is too long." }, { status: 400 });
  }
  if (!isValidDate(date)) {
    return Response.json({ error: "Please choose a date." }, { status: 400 });
  }
  if (!isValidTime(time)) {
    return Response.json({ error: "Please choose a time." }, { status: 400 });
  }
  if (timezone.length < 2 || timezone.length > 80) {
    return Response.json({ error: "Missing timezone." }, { status: 400 });
  }
  if (notes.length > 4000) {
    return Response.json({ error: "Notes are too long." }, { status: 400 });
  }

  const webhook = await sendLeadWebhook({
    source: "sharjeel.cc",
    page: "/book",
    type: "booking",
    name,
    email,
    phone,
    project,
    date,
    time,
    timezone,
    notes,
    submittedAt: new Date().toISOString(),
  });

  if (!webhook.ok) {
    return Response.json(
      { error: "Could not send your booking request. Try again." },
      { status: 502 }
    );
  }

  try {
    await sendResendNotice({
      name,
      email,
      phone,
      project,
      date,
      time,
      timezone,
      notes,
    });
  } catch {}

  return Response.json({ ok: true });
}
