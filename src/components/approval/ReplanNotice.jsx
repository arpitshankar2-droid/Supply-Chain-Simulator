export default function ReplanNotice({ carrierName }) {
  return (
    <div className="mt-4 p-4 bg-dark-800 border border-dark-600 rounded-lg animate-fade-in-up">
      <div className="flex items-center gap-2 mb-2">
        <span className="w-2 h-2 rounded-full bg-accent-yellow animate-pulse" />
        <span className="text-sm font-medium text-dark-200">Re-planning in progress</span>
      </div>
      <p className="text-xs text-dark-400">
        Previous option rejected. Negotiating with next available carrier: <span className="text-dark-200">{carrierName}</span>
      </p>
    </div>
  );
}
