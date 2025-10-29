import { Check } from 'lucide-react';
import { useBookingSelectors } from '@/features/booking/state/bookingStore';
import { cn } from '@/lib/utils';

export default function Stepper() {
  const { currentStep } = useBookingSelectors();

  const steps = [
    { key: 'details', label: 'Details', number: 1 },
    { key: 'vehicle', label: 'Vehicle', number: 2 },
    { key: 'payment', label: 'Payment', number: 3 },
    { key: 'confirmation', label: 'Confirmed', number: 4 },
  ];

  const currentStepIndex = steps.findIndex(step => step.key === currentStep);

  return (
    <div className="sticky top-2 md:top-4 z-20 mb-6 md:mb-8 animate-fadeInDown px-2 sm:px-0">
      <div className="flex justify-center">
        <div className="flex items-center justify-between w-full max-w-2xl bg-velvet-deep/80 backdrop-blur-xl rounded-[16px] md:rounded-[20px] px-3 sm:px-4 md:px-6 py-3 md:py-4 border border-velvet-line shadow-lg glass-card">
          {steps.map((step, index) => {
            const isActive = index === currentStepIndex;
            const isCompleted = index < currentStepIndex;
            
            return (
              <div key={step.key} className="flex items-center flex-1">
                {/* Step Pill */}
                <div 
                  className={cn(
                    'flex items-center justify-center w-full min-w-0 text-xs sm:text-sm transition-all duration-300 transform-gpu',
                    'px-2 sm:px-3 py-2 rounded-[12px] md:rounded-[14px]',
                    isActive && 'bg-velvet-gold/20 border border-velvet-gold/30',
                    isCompleted && 'bg-white/10 border border-white/20',
                    !isActive && !isCompleted && 'bg-transparent border border-transparent'
                  )}
                  style={{
                    animationDelay: `${index * 0.1}s`,
                  }}
                >
                  {/* Step Number/Check */}
                  <div
                    className={cn(
                      'flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 rounded-full transition-all duration-300 flex-shrink-0',
                      isActive && 'bg-velvet-gold text-velvet-black',
                      isCompleted && 'bg-white/20 text-white',
                      !isActive && !isCompleted && 'bg-white/10 text-white/60'
                    )}
                  >
                    {isCompleted ? (
                      <Check className="w-3 h-3 sm:w-4 sm:h-4 animate-wiggleIn" />
                    ) : (
                      <span className="font-semibold text-xs">{step.number}</span>
                    )}
                  </div>
                  
                  {/* Step Label - Hidden on very small screens, shown on sm+ */}
                  <span className={cn(
                    'font-medium transition-all duration-300 ml-2 truncate',
                    'hidden xs:block',
                    isActive && 'text-velvet-gold',
                    isCompleted && 'text-white/80', 
                    !isActive && !isCompleted && 'text-white/60'
                  )}>
                    {step.label}
                  </span>
                </div>
                
                {/* Progress Line - Now shows on all screens but smaller on mobile */}
                {index < steps.length - 1 && (
                  <div
                    className={cn(
                      'w-2 sm:w-4 md:w-8 h-0.5 mx-1 sm:mx-2 md:mx-3 rounded-full transition-all duration-500 flex-shrink-0',
                      isCompleted ? 'bg-velvet-gold/60 animate-scaleIn' : 'bg-white/20'
                    )}
                    style={{
                      animationDelay: `${index * 0.1 + 0.2}s`,
                      transform: 'scaleX(1)',
                      transformOrigin: 'left',
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Progress Underline */}
      <div className="w-full max-w-lg mx-auto mt-3 md:mt-4 px-4">
        <div className="h-0.5 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-velvet-gold/60 to-velvet-gold rounded-full transition-all duration-600 luxury-ease"
            style={{
              width: `${((currentStepIndex + 1) / steps.length) * 100}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
}
