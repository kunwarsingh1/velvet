import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Users, MessageCircle, Sparkles, Phone } from 'lucide-react';
import { SpecialBookingSchema, SpecialBookingType } from '@/shared/types';
import { cn } from '@/lib/utils';

export default function SpecialBookingForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SpecialBookingType>({
    resolver: zodResolver(SpecialBookingSchema),
  });

  const onSubmit = (data: SpecialBookingType) => {
    console.log('Special booking:', data);
    // Handle special booking submission
  };

  // Section component for consistency
  const Section = ({ title, children, className = "" }: { title: string; children: React.ReactNode; className?: string }) => (
    <motion.div 
      className={cn("space-y-6", className)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="relative">
        <div className="bg-charcoal/40 backdrop-blur-sm rounded-[14px] px-6 py-3 mb-6">
          <h3 className="text-muted-text font-body font-medium text-sm uppercase tracking-wider">{title}</h3>
        </div>
        <div className="section-divider" />
      </div>
      {children}
    </motion.div>
  );

  return (
    <div className="max-w-5xl mx-auto text-soft-sand">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-center mb-12"
      >
        <h2 className="font-display text-3xl md:text-4xl font-semibold text-soft-sand mb-4">
          Special <span className="text-velvet-gold">Experience</span>
        </h2>
        <p className="text-lg text-muted-text max-w-2xl mx-auto leading-relaxed">
          Ultra luxury vehicles, 8+ seaters, and special occasions require advance planning. 
          Share your requirements and we'll craft the perfect experience.
        </p>
      </motion.div>

      {/* Premium Features */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-gold rounded-[20px] p-8 mb-12"
      >
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="w-6 h-6 text-velvet-gold" />
            <h3 className="font-display text-xl font-semibold text-soft-sand">Exclusive Fleet Access</h3>
          </div>
          <p className="text-muted-text">72-hour advance booking ensures availability of our premium collection</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center space-y-3">
            <div className="w-16 h-16 glass-card rounded-full flex items-center justify-center mx-auto">
              <Sparkles className="w-8 h-8 text-velvet-gold" />
            </div>
            <h4 className="font-semibold text-soft-sand">Ultra Luxury</h4>
            <p className="text-sm text-muted-text">Rolls-Royce Ghost, Bentley Flying Spur, Maybach S-Class</p>
          </div>
          
          <div className="text-center space-y-3">
            <div className="w-16 h-16 glass-card rounded-full flex items-center justify-center mx-auto">
              <Users className="w-8 h-8 text-velvet-gold" />
            </div>
            <h4 className="font-semibold text-soft-sand">Large Groups</h4>
            <p className="text-sm text-muted-text">Toyota Vellfire 7, Mercedes V220D 7, Force Urbania 13</p>
          </div>
          
          <div className="text-center space-y-3">
            <div className="w-16 h-16 glass-card rounded-full flex items-center justify-center mx-auto">
              <Calendar className="w-8 h-8 text-velvet-gold" />
            </div>
            <h4 className="font-semibold text-soft-sand">Special Events</h4>
            <p className="text-sm text-muted-text">Weddings, corporate events, VIP delegations</p>
          </div>
        </div>
      </motion.div>

      {/* Contact Form */}
      <div className="glass-card rounded-[20px] p-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
          {/* Contact Information */}
          <Section title="Contact Information">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <label className="flex items-center gap-3 text-soft-sand font-medium">
                  <Users className="w-5 h-5 text-soft-sand opacity-80" />
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
                <label className="flex items-center gap-3 text-soft-sand font-medium">
                  <MessageCircle className="w-5 h-5 text-soft-sand opacity-80" />
                  Email
                </label>
                <input
                  {...register('email')}
                  type="email"
                  placeholder="your.email@example.com"
                  className="input-premium w-full"
                />
              </div>

              <div className="space-y-4">
                <label className="flex items-center gap-3 text-soft-sand font-medium">
                  <MapPin className="w-5 h-5 text-soft-sand opacity-80" />
                  City *
                </label>
                <input
                  {...register('city')}
                  type="text"
                  placeholder="Delhi NCR"
                  className={cn(
                    'input-premium w-full',
                    errors.city && 'border-warning'
                  )}
                />
                {errors.city && (
                  <p className="text-error text-sm">{errors.city.message}</p>
                )}
              </div>
            </div>
          </Section>

          {/* Event Details */}
          <Section title="Event Details">
            <div className="space-y-6">
              <div className="space-y-4">
                <label className="flex items-center gap-3 text-soft-sand font-medium">
                  <Calendar className="w-5 h-5 text-soft-sand opacity-80" />
                  Date & Time *
                </label>
                <input
                  {...register('datetime')}
                  type="datetime-local"
                  className={cn(
                    'input-premium w-full',
                    errors.datetime && 'border-warning'
                  )}
                />
                {errors.datetime && (
                  <p className="text-error text-sm">{errors.datetime.message}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <label className="flex items-center gap-3 text-soft-sand font-medium">
                    <Users className="w-5 h-5 text-soft-sand opacity-80" />
                    Passengers *
                  </label>
                  <input
                    {...register('passengers', { valueAsNumber: true })}
                    type="number"
                    min="1"
                    max="13"
                    placeholder="1"
                    className={cn(
                      'input-premium w-full',
                      errors.passengers && 'border-warning'
                    )}
                  />
                  {errors.passengers && (
                    <p className="text-error text-sm">{errors.passengers.message}</p>
                  )}
                </div>

                <div className="space-y-4">
                  <label className="flex items-center gap-3 text-soft-sand font-medium">
                    <MapPin className="w-5 h-5 text-soft-sand opacity-80" />
                    Luggage Count
                  </label>
                  <input
                    {...register('luggage', { valueAsNumber: true })}
                    type="number"
                    min="0"
                    max="20"
                    placeholder="0"
                    className="input-premium w-full"
                  />
                </div>

                <div className="space-y-4">
                  <label className="text-soft-sand font-medium">Roof Carrier</label>
                  <div className="flex items-center gap-3 p-4 glass-card rounded-[14px]">
                    <input
                      {...register('needCarrier')}
                      type="checkbox"
                      className="checkbox-premium"
                    />
                    <span className="text-soft-sand">Add roof carrier</span>
                    <span className="price-badge ml-auto">+₹500</span>
                  </div>
                </div>
              </div>
            </div>
          </Section>

          {/* Fleet Preferences */}
          <Section title="Fleet Preferences">
            <div className="space-y-4">
              <label className="text-white font-medium">Vehicle Categories</label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { value: 'ULTRA_LUXURY', label: 'Ultra Luxury', description: 'Rolls-Royce, Bentley, Maybach' },
                  { value: 'LUXURY_LARGE', label: 'Luxury Large', description: 'Mercedes V-Class, Toyota Vellfire' },
                  { value: 'GROUP_TRAVEL', label: 'Group Travel', description: 'Force Urbania 13-seater' }
                ].map((option) => (
                  <label key={option.value} className="glass-card rounded-[14px] p-4 cursor-pointer hover:border-velvet-line-strong transition-all">
                    <div className="flex items-start gap-3">
                      <input
                        {...register('fleetPreferences')}
                        type="checkbox"
                        value={option.value}
                        className="w-5 h-5 mt-1 text-velvet-gold bg-white/10 border-velvet-line-strong rounded focus:ring-velvet-gold/30"
                      />
                      <div>
                        <div className="font-medium text-white">{option.label}</div>
                        <div className="text-sm text-muted">{option.description}</div>
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </Section>

          {/* Special Requirements */}
          <Section title="Additional Information">
            <div className="space-y-6">
              <div className="space-y-4">
                <label className="flex items-center gap-3 text-white font-medium">
                  <Sparkles className="w-5 h-5 text-velvet-gold" />
                  Occasion (Optional)
                </label>
                <select
                  {...register('occasion')}
                  className="input-premium w-full"
                >
                  <option value="">Select occasion type</option>
                  <option value="WEDDING">Wedding</option>
                  <option value="CORPORATE">Corporate Event</option>
                  <option value="DELEGATION">VIP Delegation</option>
                  <option value="AIRPORT">Airport Transfer</option>
                  <option value="LEISURE">Leisure Travel</option>
                  <option value="OTHER">Other</option>
                </select>
              </div>

              <div className="space-y-4">
                <label className="flex items-center gap-3 text-white font-medium">
                  <MessageCircle className="w-5 h-5 text-velvet-gold" />
                  Special Requirements & Notes
                </label>
                <textarea
                  {...register('notes')}
                  rows={6}
                  placeholder="Please describe your event, specific vehicle preferences, special requirements, or any arrangements needed. Include details about decoration, refreshments, route preferences, or any VIP protocols required."
                  className="input-premium w-full resize-none min-h-[150px] py-4 px-5"
                />
                <p className="text-muted text-sm">
                  Our concierge team will review your requirements and provide a custom quote within 24 hours.
                </p>
              </div>

              <div className="space-y-4">
                <label className="text-soft-sand font-medium">Budget Range (Optional)</label>
                <select
                  {...register('budgetRange')}
                  className="input-premium w-full"
                >
                  <option value="">Select budget range</option>
                  <option value="UNDER_25K">Under ₹25,000</option>
                  <option value="25K_50K">₹25,000 - ₹50,000</option>
                  <option value="50K_100K">₹50,000 - ₹1,00,000</option>
                  <option value="ABOVE_100K">Above ₹1,00,000</option>
                </select>
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
              disabled={!isValid}
              className={cn(
                'btn-primary w-full max-w-md py-4 text-lg flex items-center justify-center gap-3',
                !isValid && 'opacity-50 cursor-not-allowed'
              )}
            >
              <MessageCircle className="w-5 h-5" />
              Send Enquiry to Concierge
            </button>
            <p className="text-center text-muted text-sm mt-4 max-w-md">
              You'll receive a WhatsApp confirmation and detailed quote within 24 hours
            </p>
          </motion.div>
        </form>
      </div>
    </div>
  );
}
