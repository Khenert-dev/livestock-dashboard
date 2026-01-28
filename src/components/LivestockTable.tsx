"use client";

import { TrackedLivestock } from "../lib/useLivestockStore";

export default function LivestockTable({
  animals,
  getStatus,
}: {
  animals: TrackedLivestock[];
  getStatus: (a: TrackedLivestock) => string;
}) {
  return (
    <div className="table-responsive">
      <table className="table table-sm align-middle">
        <thead>
          <tr>
            <th>ID</th>
            <th>Type</th>
            <th>Zone</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {animals.map((a) => (
            <tr key={a.id}>
              <td>{a.id}</td>
              <td>{a.type}</td>
              <td>{a.zone}</td>
              <td>
                <span
                  className={`badge ${
                    getStatus(a) === "Active"
                      ? "bg-success"
                      : "bg-warning text-dark"
                  }`}
                >
                  {getStatus(a)}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
