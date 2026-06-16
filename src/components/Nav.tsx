import { useEffect, useState } from 'react';
import { hero, nav } from '../data';

/**
 * Minimal mono nav: name on the left, anchor links on the right. Smooth-scroll
 * is handled by Lenis intercepting the native anchor jump; we fall back to
 * scrollIntoView so keyboard activation and reduced-motion both work.
 */
export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[65] transition-colors duration-500 ${
        scrolled ? 'backdrop-blur-md' : ''
      }`}
      style={{
        background: scrolled
          ? 'linear-gradient(180deg, rgba(14,10,8,0.7), rgba(14,10,8,0))'
          : 'transparent',
      }}
    >
      <nav className="container-rail flex items-center justify-between px-6 py-5 sm:px-10 lg:px-16">
        <a
          href="#top"
          onClick={(e) => go(e, '#top')}
          className="mono text-base tracking-[0.3em] text-ink transition-colors hover:text-molten-amber"
        >
          {hero.navName}
        </a>
        <ul className="flex items-center gap-5 sm:gap-8">
          {nav.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={(e) => go(e, item.href)}
                className="mono text-ink-muted transition-colors hover:text-ink"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
