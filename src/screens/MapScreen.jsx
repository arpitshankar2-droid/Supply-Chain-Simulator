import { useEffect, useRef, useState, useCallback } from 'react';
import { useSimulation } from '../hooks/useSimulation';
import { getDisruption } from '../data/disruptions';
import { LANES } from '../data/lanes';
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

  useEffect(() => {
    if (hasStarted.current) return;
    hasStarted.current = true;
    setMapPhase('normal');
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, []);

  const handleTriggerAlert = useCallback(() => {
    if (alertTriggered) return;
    setAlertTriggered(true);

    setMapPhase('disruption');
    setMapDisruption(disruption.affectedCity, disruption.affectedLanes);

    timerRef.current = setTimeout(() => {
      const rerouteLane = LANES.find(l => !disruption.affectedLanes.includes(l.id));
      if (rerouteLane) setMapReroute(rerouteLane.id);
      setMapPhase('reroute');

      timerRef.current = setTimeout(() => {
        setScreen(SCREENS.AGENTS);
      }, TIMING.MAP_DISRUPTION_PAUSE);
    }, TIMING.MAP_DISRUPTION_PAUSE);
  }, [alertTriggered, disruption, setMapPhase, setMapDisruption, setMapReroute, setScreen]);

  return (
    <div className="h-full flex flex-col px-4 py-4 animate-fade-in-up">
      {/* Title */}
      <div className="text-center mb-3 shrink-0">
        <h2 className="text-lg font-bold text-dark-100 mb-0.5">India Supply Chain Network</h2>
        <p className="text-xs text-dark-400">
          {state.map.phase === 'normal' && 'Shipments are flowing normally across Indian corridors.'}
          {state.map.phase === 'disruption' && `⚠ ${disruption.name} detected — ${disruption.description}`}
          {state.map.phase === 'reroute' && 'Agents activating — analysing alternative routes...'}
          {state.map.phase === 'idle' && 'Initialising network...'}
        </p>
      </div>

      {/* Map + overlaid trigger button — fills remaining space */}
      <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-4">
        {/* Map container with overlaid button */}
        <div className="flex-1 relative">
          <SupplyChainMap mapState={state.map} disruption={disruption} />

          {/* Trigger button overlaid on the map center */}
          {state.map.phase === 'normal' && !alertTriggered && (
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <div className="text-center">
                <button
                  onClick={handleTriggerAlert}
                  className="group relative inline-flex items-center gap-3 px-8 py-4 bg-dark-900/90 hover:bg-dark-900 border-2 border-accent-red/60 hover:border-accent-red rounded-xl transition-all duration-300 backdrop-blur-sm shadow-2xl"
                >
                  <span className="absolute inset-0 rounded-xl border-2 border-accent-red/30 animate-pulse-ring" />

                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-accent-red">
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                    <line x1="12" y1="9" x2="12" y2="13" />
                    <line x1="12" y1="17" x2="12.01" y2="17" />
                  </svg>

                  <div className="text-left">
                    <div className="text-accent-red font-semibold text-sm">Trigger Disruption Alert</div>
                    <div className="text-dark-400 text-xs">
                      {disruption.icon} {disruption.name} at {disruption.affectedCity.charAt(0).toUpperCase() + disruption.affectedCity.slice(1)}
                    </div>
                  </div>
                </button>
                <p className="mt-2 text-[11px] text-dark-500">Click to simulate and watch AI agents respond</p>
              </div>
            </div>
          )}
        </div>

        {/* Loss dashboard — side panel on disruption */}
        {(state.map.phase === 'disruption' || state.map.phase === 'reroute') && (
          <div className="lg:w-64 shrink-0 animate-slide-in-right">
            <div className="bg-accent-red/5 border border-accent-red/30 rounded-xl p-4 h-full">
              <div className="flex items-center gap-2 mb-4">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2">
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                  <line x1="12" y1="9" x2="12" y2="13" />
                  <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
                <span className="text-sm font-semibold text-accent-red">Impact</span>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="text-[10px] text-dark-500 uppercase tracking-wide mb-0.5">Lanes Affected</div>
                  <div className="text-xl font-bold text-accent-red">{affectedLanes.length}</div>
                  <div className="text-[10px] text-dark-400 leading-tight mt-0.5">
                    {affectedLanes.map(l => `${CITIES[l.from]?.name} → ${CITIES[l.to]?.name}`).join(', ')}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] text-dark-500 uppercase tracking-wide mb-0.5">Loss So Far</div>
                  <div className="text-xl font-bold text-accent-red">{formatCurrency(currentLoss)}</div>
                  <div className="text-[10px] text-dark-400">{disruption.delayDays}-day delay</div>
                </div>
                <div>
                  <div className="text-[10px] text-dark-500 uppercase tracking-wide mb-0.5">Per Day if Unresolved</div>
                  <div className="text-xl font-bold text-accent-yellow">{formatCurrency(additionalDailyLoss)}</div>
                  <div className="text-[10px] text-dark-400">+{disruption.costImpactPercent}% cost surge</div>
                </div>
                <div>
                  <div className="text-[10px] text-dark-500 uppercase tracking-wide mb-0.5">Status</div>
                  <div className="text-sm font-semibold text-dark-200">
                    {state.map.phase === 'disruption' ? 'Assessing...' : 'Rerouting...'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
