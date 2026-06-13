import { LANES } from '../../../data/lanes';
import { CARRIERS } from '../../../data/carriers';

export function getAltRoutes(disruption, priorityMode) {
  const affectedLanes = disruption.affectedLanes;
  const availableLanes = LANES.filter(l => !affectedLanes.includes(l.id));

  const options = CARRIERS.map((carrier) => {
    // Pick best available lane for this carrier
    const lane = availableLanes[0] || LANES[0];
    const baseRate = lane.rates[carrier.tier] || lane.rates.preferred;
    const spotRate = Math.round(baseRate * carrier.spotPremium * (1 + disruption.costImpactPercent / 100));
    const transitDays = lane.normalTransitDays + (carrier.tier === 'new' ? 1 : 0);

    return {
      carrierId: carrier.id,
      carrierName: carrier.name,
      carrierTier: carrier.tier,
      lane: lane,
      laneId: lane.id,
      from: lane.from,
      to: lane.to,
      spotRate,
      contractRate: baseRate,
      costDelta: spotRate - baseRate,
      transitDays,
      timeDelta: transitDays - lane.normalTransitDays + disruption.delayDays,
      reliability: carrier.onTimeRate,
      distance: lane.distance,
    };
  });

  return {
    data: {
      options,
      affectedLanes,
      availableLanes: availableLanes.map(l => l.id),
    },
    source: 'rule',
  };
}
