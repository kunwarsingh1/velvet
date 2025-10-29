import z from "zod";

// Vehicle Types
export type VehicleCode =
  | 'RR_GHOST' | 'BENTLEY_FS' | 'MAYBACH_S'
  | 'MERC_GLA200' | 'MERC_E' | 'BMW_X1' | 'BMW_3' | 'BMW_7'
  | 'MERC_V220D' | 'TOYOTA_VELLFIRE' | 'FORCE_URBANIA';

export interface VehicleSpec {
  code: VehicleCode;
  displayName: string;
  category?: string;
  maxPax: number;
  maxLuggage: number;
  maxPassengers?: number;
  luggageCapacity?: number;
  supportsCarrier: boolean;
  roofCarrierAvailable?: boolean;
  directEligible: boolean;
  minLeadHours: number;
  features?: string[];
  image?: string;
}

export type BookingMode = 'NORMAL' | 'HOURLY';
export type PaymentMethod = 'CARD' | 'UPI' | 'WALLET' | 'CASH';
export type PackageCode = '4H40KM' | '8H80KM' | '12H120KM';

// Validation Schemas
export const DirectDetailsSchema = z.object({
  pickup: z.string().min(1, 'Pickup location is required'),
  drop: z.string().optional(),
  datetime: z.string().min(1, 'Date and time is required'),
  passengers: z.number().min(1).max(13),
  luggage: z.number().min(0).max(20),
  needCarrier: z.boolean(),
  mode: z.enum(['NORMAL', 'HOURLY']),
  packageCode: z.enum(['4H40KM', '8H80KM', '12H120KM']).optional(),
  flightOrTrain: z.string().optional(),
  notes: z.string().optional(),
});

export const VehicleSelectionSchema = z.object({
  vehicleCode: z.string().min(1, 'Please select a vehicle'),
});

export const PaymentSchema = z.object({
  method: z.enum(['CARD', 'UPI', 'WALLET', 'CASH']),
  upiId: z.string().optional(),
  gstRequired: z.boolean(),
  companyName: z.string().optional(),
  gstin: z.string().regex(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/, 'Invalid GSTIN format').optional(),
  acceptTerms: z.boolean().refine(val => val === true, 'Please accept terms and conditions'),
});

export const SpecialBookingSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  phone: z.string().regex(/^\+91[6-9]\d{9}$/, 'Invalid phone number'),
  email: z.string().email('Invalid email').optional(),
  city: z.string().min(1, 'City is required'),
  datetime: z.string().min(1, 'Date and time is required'),
  passengers: z.number().min(1).max(13),
  luggage: z.number().min(0).max(20),
  needCarrier: z.boolean(),
  fleetPreferences: z.array(z.string()),
  occasion: z.string().optional(),
  notes: z.string().optional(),
  budgetRange: z.string().optional(),
});

export const MembershipSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  phone: z.string().regex(/^\+91[6-9]\d{9}$/, 'Invalid phone number'),
  email: z.string().email('Invalid email').optional(),
  city: z.string().optional(),
  plan: z.enum(['30_RIDES', '60_RIDES', '100_RIDES']),
  routineRoutes: z.string().optional(),
  routineTimes: z.string().optional(),
});

// API Types
export interface QuoteRequest {
  pickup: string;
  drop?: string;
  datetime: string;
  passengers: number;
  luggageCount: number;
  needCarrier: boolean;
  mode: BookingMode;
  packageCode?: PackageCode;
  requestedVehicleCode?: VehicleCode;
}

export interface QuoteResponse {
  vehicles: Array<{
    vehicleCode: VehicleCode;
    name: string;
    price: number;
    directEligible: boolean;
    disabledReason?: string;
    carrierFee?: number;
  }>;
  breakdownNote: string;
  totalDistance?: number;
  cacheTtlSec: number;
}

export interface BookingRequest {
  details: z.infer<typeof DirectDetailsSchema>;
  vehicleCode: VehicleCode;
  payment: z.infer<typeof PaymentSchema>;
}

export interface BookingResponse {
  bookingId: string;
  gatewayOrderId?: string;
}

export interface SpecialBookingRequest extends z.infer<typeof SpecialBookingSchema> {}

export interface SpecialBookingResponse {
  refId: string;
}

export interface MembershipRequest extends z.infer<typeof MembershipSchema> {}

export interface MembershipResponse {
  refId: string;
}

// Derived Types
export type DirectDetailsType = z.infer<typeof DirectDetailsSchema>;
export type VehicleSelectionType = z.infer<typeof VehicleSelectionSchema>;
export type PaymentType = z.infer<typeof PaymentSchema>;
export type SpecialBookingType = z.infer<typeof SpecialBookingSchema>;
export type MembershipType = z.infer<typeof MembershipSchema>;
