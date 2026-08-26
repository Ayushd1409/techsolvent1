import "dotenv/config";
import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";

const app = express();
const PORT = process.env.PORT || 3001;

/* ── Middleware ─────────────────────────────────────────── */
app.use(express.json());
app.use(
  cors({
    origin: function (origin, callback) {
      const allowedOrigins = [
        process.env.ALLOWED_ORIGIN,
        "http://localhost:8080",
        "http://localhost:5173"
      ];
      // Allow if no origin (like Postman), or if it matches allowed ones, or if ALLOWED_ORIGIN is "*"
      if (!origin || allowedOrigins.includes(origin) || process.env.ALLOWED_ORIGIN === "*") {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "OPTIONS"],
  })
);

/* ── SMTP Transporter ──────────────────────────────────── */
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 465,
  secure: true, // SSL
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Verify connection on start (Hostinger runs persistently, so this is safe)
transporter.verify().then(() => {
  console.log("✅ SMTP connection verified — ready to send emails");
}).catch((err) => {
  console.error("❌ SMTP connection failed:", err.message);
  console.error("⚠️  Server will still run but emails will not send until SMTP is fixed.");
});

/* ── HTML Email Builder ────────────────────────────────── */
function buildConfirmationEmail(data) {
  const {
    name = "there",
    email,
    phone,
    company,
    date,
    timeSlot,
    service,
    meetLink,
  } = data;

  const meetURL = meetLink || process.env.DEFAULT_MEET_LINK || "#";
  const appointmentDate = date || "To be confirmed";
  const appointmentTime = timeSlot || "To be confirmed";
  const serviceName = Array.isArray(service) ? service.join(", ") : service || "General Consultation";

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Appointment Confirmation – TechSolvent</title>
</head>
<body style="margin:0; padding:0; background-color:#f4f6fb; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f6fb; padding:40px 20px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:16px; overflow:hidden; box-shadow:0 4px 24px rgba(0,0,0,0.08);">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #0D2E8C 0%, #165DFB 100%); padding:40px 40px 30px; text-align:center;">
              <h1 style="margin:0; color:#ffffff; font-size:28px; font-weight:800; letter-spacing:-0.5px;">
                ✅ Appointment Confirmed!
              </h1>
              <p style="margin:10px 0 0; color:rgba(255,255,255,0.85); font-size:15px;">
                Thank you for choosing TechSolvent, ${name}.
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:36px 40px 20px;">
              <p style="margin:0 0 20px; color:#333; font-size:15px; line-height:1.7;">
                We're excited to connect with you! Here are your appointment details:
              </p>

              <!-- Details Card -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f8faff; border-radius:12px; border:1px solid #e5eaf5;">
                <tr>
                  <td style="padding:24px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding:8px 0; color:#6b7280; font-size:13px; width:140px; vertical-align:top;">📅 Date</td>
                        <td style="padding:8px 0; color:#111827; font-size:14px; font-weight:600;">${appointmentDate}</td>
                      </tr>
                      <tr>
                        <td style="padding:8px 0; color:#6b7280; font-size:13px; vertical-align:top;">🕐 Time</td>
                        <td style="padding:8px 0; color:#111827; font-size:14px; font-weight:600;">${appointmentTime}</td>
                      </tr>
                      <tr>
                        <td style="padding:8px 0; color:#6b7280; font-size:13px; vertical-align:top;">🎯 Service</td>
                        <td style="padding:8px 0; color:#111827; font-size:14px; font-weight:600;">${serviceName}</td>
                      </tr>
                      ${company ? `
                      <tr>
                        <td style="padding:8px 0; color:#6b7280; font-size:13px; vertical-align:top;">🏢 Company</td>
                        <td style="padding:8px 0; color:#111827; font-size:14px; font-weight:600;">${company}</td>
                      </tr>` : ""}
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Meet Link Button -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:28px;">
                <tr>
                  <td align="center">
                    <a href="${meetURL}" target="_blank" style="display:inline-block; background:linear-gradient(135deg, #0D2E8C 0%, #165DFB 100%); color:#ffffff; text-decoration:none; padding:16px 40px; border-radius:12px; font-size:16px; font-weight:700; letter-spacing:0.3px;">
                      🔗 Join Google Meet
                    </a>
                  </td>
                </tr>
                <tr>
                  <td align="center" style="padding-top:10px;">
                    <p style="margin:0; color:#9ca3af; font-size:12px;">
                      Click the button above to join the meeting at the scheduled time.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding:0 40px;">
              <hr style="border:none; border-top:1px solid #e5e7eb; margin:10px 0;" />
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:20px 40px 36px; text-align:center;">
              <p style="margin:0 0 6px; color:#6b7280; font-size:13px;">
                Need to reschedule? Reply to this email or call us.
              </p>
              <p style="margin:0 0 16px; color:#6b7280; font-size:13px;">
                📞 +91 77720 22077 &nbsp;|&nbsp; ✉️ astitva@techsolvent.in
              </p>
              <p style="margin:0; color:#9ca3af; font-size:11px;">
                © ${new Date().getFullYear()} TechSolvent — India's AI Marketing Agency
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/* ── API Endpoint ──────────────────────────────────────── */
app.post("/api/send-confirmation", async (req, res) => {
  const { name, email, phone, company, date, timeSlot, service, meetLink } = req.body;

  // Validate required fields
  if (!email) {
    return res.status(400).json({ success: false, error: "Email is required." });
  }

  try {
    const html = buildConfirmationEmail(req.body);

    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: email,
      subject: `Your Appointment is Confirmed – TechSolvent 🎉`,
      html,
    });

    console.log(`✅ Confirmation email sent to ${email}`);
    res.json({ success: true, message: "Confirmation email sent!" });
  } catch (err) {
    console.error("❌ Email error:", err.message);
    res.status(500).json({ success: false, error: "Failed to send email. Please try again." });
  }
});

/* ── Health Check ──────────────────────────────────────── */
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

/* ── Test API ──────────────────────────────────────────── */
app.get("/api/test", (req, res) => {
  res.json({ 
    success: true,
    message: "Test API is working perfectly! 🚀", 
    timestamp: new Date().toISOString(),
    corsOrigin: process.env.ALLOWED_ORIGIN || "Not set",
    smtpStatus: process.env.SMTP_USER ? "Configured" : "Missing"
  });
});

/* ── Start ─────────────────────────────────────────────── */
app.listen(PORT, () => {
  console.log(`🚀 TechSolvent Email Server running on port ${PORT}`);
});
