"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { TrackedLivestock } from "../lib/useLivestockStore";

export default function LivestockChart({ data }: { data: TrackedLivestock[] }) {
  const grouped: Record<string, number> = {};
  data.forEach((a) => (grouped[a.type] = (grouped[a.type] || 0) + 1));

  const chartData = Object.entries(grouped).map(([type, count]) => ({
    type,
    count,
  }));

  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={chartData}>
        <XAxis dataKey="type" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Bar dataKey="count" fill="#16a34a" />
      </BarChart>
    </ResponsiveContainer>
  );
}
