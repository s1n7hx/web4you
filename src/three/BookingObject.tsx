import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { usePointer } from "../hooks/usePointer";

interface BookingObjectProps {
  step: number; // 1..5 drives lighting/colour intensity
  totalSteps: number;
}

const ACCENTS = ["#7c6cf6", "#3fd7ff", "#ff7a5c", "#7c6cf6", "#3fd7ff"];

function CalendarRig({ step, totalSteps }: BookingObjectProps) {
  const group = useRef<THREE.Group>(null);
  const light = useRef<THREE.PointLight>(null);
  const pointer = usePointer();
  const color = useRef(new THREE.Color(ACCENTS[0]));

  const dots = useMemo(() => {
    const arr: [number, number][] = [];
    for (let x = -0.55; x <= 0.55; x += 0.28) {
      for (let y = -0.35; y <= 0.35; y += 0.28) {
        arr.push([x, y]);
      }
    }
    return arr;
  }, []);

  useFrame((state, delta) => {
    if (!group.current) return;
    const t = state.clock.getElapsedTime();
    group.current.position.y = Math.sin(t * 0.6) * 0.12;
    group.current.rotation.y = THREE.MathUtils.damp(
      group.current.rotation.y,
      0.3 + pointer.current.x * 0.4,
      3,
      delta
    );
    group.current.rotation.x = THREE.MathUtils.damp(
      group.current.rotation.x,
      -0.1 + pointer.current.y * 0.2,
      3,
      delta
    );

    const target = new THREE.Color(ACCENTS[Math.min(step - 1, ACCENTS.length - 1)]);
    color.current.lerp(target, delta * 2.5);
    if (light.current) {
      light.current.color = color.current;
      light.current.intensity = 2 + (step / totalSteps) * 3;
    }
  });

  return (
    <group ref={group}>
      <pointLight ref={light} position={[0.5, 0.5, 1.2]} intensity={2} distance={6} />
      {/* Calendar card */}
      <mesh>
        <boxGeometry args={[1.4, 1, 0.06]} />
        <meshStandardMaterial color="#0c0c12" metalness={0.7} roughness={0.25} />
      </mesh>
      {/* header strip */}
      <mesh position={[0, 0.42, 0.04]}>
        <boxGeometry args={[1.4, 0.16, 0.02]} />
        <meshStandardMaterial color={ACCENTS[0]} emissive={ACCENTS[0]} emissiveIntensity={0.6} />
      </mesh>
      {dots.map(([x, y], i) => (
        <mesh key={i} position={[x, y - 0.05, 0.05]}>
          <circleGeometry args={[0.05, 16]} />
          <meshStandardMaterial
            color="#eef0ff"
            emissive={i % 5 === Math.floor(step) ? "#3fd7ff" : "#000000"}
            emissiveIntensity={i % 5 === Math.floor(step) ? 0.8 : 0}
          />
        </mesh>
      ))}
      {/* orbiting clock ring */}
      <mesh position={[0.9, -0.55, 0.3]} rotation={[Math.PI / 2.4, 0, 0]}>
        <torusGeometry args={[0.32, 0.02, 16, 48]} />
        <meshStandardMaterial color="#3fd7ff" emissive="#3fd7ff" emissiveIntensity={0.5} />
      </mesh>
    </group>
  );
}

export default function BookingObject({ step, totalSteps }: BookingObjectProps) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 3.2], fov: 42 }}
      gl={{ alpha: true, antialias: true }}
      style={{ width: "100%", height: "100%" }}
    >
      <ambientLight intensity={0.45} />
      <directionalLight position={[2, 3, 2]} intensity={0.6} />
      <CalendarRig step={step} totalSteps={totalSteps} />
    </Canvas>
  );
}
