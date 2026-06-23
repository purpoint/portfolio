import { useLayoutEffect, useRef } from 'react';
import { gsap } from '../../lib/gsap';
import type { Project } from '../../data';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import DeviceLaptop from './DeviceLaptop';
import DevicePhone from './DevicePhone';

interface WorkPanelProps {
  project: Project;
  i: number;
  N: number;
  active: boolean;
}

/**
 * One project panel in the horizontal Work filmstrip. Renders the project's
 * own-color identity column + device mockup. When `active` becomes true,
 * stats count up from zero.
 */
export default function WorkPanel({ project, i, N, active }: WorkPanelProps) {
  const reduced = useReducedMotion();
  const statsRef = useRef<HTMLDivElement>(null);
  const playedRef = useRef(false);
  const { accent } = project;

  // Count stats up when the panel becomes active (numeric stats only; for
  // strings like "<100ms" we animate just the number portion).
  useLayoutEffect(() => {
    if (!active || playedRef.current || reduced) return;
    playedRef.current = true;
    const nodes = statsRef.current?.querySelectorAll<HTMLElement>('.stat-value');
    if (!nodes) return;
    nodes.forEach((el) => {
      const raw = el.dataset.target || '';
      const match = raw.match(/-?\d+(?:\.\d+)?/);
      if (!match) {
        el.textContent = raw;
        return;
      }
      const target = parseFloat(match[0]);
      const decimals = (match[0].split('.')[1] || '').length;
      const before = raw.slice(0, match.index);
      const after = raw.slice((match.index || 0) + match[0].length);
      const o = { v: 0 };
      gsap.to(o, {
        v: target,
        duration: 1.4,
        ease: 'power2.out',
        onUpdate: () => {
          el.textContent = `${before}${o.v.toFixed(decimals)}${after}`;
        },
      });
    });
  }, [active, reduced]);

  const Device = project.device === 'phone' ? DevicePhone : DeviceLaptop;

  return (
    <article
      className="work-panel relative flex h-screen w-screen flex-shrink-0 items-center px-6 will-change-transform sm:px-12 lg:px-20"
      style={{
        ['--accent' as never]: `rgba(${accent.primary},1)`,
        ['--accent-soft' as never]: `rgba(${accent.primary},0.55)`,
        transformStyle: 'preserve-3d',
        transformOrigin: 'center center',
        backfaceVisibility: 'hidden',
      }}
    >
      {/* Per-project glows */}
      <span
        className="pointer-events-none absolute -left-[10%] top-1/4 h-[60vmax] w-[60vmax] rounded-full opacity-[0.22] blur-[140px]"
        style={{ background: `radial-gradient(circle, rgba(${accent.primary},0.7), transparent 65%)` }}
        aria-hidden="true"
      />
      <span
        className="pointer-events-none absolute -right-[10%] bottom-[10%] h-[55vmax] w-[55vmax] rounded-full opacity-[0.18] blur-[140px]"
        style={{ background: `radial-gradient(circle, rgba(${accent.secondary},0.55), transparent 65%)` }}
        aria-hidden="true"
      />

      <div className="relative z-10 grid w-full items-center gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
        {/* ── Left: identity ── */}
        <div>
          {/* Status pill */}
          <span
            className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em]"
            style={{
              borderColor: `rgba(${accent.primary},0.4)`,
              background: `rgba(${accent.primary},0.08)`,
              color: accent.dot,
            }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            {project.live ? 'Live' : 'Open source'} · {accent.tag}
          </span>

          <h2 className="mt-5 font-display text-[clamp(40px,5.6vw,82px)] font-semibold leading-[0.96] tracking-[-0.02em] text-ink">
            {project.name}
          </h2>
          <p className="mt-3 max-w-md text-base text-ink-muted sm:text-lg">{project.tagline}</p>

          {/* Stack chips — tinted to the accent */}
          <div className="mt-6 flex flex-wrap gap-1.5">
            {project.stack.slice(0, 8).map((s) => (
              <span
                key={s}
                className="rounded-md border px-2.5 py-1 text-[11px] text-ink/85"
                style={{ borderColor: 'rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.025)' }}
              >
                {s}
              </span>
            ))}
          </div>

          {/* Bullets */}
          <ul className="mt-6 flex max-w-md flex-col gap-2 text-[13.5px] leading-relaxed text-ink/80">
            {project.bullets.slice(0, 3).map((b, k) => (
              <li key={k} className="flex gap-3">
                <span
                  className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full"
                  style={{ background: accent.dot }}
                  aria-hidden="true"
                />
                {b}
              </li>
            ))}
          </ul>

          {/* Metric stats */}
          <div ref={statsRef} className="mt-6 grid max-w-md grid-cols-3 gap-2">
            {project.stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border p-3"
                style={{ borderColor: 'rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.035)' }}
              >
                <div
                  className="stat-value font-display text-[clamp(20px,2.1vw,28px)] font-semibold leading-none text-white"
                  data-target={stat.value}
                >
                  {reduced ? stat.value : '0'}
                </div>
                <div className="mt-1.5 font-mono text-[9.5px] uppercase tracking-[0.16em] text-ink-muted">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div className="mt-6 flex flex-wrap gap-2.5">
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-[13px] font-medium text-white transition-transform duration-200 hover:-translate-y-0.5"
                style={{
                  backgroundImage: `linear-gradient(120deg, rgb(${accent.primary}), rgb(${accent.secondary}))`,
                  boxShadow: `0 10px 30px -10px rgba(${accent.primary},0.7)`,
                }}
              >
                Live demo <span aria-hidden="true">↗</span>
              </a>
            )}
            <a
              href={project.code}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-xl border px-4 py-2.5 text-[13px] font-medium text-ink transition-all duration-200 hover:-translate-y-0.5"
              style={{
                borderColor: `rgba(${accent.primary},0.35)`,
                background: 'rgba(255,255,255,0.025)',
              }}
            >
              View code <span aria-hidden="true">→</span>
            </a>
          </div>

          <div className="mt-8 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-muted">
            <span style={{ color: accent.dot }}>0{i + 1}</span>
            <span className="mx-1.5 text-ink-faint">/</span>
            <span>0{N}</span>
            <span className="mx-2 text-ink-faint">·</span>
            <span className="text-ink-faint">{project.name}</span>
          </div>
        </div>

        {/* ── Right: device ── */}
        <div className="relative flex items-center justify-center" style={{ perspective: '1200px' }}>
          <div
            className="work-device max-w-full"
            style={{
              transform: 'rotateY(-9deg) rotateX(4deg)',
              transformStyle: 'preserve-3d',
              width: project.device === 'phone' ? 280 : 680,
            }}
          >
            <Device project={project} />
          </div>
        </div>
      </div>
    </article>
  );
}
