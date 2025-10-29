import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  MapPin,
  Calendar,
  Users,
  Briefcase,
  Plane,
  MessageCircle,
  Clock,
  Car,
  Route,
  Plus,
  Minus,
  Info,
} from 'lucide-react';
import { DirectDetailsSchema, DirectDetailsType } from '@/shared/types';
import { useBookingStore } from '@/features/booking/state/bookingStore';
import { POPULAR_LOCATIONS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

/** ------- FIX: Highly visible + / - circular icon button ------- */
const IconCircleButton = ({
  onClick,
  disabled,
  label,
  children,
}: {
  onClick: () => void;
  disabled?: boolean;
  label: string;
  children: React.ReactNode;
}) => (
  <button
    type="button"
    aria-label={label}
    onClick={onClick}
    disabled={disabled}
    className={cn(
      'relative shrink-0 grid place-items-center w-12 h-12 rounded-full',
      // base contrast on dark/glass backgrounds
      'bg-[#0F0F10] border border-[#3A3A3A] text-[#EDEAE3]',
      'shadow-[0_2px_12px_rgba(0,0,0,0.35)] backdrop-blur',
      // interaction
      'hover:bg-white/5 hover:border-[#525252] active:scale-95 transition',
      // focus ring in brand gold
      'focus:outline-none ring-offset-2 ring-offset-[#0F0F10] focus-visible:ring-2 focus-visible:ring-[#C9A961]',
      // disabled
      disabled ? 'opacity-45 cursor-not-allowed' : 'cursor-pointer'
    )}
  >
    {children}
  </button>
);
/** ---------------------------------------------------------------- */

export default function DirectDetailsStep() {
  const { details, updateDetails, nextStep } = useBookingStore();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm<DirectDetailsType>({
    resolver: zodResolver(DirectDetailsSchema),
    defaultValues: {
      mode: 'NORMAL',
      passengers: 1,
      luggage: 1,
      needCarrier: false,
      datetime: details.datetime || `${format(new Date(), 'yyyy-MM-dd')}T09:00`,
      ...details,
    },
  });

  const mode = watch('mode');
  const passengers = watch('passengers') || 1;
  const luggage = watch('luggage') || 0;

  const onSubmit = (data: DirectDetailsType) => {
    updateDetails(data);
    nextStep();
  };

  const setLocation = (field: 'pickup' | 'drop', location: string) => {
    setValue(field, location);
  };

  const adjustCount = (field: 'passengers' | 'luggage', delta: number) => {
    const currentValue = field === 'passengers' ? passengers : luggage;
    const newValue = Math.max(field === 'passengers' ? 1 : 0, currentValue + delta);
    const maxValue = field === 'passengers' ? 13 : 20;
    setValue(field, Math.min(newValue, maxValue), { shouldValidate: true });
  };

  // Section component for better organization
  const Section = ({
    title,
    children,
    className = '',
    delay = 0,
  }: {
    title: string;
    children: React.ReactNode;
    className?: string;
    delay?: number;
  }) => (
    <div
      className={cn('space-y-6 animate-fadeInUp', className)}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="relative">
        <div className="bg-charcoal/40 backdrop-blur-sm rounded-[14px] px-6 py-3 mb-6">
          <h3 className="text-muted-text font-body font-medium text-sm uppercase tracking-wider">
            {title}
          </h3>
        </div>
        <div className="section-divider" />
      </div>
      {children}
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto text-soft-sand">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
        {/* Ride Type - 50-50 Split Layout */}
        <Section title="Ride Type" delay={0}>
          <div className="grid grid-cols-2 gap-0 glass-card rounded-[20px] overflow-hidden animate-morphGlow">
            {/* Normal Section */}
            <button
              type="button"
              onClick={() => setValue('mode', 'NORMAL')}
              className={cn(
                'p-8 text-left transition-all duration-300 relative group border-r border-lines',
                mode === 'NORMAL'
                  ? 'bg-velvet-gold text-velvet-black'
                  : 'bg-charcoal text-soft-sand hover:bg-ink'
              )}
            >
              <div className="flex items-center gap-3 mb-4">
                <Route className="w-6 h-6" />
                <h4 className="text-lg font-semibold">Normal</h4>
              </div>
              <p className="text-sm opacity-90 leading-relaxed">
                Point-to-point journey with flexible pickup and drop locations
              </p>

              {/* Selection indicator */}
              <div
                className={cn(
                  'absolute top-4 right-4 w-5 h-5 border-2 rounded-full transition-all duration-200',
                  mode === 'NORMAL' ? 'border-velvet-black bg-velvet-black' : 'border-muted-text'
                )}
              >
                {mode === 'NORMAL' && <div className="w-2 h-2 bg-velvet-gold rounded-full m-0.5" />}
              </div>
            </button>

            {/* Hourly Section */}
            <button
              type="button"
              onClick={() => setValue('mode', 'HOURLY')}
              className={cn(
                'p-8 text-left transition-all duration-300 relative group',
                mode === 'HOURLY'
                  ? 'bg-velvet-gold text-velvet-black'
                  : 'bg-charcoal text-soft-sand hover:bg-ink'
              )}
            >
              <div className="flex items-center gap-3 mb-4">
                <Clock className="w-6 h-6" />
                <h4 className="text-lg font-semibold">Hourly</h4>
              </div>
              <p className="text-sm opacity-90 leading-relaxed">
                Hourly packages: 4h/40km, 8h/80km, 12h/120km. Extras billed only if used
              </p>

              {/* Selection indicator */}
              <div
                className={cn(
                  'absolute top-4 right-4 w-5 h-5 border-2 rounded-full transition-all duration-200',
                  mode === 'HOURLY' ? 'border-velvet-black bg-velvet-black' : 'border-muted-text'
                )}
              >
                {mode === 'HOURLY' && <div className="w-2 h-2 bg-velvet-gold rounded-full m-0.5" />}
              </div>
            </button>
          </div>
        </Section>

        {/* Locations */}
        <Section title="Locations" delay={100}>
          <div className="space-y-6">
            {/* Pickup Location */}
            <div className="space-y-4">
              <label className="flex items-center gap-3 text-soft-sand font-medium">
                <MapPin className="w-5 h-5 text-soft-sand opacity-80" />
                Pickup Location *
              </label>
              <input
                {...register('pickup')}
                type="text"
                placeholder="Terminal 3, IGI Airport"
                className={cn('input-premium w-full', errors.pickup && 'border-warning')}
              />
              {errors.pickup && (
                <p className="text-error text-sm flex items-center gap-2 animate-fadeInUp">
                  <Info className="w-4 h-4" />
                  {errors.pickup.message}
                </p>
              )}

              {/* Popular Locations */}
              <div className="flex flex-wrap gap-2">
                {POPULAR_LOCATIONS.slice(0, 6).map((location, index) => (
                  <button
                    key={location}
                    type="button"
                    onClick={() => setLocation('pickup', location)}
                    className="chip text-xs animate-fadeInUp"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    {location.length > 20 ? `${location.substring(0, 20)}...` : location}
                  </button>
                ))}
              </div>
            </div>

            {/* Drop Location - Only for Normal Mode */}
            {mode === 'NORMAL' && (
              <div className="space-y-4 animate-fadeInUp">
                <label className="flex items-center gap-3 text-soft-sand font-medium">
                  <MapPin className="w-5 h-5 text-success opacity-80" />
                  Drop Location
                </label>
                <input
                  {...register('drop')}
                  type="text"
                  placeholder="Enter destination"
                  className="input-premium w-full"
                />
              </div>
            )}
          </div>
        </Section>

        {/* Schedule */}
        <Section title="Schedule" delay={200}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <label className="flex items-center gap-3 text-soft-sand font-medium">
                <Calendar className="w-5 h-5 text-soft-sand opacity-80" />
                Date *
              </label>
              <input
                type="date"
                min={format(new Date(), 'yyyy-MM-dd')}
                className={cn('input-premium w-full', errors.datetime && 'border-warning')}
                onChange={(e) => {
                  const date = e.target.value;
                  const time = watch('datetime')?.split('T')[1] || '09:00';
                  if (date) {
                    setValue('datetime', `${date}T${time}`, { shouldValidate: true });
                  }
                }}
                defaultValue={watch('datetime')?.split('T')[0] || format(new Date(), 'yyyy-MM-dd')}
              />
              {errors.datetime && (
                <p className="text-error text-sm flex items-center gap-2 animate-fadeInUp">
                  <Info className="w-4 h-4" />
                  {errors.datetime.message}
                </p>
              )}
            </div>

            <div className="space-y-4">
              <label className="flex items-center gap-3 text-soft-sand font-medium">
                <Clock className="w-5 h-5 text-soft-sand opacity-80" />
                Time *
              </label>
              <input 
                type="time" 
                className={cn('input-premium w-full', errors.datetime && 'border-warning')}
                onChange={(e) => {
                  const date = watch('datetime')?.split('T')[0] || format(new Date(), 'yyyy-MM-dd');
                  const time = e.target.value;
                  if (time) {
                    setValue('datetime', `${date}T${time}`, { shouldValidate: true });
                  }
                }}
                defaultValue={watch('datetime')?.split('T')[1] || ''}
              />
              {errors.datetime && (
                <p className="text-error text-sm flex items-center gap-2 animate-fadeInUp">
                  <Info className="w-4 h-4" />
                  {errors.datetime.message}
                </p>
              )}
            </div>
          </div>
        </Section>

        {/* Hourly Packages - Only for Hourly Mode */}
        {mode === 'HOURLY' && (
          <Section title="Package Selection" delay={300}>
            <div className="grid grid-cols-1 gap-4">
              {[
                { code: '4H40KM', label: '4 hours / 40 km', price: 'From ₹3,200' },
                { code: '8H80KM', label: '8 hours / 80 km', price: 'From ₹5,600', popular: true },
                { code: '12H120KM', label: '12 hours / 120 km', price: 'From ₹7,800' },
              ].map((pkg, index) => (
                <button
                  key={pkg.code}
                  type="button"
                  onClick={() => setValue('packageCode', pkg.code as any)}
                  className={cn(
                    'relative p-6 text-left rounded-[20px] transition-all duration-300 group animate-fadeInUp',
                    watch('packageCode') === pkg.code
                      ? 'bg-velvet-gold/20 border-2 border-velvet-gold shadow-[0_0_24px_rgba(201,169,97,0.3)]'
                      : 'glass-card border-lines hover:border-input-hover'
                  )}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {pkg.popular && (
                    <div className="absolute -top-2 left-6 px-3 py-1 bg-velvet-gold text-velvet-black text-xs font-semibold rounded-full animate-wiggleIn">
                      Most Popular
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <div>
                      <div className={cn(
                        "font-semibold text-lg mb-1",
                        watch('packageCode') === pkg.code ? 'text-velvet-gold' : 'text-soft-sand'
                      )}>{pkg.label}</div>
                      <div className={cn(
                        "text-sm opacity-65",
                        watch('packageCode') === pkg.code ? 'text-velvet-gold' : 'text-soft-sand'
                      )}>Includes extras if used</div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-lg text-velvet-gold">{pkg.price}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </Section>
        )}

        {/* Capacity */}
        <Section title="Capacity" delay={400}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Passengers Stepper */}
            <div className="space-y-4">
              <label className="flex items-center gap-3 text-soft-sand font-medium">
                <Users className="w-5 h-5 text-soft-sand opacity-80" />
                Passengers *
              </label>
              <div className="flex items-center gap-4">
                <IconCircleButton
                  label="Decrease passengers"
                  onClick={() => adjustCount('passengers', -1)}
                  disabled={passengers <= 1}
                >
                  <Minus className="w-5 h-5" strokeWidth={2.5} />
                </IconCircleButton>

                <div className="flex-1 text-center">
                  <span className="text-2xl font-semibold text-soft-sand">{passengers}</span>
                  <p className="text-xs text-soft-sand opacity-65">passengers</p>
                </div>

                <IconCircleButton
                  label="Increase passengers"
                  onClick={() => adjustCount('passengers', 1)}
                  disabled={passengers >= 13}
                >
                  <Plus className="w-5 h-5" strokeWidth={2.5} />
                </IconCircleButton>
              </div>
              {errors.passengers && (
                <p className="text-error text-sm flex items-center gap-2 animate-fadeInUp">
                  <Info className="w-4 h-4" />
                  {errors.passengers.message}
                </p>
              )}
            </div>

            {/* Luggage Stepper */}
            <div className="space-y-4">
              <label className="flex items-center gap-3 text-soft-sand font-medium">
                <Briefcase className="w-5 h-5 text-soft-sand opacity-80" />
                Luggage
              </label>
              <div className="flex items-center gap-4">
                <IconCircleButton
                  label="Decrease luggage"
                  onClick={() => adjustCount('luggage', -1)}
                  disabled={luggage <= 0}
                >
                  <Minus className="w-5 h-5" strokeWidth={2.5} />
                </IconCircleButton>

                <div className="flex-1 text-center">
                  <span className="text-2xl font-semibold text-soft-sand">{luggage}</span>
                  <p className="text-xs text-soft-sand opacity-65">bags</p>
                </div>

                <IconCircleButton
                  label="Increase luggage"
                  onClick={() => adjustCount('luggage', 1)}
                  disabled={luggage >= 20}
                >
                  <Plus className="w-5 h-5" strokeWidth={2.5} />
                </IconCircleButton>
              </div>
            </div>
          </div>
        </Section>

        {/* Extras */}
        <Section title="Extras" delay={500}>
          <div className="space-y-6">
            {/* Roof Carrier */}
            <div className="glass-card rounded-[20px] p-6 animate-fadeInUp">
              <label className="flex items-center gap-4 cursor-pointer">
                <input {...register('needCarrier')} type="checkbox" className="checkbox-premium" />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-soft-sand">Add roof carrier</span>
                    <div className="relative group">
                      <Info className="w-4 h-4 text-muted-text cursor-help" />
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-ink text-soft-sand text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        Adds extra luggage capacity (+₹500); weather-dependent
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-soft-sand opacity-65">
                    Additional luggage capacity for ₹500
                  </p>
                </div>
                <span className="price-badge">+₹500</span>
              </label>
            </div>

            {/* Flight/Train Number */}
            <div className="space-y-4 animate-fadeInUp delay-100">
              <label className="flex items-center gap-3 text-soft-sand font-medium">
                <Plane className="w-5 h-5 text-soft-sand opacity-80" />
                Flight/Train Number
              </label>
              <input
                {...register('flightOrTrain')}
                type="text"
                placeholder="e.g., AI 123, 12345 (Train)"
                className="input-premium w-full"
              />
            </div>

            {/* Additional Notes */}
            <div className="space-y-4 animate-fadeInUp delay-200">
              <label className="flex items-center gap-3 text-soft-sand font-medium">
                <MessageCircle className="w-5 h-5 text-soft-sand opacity-80" />
                Additional Notes
              </label>
              <textarea
                {...register('notes')}
                rows={4}
                placeholder="Any special requirements, preferences, or instructions..."
                className="input-premium w-full resize-none min-h-[100px] py-4 px-5"
              />
            </div>
          </div>
        </Section>

        {/* Continue Button */}
        <div className="pt-8 animate-fadeInUp delay-600">
          <button
            type="submit"
            disabled={!isValid}
            className={cn(
              'btn-primary w-full py-4 text-lg flex items-center justify-center gap-3 transform-gpu hover:scale-[1.02] active:scale-[0.98]',
              !isValid && 'opacity-50 cursor-not-allowed'
            )}
          >
            <Car className="w-5 h-5" />
            Continue to Vehicle Selection
          </button>
        </div>
      </form>
    </div>
  );
}
