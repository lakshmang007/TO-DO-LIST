import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

function Sphere() {
  return (
    <mesh>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial color="#c00000" />
    </mesh>
  );
}

function ModelContainer() {
  return (
    <div className="three-model-container">
      <Canvas>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <Sphere />
        <OrbitControls autoRotate />
      </Canvas>
    </div>
  );
}

export default ModelContainer;
