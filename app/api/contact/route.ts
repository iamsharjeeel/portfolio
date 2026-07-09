import { Resend } from "resend";
import { buildContactNotificationEmail } from "@/lib/contact-email";

export const runtime = "nodejs";

const NOTIFY_TO = "iamsharjeeel@gmail.com";

type Body = {
  name?: string;
  email?: string;
  message?: string;
  project?: string;
  website?: string;
};

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
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
  const message = (body.message || "").trim();
  const project = (body.project || "").trim();

  if (name.length < 2 || name.length > 80) {
    return Response.json({ error: "Please enter your name." }, { status: 400 });
  }
  if (!isValidEmail(email) || email.length > 120) {
    return Response.json({ error: "Please enter a valid email." }, { status: 400 });
  }
  if (message.length < 10 || message.length > 4000) {
    return Response.json({ error: "Message should be at least 10 characters." }, { status: 400 });
  }
  if (project.length > 80) {
    return Response.json({ error: "Project type is too long." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return Response.json(
      { error: "Email is not configured yet. Set RESEND_API_KEY." },
      { status: 503 }
    );
  }

  const from =
    process.env.CONTACT_FROM_EMAIL ||
    "Sharjeel Portfolio <onboarding@resend.dev>";
  const to = process.env.CONTACT_NOTIFY_TO || NOTIFY_TO;
  const { subject, html, text } = buildContactNotificationEmail({
    name,
    email,
    message,
    project,
  });

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from,
    to: [to],
    replyTo: email,
    subject,
    html,
    text,
  });

  if (error) {
    return Response.json(
      { error: error.message || "Failed to send notification." },
      { status: 502 }
    );
  }

  return Response.json({ ok: true });
}
