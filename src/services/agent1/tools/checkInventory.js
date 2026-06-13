export function checkInventory(inventoryDays, disruption) {
  const dailyDemandUnits = 150;
  const currentStock = inventoryDays * dailyDemandUnits;
  const delayedDays = disruption.delayDays;
  const stockAfterDelay = Math.max(0, currentStock - (delayedDays * dailyDemandUnits));
  const daysUntilStockout = Math.max(0, inventoryDays - delayedDays);
  const stockoutRisk = daysUntilStockout <= 1 ? 'critical' : daysUntilStockout <= 3 ? 'high' : 'moderate';

  return {
    data: {
      currentStock,
      dailyDemandUnits,
      stockAfterDelay,
      daysUntilStockout,
      stockoutRisk,
      inventoryDays,
      delayDays: delayedDays,
    },
    source: 'rule',
  };
}
