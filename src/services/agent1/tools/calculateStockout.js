export function calculateStockout(inventoryData, demandData) {
  const { currentStock, delayDays } = inventoryData;
  const { avgDemand } = demandData;

  const stockoutDay = Math.floor(currentStock / avgDemand);
  const unitsShort = Math.max(0, (delayDays * avgDemand) - currentStock);
  const revenueAtRisk = unitsShort * 3500; // ₹3,500 per unit revenue
  const stockoutProbability = Math.min(1, Math.max(0, 1 - (stockoutDay / (delayDays + 1))));

  return {
    data: {
      stockoutDay,
      unitsShort,
      revenueAtRisk,
      stockoutProbability: Math.round(stockoutProbability * 100),
      urgency: stockoutProbability > 0.7 ? 'critical' : stockoutProbability > 0.4 ? 'high' : 'moderate',
    },
    source: 'rule',
  };
}
