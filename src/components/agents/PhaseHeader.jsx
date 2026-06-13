export default function PhaseHeader({ phase, number, isActive }) {
  const phaseNames = {
    detection: 'Disruption Detection',
    inventory: 'Inventory Assessment',
    stockout: 'Stockout Analysis',
    routes: 'Alternative Route Analysis',
    recommendation: 'Recommendation',
    rateDiscovery: 'Rate Discovery',
    targetCalc: 'Target Calculation',
    counterOffer: 'Counter-Offer',
    negotiation: 'Carrier Negotiation',
    finalResponse: 'Final Response',
    booking: 'Booking Confirmation',
    tmsUpdate: 'TMS Update',
  };

  return (
    <div className="flex items-center gap-2 py-2 border-b border-dark-700/50">
      <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
        isActive ? 'bg-accent-blue text-white' : 'bg-dark-700 text-dark-400'
      }`}>
        {number}
      </span>
      <span className={`text-xs font-medium ${isActive ? 'text-dark-200' : 'text-dark-500'}`}>
        {phaseNames[phase] || phase}
      </span>
      {isActive && (
        <span className="w-1.5 h-1.5 rounded-full bg-accent-green animate-pulse" />
      )}
    </div>
  );
}
