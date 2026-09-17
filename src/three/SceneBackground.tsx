import { Suspense, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Bloom, EffectComposer, Vignette, Noise } from "@react-three/postprocessing";
import CentralObject from "./CentralObject";
import Particles from "./Particles";
import { type SectionKey, sceneTargets } from "./sceneConfig";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

interface SceneBackgroundProps {
  activeSection: SectionKey;
  pointer: React.MutableRefObject<{ x: number; y: number }>;
  lowPower: boolean;
}

function Rig({ activeSection, pointer, lowPower }: SceneBackgroundProps) {
  const target = sceneTargets[activeSection] ?? sceneTargets.hero;
  useFrame(({ camera }, delta) => {
    const damp = lowPower ? 2 : 3;
    camera.position.z = THREE.MathUtils.damp(camera.position.z, target.camZ, damp, delta);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, target.camY + pointer.current.y * 0.1, damp, delta);
    camera.position.x = THREE.MathUtils.damp(camera.position.x, pointer.current.x * 0.3, damp, delta);
    camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function SceneBackground({ activeSection, pointer, lowPower }: SceneBackgroundProps) {
  const dpr = useRef<[number, number]>(lowPower ? [1, 1.2] : [1, 1.8]);

  return (
    <Canvas
      dpr={dpr.current}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0, 7.5], fov: 42 }}
      className="!fixed inset-0"
      style={{ position: "fixed", inset: 0, zIndex: 0 }}
    >
      <color attach="background" args={["#050506"]} />
      <fog attach="fog" args={["#050506", 8, 20]} />
      <ambientLight intensity={0.35} />
      <directionalLight position={[4, 6, 5]} intensity={0.6} color="#dfe0ff" />
      <directionalLight position={[-5, -3, -4]} intensity={0.25} color="#3fd7ff" />

      <Suspense fallback={null}>
        <CentralObject activeSection={activeSection} pointer={pointer} lowPower={lowPower} />
        <Particles count={lowPower ? 260 : 900} />
      </Suspense>

      <Rig activeSection={activeSection} pointer={pointer} lowPower={lowPower} />

      {!lowPower && (
        <EffectComposer multisampling={0}>
          <Bloom intensity={0.65} luminanceThreshold={0.18} luminanceSmoothing={0.35} mipmapBlur radius={0.7} />
          <Noise opacity={0.02} />
          <Vignette eskil={false} offset={0.2} darkness={0.9} />
        </EffectComposer>
      )}
    </Canvas>
  );
}
