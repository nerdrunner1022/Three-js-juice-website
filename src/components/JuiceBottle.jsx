import { useMemo, useRef } from 'react';
import * as THREE from 'three'; // add this import at the top of JuiceBottle.jsx
import { useFrame } from '@react-three/fiber';
import { useGLTF, useTexture } from '@react-three/drei';

const STAGE_TRANSFORMS = [
  { xFrac: 0.5, scale: 1 },
  { xFrac: -0.5, scale: 2.1 },
  { xFrac: 0.5, scale: 2.8 },
  { xFrac: 0, scale: 0.001 },
];

const REFERENCE_WIDTH = 7;
const MIN_VIEWPORT_SCALE = 0.3;

// The sourced .glb is ~0.21 units tall; our scene/camera/lighting were tuned
// around the old ~1.8 unit placeholder — scale up to match that world.
const MODEL_SCALE = 10.5;

// The sourced mesh sits with its BASE at y=0, growing upward. Every other
// part of our scene assumes the bottle's pivot is at its vertical CENTER
// (that's how the old placeholder was built). This shifts it down by half
// its own height, in the model's original (pre-scale) units.
const MODEL_Y_OFFSET = -0.75;
const SPLASH_SCALE = 2.3;
const SPLASH_TOP = 0.1103;
const SPLASH_GAP = 0.04;

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function smoothstep(t) {
  const c = Math.min(Math.max(t, 0), 1);
  return c * c * (3 - 2 * c);
}

export default function JuiceBottle({ progressRef, stage = 0, ...props }) {
  const groupRef = useRef();
  const bottleRotationRef = useRef();
  const liquidRef = useRef();
  const { nodes } = useGLTF('/models/juice_bottle.glb');
  const { scene: splashScene } = useGLTF('/models/water_splash.glb');
  const splash = useMemo(() => {
    const clone = splashScene.clone(true);

    clone.traverse((object) => {
      if (!object.isMesh) return;

      object.material = new THREE.MeshStandardMaterial({
        color: '#C1421C',
        roughness: 0.2,
        metalness: 0,
        side: THREE.DoubleSide,
      });
      object.renderOrder = 0;
    });

    return clone;
  }, [splashScene]);
  const labelTexture = useTexture('/label.png', (texture) => {
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.flipY = false;
    texture.wrapS = THREE.ClampToEdgeWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    texture.repeat.set(1, 1);
    texture.offset.set(0, 0);
    texture.repeat.y = 1 / (0.998046875 - 0.5803234577);
    texture.offset.y = -0.5803234577 * texture.repeat.y;
  });

  useFrame((state) => {
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
    const tilt = stageIndex === 0 ? lerp(-0.38, 0, t) : 0;

    groupRef.current.position.x = lerp(from.xFrac * halfWidth, to.xFrac * halfWidth, t);
    groupRef.current.scale.setScalar(lerp(from.scale, to.scale, t) * viewportScale);
    bottleRotationRef.current.rotation.z = tilt;

    // Keep the liquid surface level as the bottle tilts.
    if (liquidRef.current) {
      liquidRef.current.rotation.z = nodes.liquid.rotation.z - tilt;
    }
  });

  return (
    <group ref={groupRef} {...props}>
      {stage === 0 && (
        <primitive
          object={splash}
          position={[
            0,
            MODEL_Y_OFFSET - SPLASH_TOP * MODEL_SCALE * SPLASH_SCALE - SPLASH_GAP,
            -0.3,
          ]}
          scale={MODEL_SCALE * SPLASH_SCALE}
        />
      )}

      <group ref={bottleRotationRef}>
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
          ref={liquidRef}
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
          <meshStandardMaterial map={labelTexture} roughness={0.7} />
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
    </group>
  );
}

useGLTF.preload('/models/juice_bottle.glb');
useGLTF.preload('/models/water_splash.glb');