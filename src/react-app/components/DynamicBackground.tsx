import { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  angle: number;
}

interface EnergyOrb {
  id: number;
  x: number;
  y: number;
  size: number;
  pulseDelay: number;
}

interface LiquidShape {
  id: number;
  x: number;
  y: number;
  size: number;
  morphDelay: number;
}

interface FloatingOrb {
  id: number;
  x: number;
  y: number;
  size: number;
  animationDelay: number;
  intensity: number;
}

export default function DynamicBackground() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [energyOrbs, setEnergyOrbs] = useState<EnergyOrb[]>([]);
  const [liquidShapes, setLiquidShapes] = useState<LiquidShape[]>([]);
  const [floatingOrbs, setFloatingOrbs] = useState<FloatingOrb[]>([]);

  useEffect(() => {
    // Generate floating particles (increased count for more coverage)
    const newParticles: Particle[] = Array.from({ length: 35 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      speed: Math.random() * 3 + 0.5,
      opacity: Math.random() * 0.6 + 0.2,
      angle: Math.random() * 360,
    }));
    setParticles(newParticles);

    // Generate energy orbs (increased for better coverage)
    const newEnergyOrbs: EnergyOrb[] = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 120 + 60,
      pulseDelay: Math.random() * 6,
    }));
    setEnergyOrbs(newEnergyOrbs);

    // Generate liquid shapes (increased for more dynamics)
    const newLiquidShapes: LiquidShape[] = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 250 + 120,
      morphDelay: Math.random() * 10,
    }));
    setLiquidShapes(newLiquidShapes);

    // Generate floating orbs for section-specific effects
    const newFloatingOrbs: FloatingOrb[] = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 80 + 40,
      animationDelay: Math.random() * 8,
      intensity: Math.random() * 0.3 + 0.1,
    }));
    setFloatingOrbs(newFloatingOrbs);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
      {/* Base gradient background - consistent across all sections */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800" />
      
      {/* Secondary gradient layer for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-velvet-black via-transparent to-gray-900/50" />
      
      {/* Animated gradient overlay - larger and more dynamic */}
      <div 
        className="absolute inset-0 opacity-50"
        style={{
          background: 'linear-gradient(45deg, rgba(201, 169, 97, 0.12), rgba(15, 15, 16, 0.9), rgba(229, 214, 168, 0.08), rgba(20, 20, 22, 0.95), rgba(201, 169, 97, 0.06))',
          backgroundSize: '500% 500%',
          animation: 'gradientShift 8s ease-in-out infinite',
        }}
      />

      {/* Liquid morphing shapes - enhanced */}
      {liquidShapes.map((shape) => (
        <div
          key={`liquid-${shape.id}`}
          className="absolute rounded-full"
          style={{
            left: `${shape.x}%`,
            top: `${shape.y}%`,
            width: `${shape.size}px`,
            height: `${shape.size}px`,
            background: 'radial-gradient(circle, rgba(201, 169, 97, 0.15) 0%, rgba(201, 169, 97, 0.08) 40%, transparent 70%)',
            animation: `liquidMorph 18s ease-in-out infinite`,
            animationDelay: `${shape.morphDelay}s`,
            transform: 'translate(-50%, -50%)',
          }}
        />
      ))}

      {/* Energy orbs - enhanced with multiple layers */}
      {energyOrbs.map((orb) => (
        <div
          key={`orb-${orb.id}`}
          className="absolute rounded-full"
          style={{
            left: `${orb.x}%`,
            top: `${orb.y}%`,
            width: `${orb.size}px`,
            height: `${orb.size}px`,
            background: 'radial-gradient(circle, rgba(201, 169, 97, 0.4) 0%, rgba(201, 169, 97, 0.2) 30%, rgba(229, 214, 168, 0.1) 60%, transparent 80%)',
            animation: `energyPulse 6s ease-in-out infinite`,
            animationDelay: `${orb.pulseDelay}s`,
            transform: 'translate(-50%, -50%)',
          }}
        />
      ))}

      {/* Floating particles - enhanced */}
      {particles.map((particle) => (
        <div
          key={`particle-${particle.id}`}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            background: `radial-gradient(circle, rgba(201, 169, 97, ${particle.opacity}) 0%, rgba(229, 214, 168, ${particle.opacity * 0.6}) 50%, transparent 100%)`,
            animation: `particleFloat ${10 + particle.speed}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 6}s`,
            transform: 'translate(-50%, -50%)',
          }}
        />
      ))}

      {/* Enhanced light rays - more coverage */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute top-0 left-1/6 w-1 h-full opacity-40"
          style={{
            background: 'linear-gradient(to bottom, transparent, rgba(201, 169, 97, 0.4) 20%, rgba(201, 169, 97, 0.6) 50%, rgba(201, 169, 97, 0.4) 80%, transparent)',
            animation: 'energyPulse 5s ease-in-out infinite',
            animationDelay: '0s',
          }}
        />
        <div 
          className="absolute top-0 right-1/4 w-0.5 h-full opacity-30"
          style={{
            background: 'linear-gradient(to bottom, transparent, rgba(229, 214, 168, 0.5) 30%, rgba(229, 214, 168, 0.7) 60%, transparent)',
            animation: 'energyPulse 7s ease-in-out infinite',
            animationDelay: '2s',
          }}
        />
        <div 
          className="absolute top-0 left-2/3 w-0.5 h-full opacity-35"
          style={{
            background: 'linear-gradient(to bottom, transparent, rgba(201, 169, 97, 0.6) 25%, rgba(201, 169, 97, 0.8) 55%, transparent)',
            animation: 'energyPulse 8s ease-in-out infinite',
            animationDelay: '1s',
          }}
        />
        <div 
          className="absolute top-0 right-1/6 w-1 h-full opacity-25"
          style={{
            background: 'linear-gradient(to bottom, transparent, rgba(201, 169, 97, 0.3) 35%, rgba(201, 169, 97, 0.5) 65%, transparent)',
            animation: 'energyPulse 6s ease-in-out infinite',
            animationDelay: '3s',
          }}
        />
        <div 
          className="absolute top-0 left-1/2 w-0.5 h-full opacity-20"
          style={{
            background: 'linear-gradient(to bottom, transparent, rgba(229, 214, 168, 0.4) 40%, rgba(229, 214, 168, 0.6) 70%, transparent)',
            animation: 'energyPulse 9s ease-in-out infinite',
            animationDelay: '4s',
          }}
        />
      </div>

      {/* Floating orbs for dynamic sections */}
      {floatingOrbs.map((orb) => (
        <div
          key={`floating-orb-${orb.id}`}
          className="absolute rounded-full"
          style={{
            left: `${orb.x}%`,
            top: `${orb.y}%`,
            width: `${orb.size}px`,
            height: `${orb.size}px`,
            background: `radial-gradient(circle, rgba(201, 169, 97, ${orb.intensity}) 0%, rgba(229, 214, 168, ${orb.intensity * 0.7}) 40%, transparent 70%)`,
            animation: `breathe 4s ease-in-out infinite`,
            animationDelay: `${orb.animationDelay}s`,
            transform: 'translate(-50%, -50%)',
          }}
        />
      ))}

      {/* Interactive glow spots - enhanced and more distributed */}
      <div className="absolute top-16 left-16 w-40 h-40 rounded-full bg-gold/8 animate-breathe" style={{ animationDelay: '0s' }} />
      <div className="absolute bottom-24 right-24 w-32 h-32 rounded-full bg-velvet-warm/6 animate-breathe" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 left-8 w-24 h-24 rounded-full bg-gold/12 animate-breathe" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/4 right-16 w-28 h-28 rounded-full bg-velvet-warm/8 animate-breathe" style={{ animationDelay: '3s' }} />
      <div className="absolute bottom-1/3 left-1/4 w-36 h-36 rounded-full bg-gold/6 animate-breathe" style={{ animationDelay: '1.5s' }} />
      <div className="absolute top-3/4 right-1/3 w-20 h-20 rounded-full bg-velvet-warm/10 animate-breathe" style={{ animationDelay: '2.5s' }} />
      
      {/* Orbiting elements - enhanced */}
      <div className="absolute top-1/3 left-1/2 w-3 h-3">
        <div style={{ animation: 'orbit 25s linear infinite' }}>
          <div className="w-3 h-3 bg-gold/70 rounded-full animate-energyPulse" />
        </div>
      </div>
      <div className="absolute bottom-1/3 right-1/3 w-2 h-2">
        <div style={{ animation: 'orbit 30s linear infinite reverse' }}>
          <div className="w-2 h-2 bg-velvet-warm/60 rounded-full animate-energyPulse" />
        </div>
      </div>
      <div className="absolute top-2/3 left-1/4 w-2.5 h-2.5">
        <div style={{ animation: 'orbit 35s linear infinite' }}>
          <div className="w-2.5 h-2.5 bg-gold/50 rounded-full animate-energyPulse" />
        </div>
      </div>
      
      {/* Background texture overlay - enhanced */}
      <div 
        className="absolute inset-0 opacity-8"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(201, 169, 97, 0.2) 1px, transparent 0)`,
          backgroundSize: '25px 25px',
        }}
      />

      {/* Diagonal light streaks for added dynamism */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute top-0 left-0 w-full h-full opacity-20"
          style={{
            background: 'linear-gradient(135deg, transparent 0%, rgba(201, 169, 97, 0.1) 45%, rgba(201, 169, 97, 0.15) 50%, rgba(201, 169, 97, 0.1) 55%, transparent 100%)',
            animation: 'diagonalSweep 15s ease-in-out infinite',
          }}
        />
        <div 
          className="absolute top-0 right-0 w-full h-full opacity-15"
          style={{
            background: 'linear-gradient(-135deg, transparent 0%, rgba(229, 214, 168, 0.08) 45%, rgba(229, 214, 168, 0.12) 50%, rgba(229, 214, 168, 0.08) 55%, transparent 100%)',
            animation: 'diagonalSweep 20s ease-in-out infinite reverse',
            animationDelay: '5s',
          }}
        />
      </div>

      {/* Enhanced atmospheric depth layers */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/40 opacity-60" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30 opacity-40" />
    </div>
  );
}
