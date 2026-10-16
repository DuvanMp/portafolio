import { useEffect, useState } from 'react';
import { content, profile } from './content.js';
import Trace from './Trace.jsx';
import ContactForm from './ContactForm.jsx';

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
          <a className="brand" href="#top">{profile.name}</a>
          <nav aria-label="Principal">
            {sections.map((id) => (
              <a key={id} href={`#${id}`}>{t.nav[id]}</a>
            ))}
          </nav>
          <div className="lang" role="group" aria-label="Idioma / Language">
            {['es', 'en'].map((l) => (
              <button key={l} type="button" aria-pressed={lang === l} onClick={() => setLang(l)}>
                {l.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main id="top">
        <section className="hero wrap">
          <div className="hero-text">
            <p className="role">{t.hero.role}</p>
            <h1>{t.hero.title}</h1>
            <p className="lead">{t.hero.intro}</p>
            <div className="actions">
              <a className="btn btn-primary" href="#contact">{t.hero.ctaPrimary}</a>
              <a className="btn btn-ghost" href="#projects">{t.hero.ctaSecondary}</a>
            </div>
          </div>
          <Trace spans={t.trace} total={t.traceTotal} caption={t.hero.traceCaption} />
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
              <article key={p.name} className="project">
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
