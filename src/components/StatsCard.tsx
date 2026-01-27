interface Props {
  title: string;
  value: string | number;
}

export default function StatsCard({ title, value }: Props) {
  return (
    <div className="card">
      <h3>{title}</h3>
      <p>{value}</p>
    </div>
  );
}
