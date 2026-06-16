import { contact, links } from '../../data';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import Reveal from '../Reveal';

/** Mono link, rendered only when the URL is set. */
function MonoLink({ href, children }: { href: string; children: React.ReactNode }) {
  if (!href) return null;
  const external = href.startsWith('http');
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className="mono text-ink/80 transition-colors hover:text-molten-amber"
    >
      {children}
    </a>
  );
}

export default function Contact() {
  const reduced = useReducedMotion();

  return (
    <section id="contact" className="relative flex min-h-[100svh] items-center overflow-hidden">
      {/* —— The single iridescent moment: warm → rainbow mesh, full-bleed —— */}
      <div
        className={`pointer-events-none absolute left-1/2 top-1/2 h-[140%] w-[140%] -translate-x-1/2 -translate-y-1/2 bg-iridescent opacity-50 blur-[120px] ${
          reduced ? '' : 'animate-haze-drift'
        }`}
        aria-hidden="true"
      />
      {/* Warm wash to keep it editorial and the type legible. */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(90% 90% at 50% 50%, rgba(14,10,8,0.35), rgba(14,10,8,0.85) 75%)',
        }}
        aria-hidden="true"
      />

      <div className="container-rail relative z-10 section-pad">
        <Reveal as="p" className="eyebrow mb-10">
          {contact.eyebrow}
        </Reveal>

        {/* Poster finale line */}
        <Reveal stagger={0.12}>
          <h2 className="font-display text-poster-sm leading-[0.9] text-ink">
            {contact.poster.map((line, i) => (
              <span key={i} className="block">
                {i === contact.poster.length - 1 ? <span className="text-molten">{line}</span> : line}
              </span>
            ))}
          </h2>
        </Reveal>

        <Reveal as="p" delay={0.1} className="mt-8 max-w-xl text-lg text-ink/80 sm:text-xl">
          {contact.sub}
        </Reveal>

        {/* Molten CTA */}
        <Reveal delay={0.2} className="mt-10">
          <a href={`mailto:${links.email}`} className="btn-molten">
            {contact.cta} ↗
          </a>
        </Reveal>

        {/* Link row */}
        <Reveal stagger={0.08} className="mt-12 flex flex-wrap items-center gap-x-7 gap-y-3 border-t border-hairline pt-8">
          <MonoLink href={links.github}>GITHUB</MonoLink>
          <MonoLink href={links.linkedin}>LINKEDIN</MonoLink>
          <MonoLink href={`mailto:${links.email}`}>{links.email}</MonoLink>
          <MonoLink href={`tel:${links.phone.replace(/\s/g, '')}`}>{links.phone}</MonoLink>
        </Reveal>

        {/* Footnote */}
        <Reveal as="p" delay={0.25} className="mono mt-16 text-ink-muted">
          {contact.footnote}
        </Reveal>

        {/* Slim footer */}
        <footer className="mono mt-10 flex flex-wrap justify-between gap-2 text-[11px] text-ink-muted/60">
          <span>© {new Date().getFullYear()} MANAN N. GHODASARA</span>
          <span>BUILT WITH REACT · THREE.JS · GSAP</span>
        </footer>
      </div>
    </section>
  );
}
