// ArqOne Labs — Contact Form Worker
// Deploy to Cloudflare Workers (free tier: 100k requests/day)
//
// SETUP:
// 1. Go to workers.cloudflare.com → Create Worker → paste this code
// 2. Settings → Variables → Add Secret: RESEND_API_KEY = your Resend API key
// 3. Copy your Worker URL (e.g. https://arqone-contact.YOUR_SUBDOMAIN.workers.dev)
// 4. Paste that URL into contact.html as WORKER_URL
// Note: sends FROM contact@ainavigator.info (already verified in Resend) → TO arqonelabs@ainavigator.info

export default {
  async fetch(request, env) {

    const ALLOWED_ORIGINS = [
      'https://arqonelabs.com',
      'https://www.arqonelabs.com',
      'https://icarus2005.github.io',
    ];

    const origin = request.headers.get('Origin') || '';
    const corsOrigin = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];

    const corsHeaders = {
      'Access-Control-Allow-Origin': corsOrigin,
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Content-Type': 'application/json',
    };

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    if (request.method !== 'POST') {
      return new Response(JSON.stringify({ error: 'Method not allowed' }), {
        status: 405, headers: corsHeaders
      });
    }

    try {
      const formData = await request.formData();
      const name     = formData.get('name')     || '';
      const email    = formData.get('email')    || '';
      const company  = formData.get('company')  || 'Not provided';
      const interest = formData.get('interest') || '';
      const message  = formData.get('message')  || '';

      if (!name || !email || !message) {
        return new Response(JSON.stringify({ error: 'Missing required fields' }), {
          status: 400, headers: corsHeaders
        });
      }

      const html = `
        <div style="font-family: Inter, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px; background: #08080C; color: #C8C8D0; border-radius: 12px;">
          <div style="border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 20px; margin-bottom: 28px;">
            <span style="font-family: monospace; font-size: 11px; color: #00DCD0; letter-spacing: 0.15em; text-transform: uppercase;">ArqOne Labs</span>
            <h2 style="color: #F0F0F4; font-size: 22px; font-weight: 700; margin: 8px 0 0; letter-spacing: -0.02em;">New Contact Form Submission</h2>
          </div>

          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.05); width: 130px;">
                <span style="font-family: monospace; font-size: 11px; color: #68687A; letter-spacing: 0.1em; text-transform: uppercase;">Name</span>
              </td>
              <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.05); color: #F0F0F4; font-weight: 500;">${escapeHtml(name)}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.05);">
                <span style="font-family: monospace; font-size: 11px; color: #68687A; letter-spacing: 0.1em; text-transform: uppercase;">Email</span>
              </td>
              <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.05);">
                <a href="mailto:${escapeHtml(email)}" style="color: #00DCD0; text-decoration: none;">${escapeHtml(email)}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.05);">
                <span style="font-family: monospace; font-size: 11px; color: #68687A; letter-spacing: 0.1em; text-transform: uppercase;">Company</span>
              </td>
              <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.05); color: #C8C8D0;">${escapeHtml(company)}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.05);">
                <span style="font-family: monospace; font-size: 11px; color: #68687A; letter-spacing: 0.1em; text-transform: uppercase;">Interested in</span>
              </td>
              <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.05);">
                <span style="display: inline-block; padding: 3px 10px; background: rgba(0,220,205,0.08); border: 1px solid rgba(0,220,205,0.2); border-radius: 4px; color: #00DCD0; font-size: 13px;">${escapeHtml(interest)}</span>
              </td>
            </tr>
          </table>

          <div style="margin-top: 28px;">
            <span style="font-family: monospace; font-size: 11px; color: #68687A; letter-spacing: 0.1em; text-transform: uppercase;">Message</span>
            <div style="margin-top: 12px; padding: 20px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); border-radius: 8px; color: #C8C8D0; line-height: 1.7; white-space: pre-wrap;">${escapeHtml(message)}</div>
          </div>

          <div style="margin-top: 28px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.08);">
            <a href="mailto:${escapeHtml(email)}" style="display: inline-block; padding: 12px 24px; background: #00DCD0; color: #08080C; font-weight: 600; font-size: 14px; border-radius: 6px; text-decoration: none;">Reply to ${escapeHtml(name)}</a>
          </div>
        </div>
      `;

      const autoReplyHtml = `
        <div style="font-family: Inter, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px; background: #08080C; color: #C8C8D0; border-radius: 12px;">
          <div style="border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 20px; margin-bottom: 28px;">
            <span style="font-family: monospace; font-size: 11px; color: #00DCD0; letter-spacing: 0.15em; text-transform: uppercase;">ArqOne Labs</span>
            <h2 style="color: #F0F0F4; font-size: 22px; font-weight: 700; margin: 8px 0 0; letter-spacing: -0.02em;">We received your message</h2>
          </div>

          <p style="color: #C8C8D0; line-height: 1.7; margin: 0 0 20px;">Hi ${escapeHtml(name)},</p>

          <p style="color: #C8C8D0; line-height: 1.7; margin: 0 0 20px;">
            Thanks for reaching out. I've received your enquiry about
            <span style="color: #00DCD0; font-weight: 500;">${escapeHtml(interest)}</span>
            and will get back to you within 1–2 business days.
          </p>

          <div style="margin: 28px 0; padding: 20px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); border-radius: 8px;">
            <span style="font-family: monospace; font-size: 11px; color: #68687A; letter-spacing: 0.1em; text-transform: uppercase;">Your message</span>
            <div style="margin-top: 12px; color: #C8C8D0; line-height: 1.7; white-space: pre-wrap;">${escapeHtml(message)}</div>
          </div>

          <p style="color: #C8C8D0; line-height: 1.7; margin: 0 0 8px;">In the meantime, feel free to explore what we've built at <a href="https://arqonelabs.com" style="color: #00DCD0; text-decoration: none;">arqonelabs.com</a>.</p>

          <p style="color: #C8C8D0; line-height: 1.7; margin: 28px 0 4px;">Piero Saleme</p>
          <p style="font-family: monospace; font-size: 12px; color: #68687A; margin: 0;">Founder, ArqOne Labs</p>

          <div style="margin-top: 32px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.08);">
            <p style="font-family: monospace; font-size: 11px; color: #68687A; margin: 0;">You're receiving this because you submitted the contact form at arqonelabs.com.</p>
          </div>
        </div>
      `;

      // Send notification to Piero and auto-reply to sender in parallel
      const [resendRes, autoReplyRes] = await Promise.all([
        fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${env.RESEND_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'ArqOne Labs <contact@ainavigator.info>',
            to: ['arqonelabs@ainavigator.info'],
            reply_to: email,
            subject: `[ArqOne Labs] ${interest} — ${name}`,
            html,
          }),
        }),
        fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${env.RESEND_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'Piero Saleme — ArqOne Labs <contact@ainavigator.info>',
            to: [email],
            subject: `We received your message — ArqOne Labs`,
            html: autoReplyHtml,
          }),
        }),
      ]);

      if (resendRes.ok) {
        return new Response(JSON.stringify({ success: true }), { headers: corsHeaders });
      } else {
        const errBody = await resendRes.text();
        console.error('Resend error:', errBody);
        return new Response(JSON.stringify({ error: 'Email delivery failed' }), {
          status: 500, headers: corsHeaders
        });
      }

    } catch (err) {
      console.error('Worker error:', err);
      return new Response(JSON.stringify({ error: 'Internal error' }), {
        status: 500, headers: corsHeaders
      });
    }
  }
};

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
