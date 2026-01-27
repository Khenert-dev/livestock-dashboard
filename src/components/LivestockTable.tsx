"use client";

import { livestockData } from "../data/mockLivestock";

export default function LivestockTable() {
  return (
    <div className="table-responsive">
      <table className="table table-hover align-middle">
        <thead className="table-light">
          <tr>
            <th>ID</th>
            <th>Type</th>
            <th>Zone</th>
            <th>Status</th>
            <th>Weight (kg)</th>
          </tr>
        </thead>

        <tbody>
          {livestockData.map((animal) => (
            <tr key={animal.id}>
              <td>{animal.id}</td>
              <td>{animal.type}</td>
              <td>{animal.zone}</td>

              <td>
                <span
                  className={`badge ${
                    animal.status === "Active"
                      ? "bg-success"
                      : "bg-warning text-dark"
                  }`}
                >
                  {animal.status}
                </span>
              </td>

              <td>{animal.weight}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
