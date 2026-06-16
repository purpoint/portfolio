import { useEffect, useState } from 'react';

/**
 * Returns true when the user has requested reduced motion. We treat this as
 * the master switch for disabling scroll choreography and the WebGL hero.
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return reduced;
}

/**
 * Decides whether the heavy WebGL hero should run. We swap to the lightweight
 * CSS molten blob when motion is reduced, on small/touch screens, or when the
 * device has very few logical cores (a cheap proxy for low-power hardware).
 */
export function useShouldRender3D(): boolean {
  const reduced = useReducedMotion();
  const [capable, setCapable] = useState(false);

  useEffect(() => {
    const smallOrTouch =
      window.matchMedia('(max-width: 820px)').matches ||
      window.matchMedia('(pointer: coarse)').matches;
    const lowCore =
      typeof navigator !== 'undefined' &&
      typeof navigator.hardwareConcurrency === 'number' &&
      navigator.hardwareConcurrency > 0 &&
      navigator.hardwareConcurrency <= 2;
    setCapable(!smallOrTouch && !lowCore);
  }, []);

  return capable && !reduced;
}
