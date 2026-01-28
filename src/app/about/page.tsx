"use client";

import { Box, Container, Paper, Typography, Stack } from "@mui/material";

export default function AboutPage() {
  return (
    <Box
      sx={{
        height: "calc(100vh - 56px)",
        overflowY: "auto",
        background:
          "linear-gradient(180deg, rgba(240,253,244,0.6), rgba(243,247,245,1))",
      }}
    >
      <Container
        maxWidth="md"
        sx={{
          py: 4,
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        {/* TITLE */}
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            color: "primary.main",
            letterSpacing: "-0.02em",
          }}
        >
          About FarmCare
        </Typography>

        {/* INTRO */}
        <Paper sx={{ p: 3 }}>
          <Typography variant="body1" color="text.secondary">
            FarmCare is a prototype livestock monitoring dashboard designed to
            support real-time and historical awareness of animal movement in
            agricultural environments. The system prioritizes clarity,
            usability, and safe decision-making for non-technical users.
          </Typography>
        </Paper>

        {/* TARGET USERS */}
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Target Users
          </Typography>

          <Stack spacing={1}>
            <Typography variant="body2">
              • Farm operators and supervisors
            </Typography>
            <Typography variant="body2">
              • Non-technical users with minimal training
            </Typography>
            <Typography variant="body2">
              • Desktop-first, mobile-supported environments
            </Typography>
          </Stack>
        </Paper>

        {/* SYSTEM CAPABILITIES */}
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            System Capabilities
          </Typography>

          <Stack spacing={1}>
            <Typography variant="body2">
              • Live livestock movement visualization
            </Typography>
            <Typography variant="body2">
              • Historical activity analysis and movement paths
            </Typography>
            <Typography variant="body2">
              • Automated inactivity detection and alerts
            </Typography>
            <Typography variant="body2">
              • Status-based monitoring for quick decisions
            </Typography>
          </Stack>
        </Paper>

        {/* ETHICS & PRIVACY */}
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Ethics & Privacy
          </Typography>

          <Typography variant="body2" color="text.secondary">
            This system does not collect biometric, medical, or personally
            identifiable information. All displayed data is simulated and used
            exclusively for academic and development purposes, with ethical
            system design as a core principle.
          </Typography>
        </Paper>

        {/* SCALABILITY */}
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Scalability
          </Typography>

          <Typography variant="body2" color="text.secondary">
            FarmCare is designed to scale beyond its prototype stage. Future
            versions may integrate real sensor hardware, cloud-based data
            storage, analytics pipelines, and automated alerting services while
            maintaining user trust and system safety.
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
}
