"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Button,
  Stack,
  Typography,
  Container,
} from "@mui/material";

import { useLivestockStore } from "../lib/useLivestockStore";
import FarmMap from "../components/FarmMap";
import LiveCard from "../components/LiveCard";
import LivestockChart from "../components/LivestockChart";
import LivestockTable from "../components/LivestockTable";
import Header from "../components/Header";
import DeviceConnect from "../components/DeviceConnect";

export default function Page() {
  const {
    animals,
    alerts,
    uiNow,
    setMode,
    getStatus,
    addAnimal,
    removeAnimal,
  } = useLivestockStore();

  const [mounted, setMounted] = useState(false);
  const [viewMode, setViewMode] = useState<"live" | "history">("live");

  useEffect(() => setMounted(true), []);
  useEffect(() => setMode(viewMode), [viewMode, setMode]);

  if (!mounted) return null;

  const active = animals.filter((a) => getStatus(a) === "Active").length;
  const inactive = animals.length - active;

  return (
    <Box sx={{ height: "calc(100vh - 56px)", display: "flex", flexDirection: "column" }}>
      {/* HEADER */}
      <Box sx={{ px: 2, pt: 1 }}>
        <Header lastUpdated={uiNow} alertCount={alerts.length} />
        <DeviceConnect />
      </Box>

      {/* MAIN SCROLL AREA (ONLY ONE) */}
      <Box sx={{ flex: 1, overflowY: "auto" }}>
        <Container maxWidth="xl" sx={{ py: 2, display: "flex", flexDirection: "column", gap: 2 }}>
          
          {/* KPI */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "1fr 1fr",
                md: "repeat(4, 1fr)",
              },
              gap: 2,
            }}
          >
            <LiveCard label="Total Livestock" value={animals.length} />
            <LiveCard label="Active" value={active} status="ok" />
            <LiveCard label="Needs Inspection" value={inactive} status="warn" />
            <LiveCard label="System Time" liveTime />
          </Box>

          {/* CONTROLS */}
          <Stack direction="row" spacing={1}>
            <Button
              variant={viewMode === "live" ? "contained" : "outlined"}
              size="small"
              onClick={() => setViewMode("live")}
            >
              Live
            </Button>
            <Button
              variant={viewMode === "history" ? "contained" : "outlined"}
              size="small"
              onClick={() => setViewMode("history")}
            >
              History
            </Button>
            <Box sx={{ flexGrow: 1 }} />
            <Button size="small" variant="outlined" onClick={() => addAnimal("Cow", "A")}>
              + Add Animal
            </Button>
          </Stack>

          {/* MONITORING */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", lg: "2fr 1fr" },
              gap: 2,
            }}
          >
            <Paper sx={{ p: 2, height: 360, overflow: "hidden" }}>
              <FarmMap
                animals={animals}
                mode={viewMode}
                getStatus={getStatus}
                onRemove={removeAnimal}
              />
            </Paper>

            <Stack spacing={2}>
              <Paper sx={{ p: 2, height: 200 }}>
                <LivestockChart data={animals} />
              </Paper>

              <Paper sx={{ p: 2 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Alerts
                </Typography>
                {alerts.length === 0 ? (
                  <Typography variant="body2" color="text.secondary">
                    All systems normal
                  </Typography>
                ) : (
                  alerts.map((a) => (
                    <Typography key={a.id} variant="body2" color="warning.main">
                      ⚠ {a.type} #{a.id} inactive
                    </Typography>
                  ))
                )}
              </Paper>
            </Stack>
          </Box>

          {/* TABLE (NO INTERNAL SCROLL) */}
          <Paper sx={{ p: 2 }}>
            <LivestockTable
              animals={animals}
              getStatus={getStatus}
              onRemove={removeAnimal}
            />
          </Paper>

        </Container>
      </Box>
    </Box>
  );
}
