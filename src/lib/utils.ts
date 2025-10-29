import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Phone number formatting
export const formatPhoneNumber = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.startsWith('91')) {
    return `+${cleaned}`;
  }
  if (cleaned.length === 10) {
    return `+91${cleaned}`;
  }
  return phone;
};

export const maskPhoneNumber = (phone: string): string => {
  if (phone.startsWith('+91')) {
    const number = phone.slice(3);
    return `+91${number.slice(0, 2)}****${number.slice(-2)}`;
  }
  return phone;
};

// UPI ID validation
export const isValidUpiId = (upiId: string): boolean => {
  const upiRegex = /^[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z][a-zA-Z0-9.\-_]{2,64}$/;
  return upiRegex.test(upiId);
};

// GSTIN validation
export const isValidGstin = (gstin: string): boolean => {
  const gstinRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
  return gstinRegex.test(gstin);
};

// Date formatting
export const formatDateTime = (dateTime: string): string => {
  const date = new Date(dateTime);
  return new Intl.DateTimeFormat('en-IN', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
};

// URL parameter parsing
export const safeParseUrlParam = (param: string | null, fallback: string = ''): string => {
  try {
    return param ? decodeURIComponent(param) : fallback;
  } catch {
    return fallback;
  }
};

// Debounce utility
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// Generate booking ID
export const generateBookingId = (): string => {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substr(2, 5);
  return `VE${timestamp}${random}`.toUpperCase();
};

// Generate reference ID
export const generateRefId = (): string => {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substr(2, 3);
  return `REF${timestamp}${random}`.toUpperCase();
};

// Time utilities
export const isWithinHours = (dateTime: string, hours: number): boolean => {
  const targetTime = new Date(dateTime);
  const now = new Date();
  const diffInHours = (targetTime.getTime() - now.getTime()) / (1000 * 60 * 60);
  return diffInHours >= hours;
};

export const addHours = (date: Date, hours: number): Date => {
  const result = new Date(date);
  result.setHours(result.getHours() + hours);
  return result;
};

// Price formatting
export const formatPrice = (amountInPaise: number): string => {
  const amount = amountInPaise / 100;
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};
