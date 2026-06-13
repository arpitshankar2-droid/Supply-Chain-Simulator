export default function HandoffIndicator({ visible }) {
  if (!visible) return null;

  return (
    <div className="flex flex-col items-center justify-center py-4 animate-fade-in-up">
      <div className="flex items-center gap-3">
        <div className="w-8 h-px bg-agent1" />
        <div className="px-3 py-1.5 rounded-full bg-dark-700 border border-dark-600">
          <span className="text-xs font-medium text-dark-300">
            Agent Handoff →
          </span>
        </div>
        <div className="w-8 h-px bg-agent2" />
      </div>
      <p className="text-[10px] text-dark-500 mt-2">
        Transferring analysis to Negotiator Agent
      </p>
    </div>
  );
}
