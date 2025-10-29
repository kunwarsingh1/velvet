import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, Shield, Car, Sparkles, Star, CheckCircle, AlertCircle, Crown, Users } from 'lucide-react';
import { useBookingStore } from '@/features/booking/state/bookingStore';
import { client } from '@/lib/apiClient';
import { VEHICLES } from '@/lib/vehicleMatrix';
import VehicleCard from './VehicleCard';

// Premium loading component
function PremiumLoading() {
  return (
    <div className="flex flex-col items-center justify-center py-20 relative animate-scaleIn">
      <div className="relative">
        <div className="w-16 h-16 border-2 border-velvet-line rounded-full animate-spin" />
        <div className="absolute inset-0 w-16 h-16 border-2 border-transparent border-t-velvet-gold rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
        
        <div className="absolute inset-0 flex items-center justify-center animate-breathe">
          <Car className="w-6 h-6 text-velvet-gold" />
        </div>
      </div>
      
      <p className="text-lg text-white mt-6 font-medium animate-energyPulse">
        Curating your luxury fleet...
      </p>
    </div>
  );
}

// Enhanced booking summary component
function BookingSummary({ details, quote }: any) {
  return (
    <div className="rounded-[20px] p-6 mb-8 animate-fadeInUp glass-card border border-velvet-line">
      <div className="flex items-center gap-3 mb-6">
        <CheckCircle className="w-5 h-5 text-success" />
        <h3 className="font-display text-xl font-semibold text-white">Journey Summary</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
        <div className="space-y-1 animate-fadeInUp delay-100">
          <span className="text-muted font-medium">From</span>
          <p className="text-white font-medium truncate">{details.pickup}</p>
        </div>
        
        {details.drop && (
          <div className="space-y-1 animate-fadeInUp delay-200">
            <span className="text-muted font-medium">To</span>
            <p className="text-white font-medium truncate">{details.drop}</p>
          </div>
        )}
        
        <div className="space-y-1 animate-fadeInUp delay-300">
          <span className="text-muted font-medium">Guests</span>
          <p className="text-white font-medium">{details.passengers} passengers</p>
        </div>
        
        <div className="space-y-1 animate-fadeInUp delay-400">
          <span className="text-muted font-medium">Experience</span>
          <p className="text-white font-medium">
            {details.mode === 'HOURLY' 
              ? `${details.packageCode?.replace('H', ' Hours / ').replace('KM', ' KM')}` 
              : 'Point-to-Point'
            }
          </p>
        </div>
      </div>
      
      {quote?.breakdownNote && (
        <div className="mt-6 pt-6 border-t border-velvet-line animate-fadeInUp delay-300">
          <div className="flex items-start gap-3">
            <Star className="w-4 h-4 text-velvet-gold mt-0.5 flex-shrink-0" />
            <p className="text-muted text-sm leading-relaxed">{quote.breakdownNote}</p>
          </div>
        </div>
      )}
    </div>
  );
}

// Fleet Category Header Component
function FleetCategoryHeader({ 
  title, 
  description, 
  icon: Icon, 
  availableCount, 
  totalCount,
  requiresSpecial = false 
}: {
  title: string;
  description: string;
  icon: any;
  availableCount: number;
  totalCount: number;
  requiresSpecial?: boolean;
}) {
  return (
    <div className="flex items-center justify-between mb-6 animate-fadeInUp">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 glass-card rounded-full flex items-center justify-center animate-breathe">
          <Icon className="w-6 h-6 text-velvet-gold" />
        </div>
        <div>
          <h3 className="font-display text-2xl font-semibold text-white mb-1">{title}</h3>
          <p className="text-muted">{description}</p>
        </div>
      </div>
      
      <div className="text-right">
        <div className="text-lg font-semibold text-white">
          {availableCount} / {totalCount}
        </div>
        <div className="text-sm text-muted">
          {requiresSpecial ? '72hrs advance' : 'Available'}
        </div>
      </div>
    </div>
  );
}

// 72h Modal Component
function SpecialBookingModal({ isOpen, onClose, vehicleCode }: { isOpen: boolean; onClose: () => void; vehicleCode: string | null }) {
  if (!isOpen || !vehicleCode) return null;

  const vehicle = VEHICLES.find(v => v.code === vehicleCode);

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeInUp"
      onClick={onClose}
    >
      <div
        className="rounded-[20px] p-8 max-w-md w-full animate-scaleIn glass-card border border-velvet-line"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-center">
          <div className="w-16 h-16 bg-warning/20 rounded-full flex items-center justify-center mx-auto mb-4 animate-energyPulse">
            <AlertCircle className="w-8 h-8 text-warning" />
          </div>
          
          <h3 className="font-display text-xl font-semibold text-white mb-4">
            {vehicle?.displayName} - Special Booking Required
          </h3>
          
          <p className="text-muted mb-6 leading-relaxed">
            Ultra Luxury & 8-seaters are curated on request. Please book{' '}
            <span className="text-velvet-gold font-semibold">72 hours</span> in advance. 
            We'll confirm via WhatsApp.
          </p>
          
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="btn-secondary flex-1 py-3 transform-gpu hover:scale-105 active:scale-95"
            >
              Back to Fleet
            </button>
            <button
              onClick={() => {
                // Handle special booking redirect
                onClose();
              }}
              className="btn-primary flex-1 py-3 transform-gpu hover:scale-105 active:scale-95"
            >
              Enquire via Special
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DirectVehicleStep() {
  const {
    details,
    vehicle,
    updateVehicle,
    nextStep,
    prevStep,
    quote,
    setQuote,
    setQuoteLoading,
    setQuoteError,
  } = useBookingStore();

  const [selectedVehicleCode, setSelectedVehicleCode] = useState<string | null>(vehicle.vehicleCode || null);
  const [modalVehicle, setModalVehicle] = useState<string | null>(null);

  useEffect(() => {
    if (details.pickup && details.datetime && details.passengers) {
      fetchQuote();
    }
  }, [details]);

  const fetchQuote = async () => {
    if (!details.pickup || !details.datetime || !details.passengers) return;

    setQuoteLoading(true);
    setQuoteError(null);

    try {
      const quoteRequest = {
        pickup: details.pickup,
        drop: details.drop,
        datetime: details.datetime,
        passengers: details.passengers,
        luggageCount: details.luggage || 0,
        needCarrier: details.needCarrier || false,
        mode: details.mode || 'NORMAL',
        packageCode: details.packageCode,
      };

      const response = await client.getQuote(quoteRequest);
      setQuote(response);
    } catch (error) {
      setQuoteError(error instanceof Error ? error.message : 'Failed to get quote');
    } finally {
      setQuoteLoading(false);
    }
  };

  const handleVehicleSelect = (vehicleCode: string) => {
    const vehicleQuote = quote?.vehicles.find(v => v.vehicleCode === vehicleCode);
    
    if (vehicleQuote?.directEligible) {
      setSelectedVehicleCode(vehicleCode);
      updateVehicle({ vehicleCode });
    } else {
      setModalVehicle(vehicleCode);
    }
  };

  const handleContinue = () => {
    if (selectedVehicleCode) {
      nextStep();
    }
  };

  if (!quote) {
    return <PremiumLoading />;
  }

  // Organize vehicles by category
  const luxuryVehicles = quote.vehicles.filter(v => {
    const spec = VEHICLES.find(spec => spec.code === v.vehicleCode);
    return spec?.category === 'LUXURY';
  });

  const ultraLuxuryVehicles = quote.vehicles.filter(v => {
    const spec = VEHICLES.find(spec => spec.code === v.vehicleCode);
    return spec?.category === 'ULTRA_LUXURY';
  });

  const luxuryTravelVehicles = quote.vehicles.filter(v => {
    const spec = VEHICLES.find(spec => spec.code === v.vehicleCode);
    return spec?.category === 'LUXURY_TRAVEL';
  });

  const selectedVehicleQuote = quote.vehicles.find(v => v.vehicleCode === selectedVehicleCode);
  const selectedVehicleSpec = VEHICLES.find(v => v.code === selectedVehicleCode);

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 animate-fadeInDown">
        <div>
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-white mb-2">
            Select Your <span className="text-velvet-gold">Luxury Vessel</span>
          </h2>
          <p className="text-lg text-muted">Choose from our meticulously curated fleet categories</p>
        </div>
        
        <button
          onClick={prevStep}
          className="btn-secondary flex items-center gap-2 px-4 py-3 transform-gpu hover:scale-105 active:scale-95"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
      </div>

      {/* Booking Summary */}
      <BookingSummary details={details} quote={quote} />

      {/* Fleet Categories */}
      <div className="space-y-12">
        
        {/* Luxury Fleet - Direct Booking Available */}
        {luxuryVehicles.length > 0 && (
          <div className="animate-fadeInUp delay-200">
            <FleetCategoryHeader
              title="Luxury Fleet"
              description="Executive luxury vehicles available for immediate booking"
              icon={Sparkles}
              availableCount={luxuryVehicles.filter(v => v.directEligible).length}
              totalCount={luxuryVehicles.length}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {luxuryVehicles.map((vehicleQuote, index) => {
                const vehicleSpec = VEHICLES.find(v => v.code === vehicleQuote.vehicleCode);
                if (!vehicleSpec) return null;

                return (
                  <div
                    key={vehicleQuote.vehicleCode}
                    className="animate-fadeInUp"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <VehicleCard
                      vehicle={vehicleSpec}
                      quote={vehicleQuote}
                      selected={selectedVehicleCode === vehicleQuote.vehicleCode}
                      onSelect={() => handleVehicleSelect(vehicleQuote.vehicleCode)}
                      showCarrierFee={details.needCarrier}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Ultra Luxury Fleet - Special Booking Required */}
        {ultraLuxuryVehicles.length > 0 && (
          <div className="animate-fadeInUp delay-400">
            <FleetCategoryHeader
              title="Ultra Luxury Fleet"
              description="The pinnacle of automotive excellence, curated for discerning guests"
              icon={Crown}
              availableCount={0}
              totalCount={ultraLuxuryVehicles.length}
              requiresSpecial={true}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ultraLuxuryVehicles.map((vehicleQuote, index) => {
                const vehicleSpec = VEHICLES.find(v => v.code === vehicleQuote.vehicleCode);
                if (!vehicleSpec) return null;

                return (
                  <div
                    key={vehicleQuote.vehicleCode}
                    className="animate-fadeInUp"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <VehicleCard
                      vehicle={vehicleSpec}
                      quote={vehicleQuote}
                      selected={selectedVehicleCode === vehicleQuote.vehicleCode}
                      onSelect={() => handleVehicleSelect(vehicleQuote.vehicleCode)}
                      showCarrierFee={details.needCarrier}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Luxury Travel Fleet - Special Booking Required */}
        {luxuryTravelVehicles.length > 0 && (
          <div className="animate-fadeInUp delay-600">
            <FleetCategoryHeader
              title="Luxury Travel Fleet"
              description="Premium group travel vehicles for larger parties and special occasions"
              icon={Users}
              availableCount={0}
              totalCount={luxuryTravelVehicles.length}
              requiresSpecial={true}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {luxuryTravelVehicles.map((vehicleQuote, index) => {
                const vehicleSpec = VEHICLES.find(v => v.code === vehicleQuote.vehicleCode);
                if (!vehicleSpec) return null;

                return (
                  <div
                    key={vehicleQuote.vehicleCode}
                    className="animate-fadeInUp"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <VehicleCard
                      vehicle={vehicleSpec}
                      quote={vehicleQuote}
                      selected={selectedVehicleCode === vehicleQuote.vehicleCode}
                      onSelect={() => handleVehicleSelect(vehicleQuote.vehicleCode)}
                      showCarrierFee={details.needCarrier}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* No Vehicles Available */}
        {quote.vehicles.length === 0 && (
          <div className="text-center py-20 mb-12 animate-scaleIn">
            <div className="w-20 h-20 glass-card rounded-full flex items-center justify-center mx-auto mb-6 animate-breathe">
              <Shield className="w-10 h-10 text-muted" />
            </div>
            
            <h3 className="font-display text-xl font-semibold text-white mb-4">No Vehicles Available</h3>
            <p className="text-muted mb-8 max-w-md mx-auto leading-relaxed">
              We couldn't find any vehicles that match your current requirements. 
              Please adjust your selection or consider our Special Booking service.
            </p>
            
            <button
              onClick={prevStep}
              className="btn-primary px-8 py-3 transform-gpu hover:scale-105 active:scale-95"
            >
              Modify Journey Details
            </button>
          </div>
        )}
      </div>

      {/* Total Distance and Fare Summary */}
      {selectedVehicleCode && quote.vehicles.length > 0 && (
        <div className="sticky bottom-6 z-20 animate-fadeInUp delay-300 mt-12">
          <div className="rounded-[20px] p-6 glass-card border border-velvet-line">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              {/* Selected Vehicle Info */}
              <div className="text-white">
                <p className="text-sm text-muted mb-1">Selected Vehicle</p>
                <h4 className="font-semibold text-lg">
                  {selectedVehicleSpec?.displayName}
                </h4>
                <p className="text-sm text-muted mt-1">
                  {selectedVehicleSpec?.category?.replace('_', ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase())}
                </p>
              </div>

              {/* Distance and Fare Details */}
              <div className="space-y-3">
                {/* Total Distance */}
                <div className="flex items-center justify-between">
                  <span className="text-muted text-sm">Total Distance:</span>
                  <span className="text-white font-medium">
                    {quote.totalDistance ? `${Math.round(quote.totalDistance)} km` : 
                     details.mode === 'HOURLY' ? `${details.packageCode?.replace('H', 'H / ').replace('KM', ' KM')}` : 'Calculated at pickup'}
                  </span>
                </div>

                {/* Base Fare */}
                <div className="flex items-center justify-between">
                  <span className="text-muted text-sm">Base Fare:</span>
                  <span className="text-white font-medium">
                    {selectedVehicleQuote && formatPrice(selectedVehicleQuote.price)}
                  </span>
                </div>

                {/* Carrier Fee (if applicable) */}
                {details.needCarrier && selectedVehicleQuote?.carrierFee && (
                  <div className="flex items-center justify-between">
                    <span className="text-muted text-sm">Roof Carrier:</span>
                    <span className="text-white font-medium">
                      {formatPrice(selectedVehicleQuote.carrierFee)}
                    </span>
                  </div>
                )}

                {/* Total Fare */}
                <div className="flex items-center justify-between pt-2 border-t border-velvet-line">
                  <span className="text-white font-semibold">Total Fare:</span>
                  <span className="text-velvet-gold font-bold text-lg">
                    {selectedVehicleQuote && formatPrice(
                      selectedVehicleQuote.price + 
                      (details.needCarrier && selectedVehicleQuote.carrierFee ? selectedVehicleQuote.carrierFee : 0)
                    )}
                  </span>
                </div>
              </div>

              {/* Confirm and Pay Button */}
              <div className="flex justify-end">
                <button
                  onClick={handleContinue}
                  className="btn-primary px-8 py-4 flex items-center gap-3 transform-gpu hover:scale-105 active:scale-95 text-lg font-semibold"
                >
                  <span>Confirm and Pay</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Additional Info */}
            {quote.breakdownNote && (
              <div className="mt-4 pt-4 border-t border-velvet-line">
                <p className="text-muted text-sm">
                  <span className="text-velvet-gold">Note:</span> {quote.breakdownNote}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 72h Modal */}
      <SpecialBookingModal 
        isOpen={!!modalVehicle} 
        onClose={() => setModalVehicle(null)} 
        vehicleCode={modalVehicle} 
      />
    </div>
  );
}

function formatPrice(price: number): string {
  // Convert paise to rupees and format
  const rupees = price / 100;
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(rupees);
}
