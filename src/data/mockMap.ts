export interface MapLivestock {
  id: number;
  x: number;
  y: number;
  type: string;
}

export const zones = [
  { id: "A", x: 20, y: 20, width: 200, height: 150 },
  { id: "B", x: 250, y: 20, width: 200, height: 150 },
  { id: "C", x: 20, y: 200, width: 430, height: 150 }
];

export const mapLivestock: MapLivestock[] = [
  { id: 1, x: 80, y: 80, type: "Cow" },
  { id: 2, x: 130, y: 120, type: "Cow" },
  { id: 3, x: 300, y: 90, type: "Pig" },
  { id: 4, x: 340, y: 120, type: "Pig" },
  { id: 5, x: 100, y: 260, type: "Chicken" },
  { id: 6, x: 180, y: 290, type: "Chicken" },
  { id: 7, x: 300, y: 260, type: "Goat" }
];
