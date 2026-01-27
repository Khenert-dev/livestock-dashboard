export type LivestockStatus = "Active" | "Needs Check";

export interface Livestock {
  id: number;
  type: string;
  zone: "A" | "B" | "C";
  weight: number;
  status: LivestockStatus;
}
