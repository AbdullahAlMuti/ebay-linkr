import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial, Float } from '@react-three/drei';
import { Suspense, useRef, useState } from 'react';
import { Button } from './ui/button';
import { Zap, ArrowRight, Sparkles, Brain, Rocket } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { FloatingIcons3D } from './FloatingIcons3D';
import { TypewriterEffect } from './TypewriterEffect';
import { FuturisticBackground } from './FuturisticBackground';
import { HolographicEffect } from './HolographicEffect';

const AnimatedSphere = () => {
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <Sphere args={[1, 100, 200]} scale={2.5}>
        <MeshDistortMaterial
          color="#fbbf24"
          attach="material"
          distort={0.5}
          speed={2}
          roughness={0.1}
          metalness={0.9}
        />
      </Sphere>
      <Sphere args={[1, 100, 200]} scale={2.2} position={[1, 0, -0.5]}>
        <MeshDistortMaterial
          color="#dc2626"
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
          color="#ea580c"
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

const typewriterWords = [
  'Auto-list Products',
  'Boost Revenue 10x',
  'Save Hours Daily',
  'Scale Your Business',
  'AI-Powered Success'
];

const features = [
  { icon: Brain, text: 'AI-Powered', color: 'text-accent', bg: 'bg-accent/20' },
  { icon: Sparkles, text: 'Smart Automation', color: 'text-primary', bg: 'bg-primary/20' },
  { icon: Rocket, text: 'Lightning Fast', color: 'text-accent-2', bg: 'bg-accent-2/20' }
];

export const Hero3D = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!heroRef.current) return;

    const tl = gsap.timeline({ delay: 0.3 });

    // Smoother, faster animations
    tl.fromTo(titleRef.current, 
      { 
        opacity: 0, 
        y: 30, 
        scale: 0.95
      },
      { 
        opacity: 1, 
        y: 0, 
        scale: 1,
        duration: 0.8,
        ease: "power2.out"
      }
    )
    .fromTo(subtitleRef.current,
      { 
        opacity: 0, 
        y: 20
      },
      { 
        opacity: 1, 
        y: 0,
        duration: 0.6,
        ease: "power2.out"
      },
      "-=0.4"
    )
    .fromTo(featuresRef.current,
      { 
        opacity: 0, 
        y: 15,
        scale: 0.98
      },
      { 
        opacity: 1, 
        y: 0,
        scale: 1,
        duration: 0.5,
        ease: "back.out(1.2)"
      },
      "-=0.3"
    )
    .fromTo(buttonsRef.current,
      { 
        opacity: 0, 
        y: 20,
        scale: 0.95
      },
      { 
        opacity: 1, 
        y: 0,
        scale: 1,
        duration: 0.6,
        ease: "power2.out"
      },
      "-=0.2"
    );

    // Subtle floating animation
    gsap.to(heroRef.current, {
      y: -5,
      duration: 4,
      ease: "power1.inOut",
      repeat: -1,
      yoyo: true
    });
  }, []);

  const scrollToDemo = () => {
    document.getElementById('media')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Futuristic Background */}
      <FuturisticBackground />
      
      {/* Rich animated background gradient */}
      <div className="absolute inset-0 animated-gradient-fire opacity-40" />
      <div className="absolute inset-0 animated-gradient-warm opacity-20" />
      
      {/* Floating 3D Icons Background */}
      <FloatingIcons3D />
      
      {/* 3D Canvas */}
      <div className="absolute inset-0 opacity-30">
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
          <Suspense fallback={null}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <pointLight position={[-10, -10, -5]} intensity={0.5} color="#fbbf24" />
            <AnimatedSphere />
            <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.3} />
          </Suspense>
        </Canvas>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Compact Futuristic Badge */}
          <HolographicEffect className="inline-block">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-accent glow-accent mb-6">
              <Brain className="w-4 h-4 text-accent animate-pulse" />
              <span className="text-sm font-medium text-glow-accent">AI-Powered</span>
              <div className="w-1.5 h-1.5 bg-accent rounded-full animate-ping" />
            </div>
          </HolographicEffect>
          
          {/* Compact Main Title with Typewriter */}
          <div ref={titleRef} className="space-y-4">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold leading-tight">
              <span className="gradient-text-fire block mb-2">Amazon → eBay</span>
              <div className="h-16 md:h-20 lg:h-24 flex items-center justify-center">
                <TypewriterEffect 
                  words={typewriterWords}
                  className="gradient-text-golden text-3xl md:text-5xl lg:text-6xl font-bold"
                  speed={100}
                  deleteSpeed={50}
                  pauseTime={1200}
                />
              </div>
            </h1>
          </div>

          {/* Compact Subtitle */}
          <div ref={subtitleRef} className="max-w-3xl mx-auto">
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
              Generate optimized eBay listings automatically and boost your revenue{' '}
              <span className="gradient-text-fire font-semibold">10x faster</span> with AI
            </p>
          </div>

          {/* Compact Feature Pills */}
          <div ref={featuresRef} className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
            {features.map((feature, index) => (
              <div key={index} className={`flex items-center gap-2 px-3 py-2 rounded-full ${feature.bg} border border-current/20 hover:scale-105 transition-all duration-300`}>
                <feature.icon className={`w-4 h-4 ${feature.color}`} />
                <span className={`text-sm font-medium ${feature.color}`}>{feature.text}</span>
              </div>
            ))}
          </div>

          {/* Compact CTA Buttons */}
          <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
            <Button 
              size="lg" 
              className="text-lg px-8 py-6 btn-vibrant glow-primary-lg group relative overflow-hidden"
              onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <span className="relative z-10 flex items-center gap-2">
                Get Started <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </Button>
            
            <Button 
              size="lg" 
              variant="outline"
              className="text-lg px-8 py-6 glass-accent glass-hover hover-glow-green group"
              onClick={scrollToDemo}
            >
              <span className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                See Demo
              </span>
            </Button>
          </div>

          {/* Compact Rich Stats */}
          <div className="grid grid-cols-3 gap-4 max-w-4xl mx-auto pt-8">
            {[
              { value: "10x", label: "Faster", gradient: "gradient-text-fire", bg: "bg-primary/10" },
              { value: "+40%", label: "Conversion", gradient: "gradient-text-golden", bg: "bg-accent/10" },
              { value: "$2M+", label: "Revenue", gradient: "gradient-text-warm", bg: "bg-accent-2/10" }
            ].map((stat, index) => (
              <div key={index} className={`${stat.bg} p-6 rounded-2xl border border-current/20 hover:scale-105 transition-all duration-300 group`}>
                <div className={`text-4xl md:text-5xl font-bold ${stat.gradient} mb-2`}>
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground font-medium">
                  {stat.label}
                </div>
                <div className="mt-3 h-0.5 bg-gradient-to-r from-primary/50 to-accent/50 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="flex flex-col items-center gap-2">
          <div className="text-xs text-muted-foreground mb-2 animate-pulse">Scroll to explore</div>
          <div className="w-6 h-10 rounded-full border-2 border-primary/50 flex items-start justify-center p-2 glow-primary">
            <div className="w-1 h-3 bg-primary rounded-full animate-pulse glow-neon" />
          </div>
        </div>
      </div>
    </section>
  );
};