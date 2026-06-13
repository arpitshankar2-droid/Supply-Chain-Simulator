import { useState } from 'react';
import { useSimulation } from '../../hooks/useSimulation';
import { SCREENS } from '../../config/constants';

export default function Header() {
  const { state, updateConfig, setScreen } = useSimulation();
  const [showKeyInfo, setShowKeyInfo] = useState(false);
  const isSetup = state.currentScreen === SCREENS.SETUP;

  return (
    <header className="border-b border-dark-700 bg-dark-800/80 backdrop-blur-sm px-6 py-3 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-accent-blue/20 flex items-center justify-center">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-accent-blue">
            <path d="M12 2L2 7l10 5 10-5-10-5z" />
            <path d="M2 17l10 5 10-5" />
            <path d="M2 12l10 5 10-5" />
          </svg>
        </div>
        <div>
          <h1 className="text-sm font-semibold text-dark-100">Supply Chain Simulator</h1>
          <p className="text-xs text-dark-400">Self-Healing Decision Intelligence</p>
        </div>
      </div>

      <div className="flex items-center gap-4 relative">
        {/* API key */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowKeyInfo(!showKeyInfo)}
            className="text-dark-400 hover:text-dark-200 transition-colors"
            title="What is this?"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
          </button>
          <input
            id="api-key"
            type="password"
            placeholder="AI API key (optional)"
            value={state.config.apiKey}
            onChange={(e) => updateConfig({ apiKey: e.target.value })}
            className="bg-dark-700 border border-dark-600 rounded px-3 py-1.5 text-xs text-dark-200 w-52 placeholder:text-dark-500 focus:outline-none focus:border-accent-blue"
          />
          {state.config.apiKey ? (
            <span className="text-[11px] text-accent-green flex items-center gap-1 whitespace-nowrap">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-green" />
              Live AI
            </span>
          ) : (
            <span className="text-[11px] text-accent-yellow flex items-center gap-1 whitespace-nowrap">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-yellow" />
              Demo
            </span>
          )}
        </div>

        {/* Start button — only on setup screen */}
        {isSetup && (
          <button
            onClick={() => setScreen(SCREENS.MAP)}
            className="px-5 py-2 bg-accent-blue hover:bg-accent-blue/90 text-white font-semibold rounded-lg transition-colors text-sm whitespace-nowrap"
          >
            Start Simulation →
          </button>
        )}

        {/* Info tooltip */}
        {showKeyInfo && (
          <div className="absolute top-full right-0 mt-2 w-80 bg-dark-800 border border-dark-600 rounded-lg p-4 shadow-xl z-50 animate-fade-in-up">
            <div className="flex items-start justify-between mb-2">
              <h4 className="text-sm font-medium text-dark-100">AI Engine</h4>
              <button onClick={() => setShowKeyInfo(false)} className="text-dark-500 hover:text-dark-300 text-xs">✕</button>
            </div>
            <div className="space-y-2 text-xs text-dark-400">
              <div className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-green mt-1.5 shrink-0" />
                <p><span className="text-dark-200 font-medium">With API key:</span> 4 tools use real AI for severity assessment, counter-offers, negotiation, and justification.</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-yellow mt-1.5 shrink-0" />
                <p><span className="text-dark-200 font-medium">Without key (Demo):</span> Hardcoded fallbacks used instead. Full simulation works identically — no features lost.</p>
              </div>
              <div className="mt-2 p-2 bg-dark-900 rounded text-[11px] text-dark-500">
                Get a key at console.anthropic.com (Claude API). Key stays in-browser only.
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
