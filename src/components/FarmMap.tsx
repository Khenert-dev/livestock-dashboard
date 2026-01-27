"use client";

import { useEffect, useState } from "react";
import { livestockData } from "../data/mockLivestock";

interface Dot {
  id: number;
  x: number;
  y: number;
  zone: "A" | "B" | "C";
  type: string;
  lastMovedAt: number;
}

/* ZONES */
const zones = {
  A: { x: 20, y: 20, w: 200, h: 120 },
  B: { x: 240, y: 20, w: 200, h: 120 },
  C: { x: 20, y: 160, w: 420, h: 120 },
};

const CHECK_THRESHOLD = 15000; // 15 seconds

/* FORCE THESE ANIMALS TO BE INACTIVE */
const FORCED_INACTIVE_IDS = [2, 5];

export default function FarmMap() {
  const [dots, setDots] = useState<Dot[]>([]);
  const [now, setNow] = useState(Date.now());
  const [selected, setSelected] = useState<Dot | null>(null);

  useEffect(() => {
    setDots(
      livestockData.map((a) => {
        const z = zones[a.zone];
        return {
          id: a.id,
          type: a.type,
          zone: a.zone,
          x: z.x + 30 + Math.random() * (z.w - 60),
          y: z.y + 30 + Math.random() * (z.h - 60),
          lastMovedAt: FORCED_INACTIVE_IDS.includes(a.id)
            ? Date.now() - CHECK_THRESHOLD - 5000 // already idle
            : Date.now(),
        };
      })
    );

    const moveInterval = setInterval(() => {
      setDots((prev) =>
        prev.map((d) => {
          // DO NOT MOVE FORCED INACTIVE ANIMALS
          if (FORCED_INACTIVE_IDS.includes(d.id)) return d;

          const shouldMove = Math.random() > 0.35;
          if (!shouldMove) return d;

          const z = zones[d.zone];
          return {
            ...d,
            x: Math.min(
              Math.max(d.x + (Math.random() * 6 - 3), z.x + 12),
              z.x + z.w - 12
            ),
            y: Math.min(
              Math.max(d.y + (Math.random() * 6 - 3), z.y + 12),
              z.y + z.h - 12
            ),
            lastMovedAt: Date.now(),
          };
        })
      );
    }, 1000);

    const clock = setInterval(() => setNow(Date.now()), 1000);

    return () => {
      clearInterval(moveInterval);
      clearInterval(clock);
    };
  }, []);

  return (
    <div className="position-relative">
      <svg
        width="100%"
        height="300"
        viewBox="0 0 460 300"
        role="img"
        aria-label="Live livestock movement map"
      >
        {/* ZONES */}
        {Object.entries(zones).map(([id, z]) => (
          <g key={id}>
            <rect
              x={z.x}
              y={z.y}
              width={z.w}
              height={z.h}
              rx="14"
              fill="#e8f5e9"
              stroke="#198754"
              strokeDasharray="4"
            />
            <text
              x={z.x + 10}
              y={z.y + 20}
              fontSize="12"
              fontWeight="bold"
              fill="#198754"
            >
              Zone {id}
            </text>
          </g>
        ))}

        {/* LIVESTOCK DOTS */}
        {dots.map((d) => {
          const idle = now - d.lastMovedAt;
          const needsCheck = idle > CHECK_THRESHOLD;

          return (
            <circle
              key={d.id}
              cx={d.x}
              cy={d.y}
              r="6"
              fill={needsCheck ? "#f59e0b" : "#198754"}
              onMouseEnter={() => setSelected(d)}
              onMouseLeave={() => setSelected(null)}
              onClick={() => setSelected(d)}
              style={{ cursor: "pointer" }}
            />
          );
        })}
      </svg>

      {/* INFO PANEL */}
      {selected && (
        <div
          className="card shadow-sm position-absolute"
          style={{
            right: 10,
            bottom: 10,
            width: 220,
            zIndex: 10,
          }}
          role="dialog"
          aria-label="Livestock details"
        >
          <div className="card-body p-3">
            <h6 className="fw-bold mb-2 text-success">
              🐄 Animal #{selected.id}
            </h6>

            <p className="mb-1">
              <strong>Type:</strong> {selected.type}
            </p>
            <p className="mb-1">
              <strong>Zone:</strong> {selected.zone}
            </p>

            <p className="mb-1">
              <strong>Status:</strong>{" "}
              {now - selected.lastMovedAt > CHECK_THRESHOLD
                ? "Needs Check"
                : "Active"}
            </p>

            <p className="mb-0 text-muted small">
              Idle for{" "}
              {Math.floor((now - selected.lastMovedAt) / 1000)}s
            </p>
          </div>
        </div>
      )}

      {/* INSTRUCTION + LEGEND */}
      <div className="mt-2 small text-muted d-flex flex-wrap gap-3">
        <span>🟢 Active (moving)</span>
        <span>🟡 Needs Check (inactive)</span>
        <span>🛈 Please hover or tap on a dot to check animal details</span>
      </div>
    </div>
  );
}
