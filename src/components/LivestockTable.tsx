"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { TrackedLivestock } from "../lib/useLivestockStore";

interface Props {
  animals: TrackedLivestock[];
  getStatus: (a: TrackedLivestock) => "Active" | "Needs Inspection";
  onRemove: (id: number) => void;
}

export default function LivestockTable({
  animals,
  getStatus,
  onRemove,
}: Props) {
  const [selected, setSelected] = useState<TrackedLivestock | null>(null);

  return (
    <>
      <TableContainer
        sx={{
          maxHeight: 320,
          borderRadius: 2,
          border: "1px solid rgba(15,23,42,0.06)",
          position: "relative",
          zIndex: 2,
          backgroundColor: "#fff",
        }}
      >
        <Table stickyHeader size="small">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 600 }}>ID</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Type</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Zone</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 600 }} align="right">
                Action
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {animals.map((a) => {
              const status = getStatus(a);

              return (
                <TableRow
                  key={a.id}
                  hover
                  sx={{
                    "&:hover": {
                      backgroundColor: "rgba(15,23,42,0.03)",
                    },
                  }}
                >
                  <TableCell>{a.id}</TableCell>
                  <TableCell>{a.type}</TableCell>
                  <TableCell>{a.zone}</TableCell>
                  <TableCell>
                    <Chip
                      size="small"
                      label={status}
                      color={
                        status === "Active" ? "success" : "warning"
                      }
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => setSelected(a)}
                    >
                      <DeleteOutlineIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      {/* CONFIRM DIALOG */}
      <Dialog
        open={!!selected}
        onClose={() => setSelected(null)}
      >
        <DialogTitle>Remove Livestock</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to remove livestock{" "}
            <strong>#{selected?.id}</strong>?  
            This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setSelected(null)}
          >
            Cancel
          </Button>
          <Button
            color="error"
            variant="contained"
            onClick={() => {
              if (selected) {
                onRemove(selected.id);
                setSelected(null);
              }
            }}
          >
            Remove
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
