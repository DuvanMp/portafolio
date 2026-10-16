// Demo de la app móvil: el celular en video y los pasos sincronizados al lado.
import { useEffect, useRef, useState } from 'react';

// Segundo en que empieza cada paso dentro de fincamedir-movil.mp4
const starts = [0, 3.5, 9.5, 12.5, 24, 27, 31.5, 40];

const text = {
  es: {
    steps: [
      ['Abre la app', 'Botones grandes, lenguaje sencillo y funciona sin internet.'],
      ['Crea la ficha de la finca', 'Nombre, propietario y municipio; el GPS detecta la ubicación.'],
      ['Activa el GPS', 'La app muestra la precisión de la señal antes de medir.'],
      ['Camina el lindero', 'Marca cada esquina o deja el marcado automático.'],
      ['Calcula el área', 'Une los puntos y calcula área y perímetro al instante.'],
      ['Guarda el lote', 'Nombre y uso del suelo: potrero, cultivo, corral o bosque.'],
      ['Organiza la finca', 'Todos los lotes en el mapa con el resumen de hectáreas.'],
      ['Exporta el informe', 'PDF o KML para compartir o abrir en Google Earth.'],
    ],
    full: 'Ver el video completo, con la plataforma web',
    label: 'Demostración de la app FincaMedir Rural',
  },
  en: {
    steps: [
      ['Open the app', 'Large buttons, plain language, and it works offline.'],
      ['Create the farm record', 'Name, owner and town; GPS detects the location.'],
      ['Turn on GPS', 'The app shows signal accuracy before measuring.'],
      ['Walk the boundary', 'Mark each corner or let automatic marking do it.'],
      ['Get the area', 'Joins the points and computes area and perimeter instantly.'],
      ['Save the plot', 'Name and land use: pasture, crops, corral or forest.'],
      ['Organize the farm', 'Every plot on the map with a hectare summary.'],
      ['Export the report', 'PDF or KML to share or open in Google Earth.'],
    ],
    full: 'Watch the full video, including the web platform',
    label: 'FincaMedir Rural app demo',
  },
};

export default function PhoneDemo({ src, poster, fullVideo, lang }) {
  const t = text[lang] || text.es;
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
    starts.forEach((s, k) => { if (now >= s) i = k; });
    setActive(i);
  };

  const jump = (i) => {
    const v = ref.current;
    v.currentTime = starts[i] + 0.05;
    setActive(i);
    v.play().catch(() => {});
  };

  return (
    <figure className="phone-demo" aria-label={t.label}>
      <div className="phone">
        <video
          ref={ref}
          src={src}
          poster={poster}
          muted
          loop
          playsInline
          preload="metadata"
          onTimeUpdate={onTime}
        />
      </div>
      <div className="phone-steps">
        <ol>
          {t.steps.map(([title, desc], i) => (
            <li key={title} className={i === active ? 'is-active' : ''}>
              <button type="button" onClick={() => jump(i)} aria-current={i === active ? 'step' : undefined}>
                <span className="n">{i + 1}</span>
                <span>
                  <strong>{title}</strong>
                  <span className="d">{desc}</span>
                </span>
              </button>
            </li>
          ))}
        </ol>
        {fullVideo && (
          <a className="full-video" href={fullVideo} target="_blank" rel="noreferrer">{t.full}</a>
        )}
      </div>
    </figure>
  );
}
