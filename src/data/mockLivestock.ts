// src/data/mockLivestock.ts

import type { Livestock } from "../types/livestock";

export const livestockData: Livestock[] = [
  {
    id: 1,
    type: "Cow",
    zone: "A",
    status: "Active",
    weight: 420,
  },
  {
    id: 2,
    type: "Cow",
    zone: "A",
    status: "Needs Check",
    weight: 410,
  },
  {
    id: 3,
    type: "Goat",
    zone: "B",
    status: "Active",
    weight: 55,
  },
  {
    id: 4,
    type: "Cow",
    zone: "C",
    status: "Active",
    weight: 460,
  },
  {
    id: 5,
    type: "Goat",
    zone: "C",
    status: "Needs Check",
    weight: 50,
  },
];
