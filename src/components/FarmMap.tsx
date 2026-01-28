"use client";

import { useEffect, useRef, useState } from "react";
import { livestockData } from "../data/mockLivestock";

/* TYPES */
type ZoneId = "A" | "B" | "C";
type AnimalType = "Cow" | "Goat" | "Sheep";

interface Dot {
  id: number;
  x: number;
  y: number;
  zone: ZoneId;
  type: AnimalType;
  lastMovedAt: number;
}

interface HistoryPoint {
  x: number;
  y: number;
  timestamp: number;
}

type HistoryMap = Record<number, HistoryPoint[]>;

/* ZONES */
const zones: Record<ZoneId, { x: number; y: number; w: number; h: number }> = {
  A: { x: 20, y: 20, w: 200, h: 120 },
  B: { x: 240, y: 20, w: 200, h: 120 },
  C: { x: 20, y: 160, w: 420, h: 120 },
};

const CHECK_THRESHOLD = 15000;
const FORCED_INACTIVE_IDS = [2, 5];

export default function FarmMap() {
  const [dots, setDots] = useState<Dot[]>([]);
  const [history, setHistory] = useState<HistoryMap>({});
  const [now, setNow] = useState(Date.now());
  const [selected, setSelected] = useState<Dot | null>(null);
  const [mode, setMode] = useState<"live" | "history">("live");

  /* ADD MODAL */
  const [showAdd, setShowAdd] = useState(false);
  const [newType, setNewType] = useState<AnimalType>("Cow");
  const [newZone, setNewZone] = useState<ZoneId>("A");

  /* REMOVE MODAL + UNDO */
  const [showRemove, setShowRemove] = useState(false);
  const removedCache = useRef<{ dot: Dot; history: HistoryPoint[] } | null>(
    null
  );

  /* INIT */
  useEffect(() => {
    const initial = livestockData.map((a) => {
      const zone = (a.zone ?? "A") as ZoneId;
      const z = zones[zone];
      const x = z.x + 30 + Math.random() * (z.w - 60);
      const y = z.y + 30 + Math.random() * (z.h - 60);

      return {
        id: a.id,
        type: a.type as AnimalType,
        zone,
        x,
        y,
        lastMovedAt: FORCED_INACTIVE_IDS.includes(a.id)
          ? Date.now() - CHECK_THRESHOLD - 5000
          : Date.now(),
      };
    });

    setDots(initial);

    const h: HistoryMap = {};
    initial.forEach((d) => {
      h[d.id] = [{ x: d.x, y: d.y, timestamp: Date.now() }];
    });
    setHistory(h);
  }, []);

  /* MOVEMENT */
  useEffect(() => {
    const move = setInterval(() => {
      if (mode === "history") return;

      setDots((prev) =>
        prev.map((d) => {
          if (FORCED_INACTIVE_IDS.includes(d.id)) return d;
          if (Math.random() < 0.35) return d;

          const z = zones[d.zone];
          const x = Math.min(
            Math.max(d.x + (Math.random() * 6 - 3), z.x + 12),
            z.x + z.w - 12
          );
          const y = Math.min(
            Math.max(d.y + (Math.random() * 6 - 3), z.y + 12),
            z.y + z.h - 12
          );

          setHistory((h) => ({
            ...h,
            [d.id]: [...(h[d.id] ?? []), { x, y, timestamp: Date.now() }].slice(
              -100
            ),
          }));

          return { ...d, x, y, lastMovedAt: Date.now() };
        })
      );
    }, 1000);

    const clock = setInterval(() => setNow(Date.now()), 1000);
    return () => {
      clearInterval(move);
      clearInterval(clock);
    };
  }, [mode]);

  /* ADD */
  function confirmAdd() {
    const id = Date.now();
    const z = zones[newZone];
    const x = z.x + 40;
    const y = z.y + 40;

    const d: Dot = {
      id,
      type: newType,
      zone: newZone,
      x,
      y,
      lastMovedAt: Date.now(),
    };

    setDots((p) => [...p, d]);
    setHistory((h) => ({
      ...h,
      [id]: [{ x, y, timestamp: Date.now() }],
    }));
    setShowAdd(false);
  }

  /* REMOVE CONFIRM */
  function requestRemove(dot: Dot) {
    removedCache.current = {
      dot,
      history: history[dot.id] ?? [],
    };
    setShowRemove(true);
  }

  function confirmRemove() {
    if (!removedCache.current) return;
    const id = removedCache.current.dot.id;

    setDots((d) => d.filter((a) => a.id !== id));
    setHistory((h) => {
      const c = { ...h };
      delete c[id];
      return c;
    });

    setSelected(null);
    setShowRemove(false);
  }

  function undoRemove() {
    if (!removedCache.current) return;

    setDots((d) => [...d, removedCache.current!.dot]);
    setHistory((h) => ({
      ...h,
      [removedCache.current!.dot.id]: removedCache.current!.history,
    }));

    removedCache.current = null;
    setShowRemove(false);
  }

  return (
    <div className="position-relative" style={{ maxHeight: 360 }}>
      {/* TOP BAR */}
      <div className="d-flex justify-content-between align-items-center mb-2">
        <strong className="text-success">
          {mode === "live" ? "Live Movement" : "Historical Analysis"}
        </strong>
        <div className="d-flex gap-2">
          <button
            className="btn btn-sm btn-outline-success"
            onClick={() => setShowAdd(true)}
          >
            + Add Animal
          </button>
          <button
            className={`btn btn-sm ${
              mode === "live" ? "btn-success" : "btn-outline-success"
            }`}
            onClick={() => setMode("live")}
          >
            Live
          </button>
          <button
            className={`btn btn-sm ${
              mode === "history" ? "btn-success" : "btn-outline-success"
            }`}
            onClick={() => setMode("history")}
          >
            History
          </button>
        </div>
      </div>

      {/* MAP */}
      <div style={{ height: 300, overflow: "hidden", position: "relative", zIndex: 1 }}>
        <svg width="100%" height="300" viewBox="0 0 460 300">
          {Object.entries(zones).map(([id, z]) => (
            <g key={id}>
              <rect
                x={z.x}
                y={z.y}
                width={z.w}
                height={z.h}
                rx={14}
                fill="#e8f5e9"
                stroke="#198754"
                strokeDasharray="4"
              />
              <text x={z.x + 10} y={z.y + 20} fontSize={12} fontWeight="bold">
                Zone {id}
              </text>
            </g>
          ))}

          {mode === "history" &&
            Object.entries(history).map(([id, pts]) => {
              const last = pts.at(-1);
              return (
                <g key={id}>
                  <polyline
                    points={pts.map((p) => `${p.x},${p.y}`).join(" ")}
                    fill="none"
                    stroke="#16a34a"
                    strokeWidth={2}
                  />
                  {last && (
                    <circle cx={last.x} cy={last.y} r={7} fill="#dc2626" />
                  )}
                </g>
              );
            })}

          {dots.map((d) => (
            <circle
              key={d.id}
              cx={d.x}
              cy={d.y}
              r={6}
              fill={
                now - d.lastMovedAt > CHECK_THRESHOLD ? "#f59e0b" : "#198754"
              }
              stroke="#14532d"
              onClick={() => setSelected(d)}
            />
          ))}
        </svg>
      </div>

      {/* INFO */}
      {selected && (
        <div
          className="card position-absolute shadow-sm"
          style={{ right: 10, bottom: 10, width: 220, zIndex: 2 }}
        >
          <div className="card-body">
            <h6 className="fw-bold mb-2">🐄 Animal #{selected.id}</h6>
            <p className="mb-1">Type: {selected.type}</p>
            <p className="mb-1">Zone: {selected.zone}</p>
            <button
              className="btn btn-sm btn-danger w-100"
              onClick={() => requestRemove(selected)}
            >
              Remove
            </button>
          </div>
        </div>
      )}

      {/* ADD MODAL */}
      {showAdd && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
          style={{ background: "rgba(0,0,0,0.4)", zIndex: 9999 }}
        >
          <div className="card shadow" style={{ width: 300, zIndex: 10000 }}>
            <div className="card-body">
              <h6 className="fw-bold mb-3">Add Animal</h6>
              <select
                className="form-select mb-2"
                value={newType}
                onChange={(e) => setNewType(e.target.value as AnimalType)}
              >
                <option>Cow</option>
                <option>Goat</option>
                <option>Sheep</option>
              </select>
              <select
                className="form-select mb-3"
                value={newZone}
                onChange={(e) => setNewZone(e.target.value as ZoneId)}
              >
                <option value="A">Zone A</option>
                <option value="B">Zone B</option>
                <option value="C">Zone C</option>
              </select>
              <div className="d-flex gap-2">
                <button className="btn btn-success w-100" onClick={confirmAdd}>
                  Add
                </button>
                <button
                  className="btn btn-outline-secondary w-100"
                  onClick={() => setShowAdd(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* REMOVE MODAL */}
      {showRemove && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
          style={{ background: "rgba(0,0,0,0.4)", zIndex: 9999 }}
        >
          <div className="card shadow" style={{ width: 320, zIndex: 10000 }}>
            <div className="card-body">
              <h6 className="fw-bold mb-2">Confirm Removal</h6>
              <p className="small text-muted">
                This action can be undone immediately.
              </p>
              <div className="d-flex gap-2">
                <button className="btn btn-danger w-100" onClick={confirmRemove}>
                  Remove
                </button>
                <button
                  className="btn btn-outline-secondary w-100"
                  onClick={undoRemove}
                >
                  Undo
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
