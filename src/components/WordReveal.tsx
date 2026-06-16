import { useLayoutEffect, useRef } from 'react';
import { gsap } from '../lib/gsap';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface WordRevealProps {
  text: string;
  className?: string;
}

/**
 * Splits a paragraph into words that "light up" one after another as the line
 * scrolls through the centre of the viewport — the words start dim and warm
 * white brightens in as you scroll. Falls back to fully-lit text when the user
 * prefers reduced motion.
 */
export default function WordReveal({ text, className = '' }: WordRevealProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduced = useReducedMotion();
  const words = text.split(' ');

  useLayoutEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      const spans = ref.current?.querySelectorAll('.wr-word');
      if (!spans) return;
      gsap.fromTo(
        spans,
        { opacity: 0.16 },
        {
          opacity: 1,
          ease: 'none',
          stagger: 0.4,
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 78%',
            end: 'bottom 55%',
            scrub: true,
          },
        }
      );
    }, ref);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <p ref={ref} className={className}>
      {words.map((w, i) => (
        <span key={`${w}-${i}`} className="wr-word" style={reduced ? undefined : { opacity: 0.16 }}>
          {w}
          {i < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </p>
  );
}
