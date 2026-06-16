import { useLayoutEffect, useRef, type ElementType, type ReactNode } from 'react';
import { gsap } from '../lib/gsap';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Render as a different element (default div). */
  as?: ElementType;
  /** Vertical travel distance in px. */
  y?: number;
  /** Delay before the reveal, in seconds. */
  delay?: number;
  /** When set, stagger the element's direct children instead of itself. */
  stagger?: number;
}

/**
 * Fade + rise reveal on scroll-enter. With `stagger`, its direct children
 * animate in sequence. No-ops (renders statically) under reduced motion.
 */
export default function Reveal({
  children,
  className = '',
  as: Tag = 'div',
  y = 44,
  delay = 0,
  stagger,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useLayoutEffect(() => {
    if (reduced || !ref.current) return;
    const ctx = gsap.context(() => {
      const targets =
        stagger != null ? (ref.current!.children as unknown as Element[]) : ref.current!;
      gsap.from(targets, {
        opacity: 0,
        y,
        duration: 0.9,
        delay,
        ease: 'power3.out',
        stagger: stagger ?? 0,
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 85%',
        },
      });
    }, ref);
    return () => ctx.revert();
  }, [reduced, y, delay, stagger]);

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
