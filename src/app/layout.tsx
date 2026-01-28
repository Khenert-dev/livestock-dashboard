"use client";

import { ReactNode } from "react";
import {
  ThemeProvider,
  CssBaseline,
  createTheme,
} from "@mui/material";
import Navbar from "../components/Navbar";
import "./globals.css";

const theme = createTheme({
  palette: {
    mode: "light",

    primary: {
      main: "#2e7d32", // calm green
    },

    success: {
      main: "#22c55e",
    },

    warning: {
      main: "#f59e0b",
    },

    background: {
      default: "#f3f7f5", // soft green-white (NOT pure white)
      paper: "rgba(255,255,255,0.88)", // glass card
    },
  },

  shape: {
    borderRadius: 14,
  },

  typography: {
    fontFamily:
      'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    h6: {
      fontWeight: 600,
    },
  },

  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backdropFilter: "blur(10px)",
          boxShadow: "0 10px 28px rgba(15,23,42,0.08)",
          border: "1px solid rgba(15,23,42,0.06)",
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 500,
        },
      },
    },
  },
});

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline />

          {/* GLOBAL NAVBAR */}
          <Navbar />

          {/* PAGE CONTENT */}
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
