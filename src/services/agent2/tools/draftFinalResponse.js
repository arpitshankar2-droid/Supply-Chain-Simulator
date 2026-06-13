import { formatCurrency } from '../../../utils/formatCurrency';

export function draftFinalResponse(negotiationResult, analysis) {
  const { accepted, finalRate } = negotiationResult;
  const carrier = analysis.topRecommendation;
  const costIncrease = finalRate
    ? Math.round(((finalRate - carrier.contractRate) / carrier.contractRate) * 100)
    : 0;

  return {
    data: {
      summary: accepted
        ? `Successfully negotiated with ${carrier.carrierName}. Final rate: ${formatCurrency(finalRate)} (${costIncrease}% over contract). Transit: ${carrier.transitDays} days.`
        : `Negotiation with ${carrier.carrierName} did not reach agreement. Moving to next option.`,
      costIncrease,
      accepted,
      finalRate: finalRate || carrier.spotRate,
      transitDays: carrier.transitDays,
      carrierName: carrier.carrierName,
      carrierId: carrier.carrierId,
      carrierTier: carrier.carrierTier,
    },
    source: 'rule',
  };
}
