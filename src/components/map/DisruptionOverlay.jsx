import { CITIES } from '../../data/cities';

export default function DisruptionOverlay({ disruption }) {
  const city = CITIES[disruption.affectedCity];
  if (!city) return null;

  return (
    <g>
      {/* Outer pulse ring */}
      <circle
        cx={city.x}
        cy={city.y}
        r="35"
        fill="none"
        stroke="#EF4444"
        strokeWidth="1.5"
        opacity="0.3"
        className="animate-pulse-ring"
      />
      {/* Warning icon background */}
      <circle
        cx={city.x + 20}
        cy={city.y - 20}
        r="10"
        fill="#EF4444"
      />
      {/* Warning icon */}
      <text
        x={city.x + 20}
        y={city.y - 16}
        textAnchor="middle"
        fill="white"
        fontSize="12"
        fontWeight="bold"
      >
        !
      </text>
      {/* Disruption label */}
      <rect
        x={city.x - 50}
        y={city.y + 30}
        width="100"
        height="20"
        rx="4"
        fill="#EF4444"
        opacity="0.9"
      />
      <text
        x={city.x}
        y={city.y + 44}
        textAnchor="middle"
        fill="white"
        fontSize="9"
        fontWeight="600"
      >
        {disruption.name}
      </text>
    </g>
  );
}
