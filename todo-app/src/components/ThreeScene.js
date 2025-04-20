import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

function Box(props) {
  return (
    <mesh {...props} rotation={[0, props.time * 0.1, 0]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={props.hover ? "hotpink" : "#c00000"} />
    </mesh>
  );
}

function ThreeScene() {
  return (
    <div className="three-scene">
      <Canvas>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <Box position={[-1.2, 0, 0]} time={1} />
        <Box position={[1.2, 0, 0]} time={2} />
        <OrbitControls />
      </Canvas>
    </div>
  );
}

export default ThreeScene;
