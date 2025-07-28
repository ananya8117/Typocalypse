interface Props {
  wpm: number;
  accuracy: number;
  errors: number;
}

export default function StatsPanel({ wpm, accuracy, errors }: Props) {
  return (
    <div className="flex justify-center gap-8 mt-5 flex-wrap">
      <Stat label="WPM" value={wpm} />
      <Stat label="Accuracy" value={`${accuracy}%`} />
      <Stat label="Errors" value={errors} />
    </div>
  );
}

const Stat = ({ label, value }: { label: string; value: number | string }) => (
  <div className="bg-[#5C8374] rounded-lg p-6 text-center shadow-md w-44">
    <h3 className="text-xl font-semibold">{label}</h3>
    <p className="text-2xl font-bold">{value}</p>
  </div>
);
