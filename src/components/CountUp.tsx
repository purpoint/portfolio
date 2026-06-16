import { useLayoutEffect, useRef } from 'react';
import { gsap } from '../lib/gsap';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface CountUpProps {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}

/**
 * Counts a number up from zero to `value` the first time it scrolls into view.
 * Honors reduced motion by rendering the final value immediately.
 */
export default function CountUp({
  value,
  decimals = 0,
  prefix = '',
  suffix = '',
  duration = 1.8,
  className = '',
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();

  const format = (n: number) => `${prefix}${n.toFixed(decimals)}${suffix}`;

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduced) {
      el.textContent = format(value);
      return;
    }

    const counter = { n: 0 };
    el.textContent = format(0);

    const ctx = gsap.context(() => {
      gsap.to(counter, {
        n: value,
        duration,
        ease: 'power2.out',
        onUpdate: () => {
          el.textContent = format(counter.n);
        },
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          once: true,
        },
      });
    }, ref);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced, value]);

  return (
    <span ref={ref} className={className} aria-label={format(value)}>
      {format(value)}
    </span>
  );
}
