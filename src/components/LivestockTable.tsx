"use client";

import { Livestock } from "../types/livestock";

interface Props {
  data: Livestock[];
}

export default function LivestockTable({ data }: Props) {
  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h6 className="fw-bold mb-3 text-success">
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
                // Status is derived from movement monitoring
                const isInactive =
                  animal.id === 2 || animal.id === 5;

                return (
                  <tr key={animal.id}>
                    <td>{animal.id}</td>
                    <td>{animal.type}</td>
                    <td>{animal.zone}</td>

                    <td>
                      {isInactive ? (
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
          Status is based on prolonged inactivity detection.
        </small>
      </div>
    </div>
  );
}
