"use client";

interface Props {
  title: string;
  value: string | number;
  status?: "ok" | "warn" | "neutral";
}

export default function StatsCard({ title, value, status = "neutral" }: Props) {
  const color =
    status === "ok"
      ? "text-success"
      : status === "warn"
      ? "text-warning"
      : "text-dark";

  const indicator =
    status === "ok" ? "●" : status === "warn" ? "▲" : "■";

  return (
    <div className="card h-100 shadow-sm border-0">
      <div className="card-body py-2 px-3">
        <div className="d-flex justify-content-between align-items-center">
          <small className="text-muted">{title}</small>
          <span className={`small fw-bold ${color}`}>
            {indicator}
          </span>
        </div>

        <div className={`fs-4 fw-semibold mt-1 ${color}`}>
          {value}
        </div>
      </div>
    </div>
  );
}
