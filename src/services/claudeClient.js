import { GoogleGenerativeAI } from '@google/generative-ai';
import { AI_MODEL, AI_MAX_TOKENS } from '../config/constants';

let model = null;

export function initClaudeClient(apiKey) {
  if (!apiKey) {
    model = null;
    return false;
  }
  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    model = genAI.getGenerativeModel({ model: AI_MODEL });
    return true;
  } catch {
    model = null;
    return false;
  }
}

export async function callClaude(systemPrompt, userPrompt, maxTokens = AI_MAX_TOKENS) {
  if (!model) return null;

  try {
    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: `${systemPrompt}\n\n${userPrompt}` }] }],
      generationConfig: {
        maxOutputTokens: maxTokens,
        temperature: 1,
      },
    });

    const response = result.response;
    return response.text();
  } catch (err) {
    console.warn('AI API call failed, using fallback:', err.message);
    return null;
  }
}

export function isClaudeAvailable() {
  return model !== null;
}
