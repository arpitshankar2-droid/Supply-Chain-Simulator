// Disruption scenarios from BRD — Indian context
export const DISRUPTIONS = [
  {
    id: 'port-closure',
    name: 'Port Closure',
    icon: '🚢',
    description: 'JNPT (Nhava Sheva) port operations suspended due to labour strike — all outbound Mumbai shipments delayed by 3 days.',
    affectedCity: 'mumbai',
    affectedLanes: ['lane-1', 'lane-2'],
    delayDays: 3,
    costImpactPercent: 35,
    severity: 'high',
    category: 'infrastructure',
  },
  {
    id: 'customs-hold',
    name: 'Customs Hold',
    icon: '📋',
    description: 'Surprise customs inspection at Delhi ICD — all goods held for 48-hour document verification and physical checking.',
    affectedCity: 'delhi',
    affectedLanes: ['lane-3', 'lane-4'],
    delayDays: 2,
    costImpactPercent: 25,
    severity: 'medium',
    category: 'regulatory',
  },
  {
    id: 'weather-delay',
    name: 'Weather Delay',
    icon: '🌧️',
    description: 'Heavy monsoon flooding on NH-48 (Mumbai–Pune Expressway) and NH-44 corridor causing road closures.',
    affectedCity: 'pune',
    affectedLanes: ['lane-2', 'lane-4'],
    delayDays: 2,
    costImpactPercent: 20,
    severity: 'medium',
    category: 'weather',
  },
  {
    id: 'truck-breakdown',
    name: 'Truck Breakdown',
    icon: '🚛',
    description: 'Primary carrier fleet mechanical failure — 12 trucks grounded near Chennai. All Chennai–Bangalore loads must be re-assigned.',
    affectedCity: 'chennai',
    affectedLanes: ['lane-5', 'lane-1'],
    delayDays: 1,
    costImpactPercent: 40,
    severity: 'critical',
    category: 'carrier',
  },
];

export function getDisruption(id) {
  return DISRUPTIONS.find(d => d.id === id);
}
