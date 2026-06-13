import CountdownTimer from './CountdownTimer';
import { formatCurrency } from '../../utils/formatCurrency';
import { APPROVAL_STATUS } from '../../config/constants';

export default function ApprovalCard({ approval, onApprove, onReject }) {
  const rec = approval.recommendation;
  const isPending = approval.status === APPROVAL_STATUS.PENDING;

  return (
    <div className="bg-dark-800 border border-dark-700 rounded-xl p-6 max-w-lg mx-auto animate-slide-in-right">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-dark-100 mb-1">Human Approval Required</h3>
          <p className="text-sm text-dark-400">
            Cost increase of <span className="text-accent-yellow font-medium">{approval.costDelta}%</span> exceeds threshold
          </p>
        </div>
        {isPending && <CountdownTimer seconds={approval.countdown} />}
      </div>

      {rec && (
        <div className="space-y-3 mb-6">
          <div className="bg-dark-900 rounded-lg p-4">
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <span className="text-dark-500 text-xs">Carrier</span>
                <p className="text-dark-200 font-medium">{rec.carrierName}</p>
              </div>
              <div>
                <span className="text-dark-500 text-xs">Tier</span>
                <p className="text-dark-200 font-medium capitalize">{rec.carrierTier}</p>
              </div>
              <div>
                <span className="text-dark-500 text-xs">Negotiated Rate</span>
                <p className="text-dark-200 font-medium">{formatCurrency(rec.finalRate)}</p>
              </div>
              <div>
                <span className="text-dark-500 text-xs">Transit Time</span>
                <p className="text-dark-200 font-medium">{rec.transitDays} days</p>
              </div>
            </div>
          </div>
          <p className="text-xs text-dark-400">{rec.summary}</p>
        </div>
      )}

      {isPending && (
        <div className="flex gap-3">
          <button
            onClick={onApprove}
            className="flex-1 py-2.5 bg-accent-green hover:bg-accent-green/90 text-white font-medium rounded-lg transition-colors text-sm"
          >
            Approve
          </button>
          <button
            onClick={onReject}
            className="flex-1 py-2.5 bg-dark-700 hover:bg-dark-600 text-dark-200 font-medium rounded-lg border border-dark-600 transition-colors text-sm"
          >
            Reject — Try Next Carrier
          </button>
        </div>
      )}

      {approval.status === APPROVAL_STATUS.APPROVED && (
        <div className="text-center py-3 bg-accent-green/10 rounded-lg border border-accent-green/30">
          <span className="text-accent-green font-medium text-sm">✓ Approved — Executing plan</span>
        </div>
      )}

      {approval.status === APPROVAL_STATUS.AUTO && (
        <div className="text-center py-3 bg-accent-yellow/10 rounded-lg border border-accent-yellow/30">
          <span className="text-accent-yellow font-medium text-sm">Auto-approved after timeout</span>
        </div>
      )}

      {approval.status === APPROVAL_STATUS.REJECTED && (
        <div className="text-center py-3 bg-accent-red/10 rounded-lg border border-accent-red/30">
          <span className="text-accent-red font-medium text-sm">Rejected — Re-planning with next carrier</span>
        </div>
      )}
    </div>
  );
}
