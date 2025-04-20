import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import FeatherPenModel from './FeatherPenModel';

function ModelContainer() {
  return (
    <div className="three-model-container">
      <Canvas shadows>
        <ambientLight intensity={0.5} />
        <spotLight position={[5, 5, 5]} angle={0.15} penumbra={1} intensity={1} castShadow />
        
        <FeatherPenModel position={[0, 0, 0]} scale={[1, 1, 1]} />
        <Environment preset="night" />
        
        <OrbitControls 
          enablePan={false} 
          enableZoom={false}
          autoRotate
          autoRotateSpeed={2}
        />
      </Canvas>
    </div>
  );
}

export default ModelContainer;
