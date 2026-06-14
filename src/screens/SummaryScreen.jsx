import { useSimulation } from '../hooks/useSimulation';
import { SCREENS, APPROVAL_STATUS } from '../config/constants';
import MetricsComparison from '../components/summary/MetricsComparison';
import CollapsibleLog from '../components/summary/CollapsibleLog';
import LinkedInShare from '../components/summary/LinkedInShare';

export default function SummaryScreen() {
  const { state, resetAll, setScreen } = useSimulation();
  const { summary, approval, agents } = state;

  const handleRunAgain = () => {
    resetAll();
    setScreen(SCREENS.SETUP);
  };

  const approvalLabel = {
    [APPROVAL_STATUS.APPROVED]: 'Manually Approved',
    [APPROVAL_STATUS.AUTO]: 'Auto-Approved (timeout)',
    [APPROVAL_STATUS.REJECTED]: 'Rejected → Re-planned',
    [APPROVAL_STATUS.SKIPPED]: 'Auto-Executed (within threshold)',
  };

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 animate-fade-in-up">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-dark-100 mb-2">After-Action Report</h2>
        <p className="text-sm text-dark-400">
          Disruption resolved. Here's what the agents did.
        </p>
      </div>

      {/* Approval Status */}
      <div className="mb-6 text-center">
        <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${
          approval.status === APPROVAL_STATUS.APPROVED || approval.status === APPROVAL_STATUS.AUTO || approval.status === APPROVAL_STATUS.SKIPPED
            ? 'bg-accent-green/10 text-accent-green border border-accent-green/30'
            : 'bg-accent-yellow/10 text-accent-yellow border border-accent-yellow/30'
        }`}>
          <span className="w-2 h-2 rounded-full bg-current" />
          {approvalLabel[approval.status] || 'Completed'}
        </span>
      </div>

      {/* Metrics */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-dark-300 mb-3 uppercase tracking-wide">Performance Comparison</h3>
        <MetricsComparison before={summary.before} after={summary.after} />
      </div>

      {/* AI Badge */}
      <div className="mb-6 p-4 bg-dark-800 border border-dark-700 rounded-lg">
        <div className="flex items-center justify-between">
          <span className="text-sm text-dark-300">AI Engine</span>
          <span className={`px-2 py-1 rounded text-xs font-medium ${
            summary.usedClaude
              ? 'bg-accent-purple/20 text-accent-purple'
              : 'bg-accent-blue/15 text-accent-blue'
          }`}>
            {summary.usedClaude ? 'Gemini AI (Live)' : 'Demo Mode — Simulated Responses'}
          </span>
        </div>
        {!summary.usedClaude && (
          <p className="text-[11px] text-dark-500 mt-2">
            This run used pre-built responses to demonstrate the full agent workflow. Add a Gemini API key on the setup screen to enable live AI-generated analysis and negotiation.
          </p>
        )}
      </div>

      {/* Agent Logs */}
      <div className="space-y-3 mb-6">
        <h3 className="text-sm font-medium text-dark-300 uppercase tracking-wide">Agent Logs</h3>
        <CollapsibleLog
          title="Agent 1: Supply Chain Analyst"
          logs={agents.agent1.logs}
          color="#3B82F6"
        />
        <CollapsibleLog
          title="Agent 2: Rate Negotiator"
          logs={agents.agent2.logs}
          color="#A855F7"
        />
      </div>

      {/* Actions */}
      <div className="flex items-center justify-center gap-4">
        <button
          onClick={handleRunAgain}
          className="px-6 py-2.5 bg-accent-blue hover:bg-accent-blue/90 text-white font-medium rounded-lg transition-colors text-sm"
        >
          Run Again
        </button>
        <LinkedInShare />
      </div>
    </div>
  );
}
