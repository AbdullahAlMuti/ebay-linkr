import { Zap, TrendingUp, Image as ImageIcon, Tag, Sparkles, Shield, Package, ShoppingCart, Truck } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere } from '@react-three/drei';
import * as THREE from 'three';

gsap.registerPlugin(ScrollTrigger);

// Floating particle background
const FloatingParticle = ({ position }: { position: [number, number, number] }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.5;
      meshRef.current.rotation.x += 0.002;
      meshRef.current.rotation.y += 0.003;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[0.1, 16, 16]} />
      <meshStandardMaterial 
        color="#FFD700" 
        emissive="#FFD700" 
        emissiveIntensity={0.5}
        metalness={0.8}
        roughness={0.2}
      />
    </mesh>
  );
};

const Feature3DIcon = ({ color }: { color: string }) => {
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <Sphere args={[0.5, 32, 32]}>
        <MeshDistortMaterial
          color={color}
          speed={1.5}
          distort={0.3}
          radius={1}
          metalness={0.9}
          roughness={0.1}
        />
      </Sphere>
    </Float>
  );
};

const ParticleField = () => {
  const particles = useRef<[number, number, number][]>([]);
  
  if (particles.current.length === 0) {
    for (let i = 0; i < 20; i++) {
      particles.current.push([
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 10
      ]);
    }
  }

  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#FFD700" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00D9FF" />
      
      {particles.current.map((pos, i) => (
        <FloatingParticle key={i} position={pos} />
      ))}
    </>
  );
};

const features = [
  {
    icon: Zap,
    title: '1-Click Amazon → eBay',
    description: 'Instantly convert Amazon listings to optimized eBay listings with a single click',
    color: 'from-primary to-primary-glow'
  },
  {
    icon: TrendingUp,
    title: 'Auto Price Optimization',
    description: 'AI-powered pricing that maximizes your profit margins automatically',
    color: 'from-secondary to-accent'
  },
  {
    icon: ImageIcon,
    title: 'Image & Title Optimizer',
    description: 'Automatically enhance product images and create compelling titles that sell',
    color: 'from-accent to-primary'
  },
  {
    icon: Tag,
    title: 'Auto Category Mapping',
    description: 'Smart category detection ensures your products appear in the right searches',
    color: 'from-primary to-secondary'
  },
  {
    icon: Sparkles,
    title: 'AI Content Generation',
    description: 'Generate engaging product descriptions that convert browsers into buyers',
    color: 'from-secondary to-primary-glow'
  },
  {
    icon: Shield,
    title: 'Policy Compliance Check',
    description: 'Automatic verification ensures all listings meet eBay\'s guidelines',
    color: 'from-accent to-secondary'
  }
];

export const FeatureBlocks = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    cardsRef.current.forEach((card, index) => {
      if (!card) return;
      
      // First feature animates earlier
      const baseDelay = index === 0 ? 0 : 0.15;
      
      gsap.fromTo(card,
        {
          opacity: 0,
          y: 60,
          x: index % 2 === 0 ? -30 : 30,
          scale: 0.85,
          rotationX: 10,
        },
        {
          opacity: 1,
          y: 0,
          x: 0,
          scale: 1,
          rotationX: 0,
          duration: 0.8,
          delay: baseDelay + (index * 0.12),
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            end: 'bottom 15%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Continuous floating animation
      gsap.to(card, {
        y: '+=15',
        duration: 3 + (index * 0.2),
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: index * 0.3,
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    const card = cardsRef.current[index];
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;

    gsap.to(card, {
      rotationX: rotateX,
      rotationY: rotateY,
      duration: 0.3,
      ease: 'power2.out',
      transformPerspective: 1000,
    });
  };

  const handleMouseLeave = (index: number) => {
    const card = cardsRef.current[index];
    if (!card) return;

    gsap.to(card, {
      rotationX: 0,
      rotationY: 0,
      duration: 0.5,
      ease: 'power2.out',
    });
  };

  return (
    <section ref={sectionRef} className="py-24 relative overflow-hidden">
      {/* 3D Particle Background */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
          <ParticleField />
        </Canvas>
      </div>

      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/10 to-background" />
      
      {/* Animated light streaks */}
      <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-accent/50 to-transparent animate-pulse" />
      <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-primary/30 to-transparent animate-pulse delay-500" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass glow-primary mb-6">
            <Sparkles className="w-5 h-5 text-accent animate-pulse" />
            <span className="text-sm font-medium">AI-Powered Automation</span>
          </div>
          
          <h2 className="text-5xl md:text-7xl font-heading font-bold">
            <span className="gradient-text">Powerful Features</span>
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            Everything you need to dominate the eBay marketplace with cutting-edge AI automation
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                ref={el => cardsRef.current[index] = el}
                className="group relative"
                style={{ perspective: '1000px' }}
                onMouseMove={(e) => handleMouseMove(e, index)}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => {
                  handleMouseLeave(index);
                  setHoveredIndex(null);
                }}
              >
                {/* Glowing border effect */}
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-100 transition-all duration-500 blur-xl group-hover:blur-2xl`} />
                
                {/* Card container with 3D transform */}
                <div className="relative glass p-8 rounded-3xl overflow-hidden transition-all duration-500 group-hover:glass-hover border-2 border-transparent group-hover:border-accent/30">
                  {/* Animated gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />
                  
                  {/* Shine effect on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  </div>

                  {/* Floating 3D icon background */}
                  <div className="absolute top-4 right-4 w-24 h-24 opacity-20 group-hover:opacity-30 transition-opacity duration-500">
                    <Canvas camera={{ position: [0, 0, 3] }}>
                      <Feature3DIcon color={hoveredIndex === index ? '#FFD700' : '#00D9FF'} />
                    </Canvas>
                  </div>
                  
                  {/* Content */}
                  <div className="relative z-10">
                    <div className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${feature.color} p-1 mb-6 group-hover:scale-110 transition-all duration-500 group-hover:rotate-6 shadow-lg group-hover:shadow-2xl group-hover:shadow-accent/50`}>
                      <div className="w-full h-full bg-background/80 backdrop-blur-sm rounded-3xl flex items-center justify-center">
                        <Icon className="w-10 h-10 text-accent group-hover:scale-110 transition-transform duration-300" />
                      </div>
                    </div>
                    
                    <h3 className="text-2xl font-heading font-bold mb-4 group-hover:gradient-text transition-all duration-300 group-hover:scale-105 transform-gpu">
                      {feature.title}
                    </h3>
                    
                    <p className="text-muted-foreground leading-relaxed group-hover:text-foreground/90 transition-colors duration-300">
                      {feature.description}
                    </p>

                    {/* Animated dots indicator */}
                    <div className="flex gap-2 mt-6 opacity-0 group-hover:opacity-100 transition-all duration-500">
                      {[...Array(3)].map((_, i) => (
                        <div
                          key={i}
                          className="w-2 h-2 rounded-full bg-accent animate-pulse"
                          style={{ animationDelay: `${i * 150}ms` }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Multiple corner accents */}
                  <div className={`absolute -bottom-16 -right-16 w-40 h-40 bg-gradient-to-br ${feature.color} opacity-10 rounded-full blur-3xl group-hover:opacity-40 transition-all duration-700 group-hover:scale-150`} />
                  <div className={`absolute -top-16 -left-16 w-32 h-32 bg-gradient-to-br ${feature.color} opacity-5 rounded-full blur-2xl group-hover:opacity-20 transition-all duration-700`} />
                  
                  {/* Floating particles on hover */}
                  {hoveredIndex === index && (
                    <div className="absolute inset-0 pointer-events-none">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className="absolute w-1 h-1 bg-accent rounded-full animate-float"
                          style={{
                            left: `${20 + i * 15}%`,
                            top: `${30 + (i % 2) * 40}%`,
                            animationDelay: `${i * 0.2}s`,
                            animationDuration: `${2 + i * 0.3}s`
                          }}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA section */}
        <div className="mt-20 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full glass glow-primary">
            <Package className="w-5 h-5 text-accent animate-pulse" />
            <span className="text-sm font-medium">Join 10,000+ sellers already using our platform</span>
          </div>
        </div>
      </div>
    </section>
  );
};