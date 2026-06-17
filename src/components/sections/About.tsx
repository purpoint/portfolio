import { Suspense, lazy, useLayoutEffect, useRef, type ReactNode } from 'react';
import { gsap, ScrollTrigger } from '../../lib/gsap';
import { about } from '../../data';
import { useReducedMotion, useShouldRender3D } from '../../hooks/useReducedMotion';
import Tilt from '../Tilt';

const AboutCanvas = lazy(() => import('../three/AboutCanvas'));

/** Wraps any highlight phrases found in `text` with the accent gradient. */
function highlight(text: string, phrases: string[]): ReactNode[] {
  if (!phrases.length) return [text];
  const escaped = phrases.map((p) => p.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  const re = new RegExp(`(${escaped.join('|')})`, 'g');
  return text.split(re).map((part, i) =>
    phrases.includes(part) ? (
      <span key={i} className="accent-text">
        {part}
      </span>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}

/** No-WebGL stand-in for the shard cluster. */
function ShardFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
      <div
        className="h-[38vmin] w-[38vmin] rotate-12 blur-md"
        style={{
          background: 'conic-gradient(from 120deg, #7c5cff, #5b8def, #ff7ad9, #7c5cff)',
          clipPath: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)',
          opacity: 0.5,
        }}
      />
    </div>
  );
}

export default function About() {
  const reduced = useReducedMotion();
  const render3D = useShouldRender3D();

  const sectionRef = useRef<HTMLElement>(null);
  const progress = useRef(0);

  useLayoutEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      // A characterful reveal — replays whenever the section re-enters, and
      // reverses when you scroll back up (toggleActions).
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 72%',
          toggleActions: 'restart none none reverse',
        },
      });
      tl.from('.about-line', { scaleX: 0, transformOrigin: 'left center', duration: 0.6, ease: 'power3.inOut' })
        .from('.about-eyebrow', { opacity: 0, x: -16, duration: 0.5, ease: 'power2.out' }, '-=0.25')
        .from(
          '.about-lead',
          { clipPath: 'inset(0 100% 0 0)', filter: 'blur(8px)', y: 16, duration: 1.1, ease: 'power3.out' },
          '-=0.15'
        )
        .from('.about-body', { opacity: 0, y: 18, filter: 'blur(10px)', duration: 0.9, ease: 'power2.out' }, '-=0.6')
        .from(
          '.about-visual',
          { opacity: 0, scale: 0.9, filter: 'blur(8px)', duration: 1, ease: 'power3.out', clearProps: 'all' },
          '-=0.85'
        )
        .from(
          '.about-facts > *',
          { opacity: 0, y: 44, scale: 0.94, duration: 0.7, stagger: 0.1, ease: 'back.out(1.5)', clearProps: 'all' },
          '-=0.6'
        );

      // Feed scroll progress to the 3D shard cluster.
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: (self) => {
          progress.current = self.progress;
        },
      });
    }, sectionRef);

    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section id="about" ref={sectionRef} className="section-pad relative overflow-hidden">
      {/* Soft drifting light behind the section */}
      <div
        className="pointer-events-none absolute left-[20%] top-1/3 h-[55vmax] w-[55vmax] -translate-x-1/2 rounded-full opacity-40 blur-[130px] animate-aurora-drift"
        style={{ background: 'radial-gradient(circle, rgba(124,92,255,0.5), rgba(91,141,239,0.12) 55%, transparent 70%)' }}
        aria-hidden="true"
      />
      <div className="grid-bg opacity-40" aria-hidden="true" />

      <div className="container-rail relative">
        <span className="about-line mb-6 block h-[2px] w-16 origin-left rounded-full bg-accent-grad" aria-hidden="true" />
        <p className="about-eyebrow eyebrow mb-10">{about.eyebrow}</p>

        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          {/* Left: designed statement */}
          <div>
            <p
              className="about-lead font-display text-[clamp(22px,2.7vw,38px)] font-medium leading-[1.28] tracking-tight text-ink"
              style={{ clipPath: 'inset(0 0 0 0)' }}
            >
              {highlight(about.lead, about.highlights)}
            </p>
            <p className="about-body mt-7 max-w-2xl text-base leading-relaxed text-ink/75 sm:text-lg">
              {highlight(about.body, about.highlights)}
            </p>
          </div>

          {/* Right: floating glass shard cluster */}
          <div className="about-visual relative h-[340px] sm:h-[420px] lg:h-[500px]">
            {render3D ? (
              <Suspense fallback={<ShardFallback />}>
                <AboutCanvas progress={progress} />
              </Suspense>
            ) : (
              <ShardFallback />
            )}
          </div>
        </div>

        {/* Recruiter-readable fact cards */}
        <div className="about-facts mt-16 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {about.facts.map((fact, i) => (
            <Tilt key={fact.label} max={8} className="glass-card group relative overflow-hidden rounded-2xl p-5">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-medium text-accent-soft">0{i + 1}</span>
                <span className="h-2 w-2 rounded-full bg-accent shadow-[0_0_12px_2px_rgba(124,92,255,0.8)]" />
              </div>
              <p className="mt-6 font-mono text-[11px] uppercase tracking-label text-ink-muted">{fact.label}</p>
              <p className="mt-1.5 font-display text-lg font-semibold leading-snug text-white">{fact.value}</p>
              <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-accent-grad transition-all duration-500 group-hover:w-full" />
            </Tilt>
          ))}
        </div>
      </div>
    </section>
  );
}
