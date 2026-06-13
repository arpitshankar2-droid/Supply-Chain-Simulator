import { useState } from 'react';
import { useSimulation } from '../hooks/useSimulation';
import { useCountdown } from '../hooks/useCountdown';
import ApprovalCard from '../components/approval/ApprovalCard';
import ReplanNotice from '../components/approval/ReplanNotice';
import { APPROVAL_STATUS, SCREENS } from '../config/constants';

export default function ApprovalScreen() {
  const { state, setScreen, setSummary, setApproval } = useSimulation();
  const { approve, reject } = useCountdown();
  const [replanning, setReplanning] = useState(false);

  const handleReject = () => {
    reject();
    setReplanning(true);

    // Simulate re-plan with next carrier
    const agent1Result = state.agents.agent1.result;
    if (agent1Result && agent1Result.rankedOptions.length > 1) {
      const nextOption = agent1Result.rankedOptions[1];
      setTimeout(() => {
        setSummary({
          after: {
            rate: nextOption.spotRate,
            transitDays: nextOption.transitDays,
            reliability: nextOption.reliability,
            carrier: nextOption.carrierName,
          },
          selectedCarrier: nextOption.carrierName,
          negotiatedRate: nextOption.spotRate,
        });
        setApproval({
          status: APPROVAL_STATUS.APPROVED,
          recommendation: {
            ...state.approval.recommendation,
            carrierName: nextOption.carrierName,
            finalRate: nextOption.spotRate,
            transitDays: nextOption.transitDays,
          },
        });
        setTimeout(() => setScreen(SCREENS.SUMMARY), 1500);
      }, 3000);
    } else {
      setTimeout(() => setScreen(SCREENS.SUMMARY), 2000);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-8 px-4 animate-fade-in-up">
      <div className="text-center mb-6">
        <h2 className="text-xl font-bold text-dark-100 mb-1">Bounded Autonomy Check</h2>
        <p className="text-sm text-dark-400">
          The proposed solution exceeds your cost threshold and requires human approval.
        </p>
      </div>

      <ApprovalCard
        approval={state.approval}
        onApprove={approve}
        onReject={handleReject}
      />

      {replanning && state.agents.agent1.result?.rankedOptions?.[1] && (
        <ReplanNotice carrierName={state.agents.agent1.result.rankedOptions[1].carrierName} />
      )}

      {/* Bounded Autonomy explanation */}
      {!replanning && (
        <div className="mt-6 space-y-4">
          <div className="bg-dark-800 border border-dark-700 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-dark-200 mb-2 flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-accent-blue">
                <circle cx="12" cy="12" r="10" />
                <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
              Why does this gate exist?
            </h3>
            <p className="text-xs text-dark-400 leading-relaxed">
              Bounded autonomy means the AI agents can analyse, negotiate, and recommend — but when the cost impact exceeds your configured threshold, a human must approve. This ensures AI handles routine decisions at speed while humans retain control over high-stakes financial commitments. The countdown auto-approves if no action is taken, preventing operational delays.
            </p>
          </div>

          <div className="bg-dark-800 border border-dark-700 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-dark-200 mb-2 flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-accent-yellow">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
              What happens if you reject?
            </h3>
            <p className="text-xs text-dark-400 leading-relaxed">
              The negotiator agent will discard the current carrier offer and move to the next-ranked alternative from the analyst's recommendations. It will attempt to secure a better rate with the backup carrier and present an updated plan for approval.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
