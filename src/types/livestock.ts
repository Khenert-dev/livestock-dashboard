export type LivestockStatus = "Active" | "Check";

export interface Livestock {
  id: number;
  type: string;
  status: LivestockStatus;
  weight: number;
  zone: "A" | "B" | "C";
}
