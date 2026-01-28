"use client";

import { AppBar, Toolbar, Box, Typography, Button } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        background: "linear-gradient(90deg, #2e7d32, #388e3c)",
        borderBottom: "1px solid rgba(15,23,42,0.15)",
      }}
    >
      <Toolbar sx={{ minHeight: 56, px: 2 }}>
        {/* LOGO + BRAND */}
        <Box
          component={Link}
          href="/"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            textDecoration: "none",
            color: "inherit",
          }}
        >
          <Image
            src="/farmcare-logo.svg"
            alt="FarmCare Logo"
            width={28}
            height={28}
            priority
          />
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              letterSpacing: "-0.02em",
            }}
          >
            FarmCare
          </Typography>
        </Box>

        <Box sx={{ flexGrow: 1 }} />

        {/* NAV LINKS */}
        <Button
          component={Link}
          href="/"
          sx={{
            color: "#ecfdf5",
            fontWeight: pathname === "/" ? 600 : 500,
            opacity: pathname === "/" ? 1 : 0.85,
            textTransform: "none",
            "&:hover": {
              backgroundColor: "rgba(255,255,255,0.15)",
            },
          }}
        >
          Dashboard
        </Button>

        <Button
          component={Link}
          href="/about"
          sx={{
            color: "#ecfdf5",
            fontWeight: pathname === "/about" ? 600 : 500,
            opacity: pathname === "/about" ? 1 : 0.85,
            textTransform: "none",
            "&:hover": {
              backgroundColor: "rgba(255,255,255,0.15)",
            },
          }}
        >
          About
        </Button>
      </Toolbar>
    </AppBar>
  );
}
