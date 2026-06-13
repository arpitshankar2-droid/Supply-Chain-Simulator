import { useSimulation } from '../../hooks/useSimulation';
import { THRESHOLDS } from '../../config/constants';

export default function ApprovalThreshold() {
  const { state, updateConfig } = useSimulation();

  return (
    <div>
      <label className="block text-sm font-medium text-dark-200 mb-2">
        Approval Threshold
        <span className="ml-2 text-accent-yellow font-mono">{state.config.approvalThreshold}%</span>
      </label>
      <p className="text-xs text-dark-400 mb-3">
        Cost increase above this % requires human approval
      </p>
      <input
        type="range"
        min={THRESHOLDS.MIN_APPROVAL_PERCENT}
        max={THRESHOLDS.MAX_APPROVAL_PERCENT}
        value={state.config.approvalThreshold}
        onChange={(e) => updateConfig({ approvalThreshold: parseInt(e.target.value) })}
        className="w-full accent-accent-yellow"
      />
      <div className="flex justify-between text-[10px] text-dark-500 mt-1">
        <span>{THRESHOLDS.MIN_APPROVAL_PERCENT}%</span>
        <span>{THRESHOLDS.MAX_APPROVAL_PERCENT}%</span>
      </div>
    </div>
  );
}
