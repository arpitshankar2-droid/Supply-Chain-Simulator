export default function CityNode({ city, isDisrupted }) {
  const typeColors = {
    hub: '#3B82F6',
    warehouse: '#22C55E',
    port: '#06B6D4',
    destination: '#A855F7',
  };

  const color = isDisrupted ? '#EF4444' : (typeColors[city.type] || '#64748B');

  return (
    <g>
      {isDisrupted && (
        <circle
          cx={city.x}
          cy={city.y}
          r="24"
          fill="none"
          stroke="#EF4444"
          strokeWidth="2"
          opacity="0.5"
          className="animate-pulse-ring"
        />
      )}
      <circle
        cx={city.x}
        cy={city.y}
        r="8"
        fill={color}
        stroke={isDisrupted ? '#EF4444' : '#1E293B'}
        strokeWidth="2"
      />
      <text
        x={city.x}
        y={city.y - 16}
        textAnchor="middle"
        fill="#E2E8F0"
        fontSize="11"
        fontWeight="600"
        fontFamily="system-ui"
      >
        {city.name}
      </text>
      <text
        x={city.x}
        y={city.y + 24}
        textAnchor="middle"
        fill="#64748B"
        fontSize="9"
        fontFamily="monospace"
      >
        {city.label}
      </text>
    </g>
  );
}
