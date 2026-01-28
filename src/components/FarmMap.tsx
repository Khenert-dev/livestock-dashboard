"use client";

import { useState } from "react";
import {
  TrackedLivestock,
  Status,
} from "../lib/useLivestockStore";

interface Props {
  animals: TrackedLivestock[];
  mode: "live" | "history";
  getStatus: (a: TrackedLivestock) => Status;
  onRemove: (id: number) => void;
}

/* Map size (matches card height nicely) */
const WIDTH = 600;
const HEIGHT = 320;

/* Fake geo bounds (for believable movement) */
const BOUNDS = {
  xMin: 20,
  xMax: WIDTH - 20,
  yMin: 20,
  yMax: HEIGHT - 20,
};

export default function FarmMap({
  animals,
  mode,
  getStatus,
  onRemove,
}: Props) {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div className="position-relative h-100">
      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        width="100%"
        height="100%"
        style={{
          borderRadius: 12,
          backgroundImage: "url(/farm-map.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* HISTORY PATHS */}
        {mode === "history" &&
          animals.map((a) => (
            <polyline
              key={`path-${a.id}`}
              points={a.history
                .map((p) => `${p.x},${p.y}`)
                .join(" ")}
              fill="none"
              stroke="#16a34a"
              strokeWidth={2}
              opacity={0.6}
            />
          ))}

        {/* ANIMALS */}
        {animals.map((a) => {
          const status = getStatus(a);
          const color =
            status === "Active" ? "#16a34a" : "#f59e0b";

          return (
            <circle
              key={a.id}
              cx={Math.min(
                Math.max(a.x, BOUNDS.xMin),
                BOUNDS.xMax
              )}
              cy={Math.min(
                Math.max(a.y, BOUNDS.yMin),
                BOUNDS.yMax
              )}
              r={6}
              fill={color}
              stroke="#14532d"
              strokeWidth={2}
              style={{ cursor: "pointer" }}
              onClick={() => setSelected(a.id)}
            />
          );
        })}
      </svg>

      {/* INFO PANEL */}
      {selected &&
        animals
          .filter((a) => a.id === selected)
          .map((a) => (
            <div
              key={a.id}
              className="card position-absolute shadow-sm"
              style={{
                right: 12,
                bottom: 12,
                width: 220,
              }}
            >
              <div className="card-body p-2">
                <strong>
                  {a.type} #{a.id}
                </strong>
                <div className="small">
                  Status: {getStatus(a)}
                </div>
                <div className="small">
                  Zone: {a.zone}
                </div>

                {a.history.length > 1 && (
                  <div className="small text-muted mt-1">
                    Path points: {a.history.length}
                  </div>
                )}

                <button
                  className="btn btn-sm btn-danger w-100 mt-2"
                  onClick={() => {
                    onRemove(a.id);
                    setSelected(null);
                  }}
                >
                  Remove Animal
                </button>
              </div>
            </div>
          ))}
    </div>
  );
}
