import { useReducedMotion } from '../../hooks/useReducedMotion';

/**
 * Zero-WebGL stand-in for the 3D hero. Used on mobile / low-power devices and
 * whenever the user prefers reduced motion. A warm molten blob built from pure
 * CSS gradients — fast to paint, no GPU context, no layout shift.
 */
export default function MoltenBlobFallback() {
  const reduced = useReducedMotion();
  return (
    <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
      <div className="relative h-[min(70vw,420px)] w-[min(70vw,420px)]">
        {/* Soft heat-bloom behind the blob */}
        <div
          className="absolute inset-0 blur-3xl"
          style={{
            background:
              'radial-gradient(circle at 50% 45%, rgba(255,138,60,0.55), rgba(200,52,27,0.15) 55%, transparent 72%)',
          }}
        />
        {/* The molten body */}
        <div
          className={`absolute inset-[12%] ${reduced ? '' : 'animate-blob-churn'}`}
          style={{
            background:
              'radial-gradient(circle at 38% 32%, #FFD9A8, #FF8A3C 38%, #FF5B2E 66%, #C8341B 100%)',
            boxShadow:
              'inset -18px -22px 60px rgba(120,20,10,0.6), inset 14px 16px 50px rgba(255,217,168,0.5), 0 30px 80px -30px rgba(255,91,46,0.7)',
          }}
        />
      </div>
    </div>
  );
}
