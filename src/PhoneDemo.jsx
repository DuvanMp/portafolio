// Demo en video (celular o navegador) con los pasos sincronizados al lado.
// Los pasos y sus tiempos viven en content.js, dentro de cada proyecto.
import { useEffect, useRef, useState } from 'react';

export default function PhoneDemo({ src, poster, fullVideo, fullLabel, variant = 'phone', steps = [], label }) {
  const ref = useRef(null);
  const [active, setActive] = useState(0);

  // Reproduce solo cuando está en pantalla (ahorra datos) y respeta "reducir movimiento".
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) v.play().catch(() => {});
      else v.pause();
    }, { threshold: 0.4 });
    io.observe(v);
    return () => io.disconnect();
  }, []);

  const onTime = () => {
    const now = ref.current.currentTime;
    let i = 0;
    steps.forEach((s, k) => { if (now >= s.at) i = k; });
    setActive(i);
  };

  const jump = (i) => {
    const v = ref.current;
    v.currentTime = steps[i].at + 0.05;
    setActive(i);
    v.play().catch(() => {});
  };

  return (
    <figure className={`phone-demo is-${variant}`} aria-label={label}>
      <div className={variant === 'browser' ? 'browser' : 'phone'}>
        <video ref={ref} src={src} poster={poster} muted loop playsInline preload="metadata" onTimeUpdate={onTime} />
      </div>
      <div className="phone-steps">
        <ol>
          {steps.map((s, i) => (
            <li key={s.title} className={i === active ? 'is-active' : ''}>
              <button type="button" onClick={() => jump(i)} aria-current={i === active ? 'step' : undefined}>
                <span className="n">{i + 1}</span>
                <span>
                  <strong>{s.title}</strong>
                  <span className="d">{s.desc}</span>
                </span>
              </button>
            </li>
          ))}
        </ol>
        {fullVideo && (
          <a className="full-video" href={fullVideo} target="_blank" rel="noreferrer">{fullLabel}</a>
        )}
      </div>
    </figure>
  );
}
