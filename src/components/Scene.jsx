import { Suspense, useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import JuiceBottle from './JuiceBottle';

const FRUIT_LAYOUT = [
  { asset: 'orange', position: [-0.95, 0.75, -0.45], rotation: [0.2, 0.5, -0.2], phase: 0.2 },
  { asset: 'slice', position: [0.9, 0.65, -0.25], rotation: [-0.4, 0.2, 0.5], phase: 1.1 },
  { asset: 'orange', position: [-1.05, -0.2, 0.1], rotation: [0.4, -0.3, 0.25], phase: 2.4 },
  { asset: 'slice', position: [1.05, -0.35, -0.35], rotation: [0.1, 0.6, -0.35], phase: 3.3 },
  { asset: 'orange', position: [0.7, -1.05, -0.8], rotation: [-0.3, 0.4, 0.1], phase: 4.5 },
  { asset: 'slice', position: [-0.65, -1.15, -0.7], rotation: [0.25, -0.5, 0.4], phase: 5.4 },
];

function FloatingFruit({ model, config }) {
  const groupRef = useRef();
  const fruit = useMemo(() => {
    const clone = model.clone(true);
    const bounds = new THREE.Box3().setFromObject(clone);
    const center = bounds.getCenter(new THREE.Vector3());
    const size = bounds.getSize(new THREE.Vector3());
    const largestDimension = Math.max(size.x, size.y, size.z) || 1;
    const modelScale = 0.58 / largestDimension;
    clone.scale.setScalar(modelScale);
    clone.position.set(-center.x * modelScale, -center.y * modelScale, -center.z * modelScale);
    clone.traverse((object) => {
      if (object.isMesh) {
        object.castShadow = true;
        object.receiveShadow = true;
      }
    });
    return clone;
  }, [model]);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;

    const time = clock.getElapsedTime() + config.phase;
    groupRef.current.rotation.y = config.rotation[1] + time * 0.12;
    groupRef.current.rotation.x = config.rotation[0] + Math.sin(time * 0.5) * 0.025;
    groupRef.current.rotation.z = config.rotation[2] + Math.cos(time * 0.6) * 0.025;
  });

  return (
    <group ref={groupRef} position={config.position} rotation={config.rotation}>
      <primitive object={fruit} />
    </group>
  );
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function smoothstep(t) {
  const c = Math.min(Math.max(t, 0), 1);
  return c * c * (3 - 2 * c);
}

function FloatingFruits({ progressRef }) {
  const { scene: orange } = useGLTF('/models/ORANGES.glb');
  const { scene: slice } = useGLTF('/models/Orange_slice.glb');
  const fruitGroupRef = useRef();
  const viewport = useThree((state) => state.viewport);

  useFrame(() => {
    if (!fruitGroupRef.current) return;

    const p = progressRef?.current ?? 0;
    const halfWidth = viewport.width / 2;
    const viewportScale = Math.min(Math.max(viewport.width / 7, 0.3), 1);

    const maxStage = 3;
    const stageIndex = Math.min(Math.floor(p), maxStage);
    const localT = p - stageIndex;

    const HOLD = 0.7;
    const raw = Math.max(localT - HOLD, 0) / (1 - HOLD);
    const t = smoothstep(raw);

    if (stageIndex === 0) {
      // Bottle moves from 0.5 * halfWidth (scale 1) in stage 0 to -0.5 * halfWidth (scale 2.1) in stage 1
      const bottleX = lerp(0.5 * halfWidth, -0.5 * halfWidth, t);
      const bottleScale = lerp(1, 2.1, t);

      fruitGroupRef.current.position.x = bottleX;
      fruitGroupRef.current.scale.setScalar(bottleScale * viewportScale);

      // Fade out near the end of stage 0 -> stage 1 transition so fruits don't linger into stage 2+
      const opacity = t > 0.4 ? 1 - (t - 0.4) / 0.6 : 1;
      fruitGroupRef.current.visible = opacity > 0.01;
    } else {
      fruitGroupRef.current.visible = false;
    }
  });

  return (
    <group ref={fruitGroupRef}>
      {FRUIT_LAYOUT.map((config, index) => (
        <FloatingFruit
          key={`${config.asset}-${index}`}
          model={config.asset === 'orange' ? orange : slice}
          config={config}
        />
      ))}
    </group>
  );
}

export default function Scene({ progressRef, stage }) {
  const labelText = stage === 1
    ? 'COLD-PRESSED\nNOTHING ADDED\nHARVESTED TO ORDER'
    : stage === 2
      ? 'ORANGES\nHONEY\nSALT\nWATER'
      : '';

  return (
    <Canvas shadows camera={{ position: [0, 0, 5], fov: 45 }} dpr={[1, 2]}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 5, 2]} intensity={1.5} castShadow shadow-mapSize-width={1024} shadow-mapSize-height={1024} />
      <Suspense fallback={null}>
        <JuiceBottle position={[0, 0, 0]} progressRef={progressRef} stage={stage} labelText={labelText} />
        {stage <= 1 && <FloatingFruits progressRef={progressRef} />}
        <Environment preset="studio" />
      </Suspense>
      {/* OrbitControls removed — position is now scroll-driven, manual drag would fight it */}
    </Canvas>
  );
}

useGLTF.preload('/models/ORANGES.glb');
useGLTF.preload('/models/Orange_slice.glb');