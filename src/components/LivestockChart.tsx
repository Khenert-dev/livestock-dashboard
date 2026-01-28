"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { Livestock } from "../types/livestock";

interface Props {
  data: Livestock[];
}

export default function LivestockChart({ data }: Props) {
  const grouped: Record<string, number> = {};

  data.forEach((item) => {
    grouped[item.type] = (grouped[item.type] || 0) + 1;
  });

  const chartData = Object.entries(grouped).map(([type, count]) => ({
    type,
    count,
  }));

  return (
    <div
      className="w-100 d-flex flex-column"
      style={{
        height: 260,          // 🔒 fixed height
        maxHeight: 260,
        overflow: "hidden",  // 🔒 prevent bleed
        position: "relative",
        zIndex: 0,            // 🔒 always below popups
      }}
    >
      <h6 className="fw-semibold text-success mb-2 flex-shrink-0">
        Livestock Distribution
      </h6>

      <div style={{ flex: 1 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <XAxis dataKey="type" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="count" fill="#16a34a" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
