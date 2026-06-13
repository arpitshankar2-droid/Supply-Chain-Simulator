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
    </div>
  );
}
