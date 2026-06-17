import { Suspense, useEffect, useRef, useState, type MutableRefObject } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Lightformer, Float } from '@react-three/drei';
import * as THREE from 'three';

type ProgressRef = MutableRefObject<number>;

// A pleasing scatter of crystal shards around the centre.
const SHARDS = [
  { p: [0, 0.2, 0] as const, s: 1.35, geo: 'ico' as const },
  { p: [1.9, 0.9, -0.6] as const, s: 0.6, geo: 'oct' as const },
  { p: [-1.8, -0.4, 0.4] as const, s: 0.7, geo: 'oct' as const },
  { p: [1.4, -1.1, 0.5] as const, s: 0.5, geo: 'tet' as const },
  { p: [-1.5, 1.3, -0.3] as const, s: 0.45, geo: 'tet' as const },
  { p: [0.4, -1.7, -0.5] as const, s: 0.4, geo: 'oct' as const },
];

function Shard({ s, geo }: { s: number; geo: 'ico' | 'oct' | 'tet' }) {
  return (
    <mesh scale={s}>
      {geo === 'ico' && <icosahedronGeometry args={[1, 0]} />}
      {geo === 'oct' && <octahedronGeometry args={[1, 0]} />}
      {geo === 'tet' && <tetrahedronGeometry args={[1, 0]} />}
      <meshPhysicalMaterial
        transmission={0.92}
        thickness={0.7}
        roughness={0.12}
        metalness={0}
        ior={1.4}
        iridescence={1}
        iridescenceIOR={1.6}
        clearcoat={1}
        clearcoatRoughness={0.1}
        color="#cdbcff"
      />
    </mesh>
  );
}

function Cluster({ progress }: { progress: ProgressRef }) {
  const group = useRef<THREE.Group>(null);
  useFrame((state, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.18;
    // Scroll-driven: the cluster tilts and swells as you move through About.
    const p = progress.current;
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, p * 0.9 - 0.25, 0.08);
    group.current.scale.setScalar(THREE.MathUtils.lerp(group.current.scale.x, 0.8 + p * 0.3, 0.08));
    // Gentle pointer parallax.
    group.current.position.x = THREE.MathUtils.lerp(group.current.position.x, state.pointer.x * 0.3, 0.04);
    group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, state.pointer.y * 0.3, 0.04);
  });

  return (
    <group ref={group}>
      {SHARDS.map((sh, i) => (
        <Float key={i} speed={1 + i * 0.15} rotationIntensity={1.1} floatIntensity={1.4}>
          <group position={sh.p}>
            <Shard s={sh.s} geo={sh.geo} />
          </group>
        </Float>
      ))}
    </group>
  );
}

export default function AboutCanvas({ progress }: { progress: ProgressRef }) {
  const wrap = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(true);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setActive(e.isIntersecting), { threshold: 0.02 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrap} className="absolute inset-0">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 42 }}
        dpr={[1, 2]}
        frameloop={active ? 'always' : 'never'}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1.4} />
        <Suspense fallback={null}>
          <Cluster progress={progress} />
          <Environment resolution={128}>
            <Lightformer form="rect" intensity={2.4} color="#7c5cff" position={[-3, 2, 3]} scale={[4, 4, 1]} />
            <Lightformer form="rect" intensity={2.4} color="#5b8def" position={[3, -1, 2]} scale={[4, 4, 1]} />
            <Lightformer form="circle" intensity={3} color="#ffffff" position={[0, 3, 2]} scale={[2, 2, 1]} />
            <Lightformer form="rect" intensity={1.6} color="#ff7ad9" position={[2, -3, 1]} scale={[3, 3, 1]} />
          </Environment>
        </Suspense>
      </Canvas>
    </div>
  );
}
