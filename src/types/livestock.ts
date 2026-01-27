// src/types/livestock.ts

export type LivestockStatus = "Active" | "Needs Check";

export type LivestockZone = "A" | "B" | "C";

export interface Livestock {
  id: number;
  type: string;
  zone: LivestockZone;
  status: LivestockStatus;
  weight: number;
}
