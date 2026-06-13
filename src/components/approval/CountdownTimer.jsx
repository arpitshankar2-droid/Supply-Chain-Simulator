import { TIMING } from '../../config/constants';

export default function CountdownTimer({ seconds }) {
  const total = TIMING.APPROVAL_COUNTDOWN;
  const radius = 30;
  const circumference = 2 * Math.PI * radius;
  const progress = (seconds / total) * circumference;

  const color = seconds > 20 ? '#22C55E' : seconds > 10 ? '#F59E0B' : '#EF4444';

  return (
    <div className="flex flex-col items-center">
      <svg width="80" height="80" viewBox="0 0 80 80">
        {/* Background ring */}
        <circle
          cx="40"
          cy="40"
          r={radius}
          fill="none"
          stroke="#334155"
          strokeWidth="4"
        />
        {/* Progress ring */}
        <circle
          cx="40"
          cy="40"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="4"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - progress}
          strokeLinecap="round"
          transform="rotate(-90 40 40)"
          style={{ transition: 'stroke-dashoffset 1s linear, stroke 0.5s' }}
        />
        {/* Timer text */}
        <text
          x="40"
          y="40"
          textAnchor="middle"
          dominantBaseline="central"
          fill={color}
          fontSize="18"
          fontWeight="bold"
          fontFamily="monospace"
        >
          {seconds}
        </text>
      </svg>
      <span className="text-xs text-dark-400 mt-1">Auto-approve</span>
    </div>
  );
}
