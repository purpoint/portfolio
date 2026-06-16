import { useReducedMotion } from '../hooks/useReducedMotion';

/**
 * Page-wide film grain + warm vignette. The grain gently drifts unless the
 * user prefers reduced motion, in which case it stays a static texture.
 */
export default function GrainOverlay() {
  const reduced = useReducedMotion();
  return (
    <>
      <div
        className={`grain ${reduced ? '' : 'animate-[grain-shift_8s_steps(6)_infinite]'}`}
        aria-hidden="true"
      />
      <div className="vignette" aria-hidden="true" />
    </>
  );
}
