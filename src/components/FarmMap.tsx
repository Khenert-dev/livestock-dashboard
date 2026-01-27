import { zones, mapLivestock } from "../data/mockMap";

const colors: Record<string, string> = {
  Cow: "#16a34a",
  Pig: "#ea580c",
  Chicken: "#ca8a04",
  Goat: "#2563eb"
};

export default function FarmMap() {
  return (
    <div className="map">
      <h2>Farm Map (Mock)</h2>

      <svg width="480" height="380">
        {/* Zones */}
        {zones.map(zone => (
          <g key={zone.id}>
            <rect
              x={zone.x}
              y={zone.y}
              width={zone.width}
              height={zone.height}
              fill="#e5e7eb"
              stroke="#111"
              strokeWidth="2"
            />
            <text
              x={zone.x + 10}
              y={zone.y + 20}
              fontSize="14"
              fontWeight="bold"
            >
              Zone {zone.id}
            </text>
          </g>
        ))}

        {/* Livestock */}
        {mapLivestock.map(animal => (
          <circle
            key={animal.id}
            cx={animal.x}
            cy={animal.y}
            r="8"
            fill={colors[animal.type]}
          />
        ))}
      </svg>

      {/* Legend */}
      <div className="legend">
        <span><b style={{ color: colors.Cow }}>●</b> Cow</span>
        <span><b style={{ color: colors.Pig }}>●</b> Pig</span>
        <span><b style={{ color: colors.Chicken }}>●</b> Chicken</span>
        <span><b style={{ color: colors.Goat }}>●</b> Goat</span>
      </div>
    </div>
  );
}
