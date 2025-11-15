// /api/contact.js  (ESM, works with "type": "module" in package.json)
export default async function handler(req, res) {
  // Always return JSON
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    // Lazy-import nodemailer so we can return a JSON error if it's not installed
    let nodemailer;
    try {
      nodemailer = (await import("nodemailer")).default;
    } catch (err) {
      console.error(
        "Dependency error: nodemailer not found",
        err?.message || err
      );
      return res.status(500).json({
        error: "Server misconfiguration: missing dependency 'nodemailer'",
        hint: "run `npm install nodemailer` and redeploy",
      });
    }

    // Normalize body (some hosts may pass a raw string)
    let body = req.body;
    if (typeof body === "string") {
      try {
        body = JSON.parse(body);
      } catch (err) {
        console.error("Invalid JSON body:", err?.message || err);
        return res.status(400).json({ error: "Invalid JSON body" });
      }
    }

    const { name, email, phone, budget, service, message, hp } = body || {};

    // Basic validation
    if (hp) return res.status(400).json({ error: "Bot detected" });
    if (!name || !email || !message)
      return res.status(400).json({ error: "Missing required fields" });

    // Required envs
    const requiredEnvs = [
      "SMTP_HOST",
      "SMTP_PORT",
      "SMTP_SECURE",
      "SMTP_USER",
      "SMTP_PASS",
    ];
    const missing = requiredEnvs.filter((k) => !process.env[k]);
    if (missing.length) {
      console.error("Missing env vars:", missing);
      return res.status(500).json({
        error: "Server misconfiguration: missing environment variables",
        missing,
        hint: "Set these in your Vercel (or host) environment settings and redeploy",
      });
    }

    // Build transporter
    let transporter;
    try {
      transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT) || 587,
        secure: process.env.SMTP_SECURE === "true", // true for 465, false for 587
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      // verify connection/auth — will fail early for bad config/auth
      await transporter.verify();
    } catch (err) {
      console.error(
        "Failed to configure/verify SMTP transporter:",
        err?.message || err
      );
      return res.status(500).json({
        error: "Mail transporter configuration or authentication failed",
        details: err?.message,
      });
    }

    // Build email content
    const html = `
      <h2>New contact from website</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(phone || "-")}</p>
      <p><strong>Budget:</strong> ${escapeHtml(budget || "-")}</p>
      <p><strong>Service:</strong> ${escapeHtml(service || "-")}</p>
      <p><strong>Message:</strong><br/>${escapeHtml(message)}</p>
    `;

    const text = [
      "New contact from website",
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone || "-"}`,
      `Budget: ${budget || "-"}`,
      `Service: ${service || "-"}`,
      "Message:",
      message,
    ].join("\n\n");

    const mailOptions = {
      from: process.env.SMTP_USER, // must be authenticated sender
      replyTo: `${sanitizePlainText(name)} <${sanitizePlainText(email)}>`,
      to: process.env.TO_EMAIL || process.env.SMTP_USER,
      subject: `New inquiry: ${sanitizePlainText(
        service || "General inquiry"
      )}`,
      text,
      html,
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      return res.status(200).json({ ok: true, messageId: info.messageId });
    } catch (err) {
      console.error("Mail send error:", err?.message || err);
      return res.status(500).json({
        error: "Failed to send email",
        details: err?.message,
      });
    }
  } catch (unhandled) {
    console.error("Unhandled server error:", unhandled?.message || unhandled);
    return res.status(500).json({ error: "Internal server error" });
  }
}

// Minimal HTML escape for the email body
function escapeHtml(unsafe) {
  return String(unsafe || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Sanitize plain-text values used in headers (replyTo/subject)
function sanitizePlainText(s) {
  return String(s || "")
    .replace(/[\r\n<>]/g, " ")
    .trim();
}
