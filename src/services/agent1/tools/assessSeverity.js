import { callClaude, isClaudeAvailable } from '../../claudeClient';
import { FALLBACK_RESPONSES } from '../../../data/fallbackResponses';

export async function assessSeverity(disruption) {
  const fallback = FALLBACK_RESPONSES.assessSeverity[disruption.id];

  if (isClaudeAvailable()) {
    const systemPrompt = `You are a supply chain risk analyst specialising in Indian logistics corridors. Assess the severity of disruptions on Indian freight routes. Respond in JSON format with fields: severity (low/medium/high/critical), reasoning (2-3 sentences), riskScore (1-10), recommendation (1 sentence).`;
    const userPrompt = `Assess this supply chain disruption:
- Type: ${disruption.name}
- Description: ${disruption.description}
- Affected Area: ${disruption.affectedCity}
- Expected Delay: ${disruption.delayDays} days
- Cost Impact: +${disruption.costImpactPercent}%
- Category: ${disruption.category}`;

    const response = await callClaude(systemPrompt, userPrompt, 300);
    if (response) {
      try {
        const parsed = JSON.parse(response.replace(/```json\n?|\n?```/g, '').trim());
        return { data: parsed, source: 'claude' };
      } catch {
        // Fall through to fallback
      }
    }
  }

  return { data: fallback, source: 'fallback' };
}
