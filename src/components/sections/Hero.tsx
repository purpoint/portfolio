import { Suspense, lazy, useLayoutEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../../lib/gsap';
import { hero } from '../../data';
import { useReducedMotion, useShouldRender3D } from '../../hooks/useReducedMotion';
import ScrollCue from '../ScrollCue';
import MoltenBlobFallback from '../three/MoltenBlobFallback';

// Heavy WebGL bundle is code-split and only fetched when we actually need it.
const HeroCanvas = lazy(() => import('../three/HeroCanvas'));

export default function Hero() {
  const reduced = useReducedMotion();
  const render3D = useShouldRender3D();

  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Word-by-word headline assembly on load.
      const words = wordsRef.current?.querySelectorAll('.word-inner');
      if (words && !reduced) {
        gsap.from(words, {
          yPercent: 115,
          opacity: 0,
          rotateX: -40,
          duration: 1.1,
          ease: 'power4.out',
          stagger: 0.12,
          delay: 0.15,
        });
      }

      // Scroll-out: the molten object scales up, drifts off-centre and dims;
      // the headline lifts and fades as we leave the hero.
      if (!reduced) {
        gsap.to(stageRef.current, {
          scale: 1.55,
          xPercent: 18,
          yPercent: -8,
          opacity: 0.18,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
        gsap.to(wordsRef.current, {
          yPercent: -30,
          opacity: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: '60% top',
            scrub: true,
          },
        });
      }
    }, sectionRef);

    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden section-pad"
    >
      {/* Molten 3D stage — woven behind the headline. */}
      <div
        ref={stageRef}
        className="pointer-events-none absolute left-1/2 top-1/2 z-10 h-[min(78vw,640px)] w-[min(78vw,640px)] -translate-x-1/2 -translate-y-[46%]"
      >
        {render3D ? (
          <Suspense fallback={<MoltenBlobFallback />}>
            <HeroCanvas />
          </Suspense>
        ) : (
          <MoltenBlobFallback />
        )}
      </div>

      <div className="container-rail relative z-20">
        {/* Kicker */}
        <p className="mono mb-8 text-molten-amber/90">{hero.kicker}</p>

        {/* Poster headline, assembled word-by-word */}
        <div ref={wordsRef} className="[perspective:900px]">
          <h1 className="font-display text-poster leading-[0.86]">
            {hero.name.map((word, i) => (
              <span key={word} className="block overflow-hidden">
                <span
                  className={`word-inner inline-block text-molten ${i === 1 ? 'pl-[0.06em]' : ''}`}
                >
                  {word}
                </span>
              </span>
            ))}
          </h1>
        </div>

        {/* Sub + hover hint */}
        <div className="mt-10 flex max-w-xl flex-col gap-4">
          <p className="text-lg text-ink/80 sm:text-xl">{hero.sub}</p>
          {render3D && (
            <span className="mono text-molten-amber/70">{hero.hint}</span>
          )}
        </div>
      </div>

      {/* Bottom-centre scroll cue */}
      <div className="absolute inset-x-0 bottom-8 z-20 flex justify-center">
        <ScrollCue label={hero.cue} />
      </div>
    </section>
  );
}
