"use client";

import { useEffect, useState } from "react";

interface Props {
  label: string;
  value?: number | string;
  status?: "ok" | "warn";
  liveTime?: boolean;
}

export default function LiveCard({
  label,
  value,
  status,
  liveTime,
}: Props) {
  const [time, setTime] = useState<string>("—");

  useEffect(() => {
    if (!liveTime) return;

    const update = () => setTime(new Date().toLocaleTimeString());
    update();

    const i = setInterval(update, 1000);
    return () => clearInterval(i);
  }, [liveTime]);

  const borderClass =
    status === "ok"
      ? "border-success"
      : status === "warn"
      ? "border-warning"
      : "border-secondary";

  const bgClass =
    status === "ok"
      ? "bg-success bg-opacity-10"
      : status === "warn"
      ? "bg-warning bg-opacity-10"
      : "bg-light";

  return (
    <div
      className={`card h-100 shadow-sm ${borderClass} ${bgClass}`}
      role="status"
      aria-label={label}
    >
      <div className="card-body d-flex flex-column justify-content-between">
        <div>
          <small className="text-muted">{label}</small>
          <h3 className="fw-bold mt-1" aria-live="polite">
            {liveTime ? time : value}
          </h3>
        </div>

        {status === "ok" && (
          <span className="badge bg-success align-self-start">
            ✔ Active
          </span>
        )}

        {status === "warn" && (
          <span className="badge bg-warning text-dark align-self-start">
            ⚠ Needs Check
          </span>
        )}
      </div>
    </div>
  );
}
