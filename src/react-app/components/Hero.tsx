import { useIntersectionObserver } from '@/react-app/hooks/useIntersectionObserver';
import { useState, useEffect } from 'react';

export default function Hero() {
  const { ref: heroRef, isInView } = useIntersectionObserver({ threshold: 0.3 });
  
  // Typewriter effect state
  const [displayedText, setDisplayedText] = useState('');
  const [displayedSecondLine, setDisplayedSecondLine] = useState('');
  const fullText = 'Not just a ride.';
  const secondLineText = 'An Experience.';
  
  useEffect(() => {
    if (!isInView) return;
    
    let timeoutId: NodeJS.Timeout;
    let currentIndex = 0;
    
    const typeText = () => {
      if (currentIndex < fullText.length) {
        setDisplayedText(fullText.slice(0, currentIndex + 1));
        currentIndex++;
        timeoutId = setTimeout(typeText, 100); // 100ms delay between characters
      } else {
        // Start typing second line after first line is complete
        let secondLineIndex = 0;
        const typeSecondLine = () => {
          if (secondLineIndex < secondLineText.length) {
            setDisplayedSecondLine(secondLineText.slice(0, secondLineIndex + 1));
            secondLineIndex++;
            timeoutId = setTimeout(typeSecondLine, 100);
          }
        };
        timeoutId = setTimeout(typeSecondLine, 300); // 300ms pause before second line
      }
    };
    
    // Start typing after a brief delay
    timeoutId = setTimeout(typeText, 800);
    
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [isInView]);

  const scrollToWhy = () => {
    document.getElementById('why-velvet')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section ref={heroRef} className="relative h-screen w-full overflow-hidden">
      {/* Dynamic Background with Rolls Royce */}
      <div className="absolute inset-0">
        <div className="relative w-full h-full">
          {/* Rolls Royce Hero Image */}
          <img
            src="https://mocha-cdn.com/019a1c8d-0846-765c-9884-bf1a669bc4f8/rolls-royce-hero.jpg"
            alt="Luxury Rolls Royce"
            className="absolute inset-0 w-full h-full object-cover"
          />
          
          {/* Animated gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/90" />
          <div className="absolute inset-0 bg-gradient-to-r from-gold/10 via-transparent to-gold/10 animate-energyPulse" />
          
          {/* Dynamic gold light rays */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 left-1/4 w-1 h-full bg-gradient-to-b from-gold/0 via-gold/20 to-gold/0 animate-energyPulse delay-0" />
            <div className="absolute top-0 right-1/3 w-1 h-full bg-gradient-to-b from-gold/0 via-gold/15 to-gold/0 animate-energyPulse delay-200" />
            <div className="absolute top-0 left-2/3 w-0.5 h-full bg-gradient-to-b from-gold/0 via-gold/25 to-gold/0 animate-energyPulse delay-100" />
          </div>
          
          {/* Floating gold particles */}
          <div className="absolute inset-0 opacity-40">
            <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-gold/60 rounded-full animate-particleFloat delay-0" />
            <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-velvet-warm/80 rounded-full animate-particleFloat delay-300" />
            <div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-gold/40 rounded-full animate-particleFloat delay-600" />
            <div className="absolute top-2/3 right-1/2 w-1 h-1 bg-gold/70 rounded-full animate-particleFloat delay-400" />
          </div>
        </div>
      </div>

      {/* Floating glass orbs */}
      <div className="absolute top-20 left-20 w-32 h-32 rounded-full bg-gradient-radial from-white/10 to-transparent backdrop-blur-sm animate-breathe" />
      <div className="absolute bottom-32 right-32 w-24 h-24 rounded-full bg-gradient-radial from-velvet-gold/20 to-transparent backdrop-blur-sm animate-breathe delay-500" />
      <div className="absolute top-1/2 right-20 w-16 h-16 rounded-full bg-gradient-radial from-white/15 to-transparent backdrop-blur-sm animate-breathe delay-1000" />

      {/* Hero Content with Enhanced Glassmorphism */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center">
        {/* Gold accent line with shimmer */}
        <div className={`relative h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent mb-8 overflow-hidden transition-all duration-800 ${isInView ? 'w-32 opacity-100' : 'w-0 opacity-0'}`}>
          <div className="absolute inset-0 shimmer" />
        </div>

        {/* Main headline with translucent animated black background */}
        <div className={`glass rounded-3xl p-8 md:p-12 mb-6 max-w-5xl relative z-10 transition-all duration-900 delay-300 ${isInView ? 'opacity-100 translate-y-0 animate-letterSpacing' : 'opacity-0 translate-y-8'}`}>
          {/* Animated translucent black background */}
          <div className="absolute inset-0 bg-black/60 rounded-3xl backdrop-blur-lg animate-pulse opacity-80" />
          <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/60 to-black/40 rounded-3xl animate-energyPulse" />
          
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-white relative z-10">
            <span 
              className="inline-block text-white"
              style={{ 
                textShadow: '0 20px 40px rgba(0, 0, 0, 0.9), 0 10px 20px rgba(0, 0, 0, 0.8), 0 5px 10px rgba(0, 0, 0, 0.6), 0 2px 4px rgba(0, 0, 0, 0.4)',
                filter: 'drop-shadow(0 8px 16px rgba(0, 0, 0, 0.7))'
              }}
            >
              {displayedText}
              {displayedText.length < fullText.length && (
                <span className="animate-pulse text-[#C9A961]">|</span>
              )}
            </span>
            <br />
            {/* Enhanced gold gradient on second line */}
            <span 
              className="inline-block text-[#C9A961]"
              style={{ 
                textShadow: '0 20px 40px rgba(0, 0, 0, 0.9), 0 10px 20px rgba(0, 0, 0, 0.8), 0 5px 10px rgba(0, 0, 0, 0.6), 0 2px 4px rgba(0, 0, 0, 0.4)',
                filter: 'drop-shadow(0 8px 16px rgba(201, 169, 97, 0.5))'
              }}
            >
              {displayedSecondLine}
              {displayedSecondLine.length < secondLineText.length && displayedText.length === fullText.length && (
                <span className="animate-pulse text-[#C9A961]">|</span>
              )}
            </span>
          </h1>
        </div>

        {/* Subheadline in glass container */}
        <div className={`glass rounded-2xl p-6 mb-12 max-w-4xl relative z-10 transition-all duration-600 delay-600 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          <p 
            className="text-xl md:text-2xl text-gray-200"
            style={{ 
              textShadow: '0 15px 30px rgba(0, 0, 0, 0.8), 0 8px 16px rgba(0, 0, 0, 0.7), 0 4px 8px rgba(0, 0, 0, 0.5), 0 2px 4px rgba(0, 0, 0, 0.3)',
              filter: 'drop-shadow(0 6px 12px rgba(0, 0, 0, 0.6))'
            }}
          >
            Private fleet. Executive-class chauffeurs. Reserved access. Always pre-booked.
          </p>
        </div>

        {/* Enhanced CTAs with glassmorphism */}
        <div className={`flex flex-col sm:flex-row gap-4 justify-center items-center relative z-10 transition-all duration-600 delay-900 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          <a
            href="/book"
            className="relative px-12 py-5 bg-gradient-to-r from-velvet-gold to-amber-400 text-velvet-black font-semibold rounded-2xl shadow-lg shadow-velvet-gold/20 btn-primary transition-all hover:scale-105 hover:-translate-y-1 w-full sm:w-auto text-center"
          >
            <span 
              className="relative z-10 flex items-center justify-center gap-2"

            >
              Book Now
              <div className="w-2 h-2 bg-velvet-black rounded-full" />
            </span>
          </a>
          
          <button
            onClick={scrollToWhy}
            className="bg-white/10 backdrop-blur-sm border border-velvet-gold/50 px-12 py-5 text-velvet-gold font-semibold rounded-2xl hover:bg-velvet-gold/10 hover:shadow-lg hover:shadow-velvet-gold/20 transition-all duration-300 group btn-secondary hover:scale-105 hover:-translate-y-1 w-full sm:w-auto text-center"
          >
            <span 
              className="flex items-center justify-center gap-2"
              style={{ 
                textShadow: '0 10px 20px rgba(0, 0, 0, 0.7), 0 5px 10px rgba(0, 0, 0, 0.6), 0 2px 4px rgba(0, 0, 0, 0.4)',
                filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.5))'
              }}
            >
              Discover Velvet
              <div className="w-1 h-1 bg-velvet-gold rounded-full group-hover:animate-energyPulse" />
            </span>
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 z-10 transition-all duration-600 delay-1500 ${isInView ? 'opacity-100' : 'opacity-0'}`}>
        <div className="w-[1px] h-16 bg-gradient-to-b from-gold/60 to-transparent animate-energyPulse" />
      </div>
    </section>
  );
}
