import Anthropic from '@anthropic-ai/sdk';
import { CLAUDE_MODEL, CLAUDE_MAX_TOKENS } from '../config/constants';

let client = null;

export function initClaudeClient(apiKey) {
  if (!apiKey) {
    client = null;
    return false;
  }
  try {
    client = new Anthropic({
      apiKey,
      dangerouslyAllowBrowser: true,
    });
    return true;
  } catch {
    client = null;
    return false;
  }
}

export async function callClaude(systemPrompt, userPrompt, maxTokens = CLAUDE_MAX_TOKENS) {
  if (!client) return null;

  try {
    const response = await client.messages.create({
      model: CLAUDE_MODEL,
      max_tokens: maxTokens,
      temperature: 1,
      system: systemPrompt,
      messages: [{ role: 'user', content: userPrompt }],
    });

    const text = response.content
      .filter(c => c.type === 'text')
      .map(c => c.text)
      .join('');

    return text;
  } catch (err) {
    console.warn('Claude API call failed, using fallback:', err.message);
    return null;
  }
}

export function isClaudeAvailable() {
  return client !== null;
}
