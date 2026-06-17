import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import {
  Environment,
  Lightformer,
  Float,
  MeshTransmissionMaterial,
  Sparkles,
} from '@react-three/drei';
import { EffectComposer, Bloom, Vignette, ChromaticAberration } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import * as THREE from 'three';

/**
 * The hero's 3D centrepiece: a faceted glass crystal with real refraction +
 * chromatic dispersion, lit by coloured studio lightformers, wrapped in a
 * floating particle field and finished with cinematic bloom. Procedural for
 * now — swap in a Blender .glb via useGLTF when you have one.
 */
function Crystal() {
  const mesh = useRef<THREE.Mesh>(null);
  const TARGET = 1.75;
  useFrame((_, delta) => {
    if (!mesh.current) return;
    mesh.current.rotation.y += delta * 0.3;
    mesh.current.rotation.x += delta * 0.08;
    mesh.current.rotation.z += delta * 0.05;
    // Ease-in scale on mount for a satisfying entrance.
    const s = mesh.current.scale.x + (TARGET - mesh.current.scale.x) * Math.min(1, delta * 2.2);
    mesh.current.scale.setScalar(s);
  });

  return (
    <Float speed={1.6} rotationIntensity={1} floatIntensity={1.9}>
      <mesh ref={mesh} scale={0.2}>
        <icosahedronGeometry args={[1, 0]} />
        <MeshTransmissionMaterial
          samples={6}
          resolution={256}
          thickness={1.5}
          roughness={0.03}
          ior={1.5}
          chromaticAberration={0.3}
          anisotropy={0.4}
          distortion={0.45}
          distortionScale={0.5}
          temporalDistortion={0.22}
          color="#f3efff"
          background={new THREE.Color('#08080c')}
        />
      </mesh>
    </Float>
  );
}

/** Subtle pointer-driven parallax for the whole rig. */
function Rig({ children }: { children: React.ReactNode }) {
  const group = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, state.pointer.x * 0.35, 0.04);
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -state.pointer.y * 0.25, 0.04);
  });
  return <group ref={group}>{children}</group>;
}

export default function Scene() {
  return (
    <>
      <color attach="background" args={['#08080c']} />
      <ambientLight intensity={0.4} />

      <Rig>
        <Crystal />
        <Sparkles count={150} scale={[12, 12, 7]} size={2.6} speed={0.4} opacity={0.7} color="#b4a4ff" />
        <Sparkles count={70} scale={[14, 10, 8]} size={1.2} speed={0.6} opacity={0.5} color="#ffffff" />
      </Rig>

      {/* Coloured studio lighting → the crystal refracts these as dispersion. */}
      <Environment resolution={256}>
        <group rotation={[0, 0, 1]}>
          <Lightformer form="rect" intensity={3} color="#7c5cff" position={[-4, 1, 4]} scale={[4, 4, 1]} />
          <Lightformer form="rect" intensity={3} color="#5b8def" position={[4, 2, 3]} scale={[4, 4, 1]} />
          <Lightformer form="circle" intensity={4} color="#ffffff" position={[0, 4, 3]} scale={[3, 3, 1]} />
          <Lightformer form="rect" intensity={2} color="#ff7ad9" position={[2, -3, 2]} scale={[3, 3, 1]} />
        </group>
      </Environment>

      <EffectComposer>
        <Bloom mipmapBlur luminanceThreshold={0.55} luminanceSmoothing={0.3} intensity={1.15} />
        <ChromaticAberration
          blendFunction={BlendFunction.NORMAL}
          offset={new THREE.Vector2(0.0006, 0.0008)}
          radialModulation={false}
          modulationOffset={0}
        />
        <Vignette eskil={false} offset={0.25} darkness={0.95} />
      </EffectComposer>
    </>
  );
}
