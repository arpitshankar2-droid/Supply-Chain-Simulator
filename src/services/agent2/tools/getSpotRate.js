export function getSpotRate(carrier, lane, disruption) {
  const baseRate = lane.rates[carrier.tier] || lane.rates.preferred;
  const surcharge = disruption.costImpactPercent / 100;
  const spotRate = Math.round(baseRate * carrier.spotPremium * (1 + surcharge));
  const marketAvg = Math.round(baseRate * 1.15 * (1 + surcharge));

  return {
    data: {
      carrierId: carrier.id,
      carrierName: carrier.name,
      baseContractRate: baseRate,
      currentSpotRate: spotRate,
      marketAverage: marketAvg,
      surchargePercent: Math.round(surcharge * 100),
      premiumOverContract: Math.round(((spotRate - baseRate) / baseRate) * 100),
    },
    source: 'simulation',
  };
}
