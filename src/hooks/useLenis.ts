import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger } from '../lib/gsap';
import { useReducedMotion } from './useReducedMotion';

/**
 * Boots Lenis inertia smooth-scroll and keeps GSAP ScrollTrigger in lockstep
 * with it. Disabled entirely when the user prefers reduced motion (native
 * scrolling takes over, ScrollTrigger still reads the real scroll position).
 */
export function useLenis() {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) {
      // Native scroll; make sure ScrollTrigger recalculates against it.
      ScrollTrigger.refresh();
      return;
    }

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    // Drive Lenis from GSAP's ticker so scroll + animation share one clock.
    lenis.on('scroll', ScrollTrigger.update);

    // Dev-only handle for automated scroll-captures (stripped from prod build).
    if (import.meta.env.DEV) {
      (window as unknown as { __lenis?: unknown }).__lenis = lenis;
    }

    const raf = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // Lazy 3D canvases + web fonts can shift layout after the first paint, which
    // leaves ScrollTrigger start/end positions stale. Recompute them once the
    // page has fully loaded, plus a couple of delayed passes to be safe.
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener('load', refresh);
    const t1 = window.setTimeout(refresh, 800);
    const t2 = window.setTimeout(refresh, 2000);

    return () => {
      gsap.ticker.remove(raf);
      window.removeEventListener('load', refresh);
      clearTimeout(t1);
      clearTimeout(t2);
      lenis.destroy();
    };
  }, [reduced]);
}
