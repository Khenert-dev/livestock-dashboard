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
  lastSeenAt: number;
  history: HistoryPoint[];
}

const WARN_THRESHOLD = 20000;
const HISTORY_LIMIT = 120;
const STORAGE_KEY = "farmcare-livestock";

const ZONES: Record<ZoneId, { x: number; y: number; w: number; h: number }> = {
  A: { x: 40, y: 40, w: 180, h: 110 },
  B: { x: 260, y: 40, w: 180, h: 110 },
  C: { x: 40, y: 170, w: 400, h: 110 },
};

export function useLivestockStore() {
  const [animals, setAnimals] = useState<TrackedLivestock[]>([]);
  const [uiNow, setUiNow] = useState(Date.now());
  const mode = useRef<"live" | "history">("live");

  /* LOAD FROM STORAGE OR INIT */
  useEffect(() => {
    const cached = localStorage.getItem(STORAGE_KEY);
    if (cached) {
      setAnimals(JSON.parse(cached));
      return;
    }

    const initial = livestockData.map((a) => {
      const zone = (a.zone ?? "A") as ZoneId;
      const z = ZONES[zone];
      const x = z.x + Math.random() * z.w;
      const y = z.y + Math.random() * z.h;
      const now = Date.now();

      return {
        ...a,
        zone,
        x,
        y,
        lastMovedAt: now,
        lastSeenAt: now,
        history: [{ x, y, time: now }],
      };
    });

    setAnimals(initial);
  }, []);

  /* PERSIST */
  useEffect(() => {
    if (animals.length) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(animals));
    }
  }, [animals]);

  /* UI CLOCK */
  useEffect(() => {
    const t = setInterval(() => setUiNow(Date.now()), 3000);
    return () => clearInterval(t);
  }, []);

  /* SIMULATION */
  useEffect(() => {
    const t = setInterval(() => {
      if (mode.current === "history") return;

      setAnimals((prev) =>
        prev.map((a) => {
          const moved = Math.random() > 0.6;
          const z = ZONES[a.zone as ZoneId];

          const x = moved
            ? Math.min(Math.max(a.x + (Math.random() * 6 - 3), z.x), z.x + z.w)
            : a.x;

          const y = moved
            ? Math.min(Math.max(a.y + (Math.random() * 6 - 3), z.y), z.y + z.h)
            : a.y;

          const now = Date.now();

          return {
            ...a,
            x,
            y,
            lastMovedAt: moved ? now : a.lastMovedAt,
            lastSeenAt: now,
            history: moved
              ? [...a.history, { x, y, time: now }].slice(-HISTORY_LIMIT)
              : a.history,
          };
        })
      );
    }, 1000);

    return () => clearInterval(t);
  }, []);

  function setMode(m: "live" | "history") {
    mode.current = m;
  }

  function getStatus(a: TrackedLivestock): Status {
    return uiNow - a.lastSeenAt > WARN_THRESHOLD
      ? "Needs Inspection"
      : "Active";
  }

  function addAnimal(type: Livestock["type"], zone: ZoneId) {
    const z = ZONES[zone];
    const x = z.x + 20;
    const y = z.y + 20;
    const now = Date.now();

    setAnimals((a) => [
      ...a,
      {
        id: now,
        type,
        zone,
        weight: 0,
        status: "Active",
        x,
        y,
        lastMovedAt: now,
        lastSeenAt: now,
        history: [{ x, y, time: now }],
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
