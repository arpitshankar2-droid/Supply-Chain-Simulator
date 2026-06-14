import { callClaude, isClaudeAvailable, parseJsonResponse } from '../../claudeClient';
import { FALLBACK_RESPONSES } from '../../../data/fallbackResponses';

export async function simulateCarrierReply(carrier, counterOffer, spotRateData) {
  const fallback = FALLBACK_RESPONSES.simulateCarrierReply[carrier.tier];
  const acceptThreshold = spotRateData.currentSpotRate * (1 - carrier.negotiationFlexibility);
  const accepted = counterOffer.counterRate >= acceptThreshold;
  const finalRate = accepted
    ? Math.round((counterOffer.counterRate + spotRateData.currentSpotRate) / 2)
    : null;
  const carrierCounter = accepted
    ? null
    : Math.round(spotRateData.currentSpotRate * 0.95);

  if (isClaudeAvailable()) {
    const systemPrompt = `You are simulating an Indian freight carrier's reply to a rate negotiation in INR. Respond ONLY with a JSON object (no markdown, no explanation) with fields: accepted (boolean), finalRate (number in INR or null), message (1-2 sentences from the carrier's perspective, vary your phrasing), counterOffer (number in INR or null if accepted).`;
    const userPrompt = `Simulate ${carrier.name}'s reply to this counter-offer on Indian routes:
- Counter-offer rate: ₹${counterOffer.counterRate.toLocaleString('en-IN')}
- Their original spot rate: ₹${spotRateData.currentSpotRate.toLocaleString('en-IN')}
- Accept threshold: ₹${Math.round(acceptThreshold).toLocaleString('en-IN')}
- Carrier flexibility: ${Math.round(carrier.negotiationFlexibility * 100)}%
- Should accept: ${accepted}
${accepted ? `- Settle at: ₹${finalRate.toLocaleString('en-IN')}` : `- Counter back at: ₹${carrierCounter.toLocaleString('en-IN')}`}`;

    const response = await callClaude(systemPrompt, userPrompt, 300);
    const parsed = parseJsonResponse(response);
    if (parsed && parsed.message) {
      return {
        data: {
          accepted: parsed.accepted ?? accepted,
          finalRate: parsed.finalRate ?? finalRate,
          message: parsed.message,
          counterOffer: parsed.counterOffer ?? carrierCounter,
        },
        source: 'claude',
      };
    }
  }

  return {
    data: {
      ...fallback,
      accepted,
      finalRate: accepted ? finalRate : null,
      counterOffer: accepted ? null : carrierCounter,
    },
    source: 'fallback',
  };
}
