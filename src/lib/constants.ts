// Popular locations for quick selection
export const POPULAR_LOCATIONS = [
  'Indira Gandhi International Airport (IGI) - Terminal 1',
  'Indira Gandhi International Airport (IGI) - Terminal 2',
  'Indira Gandhi International Airport (IGI) - Terminal 3',
  'New Delhi Railway Station',
  'The Imperial New Delhi',
  'The Taj Mahal Hotel, New Delhi',
  'The Oberoi, New Delhi',
  'ITC Maurya, New Delhi',
  'The Leela Palace New Delhi',
  'Connaught Place',
  'Khan Market',
  'Select City Walk Mall',
  'DLF Mall of India',
  'India Gate',
  'Red Fort',
  'Lotus Temple',
  'Akshardham Temple',
  'Embassy of United States',
  'Embassy of United Kingdom',
  'High Commission of Canada',
  'Gurgaon Cyber City',
  'Noida Sector 62',
  'Faridabad Industrial Area',
] as const;

// Fleet preferences for Special Booking
export const FLEET_PREFERENCES = [
  { code: 'RR_GHOST', label: 'Rolls-Royce Ghost' },
  { code: 'BENTLEY_FS', label: 'Bentley Flying Spur' },
  { code: 'MAYBACH_S', label: 'Mercedes Maybach S-Class' },
  { code: 'MERC_V220D', label: 'Mercedes V220D (7-seater)' },
  { code: 'TOYOTA_VELLFIRE', label: 'Toyota Vellfire (7-seater)' },
  { code: 'FORCE_URBANIA', label: 'Force Urbania (13-seater)' },
  { code: 'ANY_LUXURY', label: 'Any Luxury Vehicle' },
  { code: 'ANY_ULTRA', label: 'Any Ultra Luxury' },
] as const;

// Budget ranges for Special Booking
export const BUDGET_RANGES = [
  '₹2,000 - ₹5,000',
  '₹5,000 - ₹10,000',
  '₹10,000 - ₹20,000',
  '₹20,000 - ₹50,000',
  '₹50,000+',
  'Flexible',
] as const;

// Occasion types
export const OCCASION_TYPES = [
  'Airport Transfer',
  'Business Meeting',
  'Wedding',
  'Corporate Event',
  'Diplomatic Visit',
  'Tourism',
  'Medical Appointment',
  'Shopping',
  'Social Event',
  'Other',
] as const;

// Membership plans
export const MEMBERSHIP_PLANS = [
  {
    code: '30_RIDES',
    label: '30 Rides Monthly',
    duration: 'Monthly',
    rides: 30,
    benefits: [
      'Guaranteed time slots',
      'Priority dispatch',
      'Dedicated concierge line',
      '15% discount per ride',
      '₹2,000 wallet credits',
    ],
    savings: '15%',
    popular: false,
  },
  {
    code: '60_RIDES',
    label: '60 Rides Quarterly',
    duration: 'Quarterly',
    rides: 60,
    benefits: [
      'Guaranteed time slots',
      'Priority dispatch',
      'Dedicated concierge line',
      '20% discount per ride',
      '₹5,000 wallet credits',
      'Free airport parking',
    ],
    savings: '20%',
    popular: true,
  },
  {
    code: '100_RIDES',
    label: '100 Rides Quarterly',
    duration: 'Quarterly',
    rides: 100,
    benefits: [
      'Guaranteed time slots',
      'Priority dispatch',
      'Dedicated concierge line',
      '25% discount per ride',
      '₹10,000 wallet credits',
      'Free airport parking',
      'Complimentary vehicle upgrades',
    ],
    savings: '25%',
    popular: false,
  },
] as const;

// Cities for service
export const CITIES = [
  'New Delhi',
  'Gurgaon',
  'Noida',
  'Faridabad',
  'Ghaziabad',
] as const;

// Payment methods
export const PAYMENT_METHODS = [
  { code: 'CARD', label: 'Credit/Debit Card', icon: '💳' },
  { code: 'UPI', label: 'UPI', icon: '📱' },
  { code: 'WALLET', label: 'Velvet Wallet', icon: '👛' },
  { code: 'CASH', label: 'Cash to Chauffeur', icon: '💵' },
] as const;

// Lead time warnings
export const LEAD_TIME_WARNINGS = {
  UNDER_60_MIN: 'Bookings under 60 minutes may require confirmation call',
  UNDER_72_HOURS: 'Ultra luxury vehicles require 72 hours advance booking',
} as const;
