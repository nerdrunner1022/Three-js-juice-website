import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, Html, useProgress } from '@react-three/drei';
import JuiceBottle from './JuiceBottle';

// Loading fallback shown while any suspended assets (textures, models) load.
// Right now nothing is async yet, but this scaffolding is ready for when
// we swap the placeholder bottle for a real .glb model.
function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div style={{ color: '#fff', fontSize: '14px', fontFamily: 'sans-serif' }}>
        {progress.toFixed(0)}% loaded
      </div>
    </Html>
  );
}

export default function Scene({ progressRef, stage }) {
  const labelText = stage === 1
    ? 'COLD-PRESSED\nNOTHING ADDED\nHARVESTED TO ORDER'
    : stage === 2
      ? 'ORANGES\nHONEY\nSALT\nWATER'
      : '';

  return (
    <Canvas shadows camera={{ position: [0, 0.5, 5], fov: 45 }} dpr={[1, 2]}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 5, 2]} intensity={1.5} castShadow shadow-mapSize-width={1024} shadow-mapSize-height={1024} />
      <Suspense fallback={<Loader />}>
        <JuiceBottle position={[0, 0, 0]} progressRef={progressRef} labelText={labelText} />
        <Environment preset="studio" />
      </Suspense>
      {/* OrbitControls removed — position is now scroll-driven, manual drag would fight it */}
    </Canvas>
  );
}