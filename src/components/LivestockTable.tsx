import { Livestock } from "../types/livestock";

interface Props {
  data: Livestock[];
}

export default function LivestockTable({ data }: Props) {
  return (
    <div className="table">
      <h2>Livestock Data</h2>

      <table>
        <thead>
          <tr>
            <th>Type</th>
            <th>Status</th>
            <th>Weight (kg)</th>
            <th>Zone</th>
          </tr>
        </thead>

        <tbody>
          {data.map(animal => (
            <tr key={animal.id}>
              <td>{animal.type}</td>
              <td className={animal.status === "Healthy" ? "ok" : "bad"}>
                {animal.status}
              </td>
              <td>{animal.weight}</td>
              <td>Zone {animal.zone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
