import { useEffect } from 'react';
import * as Tabs from '@radix-ui/react-tabs';
import { useBookingStore } from '@/features/booking/state/bookingStore';
import DynamicBackground from '@/react-app/components/DynamicBackground';
import DirectBooking from '@/features/booking/components/DirectBooking';
import SpecialBookingForm from '@/features/booking/components/SpecialBookingForm';
import MembershipForm from '@/features/booking/components/MembershipForm';
import { useIntersectionObserver } from '@/react-app/hooks/useIntersectionObserver';

import { cn } from '@/lib/utils';

export default function BookPage() {
  const { currentTab, setTab, reset } = useBookingStore();
  const { ref: heroRef, isInView } = useIntersectionObserver({ threshold: 0.3 });

  useEffect(() => {
    reset();
  }, [reset]);

  const tabs = [
    { 
      value: 'direct', 
      label: 'Direct Booking'
    },
    { 
      value: 'special', 
      label: 'Special Booking (72h)'
    },
    { 
      value: 'membership', 
      label: 'Velvet Club'
    },
  ];

  return (
    <div className="min-h-screen relative">
      {/* Interactive Dynamic Background */}
      <DynamicBackground />
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-6 py-12">
        {/* Hero Section - Compact */}
        <div
          ref={heroRef}
          className={`text-center mb-12 relative transition-all duration-800 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h1 className={`font-display text-4xl md:text-6xl font-semibold mb-4 relative z-10 transition-all duration-800 delay-200 ${
            isInView ? 'opacity-100 scale-100 animate-letterSpacing' : 'opacity-0 scale-95'
          }`}>
            <span className="text-soft-sand">Reserve Your </span>
            <span className="text-velvet-gold">Velvet Ride</span>
          </h1>
          
          <p className={`font-body text-lg md:text-xl text-muted-text max-w-3xl mx-auto leading-relaxed relative z-10 transition-all duration-600 delay-400 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
          }`}>
            Immerse yourself in luxury travel with our executive-class chauffeur service.
            <br />
            <span className="text-velvet-gold font-medium">Every journey, an experience.</span>
          </p>
          
          {/* Decorative line */}
          <div className={`h-px bg-gradient-to-r from-transparent via-velvet-gold to-transparent mx-auto mt-6 transition-all duration-1000 delay-800 ${
            isInView ? 'w-32 opacity-100' : 'w-0 opacity-0'
          }`} />
        </div>

        {/* Booking Interface */}
        <div className={`w-full transition-all duration-800 delay-300 ${
          isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <Tabs.Root
            value={currentTab}
            onValueChange={(value) => setTab(value as any)}
            className="w-full"
          >
            {/* Premium Pill Tabs */}
            <div className="mb-12">
              <div className={`relative max-w-4xl mx-auto transition-all duration-600 delay-400 ${
                isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
              }`}>
                {/* Glass Background Container */}
                <div className="relative glass-card-opaque rounded-[20px] p-2 animate-morphGlow">
                  
                  {/* Active Tab Background Slider */}
                  <div
                    className="absolute top-2 bottom-2 bg-velvet-gold rounded-[14px] shadow-lg transition-all duration-400 luxury-ease"
                    style={{
                      left: currentTab === 'direct' ? '0.5rem' : 
                           currentTab === 'special' ? 'calc(33.333% + 0.17rem)' : 
                           'calc(66.666% + 0.33rem)',
                      width: 'calc(33.333% - 0.33rem)',
                    }}
                  />

                  {/* Tab Buttons */}
                  <Tabs.List className="relative grid grid-cols-3 gap-1 z-10">
                    {tabs.map((tab, index) => (
                      <Tabs.Trigger
                        key={tab.value}
                        value={tab.value}
                        className={cn(
                          'relative px-4 py-3 text-center transition-all duration-300 rounded-[14px]',
                          'focus:outline-none font-medium text-sm md:text-base',
                          'hover:scale-[1.02] active:scale-[0.98] transform-gpu',
                          currentTab === tab.value ? 'text-velvet-black z-20 font-semibold' : 'text-soft-sand z-10',
                        )}
                        style={{
                          animationDelay: `${index * 0.1}s`,
                        }}
                        onMouseEnter={(e) => {
                          if (currentTab !== tab.value) {
                            e.currentTarget.style.transform = 'scale(1.02)';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (currentTab !== tab.value) {
                            e.currentTarget.style.transform = 'scale(1)';
                          }
                        }}
                      >
                        <span className="relative z-10 block transition-all duration-300">
                          {tab.label}
                        </span>

                        {/* Golden glow on hover for active tab */}
                        {currentTab === tab.value && (
                          <div className="absolute inset-0 rounded-[14px] opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none" 
                            style={{
                              boxShadow: '0 0 20px rgba(201, 169, 97, 0.6), inset 0 0 20px rgba(201, 169, 97, 0.2)'
                            }}
                          />
                        )}

                        {/* Subtle glow on hover for inactive tabs */}
                        {currentTab !== tab.value && (
                          <div className="absolute inset-0 rounded-[14px] bg-white/0 hover:bg-white/5 transition-all duration-300" />
                        )}
                      </Tabs.Trigger>
                    ))}
                  </Tabs.List>

                  {/* Subtle glow effect */}
                  <div className="absolute inset-0 rounded-[20px] glow-gold-soft pointer-events-none animate-energyPulse" />
                </div>
              </div>
            </div>

            {/* Tab Content */}
            <div className="relative">
              <Tabs.Content value="direct" className="focus:outline-none">
                <div className="animate-fadeInUp">
                  <DirectBooking />
                </div>
              </Tabs.Content>

              <Tabs.Content value="special" className="focus:outline-none">
                <div className="animate-fadeInUp">
                  <div className="glass-card-opaque rounded-[20px] p-8 md:p-12 animate-morphGlow">
                    <div className="relative z-10">
                      <SpecialBookingForm />
                    </div>
                  </div>
                </div>
              </Tabs.Content>

              <Tabs.Content value="membership" className="focus:outline-none">
                <div className="animate-fadeInUp">
                  <div className="glass-card-opaque rounded-[20px] p-8 md:p-12 animate-morphGlow">
                    <div className="relative z-10">
                      <MembershipForm />
                    </div>
                  </div>
                </div>
              </Tabs.Content>
            </div>
          </Tabs.Root>
        </div>
      </div>
    </div>
  );
}
