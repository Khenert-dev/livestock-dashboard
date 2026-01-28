"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const path = usePathname();

  return (
    <nav className="navbar navbar-expand bg-success px-3 py-2">
      <span className="navbar-brand text-white fw-semibold">
        FarmCare
      </span>

      <div className="ms-auto d-flex gap-3">
        <Link
          href="/"
          className={`nav-link text-white ${
            path === "/" ? "fw-bold text-decoration-underline" : ""
          }`}
        >
          Dashboard
        </Link>

        <Link
          href="/about"
          className={`nav-link text-white ${
            path === "/about" ? "fw-bold text-decoration-underline" : ""
          }`}
        >
          About
        </Link>
      </div>
    </nav>
  );
}
