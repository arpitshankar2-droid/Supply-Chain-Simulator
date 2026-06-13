import { SCREENS, AGENT_STATUS, APPROVAL_STATUS } from '../config/constants';

export const initialState = {
  currentScreen: SCREENS.SETUP,

  config: {
    disruptionId: 'port-closure',
    inventoryDays: 5,
    approvalThreshold: 15,
    priorityMode: 'balanced',
    apiKey: '',
  },

  map: {
    phase: 'idle', // idle, normal, disruption, reroute
    shipments: [],
    disruptedCity: null,
    disruptedLanes: [],
    rerouteLane: null,
  },

  agents: {
    agent1: {
      status: AGENT_STATUS.IDLE,
      currentPhase: '',
      logs: [],
      result: null,
    },
    agent2: {
      status: AGENT_STATUS.IDLE,
      currentPhase: '',
      logs: [],
      result: null,
    },
    handoffComplete: false,
    activeAgent: null,
  },

  approval: {
    required: false,
    status: APPROVAL_STATUS.SKIPPED,
    countdown: 30,
    costDelta: 0,
    recommendation: null,
  },

  summary: {
    before: null,
    after: null,
    agentLogs: [],
    usedClaude: false,
    selectedCarrier: null,
    negotiatedRate: 0,
    originalRate: 0,
  },
};

export function simulationReducer(state, action) {
  switch (action.type) {
    case 'SET_SCREEN':
      return { ...state, currentScreen: action.payload };

    case 'UPDATE_CONFIG':
      return {
        ...state,
        config: { ...state.config, ...action.payload },
      };

    case 'SET_MAP_PHASE':
      return {
        ...state,
        map: { ...state.map, phase: action.payload },
      };

    case 'SET_MAP_DISRUPTION':
      return {
        ...state,
        map: {
          ...state.map,
          disruptedCity: action.payload.city,
          disruptedLanes: action.payload.lanes,
        },
      };

    case 'SET_MAP_REROUTE':
      return {
        ...state,
        map: { ...state.map, rerouteLane: action.payload },
      };

    case 'SET_AGENT_STATUS': {
      const { agent, status } = action.payload;
      return {
        ...state,
        agents: {
          ...state.agents,
          [agent]: { ...state.agents[agent], status },
        },
      };
    }

    case 'SET_AGENT_PHASE': {
      const { agent, phase } = action.payload;
      return {
        ...state,
        agents: {
          ...state.agents,
          [agent]: { ...state.agents[agent], currentPhase: phase },
        },
      };
    }

    case 'ADD_AGENT_LOG': {
      const { agent, log } = action.payload;
      return {
        ...state,
        agents: {
          ...state.agents,
          [agent]: {
            ...state.agents[agent],
            logs: [...state.agents[agent].logs, log],
          },
        },
      };
    }

    case 'SET_AGENT_RESULT': {
      const { agent, result } = action.payload;
      return {
        ...state,
        agents: {
          ...state.agents,
          [agent]: { ...state.agents[agent], result },
        },
      };
    }

    case 'SET_ACTIVE_AGENT':
      return {
        ...state,
        agents: { ...state.agents, activeAgent: action.payload },
      };

    case 'SET_HANDOFF_COMPLETE':
      return {
        ...state,
        agents: { ...state.agents, handoffComplete: true },
      };

    case 'SET_APPROVAL':
      return {
        ...state,
        approval: { ...state.approval, ...action.payload },
      };

    case 'SET_APPROVAL_STATUS':
      return {
        ...state,
        approval: { ...state.approval, status: action.payload },
      };

    case 'TICK_COUNTDOWN':
      return {
        ...state,
        approval: {
          ...state.approval,
          countdown: Math.max(0, state.approval.countdown - 1),
        },
      };

    case 'SET_SUMMARY':
      return {
        ...state,
        summary: { ...state.summary, ...action.payload },
      };

    case 'RESET_AGENTS':
      return {
        ...state,
        agents: {
          agent1: { ...initialState.agents.agent1, logs: [] },
          agent2: { ...initialState.agents.agent2, logs: [] },
          handoffComplete: false,
          activeAgent: null,
        },
      };

    case 'RESET_FOR_REPLAN':
      return {
        ...state,
        agents: {
          ...state.agents,
          agent2: { ...initialState.agents.agent2, logs: [] },
          handoffComplete: false,
        },
        approval: { ...initialState.approval },
      };

    case 'RESET_ALL':
      return { ...initialState };

    default:
      return state;
  }
}
