import React from "react";

interface Props {
  onSelect: (seconds: number) => void;
}

const TestDurationSelector: React.FC<Props> = ({ onSelect }) => {
  return (
    <div className="flex gap-3 mt-6">
      {[15, 30, 60].map((time) => (
        <button
          key={time}
          onClick={() => onSelect(time)}
          className="px-4 py-2 bg-[#5C8374] text-white rounded hover:bg-[#3e5c5c] transition"
        >
          {time}s
        </button>
      ))}
    </div>
  );
};

export default TestDurationSelector;
