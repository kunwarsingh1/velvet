import { z } from 'zod';
import type {
  QuoteRequest,
  QuoteResponse,
  BookingRequest,
  BookingResponse,
  SpecialBookingRequest,
  SpecialBookingResponse,
  MembershipRequest,
  MembershipResponse,
  VehicleCode,
} from '@/shared/types';

// API Client with timeout, retries, and validation
class ApiClient {
  private baseUrl: string;
  private defaultTimeout: number;
  private maxRetries: number;

  constructor(baseUrl = '/api', timeout = 30000, maxRetries = 2) {
    this.baseUrl = baseUrl;
    this.defaultTimeout = timeout;
    this.maxRetries = maxRetries;
  }

  private async fetchWithRetry<T>(
    url: string,
    options: RequestInit,
    schema: z.ZodSchema<T>,
    retryCount = 0
  ): Promise<T> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.defaultTimeout);

    try {
      const response = await fetch(`${this.baseUrl}${url}`, {
        ...options,
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      return schema.parse(data);
    } catch (error) {
      clearTimeout(timeoutId);

      if (retryCount < this.maxRetries && error instanceof Error) {
        // Retry on network errors, timeouts, or 5xx errors
        if (
          error.name === 'AbortError' ||
          error.message.includes('fetch') ||
          error.message.includes('5')
        ) {
          await new Promise(resolve => setTimeout(resolve, 1000 * (retryCount + 1)));
          return this.fetchWithRetry(url, options, schema, retryCount + 1);
        }
      }

      throw error;
    }
  }

  // Quote API
  async getQuote(request: QuoteRequest): Promise<QuoteResponse> {
    const schema = z.object({
      vehicles: z.array(z.object({
        vehicleCode: z.string() as z.ZodType<VehicleCode>,
        name: z.string(),
        price: z.number(),
        directEligible: z.boolean(),
        disabledReason: z.string().optional(),
      })),
      breakdownNote: z.string(),
      cacheTtlSec: z.number(),
    });

    return this.fetchWithRetry(
      '/quote',
      {
        method: 'POST',
        body: JSON.stringify(request),
      },
      schema
    ) as Promise<QuoteResponse>;
  }

  // Booking API
  async createBooking(request: BookingRequest): Promise<BookingResponse> {
    const schema = z.object({
      bookingId: z.string(),
      gatewayOrderId: z.string().optional(),
    });

    return this.fetchWithRetry(
      '/booking',
      {
        method: 'POST',
        body: JSON.stringify(request),
      },
      schema
    );
  }

  // Special Booking API
  async createSpecialBooking(request: SpecialBookingRequest): Promise<SpecialBookingResponse> {
    const schema = z.object({
      refId: z.string(),
    });

    return this.fetchWithRetry(
      '/special',
      {
        method: 'POST',
        body: JSON.stringify(request),
      },
      schema
    );
  }

  // Membership API
  async createMembership(request: MembershipRequest): Promise<MembershipResponse> {
    const schema = z.object({
      refId: z.string(),
    });

    return this.fetchWithRetry(
      '/membership',
      {
        method: 'POST',
        body: JSON.stringify(request),
      },
      schema
    );
  }
}

// Singleton instance
export const apiClient = new ApiClient();

// Mock server responses for development
export const mockApiClient = {
  async getQuote(request: QuoteRequest): Promise<QuoteResponse> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Mock quote response based on request
    const vehicles: QuoteResponse['vehicles'] = [
      {
        vehicleCode: 'MERC_GLA200' as VehicleCode,
        name: 'Mercedes GLA200',
        price: request.mode === 'NORMAL' ? 180000 : 280000,
        directEligible: true,
      },
      {
        vehicleCode: 'MERC_E' as VehicleCode,
        name: 'Mercedes E-Class',
        price: request.mode === 'NORMAL' ? 220000 : 350000,
        directEligible: true,
      },
      {
        vehicleCode: 'BMW_X1' as VehicleCode,
        name: 'BMW X1',
        price: request.mode === 'NORMAL' ? 200000 : 320000,
        directEligible: true,
      },
      {
        vehicleCode: 'BMW_3' as VehicleCode,
        name: 'BMW 3 Series',
        price: request.mode === 'NORMAL' ? 240000 : 380000,
        directEligible: true,
      },
      {
        vehicleCode: 'BMW_7' as VehicleCode,
        name: 'BMW 7 Series',
        price: request.mode === 'NORMAL' ? 350000 : 550000,
        directEligible: true,
      },
      {
        vehicleCode: 'RR_GHOST' as VehicleCode,
        name: 'Rolls-Royce Ghost',
        price: request.mode === 'NORMAL' ? 2500000 : 4000000,
        directEligible: false,
        disabledReason: '72 hrs prior',
      },
      {
        vehicleCode: 'BENTLEY_FS' as VehicleCode,
        name: 'Bentley Flying Spur',
        price: request.mode === 'NORMAL' ? 2200000 : 3500000,
        directEligible: false,
        disabledReason: '72 hrs prior',
      },
    ];

    return {
      vehicles,
      breakdownNote: request.mode === 'HOURLY' 
        ? 'Includes 8 hours / 80 km. Extras billed only if used.'
        : 'City limits coverage. Tolls and parking additional.',
      cacheTtlSec: 300,
    };
  },

  async createBooking(_request: BookingRequest): Promise<BookingResponse> {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      bookingId: `VE${Date.now().toString(36).toUpperCase()}`,
      gatewayOrderId: _request.payment.method === 'CASH' ? undefined : `order_${Date.now()}`,
    };
  },

  async createSpecialBooking(_request: SpecialBookingRequest): Promise<SpecialBookingResponse> {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      refId: `REF${Date.now().toString(36).toUpperCase()}`,
    };
  },

  async createMembership(_request: MembershipRequest): Promise<MembershipResponse> {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      refId: `MEM${Date.now().toString(36).toUpperCase()}`,
    };
  },
};

// Always use real API client (worker has mock responses built-in)
export const client = apiClient;
