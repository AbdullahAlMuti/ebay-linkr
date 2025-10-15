import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import * as THREE from 'three';

interface AnimatedArrow3DProps {
  position: [number, number, number];
  color: string;
  delay: number;
  scale?: number;
}

export const AnimatedArrow3D = ({ position, color, delay, scale = 1 }: AnimatedArrow3DProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const arrowRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (groupRef.current) {
      // Continuous upward movement
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2 + delay) * 0.3;
      
      // Subtle rotation
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 1.5 + delay) * 0.1;
    }

    if (glowRef.current) {
      // Pulsing glow
      const glowIntensity = 0.4 + Math.sin(state.clock.elapsedTime * 4 + delay) * 0.3;
      glowRef.current.material.opacity = glowIntensity;
    }
  });

  useGSAP(() => {
    if (arrowRef.current) {
      // Animate arrow appearance
      gsap.fromTo(arrowRef.current.scale,
        { x: 0, y: 0, z: 0 },
        { 
          x: scale, 
          y: scale, 
          z: scale, 
          duration: 1.5, 
          delay: delay * 0.2,
          ease: "back.out(1.7)"
        }
      );

      // Continuous upward motion
      gsap.to(arrowRef.current.position, {
        y: 2,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
        delay: delay * 0.1
      });
    }
  }, []);

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
      <group ref={groupRef} position={position} scale={scale}>
        {/* Glow effect */}
        <mesh ref={glowRef}>
          <coneGeometry args={[1.2, 3, 8]} />
          <meshBasicMaterial 
            color={color} 
            transparent 
            opacity={0.3}
          />
        </mesh>
        
        {/* Main arrow */}
        <mesh ref={arrowRef}>
          <coneGeometry args={[1, 2.5, 8]} />
          <meshStandardMaterial 
            color={color}
            metalness={0.8}
            roughness={0.2}
            emissive={color}
            emissiveIntensity={0.3}
          />
        </mesh>

        {/* Arrow tip highlight */}
        <mesh position={[0, 1.2, 0]}>
          <coneGeometry args={[0.3, 0.8, 6]} />
          <meshStandardMaterial 
            color={color}
            metalness={0.9}
            roughness={0.1}
            emissive={color}
            emissiveIntensity={0.5}
          />
        </mesh>

        {/* Trail effect */}
        <mesh position={[0, -1, 0]}>
          <cylinderGeometry args={[0.1, 0.3, 2, 6]} />
          <meshStandardMaterial 
            color={color}
            metalness={0.7}
            roughness={0.3}
            emissive={color}
            emissiveIntensity={0.2}
            transparent
            opacity={0.6}
          />
        </mesh>
      </group>
    </Float>
  );
};
