"use client";

import Header from "../components/Header";
import StatsCard from "../components/StatsCard";
import LivestockChart from "../components/LivestockChart";
import FarmMap from "../components/FarmMap";
import { livestockData } from "../data/mockLivestock";

export default function Home() {
  const total = livestockData.length;
  const healthy = livestockData.filter(l => l.status === "Healthy").length;
  const sick = livestockData.filter(l => l.status === "Sick").length;

  const avgWeight =
    livestockData.reduce((sum, l) => sum + l.weight, 0) / total;

  return (
    <main className="container">
      <Header />

      <section className="stats">
        <StatsCard title="Total Livestock" value={total} />
        <StatsCard title="Healthy" value={healthy} />
        <StatsCard title="Sick" value={sick} />
        <StatsCard
          title="Average Weight (kg)"
          value={avgWeight.toFixed(1)}
        />
      </section>

      <LivestockChart data={livestockData} />

      <FarmMap />
    </main>
  );
}
