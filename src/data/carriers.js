// Carriers from BRD Section 12.2
export const CARRIERS = [
  {
    id: 'carrier-preferred',
    name: 'Carrier A — BlueDart Freight',
    tier: 'preferred',
    onTimeRate: 0.96,
    rating: 4.8,
    avgResponseTime: '15 min',
    fleetSize: 1200,
    spotPremium: 1.0,
    negotiationFlexibility: 0.05,
    description: 'Preferred carrier with strong pan-India network and reliable on-time delivery.',
  },
  {
    id: 'carrier-existing',
    name: 'Carrier B — Rivigo Express',
    tier: 'existing',
    onTimeRate: 0.91,
    rating: 4.3,
    avgResponseTime: '30 min',
    fleetSize: 800,
    spotPremium: 1.12,
    negotiationFlexibility: 0.10,
    description: 'Existing carrier with good coverage on major highways but slightly higher rates.',
  },
  {
    id: 'carrier-new',
    name: 'Carrier C — FastTrack Logistics',
    tier: 'new',
    onTimeRate: 0.88,
    rating: 4.0,
    avgResponseTime: '45 min',
    fleetSize: 450,
    spotPremium: 1.25,
    negotiationFlexibility: 0.15,
    description: 'New carrier offering aggressive spot rates to win business on key Indian corridors.',
  },
];

export function getCarrier(tier) {
  return CARRIERS.find(c => c.tier === tier);
}

export function getCarrierById(id) {
  return CARRIERS.find(c => c.id === id);
}
