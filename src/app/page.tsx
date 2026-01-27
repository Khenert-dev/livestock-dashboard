"use client";

import { useState } from "react";
import Header from "../components/Header";
import FarmMap from "../components/FarmMap";
import LivestockChart from "../components/LivestockChart";
import LiveCard from "../components/LiveCard";
import { livestockData } from "../data/mockLivestock";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

type Page = "home" | "dashboard" | "about";

export default function Home() {
  const [page, setPage] = useState<Page>("dashboard");

  return (
    <main
      className="d-flex flex-column"
      style={{
        minHeight: "100dvh",
        backgroundColor: "#f0fdf4",
      }}
    >
      {/* NAVBAR */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-success px-4">
        <div className="navbar-brand d-flex align-items-center gap-2">
          <img src="/farmcare-logo.svg" alt="FarmCare Logo" height={32} />
          <span className="fw-semibold fs-5">FarmCare</span>
        </div>

        <div className="ms-auto d-flex gap-4">
          <button
            className={`btn btn-link text-white fs-5 ${
              page === "home" ? "fw-bold text-decoration-underline" : ""
            }`}
            onClick={() => setPage("home")}
          >
            Home
          </button>

          <button
            className={`btn btn-link text-white fs-5 ${
              page === "dashboard" ? "fw-bold text-decoration-underline" : ""
            }`}
            onClick={() => setPage("dashboard")}
          >
            Dashboard
          </button>

          <button
            className={`btn btn-link text-white fs-5 ${
              page === "about" ? "fw-bold text-decoration-underline" : ""
            }`}
            onClick={() => setPage("about")}
          >
            About
          </button>
        </div>
      </nav>

      {/* CONTENT */}
      <div
        className="flex-grow-1 container-fluid p-4"
        style={{
          overflowY: "auto",
          WebkitOverflowScrolling: "touch",
          paddingBottom: "4rem",
        }}
      >
        {/* HOME */}
        {page === "home" && (
          <div className="d-flex flex-column justify-content-center align-items-center text-center">
            <img src="/farmcare-logo.svg" alt="FarmCare" width={160} className="mb-4" />

            <h1 className="fw-bold text-success display-3 mb-3">FarmCare</h1>

            <p className="fs-4 text-muted col-lg-7">
              A smart livestock monitoring platform designed to visualize
              animal movement, inactivity, and zone-based behavior using
              sensor-assisted tracking technologies.
            </p>

            <p className="fs-5 text-muted col-lg-7">
              This system is currently in <strong>prototype stage</strong>.
              Hardware development and live data integration are ongoing.
            </p>
          </div>
        )}

        {/* DASHBOARD */}
        {page === "dashboard" && (
          <>
            <Header />

            <div className="alert alert-danger border-0 shadow-sm mb-3 fs-6">
              <strong>Prototype Notice:</strong> This dashboard is not the final
              design. Visual layout, metrics, and live data feeds will evolve
              once livestock tracking hardware is fully deployed.
            </div>

            <div className="row g-3 mb-3">
              <div className="col-6 col-lg-3">
                <LiveCard label="Total Livestock" value={livestockData.length} />
              </div>

              <div className="col-6 col-lg-3">
                <LiveCard label="Active Animals" value="Movement Detected" status="ok" />
              </div>

              <div className="col-6 col-lg-3">
                <LiveCard label="Needs Inspection" value="Auto-Detected" status="warn" />
              </div>

              <div className="col-6 col-lg-3">
                <LiveCard label="System Time" liveTime />
              </div>
            </div>

            <div className="row g-3">
              <div className="col-lg-6">
                <div className="card h-100 shadow-sm border-0">
                  <div className="card-header fw-semibold bg-success-subtle fs-5">
                    Livestock Activity Map
                  </div>
                  <div className="card-body" style={{ minHeight: 320 }}>
                    <FarmMap />
                  </div>
                </div>
              </div>

              <div className="col-lg-6">
                <div className="card h-100 shadow-sm border-0">
                  <div className="card-header fw-semibold bg-success-subtle fs-5">
                    Analytics Overview
                  </div>
                  <div className="card-body" style={{ minHeight: 320 }}>
                    <LivestockChart data={livestockData} />
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* ABOUT */}
        {page === "about" && (
          <div className="d-flex flex-column justify-content-center align-items-center text-center">
            <h2 className="fw-bold text-success display-4 mb-3">About FarmCare</h2>

            <p className="fs-3 text-muted col-lg-8">
              FarmCare is an academic, prototype-level livestock monitoring
              system focused on movement-based behavior analysis and
              zone-aware visualization.
            </p>

            <p className="fs-4 text-muted col-lg-8">
              The platform emphasizes ethical system design and does not
              collect biometric, medical, or personally identifiable data.
              All displayed data is simulated for development purposes.
            </p>

            <a
              href="https://docs.google.com/document/d/12o9G-_lwU_-qmZ4wkKsmcx9OBcawGEWyKST4HC7s_zM/edit"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline-success btn-lg mt-3"
            >
              Read Full Project Documentation
            </a>
          </div>
        )}
      </div>
    </main>
  );
}
