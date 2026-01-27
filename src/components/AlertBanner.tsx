interface Props {
  sickCount: number;
}

export default function AlertBanner({ sickCount }: Props) {
  if (sickCount === 0) return null;

  return (
    <div className="alert">
      ⚠️ ALERT: {sickCount} livestock need attention
    </div>
  );
}
