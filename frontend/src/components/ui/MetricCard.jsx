export function MetricCard({ label, value, tone = "neutral" }) {
  return (
    <section className={`metric metric-${tone}`}>
      <p>{label}</p>
      <strong>{value}</strong>
    </section>
  );
}
