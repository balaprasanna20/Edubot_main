import { NextRequest, NextResponse } from "next/server";

// In-memory sliding-window rate limiter per client IP
interface RateLimitRecord {
  timestamps: number[];
}

const rateLimitMap = new Map<string, RateLimitRecord>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS_PER_WINDOW = 5;

// Periodically prune stale entries to prevent memory leaks
function cleanupRateLimitMap() {
  const now = Date.now();
  rateLimitMap.forEach((record, ip) => {
    const validTimestamps = record.timestamps.filter(
      (ts) => now - ts < RATE_LIMIT_WINDOW_MS
    );
    if (validTimestamps.length === 0) {
      rateLimitMap.delete(ip);
    } else {
      record.timestamps = validTimestamps;
    }
  });
}

// Allowed values strictly matching UI selections
const ALLOWED_INSTITUTION_TYPES = ["School", "College", "University", "Other"] as const;
const ALLOWED_ROLES = [
  "Super Admin",
  "Administrator",
  "Mentor",
  "Mentor / Educator",
  "Student",
  "Other",
] as const;

// Basic RFC-compliant email regex (supports all domains, including public providers like gmail/yahoo)
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Escape HTML entities to prevent HTML injection in rendered emails
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(req: NextRequest) {
  const startTime = Date.now();
  const submissionId = `demo_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

  try {
    // 1. Enforce payload size limit (Max 16KB)
    const contentLength = req.headers.get("content-length");
    if (contentLength && parseInt(contentLength, 10) > 16384) {
      return NextResponse.json(
        { error: "Payload too large. Maximum request body size is 16KB." },
        { status: 413 }
      );
    }

    // 2. Validate Origin against Host and configured trusted origins
    const origin = req.headers.get("origin");
    const host = req.headers.get("host");
    const allowedOriginsEnv = process.env.ALLOWED_ORIGINS
      ? process.env.ALLOWED_ORIGINS.split(",").map((o) => o.trim())
      : [];

    if (origin) {
      try {
        const originUrl = new URL(origin);
        const isSameHost = host && originUrl.host.toLowerCase() === host.toLowerCase();
        const isAllowedOrigin = allowedOriginsEnv.some(
          (allowed) => allowed.toLowerCase() === origin.toLowerCase()
        );

        if (!isSameHost && !isAllowedOrigin && process.env.NODE_ENV === "production") {
          return NextResponse.json(
            { error: "Forbidden: Untrusted origin" },
            { status: 403 }
          );
        }
      } catch {
        return NextResponse.json(
          { error: "Forbidden: Malformed origin header" },
          { status: 403 }
        );
      }
    }

    // 3. Client IP extraction and rate limiting
    const forwarded = req.headers.get("x-forwarded-for");
    const clientIp = forwarded
      ? forwarded.split(",")[0].trim()
      : req.headers.get("x-real-ip") || "unknown_ip";

    cleanupRateLimitMap();
    const now = Date.now();
    const clientRecord = rateLimitMap.get(clientIp) || { timestamps: [] };
    clientRecord.timestamps = clientRecord.timestamps.filter(
      (ts) => now - ts < RATE_LIMIT_WINDOW_MS
    );

    if (clientRecord.timestamps.length >= MAX_REQUESTS_PER_WINDOW) {
      const oldestTimestamp = clientRecord.timestamps[0];
      const retryAfterSeconds = Math.ceil(
        (RATE_LIMIT_WINDOW_MS - (now - oldestTimestamp)) / 1000
      );
      return NextResponse.json(
        {
          error: "Too many requests. Please wait before submitting another enquiry.",
        },
        {
          status: 429,
          headers: {
            "Retry-After": retryAfterSeconds.toString(),
          },
        }
      );
    }

    // Record this attempt
    clientRecord.timestamps.push(now);
    rateLimitMap.set(clientIp, clientRecord);

    // 4. Parse JSON payload
    let body: any;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid JSON request body" },
        { status: 400 }
      );
    }

    // 5. Honeypot check: If the hidden 'website' field is populated, reject as spam
    if (body.website && typeof body.website === "string" && body.website.trim().length > 0) {
      // Silently discard spam without contacting email provider
      return NextResponse.json(
        { success: true, message: "Enquiry received." },
        { status: 200 }
      );
    }

    // 6. Server-side validation of fields
    const fullName = typeof body.fullName === "string" ? body.fullName.trim() : "";
    const workEmail = typeof body.workEmail === "string" ? body.workEmail.trim() : "";
    const institutionName =
      typeof body.institutionName === "string" ? body.institutionName.trim() : "";
    const institutionType =
      typeof body.institutionType === "string" ? body.institutionType.trim() : "";
    const role = typeof body.role === "string" ? body.role.trim() : "";
    const exploreNotes =
      typeof body.exploreNotes === "string" ? body.exploreNotes.trim() : "";

    const validationErrors: Record<string, string> = {};

    if (!fullName || fullName.length < 2 || fullName.length > 100) {
      validationErrors.fullName = "Full name must be between 2 and 100 characters.";
    }

    if (!workEmail || !EMAIL_REGEX.test(workEmail) || workEmail.length > 254) {
      validationErrors.workEmail = "Please enter a valid email address.";
    }

    if (!institutionName || institutionName.length < 2 || institutionName.length > 150) {
      validationErrors.institutionName =
        "Institution name must be between 2 and 150 characters.";
    }

    if (
      !institutionType ||
      !ALLOWED_INSTITUTION_TYPES.includes(institutionType as any)
    ) {
      validationErrors.institutionType =
        "Please select a valid institution type (School, College, University, or Other).";
    }

    if (!role || !ALLOWED_ROLES.includes(role as any)) {
      validationErrors.role = "Please select a valid role.";
    }

    if (exploreNotes && exploreNotes.length > 1000) {
      validationErrors.exploreNotes =
        "Optional notes must be 1000 characters or fewer.";
    }

    if (Object.keys(validationErrors).length > 0) {
      return NextResponse.json(
        {
          error: "Validation failed. Please correct the highlighted errors.",
          details: validationErrors,
        },
        { status: 422 }
      );
    }

    // 7. Verify email delivery provider configuration (Resend)
    const resendApiKey = process.env.RESEND_API_KEY;
    const recipientEmail =
      process.env.DEMO_SUBMISSION_RECIPIENT_EMAIL || "info@codework.ai";
    const senderEmail =
      process.env.DEMO_SUBMISSION_SENDER_EMAIL ||
      "Edubot Demo Enquiries <onboarding@resend.dev>";

    if (!resendApiKey) {
      // Log missing server configuration without PII
      console.warn(
        `[DEMO_ROUTE] ${submissionId} - RESEND_API_KEY is not configured in server environment.`
      );
      return NextResponse.json(
        {
          error:
            "Email delivery service is currently not configured on this server. Please configure RESEND_API_KEY in the environment.",
          configured: false,
        },
        { status: 503 }
      );
    }

    // 8. Build Escaped HTML and Plain-Text Email Template
    const safeFullName = escapeHtml(fullName);
    const safeWorkEmail = escapeHtml(workEmail);
    const safeInstitutionName = escapeHtml(institutionName);
    const safeInstitutionType = escapeHtml(institutionType);
    const safeRole = escapeHtml(role);
    const safeExploreNotes = exploreNotes ? escapeHtml(exploreNotes) : "None provided";

    const emailSubject = `[Edubot Demo Request] ${safeInstitutionName} — ${safeFullName}`;

    const htmlBody = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Edubot Demo Request</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #F8FAFD; margin: 0; padding: 24px; color: #080D26;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto; background-color: #FFFFFF; border: 1px solid #E0E6EF; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(8,13,38,0.04);">
    <tr>
      <td style="padding: 28px 32px; background-color: #064BFF; color: #FFFFFF;">
        <h1 style="margin: 0; font-size: 20px; font-weight: 700; letter-spacing: -0.02em;">Edubot — Demo Request</h1>
        <p style="margin: 6px 0 0; font-size: 13px; opacity: 0.9;">New campus walkthrough enquiry received</p>
      </td>
    </tr>
    <tr>
      <td style="padding: 32px;">
        <table width="100%" cellpadding="8" cellspacing="0" style="font-size: 14px; border-collapse: collapse;">
          <tr style="border-bottom: 1px solid #EFF2F7;">
            <td width="35%" style="color: #606879; font-weight: 600; padding: 10px 0;">Full Name:</td>
            <td style="color: #080D26; font-weight: 600; padding: 10px 0;">${safeFullName}</td>
          </tr>
          <tr style="border-bottom: 1px solid #EFF2F7;">
            <td style="color: #606879; font-weight: 600; padding: 10px 0;">Work Email:</td>
            <td style="color: #064BFF; font-weight: 600; padding: 10px 0;">
              <a href="mailto:${safeWorkEmail}" style="color: #064BFF; text-decoration: none;">${safeWorkEmail}</a>
            </td>
          </tr>
          <tr style="border-bottom: 1px solid #EFF2F7;">
            <td style="color: #606879; font-weight: 600; padding: 10px 0;">Institution:</td>
            <td style="color: #080D26; font-weight: 600; padding: 10px 0;">${safeInstitutionName}</td>
          </tr>
          <tr style="border-bottom: 1px solid #EFF2F7;">
            <td style="color: #606879; font-weight: 600; padding: 10px 0;">Institution Type:</td>
            <td style="color: #080D26; font-weight: 600; padding: 10px 0;">${safeInstitutionType}</td>
          </tr>
          <tr style="border-bottom: 1px solid #EFF2F7;">
            <td style="color: #606879; font-weight: 600; padding: 10px 0;">Role:</td>
            <td style="color: #080D26; font-weight: 600; padding: 10px 0;">${safeRole}</td>
          </tr>
          <tr>
            <td style="color: #606879; font-weight: 600; padding: 12px 0 6px;" colspan="2">Notes & Priorities:</td>
          </tr>
          <tr>
            <td colspan="2" style="background-color: #F8FAFD; border: 1px solid #E0E6EF; border-radius: 8px; padding: 14px; color: #424B68; font-size: 13.5px; line-height: 1.5; white-space: pre-wrap;">${safeExploreNotes}</td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td style="padding: 18px 32px; background-color: #F8FAFD; border-top: 1px solid #E0E6EF; font-size: 12px; color: #606879;">
        Submission Reference ID: <code>${submissionId}</code> &bull; Delivered via Resend API
      </td>
    </tr>
  </table>
</body>
</html>
`.trim();

    const textBody = `
Edubot — New Demo Request

Full Name: ${fullName}
Work Email: ${workEmail}
Institution: ${institutionName}
Institution Type: ${institutionType}
Role: ${role}
Notes: ${exploreNotes || "None provided"}

Reference ID: ${submissionId}
`.trim();

    // 9. Dispatch Email via Resend REST API
    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
        "X-Entity-Ref-ID": submissionId,
      },
      body: JSON.stringify({
        from: senderEmail,
        to: [recipientEmail],
        reply_to: workEmail,
        subject: emailSubject,
        html: htmlBody,
        text: textBody,
      }),
    });

    const resendData = await resendResponse.json().catch(() => null);

    if (!resendResponse.ok) {
      // Sensitive data is kept out of logs
      console.error(
        `[DEMO_ROUTE] ${submissionId} - Resend provider error (Status: ${resendResponse.status}):`,
        resendData?.message || "Unknown error"
      );

      return NextResponse.json(
        {
          error:
            resendData?.message ||
            "The email delivery provider could not process your request at this time.",
        },
        { status: 502 }
      );
    }

    // Success log with zero PII
    const duration = Date.now() - startTime;
    console.info(
      `[DEMO_ROUTE] ${submissionId} - Enquiry successfully delivered via Resend in ${duration}ms.`
    );

    return NextResponse.json(
      {
        success: true,
        submissionId,
        message: "Thank you. Our team will contact you to arrange your demo.",
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error(
      `[DEMO_ROUTE] ${submissionId} - Internal server error:`,
      error?.message || "Unexpected failure"
    );
    return NextResponse.json(
      {
        error: "An unexpected error occurred while processing your request. Please try again later.",
      },
      { status: 500 }
    );
  }
}
