"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import FarmMap from "../components/FarmMap";
import LivestockChart from "../components/LivestockChart";
import LiveCard from "../components/LiveCard";
import { livestockData } from "../data/mockLivestock";

export default function Home() {
  // ✅ DASHBOARD IS NOW THE LANDING PAGE
  const [page, setPage] = useState<"home" | "dashboard" | "about">("dashboard");

  return (
    <main
      className="min-vh-100 d-flex flex-column"
      style={{ background: "#f0fdf4" }}
    >
      <Navbar activePage={page} onNavigate={setPage} />

      <div className="flex-grow-1 container-fluid p-4 overflow-hidden">
        {/* ================= HOME ================= */}
        {page === "home" && (
          <div className="h-100 d-flex flex-column justify-content-center align-items-center text-center px-3">
            <img
              src="/farmcare-logo.svg"
              alt="FarmCare"
              width={140}
              className="mb-4"
            />

            <h1 className="fw-bold text-success display-4 mb-3">
              FarmCare
            </h1>

            <p className="fs-4 text-muted col-lg-7">
              FarmCare is a smart livestock monitoring platform designed to
              visualize animal movement, inactivity, and zone distribution
              using sensor-assisted tracking technologies.
            </p>

            <p className="fs-5 text-muted col-lg-7">
              This system is currently in <strong>prototype stage</strong>.
              Hardware development and real-time data integration are still
              ongoing.
            </p>
          </div>
        )}

        {/* ================= DASHBOARD ================= */}
        {page === "dashboard" && (
          <>
            <Header />

            <div className="alert alert-info border-0 shadow-sm mb-3 fs-6">
              <strong>Prototype Notice:</strong> This dashboard is not the final
              design. Visual layout, metrics, and live data feeds will evolve
              once livestock tracking hardware is fully deployed.
            </div>

            {/* KPI ROW */}
            <div className="row g-3 mb-3">
              <div className="col-12 col-md-6 col-lg-3">
                <LiveCard
                  label="Total Livestock"
                  value={livestockData.length}
                />
              </div>

              <div className="col-12 col-md-6 col-lg-3">
                <LiveCard
                  label="Active Animals"
                  value="Movement Detected"
                  status="ok"
                />
              </div>

              <div className="col-12 col-md-6 col-lg-3">
                <LiveCard
                  label="Needs Inspection"
                  value="Auto-Detected"
                  status="warn"
                />
              </div>

              <div className="col-12 col-md-6 col-lg-3">
                <LiveCard label="System Time" liveTime />
              </div>
            </div>

            {/* MAIN CONTENT */}
            <div className="row g-3 h-100">
              <div className="col-12 col-lg-6">
                <div className="card h-100 shadow-sm border-0">
                  <div className="card-header fw-semibold bg-success-subtle">
                    Livestock Activity Map
                  </div>
                  <div className="card-body">
                    <FarmMap />
                  </div>
                </div>
              </div>

              <div className="col-12 col-lg-6">
                <div className="card h-100 shadow-sm border-0">
                  <div className="card-header fw-semibold bg-success-subtle">
                    Analytics Overview
                  </div>
                  <div className="card-body">
                    <LivestockChart data={livestockData} />
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* ================= ABOUT ================= */}
        {page === "about" && (
          <div className="h-100 d-flex flex-column justify-content-center align-items-center text-center px-3">
            <h2 className="fw-bold text-success display-5 mb-3">
              About FarmCare
            </h2>

            <p className="fs-4 text-muted col-lg-8">
              FarmCare is an academic and prototype-level livestock monitoring
              system focused on movement-based behavior analysis and zone-aware
              visualization.
            </p>

            <p className="fs-5 text-muted col-lg-8">
              The platform emphasizes ethical system design and does not collect
              biometric, medical, or personally identifiable data. All current
              data shown is simulated for development and testing purposes.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
