"use client";

import { useState } from "react";

interface NavbarProps {
  onNavigate: (page: "home" | "dashboard" | "about") => void;
  activePage: "home" | "dashboard" | "about";
}

export default function Navbar({ onNavigate, activePage }: NavbarProps) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success px-4 shadow-sm">
      {/* LOGO + BRAND */}
      <div
        className="navbar-brand d-flex align-items-center gap-2"
        role="button"
        onClick={() => onNavigate("home")}
      >
        <img
          src="/farmcare-logo.svg"
          alt="FarmCare logo"
          width={36}
          height={36}
        />
        <span className="fw-bold">FarmCare</span>
      </div>

      {/* NAV LINKS */}
      <ul className="navbar-nav ms-auto d-flex flex-row gap-4">
        <li className="nav-item">
          <button
            className={`nav-link btn btn-link ${
              activePage === "home" ? "fw-semibold text-white" : "text-light"
            }`}
            onClick={() => onNavigate("home")}
          >
            Home
          </button>
        </li>

        <li className="nav-item">
          <button
            className={`nav-link btn btn-link ${
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
            className={`nav-link btn btn-link ${
              activePage === "about" ? "fw-semibold text-white" : "text-light"
            }`}
            onClick={() => onNavigate("about")}
          >
            About
          </button>
        </li>
      </ul>
    </nav>
  );
}
