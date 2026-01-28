"use client";

import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";

export default function DeviceConnect() {
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setConnected(true), 2500);
    return () => clearTimeout(t);
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        px: 1,
        mb: 1,
      }}
    >
      {/* STATUS DOT */}
      <Box
        sx={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          backgroundColor: connected
            ? "success.main"
            : "warning.main",
          boxShadow: connected
            ? "0 0 6px rgba(22,163,74,0.6)"
            : "0 0 6px rgba(245,158,11,0.6)",
          transition: "background-color 0.3s ease",
        }}
      />

      {/* TEXT */}
      <Typography
        variant="caption"
        color="text.secondary"
      >
        {connected
          ? "ESP32 connected"
          : "Connecting to ESP32…"}
      </Typography>
    </Box>
  );
}
