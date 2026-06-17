import { useLayoutEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../../lib/gsap';
import { education } from '../../data';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import Tilt from '../Tilt';
import CgpaGauge from '../CgpaGauge';

// Sept 2023 → May 2027, "now" ≈ mid-2026 → ~75% through the degree.
const TIMELINE_PROGRESS = 75;
const YEARS = ['2023', '2024', '2025', '2026', '2027'];

export default function Education() {
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      // Choreographed, reversible entrance — varied motion per element so it
      // doesn't read as a uniform fade.
      // Top content entrance — reversible, anchored to the section top.
      const tl = gsap.timeline({
        scrollTrigger: { trigger: sectionRef.current, start: 'top 72%', toggleActions: 'restart none none reverse' },
      });
      tl.from('.edu-line', { scaleX: 0, transformOrigin: 'left center', duration: 0.5, ease: 'power3.inOut' })
        .from('.edu-eyebrow', { opacity: 0, x: -20, duration: 0.5, ease: 'power2.out' }, '-=0.25')
        // Credential card flips in from the side in 3D.
        .from(
          '.edu-card',
          {
            rotateY: -34,
            x: -50,
            opacity: 0,
            transformPerspective: 1000,
            transformOrigin: 'left center',
            duration: 1,
            ease: 'power3.out',
          },
          '-=0.15'
        )
        // Gauge pops in (then draws itself via its own trigger).
        .from('.edu-gauge', { opacity: 0, scale: 0.84, duration: 0.9, ease: 'back.out(1.5)' }, '-=0.8');

      // Degree timeline — plays once and stays; immediateRender:false keeps it
      // visible by default so a mis-fire can never leave it blank.
      const tlTime = gsap.timeline({
        scrollTrigger: { trigger: '.edu-timeline', start: 'top 90%', toggleActions: 'play none none none' },
      });
      tlTime
        .from('.edu-timeline', { opacity: 0, y: 26, duration: 0.5, ease: 'power2.out', immediateRender: false })
        .from('.edu-progress', { width: '0%', duration: 1.1, ease: 'power3.out', immediateRender: false }, '-=0.2')
        .from('.edu-marker-dot', { left: '0%', duration: 1.1, ease: 'power3.out', immediateRender: false }, '<')
        .from('.edu-marker-label', { opacity: 0, duration: 0.4, immediateRender: false }, '-=0.3');

      // Coursework — plays once, stays visible, never reverse-hides.
      const tlCourse = gsap.timeline({
        scrollTrigger: { trigger: '.edu-coursework', start: 'top 92%', toggleActions: 'play none none none' },
      });
      tlCourse
        .from('.edu-coursehead', { opacity: 0, y: 10, duration: 0.4, immediateRender: false })
        .from(
          '.edu-chips > *',
          { opacity: 0, scale: 0.5, y: 16, stagger: 0.06, duration: 0.5, ease: 'back.out(2)', immediateRender: false },
          '-=0.2'
        );
    }, sectionRef);

    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section id="education" ref={sectionRef} className="section-pad relative overflow-hidden">
      {/* Soft drifting light */}
      <div
        className="pointer-events-none absolute right-[15%] top-1/4 h-[50vmax] w-[50vmax] translate-x-1/2 rounded-full opacity-35 blur-[130px] animate-aurora-drift"
        style={{ background: 'radial-gradient(circle, rgba(91,141,239,0.45), rgba(124,92,255,0.12) 55%, transparent 70%)' }}
        aria-hidden="true"
      />
      <div className="grid-bg opacity-40" aria-hidden="true" />

      <div className="container-rail relative [perspective:1200px]">
        <span className="edu-line mb-6 block h-[2px] w-16 origin-left rounded-full bg-accent-grad" aria-hidden="true" />
        <p className="edu-eyebrow eyebrow mb-10">{education.eyebrow}</p>

        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          {/* Left: academic record card (3D flip) */}
          <div className="edu-card [transform-style:preserve-3d]">
            <Tilt className="glass-strong rounded-3xl p-7 sm:p-9" max={7}>
              <div className="flex items-start justify-between gap-4">
                <span
                  className="grid h-11 w-11 place-items-center rounded-xl text-sm font-semibold text-white"
                  style={{ backgroundImage: 'linear-gradient(135deg, #7c5cff, #5b8def)' }}
                >
                  JS
                </span>
                <span className="badge">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  2023 — 2027
                </span>
              </div>

              <h3 className="mt-6 font-display text-2xl font-semibold leading-tight text-ink sm:text-3xl">
                {education.school}
              </h3>
              <p className="mt-2 text-ink-muted">{education.degree}</p>

              <div className="mt-7 grid grid-cols-2 gap-5 border-t border-white/[0.08] pt-6">
                <div>
                  <p className="label">Location</p>
                  <p className="mt-1.5 font-medium text-ink">{education.location}</p>
                </div>
                <div>
                  <p className="label">Duration</p>
                  <p className="mt-1.5 font-medium text-ink">{education.dates}</p>
                </div>
              </div>
            </Tilt>
          </div>

          {/* Right: CGPA gauge */}
          <div className="edu-gauge flex flex-col items-center">
            <CgpaGauge value={education.cgpaValue} max={10} />
            <span className="badge mt-6">
              <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_10px_2px_rgba(124,92,255,0.7)]" />
              {education.cgpaTag}
            </span>
          </div>
        </div>

        {/* Degree progress timeline */}
        <div className="edu-timeline mt-16">
          <div className="mb-3 flex justify-between">
            {YEARS.map((y) => (
              <span key={y} className="label">
                {y}
              </span>
            ))}
          </div>
          <div className="relative h-2 w-full rounded-full bg-white/[0.07]">
            <div
              className="edu-progress absolute inset-y-0 left-0 rounded-full bg-accent-grad"
              style={{ width: `${TIMELINE_PROGRESS}%`, boxShadow: '0 0 16px rgba(124,92,255,0.6)' }}
            />
            <div className="edu-marker-dot absolute top-1/2 -translate-y-1/2" style={{ left: `${TIMELINE_PROGRESS}%` }}>
              <span className="relative flex h-4 w-4 -translate-x-1/2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent/60" />
                <span className="relative inline-flex h-4 w-4 rounded-full border-2 border-white bg-accent" />
              </span>
            </div>
          </div>
          <p className="edu-marker-label mt-3 text-right label !text-accent-soft">You are here · 3rd year</p>
        </div>

        {/* Coursework */}
        <div className="edu-coursework mt-12">
          <p className="edu-coursehead label mb-4">Relevant coursework</p>
          <div className="edu-chips flex flex-wrap gap-2.5">
            {education.coursework.map((c) => (
              <span key={c} className="chip">
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
