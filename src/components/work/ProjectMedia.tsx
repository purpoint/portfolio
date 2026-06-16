import { useRef, useState } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface ProjectMediaProps {
  image: string;
  name: string;
  glow: string; // "r, g, b"
}

/**
 * The art-directed project visual. Renders the screenshot under a warm duotone
 * overlay that lifts to full colour on hover; if the screenshot isn't present
 * yet it shows a styled placeholder telling you exactly where to drop it.
 * Tilts slightly toward the cursor (disabled for reduced motion).
 */
export default function ProjectMedia({ image, name, glow }: ProjectMediaProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [loaded, setLoaded] = useState(false);

  const onMove = (e: React.MouseEvent) => {
    if (reduced || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    ref.current.style.transform = `perspective(1000px) rotateY(${px * 7}deg) rotateX(${-py * 7}deg) scale(1.01)`;
  };
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = 'perspective(1000px) rotateY(0) rotateX(0) scale(1)';
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="group/media relative aspect-[16/11] w-full overflow-hidden rounded-2xl border border-hairline transition-transform duration-300 ease-out will-change-transform"
      style={{ boxShadow: `0 40px 120px -50px rgba(${glow}, 0.8)` }}
    >
      {/* Placeholder shown until (or unless) a real screenshot loads. */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center"
        style={{
          background: `radial-gradient(120% 120% at 30% 20%, rgba(${glow},0.32), rgba(14,10,8,0.9) 70%)`,
        }}
      >
        <span className="font-display text-[clamp(40px,7vw,90px)] uppercase text-ink/15">
          {name}
        </span>
        <span className="mono text-ink-muted/70">
          {/* TODO: drop screenshot in public{image} */}
          SCREENSHOT → public{image}
        </span>
      </div>

      {/* Real screenshot (duotone → full colour on hover). */}
      <img
        src={image}
        alt={`${name} project screenshot`}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className={`absolute inset-0 h-full w-full object-cover transition-[filter,opacity] duration-500 ${
          loaded ? 'opacity-100' : 'opacity-0'
        } [filter:grayscale(0.55)_contrast(1.05)] group-hover/media:[filter:grayscale(0)]`}
      />

      {/* Warm duotone wash on top of the screenshot. */}
      {loaded && (
        <div
          className="pointer-events-none absolute inset-0 mix-blend-color transition-opacity duration-500 group-hover/media:opacity-0"
          style={{ background: `linear-gradient(135deg, rgba(${glow},0.85), rgba(200,52,27,0.55))` }}
          aria-hidden="true"
        />
      )}
    </div>
  );
}
