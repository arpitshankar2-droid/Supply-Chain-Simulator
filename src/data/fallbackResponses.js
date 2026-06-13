export const FALLBACK_RESPONSES = {
  assessSeverity: {
    'port-closure': {
      severity: 'high',
      reasoning: 'JNPT port closure creates a cascading bottleneck on both Mumbai–Bangalore and Mumbai–Pune lanes. Historical data from past dock strikes shows 3–5 day delays with 30–40% cost surges. Immediate rerouting via Delhi or Chennai corridors recommended.',
      riskScore: 8.2,
      recommendation: 'Activate contingency routing through Chennai hub to bypass Mumbai port delays.',
    },
    'customs-hold': {
      severity: 'medium',
      reasoning: 'Delhi ICD customs hold is a regulatory disruption typically resolving within 48–72 hours after document clearance. However, both Delhi–Bangalore and Delhi–Pune lanes are blocked, restricting northern corridor shipments.',
      riskScore: 6.5,
      recommendation: 'Hold non-urgent Delhi shipments for clearance; reroute critical loads via Mumbai–Bangalore lane.',
    },
    'weather-delay': {
      severity: 'medium',
      reasoning: 'Monsoon flooding on the Mumbai–Pune Expressway is seasonal but can persist for 2–4 days. The NH-44 corridor blockage also impacts Delhi–Pune movement. Partial rerouting via Chennai is advisable for urgent loads.',
      riskScore: 5.8,
      recommendation: 'Reroute urgent Pune-bound shipments via Chennai–Bangalore–Pune; hold non-critical loads 48h for weather clearance.',
    },
    'truck-breakdown': {
      severity: 'critical',
      reasoning: 'Fleet breakdown at Chennai with 12 trucks grounded requires immediate re-brokering. This is a capacity failure affecting the critical Chennai–Bangalore last-mile link. All affected loads need new carrier assignment within 12 hours.',
      riskScore: 9.1,
      recommendation: 'Emergency spot procurement from Carrier B/C for Chennai–Bangalore loads. Activate Mumbai–Bangalore direct lane as backup.',
    },
  },

  draftCounterOffer: {
    preferred: {
      counterRate: null,
      justification: 'Given our long-standing partnership and quarterly volume commitment of 200+ loads across Indian corridors, we propose a rate reflecting only 5% premium over contract — well below the current spot market average. This maintains our preferred partnership while acknowledging the urgency of the situation.',
      tone: 'collaborative',
    },
    existing: {
      counterRate: null,
      justification: 'We value our ongoing relationship and are prepared to offer volume guarantees on key Mumbai–Bangalore and Delhi corridors in exchange for priority capacity. Our proposed rate includes a fair market adjustment while remaining competitive.',
      tone: 'firm-but-fair',
    },
    new: {
      counterRate: null,
      justification: 'We recognise this is an opportunity to establish a new partnership on Indian routes. While we need competitive pricing, we offer a guaranteed volume commitment providing revenue stability. Our counter-offer reflects current market rates with a new-partner adjustment.',
      tone: 'opportunity-framing',
    },
  },

  simulateCarrierReply: {
    preferred: {
      accepted: true,
      finalRate: null,
      message: 'We appreciate the partnership and can accommodate this load at the proposed rate. Truck #MH-04-BX-4821 is available for pickup from Mumbai within 4 hours. Confirming capacity reservation now.',
      counterOffer: null,
    },
    existing: {
      accepted: true,
      finalRate: null,
      message: 'After reviewing the volume commitment on key Indian corridors, we accept this rate. We have a driver available near the pickup point who can collect within 6 hours. Sending booking confirmation shortly.',
      counterOffer: null,
    },
    new: {
      accepted: false,
      finalRate: null,
      message: 'We appreciate the opportunity but need a slight adjustment to cover our positioning costs for this corridor. We can commit to pickup within 3 hours if the rate is adjusted to our counter-offer.',
      counterOffer: null,
    },
  },

  draftFinalResponse: {
    approval: 'Based on comprehensive analysis, the recommended rerouting plan optimises for the selected priority while maintaining delivery commitments across Indian corridors. The negotiated rate represents a favourable outcome compared to current spot market conditions.',
    rejection: 'Alternative carrier option selected after initial rejection. The revised plan maintains delivery commitments while exploring additional cost optimisation opportunities on Indian routes.',
  },
};
