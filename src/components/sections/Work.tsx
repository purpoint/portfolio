import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { gsap, ScrollTrigger } from '../../lib/gsap';
import { work } from '../../data';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import ProjectPanel from '../work/ProjectPanel';
import Reveal from '../Reveal';

/**
 * Selected work — the centrepiece.
 *
 * On wide screens (and when motion is allowed) the section pins and the panels
 * slide sideways as you scroll down: the ORYZO filmstrip effect, driven by a
 * single GSAP ScrollTrigger that scrubs the track's x by exactly the track's
 * overflow width. On narrow screens / reduced motion it collapses to a normal
 * stack of vertical cards (no pin, no horizontal scroll).
 */
export default function Work() {
  const reduced = useReducedMotion();
  const [horizontal, setHorizontal] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  // Horizontal filmstrip only on large viewports with motion enabled.
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

      gsap.to(track, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.6,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (progressRef.current) gsap.set(progressRef.current, { scaleX: self.progress });
          },
        },
      });
    }, sectionRef);

    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, [horizontal]);

  if (horizontal) {
    return (
      <section id="work" ref={sectionRef} className="relative h-screen overflow-hidden">
        {/* Pinned section header overlay */}
        <div className="pointer-events-none absolute left-6 top-24 z-20 sm:left-12 lg:left-20">
          <p className="eyebrow">{work.eyebrow}</p>
        </div>

        {/* Horizontal track */}
        <div ref={trackRef} className="flex h-screen w-max will-change-transform">
          {work.projects.map((p) => (
            <ProjectPanel key={p.id} project={p} layout="horizontal" />
          ))}
        </div>

        {/* Scrub progress line */}
        <div className="absolute inset-x-0 bottom-0 z-20 h-px bg-hairline" aria-hidden="true">
          <div
            ref={progressRef}
            className="h-full w-full origin-left scale-x-0 bg-gradient-to-r from-molten-amber to-molten-ember"
          />
        </div>
      </section>
    );
  }

  // Stacked vertical cards (mobile / reduced motion).
  return (
    <section id="work" ref={sectionRef} className="section-pad">
      <div className="container-rail mb-16">
        <Reveal as="p" className="eyebrow">
          {work.eyebrow}
        </Reveal>
      </div>
      <div className="flex flex-col gap-28">
        {work.projects.map((p) => (
          <ProjectPanel key={p.id} project={p} layout="vertical" />
        ))}
      </div>
    </section>
  );
}
