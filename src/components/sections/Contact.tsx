import { useLayoutEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../../lib/gsap';
import { contact, links } from '../../data';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import Marquee from '../Marquee';

const MANIFESTO = [
  'AVAILABLE FOR WORK',
  'BENGALURU · INDIA',
  "LET'S TALK",
  'OPEN TO COLLAB',
  'FULL-STACK · MERN · BACKEND',
  'INTERNSHIPS · FULL-TIME',
];

/* ── Brand icons (inline SVG, premium look) ───────────────────── */
const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
    <path
      fill="currentColor"
      d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56v-2c-3.2.7-3.87-1.36-3.87-1.36-.52-1.32-1.28-1.67-1.28-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.23-1.28-5.23-5.69 0-1.26.45-2.28 1.18-3.08-.12-.29-.51-1.46.11-3.04 0 0 .97-.31 3.18 1.18a11 11 0 0 1 2.9-.39c.98 0 1.97.13 2.9.39 2.2-1.49 3.17-1.18 3.17-1.18.63 1.58.23 2.75.12 3.04.73.8 1.18 1.82 1.18 3.08 0 4.42-2.69 5.39-5.25 5.67.41.36.78 1.06.78 2.13v3.16c0 .31.21.68.8.56C20.21 21.38 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5Z"
    />
  </svg>
);
const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
    <path
      fill="currentColor"
      d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.95v5.66H9.36V9h3.41v1.56h.05c.47-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z"
    />
  </svg>
);
const MailIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="5" width="18" height="14" rx="2.5" />
    <path d="m3.6 6.4 8.4 6.4 8.4-6.4" />
  </svg>
);

/* ── Action card (one per channel) ────────────────────────────── */
/* All three cards look identical by default; hover lights up the violet
 * "primary" treatment via .ct-card hover rules in index.css. */
function ActionCard({
  href,
  icon,
  brand,
  label,
  cta,
}: {
  href: string;
  icon: React.ReactNode;
  brand: string;
  label: string;
  cta: string;
}) {
  const external = href.startsWith('http');
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className="ct-card group"
    >
      <div className="flex items-center justify-between">
        <span className="ct-card-icon grid h-12 w-12 place-items-center rounded-xl text-white">
          {icon}
        </span>
        <span className="ct-card-brand font-mono text-xs uppercase tracking-[0.18em] text-ink-faint">
          {brand}
        </span>
      </div>

      <div>
        <p className="font-display text-[clamp(18px,1.6vw,22px)] font-semibold leading-snug text-white">
          {label}
        </p>
      </div>

      <div className="mt-auto flex items-center justify-between">
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-muted">
          {cta}
        </span>
        <span className="ct-card-arrow grid h-9 w-9 place-items-center rounded-full">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 17 17 7" />
            <path d="M8 7h9v9" />
          </svg>
        </span>
      </div>
    </a>
  );
}

export default function Contact() {
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      // Entry choreography as you scroll out of Projects into Contact.
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 78%',
          toggleActions: 'play none none reverse',
        },
      });
      // immediateRender:false → elements are visible by default and can never
      // get stuck hidden if the trigger mis-fires (jumping past via nav, etc).
      tl.from(
        '.ct-line',
        { scaleX: 0, transformOrigin: 'left center', duration: 0.5, ease: 'power3.inOut', immediateRender: false }
      )
        .from('.ct-eyebrow', { opacity: 0, x: -20, duration: 0.5, ease: 'power2.out', immediateRender: false }, '-=0.25')
        .from(
          '.ct-headline-line',
          { yPercent: 110, duration: 1.05, ease: 'expo.out', stagger: 0.14, immediateRender: false },
          '-=0.2'
        )
        .from('.ct-sub', { opacity: 0, y: 18, duration: 0.6, ease: 'power2.out', immediateRender: false }, '-=0.5')
        .from(
          '.ct-aurora',
          { opacity: 0, scale: 0.5, duration: 1.6, ease: 'power3.out', immediateRender: false },
          '-=0.8'
        )
        .from(
          '.ct-card',
          { opacity: 0, y: 50, scale: 0.92, stagger: 0.12, duration: 0.75, ease: 'back.out(1.4)', immediateRender: false },
          '-=0.9'
        )
        .from('.ct-marquee', { opacity: 0, y: 18, duration: 0.5, immediateRender: false }, '-=0.4')
        .from('.ct-footer', { opacity: 0, y: 12, duration: 0.4, immediateRender: false }, '-=0.2');
    }, sectionRef);

    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative overflow-hidden bg-base px-5 pt-24 sm:px-8 lg:px-10"
    >
      <div className="grid-bg opacity-30" aria-hidden="true" />

      {/* Iridescent aurora — single dramatic moment, drifts slowly */}
      <span
        className="ct-aurora pointer-events-none absolute left-1/2 top-[42%] h-[80vmax] w-[80vmax] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-90 blur-[160px] animate-aurora-drift"
        style={{
          background:
            'radial-gradient(circle, rgba(124,92,255,0.42), rgba(38,213,178,0.22) 30%, rgba(255,95,169,0.22) 55%, transparent 75%)',
        }}
        aria-hidden="true"
      />

      <div className="container-rail relative">
        {/* eyebrow */}
        <span
          className="ct-line mb-6 block h-[2px] w-16 origin-left rounded-full bg-accent-grad"
          aria-hidden="true"
        />
        <p className="ct-eyebrow eyebrow mb-10">{contact.eyebrow}</p>

        {/* Headline */}
        <h2 className="font-display text-[clamp(48px,8vw,120px)] font-semibold leading-[0.92] tracking-[-0.03em] text-ink">
          <span className="block overflow-hidden">
            <span className="ct-headline-line block">{contact.poster[0]}</span>
          </span>
          <span className="block overflow-hidden">
            <span className="ct-headline-line accent-text block">{contact.poster[1]}</span>
          </span>
        </h2>

        <p className="ct-sub mt-7 max-w-xl text-base text-ink-muted sm:text-lg">{contact.sub}</p>

        {/* Three identical action cards; hover lights the active one violet */}
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          <ActionCard
            href={`mailto:${links.email}`}
            icon={<MailIcon />}
            brand="GMAIL"
            label={links.email}
            cta="Drop a line"
          />
          <ActionCard
            href={links.github}
            icon={<GitHubIcon />}
            brand="GITHUB"
            label="@purpoint"
            cta="View profile"
          />
          <ActionCard
            href={links.linkedin}
            icon={<LinkedInIcon />}
            brand="LINKEDIN"
            label="Manan Ghodasara"
            cta="View profile"
          />
        </div>
      </div>

      {/* Manifesto marquee */}
      <div className="ct-marquee mt-24">
        <Marquee items={MANIFESTO} />
      </div>

      {/* Footer */}
      <div className="container-rail relative">
        <div className="ct-footer mt-12 flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.06] pb-10 pt-8">
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-muted">
            © {new Date().getFullYear()} Manan N. Ghodasara
          </span>
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-faint">
            Built with React · Three.js · GSAP
          </span>
        </div>
      </div>
    </section>
  );
}
