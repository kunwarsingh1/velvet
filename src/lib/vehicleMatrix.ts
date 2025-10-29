import { VehicleSpec, VehicleCode } from '@/shared/types';

export const VEHICLES: VehicleSpec[] = [
  // Ultra Luxury (Special Booking Only)
  {
    code: 'RR_GHOST',
    displayName: 'Rolls-Royce Ghost',
    category: 'ULTRA_LUXURY',
    maxPax: 4,
    maxLuggage: 4,
    maxPassengers: 4,
    luggageCapacity: 4,
    supportsCarrier: false,
    roofCarrierAvailable: false,
    directEligible: false,
    minLeadHours: 72,
    features: ['Starlight Headliner', 'Massage Seats', 'Champagne Cooler', 'Premium Sound'],
    image: 'https://mocha-cdn.com/019a1c8d-0846-765c-9884-bf1a669bc4f8/WhatsApp-Image-2025-10-25-at-23.28.19_2790d5a8.jpg'
  },
  {
    code: 'BENTLEY_FS',
    displayName: 'Bentley Flying Spur',
    category: 'ULTRA_LUXURY',
    maxPax: 4,
    maxLuggage: 4,
    maxPassengers: 4,
    luggageCapacity: 4,
    supportsCarrier: false,
    roofCarrierAvailable: false,
    directEligible: false,
    minLeadHours: 72,
    features: ['Diamond Quilted Leather', 'Bentley Rotating Display', 'Naim Audio', 'Executive Rear Seats'],
    image: 'https://mocha-cdn.com/019a1c8d-0846-765c-9884-bf1a669bc4f8/WhatsApp-Image-2025-10-25-at-23.28.19_2790d5a8.jpg'
  },
  {
    code: 'MAYBACH_S',
    displayName: 'Mercedes Maybach S-Class',
    category: 'ULTRA_LUXURY',
    maxPax: 4,
    maxLuggage: 4,
    maxPassengers: 4,
    luggageCapacity: 4,
    supportsCarrier: false,
    roofCarrierAvailable: false,
    directEligible: false,
    minLeadHours: 72,
    features: ['Executive Lounge', 'First-Class Rear Seats', 'Burmester 4D Sound', 'Panoramic Roof'],
    image: 'https://mocha-cdn.com/019a1c8d-0846-765c-9884-bf1a669bc4f8/WhatsApp-Image-2025-10-25-at-23.28.19_2790d5a8.jpg'
  },
  
  // Luxury (Direct Booking Eligible)
  {
    code: 'MERC_GLA200',
    displayName: 'Mercedes GLA200',
    category: 'LUXURY',
    maxPax: 4,
    maxLuggage: 3,
    maxPassengers: 4,
    luggageCapacity: 3,
    supportsCarrier: true,
    roofCarrierAvailable: true,
    directEligible: true,
    minLeadHours: 1,
    features: ['Premium Interior', 'MBUX Infotainment', 'LED Ambient Lighting', 'Climate Control'],
    image: 'https://mocha-cdn.com/019a1c8d-0846-765c-9884-bf1a669bc4f8/image.png_1649.png'
  },
  {
    code: 'MERC_E',
    displayName: 'Mercedes E-Class',
    category: 'LUXURY',
    maxPax: 4,
    maxLuggage: 4,
    maxPassengers: 4,
    luggageCapacity: 4,
    supportsCarrier: true,
    roofCarrierAvailable: true,
    directEligible: true,
    minLeadHours: 1,
    features: ['Leather Seats', 'Advanced Safety', 'Premium Sound', 'Executive Comfort'],
    image: 'https://mocha-cdn.com/019a1c8d-0846-765c-9884-bf1a669bc4f8/image.png_7734.png'
  },
  {
    code: 'BMW_X1',
    displayName: 'BMW X1',
    category: 'LUXURY',
    maxPax: 4,
    maxLuggage: 3,
    maxPassengers: 4,
    luggageCapacity: 3,
    supportsCarrier: true,
    roofCarrierAvailable: true,
    directEligible: true,
    minLeadHours: 1,
    features: ['iDrive System', 'Premium Upholstery', 'Panoramic Sunroof', 'Sport Suspension'],
    image: 'https://mocha-cdn.com/019a1c8d-0846-765c-9884-bf1a669bc4f8/image.png_7515.png'
  },
  {
    code: 'BMW_3',
    displayName: 'BMW 3 Series',
    category: 'LUXURY',
    maxPax: 4,
    maxLuggage: 3,
    maxPassengers: 4,
    luggageCapacity: 3,
    supportsCarrier: true,
    roofCarrierAvailable: true,
    directEligible: true,
    minLeadHours: 1,
    features: ['Sport Seats', 'Wireless Charging', 'Harman Kardon Audio', 'Gesture Control'],
    image: 'https://mocha-cdn.com/019a1c8d-0846-765c-9884-bf1a669bc4f8/image.png_3910.png'
  },
  {
    code: 'BMW_7',
    displayName: 'BMW 7 Series',
    category: 'LUXURY',
    maxPax: 4,
    maxLuggage: 4,
    maxPassengers: 4,
    luggageCapacity: 4,
    supportsCarrier: true,
    roofCarrierAvailable: true,
    directEligible: true,
    minLeadHours: 1,
    features: ['Executive Lounge', 'Massage Seats', 'Sky Lounge Panoramic', 'Bowers & Wilkins'],
    image: 'https://mocha-cdn.com/019a1c8d-0846-765c-9884-bf1a669bc4f8/image.png_3910.png'
  },
  
  // Large Capacity (Special Booking Only)
  {
    code: 'MERC_V220D',
    displayName: 'Mercedes V220D',
    category: 'LUXURY_TRAVEL',
    maxPax: 7,
    maxLuggage: 8,
    maxPassengers: 7,
    luggageCapacity: 8,
    supportsCarrier: false,
    roofCarrierAvailable: false,
    directEligible: false,
    minLeadHours: 72,
    features: ['Captain Chairs', 'Premium Van', 'Group Travel', 'Luxury Interior'],
    image: 'https://mocha-cdn.com/019a1c8d-0846-765c-9884-bf1a669bc4f8/WhatsApp-Image-2025-10-25-at-23.28.19_c8087005.jpg'
  },
  {
    code: 'TOYOTA_VELLFIRE',
    displayName: 'Toyota Vellfire',
    category: 'LUXURY_TRAVEL',
    maxPax: 7,
    maxLuggage: 8,
    maxPassengers: 7,
    luggageCapacity: 8,
    supportsCarrier: false,
    roofCarrierAvailable: false,
    directEligible: false,
    minLeadHours: 72,
    features: ['Ottoman Seats', 'Premium MPV', 'Executive Lounge', 'Spacious Interior'],
    image: 'https://mocha-cdn.com/019a1c8d-0846-765c-9884-bf1a669bc4f8/WhatsApp-Image-2025-10-25-at-23.28.19_c8087005.jpg'
  },
  {
    code: 'FORCE_URBANIA',
    displayName: 'Force Urbania',
    category: 'LUXURY_TRAVEL',
    maxPax: 13,
    maxLuggage: 15,
    maxPassengers: 13,
    luggageCapacity: 15,
    supportsCarrier: false,
    roofCarrierAvailable: false,
    directEligible: false,
    minLeadHours: 72,
    features: ['Group Travel', 'Large Capacity', 'Event Transport', 'Corporate Travel'],
    image: 'https://mocha-cdn.com/019a1c8d-0846-765c-9884-bf1a669bc4f8/WhatsApp-Image-2025-10-25-at-23.28.19_c8087005.jpg'
  },
];

export const getVehicleByCode = (code: VehicleCode): VehicleSpec | undefined => {
  return VEHICLES.find(vehicle => vehicle.code === code);
};

export const getDirectEligibleVehicles = (): VehicleSpec[] => {
  return VEHICLES.filter(vehicle => vehicle.directEligible);
};

export const getSpecialOnlyVehicles = (): VehicleSpec[] => {
  return VEHICLES.filter(vehicle => !vehicle.directEligible);
};

export const getVehiclesByCategory = (category: string): VehicleSpec[] => {
  return VEHICLES.filter(vehicle => vehicle.category === category);
};

export const filterVehiclesByCapacity = (
  vehicles: VehicleSpec[],
  passengers: number,
  luggage: number,
  needCarrier: boolean
): VehicleSpec[] => {
  return vehicles.filter(vehicle => {
    const meetsPassengerCapacity = vehicle.maxPax >= passengers;
    const meetsLuggageCapacity = vehicle.maxLuggage >= luggage;
    const meetsCarrierRequirement = !needCarrier || vehicle.supportsCarrier;
    
    return meetsPassengerCapacity && meetsLuggageCapacity && meetsCarrierRequirement;
  });
};
