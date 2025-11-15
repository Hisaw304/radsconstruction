const nodemailer = require("nodemailer");

module.exports = async (req, res) => {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method not allowed" });

  const { name, email, phone, budget, service, message, hp } = req.body || {};

  // basic validation
  if (hp) return res.status(400).json({ error: "Bot detected" });
  if (!name || !email || !message)
    return res.status(400).json({ error: "Missing required fields" });

  // create transporter
  let transporter;
  try {
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === "true" || false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  } catch (err) {
    console.error("Failed to create transporter", err);
    return res
      .status(500)
      .json({ error: "Mail transporter configuration error" });
  }

  const html = `
    <h2>New contact from UrbanForge website</h2>
    <p><strong>Name:</strong> ${escapeHtml(name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    <p><strong>Phone:</strong> ${escapeHtml(phone || "-")}</p>
    <p><strong>Budget:</strong> ${escapeHtml(budget || "-")}</p>
    <p><strong>Service:</strong> ${escapeHtml(service || "-")}</p>
    <p><strong>Message:</strong><br/>${escapeHtml(message)}</p>
  `;

  const mailOptions = {
    from: `${escapeHtml(name)} <${escapeHtml(email)}>`,
    to: process.env.TO_EMAIL || process.env.SMTP_USER,
    subject: `New inquiry: ${escapeHtml(service || "General inquiry")}`,
    html,
  };

  try {
    await transporter.sendMail(mailOptions);
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Mail send error", err);
    return res.status(500).json({ error: "Failed to send email" });
  }
};

// Simple escaping to reduce HTML injection risk in emails
function escapeHtml(unsafe) {
  return String(unsafe)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
