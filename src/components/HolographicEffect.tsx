import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

interface HolographicEffectProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
}

export const HolographicEffect = ({ 
  children, 
  className = '', 
  intensity = 1 
}: HolographicEffectProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (containerRef.current) {
      // Holographic shimmer effect
      gsap.to(containerRef.current, {
        backgroundPosition: '200% 0',
        duration: 3,
        ease: "none",
        repeat: -1,
        yoyo: true
      });

      // Subtle floating animation
      gsap.to(containerRef.current, {
        y: -5,
        duration: 2,
        ease: "power2.inOut",
        repeat: -1,
        yoyo: true
      });
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      style={{
        background: `
          linear-gradient(
            45deg,
            transparent 30%,
            rgba(255, 255, 255, 0.1) 50%,
            transparent 70%
          )
        `,
        backgroundSize: '200% 200%',
        backgroundPosition: '0% 0%'
      }}
    >
      {/* Holographic overlay */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            linear-gradient(
              90deg,
              transparent 0%,
              rgba(255, 255, 255, 0.1) 25%,
              rgba(255, 255, 255, 0.2) 50%,
              rgba(255, 255, 255, 0.1) 75%,
              transparent 100%
            )
          `,
          animation: 'holographic-sweep 4s ease-in-out infinite'
        }}
      />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>

      <style jsx>{`
        @keyframes holographic-sweep {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
      `}</style>
    </div>
  );
};
