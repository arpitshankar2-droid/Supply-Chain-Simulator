import { generateId } from '../../../utils/generateId';

export function confirmBooking(finalResponse) {
  const bookingId = generateId('BK');
  const pickupTime = new Date(Date.now() + 4 * 60 * 60 * 1000);

  return {
    data: {
      bookingId,
      status: 'confirmed',
      carrier: finalResponse.carrierName,
      rate: finalResponse.finalRate,
      transitDays: finalResponse.transitDays,
      estimatedPickup: pickupTime.toISOString(),
      estimatedDelivery: new Date(
        pickupTime.getTime() + finalResponse.transitDays * 24 * 60 * 60 * 1000
      ).toISOString(),
      reference: `REF-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
    },
    source: 'simulation',
  };
}
