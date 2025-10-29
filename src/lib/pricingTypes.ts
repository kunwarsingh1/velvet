import { VehicleCode, PackageCode } from '@/shared/types';

export interface PriceConfig {
  currency: 'INR';
  carrierFee: number; // in paise
  directNormal: Record<VehicleCode, number>; // fixed base city rate in paise
  directHourly: {
    packages: Array<{
      code: PackageCode;
      label: string;
      includedHours: number;
      includedKm: number;
    }>;
    base: Record<VehicleCode, number>; // base for package in paise
    extraPerKm: number; // paise/km
    extraPerHour: number; // paise/hour
  };
}

export const PRICING: PriceConfig = {
  currency: 'INR',
  carrierFee: 50000, // ₹500 in paise
  
  // Direct Normal Pricing (in paise)
  directNormal: {
    RR_GHOST: 2500000, // ₹25,000
    BENTLEY_FS: 2200000, // ₹22,000
    MAYBACH_S: 2000000, // ₹20,000
    MERC_GLA200: 180000, // ₹1,800
    MERC_E: 220000, // ₹2,200
    BMW_X1: 200000, // ₹2,000
    BMW_3: 240000, // ₹2,400
    BMW_7: 350000, // ₹3,500
    MERC_V220D: 400000, // ₹4,000
    TOYOTA_VELLFIRE: 450000, // ₹4,500
    FORCE_URBANIA: 300000, // ₹3,000
  },
  
  // Direct Hourly Pricing
  directHourly: {
    packages: [
      {
        code: '4H40KM',
        label: '4 Hours / 40 KM',
        includedHours: 4,
        includedKm: 40,
      },
      {
        code: '8H80KM',
        label: '8 Hours / 80 KM',
        includedHours: 8,
        includedKm: 80,
      },
      {
        code: '12H120KM',
        label: '12 Hours / 120 KM',
        includedHours: 12,
        includedKm: 120,
      },
    ],
    
    // Base package pricing (in paise)
    base: {
      RR_GHOST: 4000000, // ₹40,000
      BENTLEY_FS: 3500000, // ₹35,000
      MAYBACH_S: 3200000, // ₹32,000
      MERC_GLA200: 280000, // ₹2,800
      MERC_E: 350000, // ₹3,500
      BMW_X1: 320000, // ₹3,200
      BMW_3: 380000, // ₹3,800
      BMW_7: 550000, // ₹5,500
      MERC_V220D: 600000, // ₹6,000
      TOYOTA_VELLFIRE: 700000, // ₹7,000
      FORCE_URBANIA: 480000, // ₹4,800
    },
    
    extraPerKm: 2000, // ₹20 per km in paise
    extraPerHour: 20000, // ₹200 per hour in paise
  },
};

export const formatCurrency = (amountInPaise: number): string => {
  const amount = amountInPaise / 100;
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const getVehiclePrice = (
  vehicleCode: VehicleCode,
  mode: 'NORMAL' | 'HOURLY',
  packageCode?: PackageCode
): number => {
  if (mode === 'NORMAL') {
    return PRICING.directNormal[vehicleCode];
  } else {
    return PRICING.directHourly.base[vehicleCode];
  }
};

export const getPackageByCode = (code: PackageCode) => {
  return PRICING.directHourly.packages.find(pkg => pkg.code === code);
};
