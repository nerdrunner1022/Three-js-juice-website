import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

// Where the bottle sits at the START of each stage
const STAGE_TRANSFORMS = [
  { position: [1.8, 0, 0], scale: 1 },    // 0 Hero — right side
  { position: [-1.8, 0, 0], scale: 1 },   // 1 Features — left side
  { position: [1.8, 0, 0], scale: 1 },    // 2 Ingredients — right side
  { position: [0, 0, -3], scale: 0.001 }, // 3 Testimonials — pushed away
];

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

  const p = progressRef?.current ?? 0;
  const maxStage = STAGE_TRANSFORMS.length - 1;
  const stageIndex = Math.min(Math.floor(p), maxStage);
  const nextIndex = Math.min(stageIndex + 1, maxStage);
  const localT = p - stageIndex;

  // Stay put for the first 70% of this section's scroll (reading time),
  // then transition to the NEXT section's position only in the final 30%
  const HOLD = 0.7;
  const raw = Math.max(localT - HOLD, 0) / (1 - HOLD);
  const t = smoothstep(raw);

  const from = STAGE_TRANSFORMS[stageIndex];
  const to = STAGE_TRANSFORMS[nextIndex];

  groupRef.current.position.x = lerp(from.position[0], to.position[0], t);
  groupRef.current.position.z = lerp(from.position[2], to.position[2], t);
  groupRef.current.scale.setScalar(lerp(from.scale, to.scale, t));

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