import LogBadge from './LogBadge';

export default function LogLine({ log, index }) {
  return (
    <div
      className="flex items-start gap-2 py-1 animate-fade-in-up"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <span className="text-[10px] text-dark-500 font-mono w-16 shrink-0 pt-0.5">
        {new Date(log.timestamp).toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })}
      </span>
      <LogBadge badge={log.badge} />
      <span className="text-xs text-dark-300 leading-relaxed">{log.message}</span>
    </div>
  );
}
