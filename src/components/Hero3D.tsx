import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial, Float } from '@react-three/drei';
import { Suspense, useRef, useState } from 'react';
import { Button } from './ui/button';
import { Zap, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { FloatingIcons3D } from './FloatingIcons3D';

const AnimatedSphere = () => {
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <Sphere args={[1, 100, 200]} scale={2.5}>
        <MeshDistortMaterial
          color="#3b82f6"
          attach="material"
          distort={0.5}
          speed={2}
          roughness={0.1}
          metalness={0.9}
        />
      </Sphere>
      <Sphere args={[1, 100, 200]} scale={2.2} position={[1, 0, -0.5]}>
        <MeshDistortMaterial
          color="#a855f7"
          attach="material"
          distort={0.3}
          speed={1.5}
          roughness={0.2}
          metalness={0.8}
          transparent
          opacity={0.7}
        />
      </Sphere>
      <Sphere args={[1, 100, 200]} scale={1.8} position={[-1, 0, -0.3]}>
        <MeshDistortMaterial
          color="#10b981"
          attach="material"
          distort={0.4}
          speed={1.8}
          roughness={0.15}
          metalness={0.85}
          transparent
          opacity={0.6}
        />
      </Sphere>
    </Float>
  );
};

const words = ['Auto-list', 'Boost Profits', 'Save Hours', 'Scale Fast'];

export const Hero3D = () => {
  const headlineRef = useRef<HTMLDivElement>(null);
  const [currentWord, setCurrentWord] = useState(0);

  useGSAP(() => {
    if (!headlineRef.current) return;
    
    const tl = gsap.timeline({ repeat: -1 });
    words.forEach((_, index) => {
      tl.to(headlineRef.current, {
        duration: 0.5,
        opacity: 0,
        scale: 0.8,
        onComplete: () => setCurrentWord((index + 1) % words.length)
      })
      .to(headlineRef.current, {
        duration: 0.5,
        opacity: 1,
        scale: 1,
      })
      .to({}, { duration: 2 });
    });
  }, []);

  const scrollToDemo = () => {
    document.getElementById('media')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 animated-gradient-ocean opacity-30" />
      
      {/* Floating 3D Icons Background */}
      <FloatingIcons3D />
      
      {/* 3D Canvas */}
      <div className="absolute inset-0 opacity-40">
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
          <Suspense fallback={null}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <pointLight position={[-10, -10, -5]} intensity={0.5} color="#ff6ec7" />
            <AnimatedSphere />
            <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
          </Suspense>
        </Canvas>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Animated headline */}
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-accent glow-accent mb-6">
              <Zap className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium text-glow-accent">Powered by Advanced AI</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold leading-tight">
              <span className="gradient-text-rainbow">Amazon → eBay</span>
              <br />
              <span ref={headlineRef} className="inline-block transition-all gradient-text-ocean">
                {words[currentWord]}
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
              Generate optimized eBay listings automatically and boost your revenue 10x faster
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="text-lg px-8 py-6 btn-rainbow glow-primary-lg group"
              onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Get Started <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="text-lg px-8 py-6 glass-accent glass-hover hover-glow-green"
              onClick={scrollToDemo}
            >
              See Demo
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto pt-12">
            <div className="card-vibrant p-6 rounded-2xl hover-glow-blue">
              <div className="text-3xl md:text-4xl font-bold gradient-text-sunset">10x</div>
              <div className="text-sm text-muted-foreground mt-2">Faster Listing</div>
            </div>
            <div className="card-accent p-6 rounded-2xl hover-glow-green">
              <div className="text-3xl md:text-4xl font-bold gradient-text-ocean">+40%</div>
              <div className="text-sm text-muted-foreground mt-2">Conversion Rate</div>
            </div>
            <div className="card-vibrant p-6 rounded-2xl hover-glow-purple">
              <div className="text-3xl md:text-4xl font-bold gradient-text-rainbow">$2M+</div>
              <div className="text-sm text-muted-foreground mt-2">Revenue Generated</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-primary/50 flex items-start justify-center p-2 glow-primary">
          <div className="w-1 h-3 bg-primary rounded-full animate-pulse glow-neon" />
        </div>
      </div>
    </section>
  );
};