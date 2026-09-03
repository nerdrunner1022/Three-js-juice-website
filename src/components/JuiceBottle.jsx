import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

// Where the bottle sits at the START of each stage
// Fractions of HALF the current viewport width, not fixed world units
const STAGE_TRANSFORMS = [
  { xFrac: 0.5, scale: 1 },    // 0 Hero — right side
  { xFrac: -0.5, scale: 1 },   // 1 Features — left side
  { xFrac: 0.5, scale: 1 },    // 2 Ingredients — right side
  { xFrac: 0, scale: 0.001 },  // 3 Testimonials — hidden
];

// Roughly the visible world-space width on a typical desktop window,
// at this camera's distance/FOV — the size the bottle was "designed" at
const REFERENCE_WIDTH = 7;
const MIN_VIEWPORT_SCALE = 0.5; // never shrink smaller than half, however narrow the screen

function lerp(a, b, t) {
  return a + (b - a) * t;
}

// Eases the transition: slow-fast-slow, instead of a robotic constant speed
function smoothstep(t) {
  const c = Math.min(Math.max(t, 0), 1);
  return c * c * (3 - 2 * c);
}

export default function JuiceBottle({ progressRef, ...props }) {
  const groupRef = useRef();

  useFrame((state, delta) => {
  if (!groupRef.current) return;

  const halfWidth = state.viewport.width / 2;
  const viewportScale = Math.min(
    Math.max(state.viewport.width / REFERENCE_WIDTH, MIN_VIEWPORT_SCALE),
    1
  );

  const p = progressRef?.current ?? 0;
  const maxStage = STAGE_TRANSFORMS.length - 1;
  const stageIndex = Math.min(Math.floor(p), maxStage);
  const nextIndex = Math.min(stageIndex + 1, maxStage);
  const localT = p - stageIndex;

  const HOLD = 0.7;
  const raw = Math.max(localT - HOLD, 0) / (1 - HOLD);
  const t = smoothstep(raw);

  const from = STAGE_TRANSFORMS[stageIndex];
  const to = STAGE_TRANSFORMS[nextIndex];

  const fromX = from.xFrac * halfWidth;
  const toX = to.xFrac * halfWidth;

  groupRef.current.position.x = lerp(fromX, toX, t);
  groupRef.current.scale.setScalar(lerp(from.scale, to.scale, t) * viewportScale); // ← multiplied in here

  groupRef.current.rotation.y += delta * 0.3;
});

  return (
    <group ref={groupRef} {...props}>
      <mesh position={[0, 0, 0]} castShadow>
        <cylinderGeometry args={[0.6, 0.7, 1.8, 32]} />
        <meshStandardMaterial color="#C1421C" roughness={0.25} metalness={0.05} />
      </mesh>
      <mesh position={[0, 1.1, 0]} castShadow>
        <cylinderGeometry args={[0.25, 0.35, 0.4, 32]} />
        <meshStandardMaterial color="#C1421C" roughness={0.25} metalness={0.05} />
      </mesh>
      <mesh position={[0, 1.4, 0]} castShadow>
        <cylinderGeometry args={[0.28, 0.28, 0.25, 32]} />
        <meshStandardMaterial color="#445A3C" roughness={0.4} />
      </mesh>
      <mesh position={[0, -0.1, 0]}>
        <cylinderGeometry args={[0.72, 0.72, 0.6, 32]} />
        <meshStandardMaterial color="#F5EFE1" roughness={0.6} />
      </mesh>
    </group>
  );
}