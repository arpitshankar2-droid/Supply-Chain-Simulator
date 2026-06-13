import { DISRUPTIONS } from '../../data/disruptions';
import { useSimulation } from '../../hooks/useSimulation';

export default function DisruptionSelector() {
  const { state, updateConfig } = useSimulation();

  return (
    <div>
      <label className="block text-sm font-medium text-dark-200 mb-3">Disruption Scenario</label>
      <div className="grid grid-cols-2 gap-3">
        {DISRUPTIONS.map((d) => {
          const isSelected = state.config.disruptionId === d.id;
          return (
            <button
              key={d.id}
              onClick={() => updateConfig({ disruptionId: d.id })}
              className={`text-left p-3 rounded-lg border transition-all ${
                isSelected
                  ? 'border-accent-blue bg-accent-blue/10'
                  : 'border-dark-600 bg-dark-800 hover:border-dark-500'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-lg">{d.icon}</span>
                <span className={`text-sm font-medium ${isSelected ? 'text-accent-blue' : 'text-dark-200'}`}>
                  {d.name}
                </span>
              </div>
              <p className="text-xs text-dark-400 line-clamp-2">{d.description}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                  d.severity === 'critical' ? 'bg-accent-red/20 text-accent-red' :
                  d.severity === 'high' ? 'bg-accent-yellow/20 text-accent-yellow' :
                  'bg-accent-blue/20 text-accent-blue'
                }`}>
                  {d.severity}
                </span>
                <span className="text-[10px] text-dark-500">+{d.delayDays}d delay</span>
                <span className="text-[10px] text-dark-500">+{d.costImpactPercent}% cost</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
