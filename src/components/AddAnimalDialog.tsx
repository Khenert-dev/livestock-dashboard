"use client";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  MenuItem,
  TextField,
  Stack,
  Typography,
  Chip,
} from "@mui/material";
import { useState } from "react";

type AnimalType = "Cow" | "Goat" | "Sheep";
type Zone = "A" | "B" | "C";

interface Props {
  open: boolean;
  onClose: () => void;
  onConfirm: (type: AnimalType, zone: Zone) => void;
}

export default function AddAnimalDialog({
  open,
  onClose,
  onConfirm,
}: Props) {
  const [type, setType] = useState<AnimalType>("Cow");
  const [zone, setZone] = useState<Zone>("A");
  const [busy, setBusy] = useState(false);

  function handleAdd() {
    setBusy(true);
    setTimeout(() => {
      onConfirm(type, zone);
      setBusy(false);
      onClose();
    }, 1200); // simulated device handshake
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>Add Livestock</DialogTitle>

      <DialogContent>
        <Stack spacing={2} mt={1}>
          <Typography variant="body2" color="text.secondary">
            New livestock will be registered as a simulated device.
          </Typography>

          <TextField
            label="Animal Type"
            select
            value={type}
            onChange={(e) => setType(e.target.value as AnimalType)}
            fullWidth
          >
            <MenuItem value="Cow">Cow</MenuItem>
            <MenuItem value="Goat">Goat</MenuItem>
            <MenuItem value="Sheep">Sheep</MenuItem>
          </TextField>

          <TextField
            label="Zone Assignment"
            select
            value={zone}
            onChange={(e) => setZone(e.target.value as Zone)}
            fullWidth
          >
            <MenuItem value="A">Zone A</MenuItem>
            <MenuItem value="B">Zone B</MenuItem>
            <MenuItem value="C">Zone C</MenuItem>
          </TextField>

          <Stack direction="row" spacing={1}>
            <Chip label="Simulated ESP32" size="small" />
            <Chip label="Auto ID" size="small" />
          </Stack>
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} disabled={busy}>
          Cancel
        </Button>
        <Button
          onClick={handleAdd}
          variant="contained"
          disabled={busy}
        >
          {busy ? "Connecting…" : "Add Animal"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
