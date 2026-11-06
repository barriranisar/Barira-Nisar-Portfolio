import type { IncomingMessage, ServerResponse } from 'node:http';

interface ContactRequestBody {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
  botField?: string;
}

interface CustomRequest extends IncomingMessage {
  body?: ContactRequestBody;
}

interface CustomResponse extends ServerResponse {
  status?: (statusCode: number) => CustomResponse;
  json?: (data: unknown) => CustomResponse;
}

// In-memory rate limiting map: ip -> timestamps[]
const rateLimitMap = new Map<string, number[]>();
const WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_REQUESTS_PER_WINDOW = 5;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) || [];
  const validTimestamps = timestamps.filter((t) => now - t < WINDOW_MS);

  if (validTimestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    rateLimitMap.set(ip, validTimestamps);
    return true;
  }

  validTimestamps.push(now);
  rateLimitMap.set(ip, validTimestamps);
  return false;
}

function sendJson(res: CustomResponse, statusCode: number, data: unknown) {
  if (typeof res.status === 'function' && typeof res.json === 'function') {
    return res.status(statusCode).json(data);
  }
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(data));
}

// Helper to parse JSON body if not pre-parsed by runtime
async function parseBody(req: CustomRequest): Promise<ContactRequestBody> {
  if (req.body && typeof req.body === 'object') {
    return req.body;
  }
  return new Promise((resolve) => {
    let raw = '';
    req.on('data', (chunk) => {
      raw += chunk;
    });
    req.on('end', () => {
      try {
        resolve(raw ? JSON.parse(raw) : {});
      } catch {
        resolve({});
      }
    });
  });
}

export default async function handler(req: CustomRequest, res: CustomResponse) {
  // CORS & method verification
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.statusCode = 200;
    res.end();
    return;
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return sendJson(res, 405, { success: false, message: 'Method Not Allowed' });
  }

  try {
    const rawIp =
      (req.headers['x-forwarded-for'] as string)?.split(',')[0].trim() ||
      req.socket?.remoteAddress ||
      'unknown';

    // Rate limit check
    if (isRateLimited(rawIp)) {
      return sendJson(res, 429, {
        success: false,
        message: 'Too many requests. Please wait a few minutes before trying again.'
      });
    }

    const body = await parseBody(req);
    const { name, email, subject, message, botField } = body;

    // 1. Honeypot Spam Protection
    if (botField && String(botField).trim() !== '') {
      // Silently return success to mislead spambots
      return sendJson(res, 200, { success: true, message: 'Message received.' });
    }

    // 2. Input validation
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return sendJson(res, 400, { success: false, message: 'Please provide your name.' });
    }

    if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return sendJson(res, 400, { success: false, message: 'Please provide a valid email address.' });
    }

    if (!message || typeof message !== 'string' || message.trim().length < 5) {
      return sendJson(res, 400, {
        success: false,
        message: 'Message must be at least 5 characters long.'
      });
    }

    const sanitizedName = name.trim().slice(0, 100);
    const sanitizedEmail = email.trim().slice(0, 100);
    const sanitizedSubject = (subject && typeof subject === 'string' ? subject.trim() : 'New Portfolio Inquiry').slice(0, 150);
    const sanitizedMessage = message.trim().slice(0, 3000);

    const apiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.CONTACT_TO_EMAIL || 'bariranisar9@gmail.com';

    // If Resend API key is not configured, signal client to fallback to mailto
    if (!apiKey) {
      return sendJson(res, 200, {
        success: false,
        fallback: true,
        message: 'Contact service API key not configured. Falling back to email client.'
      });
    }

    // Send email via Resend API
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        from: 'Portfolio Contact <onboarding@resend.dev>',
        to: [toEmail],
        reply_to: sanitizedEmail,
        subject: `[Portfolio] ${sanitizedSubject} — from ${sanitizedName}`,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px; background: #ffffff;">
            <h2 style="color: #6d28d9; margin-top: 0; font-size: 20px;">New Message from Portfolio Website</h2>
            <div style="margin: 16px 0; padding: 12px 16px; background: #f8fafc; border-radius: 8px;">
              <p style="margin: 4px 0; color: #334155;"><strong>Name:</strong> ${sanitizedName}</p>
              <p style="margin: 4px 0; color: #334155;"><strong>Email:</strong> <a href="mailto:${sanitizedEmail}" style="color: #7c3aed;">${sanitizedEmail}</a></p>
              <p style="margin: 4px 0; color: #334155;"><strong>Subject:</strong> ${sanitizedSubject}</p>
            </div>
            <h3 style="color: #1e293b; font-size: 15px; margin-bottom: 8px;">Message Content:</h3>
            <div style="background: #ffffff; padding: 16px; border-left: 4px solid #7c3aed; border-radius: 4px; white-space: pre-wrap; color: #1e293b; font-size: 14px; line-height: 1.6;">
${sanitizedMessage}
            </div>
            <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0;" />
            <p style="font-size: 11px; color: #94a3b8; margin: 0;">Sent automatically from Barira Nisar's Portfolio contact endpoint.</p>
          </div>
        `
      })
    });

    if (!resendResponse.ok) {
      const errorText = await resendResponse.text();
      console.error('Resend API error:', errorText);
      return sendJson(res, 502, {
        success: false,
        fallback: true,
        message: 'Email service error. Falling back to email client.'
      });
    }

    const data = await resendResponse.json();
    return sendJson(res, 200, {
      success: true,
      message: 'Message delivered successfully! I will get back to you soon.',
      id: data.id
    });
  } catch (err) {
    console.error('Contact handler error:', err);
    return sendJson(res, 500, {
      success: false,
      fallback: true,
      message: 'Internal server error. Falling back to email client.'
    });
  }
}
