interface MarqueeProps {
  items: string[];
  className?: string;
}

/**
 * Slow, seamless horizontal marquee of words. The list is duplicated and the
 * track slides -50%, so it loops without a seam. Decorative + aria-hidden;
 * the global reduced-motion rule freezes the animation.
 */
export default function Marquee({ items, className = '' }: MarqueeProps) {
  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{
        maskImage:
          'linear-gradient(to right, transparent, #000 10%, #000 90%, transparent)',
        WebkitMaskImage:
          'linear-gradient(to right, transparent, #000 10%, #000 90%, transparent)',
      }}
      aria-hidden="true"
    >
      <div className="flex w-max animate-marquee items-center gap-10 whitespace-nowrap will-change-transform">
        {[...items, ...items].map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="font-display text-[clamp(28px,5vw,64px)] uppercase leading-none text-ink/[0.07]"
          >
            {item}
            <span className="px-6 text-accent/30">/</span>
          </span>
        ))}
      </div>
    </div>
  );
}
