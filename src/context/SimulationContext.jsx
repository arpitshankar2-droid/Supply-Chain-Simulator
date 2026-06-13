import { createContext, useReducer, useMemo } from 'react';
import { simulationReducer, initialState } from './simulationReducer';

export const SimulationContext = createContext(null);

export function SimulationProvider({ children }) {
  const [state, dispatch] = useReducer(simulationReducer, initialState);

  const actions = useMemo(() => ({
    setScreen: (screen) => dispatch({ type: 'SET_SCREEN', payload: screen }),
    updateConfig: (config) => dispatch({ type: 'UPDATE_CONFIG', payload: config }),
    setMapPhase: (phase) => dispatch({ type: 'SET_MAP_PHASE', payload: phase }),
    setMapDisruption: (city, lanes) => dispatch({ type: 'SET_MAP_DISRUPTION', payload: { city, lanes } }),
    setMapReroute: (lane) => dispatch({ type: 'SET_MAP_REROUTE', payload: lane }),
    setAgentStatus: (agent, status) => dispatch({ type: 'SET_AGENT_STATUS', payload: { agent, status } }),
    setAgentPhase: (agent, phase) => dispatch({ type: 'SET_AGENT_PHASE', payload: { agent, phase } }),
    addAgentLog: (agent, log) => dispatch({ type: 'ADD_AGENT_LOG', payload: { agent, log } }),
    setAgentResult: (agent, result) => dispatch({ type: 'SET_AGENT_RESULT', payload: { agent, result } }),
    setActiveAgent: (agent) => dispatch({ type: 'SET_ACTIVE_AGENT', payload: agent }),
    setHandoffComplete: () => dispatch({ type: 'SET_HANDOFF_COMPLETE' }),
    setApproval: (data) => dispatch({ type: 'SET_APPROVAL', payload: data }),
    setApprovalStatus: (status) => dispatch({ type: 'SET_APPROVAL_STATUS', payload: status }),
    tickCountdown: () => dispatch({ type: 'TICK_COUNTDOWN' }),
    setSummary: (data) => dispatch({ type: 'SET_SUMMARY', payload: data }),
    resetAgents: () => dispatch({ type: 'RESET_AGENTS' }),
    resetForReplan: () => dispatch({ type: 'RESET_FOR_REPLAN' }),
    resetAll: () => dispatch({ type: 'RESET_ALL' }),
  }), []);

  const value = useMemo(() => ({ state, dispatch, ...actions }), [state, actions]);

  return (
    <SimulationContext.Provider value={value}>
      {children}
    </SimulationContext.Provider>
  );
}
