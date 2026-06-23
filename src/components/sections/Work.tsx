import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { gsap, ScrollTrigger } from '../../lib/gsap';
import { work } from '../../data';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import WorkPanel from '../work/WorkPanel';

const N = work.projects.length;

export default function Work() {
  const reduced = useReducedMotion();
  const [horizontal, setHorizontal] = useState(false);
  const [active, setActive] = useState(0);

  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const update = () => setHorizontal(mq.matches && !reduced);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, [reduced]);

  useLayoutEffect(() => {
    if (!horizontal || !trackRef.current || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      const track = trackRef.current!;
      const distance = () => track.scrollWidth - window.innerWidth;
      const panels = gsap.utils.toArray<HTMLElement>('.work-panel');

      // Per-panel transforms based on each panel's distance from viewport
      // centre. Panels turn in 3D, dim, and blur as they leave focus.
      const updatePanels = (trackX: number) => {
        const vw = window.innerWidth;
        panels.forEach((panel, i) => {
          // Signed distance in viewport-widths. d=0 centred, +1 one screen
          // right, -1 one screen left.
          const d = (i * vw + trackX) / vw;
          const ad = Math.min(1.6, Math.abs(d));
          const rotY = -d * 22;
          const scale = Math.max(0.62, 1 - ad * 0.2);
          const opacity = Math.max(0.18, 1 - ad * 0.6);
          const blur = Math.min(7, ad * 5.5);
          panel.style.transform = `rotateY(${rotY}deg) scale(${scale})`;
          panel.style.opacity = String(opacity);
          panel.style.filter = `blur(${blur}px)`;
          panel.style.zIndex = String(100 - Math.round(ad * 10));
        });
      };
      updatePanels(0);

      // ──── Section-entry choreography ────
      // Eyebrow + indicator + a violet pulse + the first panel rise as you
      // scroll out of Skills into Work. Reversible.
      gsap.from('.wk-eyebrow-wrap', {
        opacity: 0,
        y: -22,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'top 30%',
          toggleActions: 'play none none reverse',
        },
      });
      gsap.from('.wk-indicator', {
        opacity: 0,
        y: -16,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'top 30%',
          toggleActions: 'play none none reverse',
        },
      });
      gsap.fromTo(
        '.wk-pulse',
        { opacity: 0, scale: 0.4 },
        {
          opacity: 1,
          scale: 1.1,
          duration: 1.4,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            end: 'top 20%',
            toggleActions: 'play none none reverse',
          },
        }
      );
      gsap.fromTo(
        '.wk-track',
        { yPercent: 25, scale: 0.86, opacity: 0 },
        {
          yPercent: 0,
          scale: 1,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'top 18%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Horizontal filmstrip scrub. Smoother lag + per-panel 3D motion.
      gsap.to(track, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: () => `+=${distance() + window.innerHeight * 0.4}`,
          pin: true,
          scrub: 1.1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const idx = Math.min(N - 1, Math.round(self.progress * (N - 1)));
            setActive(idx);
            updatePanels(-self.progress * distance());
          },
        },
      });
    }, sectionRef);

    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, [horizontal]);

  const current = work.projects[active];
  const accent = current.accent;

  if (horizontal) {
    return (
      <section id="projects" ref={sectionRef} className="relative h-screen overflow-hidden bg-base">
        {/* Section eyebrow */}
        <div className="wk-eyebrow-wrap absolute inset-x-0 top-10 z-20 px-5 sm:px-8 lg:px-10">
          <div className="container-rail">
            <p className="eyebrow">{work.eyebrow}</p>
          </div>
        </div>

        {/* Top-right indicator that updates with the active project */}
        <div className="wk-indicator absolute right-5 top-10 z-20 sm:right-8 lg:right-10">
          <div
            className="flex items-center gap-2 rounded-full border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] transition-colors duration-500"
            style={{ borderColor: `rgba(${accent.primary},0.4)`, background: `rgba(${accent.primary},0.07)` }}
          >
            <span className="h-1.5 w-1.5 rounded-full transition-colors" style={{ background: accent.dot }} />
            <span style={{ color: accent.dot }}>0{active + 1}</span>
            <span className="text-ink-faint">/ 0{N}</span>
            <span className="mx-1 text-ink-faint">·</span>
            <span className="text-ink">{current.name}</span>
          </div>
        </div>

        {/* Violet light pulse */}
        <span
          className="wk-pulse pointer-events-none absolute left-1/2 top-1/2 h-[55vmin] w-[55vmin] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 blur-[120px] transition-[background] duration-500"
          style={{ background: `radial-gradient(circle, rgba(${accent.primary},0.5), rgba(${accent.secondary},0.15) 50%, transparent 72%)` }}
          aria-hidden="true"
        />
        <div className="grid-bg opacity-30" aria-hidden="true" />

        {/* Horizontal track (3D perspective so panels turn in space) */}
        <div
          ref={trackRef}
          className="wk-track flex h-screen w-max will-change-transform"
          style={{ perspective: '1600px', transformStyle: 'preserve-3d' }}
        >
          {work.projects.map((p, i) => (
            <WorkPanel key={p.id} project={p} i={i} N={N} active={i === active} />
          ))}
        </div>

        {/* Pagination ticks (bottom-centre) */}
        <div className="absolute inset-x-0 bottom-8 z-20 flex justify-center gap-3">
          {work.projects.map((p, i) => (
            <span
              key={p.id}
              className="block h-1 rounded-full transition-all duration-500"
              style={{
                width: i === active ? '28px' : '6px',
                background:
                  i === active
                    ? `linear-gradient(90deg, rgb(${p.accent.primary}), rgb(${p.accent.secondary}))`
                    : 'rgba(255,255,255,0.18)',
              }}
            />
          ))}
        </div>
      </section>
    );
  }

  // Stacked vertical fallback (mobile / reduced motion).
  return (
    <section id="projects" ref={sectionRef} className="section-pad relative bg-base">
      <div className="container-rail mb-12">
        <p className="eyebrow">{work.eyebrow}</p>
      </div>
      <div className="flex flex-col">
        {work.projects.map((p, i) => (
          <WorkPanel key={p.id} project={p} i={i} N={N} active />
        ))}
      </div>
    </section>
  );
}
