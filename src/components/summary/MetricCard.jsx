import { formatCurrency } from '../../utils/formatCurrency';

export default function MetricCard({ label, before, after, format }) {
  if (format === 'text') {
    return (
      <div className="bg-dark-800 border border-dark-700 rounded-lg p-4">
        <div className="text-xs text-dark-400 mb-3 font-medium uppercase tracking-wide">{label}</div>
        <div className="flex items-end justify-between">
          <div>
            <div className="text-dark-500 text-xs mb-0.5">Before</div>
            <div className="text-sm font-mono text-dark-300">{before}</div>
          </div>
          <div className="text-sm font-medium px-2 py-1 rounded text-accent-blue bg-accent-blue/10">
            →
          </div>
          <div className="text-right">
            <div className="text-dark-500 text-xs mb-0.5">After</div>
            <div className="text-sm font-mono text-dark-100 font-semibold">{after}</div>
          </div>
        </div>
      </div>
    );
  }

  const formatVal = (v) => {
    if (format === 'currency') return formatCurrency(v);
    if (format === 'percent') return `${Math.round(v * 100)}%`;
    if (format === 'days') return `${v}d`;
    return v;
  };

  const beforeVal = formatVal(before);
  const afterVal = formatVal(after);

  const diff = after - before;
  const isPositive = format === 'percent' ? diff > 0 : diff < 0;
  const arrow = diff > 0 ? '↑' : diff < 0 ? '↓' : '→';
  const diffDisplay = format === 'currency'
    ? `${arrow} ${formatCurrency(Math.abs(diff))}`
    : format === 'percent'
    ? `${arrow} ${Math.abs(Math.round(diff * 100))}%`
    : format === 'days'
    ? `${arrow} ${Math.abs(diff)}d`
    : `${arrow} ${Math.abs(diff)}`;

  return (
    <div className="bg-dark-800 border border-dark-700 rounded-lg p-4">
      <div className="text-xs text-dark-400 mb-3 font-medium uppercase tracking-wide">{label}</div>
      <div className="flex items-end justify-between">
        <div>
          <div className="text-dark-500 text-xs mb-0.5">Before</div>
          <div className="text-lg font-mono text-dark-300">{beforeVal}</div>
        </div>
        <div className={`text-sm font-medium px-2 py-1 rounded ${
          isPositive ? 'text-accent-green bg-accent-green/10' : 'text-accent-red bg-accent-red/10'
        }`}>
          {diffDisplay}
        </div>
        <div className="text-right">
          <div className="text-dark-500 text-xs mb-0.5">After</div>
          <div className="text-lg font-mono text-dark-100 font-semibold">{afterVal}</div>
        </div>
      </div>
    </div>
  );
}
