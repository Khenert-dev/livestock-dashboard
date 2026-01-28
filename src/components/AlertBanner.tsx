"use client";

import { Alert, AlertTitle } from "@mui/material";

interface Props {
  sickCount: number;
}

export default function AlertBanner({ sickCount }: Props) {
  if (sickCount === 0) return null;

  return (
    <Alert
      severity="warning"
      sx={{
        mb: 2,
        borderRadius: 2,
        border: "1px solid rgba(245,158,11,0.4)",
        backgroundColor: "rgba(254,243,199,0.8)",
      }}
    >
      <AlertTitle sx={{ fontWeight: 600 }}>
        Attention Required
      </AlertTitle>
      {sickCount} livestock require inspection due to inactivity or abnormal behavior.
    </Alert>
  );
}
