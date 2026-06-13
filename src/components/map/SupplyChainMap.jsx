import { CITY_LIST } from '../../data/cities';
import { LANES } from '../../data/lanes';
import CityNode from './CityNode';
import RouteEdge from './RouteEdge';
import ShipmentDot from './ShipmentDot';
import DisruptionOverlay from './DisruptionOverlay';
import MapLegend from './MapLegend';

export default function SupplyChainMap({ mapState, disruption }) {
  const { phase, disruptedCity, disruptedLanes, rerouteLane } = mapState;
  const showDisruption = phase === 'disruption' || phase === 'reroute';
  const showReroute = phase === 'reroute';
  const paused = phase === 'disruption';

  return (
    <div className="relative w-full bg-dark-900 rounded-xl border border-dark-700 overflow-hidden">
      <svg viewBox="0 0 700 500" className="w-full h-auto">
        {/* Background grid */}
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1E293B" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="700" height="500" fill="url(#grid)" />

        {/* Simplified India outline */}
        <path
          d="M310,30 L370,40 L400,55 L430,50 L460,60 L500,55 L530,75
             L520,100 L540,130 L530,160 L510,180 L520,210 L510,250
             L490,280 L480,310 L470,340 L460,360 L480,390 L470,420
             L450,450 L420,460 L390,455 L370,440 L350,450 L330,440
             L310,420 L290,410 L270,380 L250,360 L240,330 L230,310
             L220,280 L200,260 L190,230 L200,200 L210,170 L230,140
             L250,120 L260,100 L270,70 L290,50 Z"
          fill="none"
          stroke="#334155"
          strokeWidth="1.5"
          opacity="0.4"
        />

        {/* "INDIA" label */}
        <text x="350" y="240" textAnchor="middle" fill="#1E293B" fontSize="48" fontWeight="bold" fontFamily="system-ui" opacity="0.15">
          INDIA
        </text>

        {/* Routes */}
        {LANES.map((lane) => (
          <RouteEdge
            key={lane.id}
            lane={lane}
            isDisrupted={showDisruption && disruptedLanes.includes(lane.id)}
            isReroute={showReroute && rerouteLane === lane.id}
          />
        ))}

        {/* Shipment dots on non-disrupted lanes */}
        {LANES.filter(l => !showDisruption || !disruptedLanes.includes(l.id)).map((lane) => (
          <ShipmentDot key={`dot-${lane.id}`} lane={lane} paused={paused} />
        ))}

        {/* Rerouted shipment dot */}
        {showReroute && rerouteLane && (
          <ShipmentDot
            lane={LANES.find(l => l.id === rerouteLane) || LANES[0]}
            paused={false}
          />
        )}

        {/* City nodes */}
        {CITY_LIST.map((city) => (
          <CityNode
            key={city.id}
            city={city}
            isDisrupted={showDisruption && disruptedCity === city.id}
          />
        ))}

        {/* Disruption overlay */}
        {showDisruption && disruption && (
          <DisruptionOverlay disruption={disruption} />
        )}
      </svg>

      <MapLegend />

      {/* Phase indicator */}
      <div className="absolute top-4 right-4">
        <div className={`px-3 py-1.5 rounded-full text-xs font-medium ${
          phase === 'normal' ? 'bg-accent-green/20 text-accent-green' :
          phase === 'disruption' ? 'bg-accent-red/20 text-accent-red' :
          phase === 'reroute' ? 'bg-accent-blue/20 text-accent-blue' :
          'bg-dark-700 text-dark-400'
        }`}>
          {phase === 'normal' ? '● Normal Operations' :
           phase === 'disruption' ? '● Disruption Detected' :
           phase === 'reroute' ? '● Rerouting Active' :
           '● Idle'}
        </div>
      </div>
    </div>
  );
}
