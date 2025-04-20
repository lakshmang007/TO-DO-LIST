import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, Text } from '@react-three/drei';

// This component will render a 3D notebook model
export function NotebookModel(props) {
  const group = useRef();

  // Simple animation - gentle floating and rotation
  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.2;
      group.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.1;
    }
  });

  // Since we don't have an actual GLTF model, we'll create a simple notebook shape
  return (
    <group ref={group} {...props} dispose={null}>
      {/* Notebook base */}
      <mesh castShadow receiveShadow position={[0, 0, 0]}>
        <boxGeometry args={[3, 0.2, 4]} />
        <meshStandardMaterial color="#111111" />
      </mesh>

      {/* Notebook pages */}
      <mesh castShadow receiveShadow position={[0, 0.15, 0]}>
        <boxGeometry args={[2.9, 0.1, 3.9]} />
        <meshStandardMaterial color="#f5f5f5" />
      </mesh>

      {/* Notebook cover */}
      <mesh castShadow receiveShadow position={[0, 0.25, 0]}>
        <boxGeometry args={[3, 0.1, 4]} />
        <meshStandardMaterial color="#1a0000" roughness={0.8} metalness={0.2} />
      </mesh>

      {/* Death Note text */}
      <Text
        position={[0, 0.31, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        fontSize={0.4}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.01}
        outlineColor="#770000"
      >
        STUDY NOTE
        <meshStandardMaterial
          color="#ffffff"
          emissive="#ff0000"
          emissiveIntensity={0.5}
          metalness={0.3}
          roughness={0.7}
        />
      </Text>
    </group>
  );
}

export default NotebookModel;
