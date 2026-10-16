// Diagramas animados de arquitectura (ilustrativos) para los proyectos hechos en empresas.
import { useEffect, useState } from 'react';

const W = 150; // ancho de cada nodo

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    if (!mq) return;
    setReduced(mq.matches);
    const on = (e) => setReduced(e.matches);
    mq.addEventListener?.('change', on);
    return () => mq.removeEventListener?.('change', on);
  }, []);
  return reduced;
}

function Node({ x, y, h = 56, title, sub, tone = 'base' }) {
  return (
    <g className={`d-node d-${tone}`}>
      <rect x={x} y={y} width={W} height={h} rx="10" />
      <text x={x + W / 2} y={y + h / 2 - (sub ? 4 : -5)} className="d-title">{title}</text>
      {sub && <text x={x + W / 2} y={y + h / 2 + 15} className="d-sub">{sub}</text>}
    </g>
  );
}

function Dot({ path, dur, begin, tone = 'a', r = 5.5 }) {
  return (
    <circle r={r} className={`d-dot d-dot-${tone}`} visibility="hidden">
      <set attributeName="visibility" to="visible" begin={begin} />
      <animateMotion dur={dur} begin={begin} repeatCount="indefinite" path={path} />
    </circle>
  );
}

const labels = {
  es: {
    migration: {
      old: ['Core anterior', 'Base de datos'],
      extract: ['Extracción', 'Por lotes programados'],
      worker: 'Proceso paralelo',
      validate: ['Validación', 'Integridad de datos'],
      target: ['Nuevo core', 'Bancario'],
      progress: 'Migración en paralelo',
    },
    events: {
      app: ['Aplicación', 'Nueva operación'],
      bus: ['EventBridge', 'Bus de eventos'],
      queue: ['Cola SQS', 'Mensajes'],
      svc: ['Servicio .NET', 'En Kubernetes (EKS)'],
      audit: ['Auditoría', 'DynamoDB'],
      dlq: ['Cola de errores', 'Reintento automático'],
      watch: ['CloudWatch', 'Alertas'],
      legend: ['Flujo normal', 'Reintento ante un fallo', 'Monitoreo'],
    },
    caption: 'Diagrama ilustrativo de la arquitectura',
    hint: 'Desliza para ver todo',
  },
  en: {
    migration: {
      old: ['Legacy core', 'Database'],
      extract: ['Extraction', 'Scheduled batches'],
      worker: 'Parallel worker',
      validate: ['Validation', 'Data integrity'],
      target: ['New core', 'Banking system'],
      progress: 'Parallel migration',
    },
    events: {
      app: ['Application', 'New operation'],
      bus: ['EventBridge', 'Event bus'],
      queue: ['SQS queue', 'Messages'],
      svc: ['.NET service', 'On Kubernetes (EKS)'],
      audit: ['Audit log', 'DynamoDB'],
      dlq: ['Dead-letter queue', 'Automatic retry'],
      watch: ['CloudWatch', 'Alerts'],
      legend: ['Normal flow', 'Retry after a failure', 'Monitoring'],
    },
    caption: 'Illustrative architecture diagram',
    hint: 'Swipe to see it all',
  },
};

function Migration({ t, animate }) {
  const lanes = [65, 135, 205, 275];
  const lanePath = (y) =>
    `M170,170 L365,170 C392,170 392,${y} 420,${y} L570,${y} C597,${y} 597,170 625,170 L830,170`;
  return (
    <>
      <g className="d-edges">
        <path d="M170,170 L215,170" />
        {lanes.map((y) => <path key={y} d={`M365,170 C392,170 392,${y} 420,${y}`} />)}
        {lanes.map((y) => <path key={`o${y}`} d={`M570,${y} C597,${y} 597,170 625,170`} />)}
        <path d="M775,170 L830,170" />
      </g>
      {animate && lanes.map((y, i) =>
        [0, 1].map((k) => (
          <Dot key={`${y}-${k}`} path={lanePath(y)} dur="3.2s" begin={`${i * 0.35 + k * 1.6}s`} tone={i % 2 ? 'b' : 'a'} />
        ))
      )}
      <Node x={20} y={142} title={t.old[0]} sub={t.old[1]} />
      <Node x={215} y={142} title={t.extract[0]} sub={t.extract[1]} tone="accent" />
      {lanes.map((y, i) => <Node key={y} x={420} y={y - 25} h={50} title={`${t.worker} ${i + 1}`} tone="lane" />)}
      <Node x={625} y={142} title={t.validate[0]} sub={t.validate[1]} tone="accent" />
      <Node x={830} y={142} title={t.target[0]} sub={t.target[1]} tone="target" />
      <g className="d-progress">
        <text x="20" y="338" className="d-sub d-left">{t.progress}</text>
        <rect x="220" y="328" width="760" height="8" rx="4" className="d-track" />
        <rect x="220" y="328" width="760" height="8" rx="4" className={`d-fill${animate ? ' is-anim' : ''}`} />
      </g>
    </>
  );
}

function Events({ t, animate }) {
  const main = 'M170,178 L820,178';
  const fail = 'M680,206 C680,303 600,303 560,303 L485,303 L485,206';
  return (
    <>
      <g className="d-edges">
        <path d={main} />
        <path d="M680,206 C680,303 600,303 560,303" className="d-warn" />
        <path d="M485,275 L485,206" className="d-dashed d-warn" />
        <path d="M680,150 L680,81" className="d-dashed" />
      </g>
      {animate && (
        <>
          {[0, 0.9, 1.8].map((b) => <Dot key={b} path={main} dur="2.7s" begin={`${b}s`} tone="a" />)}
          <Dot path={fail} dur="2.6s" begin="1.2s" tone="c" />
          <Dot path="M680,150 L680,81" dur="1.6s" begin="0.5s" tone="b" r={4} />
        </>
      )}
      <Node x={20} y={150} title={t.app[0]} sub={t.app[1]} />
      <Node x={215} y={150} title={t.bus[0]} sub={t.bus[1]} tone="accent" />
      <Node x={410} y={150} title={t.queue[0]} sub={t.queue[1]} tone="accent" />
      <Node x={605} y={150} title={t.svc[0]} sub={t.svc[1]} tone="lane" />
      <Node x={820} y={150} title={t.audit[0]} sub={t.audit[1]} tone="target" />
      <Node x={410} y={275} title={t.dlq[0]} sub={t.dlq[1]} tone="warn" />
      <Node x={605} y={25} title={t.watch[0]} sub={t.watch[1]} />
      <g className="d-legend">
        {t.legend.map((l, i) => (
          <g key={l} transform={`translate(${20 + i * 200}, 40)`}>
            <circle r="5" cx="5" cy="-4" className={`d-dot d-dot-${['a', 'c', 'b'][i]}`} />
            <text x="18" y="0" className="d-sub d-left">{l}</text>
          </g>
        ))}
      </g>
    </>
  );
}

export default function Diagram({ type, lang }) {
  const animate = !useReducedMotion();
  const t = labels[lang] || labels.es;
  const View = type === 'events' ? Events : Migration;
  return (
    <figure className="diagram">
      <div className="scroll" tabIndex="0" aria-label={t.caption}>
        <svg viewBox="0 0 1000 350" role="img" aria-label={t.caption}>
          <View t={t[type]} animate={animate} />
        </svg>
      </div>
      <figcaption><span className="hint">{t.hint} · </span>{t.caption}</figcaption>
    </figure>
  );
}
