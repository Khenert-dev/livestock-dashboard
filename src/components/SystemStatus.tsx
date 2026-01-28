"use client";

import { Box, Typography } from "@mui/material";

interface Props {
  lastUpdated: number;
  alertCount: number;
}

export default function SystemStatus({
  lastUpdated,
  alertCount,
}: Props) {
  const ageMs = Date.now() - lastUpdated;
  const ageSec = Math.floor(ageMs / 1000);

  const isStale = ageMs > 10000;

  const color = isStale
    ? "error.main"
    : alertCount > 0
    ? "warning.main"
    : "success.main";

  const label = isStale
    ? "Data stale"
    : alertCount > 0
    ? "Attention required"
    : "System online";

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
      }}
    >
      {/* STATUS DOT */}
      <Box
        sx={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          backgroundColor: color,
          boxShadow: `0 0 6px ${color}`,
        }}
      />

      {/* TEXT */}
      <Typography
        variant="caption"
        sx={{ color }}
      >
        {label} · Updated {ageSec}s ago
      </Typography>
    </Box>
  );
}
