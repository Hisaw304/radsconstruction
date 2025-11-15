// /api/contact.js (pure ESM, works with "type": "module")
import nodemailer from "nodemailer";

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      res.setHeader("Allow", "POST");
      return res.status(405).json({ error: "Method not allowed" });
    }

    // Parse JSON safely
    let body = req.body;
    if (typeof body === "string") {
      try {
        body = JSON.parse(body);
      } catch (err) {
        return res.status(400).json({ error: "Invalid JSON body" });
      }
    }

    const { name, email, phone, message } = body || {};

    // Sanitizers
    const sanitize = (s = "") =>
      String(s)
        .replace(/<[^>]*>?/gm, "")
        .trim();
    const sName = sanitize(name);
    const sEmail = sanitize(email);
    const sPhone = sanitize(phone);
    const sMessage = sanitize(message);

    // Basic validation
    if (!sName || !sEmail || !sMessage) {
      return res.status(422).json({ error: "Missing required fields" });
    }

    // SMTP config (envs)
    const SMTP_HOST = process.env.SMTP_HOST;
    const SMTP_PORT = Number(process.env.SMTP_PORT || 587);
    const SMTP_USER = process.env.SMTP_USER;
    const SMTP_PASS = process.env.SMTP_PASS;

    if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
      console.error("Missing SMTP configuration");
      return res.status(500).json({ error: "Server email misconfigured" });
    }

    // Hardcoded FROM (requested)
    const FROM = "Rads Construction <info@radsconstruction.com>";

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_PORT === 465,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    });

    // Send admin email
    await transporter.sendMail({
      from: FROM,
      to: process.env.CONTACT_TO || SMTP_USER,
      replyTo: sEmail,
      subject: "New contact form submission",
      text: `
Name: ${sName}
Email: ${sEmail}
Phone: ${sPhone}

Message:
${sMessage}
      `,
    });

    return res.status(200).json({ message: "Email sent successfully" });
  } catch (err) {
    console.error("Email error:", err);
    return res.status(500).json({ error: "Failed to send email" });
  }
}
