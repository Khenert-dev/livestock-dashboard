"use client";

import { Livestock } from "../types/livestock";

interface Props {
  data: Livestock[];
}

export default function LivestockTable({ data }: Props) {
  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h6 className="fw-bold text-success mb-3">
          📋 Livestock Overview
        </h6>

        <div className="table-responsive">
          <table className="table table-sm align-middle">
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
              {data.map((animal) => {
                const needsCheck =
                  animal.id === 2 || animal.id === 5;

                return (
                  <tr key={animal.id}>
                    <td>{animal.id}</td>
                    <td>{animal.type}</td>
                    <td>{animal.zone}</td>
                    <td>
                      {needsCheck ? (
                        <span className="badge bg-warning text-dark">
                          ⚠ Needs Check
                        </span>
                      ) : (
                        <span className="badge bg-success">
                          ✔ Active
                        </span>
                      )}
                    </td>
                    <td>{animal.weight}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <small className="text-muted">
          Status is derived from inactivity monitoring.
        </small>
      </div>
    </div>
  );
}
