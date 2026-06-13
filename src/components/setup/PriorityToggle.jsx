import { useSimulation } from '../../hooks/useSimulation';
import { PRIORITY_MODES } from '../../config/constants';

const MODE_INFO = {
  [PRIORITY_MODES.COST]: {
    label: 'Cost',
    description: 'Minimize total cost, accept longer transit',
    icon: '$',
  },
  [PRIORITY_MODES.SPEED]: {
    label: 'Speed',
    description: 'Fastest delivery, accept higher cost',
    icon: '⚡',
  },
  [PRIORITY_MODES.BALANCED]: {
    label: 'Balanced',
    description: 'Optimize cost and speed equally',
    icon: '⚖️',
  },
};

export default function PriorityToggle() {
  const { state, updateConfig } = useSimulation();

  return (
    <div>
      <label className="block text-sm font-medium text-dark-200 mb-3">Priority Mode</label>
      <div className="flex gap-2">
        {Object.entries(MODE_INFO).map(([mode, info]) => {
          const isSelected = state.config.priorityMode === mode;
          return (
            <button
              key={mode}
              onClick={() => updateConfig({ priorityMode: mode })}
              className={`flex-1 p-3 rounded-lg border transition-all text-center ${
                isSelected
                  ? 'border-accent-cyan bg-accent-cyan/10'
                  : 'border-dark-600 bg-dark-800 hover:border-dark-500'
              }`}
            >
              <div className="text-lg mb-1">{info.icon}</div>
              <div className={`text-sm font-medium ${isSelected ? 'text-accent-cyan' : 'text-dark-200'}`}>
                {info.label}
              </div>
              <div className="text-[10px] text-dark-400 mt-1">{info.description}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
