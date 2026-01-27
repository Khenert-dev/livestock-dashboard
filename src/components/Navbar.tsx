"use client";

import Image from "next/image";

interface NavbarProps {
  onNavigate: (page: "home" | "dashboard" | "about") => void;
  activePage: "home" | "dashboard" | "about";
}

export default function Navbar({ onNavigate, activePage }: NavbarProps) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success px-3 shadow-sm">
      <div className="container-fluid">
        {/* LOGO + BRAND */}
        <div
          className="d-flex align-items-center gap-2 text-white"
          role="button"
          onClick={() => onNavigate("home")}
        >
          <Image
            src="/farmcare-logo.svg"
            alt="FarmCare logo"
            width={36}
            height={36}
            priority
          />
          <span className="fw-bold fs-5">FarmCare</span>
        </div>

        {/* HAMBURGER BUTTON */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#farmcareNavbar"
          aria-controls="farmcareNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        {/* COLLAPSIBLE MENU */}
        <div className="collapse navbar-collapse" id="farmcareNavbar">
          <ul className="navbar-nav ms-auto mt-3 mt-lg-0 gap-2 gap-lg-4">
            <li className="nav-item">
              <button
                className={`nav-link btn btn-link text-start text-lg-center ${
                  activePage === "home"
                    ? "fw-semibold text-white"
                    : "text-light"
                }`}
                onClick={() => onNavigate("home")}
              >
                Home
              </button>
            </li>

            <li className="nav-item">
              <button
                className={`nav-link btn btn-link text-start text-lg-center ${
                  activePage === "dashboard"
                    ? "fw-semibold text-white"
                    : "text-light"
                }`}
                onClick={() => onNavigate("dashboard")}
              >
                Dashboard
              </button>
            </li>

            <li className="nav-item">
              <button
                className={`nav-link btn btn-link text-start text-lg-center ${
                  activePage === "about"
                    ? "fw-semibold text-white"
                    : "text-light"
                }`}
                onClick={() => onNavigate("about")}
              >
                About
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
