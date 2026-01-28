"use client";

import { useEffect, useState } from "react";
import { Paper, Typography, Box } from "@mui/material";

interface Props {
  label: string;
  value?: number | string;
  status?: "ok" | "warn";
  liveTime?: boolean;
}

export default function LiveCard({
  label,
  value,
  status,
  liveTime,
}: Props) {
  const [time, setTime] = useState("—");

  useEffect(() => {
    if (!liveTime) return;

    const update = () => setTime(new Date().toLocaleTimeString());
    update();

    const t = setInterval(update, 1000);
    return () => clearInterval(t);
  }, [liveTime]);

  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",

        /* border + premium feel */
        border: "1px solid rgba(15,23,42,0.08)",
        transition: "all 0.25s ease",

        "&:hover": {
          boxShadow: "0 10px 24px rgba(15,23,42,0.1)",
          transform: "translateY(-2px)",
        },

        /* status accent */
        borderLeft:
          status === "ok"
            ? "4px solid #16a34a"
            : status === "warn"
            ? "4px solid #f59e0b"
            : "4px solid transparent",
      }}
    >
      <Box>
        <Typography
          variant="caption"
          sx={{ color: "text.secondary", fontWeight: 500 }}
        >
          {label}
        </Typography>

        <Typography
          variant="h5"
          sx={{ fontWeight: 700, mt: 0.5 }}
        >
          {liveTime ? time : value}
        </Typography>
      </Box>

      {status && (
        <Typography
          variant="caption"
          sx={{
            mt: 1,
            fontWeight: 500,
            color:
              status === "ok"
                ? "success.main"
                : "warning.main",
          }}
        >
          {status === "ok" ? "● Active" : "● Needs Check"}
        </Typography>
      )}
    </Paper>
  );
}
