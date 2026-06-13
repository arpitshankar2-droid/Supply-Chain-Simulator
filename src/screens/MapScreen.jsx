import { useEffect, useRef, useState, useCallback } from 'react';
import { useSimulation } from '../hooks/useSimulation';
import { getDisruption } from '../data/disruptions';
import { LANES } from '../data/lanes';
import { CARRIERS } from '../data/carriers';
import { CITIES } from '../data/cities';
import { SCREENS, TIMING } from '../config/constants';
import { formatCurrency } from '../utils/formatCurrency';
import SupplyChainMap from '../components/map/SupplyChainMap';

export default function MapScreen() {
  const { state, setScreen, setMapPhase, setMapDisruption, setMapReroute } = useSimulation();
  const timerRef = useRef(null);
  const hasStarted = useRef(false);
  const [alertTriggered, setAlertTriggered] = useState(false);

  const disruption = getDisruption(state.config.disruptionId);

  // Calculate loss figures
  const affectedLanes = LANES.filter(l => disruption.affectedLanes.includes(l.id));
  const dailyShipmentsPerLane = 3;
  const dailyRevenueLoss = affectedLanes.reduce((sum, lane) => {
    return sum + (lane.rates.preferred * dailyShipmentsPerLane * disruption.costImpactPercent / 100);
  }, 0);
  const currentLoss = Math.round(dailyRevenueLoss * disruption.delayDays);
  const additionalDailyLoss = Math.round(dailyRevenueLoss);

  // Start normal operations on mount
  useEffect(() => {
    if (hasStarted.current) return;
    hasStarted.current = true;
    setMapPhase('normal');

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  // User triggers disruption via button
  const handleTriggerAlert = useCallback(() => {
    if (alertTriggered) return;
    setAlertTriggered(true);

    setMapPhase('disruption');
    setMapDisruption(disruption.affectedCity, disruption.affectedLanes);

    timerRef.current = setTimeout(() => {
      const rerouteLane = LANES.find(l => !disruption.affectedLanes.includes(l.id));
      if (rerouteLane) {
        setMapReroute(rerouteLane.id);
      }
      setMapPhase('reroute');

      timerRef.current = setTimeout(() => {
        setScreen(SCREENS.AGENTS);
      }, TIMING.MAP_DISRUPTION_PAUSE);
    }, TIMING.MAP_DISRUPTION_PAUSE);
  }, [alertTriggered, disruption, setMapPhase, setMapDisruption, setMapReroute, setScreen]);

  return (
    <div className="max-w-5xl mx-auto py-6 px-4 animate-fade-in-up">
      <div className="text-center mb-4">
        <h2 className="text-xl font-bold text-dark-100 mb-1">India Supply Chain Network</h2>
        <p className="text-sm text-dark-400">
          {state.map.phase === 'normal' && 'Shipments are flowing normally — trigger an alert to simulate a disruption.'}
          {state.map.phase === 'disruption' && `⚠ ${disruption.name} detected — ${disruption.description}`}
          {state.map.phase === 'reroute' && 'Agents activating — analysing alternative routes...'}
          {state.map.phase === 'idle' && 'Initialising network...'}
        </p>
      </div>

      {/* Prominent trigger banner — shown above map during normal operations */}
      {state.map.phase === 'normal' && !alertTriggered && (
        <div className="mb-4 animate-fade-in-up">
          <button
            onClick={handleTriggerAlert}
            className="w-full group relative flex items-center justify-center gap-4 px-6 py-4 bg-accent-red/10 hover:bg-accent-red/20 border-2 border-accent-red/50 hover:border-accent-red rounded-xl transition-all duration-300"
          >
            <span className="absolute inset-0 rounded-xl border-2 border-accent-red/30 animate-pulse-ring" />

            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-accent-red shrink-0">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>

            <div className="text-left">
              <div className="text-accent-red font-bold text-base">Trigger Disruption Alert</div>
              <div className="text-dark-400 text-xs">
                Click to activate AI agents — {disruption.icon} {disruption.name} at {disruption.affectedCity.charAt(0).toUpperCase() + disruption.affectedCity.slice(1)}
              </div>
            </div>

            <span className="ml-auto text-accent-red text-xl font-semibold group-hover:translate-x-1 transition-transform">→</span>
          </button>
        </div>
      )}

      <SupplyChainMap mapState={state.map} disruption={disruption} />

      {/* Loss ticker — shown after disruption is triggered */}
      {(state.map.phase === 'disruption' || state.map.phase === 'reroute') && (
        <div className="mt-4 animate-fade-in-up">
          <div className="bg-accent-red/5 border border-accent-red/30 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
              <span className="text-sm font-semibold text-accent-red">Impact Assessment</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <div className="text-[10px] text-dark-500 uppercase tracking-wide mb-0.5">Lanes Affected</div>
                <div className="text-lg font-bold text-accent-red">{affectedLanes.length}</div>
                <div className="text-[11px] text-dark-400">
                  {affectedLanes.map(l => `${CITIES[l.from]?.name}→${CITIES[l.to]?.name}`).join(', ')}
                </div>
              </div>
              <div>
                <div className="text-[10px] text-dark-500 uppercase tracking-wide mb-0.5">Estimated Loss So Far</div>
                <div className="text-lg font-bold text-accent-red">{formatCurrency(currentLoss)}</div>
                <div className="text-[11px] text-dark-400">over {disruption.delayDays}-day delay</div>
              </div>
              <div>
                <div className="text-[10px] text-dark-500 uppercase tracking-wide mb-0.5">Additional Loss / Day</div>
                <div className="text-lg font-bold text-accent-yellow">{formatCurrency(additionalDailyLoss)}</div>
                <div className="text-[11px] text-dark-400">if unresolved</div>
              </div>
              <div>
                <div className="text-[10px] text-dark-500 uppercase tracking-wide mb-0.5">Delay</div>
                <div className="text-lg font-bold text-dark-100">{disruption.delayDays} days</div>
                <div className="text-[11px] text-dark-400">+{disruption.costImpactPercent}% cost surge</div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
