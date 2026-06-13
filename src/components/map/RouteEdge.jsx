import { CITIES } from '../../data/cities';

export default function RouteEdge({ lane, isDisrupted, isReroute }) {
  const from = CITIES[lane.from];
  const to = CITIES[lane.to];

  if (!from || !to) return null;

  const color = isReroute ? '#22C55E' : isDisrupted ? '#EF4444' : '#475569';
  const dashArray = isDisrupted ? '6,4' : isReroute ? '8,4' : 'none';
  const strokeWidth = isReroute ? 2.5 : isDisrupted ? 2 : 1.5;
  const opacity = isDisrupted ? 0.6 : 1;

  return (
    <g>
      <line
        x1={from.x}
        y1={from.y}
        x2={to.x}
        y2={to.y}
        stroke={color}
        strokeWidth={strokeWidth}
        strokeDasharray={dashArray}
        opacity={opacity}
        className={isReroute || isDisrupted ? 'animate-dash-flow' : ''}
      />
      {/* Distance label at midpoint */}
      <text
        x={(from.x + to.x) / 2}
        y={(from.y + to.y) / 2 - 8}
        textAnchor="middle"
        fill="#64748B"
        fontSize="8"
        fontFamily="monospace"
      >
        {lane.distance} km
      </text>
    </g>
  );
}
