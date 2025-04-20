import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, ContactShadows } from '@react-three/drei';
import NotebookModel from './NotebookModel';
import FeatherPenModel from './FeatherPenModel';

function ThreeScene() {
  return (
    <div className="three-scene">
      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 1, 6]} fov={40} />
        <ambientLight intensity={0.5} />
        <spotLight position={[5, 5, 5]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <spotLight position={[-5, 5, 5]} angle={0.15} penumbra={1} intensity={0.5} castShadow />

        <Suspense fallback={null}>
          <NotebookModel position={[0, 0, 0]} scale={[0.7, 0.7, 0.7]} />
          <FeatherPenModel position={[1.5, 0.5, 0.5]} scale={[0.7, 0.7, 0.7]} />
          <Environment preset="night" />
          <ContactShadows
            position={[0, -1, 0]}
            opacity={0.4}
            scale={10}
            blur={1.5}
            far={1}
          />
        </Suspense>

        <OrbitControls
          enablePan={false}
          enableZoom={false}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 2.5}
        />
      </Canvas>
    </div>
  );
}

export default ThreeScene;
