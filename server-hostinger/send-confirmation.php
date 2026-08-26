<?php
// ─── CORS — Must be FIRST, before any output ──────────────────────────────
$allowedOrigins = [
    'https://techsolvent.in',
    'https://www.techsolvent.in',
    'http://localhost:5173',
    'http://localhost:3000',
];

$origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '';

if (in_array($origin, $allowedOrigins)) {
    header("Access-Control-Allow-Origin: " . $origin);
} else {
    header("Access-Control-Allow-Origin: https://techsolvent.in");
}

header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Accept, Authorization, X-Requested-With");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Max-Age: 86400"); // Cache preflight for 24hrs
header("Content-Type: application/json; charset=UTF-8");
// ──────────────────────────────────────────────────────────────────────────

// Handle preflight OPTIONS request — browser sends this first
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204); // No Content — standard for preflight
    exit();
}

// ─── TEST MODE: GET ?test=1 ────────────────────────────────────────────────
// Visit: https://techsolvent.in/api/send-confirmation.php?test=1
// Sends a real test email via SMTP and returns JSON result.
if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['test']) && $_GET['test'] === '1') {
    $data = [
        'name'     => 'Test User',
        'email'    => 'astitva@techsolvent.in',  // ← test email goes here
        'phone'    => '+91 99999 88888',
        'company'  => 'TechSolvent',
        'date'     => date('Y-m-d'),
        'timeSlot' => '11:00 AM – 11:30 AM',
        'service'  => 'API Test',
        'meetLink' => 'https://meet.google.com/cmb-jcqy-iux',
    ];
    // Fall through to the main send logic below using $data
} elseif ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["success" => false, "error" => "Method not allowed. Use POST or GET?test=1."]);
    exit();
} else {
    $inputJSON = file_get_contents('php://input');
    $data = json_decode($inputJSON, true);
}
// ──────────────────────────────────────────────────────────────────────────

// ─── SMTP Configuration ────────────────────────────────────────────────────
$smtpHost = 'smtp.hostinger.com';
$smtpPort = 465;          // SSL port
$smtpUser = 'astitva@techsolvent.in';
$smtpPass = 'Astitva@2026';
$smtpFrom = 'astitva@techsolvent.in';
$smtpFromName = 'TechSolvent';
// ──────────────────────────────────────────────────────────────────────────

if (!$data || !isset($data['email'])) {
    http_response_code(400);
    echo json_encode(["success" => false, "error" => "Email is required."]);
    exit();
}


$name      = isset($data['name'])     ? $data['name']     : 'there';
$email     = $data['email'];
$phone     = isset($data['phone'])    ? $data['phone']    : '';
$company   = isset($data['company'])  ? $data['company']  : '';
$date      = isset($data['date'])     ? $data['date']     : 'To be confirmed';
$timeSlot  = isset($data['timeSlot']) ? $data['timeSlot'] : 'To be confirmed';
$meetLink  = isset($data['meetLink']) && !empty($data['meetLink'])
             ? $data['meetLink']
             : 'https://meet.google.com/cmb-jcqy-iux';

// Service formatting
$service     = isset($data['service']) ? $data['service'] : 'General Consultation';
$serviceName = is_array($service) ? implode(", ", $service) : $service;

$year = date("Y");

$htmlBody = "
<!DOCTYPE html>
<html lang='en'>
<head>
  <meta charset='UTF-8' />
  <meta name='viewport' content='width=device-width, initial-scale=1.0' />
  <title>Appointment Confirmation – TechSolvent</title>
</head>
<body style=\"margin:0; padding:0; background-color:#f4f6fb; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;\">
  <table role=\"presentation\" width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" style=\"background-color:#f4f6fb; padding:40px 20px;\">
    <tr>
      <td align=\"center\">
        <table role=\"presentation\" width=\"600\" cellpadding=\"0\" cellspacing=\"0\" style=\"background:#ffffff; border-radius:16px; overflow:hidden; box-shadow:0 4px 24px rgba(0,0,0,0.08);\">
          
          <!-- Header -->
          <tr>
            <td style=\"background: linear-gradient(135deg, #0D2E8C 0%, #165DFB 100%); padding:40px 40px 30px; text-align:center;\">
              <h1 style=\"margin:0; color:#ffffff; font-size:28px; font-weight:800; letter-spacing:-0.5px;\">
                ✅ Appointment Confirmed!
              </h1>
              <p style=\"margin:10px 0 0; color:rgba(255,255,255,0.85); font-size:15px;\">
                Thank you for choosing TechSolvent, {$name}.
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style=\"padding:36px 40px 20px;\">
              <p style=\"margin:0 0 20px; color:#333; font-size:15px; line-height:1.7;\">
                We're excited to connect with you! Here are your appointment details:
              </p>

              <!-- Details Card -->
              <table role=\"presentation\" width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" style=\"background:#f8faff; border-radius:12px; border:1px solid #e5eaf5;\">
                <tr>
                  <td style=\"padding:24px;\">
                    <table role=\"presentation\" width=\"100%\" cellpadding=\"0\" cellspacing=\"0\">
                      <tr>
                        <td style=\"padding:8px 0; color:#6b7280; font-size:13px; width:140px; vertical-align:top;\">📅 Date</td>
                        <td style=\"padding:8px 0; color:#111827; font-size:14px; font-weight:600;\">{$date}</td>
                      </tr>
                      <tr>
                        <td style=\"padding:8px 0; color:#6b7280; font-size:13px; vertical-align:top;\">🕐 Time</td>
                        <td style=\"padding:8px 0; color:#111827; font-size:14px; font-weight:600;\">{$timeSlot}</td>
                      </tr>
                      <tr>
                        <td style=\"padding:8px 0; color:#6b7280; font-size:13px; vertical-align:top;\">🎯 Service</td>
                        <td style=\"padding:8px 0; color:#111827; font-size:14px; font-weight:600;\">{$serviceName}</td>
                      </tr>
                      " . ($company ? "
                      <tr>
                        <td style=\"padding:8px 0; color:#6b7280; font-size:13px; vertical-align:top;\">🏢 Company</td>
                        <td style=\"padding:8px 0; color:#111827; font-size:14px; font-weight:600;\">{$company}</td>
                      </tr>" : "") . "
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Meet Link Button -->
              <table role=\"presentation\" width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" style=\"margin-top:28px;\">
                <tr>
                  <td align=\"center\">
                    <a href=\"{$meetLink}\" target=\"_blank\" style=\"display:inline-block; background:linear-gradient(135deg, #0D2E8C 0%, #165DFB 100%); color:#ffffff; text-decoration:none; padding:16px 40px; border-radius:12px; font-size:16px; font-weight:700; letter-spacing:0.3px;\">
                      🔗 Join Google Meet
                    </a>
                  </td>
                </tr>
                <tr>
                  <td align=\"center\" style=\"padding-top:10px;\">
                    <p style=\"margin:0; color:#9ca3af; font-size:12px;\">
                      Click the button above to join the meeting at the scheduled time.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style=\"padding:0 40px;\">
              <hr style=\"border:none; border-top:1px solid #e5e7eb; margin:10px 0;\" />
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style=\"padding:20px 40px 36px; text-align:center;\">
              <p style=\"margin:0 0 6px; color:#6b7280; font-size:13px;\">
                Need to reschedule? Reply to this email or call us.
              </p>
              <p style=\"margin:0 0 16px; color:#6b7280; font-size:13px;\">
                📞 +91 77720 22077 &nbsp;|&nbsp; ✉️ astitva@techsolvent.in
              </p>
              <p style=\"margin:0; color:#9ca3af; font-size:11px;\">
                © {$year} TechSolvent — India's AI Marketing Agency
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>";

$subject = "Your Appointment is Confirmed – TechSolvent 🎉";

// ─── Send via SMTP (SSL) using PHPMailer ───────────────────────────────────
// PHPMailer files must exist at ./PHPMailer/ relative to this script.
// Download from: https://github.com/PHPMailer/PHPMailer
// Required files: PHPMailer.php, SMTP.php, Exception.php
// ──────────────────────────────────────────────────────────────────────────

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require __DIR__ . '/PHPMailer/src/Exception.php';
require __DIR__ . '/PHPMailer/src/PHPMailer.php';
require __DIR__ . '/PHPMailer/src/SMTP.php';

$mail = new PHPMailer(true);

try {
    // Server settings
    $mail->isSMTP();
    $mail->Host       = $smtpHost;
    $mail->SMTPAuth   = true;
    $mail->Username   = $smtpUser;
    $mail->Password   = $smtpPass;
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS; // SSL on port 465
    $mail->Port       = $smtpPort;

    // Recipients
    $mail->setFrom($smtpFrom, $smtpFromName);
    $mail->addAddress($email, $name);
    $mail->addReplyTo($smtpFrom, $smtpFromName);

    // Content
    $mail->isHTML(true);
    $mail->Subject = $subject;
    $mail->Body    = $htmlBody;
    $mail->AltBody = "Your appointment with TechSolvent is confirmed. Date: {$date}, Time: {$timeSlot}. Join: {$meetLink}";

    $mail->send();

    echo json_encode(["success" => true, "message" => "Confirmation email sent!"]);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["success" => false, "error" => "Failed to send email: " . $mail->ErrorInfo]);
}
?>
