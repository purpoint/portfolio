import { Suspense, lazy, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { gsap, ScrollTrigger } from '../../lib/gsap';
import { hero, links } from '../../data';
import { useReducedMotion, useShouldRender3D } from '../../hooks/useReducedMotion';
import ScrollCue from '../ScrollCue';
import Tilt from '../Tilt';
import Magnetic from '../Magnetic';

// Heavy WebGL bundle is code-split and only fetched when we actually need it.
const HeroCanvas = lazy(() => import('../three/HeroCanvas'));

/** Live Bengaluru clock for the HUD. */
function LiveClock() {
  const [t, setT] = useState('--:--:--');
  useEffect(() => {
    const fmt = () =>
      new Date().toLocaleTimeString('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZone: 'Asia/Kolkata',
      });
    setT(fmt());
    const id = setInterval(() => setT(fmt()), 1000);
    return () => clearInterval(id);
  }, []);
  return <span>{t} IST</span>;
}

/** No-WebGL stand-in: a soft crystalline glow (mobile / reduced motion). */
function CrystalFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
      <div
        className="h-[52vmin] w-[52vmin] rounded-full blur-2xl"
        style={{ background: 'radial-gradient(circle at 40% 35%, #d8ccff, #7c5cff 42%, #5b45d6 66%, transparent 74%)' }}
      />
    </div>
  );
}

function go(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
  e.preventDefault();
  document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export default function Hero() {
  const reduced = useReducedMotion();
  const render3D = useShouldRender3D();

  const sectionRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      gsap.from('.hero-line', { yPercent: 120, duration: 1.1, ease: 'expo.out', stagger: 0.12, delay: 0.35 });
      gsap.from('.hero-fade', { opacity: 0, y: 16, duration: 1, ease: 'power3.out', stagger: 0.1, delay: 0.8 });

      gsap.to(canvasRef.current, {
        scale: 1.18,
        opacity: 0.25,
        ease: 'none',
        scrollTrigger: { trigger: sectionRef.current, start: 'top top', end: 'bottom top', scrub: true },
      });
      gsap.to(overlayRef.current, {
        yPercent: -18,
        opacity: 0,
        ease: 'none',
        scrollTrigger: { trigger: sectionRef.current, start: 'top top', end: '70% top', scrub: true },
      });
    }, sectionRef);

    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section id="top" ref={sectionRef} className="relative h-[100svh] overflow-hidden bg-[#08080c]">
      {/* 3D layer */}
      <div ref={canvasRef} className="absolute inset-0">
        {render3D ? (
          <Suspense fallback={<CrystalFallback />}>
            <HeroCanvas />
          </Suspense>
        ) : (
          <CrystalFallback />
        )}
      </div>

      {/* Scrims so the type stays legible over the scene. */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'linear-gradient(to top, rgba(8,8,12,0.92) 0%, rgba(8,8,12,0.1) 42%, transparent 60%), linear-gradient(to bottom, rgba(8,8,12,0.5), transparent 28%)',
        }}
        aria-hidden="true"
      />

      {/* Overlay */}
      <div
        ref={overlayRef}
        className="relative z-10 flex h-full flex-col justify-between px-5 pb-9 pt-28 sm:px-8 lg:px-10 lg:pt-32"
      >
        {/* Top row */}
        <div className="container-rail flex items-start justify-between gap-4">
          <span className="hero-fade glass label rounded-full px-4 py-2.5 !text-ink-muted">
            {hero.role}
          </span>

          <div className="hero-fade">
            <Tilt className="glass flex flex-col items-end gap-1.5 rounded-2xl px-4 py-3 text-right" max={12}>
              <span className="label flex items-center gap-2 !text-ink">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/70" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                Available for work
              </span>
              <span className="label">{hero.location}</span>
              <span className="label !text-accent-soft">
                <LiveClock />
              </span>
            </Tilt>
          </div>
        </div>

        {/* Bottom: name + glass content panel */}
        <div className="container-rail">
          <h1 className="font-display font-semibold leading-[0.92] tracking-[-0.03em] text-[clamp(52px,11vw,156px)] text-ink">
            <span className="block overflow-hidden">
              <span className="hero-line block">{hero.name[0]}</span>
            </span>
            <span className="block overflow-hidden">
              <span className="hero-line accent-text block">{hero.name[1]}</span>
            </span>
          </h1>

          <div className="mt-7 flex flex-wrap items-end justify-between gap-5">
            <div className="hero-fade max-w-xl">
              <Tilt className="glass-strong rounded-2xl p-5 sm:p-6" max={6}>
                <p className="text-[15px] leading-relaxed text-ink/85 sm:text-lg">{hero.sub}</p>
                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <Magnetic>
                    <a href="#projects" onClick={(e) => go(e, '#projects')} className="btn-primary">
                      View projects <span aria-hidden="true">→</span>
                    </a>
                  </Magnetic>
                  <Magnetic>
                    <a href={`mailto:${links.email}`} className="btn-secondary">
                      Get in touch
                    </a>
                  </Magnetic>
                  <a
                    href={links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="label ml-1 transition-colors hover:text-ink"
                  >
                    GitHub ↗
                  </a>
                </div>
              </Tilt>
            </div>

            <ScrollCue label={hero.cue} className="hero-fade hidden md:block" />
          </div>
        </div>
      </div>
    </section>
  );
}
