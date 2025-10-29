import { Hono } from "hono";
import { cors } from 'hono/cors';
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

const app = new Hono<{ Bindings: Env }>();

// Enable CORS for all routes
app.use('*', cors());

// Quote endpoint
app.post('/api/quote', async (c) => {
  try {
    const request = await c.req.json() as QuoteRequest;
    
    // Mock quote response based on request
    const vehicles: QuoteResponse['vehicles'] = [
      {
        vehicleCode: 'MERC_GLA200' as VehicleCode,
        name: 'Mercedes GLA200',
        price: request.mode === 'NORMAL' ? 180000 : 280000,
        directEligible: true,
        carrierFee: request.needCarrier ? 50000 : undefined,
      },
      {
        vehicleCode: 'MERC_E' as VehicleCode,
        name: 'Mercedes E-Class',
        price: request.mode === 'NORMAL' ? 220000 : 350000,
        directEligible: true,
        carrierFee: request.needCarrier ? 50000 : undefined,
      },
      {
        vehicleCode: 'BMW_X1' as VehicleCode,
        name: 'BMW X1',
        price: request.mode === 'NORMAL' ? 200000 : 320000,
        directEligible: true,
        carrierFee: request.needCarrier ? 50000 : undefined,
      },
      {
        vehicleCode: 'BMW_3' as VehicleCode,
        name: 'BMW 3 Series',
        price: request.mode === 'NORMAL' ? 240000 : 380000,
        directEligible: true,
        carrierFee: request.needCarrier ? 50000 : undefined,
      },
      {
        vehicleCode: 'BMW_7' as VehicleCode,
        name: 'BMW 7 Series',
        price: request.mode === 'NORMAL' ? 350000 : 550000,
        directEligible: true,
        carrierFee: request.needCarrier ? 50000 : undefined,
      },
      {
        vehicleCode: 'RR_GHOST' as VehicleCode,
        name: 'Rolls-Royce Ghost',
        price: request.mode === 'NORMAL' ? 2500000 : 4000000,
        directEligible: false,
        disabledReason: '72 hrs prior',
        carrierFee: request.needCarrier ? 50000 : undefined,
      },
      {
        vehicleCode: 'BENTLEY_FS' as VehicleCode,
        name: 'Bentley Flying Spur',
        price: request.mode === 'NORMAL' ? 2200000 : 3500000,
        directEligible: false,
        disabledReason: '72 hrs prior',
        carrierFee: request.needCarrier ? 50000 : undefined,
      },
      {
        vehicleCode: 'MAYBACH_S' as VehicleCode,
        name: 'Mercedes Maybach S-Class',
        price: request.mode === 'NORMAL' ? 2300000 : 3600000,
        directEligible: false,
        disabledReason: '72 hrs prior',
        carrierFee: request.needCarrier ? 50000 : undefined,
      },
      {
        vehicleCode: 'MERC_V220D' as VehicleCode,
        name: 'Mercedes V220D',
        price: request.mode === 'NORMAL' ? 450000 : 720000,
        directEligible: false,
        disabledReason: '72 hrs prior',
        carrierFee: request.needCarrier ? 50000 : undefined,
      },
      {
        vehicleCode: 'TOYOTA_VELLFIRE' as VehicleCode,
        name: 'Toyota Vellfire',
        price: request.mode === 'NORMAL' ? 400000 : 640000,
        directEligible: false,
        disabledReason: '72 hrs prior',
        carrierFee: request.needCarrier ? 50000 : undefined,
      },
      {
        vehicleCode: 'FORCE_URBANIA' as VehicleCode,
        name: 'Force Urbania',
        price: request.mode === 'NORMAL' ? 380000 : 600000,
        directEligible: false,
        disabledReason: '72 hrs prior',
        carrierFee: request.needCarrier ? 50000 : undefined,
      },
    ];

    const response: QuoteResponse = {
      vehicles,
      breakdownNote: request.mode === 'HOURLY' 
        ? `Includes ${request.packageCode?.replace('H', ' hours / ').replace('KM', ' km')}. Extras billed only if used.`
        : 'City limits coverage. Tolls and parking additional.',
      totalDistance: request.mode === 'NORMAL' ? Math.floor(Math.random() * 50) + 10 : undefined,
      cacheTtlSec: 300,
    };

    return c.json(response);
  } catch (error) {
    console.error('Quote API error:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// Booking endpoint
app.post('/api/booking', async (c) => {
  try {
    const request = await c.req.json() as BookingRequest;
    
    // Simulate booking creation delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const response: BookingResponse = {
      bookingId: `VE${Date.now().toString(36).toUpperCase()}`,
      gatewayOrderId: request.payment.method === 'CASH' ? undefined : `order_${Date.now()}`,
    };

    return c.json(response);
  } catch (error) {
    console.error('Booking API error:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// Special booking endpoint
app.post('/api/special', async (c) => {
  try {
    await c.req.json() as SpecialBookingRequest;
    
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const response: SpecialBookingResponse = {
      refId: `REF${Date.now().toString(36).toUpperCase()}`,
    };

    return c.json(response);
  } catch (error) {
    console.error('Special Booking API error:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// Membership endpoint
app.post('/api/membership', async (c) => {
  try {
    await c.req.json() as MembershipRequest;
    
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const response: MembershipResponse = {
      refId: `MEM${Date.now().toString(36).toUpperCase()}`,
    };

    return c.json(response);
  } catch (error) {
    console.error('Membership API error:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// Health check endpoint
app.get('/api/health', (c) => {
  return c.json({ status: 'ok', timestamp: new Date().toISOString() });
});

export default app;
