export type LivestockStatus = "Healthy" | "Sick";

export interface Livestock {
  id: number;
  type: string;
  status: LivestockStatus;
  weight: number;
}
