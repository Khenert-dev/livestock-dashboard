"use client";

import { useEffect, useRef, useState } from "react";
import { livestockData } from "../data/mockLivestock";
import { Livestock } from "../types/livestock";

export type ZoneId = "A" | "B" | "C";
export type Status = "Active" | "Needs Inspection";

export interface HistoryPoint {
  x: number;
  y: number;
  time: number;
}

export interface TrackedLivestock extends Livestock {
  x: number;
  y: number;
  lastMovedAt: number;
  history: HistoryPoint[];
}

const CHECK_THRESHOLD = 15000;
const HISTORY_LIMIT = 60;

const ZONES: Record<ZoneId, { x: number; y: number; w: number; h: number }> = {
  A: { x: 20, y: 20, w: 200, h: 120 },
  B: { x: 240, y: 20, w: 200, h: 120 },
  C: { x: 20, y: 160, w: 420, h: 120 },
};

export function useLivestockStore() {
  const [animals, setAnimals] = useState<TrackedLivestock[]>([]);
  const [uiNow, setUiNow] = useState(Date.now());
  const mode = useRef<"live" | "history">("live");

  /* INIT */
  useEffect(() => {
    setAnimals(
      livestockData.map((a) => {
        const zone = (a.zone ?? "A") as ZoneId;
        const z = ZONES[zone];
        const x = z.x + 30 + Math.random() * (z.w - 60);
        const y = z.y + 30 + Math.random() * (z.h - 60);

        return {
          ...a,
          zone,
          x,
          y,
          lastMovedAt: Date.now(),
          history: [{ x, y, time: Date.now() }],
        };
      })
    );
  }, []);

  /* UI CLOCK (slow, stable) */
  useEffect(() => {
    const i = setInterval(() => setUiNow(Date.now()), 3000);
    return () => clearInterval(i);
  }, []);

  /* SIMULATION CLOCK (fast, isolated) */
  useEffect(() => {
    const i = setInterval(() => {
      if (mode.current === "history") return;

      setAnimals((prev) =>
        prev.map((a) => {
          if (Math.random() < 0.5) return a;

          const z = ZONES[a.zone as ZoneId];
          const x = Math.min(
            Math.max(a.x + (Math.random() * 4 - 2), z.x + 12),
            z.x + z.w - 12
          );
          const y = Math.min(
            Math.max(a.y + (Math.random() * 4 - 2), z.y + 12),
            z.y + z.h - 12
          );

          return {
            ...a,
            x,
            y,
            lastMovedAt: Date.now(),
            history: [...a.history, { x, y, time: Date.now() }].slice(
              -HISTORY_LIMIT
            ),
          };
        })
      );
    }, 1000);

    return () => clearInterval(i);
  }, []);

  function setMode(m: "live" | "history") {
    mode.current = m;
  }

  function getStatus(a: TrackedLivestock): Status {
    return uiNow - a.lastMovedAt > CHECK_THRESHOLD
      ? "Needs Inspection"
      : "Active";
  }

  function addAnimal(type: Livestock["type"], zone: ZoneId) {
    const z = ZONES[zone];
    const x = z.x + 40;
    const y = z.y + 40;

    setAnimals((a) => [
      ...a,
      {
        id: Date.now(),
        type,
        zone,
        weight: 0,
        status: "Active",
        x,
        y,
        lastMovedAt: Date.now(),
        history: [{ x, y, time: Date.now() }],
      },
    ]);
  }

  function removeAnimal(id: number) {
    setAnimals((a) => a.filter((x) => x.id !== id));
  }

  const alerts = animals.filter(
    (a) => getStatus(a) === "Needs Inspection"
  );

  return {
    animals,
    alerts,
    uiNow,
    setMode,
    getStatus,
    addAnimal,
    removeAnimal,
  };
}
