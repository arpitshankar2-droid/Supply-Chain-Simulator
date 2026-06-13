import { formatCurrency } from '../../utils/formatCurrency';

export default function OptionCard({ option, rank, isSelected }) {
  return (
    <div className={`p-3 rounded-lg border transition-all ${
      isSelected
        ? 'border-accent-green bg-accent-green/5'
        : 'border-dark-600 bg-dark-800'
    }`}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
            isSelected ? 'bg-accent-green text-white' : 'bg-dark-700 text-dark-400'
          }`}>
            {rank}
          </span>
          <span className="text-sm font-medium text-dark-200">{option.carrierName}</span>
          <span className={`text-[9px] px-1.5 py-0.5 rounded-full ${
            option.carrierTier === 'preferred' ? 'bg-accent-blue/20 text-accent-blue' :
            option.carrierTier === 'existing' ? 'bg-accent-yellow/20 text-accent-yellow' :
            'bg-dark-600 text-dark-400'
          }`}>
            {option.carrierTier}
          </span>
        </div>
        {option.score !== undefined && (
          <span className="text-xs font-mono text-dark-400">
            Score: {option.score.toFixed(2)}
          </span>
        )}
      </div>
      <div className="grid grid-cols-3 gap-2 text-xs">
        <div>
          <span className="text-dark-500">Rate:</span>
          <span className="ml-1 text-dark-200">{formatCurrency(option.spotRate)}</span>
        </div>
        <div>
          <span className="text-dark-500">Transit:</span>
          <span className="ml-1 text-dark-200">{option.transitDays}d</span>
        </div>
        <div>
          <span className="text-dark-500">Reliability:</span>
          <span className="ml-1 text-dark-200">{Math.round(option.reliability * 100)}%</span>
        </div>
      </div>
    </div>
  );
}
