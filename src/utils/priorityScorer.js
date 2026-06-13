import { PRIORITY_MODES } from '../config/constants';

export function scoreOption(option, priorityMode) {
  const { costDelta, timeDelta, reliability } = option;

  const costNorm = 1 - Math.min(costDelta / 5000, 1);
  const timeNorm = 1 - Math.min(timeDelta / 5, 1);
  const reliabilityNorm = reliability;

  switch (priorityMode) {
    case PRIORITY_MODES.COST:
      return costNorm * 0.6 + timeNorm * 0.2 + reliabilityNorm * 0.2;
    case PRIORITY_MODES.SPEED:
      return costNorm * 0.2 + timeNorm * 0.6 + reliabilityNorm * 0.2;
    case PRIORITY_MODES.BALANCED:
    default:
      return costNorm * 0.35 + timeNorm * 0.35 + reliabilityNorm * 0.3;
  }
}

export function rankOptions(options, priorityMode) {
  return options
    .map(opt => ({ ...opt, score: scoreOption(opt, priorityMode) }))
    .sort((a, b) => b.score - a.score);
}
