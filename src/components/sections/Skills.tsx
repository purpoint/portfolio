import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { gsap, ScrollTrigger } from '../../lib/gsap';
import { skills } from '../../data';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const N = skills.groups.length;

export default function Skills() {
  const reduced = useReducedMotion();
  const [pinned, setPinned] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

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
      const cards = gsap.utils.toArray<HTMLElement>('.sk-card-wrap');
      const dots = gsap.utils.toArray<HTMLElement>('.sk-dot');

      const SPREAD = 360; // px between adjacent cards
      const place = (active: number) => {
        cards.forEach((card, i) => {
          const d = i - active;
          const ad = Math.abs(d);
          const x = d * SPREAD;
          const z = -ad * 240;
          const ry = gsap.utils.clamp(-48, 48, -d * 38);
          const scale = Math.max(0.6, 1 - ad * 0.16);
          const opacity = ad > 2.6 ? 0 : Math.max(0.18, 1 - ad * 0.34);
          card.style.transform = `translate(-50%, -50%) translateX(${x}px) translateZ(${z}px) rotateY(${ry}deg) scale(${scale})`;
          card.style.opacity = String(opacity);
          card.style.zIndex = String(100 - Math.round(ad * 10));
          card.style.filter = ad > 1.15 ? `blur(${Math.min(7, (ad - 1) * 5)}px)` : 'none';
          card.classList.toggle('sk-active', ad < 0.55);
        });
        const idx = Math.round(active);
        dots.forEach((dot, k) => {
          const on = k === idx;
          dot.style.width = on ? '22px' : '6px';
          dot.style.background = on ? 'linear-gradient(90deg,#7c5cff,#5b8def)' : 'rgba(255,255,255,0.25)';
        });
      };

      place(0);

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: () => '+=' + window.innerHeight * (N - 1) * 1.05,
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => place(self.progress * (N - 1)),
      });
    }, sectionRef);

    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, [pinned]);

  const Card = ({ g, i }: { g: (typeof skills.groups)[number]; i: number }) => (
    <div
      className="sk-poster relative flex h-[clamp(430px,60vh,545px)] flex-col overflow-hidden rounded-[26px] border p-7"
      style={{
        background: 'linear-gradient(160deg, rgba(34,30,52,0.92), rgba(14,13,20,0.95))',
        borderColor: 'rgba(255,255,255,0.12)',
        boxShadow: '0 40px 90px -40px rgba(0,0,0,0.9), inset 0 1px 0 rgba(255,255,255,0.1)',
      }}
    >
      {/* moving sheen (active card only) */}
      <span className="sk-shine" aria-hidden="true" />
      {/* faint accent glow inside */}
      <span
        className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full opacity-60 blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(124,92,255,0.5), transparent 70%)' }}
        aria-hidden="true"
      />
      <div className="relative flex items-center justify-between">
        <span className="font-mono text-xs text-accent-soft">
          0{i + 1} <span className="text-ink-faint">/ 0{N}</span>
        </span>
        <span className="h-2 w-2 rounded-full bg-accent shadow-[0_0_12px_2px_rgba(124,92,255,0.7)]" />
      </div>
      <h3 className="sk-name relative mt-5 font-display text-[clamp(26px,2.4vw,38px)] font-semibold leading-[1.02] text-ink">
        {g.label}
      </h3>
      <div className="relative my-5 h-px w-full bg-white/10" />
      <ul className="relative flex flex-col gap-2.5">
        {g.items.map((item) => (
          <li key={item} className="flex items-center gap-3 text-[15px] text-ink/85">
            <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent/70" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );

  // ---- Coverflow slider (desktop) ----
  if (pinned) {
    return (
      <section id="skills" ref={sectionRef} className="relative h-screen overflow-hidden">
        <div className="grid-bg opacity-40" aria-hidden="true" />
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 h-[50vmax] w-[50vmax] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-25 blur-[140px] animate-aurora-drift"
          style={{ background: 'radial-gradient(circle, rgba(124,92,255,0.45), transparent 65%)' }}
          aria-hidden="true"
        />

        <div className="absolute inset-x-0 top-10 z-20 px-5 sm:px-8 lg:px-10">
          <div className="container-rail">
            <p className="eyebrow">{skills.eyebrow}</p>
          </div>
        </div>

        {/* Coverflow stage */}
        <div className="relative h-full [perspective:1600px]">
          <div className="absolute left-1/2 top-1/2 h-0 w-0 [transform-style:preserve-3d]">
            {skills.groups.map((g, i) => (
              <div
                key={g.label}
                className="sk-card-wrap absolute left-0 top-0 w-[clamp(300px,30vw,400px)]"
              >
                <Card g={g} i={i} />
              </div>
            ))}
          </div>
        </div>

        {/* Pagination dots */}
        <div className="absolute bottom-10 left-1/2 z-20 flex -translate-x-1/2 gap-2.5">
          {skills.groups.map((g) => (
            <span key={g.label} className="sk-dot h-1.5 w-1.5 rounded-full bg-white/25 transition-all" />
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
        <div className="grid gap-4 sm:grid-cols-2">
          {skills.groups.map((g, i) => (
            <Card key={g.label} g={g} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
