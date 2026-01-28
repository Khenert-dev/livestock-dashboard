"use client";

interface Props {
  lastUpdated: number;
  alertCount: number;
}

export default function SystemStatus({
  lastUpdated,
  alertCount,
}: Props) {
  const age = Date.now() - lastUpdated;

  const isStale = age > 10000;

  const color = isStale
    ? "text-danger"
    : alertCount > 0
    ? "text-warning"
    : "text-success";

  const label = isStale
    ? "Data Stale"
    : alertCount > 0
    ? "Attention Required"
    : "System Online";

  return (
    <div className={`d-flex align-items-center gap-2 small ${color}`}>
      <span>●</span>
      <span>
        {label} · Updated {Math.floor(age / 1000)}s ago
      </span>
    </div>
  );
}
