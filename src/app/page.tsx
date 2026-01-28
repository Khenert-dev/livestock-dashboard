"use client";

import { useEffect, useState } from "react";
import { useLivestockStore } from "../lib/useLivestockStore";
import FarmMap from "../components/FarmMap";
import LiveCard from "../components/LiveCard";
import LivestockChart from "../components/LivestockChart";
import LivestockTable from "../components/LivestockTable";
import Header from "../components/Header";
import DeviceConnect from "../components/DeviceConnect";

export default function Page() {
  const {
    animals,
    alerts,
    uiNow,
    setMode,
    getStatus,
    addAnimal,
    removeAnimal,
  } = useLivestockStore();

  const [mounted, setMounted] = useState(false);
  const [viewMode, setViewMode] = useState<"live" | "history">("live");

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setMode(viewMode);
  }, [viewMode, setMode]);

  if (!mounted) return null;

  const active = animals.filter((a) => getStatus(a) === "Active").length;
  const inactive = animals.length - active;

  return (
    <main className="container-fluid p-3 bg-light min-vh-100">
      {/* HEADER */}
      <Header lastUpdated={uiNow} alertCount={alerts.length} />

      {/* DEVICE STATUS */}
      <div className="mb-2">
        <DeviceConnect />
      </div>

      {/* KPI CARDS */}
      <div className="row g-2 mb-3">
        <div className="col">
          <LiveCard label="Total Livestock" value={animals.length} />
        </div>
        <div className="col">
          <LiveCard label="Active" value={active} status="ok" />
        </div>
        <div className="col">
          <LiveCard label="Needs Inspection" value={inactive} status="warn" />
        </div>
        <div className="col">
          <LiveCard label="System Time" liveTime />
        </div>
      </div>

      {/* CONTROLS */}
      <div className="d-flex gap-2 mb-2">
        <button
          className={`btn btn-sm ${
            viewMode === "live" ? "btn-success" : "btn-outline-success"
          }`}
          onClick={() => setViewMode("live")}
        >
          Live
        </button>

        <button
          className={`btn btn-sm ${
            viewMode === "history"
              ? "btn-success"
              : "btn-outline-success"
          }`}
          onClick={() => setViewMode("history")}
        >
          History
        </button>

        <button
          className="btn btn-sm btn-outline-primary ms-auto"
          onClick={() => addAnimal("Cow", "A")}
        >
          + Add Animal
        </button>
      </div>

      {/* MAIN GRID */}
      <div className="row g-3">
        <div className="col-lg-7">
          <div className="card p-2">
            <FarmMap
              animals={animals}
              mode={viewMode}
              getStatus={getStatus}
              onRemove={removeAnimal}
            />
          </div>
        </div>

        <div className="col-lg-5">
          <div className="card p-2 mb-3">
            <LivestockChart data={animals} />
          </div>

          {/* ALERTS (LOCKED HEIGHT — NO JUMP) */}
          <div className="card p-2" style={{ minHeight: 120 }}>
            <strong className="mb-1 d-block">Alerts</strong>
            {alerts.length === 0 ? (
              <small className="text-muted">All systems normal</small>
            ) : (
              alerts.map((a) => (
                <div key={a.id} className="text-warning small">
                  ⚠ {a.type} #{a.id} inactive
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* TABLE */}
      <div className="card mt-3 p-2">
        <LivestockTable animals={animals} getStatus={getStatus} />
      </div>
    </main>
  );
}
