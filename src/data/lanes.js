// Rate tables from BRD Section 12.1 — rates in INR (₹)
export const LANES = [
  {
    id: 'lane-1',
    from: 'mumbai',
    to: 'bangalore',
    distance: 984,
    normalTransitDays: 3,
    rates: {
      preferred: 85000,
      existing: 92000,
      new: 105000,
    },
    mode: 'FTL',
  },
  {
    id: 'lane-2',
    from: 'mumbai',
    to: 'pune',
    distance: 149,
    normalTransitDays: 1,
    rates: {
      preferred: 25000,
      existing: 30000,
      new: 38000,
    },
    mode: 'FTL',
  },
  {
    id: 'lane-3',
    from: 'delhi',
    to: 'bangalore',
    distance: 2150,
    normalTransitDays: 4,
    rates: {
      preferred: 120000,
      existing: 135000,
      new: 155000,
    },
    mode: 'FTL',
  },
  {
    id: 'lane-4',
    from: 'delhi',
    to: 'pune',
    distance: 1420,
    normalTransitDays: 3,
    rates: {
      preferred: 95000,
      existing: 108000,
      new: 125000,
    },
    mode: 'FTL',
  },
  {
    id: 'lane-5',
    from: 'chennai',
    to: 'bangalore',
    distance: 346,
    normalTransitDays: 1,
    rates: {
      preferred: 32000,
      existing: 38000,
      new: 45000,
    },
    mode: 'FTL',
  },
];

export function getLane(fromCity, toCity) {
  return LANES.find(l => l.from === fromCity && l.to === toCity);
}

export function getLaneById(id) {
  return LANES.find(l => l.id === id);
}
