import { useEffect, useRef } from 'react';
import LogLine from './LogLine';
import { AGENT_STATUS } from '../../config/constants';
import { formatCurrency } from '../../utils/formatCurrency';

export default function AgentPanel({ agentKey, name, status, logs, color, result }) {
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs.length, status]);

  const statusText = {
    [AGENT_STATUS.IDLE]: 'Waiting',
    [AGENT_STATUS.RUNNING]: 'Running',
    [AGENT_STATUS.COMPLETE]: 'Complete',
    [AGENT_STATUS.ERROR]: 'Error',
  };

  const statusColor = {
    [AGENT_STATUS.IDLE]: 'text-dark-500',
    [AGENT_STATUS.RUNNING]: 'text-accent-green',
    [AGENT_STATUS.COMPLETE]: 'text-accent-blue',
    [AGENT_STATUS.ERROR]: 'text-accent-red',
  };

  // Build conclusion card for Agent 1 (Analyst)
  const agent1Conclusion = agentKey === 'agent1' && status === AGENT_STATUS.COMPLETE && result ? (
    <div className="mx-4 mb-3 p-3 bg-agent1/5 border border-agent1/20 rounded-lg animate-fade-in-up">
      <div className="flex items-center gap-1.5 mb-2">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-agent1">
          <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
        <span className="text-xs font-semibold text-agent1">Analyst Conclusion</span>
      </div>
      <div className="grid grid-cols-2 gap-2 text-[11px]">
        <div>
          <span className="text-dark-500">Severity:</span>
          <span className={`ml-1 font-medium ${
            result.severity?.severity === 'critical' ? 'text-accent-red' :
            result.severity?.severity === 'high' ? 'text-accent-yellow' : 'text-accent-blue'
          }`}>{result.severity?.severity?.toUpperCase()}</span>
        </div>
        <div>
          <span className="text-dark-500">Risk Score:</span>
          <span className="ml-1 text-dark-200 font-medium">{result.severity?.riskScore}/10</span>
        </div>
        <div>
          <span className="text-dark-500">Stockout Risk:</span>
          <span className="ml-1 text-dark-200 font-medium">{result.stockout?.stockoutProbability}%</span>
        </div>
        <div>
          <span className="text-dark-500">Revenue at Risk:</span>
          <span className="ml-1 text-accent-red font-medium">{formatCurrency(result.stockout?.revenueAtRisk || 0)}</span>
        </div>
      </div>
      {result.topRecommendation && (
        <div className="mt-2 pt-2 border-t border-agent1/10 text-[11px]">
          <span className="text-dark-500">Recommended:</span>
          <span className="ml-1 text-dark-200 font-medium">{result.topRecommendation.carrierName}</span>
          <span className="text-dark-500 ml-1">at</span>
          <span className="ml-1 text-accent-green font-medium">{formatCurrency(result.topRecommendation.spotRate)}</span>
        </div>
      )}
    </div>
  ) : null;

  // Build conclusion card for Agent 2 (Negotiator)
  const agent2Conclusion = agentKey === 'agent2' && status === AGENT_STATUS.COMPLETE && result ? (
    <div className="mx-4 mb-3 p-3 bg-agent2/5 border border-agent2/20 rounded-lg animate-fade-in-up">
      <div className="flex items-center gap-1.5 mb-2">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-agent2">
          <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
        <span className="text-xs font-semibold text-agent2">Negotiator Conclusion</span>
      </div>
      <div className="grid grid-cols-2 gap-2 text-[11px]">
        <div>
          <span className="text-dark-500">Original Rate:</span>
          <span className="ml-1 text-dark-200 font-medium">{formatCurrency(result.originalRate || 0)}</span>
        </div>
        <div>
          <span className="text-dark-500">Negotiated Rate:</span>
          <span className="ml-1 text-accent-green font-medium">{formatCurrency(result.negotiatedRate || 0)}</span>
        </div>
        <div>
          <span className="text-dark-500">Cost Increase:</span>
          <span className={`ml-1 font-medium ${result.costIncrease > 20 ? 'text-accent-red' : 'text-accent-yellow'}`}>+{result.costIncrease}%</span>
        </div>
        <div>
          <span className="text-dark-500">Carrier:</span>
          <span className="ml-1 text-dark-200 font-medium">{result.finalResponse?.carrierName?.split(' — ')[1] || result.finalResponse?.carrierName}</span>
        </div>
      </div>
      <div className="mt-2 pt-2 border-t border-agent2/10 text-[11px]">
        <span className="text-dark-500">Booking:</span>
        <span className="ml-1 text-accent-green font-medium">{result.booking?.bookingId}</span>
        <span className="text-dark-500 ml-2">Ref:</span>
        <span className="ml-1 text-dark-200">{result.booking?.reference}</span>
      </div>
      {result.finalResponse?.summary && (
        <p className="mt-1.5 text-[10px] text-dark-400 italic">{result.finalResponse.summary}</p>
      )}
    </div>
  ) : null;

  return (
    <div className="flex flex-col h-full bg-dark-800 rounded-lg border border-dark-700 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-dark-700" style={{ borderTopColor: color, borderTopWidth: '2px' }}>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
          <span className="text-sm font-medium text-dark-200">{name}</span>
        </div>
        <div className="flex items-center gap-1.5">
          {status === AGENT_STATUS.RUNNING && (
            <span className="w-1.5 h-1.5 rounded-full bg-accent-green animate-pulse" />
          )}
          <span className={`text-xs ${statusColor[status]}`}>
            {statusText[status]}
          </span>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto min-h-0">
        <div className="px-4 py-2 space-y-0.5">
          {logs.length === 0 && status === AGENT_STATUS.IDLE && (
            <div className="flex items-center justify-center h-32 text-dark-500 text-xs">
              Waiting for activation...
            </div>
          )}
          {logs.map((log, i) => (
            <LogLine key={i} log={log} index={i} />
          ))}
          {status === AGENT_STATUS.RUNNING && (
            <div className="flex items-center gap-2 py-2">
              <div className="flex gap-1">
                <span className="w-1 h-1 rounded-full bg-dark-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-1 h-1 rounded-full bg-dark-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-1 h-1 rounded-full bg-dark-400 animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
              <span className="text-[10px] text-dark-500">Processing...</span>
            </div>
          )}
        </div>

        {/* Conclusion card pinned at bottom of log area */}
        {agent1Conclusion}
        {agent2Conclusion}
      </div>
    </div>
  );
}
