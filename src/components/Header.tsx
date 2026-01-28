"use client";

import { Box, Typography, Chip } from "@mui/material";

interface Props {
  lastUpdated: number;
  alertCount: number;
}

export default function Header({ lastUpdated, alertCount }: Props) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mb: 1,
        px: 1,
      }}
    >
      {/* LEFT: TITLE */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Typography
          variant="h6"
          sx={{ fontWeight: 600 }}
        >
          Livestock Monitoring
        </Typography>

        <Chip
          label="Prototype"
          size="small"
          sx={{
            backgroundColor: "rgba(15,23,42,0.06)",
            color: "#374151",
            fontWeight: 500,
          }}
        />
      </Box>

      {/* RIGHT: STATUS */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Typography
          variant="caption"
          color="text.secondary"
        >
          Updated {new Date(lastUpdated).toLocaleTimeString()}
        </Typography>

        {alertCount > 0 ? (
          <Chip
            label={`⚠ ${alertCount} Alerts`}
            size="small"
            color="warning"
            variant="outlined"
          />
        ) : (
          <Chip
            label="● All normal"
            size="small"
            color="success"
            variant="outlined"
          />
        )}
      </Box>
    </Box>
  );
}
