import { Users, Briefcase, Star, Car } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatPrice } from '@/lib/utils';

interface VehicleCardProps {
  vehicle: any;
  quote: any;
  selected: boolean;
  onSelect: () => void;
  showCarrierFee?: boolean;
}

export default function VehicleCard({
  vehicle,
  quote,
  selected,
  onSelect,
  showCarrierFee = false
}: VehicleCardProps) {
  const isUltraLuxury = vehicle.category === 'ULTRA_LUXURY';
  const isLargeCapacity = vehicle.maxPassengers > 7;
  const requiresSpecialBooking = isUltraLuxury || isLargeCapacity;

  return (
    <button
      onClick={onSelect}
      className={cn(
        'relative w-full text-left rounded-[20px] p-6 transition-all duration-300 group overflow-hidden transform-gpu',
        'glass-card border border-velvet-line hover:border-velvet-line-strong',
        'focus:outline-none focus:ring-2 focus:ring-velvet-gold/50',
        selected && quote.directEligible
          ? 'border-velvet-gold bg-velvet-gold/5 glow-gold animate-morphGlow'
          : '',
        !quote.directEligible && 'opacity-75',
        quote.directEligible && 'hover:scale-[1.02] active:scale-[0.98]'
      )}
      disabled={!quote.directEligible}
    >
      {/* 72h Ribbon for Special Booking Required */}
      {requiresSpecialBooking && (
        <div className="absolute top-4 right-4 bg-warning text-velvet-black px-3 py-1 rounded-full text-xs font-semibold animate-wiggleIn z-10">
          72 hrs prior
        </div>
      )}

      {/* Vehicle Image */}
      <div className="relative h-32 bg-gradient-to-br from-velvet-deep to-velvet-black rounded-[14px] mb-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        
        {/* Category Badge */}
        <div className="absolute bottom-3 left-3 text-white z-10">
          <div className="text-xs font-medium opacity-80 bg-black/30 px-2 py-1 rounded-md backdrop-blur-sm">
            {vehicle.category?.replace('_', ' ') || 'LUXURY'}
          </div>
        </div>
        
        {/* Vehicle Image or Placeholder */}
        {vehicle.image ? (
          <img 
            src={vehicle.image} 
            alt={vehicle.displayName}
            className="w-full h-full object-cover"
            onError={(e) => {
              // Fallback to placeholder on image error
              e.currentTarget.style.display = 'none';
              const nextEl = e.currentTarget.nextElementSibling as HTMLElement;
              if (nextEl) {
                nextEl.style.display = 'flex';
              }
            }}
          />
        ) : null}
        
        {/* Placeholder when no image or image fails to load */}
        <div className={cn(
          "absolute inset-0 flex items-center justify-center",
          vehicle.image ? "hidden" : "flex"
        )}>
          <div className="w-16 h-16 glass-card rounded-full flex items-center justify-center animate-breathe">
            <Car className="w-8 h-8 text-velvet-gold" />
          </div>
        </div>
      </div>

      {/* Vehicle Name and Price */}
      <div className="mb-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-lg text-white leading-tight">
            {vehicle.displayName}
          </h3>
          {selected && quote.directEligible && (
            <div className="w-5 h-5 bg-velvet-gold rounded-full flex items-center justify-center ml-2 flex-shrink-0 animate-scaleIn">
              <div className="w-2 h-2 bg-velvet-black rounded-full" />
            </div>
          )}
        </div>
        
        <div className="text-right">
          <span className="text-xl font-bold text-velvet-gold">
            {formatPrice(quote.price)}
          </span>
          {showCarrierFee && quote.carrierFee && (
            <div className="text-sm text-muted">
              +{formatPrice(quote.carrierFee)} carrier
            </div>
          )}
        </div>
      </div>

      {/* Vehicle Specs */}
      <div className="flex items-center gap-4 text-sm text-muted mb-4">
        <div className="flex items-center gap-1 animate-fadeInUp delay-100">
          <Users className="w-4 h-4" />
          <span>{vehicle.maxPassengers || vehicle.maxPax} guests</span>
        </div>
        <div className="flex items-center gap-1 animate-fadeInUp delay-200">
          <Briefcase className="w-4 h-4" />
          <span>{vehicle.luggageCapacity || vehicle.maxLuggage} bags</span>
        </div>
        {(vehicle.roofCarrierAvailable || vehicle.supportsCarrier) && (
          <div className="flex items-center gap-1 animate-fadeInUp delay-300">
            <Star className="w-4 h-4" />
            <span>Carrier</span>
          </div>
        )}
      </div>

      {/* Features */}
      {vehicle.features && vehicle.features.length > 0 && (
        <div className="text-xs text-muted animate-fadeInUp delay-400">
          {vehicle.features.slice(0, 2).join(' • ')}
        </div>
      )}

      {/* Special booking overlay */}
      {!quote.directEligible && (
        <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px] rounded-[20px] flex items-center justify-center">
          <div className="text-center p-4 animate-fadeInUp">
            <div className="text-warning font-semibold text-sm mb-1">Special Booking Required</div>
            <div className="text-xs text-muted">Click to enquire</div>
          </div>
        </div>
      )}

      {/* Selection glow effect */}
      {selected && quote.directEligible && (
        <div className="absolute inset-0 rounded-[20px] border-2 border-velvet-gold opacity-50 pointer-events-none animate-energyPulse" />
      )}
    </button>
  );
}
