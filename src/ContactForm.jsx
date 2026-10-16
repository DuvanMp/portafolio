import { useState } from 'react';

export default function ContactForm({ t, email }) {
  const [form, setForm] = useState({ name: '', email: '', message: '', website: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error | invalid

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  async function onSubmit(e) {
    e.preventDefault();
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
    if (!form.name.trim() || !validEmail || form.message.trim().length < 10) {
      setStatus('invalid');
      return;
    }
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus('sent');
      setForm({ name: '', email: '', message: '', website: '' });
    } catch {
      setStatus('error');
    }
  }

  return (
    <form className="form" onSubmit={onSubmit} noValidate>
      <label>
        <span>{t.name}</span>
        <input name="name" value={form.name} onChange={update} autoComplete="name" required />
      </label>
      <label>
        <span>{t.email}</span>
        <input name="email" type="email" value={form.email} onChange={update} autoComplete="email" required />
      </label>
      <label>
        <span>{t.message}</span>
        <textarea name="message" rows="5" value={form.message} onChange={update} required />
      </label>
      {/* Campo trampa contra bots: las personas no lo ven */}
      <input className="hp" name="website" value={form.website} onChange={update} tabIndex="-1" autoComplete="off" aria-hidden="true" />

      <button className="btn btn-primary" type="submit" disabled={status === 'sending'}>
        {status === 'sending' ? t.sending : t.send}
      </button>

      <p className={`form-status ${status}`} role="status" aria-live="polite">
        {status === 'sent' && t.sent}
        {status === 'invalid' && t.required}
        {status === 'error' && (<>{t.error} <a href={`mailto:${email}`}>{email}</a></>)}
      </p>
    </form>
  );
}
