import { useRef } from 'react';
import * as THREE from 'three'; // add this import at the top of JuiceBottle.jsx
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';

const STAGE_TRANSFORMS = [
  { xFrac: 0.5, scale: 1 },
  { xFrac: -0.5, scale: 1.25 },
  { xFrac: 0.5, scale: 1.45 },
  { xFrac: 0, scale: 0.001 },
];

const REFERENCE_WIDTH = 7;
const MIN_VIEWPORT_SCALE = 0.5;

// The sourced .glb is ~0.21 units tall; our scene/camera/lighting were tuned
// around the old ~1.8 unit placeholder — scale up to match that world.
const MODEL_SCALE = 10.5;

// The sourced mesh sits with its BASE at y=0, growing upward. Every other
// part of our scene assumes the bottle's pivot is at its vertical CENTER
// (that's how the old placeholder was built). This shifts it down by half
// its own height, in the model's original (pre-scale) units.
const MODEL_Y_OFFSET = -0.75;

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function smoothstep(t) {
  const c = Math.min(Math.max(t, 0), 1);
  return c * c * (3 - 2 * c);
}

export default function JuiceBottle({ progressRef, ...props }) {
  const groupRef = useRef();
  const { nodes } = useGLTF('/models/juice_bottle.glb');

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

    groupRef.current.position.x = lerp(from.xFrac * halfWidth, to.xFrac * halfWidth, t);
    groupRef.current.scale.setScalar(lerp(from.scale, to.scale, t) * viewportScale);
    groupRef.current.rotation.z = -0.38;
    groupRef.current.rotation.y += delta * 0.8;
  });

  return (
    <group ref={groupRef} {...props}>
      <group scale={MODEL_SCALE} position={[0, MODEL_Y_OFFSET, 0]}>

        <mesh
          geometry={nodes.glass.geometry}
          position={nodes.glass.position}
          rotation={nodes.glass.rotation}
          scale={nodes.glass.scale}
          castShadow
          renderOrder={4}
        >
          <meshPhysicalMaterial
            transparent
            opacity={0.28}
            roughness={0.08}
            color="#ffffff"
            depthWrite={false}
            side={THREE.DoubleSide}
          />
        </mesh>

        <mesh
          geometry={nodes.liquid.geometry}
          position={nodes.liquid.position}
          rotation={nodes.liquid.rotation}
          scale={nodes.liquid.scale}
          renderOrder={1}
        >
          <meshPhysicalMaterial
            color="#C1421C"
            roughness={0.2}
            side={THREE.DoubleSide}
          />
        </mesh>

        <mesh
          geometry={nodes.label.geometry}
          position={nodes.label.position}
          rotation={nodes.label.rotation}
          scale={nodes.label.scale}
          renderOrder={2}
        >
          <meshStandardMaterial color="#F5EFE1" roughness={0.7} />
        </mesh>

        <mesh
          geometry={nodes.cover.geometry}
          position={nodes.cover.position}
          rotation={nodes.cover.rotation}
          scale={nodes.cover.scale}
          castShadow
          renderOrder={3}
        >
          <meshStandardMaterial
            color="#445A3C"
            roughness={0.35}
            metalness={0.2}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>
    </group>
  );
}

useGLTF.preload('/models/juice_bottle.glb');