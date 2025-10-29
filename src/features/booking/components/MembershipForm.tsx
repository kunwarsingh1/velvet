import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { Crown, Phone, MessageCircle, CheckCircle, Zap, Shield, Calendar } from 'lucide-react';
import { MembershipSchema, MembershipType } from '@/shared/types';
import { cn } from '@/lib/utils';

export default function MembershipForm() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm<MembershipType>({
    resolver: zodResolver(MembershipSchema),
  });

  const selectedPlan = watch('plan');

  const onSubmit = (data: MembershipType) => {
    console.log('Membership:', data);
    // Handle membership submission
  };

  const membershipPlans = [
    {
      code: '30_RIDES',
      name: 'Velvet 30',
      rides: 30,
      validity: 'Monthly',
      price: 'From ₹75,000',
      savings: '15% off per ride',
      features: [
        'Guaranteed time slots',
        'Priority dispatch',
        '24/7 concierge line',
        'Flexible scheduling'
      ]
    },
    {
      code: '60_RIDES',
      name: 'Velvet 60',
      rides: 60,
      validity: 'Quarterly',
      price: 'From ₹1,35,000',
      savings: '25% off per ride',
      popular: true,
      features: [
        'All Velvet 30 benefits',
        'Dedicated account manager',
        'Priority vehicle allocation',
        'Complimentary upgrades'
      ]
    },
    {
      code: '100_RIDES',
      name: 'Velvet 100',
      rides: 100,
      validity: 'Quarterly',
      price: 'From ₹2,00,000',
      savings: '35% off per ride',
      features: [
        'All Velvet 60 benefits',
        'Ultra luxury access',
        'Custom itineraries',
        'Executive protocols'
      ]
    }
  ];

  // Section component for consistency
  const Section = ({ title, children, className = "" }: { title: string; children: React.ReactNode; className?: string }) => (
    <motion.div 
      className={cn("space-y-6", className)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="relative">
        <div className="inline-block bg-gray-800/40 backdrop-blur-sm rounded-xl px-4 py-2 mb-4">
          <h3 className="text-muted-text font-body font-medium text-sm uppercase tracking-wider">{title}</h3>
        </div>
        <div className="section-divider" />
      </div>
      {children}
    </motion.div>
  );

  return (
    <div className="max-w-6xl mx-auto text-soft-sand">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-center mb-12"
      >
        <h2 className="font-display text-3xl md:text-4xl font-semibold text-soft-sand mb-4">
          <span className="text-velvet-gold">Velvet Club</span> Membership
        </h2>
        <p className="text-lg text-muted-text max-w-3xl mx-auto leading-relaxed">
          Exclusive membership for frequent travelers. Guaranteed time slots, priority dispatch, 
          and preferential pricing with dedicated concierge support.
        </p>
      </motion.div>

      {/* Membership Benefits */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-gold rounded-[20px] p-8 mb-12"
      >
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Crown className="w-6 h-6 text-velvet-gold" />
            <h3 className="font-display text-xl font-semibold text-soft-sand">Membership Benefits</h3>
          </div>
          <p className="text-muted-text">Elevate your travel experience with exclusive privileges</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center space-y-3">
            <div className="w-16 h-16 glass-card rounded-full flex items-center justify-center mx-auto">
              <Calendar className="w-8 h-8 text-velvet-gold" />
            </div>
            <h4 className="font-semibold text-soft-sand">Guaranteed Slots</h4>
            <p className="text-sm text-muted-text">Reserved time slots even during peak demand</p>
          </div>
          
          <div className="text-center space-y-3">
            <div className="w-16 h-16 glass-card rounded-full flex items-center justify-center mx-auto">
              <Zap className="w-8 h-8 text-velvet-gold" />
            </div>
            <h4 className="font-semibold text-soft-sand">Priority Dispatch</h4>
            <p className="text-sm text-muted-text">First preference for vehicle allocation</p>
          </div>
          
          <div className="text-center space-y-3">
            <div className="w-16 h-16 glass-card rounded-full flex items-center justify-center mx-auto">
              <MessageCircle className="w-8 h-8 text-velvet-gold" />
            </div>
            <h4 className="font-semibold text-soft-sand">Dedicated Concierge</h4>
            <p className="text-sm text-muted-text">Direct access to premium support line</p>
          </div>
          
          <div className="text-center space-y-3">
            <div className="w-16 h-16 glass-card rounded-full flex items-center justify-center mx-auto">
              <Shield className="w-8 h-8 text-velvet-gold" />
            </div>
            <h4 className="font-semibold text-soft-sand">Preferential Pricing</h4>
            <p className="text-sm text-muted-text">Significant savings on every ride</p>
          </div>
        </div>
      </motion.div>

      {/* Membership Plans */}
      <Section title="Select Your Plan">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {membershipPlans.map((plan) => (
            <motion.button
              key={plan.code}
              type="button"
              onClick={() => setValue('plan', plan.code as any)}
              className={cn(
                'relative p-8 text-left glass-card rounded-[20px] transition-all duration-300',
                'focus:outline-none focus:ring-2 focus:ring-velvet-gold/50',
                selectedPlan === plan.code
                  ? 'border-velvet-gold bg-velvet-gold/10 glow-gold'
                  : 'border-lines hover:border-input-hover'
              )}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-velvet-gold text-velvet-black px-4 py-1 rounded-full text-xs font-semibold">
                  Most Popular
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="font-display text-xl font-semibold text-soft-sand mb-2">{plan.name}</h3>
                <div className="text-3xl font-bold text-velvet-gold mb-1">{plan.rides}</div>
                <div className="text-sm text-soft-sand opacity-65 mb-4">rides per {plan.validity.toLowerCase()}</div>
                <div className="text-lg font-semibold text-soft-sand">{plan.price}</div>
                <div className="text-sm text-success font-medium">{plan.savings}</div>
              </div>

              <div className="space-y-3">
                {plan.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3 text-sm">
                    <CheckCircle className="w-4 h-4 text-velvet-gold flex-shrink-0" />
                    <span className="text-soft-sand opacity-90">{feature}</span>
                  </div>
                ))}
              </div>

              
            </motion.button>
          ))}
        </div>
      </Section>

      {/* Contact Form */}
      <div className="glass-card rounded-[20px] p-8 mt-12">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
          {/* Contact Information */}
          <Section title="Contact Information">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <label className="flex items-center gap-3 text-soft-sand font-medium">
                  <Crown className="w-5 h-5 text-soft-sand opacity-80" />
                  Full Name *
                </label>
                <input
                  {...register('name')}
                  type="text"
                  placeholder="Enter your full name"
                  className={cn(
                    'input-premium w-full',
                    errors.name && 'border-warning'
                  )}
                />
                {errors.name && (
                  <p className="text-error text-sm">{errors.name.message}</p>
                )}
              </div>

              <div className="space-y-4">
                <label className="flex items-center gap-3 text-soft-sand font-medium">
                  <Phone className="w-5 h-5 text-soft-sand opacity-80" />
                  Phone Number *
                </label>
                <input
                  {...register('phone')}
                  type="tel"
                  placeholder="+91 12345 67890"
                  className={cn(
                    'input-premium w-full',
                    errors.phone && 'border-warning'
                  )}
                />
                {errors.phone && (
                  <p className="text-error text-sm">{errors.phone.message}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <label className="text-soft-sand font-medium">Email</label>
                <input
                  {...register('email')}
                  type="email"
                  placeholder="your.email@example.com"
                  className="input-premium w-full"
                />
              </div>

              <div className="space-y-4">
                <label className="text-soft-sand font-medium">City</label>
                <input
                  {...register('city')}
                  type="text"
                  placeholder="Delhi NCR"
                  className="input-premium w-full"
                />
              </div>
            </div>
          </Section>

          {/* Travel Patterns */}
          <Section title="Travel Preferences">
            <div className="space-y-6">
              <div className="space-y-4">
                <label className="flex items-center gap-3 text-soft-sand font-medium">
                  <MessageCircle className="w-5 h-5 text-soft-sand opacity-80" />
                  Routine Routes
                </label>
                <textarea
                  {...register('routineRoutes')}
                  rows={4}
                  placeholder="Describe your typical routes (e.g., Home to Airport, Office to Hotel, etc.)"
                  className="input-premium w-full resize-none min-h-[100px] py-4 px-5"
                />
              </div>

              <div className="space-y-4">
                <label className="flex items-center gap-3 text-soft-sand font-medium">
                  <Calendar className="w-5 h-5 text-soft-sand opacity-80" />
                  Routine Times
                </label>
                <textarea
                  {...register('routineTimes')}
                  rows={4}
                  placeholder="Describe your typical travel times and frequency (e.g., Daily office commute 9 AM, Weekend airport trips, etc.)"
                  className="input-premium w-full resize-none min-h-[100px] py-4 px-5"
                />
              </div>
            </div>
          </Section>

          {/* Submit Button */}
          <motion.div 
            className="pt-8 flex flex-col items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <button
              type="submit"
              disabled={!isValid || !selectedPlan}
              className={cn(
                'btn-primary w-full max-w-md py-4 text-lg flex items-center justify-center gap-3',
                (!isValid || !selectedPlan) && 'opacity-50 cursor-not-allowed'
              )}
            >
              <Crown className="w-5 h-5" />
              Apply for Velvet Club Membership
            </button>
            <p className="text-center text-muted-text text-sm mt-4 max-w-md">
              Our membership team will contact you within 24 hours to finalize your enrollment
            </p>
          </motion.div>
        </form>
      </div>
    </div>
  );
}
