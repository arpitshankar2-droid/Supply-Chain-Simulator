import { useSimulation } from '../hooks/useSimulation';
import { SCREENS } from '../config/constants';
import { getDisruption } from '../data/disruptions';
import { LANES } from '../data/lanes';
import { CARRIERS } from '../data/carriers';
import { CITIES } from '../data/cities';
import { formatCurrency } from '../utils/formatCurrency';
import DisruptionSelector from '../components/setup/DisruptionSelector';
import InventorySlider from '../components/setup/InventorySlider';
import ApprovalThreshold from '../components/setup/ApprovalThreshold';
import PriorityToggle from '../components/setup/PriorityToggle';

export default function SetupScreen() {
  const { state, setScreen } = useSimulation();
  const disruption = getDisruption(state.config.disruptionId);

  const primaryLaneId = disruption?.affectedLanes?.[0];
  const primaryLane = LANES.find(l => l.id === primaryLaneId);
  const preferredCarrier = CARRIERS.find(c => c.tier === 'preferred');

  return (
    <div className="h-full flex flex-col lg:flex-row animate-fade-in-up">
      {/* Left sidebar — How it works + Shipment info */}
      <div className="lg:w-72 shrink-0 border-r border-dark-700 bg-dark-800/50 p-5 overflow-y-auto">
        <h2 className="text-sm font-bold text-dark-100 mb-4 uppercase tracking-wide">How it works</h2>
        <div className="space-y-3">
          {[
            { step: '1', title: 'Configure', desc: 'Pick a disruption and set parameters' },
            { step: '2', title: 'Visualise', desc: 'Watch the map, trigger an alert' },
            { step: '3', title: 'AI Agents', desc: 'Analyst assesses risk, Negotiator gets rates' },
            { step: '4', title: 'Approve', desc: 'Human-in-the-loop for high-cost plans' },
            { step: '5', title: 'Report', desc: 'Before vs after comparison' },
          ].map(s => (
            <div key={s.step} className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-accent-blue/15 text-accent-blue text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">{s.step}</div>
              <div>
                <div className="text-xs font-semibold text-dark-200">{s.title}</div>
                <div className="text-[11px] text-dark-500 leading-snug">{s.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Current Shipment Info */}
        {primaryLane && preferredCarrier && (
          <div className="mt-6 pt-5 border-t border-dark-700">
            <h3 className="text-[10px] font-bold text-dark-400 uppercase tracking-wider mb-3">Active Shipment</h3>
            <div className="space-y-2.5">
              <div className="flex justify-between items-center">
                <span className="text-[11px] text-dark-500">Route</span>
                <span className="text-xs text-dark-200 font-medium">
                  {CITIES[primaryLane.from]?.name} → {CITIES[primaryLane.to]?.name}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[11px] text-dark-500">Distance</span>
                <span className="text-xs text-dark-200">{primaryLane.distance} km</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[11px] text-dark-500">Carrier</span>
                <span className="text-xs text-dark-200">{preferredCarrier.name.split(' — ')[1]}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[11px] text-dark-500">Contract Rate</span>
                <span className="text-xs text-accent-green font-medium">{formatCurrency(primaryLane.rates.preferred)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[11px] text-dark-500">Transit</span>
                <span className="text-xs text-dark-200">{primaryLane.normalTransitDays} days ({primaryLane.mode})</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[11px] text-dark-500">Reliability</span>
                <span className="text-xs text-dark-200">{Math.round(preferredCarrier.onTimeRate * 100)}%</span>
              </div>
            </div>
          </div>
        )}

        {/* AI mode */}
        <div className="mt-5 pt-4 border-t border-dark-700">
          <div className={`flex items-center gap-2 text-[11px] ${state.config.apiKey ? 'text-accent-green' : 'text-accent-yellow'}`}>
            <span className="w-1.5 h-1.5 rounded-full bg-current" />
            {state.config.apiKey ? 'Live AI Mode' : 'Demo Mode (simulated responses)'}
          </div>
        </div>
      </div>

      {/* Right — Configuration panel + Start button */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-2xl mx-auto space-y-5">
          <DisruptionSelector />
          <div className="h-px bg-dark-700" />
          <div className="grid grid-cols-2 gap-6">
            <InventorySlider />
            <ApprovalThreshold />
          </div>
          <div className="h-px bg-dark-700" />
          <PriorityToggle />

          {/* Start button — center of config area */}
          <div className="pt-4 text-center">
            <button
              onClick={() => setScreen(SCREENS.MAP)}
              className="px-10 py-3.5 bg-accent-blue hover:bg-accent-blue/90 text-white font-semibold rounded-lg transition-colors text-sm shadow-lg shadow-accent-blue/20"
            >
              Start Simulation →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
