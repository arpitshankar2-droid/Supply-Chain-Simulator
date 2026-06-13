import { useRef, useCallback } from 'react';
import { useSimulation } from './useSimulation';
import { runOrchestrator } from '../services/agentOrchestrator';
import { SCREENS } from '../config/constants';

export function useAgentRunner() {
  const sim = useSimulation();
  const runningRef = useRef(false);
  const stateRef = useRef(sim.state);
  stateRef.current = sim.state;

  const run = useCallback(async () => {
    if (runningRef.current) return;
    runningRef.current = true;

    try {
      const result = await runOrchestrator(stateRef.current, sim);

      if (result.needsApproval) {
        sim.setScreen(SCREENS.APPROVAL);
      } else {
        sim.setScreen(SCREENS.SUMMARY);
      }
    } catch (err) {
      console.error('Orchestrator error:', err);
    } finally {
      runningRef.current = false;
    }
  }, [sim]);

  return { run };
}
