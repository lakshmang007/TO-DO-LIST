import React, { useRef } from 'react';
import { useFrame, extend } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

// This component creates a 3D text effect for the Death Note
function DeathNoteText({ text = "STUDY NOTE", ...props }) {
  const textRef = useRef();
  const materialRef = useRef();
  
  // Animation for the text
  useFrame((state) => {
    if (textRef.current) {
      textRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.05;
      
      if (materialRef.current) {
        materialRef.current.emissiveIntensity = 0.5 + Math.sin(state.clock.getElapsedTime() * 2) * 0.2;
      }
    }
  });

  return (
    <group {...props}>
      <Text
        ref={textRef}
        fontSize={0.5}
        font="/fonts/OldEnglish.ttf" // This would need to be added to your public folder
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.01}
        outlineColor="#770000"
      >
        {text}
        <meshStandardMaterial 
          ref={materialRef}
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

export default DeathNoteText;
