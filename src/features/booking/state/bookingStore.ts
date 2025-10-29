import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type {
  DirectDetailsType,
  VehicleSelectionType,
  PaymentType,
  QuoteResponse,
} from '@/shared/types';

export type BookingStep = 'details' | 'vehicle' | 'payment' | 'confirmation';
export type BookingTab = 'direct' | 'special' | 'membership';

interface BookingState {
  // Navigation
  currentTab: BookingTab;
  currentStep: BookingStep;
  
  // Direct Booking State
  details: Partial<DirectDetailsType>;
  vehicle: Partial<VehicleSelectionType>;
  payment: Partial<PaymentType>;
  
  // Quote & Pricing
  quote: QuoteResponse | null;
  quoteLoading: boolean;
  quoteError: string | null;
  
  // Booking Result
  bookingId: string | null;
  bookingLoading: boolean;
  bookingError: string | null;
  
  // Special Booking & Membership
  specialLoading: boolean;
  specialError: string | null;
  specialRefId: string | null;
  
  membershipLoading: boolean;
  membershipError: string | null;
  membershipRefId: string | null;
  
  // Actions
  setTab: (tab: BookingTab) => void;
  setStep: (step: BookingStep) => void;
  nextStep: () => void;
  prevStep: () => void;
  
  // Direct Booking Actions
  updateDetails: (details: Partial<DirectDetailsType>) => void;
  updateVehicle: (vehicle: Partial<VehicleSelectionType>) => void;
  updatePayment: (payment: Partial<PaymentType>) => void;
  
  // Quote Actions
  setQuote: (quote: QuoteResponse | null) => void;
  setQuoteLoading: (loading: boolean) => void;
  setQuoteError: (error: string | null) => void;
  
  // Booking Actions
  setBookingId: (bookingId: string | null) => void;
  setBookingLoading: (loading: boolean) => void;
  setBookingError: (error: string | null) => void;
  
  // Special Booking Actions
  setSpecialLoading: (loading: boolean) => void;
  setSpecialError: (error: string | null) => void;
  setSpecialRefId: (refId: string | null) => void;
  
  // Membership Actions
  setMembershipLoading: (loading: boolean) => void;
  setMembershipError: (error: string | null) => void;
  setMembershipRefId: (refId: string | null) => void;
  
  // Utility Actions
  reset: () => void;
  resetDirectBooking: () => void;
}

const initialState = {
  currentTab: 'direct' as BookingTab,
  currentStep: 'details' as BookingStep,
  details: {},
  vehicle: {},
  payment: {},
  quote: null,
  quoteLoading: false,
  quoteError: null,
  bookingId: null,
  bookingLoading: false,
  bookingError: null,
  specialLoading: false,
  specialError: null,
  specialRefId: null,
  membershipLoading: false,
  membershipError: null,
  membershipRefId: null,
};

export const useBookingStore = create<BookingState>()(
  devtools(
    (set, get) => ({
      ...initialState,
      
      // Navigation
      setTab: (tab) => set({ currentTab: tab }),
      setStep: (step) => set({ currentStep: step }),
      
      nextStep: () => {
        const { currentStep } = get();
        const steps: BookingStep[] = ['details', 'vehicle', 'payment', 'confirmation'];
        const currentIndex = steps.indexOf(currentStep);
        if (currentIndex < steps.length - 1) {
          set({ currentStep: steps[currentIndex + 1] });
        }
      },
      
      prevStep: () => {
        const { currentStep } = get();
        const steps: BookingStep[] = ['details', 'vehicle', 'payment', 'confirmation'];
        const currentIndex = steps.indexOf(currentStep);
        if (currentIndex > 0) {
          set({ currentStep: steps[currentIndex - 1] });
        }
      },
      
      // Direct Booking
      updateDetails: (details) => 
        set((state) => ({ details: { ...state.details, ...details } })),
      
      updateVehicle: (vehicle) =>
        set((state) => ({ vehicle: { ...state.vehicle, ...vehicle } })),
      
      updatePayment: (payment) =>
        set((state) => ({ payment: { ...state.payment, ...payment } })),
      
      // Quote
      setQuote: (quote) => set({ quote }),
      setQuoteLoading: (quoteLoading) => set({ quoteLoading }),
      setQuoteError: (quoteError) => set({ quoteError }),
      
      // Booking
      setBookingId: (bookingId) => set({ bookingId }),
      setBookingLoading: (bookingLoading) => set({ bookingLoading }),
      setBookingError: (bookingError) => set({ bookingError }),
      
      // Special Booking
      setSpecialLoading: (specialLoading) => set({ specialLoading }),
      setSpecialError: (specialError) => set({ specialError }),
      setSpecialRefId: (specialRefId) => set({ specialRefId }),
      
      // Membership
      setMembershipLoading: (membershipLoading) => set({ membershipLoading }),
      setMembershipError: (membershipError) => set({ membershipError }),
      setMembershipRefId: (membershipRefId) => set({ membershipRefId }),
      
      // Utility
      reset: () => set(initialState),
      resetDirectBooking: () => set({
        details: {},
        vehicle: {},
        payment: {},
        quote: null,
        quoteLoading: false,
        quoteError: null,
        bookingId: null,
        bookingLoading: false,
        bookingError: null,
        currentStep: 'details',
      }),
    }),
    {
      name: 'booking-store',
    }
  )
);

// Selectors for computed values
export const useBookingSelectors = () => {
  const store = useBookingStore();
  
  return {
    ...store,
    
    // Computed values
    canProceedToVehicle: () => {
      const { details } = store;
      return details.pickup && details.datetime && details.passengers && details.mode;
    },
    
    canProceedToPayment: () => {
      const { vehicle } = store;
      return vehicle.vehicleCode;
    },
    
    canProceedToConfirmation: () => {
      const { payment } = store;
      return payment.method && payment.acceptTerms;
    },
    
    isStepComplete: (step: BookingStep) => {
      switch (step) {
        case 'details':
          return store.details.pickup && store.details.datetime && store.details.passengers && store.details.mode;
        case 'vehicle':
          return store.vehicle.vehicleCode;
        case 'payment':
          return store.payment.method && store.payment.acceptTerms;
        case 'confirmation':
          return store.bookingId;
        default:
          return false;
      }
    },
    
    getTotalPrice: () => {
      const { quote, vehicle, details } = store;
      if (!quote || !vehicle.vehicleCode) return 0;
      
      const selectedVehicle = quote.vehicles.find(v => v.vehicleCode === vehicle.vehicleCode);
      let totalPrice = selectedVehicle?.price || 0;
      
      // Add carrier fee if needed
      if (details.needCarrier) {
        totalPrice += 50000; // ₹500 in paise
      }
      
      return totalPrice;
    },
  };
};
