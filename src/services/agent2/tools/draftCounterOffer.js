import { callClaude, isClaudeAvailable, parseJsonResponse } from '../../claudeClient';
import { FALLBACK_RESPONSES } from '../../../data/fallbackResponses';

export async function draftCounterOffer(carrier, targetRateData, spotRateData) {
  const fallback = FALLBACK_RESPONSES.draftCounterOffer[carrier.tier];
  const counterRate = targetRateData.targetRate;

  if (isClaudeAvailable()) {
    const systemPrompt = `You are a logistics negotiator for Indian freight corridors drafting counter-offers in INR. Respond ONLY with a JSON object (no markdown, no explanation) with fields: counterRate (number in INR), justification (2-3 sentences, vary your phrasing), tone (collaborative/firm-but-fair/opportunity-framing).`;
    const userPrompt = `Draft a counter-offer for carrier "${carrier.name}" (${carrier.tier} tier) on Indian routes:
- Their spot rate: ₹${spotRateData.currentSpotRate.toLocaleString('en-IN')}
- Our target rate: ₹${targetRateData.targetRate.toLocaleString('en-IN')}
- Contract rate: ₹${spotRateData.baseContractRate.toLocaleString('en-IN')}
- Market average: ₹${spotRateData.marketAverage.toLocaleString('en-IN')}
- Carrier flexibility: ${targetRateData.flexibility}%
- Our counter: ₹${counterRate.toLocaleString('en-IN')}`;

    const response = await callClaude(systemPrompt, userPrompt, 300);
    const parsed = parseJsonResponse(response);
    if (parsed && parsed.justification) {
      return { data: { ...parsed, counterRate: parsed.counterRate || counterRate }, source: 'claude' };
    }
  }

  return {
    data: { ...fallback, counterRate },
    source: 'fallback',
  };
}
