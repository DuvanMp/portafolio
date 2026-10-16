// Función serverless de Node.js (Vercel): recibe el formulario y te lo envía por correo con Resend.
// Variables de entorno necesarias en Vercel:
//   RESEND_API_KEY     -> tu API key de https://resend.com
//   CONTACT_TO_EMAIL   -> el correo donde quieres recibir los mensajes
//   CONTACT_FROM_EMAIL -> opcional; por defecto "Portafolio <onboarding@resend.dev>"

const isEmail = (v) => typeof v === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
const clean = (v, max) => String(v ?? '').trim().slice(0, max);
const escape = (s) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Método no permitido' });
  }

  let body = req.body || {};
  if (typeof body === 'string') {
    try { body = JSON.parse(body || '{}'); } catch { return res.status(400).json({ error: 'JSON inválido' }); }
  }

  // Bots: si llenan el campo oculto, respondemos OK sin enviar nada.
  if (body.website) return res.status(200).json({ ok: true });

  const name = clean(body.name, 100);
  const email = clean(body.email, 200);
  const message = clean(body.message, 5000);

  if (!name || !isEmail(email) || message.length < 10) {
    return res.status(400).json({ error: 'Datos incompletos' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !to) {
    return res.status(500).json({ error: 'El envío de correo no está configurado' });
  }

  const r = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL || 'Portafolio <onboarding@resend.dev>',
      to: [to],
      reply_to: email,
      subject: `Nuevo mensaje del portafolio: ${name}`,
      html: `<p><strong>Nombre:</strong> ${escape(name)}</p>
             <p><strong>Correo:</strong> ${escape(email)}</p>
             <p><strong>Mensaje:</strong></p>
             <p style="white-space:pre-wrap">${escape(message)}</p>`,
    }),
  });

  if (!r.ok) {
    return res.status(502).json({ error: 'No se pudo enviar el correo' });
  }
  return res.status(200).json({ ok: true });
}
