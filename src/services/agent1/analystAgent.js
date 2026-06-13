import { assessSeverity } from './tools/assessSeverity';
import { checkInventory } from './tools/checkInventory';
import { getDemandForecast } from './tools/getDemandForecast';
import { calculateStockout } from './tools/calculateStockout';
import { getAltRoutes } from './tools/getAltRoutes';
import { rankOptions } from '../../utils/priorityScorer';
import { formatCurrency } from '../../utils/formatCurrency';

export async function runAnalystAgent(config, disruption, addLog) {
  const logs = [];
  const log = (phase, message, badge = 'system') => {
    const entry = { phase, message, badge, timestamp: Date.now() };
    logs.push(entry);
    addLog(entry);
  };

  // Phase 1: Disruption Detection
  log('detection', `Disruption detected: ${disruption.name}`, 'system');
  log('detection', `Category: ${disruption.category} | Affected city: ${disruption.affectedCity}`, 'system');
  log('detection', 'Running severity assessment...', 'system');

  const severity = await assessSeverity(disruption);
  log('detection', `Severity: ${severity.data.severity.toUpperCase()} (Risk Score: ${severity.data.riskScore}/10)`, severity.source === 'claude' ? 'Claude AI' : 'Math/Rule');
  log('detection', `Assessment: ${severity.data.reasoning}`, severity.source === 'claude' ? 'Claude AI' : 'Math/Rule');
  log('detection', `Recommendation: ${severity.data.recommendation}`, severity.source === 'claude' ? 'Claude AI' : 'Math/Rule');

  // Phase 2: Inventory Assessment
  log('inventory', 'Checking inventory levels at destination...', 'system');
  const inventory = checkInventory(config.inventoryDays, disruption);
  log('inventory', `Current stock: ${inventory.data.currentStock} units (${inventory.data.inventoryDays} days)`, 'Math/Rule');
  log('inventory', `Stock after ${inventory.data.delayDays}-day delay: ${inventory.data.stockAfterDelay} units`, 'Math/Rule');
  log('inventory', `Days until stockout: ${inventory.data.daysUntilStockout} | Risk: ${inventory.data.stockoutRisk}`, 'Math/Rule');

  log('inventory', 'Generating demand forecast...', 'system');
  const demand = getDemandForecast(disruption);
  log('inventory', `7-day avg demand: ${demand.data.avgDemand} units/day | Peak: ${demand.data.peakDemand} units`, 'Math/Rule');
  log('inventory', `Demand trend: ${demand.data.trend}${demand.data.demandMultiplier > 1 ? ` (+${Math.round((demand.data.demandMultiplier - 1) * 100)}%)` : ''}`, 'Math/Rule');

  // Phase 3: Stockout Analysis
  log('stockout', 'Calculating stockout probability...', 'system');
  const stockout = calculateStockout(inventory.data, demand.data);
  log('stockout', `Stockout probability: ${stockout.data.stockoutProbability}% | Urgency: ${stockout.data.urgency}`, 'Math/Rule');
  log('stockout', `Units short: ${stockout.data.unitsShort} | Revenue at risk: ${formatCurrency(stockout.data.revenueAtRisk)}`, 'Math/Rule');

  // Phase 4: Alternative Routes
  log('routes', 'Scanning alternative routes and carrier availability...', 'system');
  const routes = getAltRoutes(disruption, config.priorityMode);
  routes.data.options.forEach((opt, i) => {
    log('routes', `Option ${i + 1}: ${opt.carrierName} (${opt.carrierTier}) — ${formatCurrency(opt.spotRate)} | ${opt.transitDays}d transit | ${Math.round(opt.reliability * 100)}% reliable`, 'Math/Rule');
  });

  // Phase 5: Recommendation
  log('recommendation', `Ranking options by priority mode: ${config.priorityMode.toUpperCase()}`, 'system');
  const ranked = rankOptions(routes.data.options, config.priorityMode);
  log('recommendation', `Top recommendation: ${ranked[0].carrierName} (score: ${ranked[0].score.toFixed(2)})`, 'Math/Rule');
  log('recommendation', 'Preparing handoff to Negotiator Agent...', 'system');

  const result = {
    severity: severity.data,
    inventory: inventory.data,
    demand: demand.data,
    stockout: stockout.data,
    rankedOptions: ranked,
    topRecommendation: ranked[0],
    priorityMode: config.priorityMode,
    disruption: disruption,
    usedClaude: severity.source === 'claude',
  };

  return result;
}
