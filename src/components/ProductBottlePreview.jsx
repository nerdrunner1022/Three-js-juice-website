import { Canvas } from '@react-three/fiber';
import { Environment, useGLTF, useTexture } from '@react-three/drei';
import * as THREE from 'three';

const MODEL_SCALE = 10.5;
const MODEL_Y_OFFSET = -0.75;

function BottleModel({ size }) {
  const { nodes } = useGLTF('/models/juice_bottle.glb');
  const labelTexture = useTexture('/label.png', (texture) => {
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.flipY = false;
    texture.wrapS = THREE.ClampToEdgeWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    texture.repeat.y = 1 / (0.998046875 - 0.5803234577);
    texture.offset.y = -0.5803234577 * texture.repeat.y;
  });

  return (
    <group scale={size}>
      <group scale={MODEL_SCALE} position={[0, MODEL_Y_OFFSET, 0]}>
        <mesh geometry={nodes.glass.geometry} position={nodes.glass.position} rotation={nodes.glass.rotation} scale={nodes.glass.scale} renderOrder={4}>
          <meshPhysicalMaterial transparent opacity={0.28} roughness={0.08} color="#ffffff" depthWrite={false} side={THREE.DoubleSide} />
        </mesh>
        <mesh geometry={nodes.liquid.geometry} position={nodes.liquid.position} rotation={nodes.liquid.rotation} scale={nodes.liquid.scale} renderOrder={1}>
          <meshPhysicalMaterial color="#C1421C" roughness={0.2} side={THREE.DoubleSide} />
        </mesh>
        <mesh geometry={nodes.label.geometry} position={nodes.label.position} rotation={nodes.label.rotation} scale={nodes.label.scale} renderOrder={2}>
          <meshStandardMaterial map={labelTexture} roughness={0.7} />
        </mesh>
        <mesh geometry={nodes.cover.geometry} position={nodes.cover.position} rotation={nodes.cover.rotation} scale={nodes.cover.scale} renderOrder={3}>
          <meshStandardMaterial color="#445A3C" roughness={0.35} metalness={0.2} side={THREE.DoubleSide} />
        </mesh>
      </group>
    </group>
  );
}

export default function ProductBottlePreview({ size }) {
  return (
    <div className="product-bottle-preview" aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }} dpr={[1, 2]}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[3, 5, 4]} intensity={1.8} />
        <BottleModel size={size} />
        <Environment preset="studio" />
      </Canvas>
    </div>
  );
}

useGLTF.preload('/models/juice_bottle.glb');
