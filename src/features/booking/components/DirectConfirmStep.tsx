import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Calendar, MapPin, Car, Phone, MessageCircle, Download, RotateCcw } from 'lucide-react';
import { useBookingStore, useBookingSelectors } from '@/features/booking/state/bookingStore';
import { client } from '@/lib/apiClient';
import { VEHICLES } from '@/lib/vehicleMatrix';
import { formatPrice, formatDateTime } from '@/lib/utils';

export default function DirectConfirmStep() {
  const {
    details,
    vehicle,
    payment,
    bookingId,
    setBookingId,
    setBookingLoading,
    setBookingError,
    resetDirectBooking,
  } = useBookingStore();
  
  const { getTotalPrice } = useBookingSelectors();

  const [isProcessing, setIsProcessing] = useState(false);
  const selectedVehicle = VEHICLES.find(v => v.code === vehicle.vehicleCode);
  const totalPrice = getTotalPrice();

  useEffect(() => {
    if (!bookingId) {
      processBooking();
    }
  }, []);

  const processBooking = async () => {
    if (!details.pickup || !details.datetime || !vehicle.vehicleCode || !payment.method) {
      return;
    }

    setIsProcessing(true);
    setBookingLoading(true);
    setBookingError(null);

    try {
      const bookingRequest = {
        details: details as any,
        vehicleCode: vehicle.vehicleCode as any,
        payment: payment as any,
      };

      const response = await client.createBooking(bookingRequest);
      setBookingId(response.bookingId);

      // Simulate WhatsApp notification
      setTimeout(() => {
        console.log('WhatsApp notification sent');
      }, 1000);

    } catch (error) {
      setBookingError(error instanceof Error ? error.message : 'Booking failed');
    } finally {
      setIsProcessing(false);
      setBookingLoading(false);
    }
  };

  const handleNewBooking = () => {
    resetDirectBooking();
  };

  const generateCalendarEvent = () => {
    const startDate = new Date(details.datetime!);
    const endDate = new Date(startDate.getTime() + (2 * 60 * 60 * 1000)); // 2 hours later
    
    const event = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Velvet Experience//EN',
      'BEGIN:VEVENT',
      `DTSTART:${startDate.toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
      `DTEND:${endDate.toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
      `SUMMARY:Velvet Experience - ${selectedVehicle?.displayName}`,
      `DESCRIPTION:Booking ID: ${bookingId}\\nPickup: ${details.pickup}${details.drop ? `\\nDrop: ${details.drop}` : ''}\\nVehicle: ${selectedVehicle?.displayName}`,
      `LOCATION:${details.pickup}`,
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([event], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `velvet-booking-${bookingId}.ics`;
    link.click();
    URL.revokeObjectURL(url);
  };

  if (isProcessing) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col items-center justify-center py-20"
      >
        <div className="relative">
          <motion.div
            className="w-16 h-16 border-2 border-velvet-line rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute inset-0 w-16 h-16 border-2 border-transparent border-t-velvet-gold rounded-full"
            animate={{ rotate: -360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />
        </div>
        <h3 className="text-xl font-semibold text-white mb-2 mt-6">Processing Your Booking</h3>
        <p className="text-muted text-center max-w-md">
          Please wait while we confirm your reservation and prepare your chauffeur details...
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-4xl mx-auto text-center text-white"
    >
      {/* Success Animation */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
        className="w-24 h-24 bg-gradient-to-br from-success to-emerald-400 rounded-full flex items-center justify-center mx-auto mb-8 glow-gold-soft"
      >
        <CheckCircle className="w-12 h-12 text-white" />
      </motion.div>

      {/* Confirmation Message */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mb-12"
      >
        <h2 className="font-display text-4xl md:text-5xl font-semibold text-white mb-4">
          Booking Confirmed!
        </h2>
        <p className="text-xl text-muted mb-6">
          Your luxury ride has been reserved successfully
        </p>
        
        {bookingId && (
          <div className="inline-flex items-center gap-3 glass-gold rounded-[14px] px-6 py-4">
            <span className="text-velvet-gold font-medium">Booking ID:</span>
            <span className="text-velvet-gold font-bold text-lg font-mono">{bookingId}</span>
          </div>
        )}
      </motion.div>

      {/* Booking Details Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="glass-card rounded-[20px] p-8 mb-12 text-left"
      >
        <h3 className="font-display text-2xl font-semibold text-white mb-8 text-center flex items-center justify-center gap-3">
          <CheckCircle className="w-6 h-6 text-velvet-gold" />
          <span>Booking Summary</span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Trip Details */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-velvet-gold uppercase tracking-wider">Trip Details</h4>
            
            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-muted mt-1" />
              <div>
                <p className="text-xs text-muted">Pickup</p>
                <p className="text-white font-medium">{details.pickup}</p>
              </div>
            </div>
            
            {details.drop && (
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-muted mt-1" />
                <div>
                  <p className="text-xs text-muted">Drop</p>
                  <p className="text-white font-medium">{details.drop}</p>
                </div>
              </div>
            )}
            
            <div className="flex items-start gap-3">
              <Calendar className="w-4 h-4 text-muted mt-1" />
              <div>
                <p className="text-xs text-muted">Date & Time</p>
                <p className="text-white font-medium">{formatDateTime(details.datetime!)}</p>
              </div>
            </div>
          </div>

          {/* Vehicle & Payment */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-velvet-gold uppercase tracking-wider">Service Details</h4>
            
            <div className="flex items-start gap-3">
              <Car className="w-4 h-4 text-muted mt-1" />
              <div>
                <p className="text-xs text-muted">Vehicle</p>
                <p className="text-white font-medium">{selectedVehicle?.displayName}</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-4 h-4 flex items-center justify-center mt-1">
                <span className="w-2 h-2 bg-velvet-gold rounded-full"></span>
              </div>
              <div>
                <p className="text-xs text-muted">Total Amount</p>
                <p className="text-white font-bold text-lg">{formatPrice(totalPrice)}</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-4 h-4 flex items-center justify-center mt-1">
                <span className="w-2 h-2 bg-muted rounded-full"></span>
              </div>
              <div>
                <p className="text-xs text-muted">Payment Method</p>
                <p className="text-white font-medium">{payment.method}</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Next Steps */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="glass-gold rounded-[20px] p-8 mb-12"
      >
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-velvet-gold/20 rounded-[14px] flex items-center justify-center">
            <MessageCircle className="w-6 h-6 text-velvet-gold" />
          </div>
          <h3 className="font-display text-2xl font-semibold text-white">What's Next?</h3>
        </div>
        
        <div className="text-left space-y-4 text-muted">
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 bg-velvet-gold text-velvet-black rounded-full flex items-center justify-center text-sm font-bold mt-1">1</div>
            <p className="leading-relaxed">We've sent your booking confirmation to WhatsApp</p>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 bg-velvet-gold text-velvet-black rounded-full flex items-center justify-center text-sm font-bold mt-1">2</div>
            <p className="leading-relaxed">You'll receive chauffeur details 2 hours before pickup</p>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 bg-velvet-gold text-velvet-black rounded-full flex items-center justify-center text-sm font-bold mt-1">3</div>
            <p className="leading-relaxed">Our concierge team is available 24/7 for any assistance</p>
          </div>
        </div>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="flex flex-col sm:flex-row gap-4 justify-center"
      >
        <button
          onClick={generateCalendarEvent}
          className="btn-secondary flex items-center justify-center gap-3 px-6 py-3"
        >
          <Download className="w-4 h-4" />
          <span>Add to Calendar</span>
        </button>
        
        <button
          onClick={handleNewBooking}
          className="btn-primary flex items-center justify-center gap-3 px-6 py-3"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Book Another Ride</span>
        </button>
      </motion.div>

      {/* Contact Information */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="mt-8 text-sm text-muted"
      >
        <p>Need assistance? Contact our concierge team:</p>
        <div className="flex items-center justify-center gap-6 mt-2">
          <a href="tel:+911234567890" className="flex items-center gap-2 hover:text-velvet-gold transition-colors duration-200">
            <Phone className="w-4 h-4" />
            <span>+91 12345 67890</span>
          </a>
          <a href="https://wa.me/911234567890" className="flex items-center gap-2 hover:text-velvet-gold transition-colors duration-200">
            <MessageCircle className="w-4 h-4" />
            <span>WhatsApp</span>
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}
