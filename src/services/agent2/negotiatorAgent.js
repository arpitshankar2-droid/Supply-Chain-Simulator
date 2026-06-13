import { getSpotRate } from './tools/getSpotRate';
import { calculateTargetRate } from './tools/calculateTargetRate';
import { draftCounterOffer } from './tools/draftCounterOffer';
import { simulateCarrierReply } from './tools/simulateCarrierReply';
import { draftFinalResponse } from './tools/draftFinalResponse';
import { confirmBooking } from './tools/confirmBooking';
import { updateTms } from './tools/updateTms';
import { getCarrierById } from '../../data/carriers';
import { getLaneById } from '../../data/lanes';
import { formatCurrency } from '../../utils/formatCurrency';

export async function runNegotiatorAgent(analysis, config, addLog) {
  const option = analysis.topRecommendation;
  const carrier = getCarrierById(option.carrierId);
  const lane = getLaneById(option.laneId) || option.lane;
  const disruption = analysis.disruption;

  const log = (phase, message, badge = 'system') => {
    addLog({ phase, message, badge, timestamp: Date.now() });
  };

  // Phase 1: Rate Discovery
  log('rateDiscovery', `Querying spot rates for ${carrier.name}...`, 'system');
  const spotRate = getSpotRate(carrier, lane, disruption);
  log('rateDiscovery', `Contract rate: ${formatCurrency(spotRate.data.baseContractRate)} | Spot rate: ${formatCurrency(spotRate.data.currentSpotRate)}`, 'Simulation');
  log('rateDiscovery', `Market average: ${formatCurrency(spotRate.data.marketAverage)} | Premium over contract: +${spotRate.data.premiumOverContract}%`, 'Simulation');

  // Phase 2: Target Calculation
  log('targetCalc', 'Calculating target negotiation rate...', 'system');
  const targetRate = calculateTargetRate(spotRate.data, carrier, config.priorityMode);
  log('targetCalc', `Target rate: ${formatCurrency(targetRate.data.targetRate)} | Floor: ${formatCurrency(targetRate.data.floorRate)} | Ceiling: ${formatCurrency(targetRate.data.ceilingRate)}`, 'Math/Rule');
  log('targetCalc', `Potential savings vs spot: ${targetRate.data.savingsVsSpot}% | vs market: ${targetRate.data.savingsVsMarket}%`, 'Math/Rule');

  // Phase 3: Counter-Offer
  log('counterOffer', 'Drafting counter-offer...', 'system');
  const counter = await draftCounterOffer(carrier, targetRate.data, spotRate.data);
  log('counterOffer', `Counter-offer: ${formatCurrency(counter.data.counterRate)} (tone: ${counter.data.tone})`, counter.source === 'claude' ? 'Claude AI' : 'Math/Rule');
  log('counterOffer', `Justification: ${counter.data.justification}`, counter.source === 'claude' ? 'Claude AI' : 'Math/Rule');

  // Phase 4: Carrier Negotiation
  log('negotiation', `Sending counter-offer to ${carrier.name}...`, 'system');
  const reply = await simulateCarrierReply(carrier, counter.data, spotRate.data);
  log('negotiation', `${carrier.name}: "${reply.data.message}"`, reply.source === 'claude' ? 'Claude AI' : 'Simulation');

  if (reply.data.accepted) {
    log('negotiation', `✓ Rate accepted: ${formatCurrency(reply.data.finalRate)}`, reply.source === 'claude' ? 'Claude AI' : 'Simulation');
  } else {
    log('negotiation', `✗ Counter-offer from carrier: ${formatCurrency(reply.data.counterOffer)}`, reply.source === 'claude' ? 'Claude AI' : 'Simulation');
    log('negotiation', `Accepting carrier counter at ${formatCurrency(reply.data.counterOffer)} to secure capacity`, 'Math/Rule');
    reply.data.finalRate = reply.data.counterOffer;
    reply.data.accepted = true;
  }

  // Phase 5: Final Response
  log('finalResponse', 'Drafting final response and summary...', 'system');
  const finalResp = draftFinalResponse(reply.data, analysis);
  log('finalResponse', finalResp.data.summary, 'Math/Rule');
  log('finalResponse', `Cost increase over contract: ${finalResp.data.costIncrease}%`, 'Math/Rule');

  // Phase 6: Booking
  log('booking', 'Confirming booking...', 'system');
  const booking = confirmBooking(finalResp.data);
  log('booking', `Booking confirmed: ${booking.data.bookingId}`, 'Simulation');
  log('booking', `Reference: ${booking.data.reference} | Pickup: ${new Date(booking.data.estimatedPickup).toLocaleString()}`, 'Simulation');

  // Phase 7: TMS Update
  log('tmsUpdate', 'Updating Transportation Management System...', 'system');
  const tms = updateTms(booking.data, disruption);
  tms.data.updates.forEach(u => {
    log('tmsUpdate', `Updated ${u.table}.${u.field} = "${u.value}"`, 'Simulation');
  });
  log('tmsUpdate', `Notifications sent to: ${tms.data.notificationsSent.join(', ')}`, 'Simulation');

  return {
    spotRate: spotRate.data,
    targetRate: targetRate.data,
    counterOffer: counter.data,
    carrierReply: reply.data,
    finalResponse: finalResp.data,
    booking: booking.data,
    tmsUpdate: tms.data,
    usedClaude: counter.source === 'claude' || reply.source === 'claude',
    costIncrease: finalResp.data.costIncrease,
    negotiatedRate: reply.data.finalRate,
    originalRate: spotRate.data.baseContractRate,
  };
}
