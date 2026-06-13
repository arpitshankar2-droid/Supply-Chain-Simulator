export default function MapLegend() {
  const items = [
    { color: '#3B82F6', label: 'Hub' },
    { color: '#22C55E', label: 'Warehouse' },
    { color: '#06B6D4', label: 'Port' },
    { color: '#A855F7', label: 'Destination' },
    { color: '#F59E0B', label: 'Truck', shape: 'truck' },
    { color: '#06B6D4', label: 'Ship', shape: 'ship' },
    { color: '#EF4444', label: 'Disrupted', shape: 'dashed' },
    { color: '#22C55E', label: 'Reroute', shape: 'dashed' },
  ];

  return (
    <div className="absolute bottom-4 left-4 bg-dark-800/90 border border-dark-700 rounded-lg p-3">
      <div className="text-[10px] text-dark-400 font-medium mb-2">LEGEND</div>
      <div className="flex flex-wrap gap-x-4 gap-y-1.5">
        {items.map((item) => (
          <div key={item.label} className="flex items-center gap-1.5">
            {item.shape === 'truck' ? (
              <svg width="14" height="10" viewBox="0 0 28 18">
                <rect x="0" y="2" width="18" height="11" rx="1" fill={item.color} />
                <path d="M18 5h6l3 4v4h-9V5z" fill={item.color} opacity="0.8" />
                <circle cx="6" cy="15" r="2" fill="#1E293B" />
                <circle cx="22" cy="15" r="2" fill="#1E293B" />
              </svg>
            ) : item.shape === 'ship' ? (
              <svg width="14" height="10" viewBox="0 0 22 18">
                <path d="M3 14l2-7h12l2 7" fill={item.color} />
                <rect x="7" y="4" width="8" height="5" fill={item.color} opacity="0.7" />
                <rect x="10" y="1" width="2" height="6" fill={item.color} opacity="0.5" />
              </svg>
            ) : item.shape === 'dashed' ? (
              <div className="w-4 h-0 border-t-2 border-dashed" style={{ borderColor: item.color }} />
            ) : (
              <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
            )}
            <span className="text-[10px] text-dark-400">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
