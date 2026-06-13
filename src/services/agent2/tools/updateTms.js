export function updateTms(booking, disruption) {
  return {
    data: {
      tmsUpdated: true,
      updates: [
        { field: 'booking_status', value: 'confirmed', table: 'shipments' },
        { field: 'carrier_assignment', value: booking.carrier, table: 'shipments' },
        { field: 'rate', value: booking.rate, table: 'rates' },
        { field: 'disruption_flag', value: disruption.id, table: 'disruptions' },
        { field: 'resolution_status', value: 'resolved', table: 'disruptions' },
      ],
      notificationsSent: [
        'operations@company.com',
        'logistics-manager@company.com',
        `${booking.carrier.toLowerCase().replace(/\s/g, '')}@carrier.com`,
      ],
    },
    source: 'simulation',
  };
}
