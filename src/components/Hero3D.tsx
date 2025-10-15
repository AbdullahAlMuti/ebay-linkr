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
  { icon: Brain, text: 'Advanced AI', color: 'text-accent' },
  { icon: Sparkles, text: 'Smart Automation', color: 'text-primary' },
  { icon: Rocket, text: 'Lightning Fast', color: 'text-accent-2' }
];

export const Hero3D = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!heroRef.current) return;

    const tl = gsap.timeline({ delay: 0.5 });

    // Animate elements in sequence
    tl.fromTo(titleRef.current, 
      { 
        opacity: 0, 
        y: 50, 
        scale: 0.9,
        filter: 'blur(10px)'
      },
      { 
        opacity: 1, 
        y: 0, 
        scale: 1,
        filter: 'blur(0px)',
        duration: 1.2,
        ease: "power3.out"
      }
    )
    .fromTo(subtitleRef.current,
      { 
        opacity: 0, 
        y: 30,
        filter: 'blur(5px)'
      },
      { 
        opacity: 1, 
        y: 0,
        filter: 'blur(0px)',
        duration: 0.8,
        ease: "power2.out"
      },
      "-=0.6"
    )
    .fromTo(featuresRef.current,
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
        ease: "back.out(1.7)"
      },
      "-=0.4"
    )
    .fromTo(buttonsRef.current,
      { 
        opacity: 0, 
        y: 30,
        scale: 0.9
      },
      { 
        opacity: 1, 
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: "power2.out"
      },
      "-=0.2"
    );

    // Continuous floating animation for the hero
    gsap.to(heroRef.current, {
      y: -10,
      duration: 3,
      ease: "power2.inOut",
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
      
      {/* Animated background gradient */}
      <div className="absolute inset-0 animated-gradient-fire opacity-20" />
      
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
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Futuristic Badge */}
          <HolographicEffect className="inline-block">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full glass-accent glow-accent mb-8">
              <div className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-accent animate-pulse" />
                <span className="text-sm font-medium text-glow-accent">Powered by Advanced AI</span>
              </div>
              <div className="w-2 h-2 bg-accent rounded-full animate-ping" />
            </div>
          </HolographicEffect>
          
          {/* Main Title with Typewriter */}
          <div ref={titleRef} className="space-y-6">
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-heading font-bold leading-tight">
              <span className="gradient-text-fire block mb-4">Amazon → eBay</span>
              <div className="h-20 md:h-24 lg:h-28 flex items-center justify-center">
                <TypewriterEffect 
                  words={typewriterWords}
                  className="gradient-text-golden text-4xl md:text-6xl lg:text-7xl font-bold"
                  speed={80}
                  deleteSpeed={40}
                  pauseTime={1500}
                />
              </div>
            </h1>
          </div>

          {/* Subtitle */}
          <div ref={subtitleRef} className="max-w-4xl mx-auto">
            <p className="text-2xl md:text-3xl text-muted-foreground leading-relaxed">
              Generate optimized eBay listings automatically and boost your revenue{' '}
              <span className="gradient-text-fire font-semibold">10x faster</span> with AI-powered automation
            </p>
          </div>

          {/* Feature Pills */}
          <div ref={featuresRef} className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
            {features.map((feature, index) => (
              <HolographicEffect key={index} className="inline-block">
                <div className="flex items-center gap-2 px-4 py-2 rounded-full glass hover-glow-blue transition-all duration-300">
                  <feature.icon className={`w-4 h-4 ${feature.color}`} />
                  <span className="text-sm font-medium">{feature.text}</span>
                </div>
              </HolographicEffect>
            ))}
          </div>

          {/* CTA Buttons */}
          <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
            <HolographicEffect>
              <Button 
                size="lg" 
                className="text-xl px-10 py-8 btn-vibrant glow-primary-lg group relative overflow-hidden"
                onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <span className="relative z-10 flex items-center gap-3">
                  Get Started <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              </Button>
            </HolographicEffect>
            
            <HolographicEffect>
              <Button 
                size="lg" 
                variant="outline"
                className="text-xl px-10 py-8 glass-accent glass-hover hover-glow-green group"
                onClick={scrollToDemo}
              >
                <span className="flex items-center gap-3">
                  <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                  See Demo
                </span>
              </Button>
            </HolographicEffect>
          </div>

          {/* Enhanced Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto pt-16">
            {[
              { value: "10x", label: "Faster Listing", gradient: "gradient-text-fire" },
              { value: "+40%", label: "Conversion Rate", gradient: "gradient-text-golden" },
              { value: "$2M+", label: "Revenue Generated", gradient: "gradient-text-warm" }
            ].map((stat, index) => (
              <HolographicEffect key={index}>
                <div className="card-vibrant p-8 rounded-3xl hover-glow-blue group transition-all duration-500">
                  <div className={`text-5xl md:text-6xl font-bold ${stat.gradient} mb-3`}>
                    {stat.value}
                  </div>
                  <div className="text-lg text-muted-foreground font-medium">
                    {stat.label}
                  </div>
                  <div className="mt-4 h-1 bg-gradient-to-r from-primary/50 to-accent/50 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                </div>
              </HolographicEffect>
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