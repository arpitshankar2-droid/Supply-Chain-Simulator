import { useEffect, useRef } from 'react';
import { useSimulation } from '../hooks/useSimulation';
import { useAgentRunner } from '../hooks/useAgentRunner';
import { AGENT_STATUS } from '../config/constants';
import AgentPanel from '../components/agents/AgentPanel';
import HandoffIndicator from '../components/agents/HandoffIndicator';

const AGENT1_STEPS = [
  { label: 'Severity Assessment', desc: 'Classifying disruption risk level' },
  { label: 'Inventory Check', desc: 'Current stock & demand forecast' },
  { label: 'Stockout Analysis', desc: 'Revenue-at-risk calculation' },
  { label: 'Alternative Routes', desc: 'Finding backup corridors' },
  { label: 'Recommendation', desc: 'Ranking options by priority' },
];

const AGENT2_STEPS = [
  { label: 'Spot Rate Discovery', desc: 'Market rate for backup carriers' },
  { label: 'Target Rate Calc', desc: 'Setting negotiation floor & ceiling' },
  { label: 'Counter-Offer', desc: 'AI-drafted negotiation proposal' },
  { label: 'Carrier Negotiation', desc: 'Simulated carrier response' },
  { label: 'Booking & TMS', desc: 'Confirm shipment & update systems' },
];

export default function AgentLogsScreen() {
  const { state } = useSimulation();
  const { run } = useAgentRunner();
  const hasStarted = useRef(false);

  useEffect(() => {
    if (hasStarted.current) return;
    hasStarted.current = true;
    run();
  }, []);

  const a1Status = state.agents.agent1.status;
  const a2Status = state.agents.agent2.status;

  return (
    <div className="flex flex-col h-full py-4 px-4 animate-fade-in-up">
      <div className="text-center mb-3">
        <h2 className="text-lg font-bold text-dark-100 mb-1">Agent Analysis</h2>
        <p className="text-xs text-dark-400">
          Two AI agents working together to resolve the disruption
        </p>
      </div>

      {/* High-level pipeline summary */}
      <div className="flex flex-col lg:flex-row gap-3 mb-3 shrink-0">
        {/* Agent 1 pipeline */}
        <div className="flex-1 bg-dark-800 border border-dark-700 rounded-lg px-3 py-2" style={{ borderTopColor: '#3B82F6', borderTopWidth: '2px' }}>
          <div className="flex items-center gap-2 mb-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-agent1" />
            <span className="text-[11px] font-semibold text-dark-200">Analyst Pipeline</span>
            <span className={`ml-auto text-[10px] ${a1Status === AGENT_STATUS.COMPLETE ? 'text-accent-green' : a1Status === AGENT_STATUS.RUNNING ? 'text-accent-yellow' : 'text-dark-500'}`}>
              {a1Status === AGENT_STATUS.COMPLETE ? 'Done' : a1Status === AGENT_STATUS.RUNNING ? 'Running' : 'Pending'}
            </span>
          </div>
          <div className="flex gap-1.5 flex-wrap">
            {AGENT1_STEPS.map((s, i) => (
              <div key={i} className="flex items-center gap-1 bg-dark-900/60 rounded px-1.5 py-0.5" title={s.desc}>
                <span className={`w-1 h-1 rounded-full ${a1Status === AGENT_STATUS.COMPLETE ? 'bg-accent-green' : a1Status === AGENT_STATUS.RUNNING ? 'bg-accent-yellow animate-pulse' : 'bg-dark-600'}`} />
                <span className="text-[10px] text-dark-400">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Agent 2 pipeline */}
        <div className="flex-1 bg-dark-800 border border-dark-700 rounded-lg px-3 py-2" style={{ borderTopColor: '#A855F7', borderTopWidth: '2px' }}>
          <div className="flex items-center gap-2 mb-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-agent2" />
            <span className="text-[11px] font-semibold text-dark-200">Negotiator Pipeline</span>
            <span className={`ml-auto text-[10px] ${a2Status === AGENT_STATUS.COMPLETE ? 'text-accent-green' : a2Status === AGENT_STATUS.RUNNING ? 'text-accent-yellow' : 'text-dark-500'}`}>
              {a2Status === AGENT_STATUS.COMPLETE ? 'Done' : a2Status === AGENT_STATUS.RUNNING ? 'Running' : 'Pending'}
            </span>
          </div>
          <div className="flex gap-1.5 flex-wrap">
            {AGENT2_STEPS.map((s, i) => (
              <div key={i} className="flex items-center gap-1 bg-dark-900/60 rounded px-1.5 py-0.5" title={s.desc}>
                <span className={`w-1 h-1 rounded-full ${a2Status === AGENT_STATUS.COMPLETE ? 'bg-accent-green' : a2Status === AGENT_STATUS.RUNNING ? 'bg-accent-yellow animate-pulse' : 'bg-dark-600'}`} />
                <span className="text-[10px] text-dark-400">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row gap-4 min-h-0">
        <div className="flex-1 min-h-0 flex flex-col">
          <AgentPanel
            agentKey="agent1"
            name="Agent 1: Supply Chain Analyst"
            status={state.agents.agent1.status}
            logs={state.agents.agent1.logs}
            result={state.agents.agent1.result}
            color="#3B82F6"
          />
        </div>

        <div className="lg:flex lg:flex-col lg:justify-center">
          <HandoffIndicator visible={state.agents.handoffComplete} />
        </div>

        <div className="flex-1 min-h-0 flex flex-col">
          <AgentPanel
            agentKey="agent2"
            name="Agent 2: Rate Negotiator"
            status={state.agents.agent2.status}
            logs={state.agents.agent2.logs}
            result={state.agents.agent2.result}
            color="#A855F7"
          />
        </div>
      </div>
    </div>
  );
}
