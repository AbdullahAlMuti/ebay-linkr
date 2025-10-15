import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Text3D, OrbitControls } from '@react-three/drei';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import * as THREE from 'three';

interface ChartBarProps {
  height: number;
  position: [number, number, number];
  color: string;
  delay: number;
  label: string;
  value: string;
}

const ChartBar = ({ height, position, color, delay, label, value }: ChartBarProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      // Smooth floating animation
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2 + delay) * 0.1;
      
      // Subtle rotation
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5 + delay) * 0.1;
    }

    if (glowRef.current) {
      // Pulsing glow effect
      const glowIntensity = 0.3 + Math.sin(state.clock.elapsedTime * 3 + delay) * 0.2;
      glowRef.current.material.opacity = glowIntensity;
    }
  });

  useGSAP(() => {
    if (meshRef.current) {
      // Animate bar growth
      gsap.fromTo(meshRef.current.scale,
        { y: 0 },
        { 
          y: 1, 
          duration: 2, 
          delay: delay * 0.2,
          ease: "power2.out"
        }
      );
    }
  }, []);

  return (
    <Float speed={1} rotationIntensity={0.2} floatIntensity={0.5}>
      <group position={position}>
        {/* Glow effect */}
        <mesh ref={glowRef}>
          <cylinderGeometry args={[0.8, 0.8, height + 0.5, 8]} />
          <meshBasicMaterial 
            color={color} 
            transparent 
            opacity={0.3}
          />
        </mesh>
        
        {/* Main bar */}
        <mesh ref={meshRef}>
          <cylinderGeometry args={[0.6, 0.6, height, 8]} />
          <meshStandardMaterial 
            color={color}
            metalness={0.8}
            roughness={0.2}
            emissive={color}
            emissiveIntensity={0.2}
          />
        </mesh>

        {/* Top cap with glow */}
        <mesh position={[0, height / 2, 0]}>
          <cylinderGeometry args={[0.7, 0.7, 0.2, 8]} />
          <meshStandardMaterial 
            color={color}
            metalness={0.9}
            roughness={0.1}
            emissive={color}
            emissiveIntensity={0.4}
          />
        </mesh>

        {/* Value label */}
        <Text3D
          font="/fonts/helvetiker_regular.typeface.json"
          size={0.3}
          height={0.05}
          position={[0, height / 2 + 0.5, 0]}
          color={color}
        >
          {value}
        </Text3D>

        {/* Bottom label */}
        <Text3D
          font="/fonts/helvetiker_regular.typeface.json"
          size={0.2}
          height={0.03}
          position={[0, -0.5, 0]}
          color="#ffffff"
        >
          {label}
        </Text3D>
      </group>
    </Float>
  );
};

interface AnimatedChart3DProps {
  data: Array<{
    label: string;
    value: string;
    height: number;
    color: string;
  }>;
}

export const AnimatedChart3D = ({ data }: AnimatedChart3DProps) => {
  const chartData = useMemo(() => 
    data.map((item, index) => ({
      ...item,
      position: [index * 2 - (data.length - 1), 0, 0] as [number, number, number],
      delay: index * 0.3
    }))
  , [data]);

  return (
    <div className="w-full h-96 relative">
      <Canvas camera={{ position: [0, 2, 8], fov: 50 }}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -5]} intensity={0.5} color="#fbbf24" />
        
        {chartData.map((item, index) => (
          <ChartBar
            key={index}
            height={item.height}
            position={item.position}
            color={item.color}
            delay={item.delay}
            label={item.label}
            value={item.value}
          />
        ))}
        
        <OrbitControls 
          enableZoom={false} 
          autoRotate 
          autoRotateSpeed={0.5}
          enablePan={false}
        />
      </Canvas>
    </div>
  );
};
