"use client";

import Header from "../components/Header";
import FarmMap from "../components/FarmMap";
import LivestockChart from "../components/LivestockChart";
import LiveCard from "../components/LiveCard";
import { livestockData } from "../data/mockLivestock";

export default function Home() {
  return (
    <main className="container-fluid p-4">
      <Header />

      {/* KPI ROW */}
      <div className="row g-3 mb-4">
        <div className="col-12 col-md-6 col-lg-3">
          <LiveCard
            label="Total Livestock"
            value={livestockData.length}
          />
        </div>

        <div className="col-12 col-md-6 col-lg-3">
          <LiveCard label="Active" value="Moving" status="ok" />
        </div>

        <div className="col-12 col-md-6 col-lg-3">
          <LiveCard
            label="Needs Check"
            value="Auto-Detected"
            status="warn"
          />
        </div>

        <div className="col-12 col-md-6 col-lg-3">
          <LiveCard label="System Time" liveTime />
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="row g-4">
        <div className="col-12 col-lg-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <FarmMap />
            </div>
          </div>
        </div>

        <div className="col-12 col-lg-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <LivestockChart data={livestockData} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
