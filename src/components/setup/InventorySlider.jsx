import { useSimulation } from '../../hooks/useSimulation';
import { THRESHOLDS } from '../../config/constants';

export default function InventorySlider() {
  const { state, updateConfig } = useSimulation();

  return (
    <div>
      <label className="block text-sm font-medium text-dark-200 mb-2">
        Inventory Buffer
        <span className="ml-2 text-accent-blue font-mono">{state.config.inventoryDays} days</span>
      </label>
      <p className="text-xs text-dark-400 mb-3">Days of safety stock at destination warehouse</p>
      <input
        type="range"
        min={THRESHOLDS.MIN_INVENTORY_DAYS}
        max={THRESHOLDS.MAX_INVENTORY_DAYS}
        value={state.config.inventoryDays}
        onChange={(e) => updateConfig({ inventoryDays: parseInt(e.target.value) })}
        className="w-full accent-accent-blue"
      />
      <div className="flex justify-between text-[10px] text-dark-500 mt-1">
        <span>{THRESHOLDS.MIN_INVENTORY_DAYS}d</span>
        <span>{THRESHOLDS.MAX_INVENTORY_DAYS}d</span>
      </div>
    </div>
  );
}
