import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

/**
 * The molten centrepiece: a churning icosahedron in an amber→ember gradient
 * with an emissive core, a faked fresnel rim halo, and a warm particle field.
 * Reacts to the cursor — the whole group tilts toward the pointer and the
 * surface distortion intensifies as the pointer nears the centre.
 */
function MoltenCore() {
  const group = useRef<THREE.Group>(null);
  const mat = useRef<any>(null);
  const distort = useRef(0.32);

  useFrame((state, delta) => {
    if (!group.current) return;
    const { pointer } = state;

    // Parallax tilt toward the cursor.
    const targetRX = pointer.y * 0.35;
    const targetRY = pointer.x * 0.5;
    group.current.rotation.x += (targetRX - group.current.rotation.x) * 0.05;
    group.current.rotation.y += (targetRY - group.current.rotation.y) * 0.05;
    // Slow continuous churn.
    group.current.rotation.z += delta * 0.04;

    // Distortion ramps up as the pointer approaches the centre of the canvas.
    const dist = Math.min(1, Math.hypot(pointer.x, pointer.y) / 1.414);
    const proximity = 1 - dist;
    const target = 0.3 + proximity * 0.35;
    distort.current += (target - distort.current) * 0.06;
    if (mat.current) mat.current.distort = distort.current;
  });

  return (
    <group ref={group}>
      {/* Emissive molten body */}
      <mesh castShadow>
        <icosahedronGeometry args={[1.35, 24]} />
        <MeshDistortMaterial
          ref={mat}
          color="#FF5B2E"
          emissive="#C8341B"
          emissiveIntensity={0.55}
          roughness={0.28}
          metalness={0.55}
          distort={0.32}
          speed={1.6}
        />
      </mesh>

      {/* Faux-fresnel rim halo — a larger back-faced shell glowing additively. */}
      <mesh scale={1.18}>
        <icosahedronGeometry args={[1.35, 8]} />
        <meshBasicMaterial
          color="#FF8A3C"
          transparent
          opacity={0.12}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

function Particles({ count = 260 }: { count?: number }) {
  const points = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Spread within a soft spherical cloud around the object.
      const r = 2.4 + Math.random() * 3.4;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, [count]);

  useFrame((_, delta) => {
    if (points.current) points.current.rotation.y += delta * 0.02;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#FFD9A8"
        size={0.035}
        sizeAttenuation
        transparent
        opacity={0.7}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

export default function MoltenObject() {
  return (
    <>
      {/* Warm key + rim lighting. */}
      <ambientLight intensity={0.35} color="#FFD9A8" />
      <pointLight position={[4, 3, 5]} intensity={50} color="#FF8A3C" />
      <pointLight position={[-5, -2, 2]} intensity={28} color="#C8341B" />
      <MoltenCore />
      <Particles />
    </>
  );
}
