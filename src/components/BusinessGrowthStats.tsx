import { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { TrendingUp, DollarSign, Users, Zap, ArrowUp, BarChart3 } from 'lucide-react';
import { AnimatedChart3D } from './AnimatedChart3D';
import { AnimatedArrow3D } from './AnimatedArrow3D';
import { HolographicEffect } from './HolographicEffect';

const chartData = [
  { label: 'Q1', value: '85%', height: 1.5, color: '#10b981' },
  { label: 'Q2', value: '92%', height: 1.8, color: '#10b981' },
  { label: 'Q3', value: '98%', height: 2.2, color: '#10b981' },
  { label: 'Q4', value: '105%', height: 2.5, color: '#10b981' },
];

const stats = [
    {
      icon: TrendingUp,
      value: '+127%',
      label: 'Revenue Growth',
      color: 'text-accent',
      bg: 'bg-accent/20',
      border: 'border-accent/30'
    },
    {
      icon: DollarSign,
      value: '$2.4M',
      label: 'Total Sales',
      color: 'text-primary',
      bg: 'bg-primary/20',
      border: 'border-primary/30'
    },
    {
      icon: Users,
      value: '+89%',
      label: 'Customer Growth',
      color: 'text-secondary',
      bg: 'bg-secondary/20',
      border: 'border-secondary/30'
    },
    {
      icon: Zap,
      value: '10x',
      label: 'Efficiency Boost',
      color: 'text-accent',
      bg: 'bg-accent/20',
      border: 'border-accent/30'
    }
];

export const BusinessGrowthStats = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    });

    // Animate title
    tl.fromTo(titleRef.current, 
      { 
        opacity: 0, 
        y: 50,
        scale: 0.9
      },
      { 
        opacity: 1, 
        y: 0,
        scale: 1,
        duration: 1,
        ease: "power2.out"
      }
    )
    // Animate chart
    .fromTo(chartRef.current,
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
        ease: "back.out(1.2)"
      },
      "-=0.5"
    )
    // Animate stats
    .fromTo(statsRef.current,
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
      "-=0.3"
    );
  }, []);

  return (
    <section ref={sectionRef} className="py-20 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 animated-gradient opacity-20" />
      
      {/* 3D Arrows in background */}
      <div className="absolute inset-0 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <pointLight position={[-10, -10, -5]} intensity={0.5} color="#fbbf24" />
          
          <AnimatedArrow3D position={[-8, -2, -5]} color="#10b981" delay={0} scale={0.8} />
          <AnimatedArrow3D position={[8, -1, -3]} color="#10b981" delay={1} scale={0.6} />
          <AnimatedArrow3D position={[-5, 2, -4]} color="#fbbf24" delay={2} scale={0.7} />
          <AnimatedArrow3D position={[5, 1, -6]} color="#fbbf24" delay={1.5} scale={0.9} />
        </Canvas>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Title */}
        <div ref={titleRef} className="text-center mb-16">
          <HolographicEffect className="inline-block">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full glass-accent glow-accent mb-6">
              <BarChart3 className="w-5 h-5 text-accent animate-pulse" />
              <span className="text-sm font-medium text-glow-accent">Business Analytics</span>
              <div className="w-2 h-2 bg-accent rounded-full animate-ping" />
            </div>
          </HolographicEffect>
          
          <h2 className="text-4xl md:text-6xl font-heading font-bold mb-6">
            <span className="gradient-text">Business Growth</span>
            <br />
            <span className="gradient-text">& Sales Stats</span>
          </h2>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            Watch your business soar with our AI-powered analytics and growth tracking
          </p>
        </div>

        {/* 3D Chart Section */}
        <div ref={chartRef} className="mb-16">
          <HolographicEffect>
            <div className="glass-futuristic p-8 rounded-3xl border border-primary/20">
              <div className="text-center mb-8">
                <h3 className="text-2xl md:text-3xl font-bold gradient-text mb-2">
                  Quarterly Growth Chart
                </h3>
                <p className="text-muted-foreground">
                  Real-time sales performance with green signal indicators
                </p>
              </div>
              
              <div className="relative">
                <AnimatedChart3D data={chartData} />
                
                {/* Green signal indicators */}
                <div className="absolute top-4 right-4 flex items-center gap-2">
                  <div className="w-3 h-3 bg-accent rounded-full animate-pulse" />
                  <span className="text-sm text-accent font-medium">Sales Increasing</span>
                </div>
              </div>
            </div>
          </HolographicEffect>
        </div>

        {/* Stats Grid */}
        <div ref={statsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <HolographicEffect key={index}>
              <div className={`${stat.bg} ${stat.border} p-6 rounded-2xl border glass-futuristic hover:scale-105 transition-all duration-300 group`}>
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl ${stat.bg} border ${stat.border}`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <ArrowUp className={`w-5 h-5 ${stat.color} animate-bounce`} />
                </div>
                
                <div className={`text-3xl md:text-4xl font-bold ${stat.color} mb-2`}>
                  {stat.value}
                </div>
                
                <div className="text-sm text-muted-foreground font-medium">
                  {stat.label}
                </div>
                
                {/* Progress bar */}
                <div className="mt-4 h-1 bg-muted rounded-full overflow-hidden">
                  <div 
                    className={`h-full bg-gradient-to-r ${stat.color.replace('text-', 'from-')} to-transparent rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-1000`}
                    style={{ 
                      width: `${85 + index * 5}%`,
                      transitionDelay: `${index * 0.1}s`
                    }}
                  />
                </div>
              </div>
            </HolographicEffect>
          ))}
        </div>

        {/* Growth Indicators */}
        <div className="mt-16 text-center">
          <HolographicEffect>
            <div className="glass-futuristic p-8 rounded-3xl border border-accent/20">
              <div className="flex items-center justify-center gap-4 mb-6">
                <TrendingUp className="w-8 h-8 text-accent animate-pulse" />
                <h3 className="text-2xl md:text-3xl font-bold gradient-text">
                  Consistent Growth Trajectory
                </h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-4xl font-bold gradient-text mb-2">↑</div>
                  <div className="text-sm text-muted-foreground">Upward Trend</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold gradient-text mb-2">📈</div>
                  <div className="text-sm text-muted-foreground">Steady Growth</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold gradient-text mb-2">🚀</div>
                  <div className="text-sm text-muted-foreground">Exponential Rise</div>
                </div>
              </div>
            </div>
          </HolographicEffect>
        </div>
      </div>
    </section>
  );
};
