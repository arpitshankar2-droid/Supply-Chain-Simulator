import { useState, useEffect } from 'react';
import { CITIES } from '../../data/cities';

export default function ShipmentDot({ lane, paused }) {
  const [progress, setProgress] = useState(Math.random());
  const from = CITIES[lane.from];
  const to = CITIES[lane.to];

  useEffect(() => {
    if (paused) return;
    const interval = setInterval(() => {
      setProgress(p => {
        const next = p + 0.004;
        return next > 1 ? 0 : next;
      });
    }, 30);
    return () => clearInterval(interval);
  }, [paused]);

  if (!from || !to) return null;

  const x = from.x + (to.x - from.x) * progress;
  const y = from.y + (to.y - from.y) * progress;

  // Calculate rotation angle based on direction of travel
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const angle = Math.atan2(dy, dx) * (180 / Math.PI);

  // Use ship icon if departing from a port city, otherwise truck
  const isPort = from.type === 'port';

  return (
    <g transform={`translate(${x}, ${y}) rotate(${angle})`}>
      {isPort ? (
        // Ship icon
        <g transform="translate(-8, -6) scale(0.7)">
          <path d="M3 17l2-7h14l2 7" fill="#06B6D4" stroke="#0891B2" strokeWidth="1" />
          <path d="M7 10V5h10v5" fill="#0E7490" stroke="#0891B2" strokeWidth="0.8" />
          <rect x="11" y="2" width="2" height="8" fill="#155E75" />
          <polygon points="13,2 13,6 18,5" fill="#22D3EE" opacity="0.6" />
        </g>
      ) : (
        // Truck icon
        <g transform="translate(-10, -6) scale(0.65)">
          {/* Truck body (cargo) */}
          <rect x="0" y="2" width="18" height="11" rx="1" fill="#F59E0B" stroke="#D97706" strokeWidth="0.8" />
          {/* Cabin */}
          <path d="M18 5h6l3 4v4h-9V5z" fill="#FB923C" stroke="#D97706" strokeWidth="0.8" />
          {/* Windshield */}
          <path d="M19 6h4l2.5 3H19V6z" fill="#FDE68A" opacity="0.5" />
          {/* Wheels */}
          <circle cx="6" cy="15" r="2.5" fill="#1E293B" stroke="#475569" strokeWidth="0.8" />
          <circle cx="6" cy="15" r="1" fill="#64748B" />
          <circle cx="22" cy="15" r="2.5" fill="#1E293B" stroke="#475569" strokeWidth="0.8" />
          <circle cx="22" cy="15" r="1" fill="#64748B" />
        </g>
      )}
    </g>
  );
}
