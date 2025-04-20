import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

// This component will render a 3D feather pen
function FeatherPenModel(props) {
  const group = useRef();
  
  // Animation - floating and slight rotation
  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.1;
      group.current.rotation.z = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.05;
      group.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.4) * 0.1 + 0.1;
    }
  });

  return (
    <group ref={group} {...props} dispose={null}>
      {/* Pen shaft */}
      <mesh castShadow receiveShadow position={[0, 0, 0]} rotation={[0, 0, Math.PI / 6]}>
        <cylinderGeometry args={[0.05, 0.02, 2, 8]} />
        <meshStandardMaterial color="#222222" />
      </mesh>
      
      {/* Pen tip */}
      <mesh castShadow receiveShadow position={[0.17, -0.5, 0]} rotation={[0, 0, Math.PI / 6]}>
        <coneGeometry args={[0.02, 0.2, 8]} />
        <meshStandardMaterial color="#111111" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Feather parts */}
      {Array(12).fill().map((_, i) => (
        <mesh 
          key={i} 
          castShadow 
          receiveShadow 
          position={[
            -0.3 + i * 0.05, 
            0.3 + i * 0.05, 
            0.05 * Math.sin(i)
          ]} 
          rotation={[0, 0, Math.PI / 4 + i * 0.05]}
        >
          <planeGeometry args={[0.5, 0.1]} />
          <meshStandardMaterial 
            color={i % 2 === 0 ? "#330000" : "#220000"} 
            side={2} 
            transparent 
            opacity={0.9} 
          />
        </mesh>
      ))}
    </group>
  );
}

export default FeatherPenModel;
