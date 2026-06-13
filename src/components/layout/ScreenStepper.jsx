import { useSimulation } from '../../hooks/useSimulation';
import { SCREEN_ORDER, SCREEN_LABELS } from '../../config/constants';

export default function ScreenStepper() {
  const { state } = useSimulation();
  const currentIndex = SCREEN_ORDER.indexOf(state.currentScreen);

  return (
    <div className="flex items-center justify-center gap-1 py-3 px-6 bg-dark-800/50 border-b border-dark-700/50">
      {SCREEN_ORDER.map((screen, i) => {
        const isActive = i === currentIndex;
        const isCompleted = i < currentIndex;
        const isApproval = screen === 'approval';
        const shouldShow = !isApproval || state.approval.required;

        if (!shouldShow) return null;

        return (
          <div key={screen} className="flex items-center">
            {i > 0 && (
              <div className={`w-8 h-px mx-1 ${isCompleted ? 'bg-accent-blue' : 'bg-dark-600'}`} />
            )}
            <div className="flex items-center gap-1.5">
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-medium ${
                  isActive
                    ? 'bg-accent-blue text-white'
                    : isCompleted
                    ? 'bg-accent-blue/20 text-accent-blue'
                    : 'bg-dark-700 text-dark-500'
                }`}
              >
                {isCompleted ? '✓' : i + 1}
              </div>
              <span
                className={`text-xs ${
                  isActive ? 'text-dark-100 font-medium' : 'text-dark-500'
                }`}
              >
                {SCREEN_LABELS[screen]}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
