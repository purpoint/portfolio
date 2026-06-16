import { Suspense, useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import MoltenObject from './MoltenObject';

/**
 * Lazy-mounted WebGL stage for the molten object.
 *
 * Performance guards:
 *  - devicePixelRatio capped at 2 (`dpr={[1, 2]}`)
 *  - render loop pauses (`frameloop="never"`) whenever the hero scrolls
 *    offscreen, via an IntersectionObserver on the wrapper
 *  - the whole module is code-split and loaded with React.lazy from the Hero
 */
export default function HeroCanvas() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(true);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { threshold: 0.05 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrapRef} className="absolute inset-0 h-full w-full">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 42 }}
        dpr={[1, 2]}
        frameloop={active ? 'always' : 'never'}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        style={{ pointerEvents: 'none' }}
      >
        <Suspense fallback={null}>
          <MoltenObject />
        </Suspense>
      </Canvas>
    </div>
  );
}
