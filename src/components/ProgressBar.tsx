interface Props {
  timeLeft: number;
  totalTime: number;
}

export default function ProgressBar({ timeLeft, totalTime }: Props) {
  const progress = ((totalTime - timeLeft) / totalTime) * 100;
  return (
    <div className="w-full max-w-xl bg-gray-300 h-4 rounded-full mb-5">
      <div
        className="bg-[#5C8374] h-full rounded-full transition-all"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
