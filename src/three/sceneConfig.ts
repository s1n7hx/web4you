import * as THREE from "three";

export type SectionKey =
  | "hero"
  | "work"
  | "services"
  | "process"
  | "about"
  | "capabilities"
  | "booking"
  | "cta";

export interface SceneTarget {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
  colorA: string;
  colorB: string;
  camZ: number;
  camY: number;
}

// Keyframes describing how the central 3D "brand object" and camera should
// look while a given section is the one in focus. useFrame damps toward
// these values every tick so the transitions feel continuous.
export const sceneTargets: Record<SectionKey, SceneTarget> = {
  hero: {
    position: [1.6, 0.1, 0],
    rotation: [0.3, 0.5, 0],
    scale: 1.15,
    colorA: "#7c6cf6",
    colorB: "#3fd7ff",
    camZ: 7.5,
    camY: 0,
  },
  work: {
    position: [1.9, -0.3, -1.5],
    rotation: [0.1, 1.4, 0.1],
    scale: 0.85,
    colorA: "#3fd7ff",
    colorB: "#7c6cf6",
    camZ: 8.5,
    camY: 0.2,
  },
  services: {
    position: [-1.7, 0.2, -1],
    rotation: [0.2, 2.4, 0],
    scale: 0.95,
    colorA: "#ff7a5c",
    colorB: "#7c6cf6",
    camZ: 8,
    camY: -0.1,
  },
  process: {
    position: [1.8, 0.6, -2],
    rotation: [0.4, 3.4, 0.2],
    scale: 0.75,
    colorA: "#3fd7ff",
    colorB: "#ff7a5c",
    camZ: 9,
    camY: 0.1,
  },
  about: {
    position: [-1.4, -0.4, 0.5],
    rotation: [0.1, 4.2, 0],
    scale: 1.3,
    colorA: "#7c6cf6",
    colorB: "#3fd7ff",
    camZ: 6.5,
    camY: 0,
  },
  capabilities: {
    position: [1.6, 0.3, -1],
    rotation: [0.3, 5.1, 0],
    scale: 0.9,
    colorA: "#3fd7ff",
    colorB: "#7c6cf6",
    camZ: 8,
    camY: 0.1,
  },
  booking: {
    position: [-1.8, 0.1, -1.5],
    rotation: [0.2, 5.8, 0],
    scale: 0.8,
    colorA: "#ff7a5c",
    colorB: "#3fd7ff",
    camZ: 8.5,
    camY: 0,
  },
  cta: {
    position: [0, 0, -1],
    rotation: [0.15, 6.6, 0],
    scale: 1.4,
    colorA: "#7c6cf6",
    colorB: "#3fd7ff",
    camZ: 7,
    camY: 0,
  },
};

export const sectionOrder: SectionKey[] = [
  "hero",
  "work",
  "services",
  "process",
  "about",
  "capabilities",
  "booking",
  "cta",
];

export function lerpColor(a: string, b: string, t: number) {
  return new THREE.Color(a).lerp(new THREE.Color(b), t);
}
