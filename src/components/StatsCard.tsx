"use client";

import { Paper, Typography, Box } from "@mui/material";

interface Props {
  title: string;
  value: string | number;
  status?: "ok" | "warn" | "neutral";
}

export default function StatsCard({
  title,
  value,
  status = "neutral",
}: Props) {
  const color =
    status === "ok"
      ? "success.main"
      : status === "warn"
      ? "warning.main"
      : "text.primary";

  const indicator =
    status === "ok" ? "●" : status === "warn" ? "▲" : "■";

  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        height: "100%",
        border: "1px solid rgba(15,23,42,0.08)",
        transition: "all 0.25s ease",

        "&:hover": {
          boxShadow: "0 10px 24px rgba(15,23,42,0.1)",
          transform: "translateY(-2px)",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          variant="caption"
          sx={{ color: "text.secondary", fontWeight: 500 }}
        >
          {title}
        </Typography>

        <Typography
          variant="caption"
          sx={{ color, fontWeight: 700 }}
        >
          {indicator}
        </Typography>
      </Box>

      <Typography
        variant="h5"
        sx={{
          mt: 0.5,
          fontWeight: 700,
          color,
        }}
      >
        {value}
      </Typography>
    </Paper>
  );
}
