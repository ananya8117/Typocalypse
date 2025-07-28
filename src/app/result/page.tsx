"use client";

import { useEffect, useState } from "react";
import { FaRedo, FaHistory, FaHome } from "react-icons/fa";
import Link from "next/link";

const ResultPage = () => {
  const [results, setResults] = useState<{
    wpm: number;
    correctWords: number;
    errorCount: number;
    accuracy: number;
  }>({
    wpm: 0,
    correctWords: 0,
    errorCount: 0,
    accuracy: 0,
  });

  useEffect(() => {
    const stored = localStorage.getItem("typingResults");
    if (stored) setResults(JSON.parse(stored));
  }, []);

  const message =
    results.wpm > 60
      ? "🔥 Incredible! Your fingers are on fire!"
      : results.wpm > 40
      ? "⚡ Great job! You're fast and accurate."
      : results.wpm >= 30
      ? "💪 Nice! You're improving steadily."
      : results.wpm >= 20
      ? "👍 Good effort! Keep practicing."
      : results.wpm > 0
      ? "⌨️ Getting started! Stay consistent."
      : "😕 Oops! Try again to see your speed.";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#183D3D] text-[#93B1A6] p-8">
      <div className="absolute top-5 left-5">
        <Link href="/" className="inline-flex items-center gap-2 px-4 py-2 bg-[#5C8374] text-white rounded-full transition-transform duration-200 hover:bg-[#3e5c5c] hover:scale-105 shadow">
          <FaHome /> Home
        </Link>
      </div>
      <h1 className="text-5xl font-extrabold text-center mb-6">Your Results</h1><br />
      <div className="bg-[#272727] text-white text-lg text-center rounded-xl shadow-lg px-8 py-6 max-w-xl mb-8">
        <p>{message}</p>
      </div><br />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {[{ label: "WPM", value: results.wpm },
          { label: "Correct Words", value: results.correctWords },
          { label: "Errors", value: results.errorCount },
          { label: "Accuracy", value: `${results.accuracy}%` }].map((stat, i) => (
          <div
            key={i}
            className="bg-[#5C8374] rounded-xl p-6 text-center shadow-md w-52 hover:scale-105 transition-all duration-200"
          >
            <p className="text-3xl font-bold text-white mb-2">{stat.value}</p>
            <p className="text-lg text-[#e2e8f0]">{stat.label}</p>
          </div>
        ))}
      </div>
      <div className="flex gap-6">
        <Link
        href="/speed"
        className="flex items-center justify-center gap-2 px-6 py-3 bg-teal-700 text-white rounded-full hover:bg-teal-600 hover:scale-105 transition-transform w-48 text-center"
        >
        <FaRedo /> Try Again
        </Link>

        <Link
        href="/history"
        className="flex items-center justify-center gap-2 px-6 py-3 bg-teal-700 text-white rounded-full hover:bg-[#3e5c5c] hover:scale-105 transition-transform w-48 text-center"
        >
        <FaHistory /> View History
        </Link>
      </div>
    </div>
  );
};

export default ResultPage;
