import { runAnalystAgent } from './agent1/analystAgent';
import { runNegotiatorAgent } from './agent2/negotiatorAgent';
import { initClaudeClient } from './claudeClient';
import { getDisruption } from '../data/disruptions';
import { delay } from '../utils/delay';
import { TIMING, AGENT_STATUS, APPROVAL_STATUS } from '../config/constants';

export async function runOrchestrator(state, actions, streamLog) {
  const config = state.config;
  const disruption = getDisruption(config.disruptionId);

  // Init Claude client
  initClaudeClient(config.apiKey);

  // --- Agent 1: Analyst ---
  actions.setActiveAgent('agent1');
  actions.setAgentStatus('agent1', AGENT_STATUS.RUNNING);

  const agent1Logs = [];
  const addLog1 = (entry) => {
    agent1Logs.push(entry);
  };

  const agent1Result = await runAnalystAgent(config, disruption, addLog1);

  // Stream logs with pacing
  for (const log of agent1Logs) {
    actions.addAgentLog('agent1', log);
    await delay(TIMING.LOG_LINE_PACE);
  }

  actions.setAgentResult('agent1', agent1Result);
  actions.setAgentStatus('agent1', AGENT_STATUS.COMPLETE);

  // --- Handoff ---
  await delay(TIMING.HANDOFF_DURATION);
  actions.setHandoffComplete();

  // --- Agent 2: Negotiator ---
  actions.setActiveAgent('agent2');
  actions.setAgentStatus('agent2', AGENT_STATUS.RUNNING);

  const agent2Logs = [];
  const addLog2 = (entry) => {
    agent2Logs.push(entry);
  };

  const agent2Result = await runNegotiatorAgent(agent1Result, config, addLog2);

  // Stream logs with pacing
  for (const log of agent2Logs) {
    actions.addAgentLog('agent2', log);
    await delay(TIMING.LOG_LINE_PACE);
  }

  actions.setAgentResult('agent2', agent2Result);
  actions.setAgentStatus('agent2', AGENT_STATUS.COMPLETE);
  actions.setActiveAgent(null);

  // --- Determine if approval needed ---
  const costIncrease = agent2Result.costIncrease;
  const needsApproval = costIncrease > config.approvalThreshold;

  // Build summary data
  const summaryData = {
    before: {
      rate: agent2Result.originalRate,
      transitDays: agent1Result.topRecommendation.transitDays - disruption.delayDays,
      reliability: agent1Result.topRecommendation.reliability,
      carrier: 'Original Carrier',
    },
    after: {
      rate: agent2Result.negotiatedRate,
      transitDays: agent1Result.topRecommendation.transitDays,
      reliability: agent1Result.topRecommendation.reliability,
      carrier: agent2Result.finalResponse.carrierName,
    },
    usedClaude: agent1Result.usedClaude || agent2Result.usedClaude,
    selectedCarrier: agent2Result.finalResponse.carrierName,
    negotiatedRate: agent2Result.negotiatedRate,
    originalRate: agent2Result.originalRate,
  };

  if (needsApproval) {
    actions.setApproval({
      required: true,
      status: APPROVAL_STATUS.PENDING,
      countdown: TIMING.APPROVAL_COUNTDOWN,
      costDelta: costIncrease,
      recommendation: agent2Result.finalResponse,
    });
    actions.setSummary(summaryData);
    return { needsApproval: true, agent1Result, agent2Result, summaryData };
  }

  // Auto-execute — skip approval
  actions.setApproval({
    required: false,
    status: APPROVAL_STATUS.SKIPPED,
  });
  actions.setSummary(summaryData);
  return { needsApproval: false, agent1Result, agent2Result, summaryData };
}
