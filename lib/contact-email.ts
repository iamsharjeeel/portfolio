type ContactPayload = {
  name: string;
  email: string;
  message: string;
  project?: string;
};

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function buildContactNotificationEmail(payload: ContactPayload) {
  const name = escapeHtml(payload.name.trim());
  const email = escapeHtml(payload.email.trim());
  const message = escapeHtml(payload.message.trim()).replace(/\n/g, "<br/>");
  const project = payload.project?.trim()
    ? escapeHtml(payload.project.trim())
    : "—";
  const submittedAt = new Date().toLocaleString("en-US", {
    timeZone: "UTC",
    dateStyle: "medium",
    timeStyle: "short",
  });

  const subject = `New inquiry from ${payload.name.trim()} — sharjeel.cc`;

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${subject}</title>
</head>
<body style="margin:0;padding:0;background:#0A0A0A;color:#FAFAF8;font-family:Inter,Helvetica,Arial,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#0A0A0A;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#121212;border:1px solid rgba(250,250,248,0.09);">
          <tr>
            <td style="padding:28px 28px 18px;border-bottom:1px solid rgba(250,250,248,0.09);">
              <div style="font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:#8A8A85;">
                // New portfolio inquiry
              </div>
              <div style="margin-top:10px;font-size:28px;line-height:1.1;font-weight:900;letter-spacing:-0.03em;color:#FAFAF8;">
                SHARJEEL
              </div>
              <div style="margin-top:8px;font-size:13px;color:#8A8A85;">
                Someone reached out from the site.
              </div>
            </td>
          </tr>
          <tr>
            <td style="padding:24px 28px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:0 0 16px;">
                    <div style="font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:10px;letter-spacing:0.12em;text-transform:uppercase;color:#4A4A47;margin-bottom:6px;">Name</div>
                    <div style="font-size:16px;font-weight:600;color:#FAFAF8;">${name}</div>
                  </td>
                </tr>
                <tr>
                  <td style="padding:0 0 16px;">
                    <div style="font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:10px;letter-spacing:0.12em;text-transform:uppercase;color:#4A4A47;margin-bottom:6px;">Email</div>
                    <a href="mailto:${email}" style="font-size:16px;font-weight:600;color:#FF4D2E;text-decoration:none;">${email}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding:0 0 16px;">
                    <div style="font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:10px;letter-spacing:0.12em;text-transform:uppercase;color:#4A4A47;margin-bottom:6px;">Project type</div>
                    <div style="font-size:15px;color:#FAFAF8;">${project}</div>
                  </td>
                </tr>
                <tr>
                  <td style="padding:0;">
                    <div style="font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:10px;letter-spacing:0.12em;text-transform:uppercase;color:#4A4A47;margin-bottom:6px;">Message</div>
                    <div style="font-size:15px;line-height:1.6;color:#8A8A85;border-left:2px solid #FF4D2E;padding-left:14px;">${message}</div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:18px 28px 24px;border-top:1px solid rgba(250,250,248,0.09);">
              <a href="mailto:${email}?subject=Re:%20your%20note%20on%20sharjeel.cc" style="display:inline-block;background:#FF4D2E;color:#0A0A0A;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:11px;letter-spacing:0.1em;text-transform:uppercase;text-decoration:none;padding:12px 18px;font-weight:700;">
                Reply to ${name}
              </a>
              <div style="margin-top:16px;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:10px;letter-spacing:0.08em;text-transform:uppercase;color:#4A4A47;">
                Submitted ${submittedAt} UTC · sharjeel.cc
              </div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  const text = [
    "New portfolio inquiry",
    "",
    `Name: ${payload.name.trim()}`,
    `Email: ${payload.email.trim()}`,
    `Project: ${payload.project?.trim() || "—"}`,
    "",
    "Message:",
    payload.message.trim(),
    "",
    `Submitted ${submittedAt} UTC`,
  ].join("\n");

  return { subject, html, text };
}
