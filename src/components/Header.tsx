"use client";

interface Props {
  lastUpdated: number;
  alertCount: number;
}

export default function Header({ lastUpdated, alertCount }: Props) {
  return (
    <div className="d-flex justify-content-between align-items-center mb-2 px-1">
      <div className="d-flex align-items-center gap-2">
        <span className="fw-semibold text-success">
          Livestock Monitoring
        </span>
        <span className="badge bg-secondary bg-opacity-25 text-dark">
          Prototype
        </span>
      </div>

      <div className="d-flex align-items-center gap-3 small text-muted">
        <span>
          Updated {new Date(lastUpdated).toLocaleTimeString()}
        </span>

        {alertCount > 0 ? (
          <span className="text-warning fw-semibold">
            ⚠ {alertCount} Alerts
          </span>
        ) : (
          <span className="text-success">● All normal</span>
        )}
      </div>
    </div>
  );
}
