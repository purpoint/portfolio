import { useEffect, useState } from 'react';
import { nav, links } from '../data';
import Magnetic from './Magnetic';

/**
 * Floating glass navbar. A frosted pill that hovers over the hero, brand mark
 * on the left, animated section links in the middle, a magnetic CTA on the
 * right. Tightens (more opaque) once you scroll past the fold.
 */
export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('#top');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);

    // Highlight the section currently in view.
    const ids = ['#top', ...nav.map((n) => n.href)];
    const sections = ids
      .map((id) => document.querySelector(id))
      .filter(Boolean) as Element[];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(`#${e.target.id}`);
        });
      },
      { rootMargin: '-45% 0px -55% 0px' }
    );
    sections.forEach((s) => io.observe(s));

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      io.disconnect();
    };
  }, []);

  const goTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <header className="fixed inset-x-0 top-0 z-[65] animate-fade-down px-4 pt-3 sm:pt-4">
      <nav className="container-rail">
        <div
          className={`glass flex items-center justify-between gap-3 rounded-2xl px-3 py-2.5 transition-all duration-300 sm:px-4 ${
            scrolled ? 'shadow-card' : ''
          }`}
        >
          {/* Brand */}
          <a href="#top" onClick={(e) => goTo(e, '#top')} className="group flex items-center gap-2.5">
            <span
              className="grid h-8 w-8 place-items-center rounded-xl text-[14px] font-semibold text-white shadow-glow transition-transform duration-300 group-hover:scale-110"
              style={{ backgroundImage: 'linear-gradient(135deg, #7c5cff, #5b8def)' }}
            >
              M
            </span>
            <span className="font-display text-[15px] font-medium tracking-tight text-ink">
              Manan Ghodasara
            </span>
          </a>

          {/* Section links with active pill */}
          <ul className="hidden items-center gap-1 md:flex">
            {nav.map((item) => {
              const isActive = active === item.href;
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={(e) => goTo(e, item.href)}
                    className={`relative rounded-lg px-3.5 py-2 text-sm transition-colors duration-200 ${
                      isActive ? 'text-ink' : 'text-ink-muted hover:text-ink'
                    }`}
                  >
                    {isActive && (
                      <span className="absolute inset-0 -z-10 rounded-lg border border-white/10 bg-white/[0.06]" />
                    )}
                    {item.label.charAt(0) + item.label.slice(1).toLowerCase()}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Resume + Get in touch */}
          <div className="flex items-center gap-2">
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.025] px-3.5 py-2 text-[13px] font-medium text-ink transition-all duration-200 hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.05] sm:inline-flex"
            >
              Resume
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M7 17 17 7" />
                <path d="M8 7h9v9" />
              </svg>
            </a>
            <Magnetic strength={0.4}>
              <a href={`mailto:${links.email}`} className="btn-primary !rounded-xl !px-4 !py-2 text-[13px]">
                Get in touch
              </a>
            </Magnetic>
          </div>
        </div>
      </nav>
    </header>
  );
}
