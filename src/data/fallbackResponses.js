// Multiple variants per disruption — one is picked randomly each run
const severityVariants = {
  'port-closure': [
    {
      severity: 'high',
      reasoning: 'JNPT port closure is creating a cascading bottleneck across Mumbai-origin lanes. With both Mumbai–Bangalore and Mumbai–Pune corridors affected, we are looking at a 3–5 day throughput freeze and spot rates climbing 30–40% above contract.',
      riskScore: 8.2,
      recommendation: 'Activate contingency routing through Chennai hub to bypass Mumbai port delays.',
    },
    {
      severity: 'high',
      reasoning: 'The JNPT shutdown is blocking container movement on two critical corridors. Based on similar dock disruptions in 2023, expect 72–96 hour clearance backlogs with freight costs spiking significantly. Southern corridor rerouting should be triggered immediately.',
      riskScore: 8.5,
      recommendation: 'Divert Mumbai-origin loads to Chennai–Bangalore lane and activate Delhi–Pune as secondary backup.',
    },
    {
      severity: 'critical',
      reasoning: 'Port operations at JNPT have halted, directly impacting the two highest-volume lanes out of Mumbai. Warehouse inventory at Bangalore destination will be depleted within the buffer window if rerouting is not initiated within 12 hours.',
      riskScore: 8.8,
      recommendation: 'Emergency reroute via Chennai corridor with spot carrier procurement. Escalate to operations lead.',
    },
  ],
  'customs-hold': [
    {
      severity: 'medium',
      reasoning: 'Delhi ICD customs hold is a regulatory disruption typically resolving within 48–72 hours after document clearance. However, both Delhi–Bangalore and Delhi–Pune lanes are blocked, restricting northern corridor shipments.',
      riskScore: 6.5,
      recommendation: 'Hold non-urgent Delhi shipments for clearance; reroute critical loads via Mumbai–Bangalore lane.',
    },
    {
      severity: 'medium',
      reasoning: 'Customs inspection at Delhi ICD has flagged documentation inconsistencies, locking two outbound lanes. Resolution typically takes 2–3 business days but can extend if additional verification is required by CBIC.',
      riskScore: 6.8,
      recommendation: 'Expedite document resubmission and reroute time-sensitive cargo through Mumbai hub.',
    },
    {
      severity: 'high',
      reasoning: 'The Delhi ICD hold is impacting all northbound-origin freight. Given current festive-season demand pressure, even a 48-hour delay risks stockout at southern distribution centres. Immediate rerouting of priority shipments is warranted.',
      riskScore: 7.1,
      recommendation: 'Split shipments: fast-track critical SKUs via Mumbai air freight, hold bulk cargo for customs clearance.',
    },
  ],
  'weather-delay': [
    {
      severity: 'medium',
      reasoning: 'Monsoon flooding on the Mumbai–Pune Expressway is seasonal but can persist for 2–4 days. The NH-44 corridor blockage also impacts Delhi–Pune movement. Partial rerouting via Chennai is advisable for urgent loads.',
      riskScore: 5.8,
      recommendation: 'Reroute urgent Pune-bound shipments via Chennai–Bangalore–Pune; hold non-critical loads 48h for weather clearance.',
    },
    {
      severity: 'medium',
      reasoning: 'Heavy monsoon rainfall has rendered the Mumbai–Pune expressway impassable for loaded trucks. IMD forecasts indicate continued heavy rain for 36–48 hours. The Delhi–Pune NH-44 stretch is also reporting waterlogging.',
      riskScore: 6.0,
      recommendation: 'Activate Chennai–Bangalore–Pune alternate corridor for urgent deliveries. Defer non-critical shipments by 48 hours.',
    },
    {
      severity: 'high',
      reasoning: 'Western Ghats flooding has shut down two primary corridors simultaneously. Historical monsoon data suggests 3–5 day road closures in severe cases. Downstream inventory buffers are thin this quarter.',
      riskScore: 6.5,
      recommendation: 'Immediate multi-modal shift: rail from Mumbai to Pune for critical loads, road via Chennai for Bangalore-bound cargo.',
    },
  ],
  'truck-breakdown': [
    {
      severity: 'critical',
      reasoning: 'Fleet breakdown at Chennai with 12 trucks grounded requires immediate re-brokering. This is a capacity failure affecting the critical Chennai–Bangalore last-mile link. All affected loads need new carrier assignment within 12 hours.',
      riskScore: 9.1,
      recommendation: 'Emergency spot procurement from Carrier B/C for Chennai–Bangalore loads. Activate Mumbai–Bangalore direct lane as backup.',
    },
    {
      severity: 'critical',
      reasoning: 'Twelve vehicles down at Chennai depot is a severe capacity gap on the last-mile Bangalore corridor. Current fleet utilisation was already at 94% — there is zero slack to absorb this. Spot market engagement is the only viable path.',
      riskScore: 9.3,
      recommendation: 'Procure spot capacity immediately from at least two carriers. Prioritise perishable and high-value loads first.',
    },
    {
      severity: 'critical',
      reasoning: 'The Chennai fleet failure has knocked out our primary last-mile capacity to Bangalore. With SLA deadlines in 36 hours and no internal fleet buffer, this is a P0 logistics emergency requiring immediate broker activation.',
      riskScore: 8.9,
      recommendation: 'Engage backup carriers for Chennai–Bangalore within 4 hours. Escalate to regional ops manager for SLA risk.',
    },
  ],
};

const counterOfferVariants = {
  preferred: [
    {
      counterRate: null,
      justification: 'Given our long-standing partnership and quarterly volume commitment of 200+ loads across Indian corridors, we propose a rate reflecting only 5% premium over contract — well below the current spot market average.',
      tone: 'collaborative',
    },
    {
      counterRate: null,
      justification: 'As a preferred partner with consistent volumes on this corridor, we believe a modest premium over contract rate is fair. We are prepared to extend our Q3 volume guarantee in exchange for priority capacity allocation.',
      tone: 'collaborative',
    },
    {
      counterRate: null,
      justification: 'Our track record of 200+ loads per quarter and 98% payment compliance positions this as a low-risk booking for you. We propose a rate that acknowledges the surge while respecting our partnership economics.',
      tone: 'collaborative',
    },
  ],
  existing: [
    {
      counterRate: null,
      justification: 'We value our ongoing relationship and are prepared to offer volume guarantees on key Mumbai–Bangalore and Delhi corridors in exchange for priority capacity. Our proposed rate includes a fair market adjustment while remaining competitive.',
      tone: 'firm-but-fair',
    },
    {
      counterRate: null,
      justification: 'Based on our 18-month relationship and growing volumes, we expect a rate that reflects market conditions without excessive surge pricing. We can commit to guaranteed weekly loads on this lane for the next quarter.',
      tone: 'firm-but-fair',
    },
    {
      counterRate: null,
      justification: 'Our counter reflects current market benchmarks for this corridor minus a relationship discount. In return, we are offering load consolidation across two lanes — reducing your deadhead percentage significantly.',
      tone: 'firm-but-fair',
    },
  ],
  new: [
    {
      counterRate: null,
      justification: 'We recognise this is an opportunity to establish a new partnership on Indian routes. While we need competitive pricing, we offer a guaranteed volume commitment providing revenue stability.',
      tone: 'opportunity-framing',
    },
    {
      counterRate: null,
      justification: 'This disruption creates an opening for both sides. We need reliable capacity; you gain a new enterprise client on high-volume Indian corridors. Our counter-offer reflects a fair entry point for a long-term relationship.',
      tone: 'opportunity-framing',
    },
    {
      counterRate: null,
      justification: 'We are evaluating multiple carriers for this emergency load and are prepared to convert this into a recurring lane contract. Our proposed rate is competitive and includes a commitment to trial 20 loads over the next 60 days.',
      tone: 'opportunity-framing',
    },
  ],
};

const carrierReplyVariants = {
  preferred: [
    {
      accepted: true,
      finalRate: null,
      message: 'We appreciate the partnership and can accommodate this load at the proposed rate. Truck #MH-04-BX-4821 is available for pickup from Mumbai within 4 hours.',
      counterOffer: null,
    },
    {
      accepted: true,
      finalRate: null,
      message: 'Accepted. Given our preferred arrangement, we are prioritising your load. Vehicle assignment confirmed — expect pickup confirmation within 3 hours.',
      counterOffer: null,
    },
    {
      accepted: true,
      finalRate: null,
      message: 'Rate confirmed under our preferred partnership terms. We have allocated a dedicated vehicle from our Mumbai fleet. Driver details will follow within 2 hours.',
      counterOffer: null,
    },
  ],
  existing: [
    {
      accepted: true,
      finalRate: null,
      message: 'After reviewing the volume commitment, we accept this rate. We have a driver available near the pickup point who can collect within 6 hours.',
      counterOffer: null,
    },
    {
      accepted: true,
      finalRate: null,
      message: 'We can work with this rate given the volume guarantee on Indian corridors. Capacity confirmed — our nearest available truck can reach the pickup location in approximately 5 hours.',
      counterOffer: null,
    },
    {
      accepted: true,
      finalRate: null,
      message: 'Agreed on the proposed rate. We are repositioning a vehicle from our Pune depot to handle this load. Estimated pickup readiness: 4–5 hours.',
      counterOffer: null,
    },
  ],
  new: [
    {
      accepted: false,
      finalRate: null,
      message: 'We appreciate the opportunity but need a slight adjustment to cover our positioning costs for this corridor. We can commit to pickup within 3 hours if the rate is adjusted.',
      counterOffer: null,
    },
    {
      accepted: false,
      finalRate: null,
      message: 'Thank you for considering us. As a new partner, our positioning costs on this lane are higher. A small rate adjustment would allow us to guarantee same-day pickup with GPS tracking.',
      counterOffer: null,
    },
    {
      accepted: false,
      finalRate: null,
      message: 'We are keen to onboard but the proposed rate does not cover our operational costs for this corridor. Our counter-offer includes priority loading and real-time tracking at no extra charge.',
      counterOffer: null,
    },
  ],
};

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export const FALLBACK_RESPONSES = {
  get assessSeverity() {
    return {
      'port-closure': pickRandom(severityVariants['port-closure']),
      'customs-hold': pickRandom(severityVariants['customs-hold']),
      'weather-delay': pickRandom(severityVariants['weather-delay']),
      'truck-breakdown': pickRandom(severityVariants['truck-breakdown']),
    };
  },

  get draftCounterOffer() {
    return {
      preferred: pickRandom(counterOfferVariants.preferred),
      existing: pickRandom(counterOfferVariants.existing),
      new: pickRandom(counterOfferVariants.new),
    };
  },

  get simulateCarrierReply() {
    return {
      preferred: pickRandom(carrierReplyVariants.preferred),
      existing: pickRandom(carrierReplyVariants.existing),
      new: pickRandom(carrierReplyVariants.new),
    };
  },

  draftFinalResponse: {
    approval: 'Based on comprehensive analysis, the recommended rerouting plan optimises for the selected priority while maintaining delivery commitments across Indian corridors. The negotiated rate represents a favourable outcome compared to current spot market conditions.',
    rejection: 'Alternative carrier option selected after initial rejection. The revised plan maintains delivery commitments while exploring additional cost optimisation opportunities on Indian routes.',
  },
};
