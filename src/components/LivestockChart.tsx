"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Box, Typography } from "@mui/material";
import { TrackedLivestock } from "../lib/useLivestockStore";

interface Props {
  data: TrackedLivestock[];
}

export default function LivestockChart({ data }: Props) {
  const grouped: Record<string, number> = {};

  data.forEach((a) => {
    grouped[a.type] = (grouped[a.type] || 0) + 1;
  });

  const chartData = Object.entries(grouped).map(
    ([type, count]) => ({
      type,
      count,
    })
  );

  return (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Typography
        variant="subtitle2"
        sx={{ mb: 1, fontWeight: 600 }}
      >
        Livestock Distribution
      </Typography>

      <Box sx={{ flex: 1 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
          >
            <XAxis
              dataKey="type"
              tick={{ fontSize: 12, fill: "#374151" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              allowDecimals={false}
              tick={{ fontSize: 12, fill: "#6b7280" }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              cursor={{ fill: "rgba(22,163,74,0.08)" }}
              contentStyle={{
                borderRadius: 8,
                border: "1px solid rgba(15,23,42,0.1)",
                boxShadow:
                  "0 8px 24px rgba(15,23,42,0.12)",
              }}
            />
            <Bar
              dataKey="count"
              radius={[6, 6, 0, 0]}
              fill="#16a34a"
            />
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
}
