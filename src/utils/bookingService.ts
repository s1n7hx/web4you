export interface FormData {
  name: string;
  email: string;
  company: string;
  projectType: string;
  details: string;
  budget: string;
  date: string;
  time: string;
}

export const TARGET_EMAIL = "ssumollah@gmail.com";

/**
 * Formats a clean executive plain-text template for the booking request.
 */
export function formatEmailTemplate(data: FormData): string {
  const timestamp = new Date().toLocaleString("en-US", {
    dateStyle: "full",
    timeStyle: "short",
  });

  return `======================================================
             web4u STUDIO — NEW PROJECT BRIEF
======================================================

CLIENT PROFILE
------------------------------------------------------
• Full Name:    ${data.name}
• Email:        ${data.email}
• Company:      ${data.company?.trim() ? data.company.trim() : "Independent / Startup"}

PROJECT SPECIFICATIONS
------------------------------------------------------
• Service Type: ${data.projectType}
• Budget Range: ${data.budget}

PREFERRED DISCOVERY CALL
------------------------------------------------------
• Date:         ${data.date || "Flexible / Not specified"}
• Time:         ${data.time || "Flexible / Not specified"}

PROJECT SCOPE & REQUIREMENTS
------------------------------------------------------
${data.details}

======================================================
Submitted At:   ${timestamp}
Target Inbox:   ${TARGET_EMAIL}
Direct Reply:   ${data.email}
Status:         NEW INCOMING LEAD
======================================================`;
}

/**
 * Builds a ready-to-use mailto URL with the professional template.
 */
export function createMailtoLink(data: FormData): string {
  const subject = `[web4u Booking] ${data.name} — ${data.projectType} (${data.budget})`;
  const body = formatEmailTemplate(data);
  return `mailto:${TARGET_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export interface BookingSubmissionResult {
  success: boolean;
  message?: string;
  isFallback?: boolean;
}

/**
 * Dispatches the booking request directly to ssumollah@gmail.com.
 * Uses FormSubmit AJAX API with structured table format and auto-reply.
 */
export async function sendBookingRequest(data: FormData): Promise<BookingSubmissionResult> {
  const subject = `🚀 [web4u Booking] ${data.name} — ${data.projectType} (${data.budget})`;

  const payload = {
    _subject: subject,
    _replyto: data.email,
    _template: "table",
    _captcha: "false",
    _autoresponse: `Hi ${data.name.split(" ")[0]},\n\nThank you for requesting a project with web4u Studio! We have received your project details for "${data.projectType}" (${data.budget}) and will reach out to confirm our discovery call.\n\nBest regards,\nweb4u Studio Team`,
    "Client Name": data.name,
    "Email Address": data.email,
    "Company / Organization": data.company?.trim() || "Independent / Startup",
    "Project Category": data.projectType,
    "Estimated Budget": data.budget,
    "Preferred Discovery Date": data.date || "Flexible",
    "Preferred Discovery Time": data.time || "Flexible",
    "Project Brief & Details": data.details,
    "Submission Date": new Date().toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" }),
    "Recipient Inbox": TARGET_EMAIL,
  };

  try {
    const response = await fetch(`https://formsubmit.co/ajax/${TARGET_EMAIL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Server returned ${response.status}`);
    }

    const resJson = await response.json();
    return {
      success: true,
      message: resJson.message || "Request sent successfully",
    };
  } catch (err) {
    console.warn("Direct dispatch error, offering email link fallback:", err);
    return {
      success: false,
      message: err instanceof Error ? err.message : "Network error",
      isFallback: true,
    };
  }
}
