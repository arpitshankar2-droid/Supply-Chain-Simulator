export function calculateTargetRate(spotRateData, carrier, priorityMode) {
  const { currentSpotRate, baseContractRate, marketAverage } = spotRateData;

  let targetMultiplier;
  switch (priorityMode) {
    case 'cost':
      targetMultiplier = 0.85;
      break;
    case 'speed':
      targetMultiplier = 0.95;
      break;
    default:
      targetMultiplier = 0.90;
  }

  const targetRate = Math.round(currentSpotRate * targetMultiplier);
  const flexibility = carrier.negotiationFlexibility;
  const floorRate = Math.round(baseContractRate * (1 + flexibility));
  const ceilingRate = currentSpotRate;

  return {
    data: {
      targetRate,
      floorRate,
      ceilingRate,
      flexibility: Math.round(flexibility * 100),
      savingsVsSpot: Math.round(((currentSpotRate - targetRate) / currentSpotRate) * 100),
      savingsVsMarket: Math.round(((marketAverage - targetRate) / marketAverage) * 100),
    },
    source: 'rule',
  };
}
