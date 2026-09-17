import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { MeshTransmissionMaterial, Edges } from "@react-three/drei";
import { type SectionKey, sceneTargets, sectionOrder, lerpColor } from "./sceneConfig";

interface CentralObjectProps {
  activeSection: SectionKey;
  pointer: React.MutableRefObject<{ x: number; y: number }>;
  lowPower: boolean;
}

/**
 * The single, unified "brand object" — a glass core wrapped in a wireframe
 * icosahedron with a handful of thin metallic interface panels orbiting it.
 * Its position / rotation / scale / colour are damped toward per-section
 * targets so the whole page feels like one continuous 3D experience.
 */
export default function CentralObject({ activeSection, pointer, lowPower }: CentralObjectProps) {
  const group = useRef<THREE.Group>(null);
  const core = useRef<THREE.Mesh>(null);
  const wire = useRef<THREE.Mesh>(null);
  const panels = useRef<THREE.Group>(null);
  const light = useRef<THREE.PointLight>(null);

  const colorObj = useRef(new THREE.Color("#7c6cf6"));
  const target = sceneTargets[activeSection] ?? sceneTargets.hero;

  const panelData = useMemo(
    () =>
      new Array(5).fill(0).map((_, i) => ({
        angle: (i / 5) * Math.PI * 2,
        radius: 2.1 + (i % 2) * 0.35,
        height: (i - 2) * 0.5,
        speed: 0.15 + i * 0.03,
        size: 0.55 + (i % 3) * 0.15,
      })),
    []
  );

  useFrame((state, delta) => {
    if (!group.current) return;
    const t = state.clock.getElapsedTime();
    const damp = lowPower ? 2.2 : 3.2;

    // Idle rotation + scroll-driven target rotation combined.
    group.current.rotation.y = THREE.MathUtils.damp(
      group.current.rotation.y,
      target.rotation[1] + t * 0.06,
      damp * 0.4,
      delta
    );
    group.current.rotation.x = THREE.MathUtils.damp(
      group.current.rotation.x,
      target.rotation[0] + pointer.current.y * 0.12,
      damp,
      delta
    );
    group.current.rotation.z = THREE.MathUtils.damp(group.current.rotation.z, target.rotation[2], damp, delta);

    const isMobile = state.viewport.width < 5.5;
    const posX = isMobile ? Math.min(target.position[0], 0.6) : target.position[0];
    const posY = isMobile ? target.position[1] + 0.3 : target.position[1];
    const targetScale = isMobile ? target.scale * 0.62 : target.scale;

    group.current.position.x = THREE.MathUtils.damp(
      group.current.position.x,
      posX + pointer.current.x * (isMobile ? 0.1 : 0.25),
      damp,
      delta
    );
    group.current.position.y = THREE.MathUtils.damp(
      group.current.position.y,
      posY - pointer.current.y * 0.15,
      damp,
      delta
    );
    group.current.position.z = THREE.MathUtils.damp(group.current.position.z, target.position[2], damp, delta);

    const s = THREE.MathUtils.damp(group.current.scale.x, targetScale, damp, delta);
    group.current.scale.setScalar(s);

    // Colour blend for wireframe / emissive accents.
    const idx = sectionOrder.indexOf(activeSection);
    const nextIdx = (idx + 1) % sectionOrder.length;
    const blended = lerpColor(target.colorA, target.colorB, (Math.sin(t * 0.2) + 1) / 2);
    colorObj.current.lerp(blended, delta * 1.5);

    if (wire.current) {
      const mat = wire.current.material as THREE.MeshBasicMaterial;
      mat.color = colorObj.current;
    }
    if (light.current) {
      light.current.color = colorObj.current;
      light.current.intensity = lowPower ? 4 : 6;
    }

    if (core.current) {
      core.current.rotation.y -= delta * 0.15;
      core.current.rotation.x += delta * 0.08;
    }

    if (panels.current) {
      panels.current.children.forEach((p, i) => {
        const d = panelData[i];
        const a = t * d.speed + d.angle;
        p.position.set(Math.cos(a) * d.radius, d.height + Math.sin(t * 0.4 + i) * 0.15, Math.sin(a) * d.radius);
        p.rotation.y = -a + Math.PI / 2;
        p.rotation.x = Math.sin(t * 0.2 + i) * 0.2;
      });
    }
    void nextIdx;
  });

  return (
    <group ref={group}>
      <pointLight ref={light} position={[0, 0, 0]} intensity={6} distance={8} decay={2} />

      {/* Glass core */}
      <mesh ref={core}>
        <icosahedronGeometry args={[1, 2]} />
        {lowPower ? (
          <meshStandardMaterial
            color="#0d0d14"
            metalness={0.6}
            roughness={0.25}
            emissive="#221f3a"
            emissiveIntensity={0.4}
          />
        ) : (
          <MeshTransmissionMaterial
            thickness={0.6}
            roughness={0.05}
            transmission={1}
            ior={1.2}
            chromaticAberration={0.04}
            backside
            samples={6}
            resolution={256}
            color="#c9c3ff"
          />
        )}
      </mesh>

      {/* Outer wireframe shell */}
      <mesh ref={wire} scale={1.55}>
        <icosahedronGeometry args={[1, 1]} />
        <meshBasicMaterial color="#7c6cf6" wireframe transparent opacity={0.55} />
      </mesh>

      {/* Thin metallic floating interface panels */}
      <group ref={panels}>
        {panelData.map((d, i) => (
          <mesh key={i}>
            <planeGeometry args={[d.size, d.size * 0.62]} />
            <meshStandardMaterial
              color="#0e0e14"
              metalness={0.9}
              roughness={0.2}
              emissive="#3fd7ff"
              emissiveIntensity={0.08}
              side={THREE.DoubleSide}
              transparent
              opacity={0.9}
            />
            <Edges scale={1} threshold={15} color="#8f88ff" />
          </mesh>
        ))}
      </group>
    </group>
  );
}
