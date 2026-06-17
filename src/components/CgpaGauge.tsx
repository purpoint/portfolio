import { useLayoutEffect, useRef } from 'react';
import { gsap } from '../lib/gsap';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface CgpaGaugeProps {
  value: number;
  max?: number;
}

/**
 * Radial CGPA gauge. The accent arc draws to value/max with a bright comet
 * tracing its leading edge, the centre number counts up in sync, and it punches
 * with a glow pulse on arrival. Re-animates on scroll-enter, reverses on
 * scroll-up. Static final state under reduced motion.
 */
export default function CgpaGauge({ value, max = 10 }: CgpaGaugeProps) {
  const wrap = useRef<HTMLDivElement>(null);
  const arc = useRef<SVGCircleElement>(null);
  const comet = useRef<SVGCircleElement>(null);
  const num = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();

  const R = 100;
  const CX = 120;
  const C = 2 * Math.PI * R;
  const pct = Math.min(1, value / max);

  const cometAt = (f: number) => ({
    x: CX + R * Math.cos(f * 2 * Math.PI),
    y: CX + R * Math.sin(f * 2 * Math.PI),
  });

  useLayoutEffect(() => {
    const arcEl = arc.current;
    const numEl = num.current;
    const cometEl = comet.current;
    if (!arcEl || !numEl || !cometEl) return;

    const place = (f: number) => {
      arcEl.style.strokeDashoffset = String(C * (1 - f));
      numEl.textContent = (f * max).toFixed(1);
      const p = cometAt(f);
      cometEl.setAttribute('cx', String(p.x));
      cometEl.setAttribute('cy', String(p.y));
    };

    if (reduced) {
      place(pct);
      cometEl.style.opacity = '1';
      return;
    }

    const ctx = gsap.context(() => {
      const o = { v: 0 };
      gsap.to(o, {
        v: pct,
        duration: 1.9,
        ease: 'power3.out',
        onStart: () => {
          cometEl.style.opacity = '1';
        },
        onUpdate: () => place(o.v),
        onComplete: () => {
          // Punch: a quick scale pop on the number + a glow flash on the arc.
          gsap.fromTo(numEl, { scale: 1 }, { scale: 1.07, duration: 0.16, yoyo: true, repeat: 1, ease: 'power2.inOut' });
          gsap.fromTo(
            arcEl,
            { filter: 'drop-shadow(0 0 10px rgba(124,92,255,0.55))' },
            { filter: 'drop-shadow(0 0 22px rgba(124,92,255,0.95))', duration: 0.3, yoyo: true, repeat: 1 }
          );
        },
        scrollTrigger: {
          trigger: wrap.current,
          start: 'top 80%',
          toggleActions: 'restart none none reverse',
        },
      });
    }, wrap);
    return () => ctx.revert();
  }, [reduced, C, pct, value, max]);

  return (
    <div ref={wrap} className="relative mx-auto aspect-square w-[min(78vw,360px)]">
      <svg viewBox="0 0 240 240" className="h-full w-full">
        <defs>
          <linearGradient id="cgpa-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#9d86ff" />
            <stop offset="1" stopColor="#5b8def" />
          </linearGradient>
        </defs>
        <g transform="rotate(-90 120 120)">
          <circle cx="120" cy="120" r={R} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="12" />
          <circle
            ref={arc}
            cx="120"
            cy="120"
            r={R}
            fill="none"
            stroke="url(#cgpa-grad)"
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={C}
            strokeDashoffset={C}
            style={{ filter: 'drop-shadow(0 0 10px rgba(124,92,255,0.55))' }}
          />
          {/* Comet tracing the arc tip */}
          <circle
            ref={comet}
            cx={CX + R}
            cy={CX}
            r="7"
            fill="#ffffff"
            style={{ opacity: 0, filter: 'drop-shadow(0 0 8px rgba(157,134,255,1))' }}
          />
        </g>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span
          ref={num}
          className="inline-block font-display text-[clamp(52px,8vw,88px)] font-semibold leading-none text-white"
        >
          0.0
        </span>
        <span className="label mt-2 !text-ink-muted">/ {max.toFixed(1)} CGPA</span>
      </div>
    </div>
  );
}
