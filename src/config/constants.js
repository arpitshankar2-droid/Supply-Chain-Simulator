export const TIMING = {
  MAP_NORMAL_DURATION: 3000,
  MAP_DISRUPTION_PAUSE: 2500,
  LOG_LINE_PACE: 800,
  HANDOFF_DURATION: 1500,
  APPROVAL_COUNTDOWN: 30,
  DOT_ANIMATION_DURATION: 4000,
};

export const THRESHOLDS = {
  DEFAULT_INVENTORY_DAYS: 5,
  MIN_INVENTORY_DAYS: 1,
  MAX_INVENTORY_DAYS: 14,
  DEFAULT_APPROVAL_PERCENT: 15,
  MIN_APPROVAL_PERCENT: 5,
  MAX_APPROVAL_PERCENT: 50,
};

export const PRIORITY_MODES = {
  COST: 'cost',
  SPEED: 'speed',
  BALANCED: 'balanced',
};

export const SCREENS = {
  SETUP: 'setup',
  MAP: 'map',
  AGENTS: 'agents',
  APPROVAL: 'approval',
  SUMMARY: 'summary',
};

export const SCREEN_LABELS = {
  [SCREENS.SETUP]: 'Configuration',
  [SCREENS.MAP]: 'Supply Chain Map',
  [SCREENS.AGENTS]: 'Agent Analysis',
  [SCREENS.APPROVAL]: 'Human Approval',
  [SCREENS.SUMMARY]: 'After-Action Report',
};

export const SCREEN_ORDER = [
  SCREENS.SETUP,
  SCREENS.MAP,
  SCREENS.AGENTS,
  SCREENS.APPROVAL,
  SCREENS.SUMMARY,
];

export const AGENT_STATUS = {
  IDLE: 'idle',
  RUNNING: 'running',
  COMPLETE: 'complete',
  ERROR: 'error',
};

export const APPROVAL_STATUS = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  AUTO: 'auto',
  SKIPPED: 'skipped',
};

export const AI_MODEL = 'gemini-2.0-flash';
export const AI_MAX_TOKENS = 1024;
