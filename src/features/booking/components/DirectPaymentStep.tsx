import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, CreditCard, Smartphone, Wallet, Banknote, Building, Shield, Lock, Sparkles, CheckCircle, Info } from 'lucide-react';
import { PaymentSchema, PaymentType } from '@/shared/types';
import { useBookingSelectors } from '@/features/booking/state/bookingStore';
import { VEHICLES } from '@/lib/vehicleMatrix';
import { formatPrice, formatDateTime } from '@/lib/utils';
import { PAYMENT_METHODS } from '@/lib/constants';
import { cn } from '@/lib/utils';

// Premium payment method card component
function PaymentMethodCard({ 
  method, 
  icon: Icon, 
  selected, 
  onClick 
}: {
  method: any;
  icon: any;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      className={cn(
        'relative p-6 rounded-[20px] transition-all duration-300 group bg-[#222222] border',
        'focus:outline-none focus:ring-2 focus:ring-velvet-gold/50',
        selected
          ? 'border-velvet-gold bg-velvet-gold/10'
          : 'border-velvet-line hover:border-velvet-line-strong'
      )}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-center gap-4">
        <motion.div
          animate={selected ? { 
            rotate: [0, 5, -5, 0],
            scale: [1, 1.1, 1]
          } : {}}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Icon className={cn(
            "w-6 h-6 transition-colors duration-300",
            selected ? "text-velvet-gold" : "text-muted group-hover:text-velvet-gold"
          )} />
        </motion.div>
        
        <div className="text-left flex-1">
          <span className={cn(
            "block font-semibold transition-colors duration-300",
            selected ? "text-velvet-gold" : "text-black group-hover:text-velvet-gold"
          )}>
            {method.label}
          </span>
          <span className="block text-sm text-gray-600">{method.description}</span>
        </div>
      </div>
      
      {/* Selection indicator */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ scale: 0, rotate: 180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: -180 }}
            className="absolute top-4 right-4 w-5 h-5 bg-velvet-gold rounded-full flex items-center justify-center"
          >
            <CheckCircle className="w-3 h-3 text-velvet-black" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

export default function DirectPaymentStep() {
  const {
    details,
    vehicle,
    payment,
    quote,
    updatePayment,
    nextStep,
    prevStep,
    getTotalPrice,
  } = useBookingSelectors();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm<PaymentType>({
    resolver: zodResolver(PaymentSchema),
    defaultValues: {
      method: 'CARD',
      gstRequired: false,
      acceptTerms: false,
      ...payment,
    },
  });

  const selectedMethod = watch('method');
  const gstRequired = watch('gstRequired');

  const selectedVehicle = VEHICLES.find(v => v.code === vehicle.vehicleCode);
  const totalPrice = getTotalPrice();

  const onSubmit = async (data: PaymentType) => {
    updatePayment(data);
    nextStep();
  };

  const paymentMethods = [
    { 
      ...PAYMENT_METHODS[0], 
      icon: CreditCard, 
      description: 'Credit/Debit Card'
    },
    { 
      ...PAYMENT_METHODS[1], 
      icon: Smartphone, 
      description: 'UPI Payment'
    },
    { 
      ...PAYMENT_METHODS[2], 
      icon: Wallet, 
      description: 'Digital Wallet'
    },
    { 
      ...PAYMENT_METHODS[3], 
      icon: Banknote, 
      description: 'Cash on Trip'
    },
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
        <h3 className="text-velvet-gold font-body font-medium text-sm uppercase tracking-wider mb-4">{title}</h3>
        <div className="section-divider" />
      </div>
      {children}
    </motion.div>
  );

  return (
    <div className="max-w-5xl mx-auto text-white">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex items-center justify-between mb-8"
      >
        <div>
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-white mb-2">
            Secure <span className="text-velvet-gold">Payment</span>
          </h2>
          <p className="text-lg text-muted flex items-center gap-3">
            <Lock className="w-5 h-5 text-velvet-gold" />
            <span>Complete your luxury booking securely</span>
          </p>
        </div>
        
        <button
          onClick={prevStep}
          className="btn-secondary flex items-center gap-2 px-4 py-3"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
      </motion.div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
        {/* Payment Methods */}
        <Section title="Payment Method">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {paymentMethods.map((method) => (
              <PaymentMethodCard
                key={method.code}
                method={method}
                icon={method.icon}
                selected={selectedMethod === method.code}
                onClick={() => setValue('method', method.code as any)}
              />
            ))}
          </div>
        </Section>

        {/* UPI ID Input */}
        <AnimatePresence>
          {selectedMethod === 'UPI' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Section title="UPI Details">
                <div className="space-y-4">
                  <label className="flex items-center gap-3 text-black font-medium">
                    <Smartphone className="w-5 h-5 text-velvet-gold" />
                    UPI ID *
                  </label>
                  <input
                    {...register('upiId')}
                    type="text"
                    placeholder="yourname@upi"
                    className={cn(
                      'input-premium w-full',
                      errors.upiId && 'border-warning'
                    )}
                  />
                  {errors.upiId && (
                    <p className="text-warning text-sm flex items-center gap-2">
                      <Info className="w-4 h-4" />
                      {errors.upiId.message}
                    </p>
                  )}
                </div>
              </Section>
            </motion.div>
          )}
        </AnimatePresence>

        {/* GST Invoice Section */}
        <Section title="Invoice Details (Optional)">
          <div className="rounded-[20px] p-6 space-y-6 bg-[#222222] border border-velvet-line">
            <label className="flex items-center gap-4 cursor-pointer">
              <input
                {...register('gstRequired')}
                type="checkbox"
                className="w-5 h-5 rounded border-velvet-line-strong bg-white/10 text-velvet-gold focus:ring-velvet-gold/30"
              />
              <div className="flex items-center gap-3">
                <Building className="w-5 h-5 text-velvet-gold" />
                <span className="font-medium text-black">I need GST invoice for my company</span>
              </div>
            </label>

            <AnimatePresence>
              {gstRequired && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-velvet-line"
                >
                  <div className="space-y-4">
                    <label className="text-black font-medium">Company Name *</label>
                    <input
                      {...register('companyName')}
                      type="text"
                      placeholder="Enter company name"
                      className={cn(
                        'input-premium w-full',
                        errors.companyName && 'border-warning'
                      )}
                    />
                    {errors.companyName && (
                      <p className="text-warning text-sm flex items-center gap-2">
                        <Info className="w-4 h-4" />
                        {errors.companyName.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-4">
                    <label className="text-black font-medium">GSTIN *</label>
                    <input
                      {...register('gstin')}
                      type="text"
                      placeholder="22AAAAA0000A1Z5"
                      className={cn(
                        'input-premium w-full',
                        errors.gstin && 'border-warning'
                      )}
                    />
                    {errors.gstin && (
                      <p className="text-warning text-sm flex items-center gap-2">
                        <Info className="w-4 h-4" />
                        {errors.gstin.message}
                      </p>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Section>

        {/* Terms and Conditions */}
        <Section title="Terms & Conditions">
          <div className="rounded-[20px] p-6 bg-[#222222] border border-velvet-line">
            <label className="flex items-start gap-4 cursor-pointer">
              <input
                {...register('acceptTerms')}
                type="checkbox"
                className="w-5 h-5 mt-1 rounded border-velvet-line-strong bg-white/10 text-velvet-gold focus:ring-velvet-gold/30"
              />
              <span className="text-black leading-relaxed">
                I accept the{' '}
                <a href="#" className="text-velvet-gold hover:underline font-medium">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="text-velvet-gold hover:underline font-medium">
                  Privacy Policy
                </a>
                . I understand the cancellation policy and payment terms.
              </span>
            </label>
            {errors.acceptTerms && (
              <p className="text-warning text-sm mt-4 flex items-center gap-2 ml-9">
                <Info className="w-4 h-4" />
                {errors.acceptTerms.message}
              </p>
            )}
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
            onClick={() => alert('Ride Booked.')}
            className={cn(
              'btn-primary w-full max-w-md py-4 text-lg flex items-center justify-center gap-3 relative overflow-hidden',
              !isValid && 'opacity-50 cursor-not-allowed'
            )}
          >
            {/* Animated shine effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
              animate={isValid ? {
                x: ['-100%', '100%'],
              } : {}}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear"
              }}
            />
            <Lock className="w-5 h-5 relative z-10" />
            <span className="relative z-10">
              {/* {selectedMethod === 'CASH' 
                ? 'Confirm Booking' 
                : `Secure Payment ${formatPrice(totalPrice)}`
              } */}
              Secure Payment ${formatPrice(totalPrice)}
            </span>
          </button>
        </motion.div>
      </form>

      {/* Booking Summary Sidebar */}
      <motion.div 
        className="mt-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="rounded-[20px] p-6 bg-[#222222] border border-velvet-line">
          <h3 className="font-display text-lg font-semibold text-black mb-6 flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-velvet-gold" />
            Booking Summary
          </h3>
          
          <div className="space-y-4 text-sm">
            {/* Trip Details */}
            <div className="pb-4 border-b border-velvet-line">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-gray-600">From:</span>
                  <p className="text-black font-medium truncate">{details.pickup}</p>
                </div>
                {details.drop && (
                  <div>
                    <span className="text-gray-600">To:</span>
                    <p className="text-black font-medium truncate">{details.drop}</p>
                  </div>
                )}
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <span className="text-gray-600">Date & Time:</span>
                  <p className="text-black font-medium">{formatDateTime(details.datetime!)}</p>
                </div>
                <div>
                  <span className="text-gray-600">Passengers:</span>
                  <p className="text-velvet-gold font-medium">{details.passengers}</p>
                </div>
              </div>
            </div>

            {/* Vehicle & Pricing */}
            <div className="pb-4 border-b border-velvet-line">
              <div className="flex justify-between items-start mb-3">
                <span className="text-gray-600">Vehicle:</span>
                <span className="text-velvet-gold font-medium text-right">
                  {selectedVehicle?.displayName}
                </span>
              </div>
              
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Base Fare:</span>
                <span className="text-black font-medium">
                  {formatPrice(quote?.vehicles.find(v => v.vehicleCode === vehicle.vehicleCode)?.price || 0)}
                </span>
              </div>
              
              {details.needCarrier && (
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Roof Carrier:</span>
                  <span className="text-black font-medium">₹500</span>
                </div>
              )}
            </div>

            {/* Total */}
            <div className="pt-2">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-black">Total Amount:</span>
                <motion.span 
                  className="text-xl font-bold text-velvet-gold"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  {formatPrice(totalPrice)}
                </motion.span>
              </div>
            </div>
          </div>

          {/* Security Badge */}
          <div className="mt-6 flex items-center gap-3 text-sm text-gray-600 p-4 bg-white/20 border border-velvet-line rounded-[14px]">
            <Shield className="w-5 h-5 text-success" />
            <span>256-bit SSL encryption & PCI DSS compliant</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
