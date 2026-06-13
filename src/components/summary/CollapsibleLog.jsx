import { useState } from 'react';
import LogLine from '../agents/LogLine';

export default function CollapsibleLog({ title, logs, color }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-dark-700 rounded-lg overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 bg-dark-800 hover:bg-dark-700 transition-colors"
      >
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
          <span className="text-sm font-medium text-dark-200">{title}</span>
          <span className="text-xs text-dark-500">({logs.length} entries)</span>
        </div>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className={`text-dark-400 transition-transform ${open ? 'rotate-180' : ''}`}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      {open && (
        <div className="px-4 py-2 bg-dark-900 max-h-64 overflow-y-auto space-y-0.5">
          {logs.map((log, i) => (
            <LogLine key={i} log={log} index={0} />
          ))}
        </div>
      )}
    </div>
  );
}
