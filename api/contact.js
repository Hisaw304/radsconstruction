// /api/contact.js — minimal, ESM, hardcoded FROM header
import nodemailer from "nodemailer";

function sanitize(input = "") {
  return String(input)
    .replace(/<[^>]*>?/gm, "")
    .trim();
}
function validEmail(email = "") {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email));
}
function escapeHtml(unsafe = "") {
  return String(unsafe)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      res.setHeader("Allow", "POST");
      return res.status(405).json({ error: "Method not allowed" });
    }

    // Parse body safely
    let body = req.body;
    if (typeof body === "string") {
      try {
        body = JSON.parse(body);
      } catch {
        return res.status(400).json({ error: "Invalid JSON body" });
      }
    }

    const { name, email, phone, budget, service, message, hp } = body || {};

    // Honeypot
    if (hp) return res.status(400).json({ error: "Bot detected" });

    // Sanitize & validate
    const sName = sanitize(name || "");
    const sEmail = sanitize(email || "");
    const sPhone = sanitize(phone || "");
    const sMessage = sanitize(message || "");
    const sService = sanitize(service || "");
    const sBudget = sanitize(budget || "");

    const errors = {};
    if (!sName) errors.name = "Name required";
    if (!validEmail(sEmail)) errors.email = "Valid email required";
    if (!sMessage || sMessage.length < 5) errors.message = "Message too short";
    if (Object.keys(errors).length > 0)
      return res
        .status(422)
        .json({ error: "Validation failed", details: errors });

    // SMTP ENV (these MUST remain env vars)
    const host = process.env.SMTP_HOST;
    const port = Number(process.env.SMTP_PORT || 587);
    const secure = port === 465;
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const CONTACT_TO = process.env.CONTACT_TO || user;

    // ---------- HARDCODED FROM HEADER (per your request) ----------
    // IMPORTANT: this should match the mailbox you're authenticating as (SMTP_USER)
    // or be an allowed/verified sender for the SMTP service to avoid rejection.
    const FROM = "Rads Construction <info@radsconstruction.com>";
    // ----------------------------------------------------------------

    if (!host || !user || !pass) {
      console.error("Missing SMTP config");
      return res.status(500).json({ error: "Server email misconfigured" });
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: { user, pass },
    });

    // Send admin email
    try {
      await transporter.sendMail({
        from: FROM,
        to: CONTACT_TO,
        replyTo: sEmail,
        subject: `New message from Rads Construction site`,
        html: `
          <p><strong>Name:</strong> ${escapeHtml(sName)}</p>
          <p><strong>Email:</strong> ${escapeHtml(sEmail)}</p>
          <p><strong>Phone:</strong> ${escapeHtml(sPhone || "-")}</p>
          <p><strong>Budget:</strong> ${escapeHtml(sBudget || "-")}</p>
          <p><strong>Service:</strong> ${escapeHtml(sService || "-")}</p>
          <p><strong>Message:</strong><br/>${escapeHtml(sMessage)}</p>
        `,
      });
    } catch (err) {
      console.error("Email send error:", err?.message || err);
      return res
        .status(500)
        .json({ error: "Failed to send email", details: err?.message });
    }

    return res.status(200).json({ ok: true, message: "Message sent" });
  } catch (err) {
    console.error("Unexpected error:", err?.message || err);
    return res.status(500).json({ error: "Unexpected server error" });
  }
}
