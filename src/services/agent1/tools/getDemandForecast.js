export function getDemandForecast(disruption) {
  const baseDemand = 150;
  const demandMultiplier = disruption.id === 'demand-surge' ? 1.4 : 1.0;
  const forecastDays = 7;

  const forecast = Array.from({ length: forecastDays }, (_, i) => ({
    day: i + 1,
    units: Math.round(baseDemand * demandMultiplier * (1 + Math.random() * 0.1 - 0.05)),
  }));

  const avgDemand = Math.round(forecast.reduce((sum, d) => sum + d.units, 0) / forecastDays);
  const peakDemand = Math.max(...forecast.map(d => d.units));

  return {
    data: {
      forecast,
      avgDemand,
      peakDemand,
      demandMultiplier,
      trend: demandMultiplier > 1 ? 'increasing' : 'stable',
    },
    source: 'rule',
  };
}
