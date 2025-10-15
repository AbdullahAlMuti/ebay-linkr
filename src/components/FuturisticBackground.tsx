import { useRef, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

export const FuturisticBackground = () => {
  const gridRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Animated grid lines
    if (gridRef.current) {
      const gridLines = gridRef.current.querySelectorAll('.grid-line');
      
      gridLines.forEach((line, index) => {
        gsap.fromTo(line, 
          { 
            scaleX: 0,
            opacity: 0
          },
          { 
            scaleX: 1,
            opacity: 0.1,
            duration: 2,
            delay: index * 0.1,
            ease: "power2.out",
            repeat: -1,
            yoyo: true,
            repeatDelay: 1
          }
        );
      });
    }

    // Floating particles
    if (particlesRef.current) {
      const particles = particlesRef.current.querySelectorAll('.particle');
      
      particles.forEach((particle, index) => {
        gsap.set(particle, {
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          scale: Math.random() * 0.5 + 0.5
        });

        gsap.to(particle, {
          x: `+=${Math.random() * 200 - 100}`,
          y: `+=${Math.random() * 200 - 100}`,
          duration: Math.random() * 10 + 10,
          ease: "none",
          repeat: -1,
          yoyo: true,
          delay: index * 0.5
        });

        gsap.to(particle, {
          opacity: Math.random() * 0.5 + 0.3,
          duration: Math.random() * 3 + 2,
          repeat: -1,
          yoyo: true,
          ease: "power2.inOut"
        });
      });
    }
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Animated Grid */}
      <div ref={gridRef} className="absolute inset-0 opacity-20">
        {/* Horizontal lines */}
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={`h-${i}`}
            className="grid-line absolute w-full h-px bg-gradient-to-r from-transparent via-primary to-transparent"
            style={{ top: `${i * 5}%` }}
          />
        ))}
        {/* Vertical lines */}
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={`v-${i}`}
            className="grid-line absolute h-full w-px bg-gradient-to-b from-transparent via-primary to-transparent"
            style={{ left: `${i * 5}%` }}
          />
        ))}
      </div>

      {/* Floating Particles */}
      <div ref={particlesRef} className="absolute inset-0">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="particle absolute w-1 h-1 bg-primary rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Scanning lines */}
      <div className="absolute inset-0">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-full h-px bg-gradient-to-r from-transparent via-accent to-transparent opacity-60"
            style={{
              top: `${20 + i * 30}%`,
              animation: `scan-${i} 8s linear infinite`,
              animationDelay: `${i * 2}s`
            }}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes scan-0 {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes scan-1 {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        @keyframes scan-2 {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};
