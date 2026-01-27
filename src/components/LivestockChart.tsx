"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

import { Livestock } from "../types/livestock";

interface Props {
  data: Livestock[];
}

export default function LivestockChart({ data }: Props) {
  const grouped: Record<string, number> = {};

  data.forEach(item => {
    grouped[item.type] = (grouped[item.type] || 0) + 1;
  });

  const chartData = Object.keys(grouped).map(type => ({
    type,
    count: grouped[type]
  }));

  return (
    <div className="chart">
      <h2>Livestock Distribution</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <XAxis dataKey="type" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#16a34a" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
