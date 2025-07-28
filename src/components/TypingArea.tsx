"use client";

import React from "react";

interface TypingAreaProps {
  text: string;
  setText: (value: string) => void;
  sampleText: string;
}

const TypingArea: React.FC<TypingAreaProps> = ({ text, setText, sampleText }) => {
  const getHighlightedText = () =>
    sampleText.split("").map((char, idx) => {
      let className = "text-black";
      if (text[idx] === char) className = "text-green-600 font-bold";
      else if (text[idx] !== undefined) className = "text-red-600 font-bold";
      return <span key={idx} className={className}>{char}</span>;
    });

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="text-lg bg-[#93B1A6] p-3 rounded-lg max-w-3xl leading-relaxed whitespace-pre-wrap break-words text-center">
        {getHighlightedText()}
      </div>
      <textarea
        className="w-full max-w-xl h-36 p-3 rounded-xl border-2 border-[#5C8374] text-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#5C8374]"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type to start..."
        rows={5}
      />
    </div>
  );
};

export default TypingArea;
