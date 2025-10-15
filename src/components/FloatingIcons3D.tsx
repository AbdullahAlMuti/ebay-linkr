import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface FloatingIconProps {
  position: [number, number, number];
  color: string;
  speed?: number;
  floatIntensity?: number;
  scale?: number;
}

const FloatingIcon = ({ position, color, speed = 1, floatIntensity = 1, scale = 1 }: FloatingIconProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      // Smooth rotation
      meshRef.current.rotation.y += 0.005 * speed;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3 * speed) * 0.2;
      
      // Depth movement (closer and farther)
      meshRef.current.position.z = position[2] + Math.sin(state.clock.elapsedTime * 0.5 * speed) * 2;
    }

    if (glowRef.current) {
      // Pulsing glow effect
      const glowScale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
      glowRef.current.scale.set(glowScale, glowScale, glowScale);
    }
  });

  return (
    <Float
      speed={speed}
      rotationIntensity={0.3}
      floatIntensity={floatIntensity}
    >
      <group position={position} scale={scale}>
        {/* Glow effect */}
        <mesh ref={glowRef}>
          <sphereGeometry args={[0.7, 32, 32]} />
          <meshBasicMaterial color={color} transparent opacity={0.2} />
        </mesh>
        
        {/* Main icon */}
        <mesh ref={meshRef}>
          <boxGeometry args={[1, 1, 1]} />
          <MeshDistortMaterial
            color={color}
            speed={2}
            distort={0.3}
            radius={1}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
      </group>
    </Float>
  );
};

const FloatingLogo = ({ position, color, speed = 1, scale = 1 }: { position: [number, number, number]; color: string; speed?: number; scale?: number }) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.003 * speed;
      groupRef.current.position.z = position[2] + Math.cos(state.clock.elapsedTime * 0.4 * speed) * 1.5;
    }
  });

  return (
    <Float speed={speed * 0.8} rotationIntensity={0.2} floatIntensity={0.5}>
      <group position={position} ref={groupRef} scale={scale}>
        <mesh>
          <cylinderGeometry args={[1.2, 1.2, 0.3, 32]} />
          <MeshDistortMaterial
            color={color}
            speed={1.5}
            distort={0.2}
            radius={1}
            metalness={0.7}
            roughness={0.3}
          />
        </mesh>
      </group>
    </Float>
  );
};

const Scene = () => {
  const icons: FloatingIconProps[] = [
    { position: [-6, 3, -5], color: '#FFD700', speed: 1.2, floatIntensity: 1.5, scale: 0.8 },
    { position: [6, -2, -3], color: '#00D9FF', speed: 0.8, floatIntensity: 1.2, scale: 0.9 },
    { position: [-4, -3, -4], color: '#FFD700', speed: 1, floatIntensity: 1, scale: 0.7 },
    { position: [4, 3, -6], color: '#FF6EC7', speed: 1.1, floatIntensity: 1.3, scale: 0.85 },
    { position: [0, -4, -5], color: '#00D9FF', speed: 0.9, floatIntensity: 1.1, scale: 0.75 },
    { position: [-7, 0, -4], color: '#FFD700', speed: 1.3, floatIntensity: 1.4, scale: 0.8 },
    { position: [7, 1, -5], color: '#FF6EC7', speed: 1.1, floatIntensity: 1.2, scale: 0.9 },
    { position: [2, 4, -6], color: '#00D9FF', speed: 0.85, floatIntensity: 1.35, scale: 0.7 },
  ];

  const logos: { position: [number, number, number]; color: string; speed: number; scale: number }[] = [
    { position: [-3, 1, -8], color: '#FF9900', speed: 1, scale: 1.2 },
    { position: [3, -1, -7], color: '#E53238', speed: 0.9, scale: 1.3 },
    { position: [0, 2, -9], color: '#FFD700', speed: 1.1, scale: 1.1 },
  ];

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} color="hsl(var(--primary))" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="hsl(var(--secondary))" />
      <spotLight position={[0, 10, 0]} angle={0.3} penumbra={1} intensity={1} color="hsl(var(--accent))" />

      {icons.map((props, index) => (
        <FloatingIcon key={`icon-${index}`} {...props} />
      ))}

      {logos.map((props, index) => (
        <FloatingLogo key={`logo-${index}`} {...props} />
      ))}
    </>
  );
};

export const FloatingIcons3D = () => {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 50 }}
        style={{ background: 'transparent' }}
      >
        <Scene />
      </Canvas>
    </div>
  );
};
