import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { gsap, ScrollTrigger } from '../../lib/gsap';
import { skills } from '../../data';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const N = skills.groups.length;

// Each category enters from a different offset (in addition to flying in from
// depth) so it feels like travelling to a new place each time.
const ENTER = [
  { xPercent: 0, yPercent: 40 },
  { xPercent: 60, yPercent: 0 },
  { xPercent: 0, yPercent: -40 },
  { xPercent: -60, yPercent: 0 },
  { xPercent: 0, yPercent: 0 },
  { xPercent: 0, yPercent: 35 },
];

export default function Skills() {
  const reduced = useReducedMotion();
  const [pinned, setPinned] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Pinned sequence only on large screens with motion enabled.
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const update = () => setPinned(mq.matches && !reduced);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, [reduced]);

  useLayoutEffect(() => {
    if (!pinned || !sectionRef.current) return;
    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray<HTMLElement>('.sk-panel');
      const rail = gsap.utils.toArray<HTMLElement>('.sk-rail-item');
      const fill = sectionRef.current!.querySelector<HTMLElement>('.sk-progress');

      // Start every panel pushed far back into space, invisible.
      panels.forEach((p, i) => {
        gsap.set(p, {
          autoAlpha: 0,
          scale: 0.55,
          z: -600,
          filter: 'blur(14px)',
          xPercent: ENTER[i].xPercent,
          yPercent: ENTER[i].yPercent,
        });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: () => '+=' + window.innerHeight * N,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const idx = Math.min(N - 1, Math.floor(self.progress * N));
            rail.forEach((el, k) => {
              el.style.opacity = k === idx ? '1' : '0.3';
              el.classList.toggle('text-accent-soft', k === idx);
            });
            if (fill) fill.style.transform = `scaleY(${self.progress})`;
          },
        },
      });

      panels.forEach((panel, i) => {
        // Fly the whole card (name + chips) in from depth to focus.
        tl.to(panel, {
          autoAlpha: 1,
          scale: 1,
          z: 0,
          xPercent: 0,
          yPercent: 0,
          filter: 'blur(0px)',
          duration: 1,
          ease: 'power2.out',
        });
        // Chips settle in just behind the card, riding the same motion.
        tl.from(
          panel.querySelectorAll('.sk-chip'),
          { y: 22, opacity: 0, stagger: 0.035, duration: 0.45, ease: 'power2.out', immediateRender: false },
          '<0.2'
        );
        tl.to(panel, { duration: 0.9 }); // dwell — hold the category in focus
        // Drift past the viewer (except the last, which holds before release).
        if (i < N - 1) {
          tl.to(panel, {
            autoAlpha: 0,
            scale: 1.5,
            z: 500,
            filter: 'blur(14px)',
            duration: 1,
            ease: 'power2.in',
          });
        }
      });
    }, sectionRef);

    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, [pinned]);

  // ---- Pinned cinematic sequence (desktop) ----
  if (pinned) {
    return (
      <section id="skills" ref={sectionRef} className="relative h-screen overflow-hidden">
        <div className="grid-bg opacity-40" aria-hidden="true" />
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 h-[50vmax] w-[50vmax] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-25 blur-[140px] animate-aurora-drift"
          style={{ background: 'radial-gradient(circle, rgba(124,92,255,0.45), transparent 65%)' }}
          aria-hidden="true"
        />

        <p className="eyebrow absolute left-6 top-10 z-20 sm:left-10 lg:left-16">{skills.eyebrow}</p>

        {/* Left progress rail */}
        <div className="absolute left-6 top-1/2 z-20 hidden -translate-y-1/2 lg:left-16 lg:flex lg:items-stretch lg:gap-4">
          <div className="relative w-px self-stretch bg-white/10">
            <div className="sk-progress absolute inset-x-0 top-0 h-full origin-top scale-y-0 bg-accent-grad" />
          </div>
          <ul className="flex flex-col justify-center gap-3.5">
            {skills.groups.map((g, i) => (
              <li
                key={g.label}
                className="sk-rail-item font-mono text-xs uppercase tracking-label text-ink transition-opacity"
                style={{ opacity: i === 0 ? 1 : 0.3 }}
              >
                <span className="mr-2 opacity-60">0{i + 1}</span>
                {g.label}
              </li>
            ))}
          </ul>
        </div>

        {/* Stacked panels in 3D space */}
        <div className="relative h-full [perspective:1200px]">
          {skills.groups.map((g, i) => (
            <div key={g.label} className="sk-panel absolute inset-0 flex items-center [transform-style:preserve-3d]">
              {/* Ghost watermark bleeds off the right edge, clear of the rail */}
              <span
                className="pointer-events-none absolute right-[-4%] top-1/2 -translate-y-1/2 select-none font-display text-[17vw] font-bold uppercase leading-none text-white/[0.035]"
                aria-hidden="true"
              >
                {g.label.split(' ')[0]}
              </span>
              <div className="relative grid w-full items-center gap-8 px-6 lg:grid-cols-[1fr_1fr] lg:gap-12 lg:pl-[320px] lg:pr-20">
                <div>
                  <span className="font-mono text-sm text-accent-soft">
                    0{i + 1} <span className="text-ink-faint">/ 0{N}</span>
                  </span>
                  <h3 className="mt-3 font-display text-[clamp(34px,5vw,72px)] font-semibold leading-[0.95] text-ink">
                    {g.label}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {g.items.map((item) => (
                    <span key={item} className="sk-chip chip text-sm">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  // ---- Static fallback (mobile / reduced motion) ----
  return (
    <section id="skills" ref={sectionRef} className="section-pad relative overflow-hidden">
      <div className="grid-bg opacity-40" aria-hidden="true" />
      <div className="container-rail relative">
        <p className="eyebrow mb-10">{skills.eyebrow}</p>
        <div className="flex flex-col gap-4">
          {skills.groups.map((g, i) => (
            <div key={g.label} className="glass-card rounded-2xl p-6">
              <div className="mb-4 flex items-center gap-3">
                <span
                  className="grid h-8 w-8 place-items-center rounded-lg font-mono text-xs font-semibold text-white"
                  style={{ backgroundImage: 'linear-gradient(135deg, #7c5cff, #5b8def)' }}
                >
                  0{i + 1}
                </span>
                <h3 className="font-display text-base font-semibold text-ink">{g.label}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {g.items.map((item) => (
                  <span key={item} className="chip text-[13px]">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
