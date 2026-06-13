import { useEffect, useRef } from 'react';
import { useSimulation } from '../hooks/useSimulation';
import { useAgentRunner } from '../hooks/useAgentRunner';
import AgentPanel from '../components/agents/AgentPanel';
import HandoffIndicator from '../components/agents/HandoffIndicator';

export default function AgentLogsScreen() {
  const { state } = useSimulation();
  const { run } = useAgentRunner();
  const hasStarted = useRef(false);

  useEffect(() => {
    if (hasStarted.current) return;
    hasStarted.current = true;
    run();
  }, []);

  return (
    <div className="flex flex-col h-full py-4 px-4 animate-fade-in-up">
      <div className="text-center mb-4">
        <h2 className="text-xl font-bold text-dark-100 mb-1">Agent Analysis</h2>
        <p className="text-sm text-dark-400">
          Two AI agents working together to resolve the disruption
        </p>
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
