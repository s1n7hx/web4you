import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface ServicesObjectProps {
  active: number; // 0..5
}

const PALETTE = ["#7c6cf6", "#3fd7ff", "#ff7a5c", "#7c6cf6", "#3fd7ff", "#ff7a5c"];

function Shape({ index, active }: { index: number; active: number }) {
  const ref = useRef<THREE.Group>(null);
  const isActive = index === active;

  useFrame((state, delta) => {
    if (!ref.current) return;
    const targetScale = isActive ? 1 : 0.001;
    const s = THREE.MathUtils.damp(ref.current.scale.x, targetScale, 4, delta);
    ref.current.scale.setScalar(s);
    ref.current.rotation.y += delta * 0.35;
    ref.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.15;
  });

  const color = PALETTE[index];

  const content = useMemo(() => {
    switch (index) {
      case 0:
        // Website Design — layered geometric structure
        return (
          <>
            <mesh>
              <dodecahedronGeometry args={[1, 0]} />
              <meshBasicMaterial color={color} wireframe />
            </mesh>
            <mesh scale={0.55}>
              <icosahedronGeometry args={[1, 0]} />
              <meshStandardMaterial color="#0d0d14" metalness={0.8} roughness={0.2} emissive={color} emissiveIntensity={0.3} />
            </mesh>
          </>
        );
      case 1: {
        // Website Development — connected digital nodes
        const nodes = new Array(8).fill(0).map((_, i) => {
          const a = (i / 8) * Math.PI * 2;
          return new THREE.Vector3(Math.cos(a) * 1.1, Math.sin(a * 2) * 0.4, Math.sin(a) * 1.1);
        });
        return (
          <>
            {nodes.map((p, i) => (
              <mesh key={i} position={p}>
                <sphereGeometry args={[0.08, 12, 12]} />
                <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.6} />
              </mesh>
            ))}
            <lineSegments>
              <bufferGeometry
                onUpdate={(g) => {
                  const pos: number[] = [];
                  nodes.forEach((p, i) => {
                    const next = nodes[(i + 1) % nodes.length];
                    pos.push(p.x, p.y, p.z, next.x, next.y, next.z);
                  });
                  g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
                }}
              />
              <lineBasicMaterial color={color} transparent opacity={0.5} />
            </lineSegments>
          </>
        );
      }
      case 2:
        // E-Commerce — abstract product / cart environment
        return (
          <>
            <mesh position={[0, -0.1, 0]}>
              <boxGeometry args={[1.1, 1.1, 1.1]} />
              <meshStandardMaterial color="#0d0d14" metalness={0.7} roughness={0.25} emissive={color} emissiveIntensity={0.25} />
            </mesh>
            <mesh rotation={[Math.PI / 4, Math.PI / 4, 0]} scale={1.4}>
              <torusGeometry args={[1, 0.02, 8, 64]} />
              <meshBasicMaterial color={color} />
            </mesh>
          </>
        );
      case 3:
        // Booking Systems — rotating calendar / time interface
        return (
          <>
            <mesh>
              <torusGeometry args={[1, 0.05, 16, 48]} />
              <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.4} metalness={0.6} roughness={0.3} />
            </mesh>
            <mesh rotation={[0, 0, Math.PI / 3]}>
              <boxGeometry args={[0.05, 0.7, 0.05]} />
              <meshBasicMaterial color="#ffffff" />
            </mesh>
            <mesh rotation={[0, 0, -Math.PI / 6]}>
              <boxGeometry args={[0.05, 0.45, 0.05]} />
              <meshBasicMaterial color="#ffffff" />
            </mesh>
          </>
        );
      case 4:
        // Custom Web Applications — layered interface panels
        return (
          <>
            {[0, 1, 2].map((i) => (
              <mesh key={i} position={[0, 0, (i - 1) * 0.35]}>
                <planeGeometry args={[1.3 - i * 0.15, 0.9 - i * 0.1]} />
                <meshStandardMaterial
                  color="#0d0d14"
                  metalness={0.7}
                  roughness={0.3}
                  emissive={color}
                  emissiveIntensity={0.2}
                  transparent
                  opacity={0.85}
                  side={THREE.DoubleSide}
                />
              </mesh>
            ))}
          </>
        );
      default:
        // Maintenance & Growth — torus knot representing continuous iteration
        return (
          <mesh>
            <torusKnotGeometry args={[0.75, 0.22, 128, 16]} />
            <meshStandardMaterial color="#0d0d14" metalness={0.75} roughness={0.2} emissive={color} emissiveIntensity={0.35} />
          </mesh>
        );
    }
  }, [index, color]);

  return <group ref={ref}>{content}</group>;
}

export default function ServicesObject({ active }: ServicesObjectProps) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 3.4], fov: 45 }}
      gl={{ alpha: true, antialias: true }}
      style={{ width: "100%", height: "100%" }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[2, 2, 3]} intensity={1.2} color="#ffffff" />
      <pointLight position={[-2, -1, -2]} intensity={0.8} color={PALETTE[active]} />
      {PALETTE.map((_, i) => (
        <Shape key={i} index={i} active={active} />
      ))}
    </Canvas>
  );
}
