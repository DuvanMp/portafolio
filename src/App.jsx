import { useEffect, useState } from 'react';
import { content, profile } from './content.js';
import Trace from './Trace.jsx';
import ContactForm from './ContactForm.jsx';

const icons = {
  github: 'M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.33-1.28-1.69-1.28-1.69-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.42-2.7 5.39-5.26 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z',
  linkedin: 'M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.73V1.73C24 .77 23.21 0 22.23 0Z',
  email: 'M2 4h20a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Zm10 8.2L3.5 6.5v.3L12 13.7l8.5-6.9v-.3L12 12.2Z',
};

function Social() {
  const items = [
    ...Object.entries(profile.links).filter(([, url]) => url).map(([k, url]) => ({ k, url, label: k === 'github' ? 'GitHub' : 'LinkedIn' })),
    { k: 'email', url: `mailto:${profile.email}`, label: 'Email' },
  ];
  return (
    <ul className="social">
      {items.map(({ k, url, label }) => (
        <li key={k}>
          <a href={url} target={k === 'email' ? undefined : '_blank'} rel="noreferrer" aria-label={label} title={label}>
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d={icons[k]} fill="currentColor" /></svg>
          </a>
        </li>
      ))}
    </ul>
  );
}

function getInitialLang() {
  try {
    const saved = localStorage.getItem('lang');
    if (saved === 'es' || saved === 'en') return saved;
  } catch {}
  return navigator.language?.startsWith('es') ? 'es' : 'en';
}

export default function App() {
  const [lang, setLang] = useState(getInitialLang);
  const t = content[lang];

  useEffect(() => {
    document.documentElement.lang = lang;
    try { localStorage.setItem('lang', lang); } catch {}
  }, [lang]);

  const sections = ['about', 'services', 'experience', 'projects', 'contact'];

  return (
    <>
      <header className="topbar">
        <div className="wrap topbar-inner">
          <a className="brand" href="#top">
            <img src={profile.photo} alt="" width="32" height="32" />
            <span>{profile.name}</span>
          </a>
          <nav aria-label="Principal">
            {sections.map((id) => (
              <a key={id} href={`#${id}`}>{t.nav[id]}</a>
            ))}
          </nav>
          <div className="top-right">
            <Social />
            <div className="lang" role="group" aria-label="Idioma / Language">
              {['es', 'en'].map((l) => (
                <button key={l} type="button" aria-pressed={lang === l} onClick={() => setLang(l)}>
                  {l.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      <main id="top">
        <section className="hero wrap">
          <img className="avatar" src={profile.photo} alt={profile.name} width="168" height="168" />
          <h1>
            <span>{profile.firstName}</span> <span className="last">{profile.lastName}</span>
          </h1>
          <p className="role">{t.hero.role}</p>
          {t.hero.lines.map((l) => <p key={l} className="hero-line">{l}</p>)}
          <div className="actions">
            <a className="btn btn-primary" href="#contact">{t.hero.ctaPrimary}</a>
            <a className="btn btn-ghost" href="#projects">{t.hero.ctaSecondary}</a>
          </div>
        </section>

        <section className="wrap featured" aria-labelledby="featured-title">
          <h2 id="featured-title">{t.hero.featured}</h2>
          <div className="featured-card">
            <Trace spans={t.trace} total={t.traceTotal} caption={t.hero.traceCaption} />
            <div className="featured-text">
              <h3>{t.hero.title}</h3>
              <p>{t.hero.intro}</p>
            </div>
          </div>
        </section>

        <section id="about" className="wrap section about">
          <h2>{t.about.title}</h2>
          <div className="about-grid">
            <div className="prose">
              {t.about.body.map((p, i) => <p key={i}>{p}</p>)}
            </div>
            <dl className="facts">
              {t.about.facts.map((f) => (
                <div key={f.label}>
                  <dt>{f.value}</dt>
                  <dd>{f.label}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section id="services" className="wrap section">
          <h2>{t.services.title}</h2>
          <dl className="services">
            {t.services.items.map((s) => (
              <div key={s.name}>
                <dt>{s.name}</dt>
                <dd>{s.desc}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section id="experience" className="wrap section">
          <h2>{t.experience.title}</h2>
          <ol className="timeline">
            {t.experience.items.map((e) => (
              <li key={e.company}>
                <span className="period">{e.period}</span>
                <div>
                  <h3>{e.company}</h3>
                  <p className="job-role">{e.role}</p>
                  <p>{e.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section id="projects" className="wrap section">
          <h2>{t.projects.title}</h2>
          <p className="muted">{t.projects.note}</p>
          <div className="projects">
            {t.projects.items.map((p) => (
              <article key={p.name} className={`project${p.video ? ' project-video' : ''}`}>
                {p.video && (
                  <video className="demo" src={p.video} poster={p.poster} controls muted playsInline preload="none" />
                )}
                <header>
                  <h3>{p.name}</h3>
                  <p className="context">{p.context}</p>
                </header>
                <div className="project-body">
                  <p className="problem">{p.problem}</p>
                  <p>{p.solution}</p>
                  <ul className="stack" aria-label="Tecnologías">
                    {p.stack.map((s) => <li key={s}>{s}</li>)}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="contact" className="contact">
          <div className="wrap contact-grid">
            <div>
              <h2>{t.contact.title}</h2>
              <p className="lead">{t.contact.body}</p>
              <p className="muted">
                {t.contact.orEmail} <a href={`mailto:${profile.email}`}>{profile.email}</a>
              </p>
              <ul className="links">
                {Object.entries(profile.links).filter(([, url]) => url).map(([k, url]) => (
                  <li key={k}><a href={url} target="_blank" rel="noreferrer">{k === 'github' ? 'GitHub' : 'LinkedIn'}</a></li>
                ))}
              </ul>
            </div>
            <ContactForm t={t.contact} email={profile.email} />
          </div>
        </section>
      </main>

      <footer className="wrap footer">
        <span>© {new Date().getFullYear()} {profile.name}, {profile.location}</span>
        <span>{t.footer}</span>
      </footer>
    </>
  );
}
