// Diagrama de traza (estilo AWS X-Ray): cada barra es una capa del sistema.
export default function Trace({ spans, total, caption }) {
  const end = Math.max(...spans.map((s) => s.start + s.ms));
  const pct = (v) => `${(v / end) * 100}%`;

  return (
    <figure className="trace" aria-label={caption}>
      <div className="trace-head">
        <span>{total}</span>
        <span className="num">{end} ms</span>
      </div>
      <div className="trace-total"><span /></div>
      <ul>
        {spans.map((s, i) => (
          <li key={s.label} style={{ '--i': i }}>
            <span className="trace-label">{s.label}</span>
            <span className="trace-track">
              <span
                className={`trace-bar tone-${s.tone}`}
                style={{ left: pct(s.start), width: pct(s.ms) }}
              />
            </span>
            <span className="num trace-ms">{s.ms} ms</span>
          </li>
        ))}
      </ul>
      <figcaption>{caption}</figcaption>
    </figure>
  );
}
