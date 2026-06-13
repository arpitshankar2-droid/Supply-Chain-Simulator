import MetricCard from './MetricCard';

export default function MetricsComparison({ before, after }) {
  if (!before || !after) return null;

  return (
    <div className="grid grid-cols-2 gap-4">
      <MetricCard
        label="Response Time"
        before="4–24 hrs"
        after="47 sec"
        format="text"
        highlight
      />
      <MetricCard
        label="Shipping Rate"
        before={before.rate}
        after={after.rate}
        format="currency"
      />
      <MetricCard
        label="Transit Time"
        before={before.transitDays}
        after={after.transitDays}
        format="days"
      />
      <MetricCard
        label="Carrier Reliability"
        before={before.reliability}
        after={after.reliability}
        format="percent"
      />
      <MetricCard
        label="Carrier"
        before={before.carrier}
        after={after.carrier}
        format="text"
      />
    </div>
  );
}
