import { useState } from 'react';
import { useIntersectionObserver } from '@/react-app/hooks/useIntersectionObserver';
import { Sparkles, Shield, Users, Lock, Calendar, Crown, ArrowLeft } from 'lucide-react';
const values = [{
  icon: Sparkles,
  title: 'Luxury Ride Experience',
  description: 'Premium comfort in every journey',
  details: ['Hand-picked, latest-generation luxury interiors', 'Chilled refreshments, bottled water, and soft tissues', 'Quiet cabin, climate pre-set, and seamless Bluetooth pairing', 'Discreet, smooth driving with route preferences honored']
}, {
  icon: Crown,
  title: 'Proprietary Private Fleet',
  description: 'Exclusive curated vehicles',
  details: ['Owned & maintained in-house for consistent standards', 'Mercedes-Benz / BMW sedans & SUVs; MPVs for groups', 'Daily detailing; proactive service & tire checks', 'Guaranteed model category at confirmation']
}, {
  icon: Users,
  title: 'Executive-Class Chauffeurs',
  description: 'Professionally trained drivers',
  details: ['Background-verified, uniformed, hospitality-trained', 'Defensive driving certified; route mastering for Delhi-NCR', 'Soft-skills: door assistance, luggage protocol, privacy first', 'English-proficient; special requests noted in advance']
}, {
  icon: Shield,
  title: 'Enhanced Safety Features',
  description: '24/7 monitoring and support',
  details: ['Live trip oversight by central concierge (24×7)', 'GPS tracking with geo-fenced routes on request', 'Sanitized vehicles; emergency kit & umbrella on board', 'Optional NDA & guest safety check-ins']
}, {
  icon: Calendar,
  title: 'Exclusively Pre-Booked Rides',
  description: 'Guaranteed availability',
  details: ['Predictable dispatch windows; zero surge or last-minute scramble', 'Fixed inclusions (hours/km) with transparent extras', 'Priority allocation for airport & event runs', 'Real-time confirmations and driver details ahead of travel']
}, {
  icon: Lock,
  title: 'Exclusive Reserved Access',
  description: 'VIP treatment always',
  details: ['Velvet lane at high-demand slots (subject to availability)', 'VIP arrival protocol & meet-assist options', 'Concierge escalation line for itinerary changes', 'Preferential upgrades for Velvet Club members']
}];
export default function ValueStack() {
  const {
    ref,
    isInView
  } = useIntersectionObserver({
    threshold: 0.2
  });
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set());
  const toggleCard = (index: number) => {
    setFlippedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };
  return <section id="why-velvet" className="py-24 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className={`text-center mb-16 transition-all duration-800 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 
            className="font-display text-4xl md:text-6xl font-bold mb-6 text-[#C9A961]"
            style={{ 
              textShadow: '0 20px 40px rgba(0, 0, 0, 0.9), 0 10px 20px rgba(0, 0, 0, 0.8), 0 5px 10px rgba(0, 0, 0, 0.6), 0 2px 4px rgba(0, 0, 0, 0.4)',
              filter: 'drop-shadow(0 8px 16px rgba(201, 169, 97, 0.5))'
            }}
          >
            Why Velvet ?
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">Velvet delivers a chauffeur service you can set your watch to curated cars, 
discreet professionals, and a concierge standard that anticipates every detail.</p>
        </div>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map((value, index) => {
          const Icon = value.icon;
          const isFlipped = flippedCards.has(index);
          return <div key={value.title} className={`group relative h-80 cursor-pointer transform-gpu flip-card-container ${isInView ? 'animate-fadeInUp animate-gentleHang' : 'opacity-0 translate-y-8'}`} style={{
            animationDelay: `${index * 0.15}s`
          }} onClick={() => toggleCard(index)}>
                <div className={`relative w-full h-full flip-card-inner ${isFlipped ? 'flipped' : ''}`}>
                  {/* Front Side */}
                  <div className="absolute inset-0 p-8 rounded-3xl overflow-hidden luxury-ease duration-500 transform-gpu flip-card-face" style={{
                background: 'linear-gradient(135deg, rgba(201, 169, 97, 0.08) 0%, rgba(18, 19, 21, 0.6) 50%, rgba(201, 169, 97, 0.12) 100%)',
                border: '1px solid rgba(201, 169, 97, 0.2)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
              }}>
                    {/* Animated gradient overlay */}
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-gold/5 via-transparent to-gold/10 opacity-0 group-hover:opacity-100 luxury-ease duration-700" style={{
                  background: 'linear-gradient(135deg, rgba(201, 169, 97, 0.2) 0%, transparent 40%, rgba(201, 169, 97, 0.25) 100%)'
                }} />
                    
                    {/* Radial gradient glow */}
                    <div className="absolute inset-0 rounded-3xl opacity-60 group-hover:opacity-100 luxury-ease duration-500" style={{
                  background: 'radial-gradient(circle at 50% 0%, rgba(201, 169, 97, 0.15) 0%, transparent 70%)'
                }} />
                    
                    <div className="relative z-10 flex flex-col justify-center h-full">
                      <div className="mb-6 w-16 h-16 rounded-2xl flex items-center justify-center group-hover:scale-110 luxury-ease duration-300 animate-breathe" style={{
                    background: 'linear-gradient(135deg, rgba(201, 169, 97, 0.2) 0%, rgba(201, 169, 97, 0.1) 100%)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(201, 169, 97, 0.3)',
                    boxShadow: '0 4px 20px rgba(201, 169, 97, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.15)'
                  }}>
                        <Icon className="w-8 h-8 text-gold group-hover:text-velvet-warm luxury-ease duration-300" />
                      </div>
                      <h3 className="font-display text-2xl font-semibold text-white mb-3 group-hover:text-gold luxury-ease duration-300">
                        {value.title}
                      </h3>
                      <p className="text-gray-300 group-hover:text-gray-100 luxury-ease duration-300 leading-relaxed mb-4">
                        {value.description}
                      </p>
                      <p className="text-gold text-sm font-medium">
                        Click to explore details →
                      </p>
                    </div>

                    {/* Corner accent with gradient */}
                    <div className="absolute top-4 right-4 w-12 h-12 rounded-full opacity-0 group-hover:opacity-100 luxury-ease duration-500 animate-energyPulse" style={{
                  background: 'radial-gradient(circle, rgba(201, 169, 97, 0.4) 0%, rgba(201, 169, 97, 0.1) 50%, transparent 100%)'
                }} />

                    {/* Bottom gradient accent */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 rounded-b-3xl opacity-0 group-hover:opacity-100 luxury-ease duration-500" style={{
                  background: 'linear-gradient(90deg, transparent 0%, rgba(201, 169, 97, 0.6) 50%, transparent 100%)'
                }} />
                  </div>

                  {/* Back Side */}
                  <div className="absolute inset-0 p-8 rounded-3xl overflow-hidden luxury-ease duration-500 transform-gpu flip-card-face flip-card-back" style={{
                background: 'linear-gradient(135deg, rgba(201, 169, 97, 0.12) 0%, rgba(18, 19, 21, 0.8) 50%, rgba(201, 169, 97, 0.15) 100%)',
                border: '1px solid rgba(201, 169, 97, 0.3)',
                boxShadow: '0 8px 32px rgba(201, 169, 97, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
              }}>
                    {/* Animated gradient overlay */}
                    <div className="absolute inset-0 rounded-3xl opacity-100" style={{
                  background: 'radial-gradient(circle at 30% 20%, rgba(201, 169, 97, 0.15) 0%, transparent 50%)'
                }} />
                    
                    <div className="relative z-10 h-full flex flex-col">
                      <div className="flex items-center justify-between mb-6">
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{
                      background: 'linear-gradient(135deg, rgba(201, 169, 97, 0.3) 0%, rgba(201, 169, 97, 0.2) 100%)',
                      border: '1px solid rgba(201, 169, 97, 0.4)'
                    }}>
                          <Icon className="w-6 h-6 text-gold" />
                        </div>
                        <button className="text-gold hover:text-white luxury-ease duration-300">
                          <ArrowLeft className="w-5 h-5" />
                        </button>
                      </div>
                      
                      <h3 className="font-display text-xl font-semibold text-gold mb-4">
                        {value.title}
                      </h3>
                      
                      <div className="flex-1 space-y-3">
                        {value.details.map((detail, detailIndex) => <div key={detailIndex} className="flex items-start space-x-3 group/item" style={{
                      animationDelay: `${detailIndex * 0.1}s`
                    }}>
                            <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0 group-hover/item:scale-125 luxury-ease duration-300" style={{
                        background: 'linear-gradient(45deg, #C9A961, #E5C878)'
                      }} />
                            <p className="text-gray-200 text-sm leading-relaxed group-hover/item:text-white luxury-ease duration-300">
                              {detail}
                            </p>
                          </div>)}
                      </div>
                      
                      <div className="mt-4 pt-4 border-t border-gold/20">
                        <p className="text-gold/80 text-xs text-center">
                          Click anywhere to flip back
                        </p>
                      </div>
                    </div>

                    {/* Decorative corner elements */}
                    <div className="absolute top-0 right-0 w-20 h-20 rounded-bl-3xl opacity-30" style={{
                  background: 'linear-gradient(225deg, rgba(201, 169, 97, 0.2) 0%, transparent 70%)'
                }} />
                    <div className="absolute bottom-0 left-0 w-16 h-16 rounded-tr-3xl opacity-20" style={{
                  background: 'linear-gradient(45deg, rgba(201, 169, 97, 0.3) 0%, transparent 70%)'
                }} />
                  </div>
                </div>
              </div>;
        })}
        </div>
      </div>
    </section>;
}
