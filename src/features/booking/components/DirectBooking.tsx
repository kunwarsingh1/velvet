import { useBookingStore } from '@/features/booking/state/bookingStore';
import DynamicBackground from '@/react-app/components/DynamicBackground';
import Stepper from './Stepper';
import DirectDetailsStep from './DirectDetailsStep';
import DirectVehicleStep from './DirectVehicleStep';
import DirectPaymentStep from './DirectPaymentStep';
import DirectConfirmStep from './DirectConfirmStep';

export default function DirectBooking() {
  const { currentStep } = useBookingStore();

  const steps = [
    { key: 'details', component: DirectDetailsStep },
    { key: 'vehicle', component: DirectVehicleStep },
    { key: 'payment', component: DirectPaymentStep },
    { key: 'confirmation', component: DirectConfirmStep },
  ];

  const currentStepData = steps.find(step => step.key === currentStep);
  const CurrentStepComponent = currentStepData?.component;

  return (
    <div className="w-full max-w-7xl mx-auto relative">
      {/* Dynamic Background */}
      <DynamicBackground />
      
      <div className="relative z-10 animate-fadeInUp">
        {/* Sticky Stepper */}
        <Stepper />

        {/* Main Content Card */}
        <div className="glass-card-opaque rounded-[20px] overflow-hidden">
          {/* Content Area with Premium Spacing */}
          <div className="px-8 md:px-12 lg:px-16 py-12 md:py-16">
            {/* Step Content */}
            <div className="relative">
              {CurrentStepComponent && (
                <div key={currentStep}>
                  <CurrentStepComponent />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
