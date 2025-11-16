// /api/contact.js (pure ESM)
import nodemailer from "nodemailer";

function sanitize(input = "") {
  return String(input)
    .replace(/<[^>]*>?/gm, "")
    .trim();
}

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      res.setHeader("Allow", "POST");
      return res.status(405).json({ error: "Method not allowed" });
    }

    // safe parse (handles string bodies)
    let body = req.body;
    if (typeof body === "string") {
      try {
        body = JSON.parse(body || "{}");
      } catch (err) {
        return res.status(400).json({ error: "Invalid JSON body" });
      }
    }

    const { name, email, phone, message } = body || {};
    const sName = sanitize(name || "");
    const sEmail = sanitize(email || "");
    const sPhone = sanitize(phone || "");
    const sMessage = sanitize(message || "");

    if (!sName || !sEmail || !sMessage) {
      return res.status(422).json({ error: "Missing required fields" });
    }

    // env SMTP config
    const SMTP_HOST = process.env.SMTP_HOST;
    const SMTP_PORT = Number(process.env.SMTP_PORT || 587);
    const SMTP_USER = process.env.SMTP_USER; // must be something like info@radsconstruction.com
    const SMTP_PASS = process.env.SMTP_PASS;
    const CONTACT_TO = process.env.CONTACT_TO || SMTP_USER;
    const DISPLAY_FROM =
      process.env.SMTP_FROM ||
      `Rads Construction <${SMTP_USER || "info@radsconstruction.com"}>`;

    if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
      console.error(
        "Missing SMTP configuration (SMTP_HOST/SMTP_USER/SMTP_PASS)."
      );
      return res.status(500).json({ error: "Server email misconfigured" });
    }

    const secure = SMTP_PORT === 465;

    // create transporter
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
      tls: {
        // allow optional override via env for special hosts; default true (reject unauthorized)
        rejectUnauthorized:
          process.env.TLS_REJECT_UNAUTHORIZED === "false" ? false : true,
      },
    });

    // verify connection config early
    try {
      await transporter.verify();
      console.log("SMTP verified OK");
    } catch (err) {
      console.error(
        "SMTP verify failed:",
        err && err.message ? err.message : err
      );
      return res.status(500).json({ error: "SMTP verification failed" });
    }

    // build mail options — IMPORTANT: envelope.from must equal the authenticated SMTP user
    const envelopeFrom = SMTP_USER; // MUST be the same address covered by SPF/DKIM
    const mailOptions = {
      from: DISPLAY_FROM, // friendly header shown in inbox
      to: CONTACT_TO,
      replyTo: sEmail, // reply goes to the user
      subject: "New contact form submission",
      text: `Name: ${sName}\nEmail: ${sEmail}\nPhone: ${sPhone}\n\nMessage:\n${sMessage}`,
      html: `<p><strong>Name:</strong> ${sName}</p>
             <p><strong>Email:</strong> ${sEmail}</p>
             <p><strong>Phone:</strong> ${sPhone}</p>
             <p><strong>Message:</strong><br/>${sMessage}</p>`,
      // <- CRITICAL: set envelope to ensure SPF checks the authenticated SMTP account
      envelope: {
        from: envelopeFrom,
        to: CONTACT_TO,
      },
      // add explicit sender header too
      headers: {
        sender: envelopeFrom,
      },
    };

    // send mail
    const info = await transporter.sendMail(mailOptions);
    console.log(
      "Admin email sent:",
      info && info.messageId ? info.messageId : info
    );

    return res.status(200).json({ message: "Email sent successfully" });
  } catch (err) {
    console.error("Email error:", err);
    return res.status(500).json({ error: "Failed to send email" });
  }
}
