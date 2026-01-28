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
  const [time, setTime] = useState("—");

  useEffect(() => {
    if (!liveTime) return;
    const tick = () => setTime(new Date().toLocaleTimeString());
    tick();
    const i = setInterval(tick, 1000);
    return () => clearInterval(i);
  }, [liveTime]);

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
          <small className="text-muted">{label}</small>
          {status && (
            <span className={`small fw-bold ${color}`}>
              {indicator}
            </span>
          )}
        </div>

        <div className={`fs-4 fw-semibold mt-1 ${color}`} aria-live="polite">
          {liveTime ? time : value}
        </div>
      </div>
    </div>
  );
}
