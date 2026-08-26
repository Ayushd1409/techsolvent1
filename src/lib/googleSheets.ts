const GOOGLE_SHEET_URL = import.meta.env.VITE_GOOGLE_SHEET_URL;
const EMAIL_API_URL = import.meta.env.VITE_EMAIL_API_URL;

export async function submitToGoogleSheet(data: Record<string, any>) {
  if (!GOOGLE_SHEET_URL) {
    console.warn("VITE_GOOGLE_SHEET_URL is missing! Please configure your .env file.");
    return true; 
  }

  try {
    await fetch(GOOGLE_SHEET_URL, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "text/plain",
      },
      body: JSON.stringify(data),
    });
    return true;
  } catch (error) {
    console.error("Error submitting to Google Sheet:", error);
    return false;
  }
}

export async function sendConfirmationEmail(data: Record<string, any>) {
  if (!EMAIL_API_URL) {
    console.warn("VITE_EMAIL_API_URL is missing! Skipping confirmation email.");
    return true;
  }

  try {
    const res = await fetch(EMAIL_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    return result.success;
  } catch (error) {
    console.error("Error sending confirmation email:", error);
    return false;
  }
}
