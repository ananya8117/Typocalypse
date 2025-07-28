"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FaHome, FaTrash } from "react-icons/fa";

interface Entry {
  wpm: number;
  accuracy: number;
  errorCount: number;
  correctWords: number;
  date: string;
}

export default function HistoryPage() {
  const [history, setHistory] = useState<Entry[]>([]);

  useEffect(() => {
    const data = localStorage.getItem("history");
    if (data) setHistory(JSON.parse(data));
  }, []);

  const deleteEntry = (index: number) => {
    const confirmed = confirm("Delete this entry?");
    if (!confirmed) return;

    const updated = [...history];
    updated.splice(index, 1);
    setHistory(updated);
    localStorage.setItem("history", JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen bg-[#183D3D] text-[#93B1A6] p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-5xl font-extrabold text-center w-full">History</h1>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#5C8374] text-white rounded-full transition-transform duration-200 hover:bg-[#3e5c5c] hover:scale-105 shadow"
        >
          <FaHome /> Home
        </Link>
      </div>

      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full bg-[#2a4a4a] border border-gray-600">
          <thead>
            <tr className="bg-[#5C8374] text-white">
              <th className="py-3 px-6">Date</th>
              <th className="py-3 px-6">WPM</th>
              <th className="py-3 px-6">Accuracy</th>
              <th className="py-3 px-6">Errors</th>
              <th className="py-3 px-6">Actions</th>
            </tr>
          </thead>
          <tbody>
            {history.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-6 text-gray-300">No history found.</td>
              </tr>
            ) : (
              history.map((entry, index) => (
                <tr key={index} className="border-t border-gray-700 hover:bg-[#345353] text-center">
                  <td className="py-3 px-6">{new Date(entry.date).toLocaleString()}</td>
                  <td className="py-3 px-6">{entry.wpm}</td>
                  <td className="py-3 px-6">{entry.accuracy}%</td>
                  <td className="py-3 px-6">{entry.errorCount}</td>
                  <td className="py-3 px-6">
                    <div className="flex justify-center">
                        <button
                        onClick={() => deleteEntry(index)}
                        className="flex items-center gap-1 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-500 transition"
                        >
                        <FaTrash className="text-sm" /> Delete
                        </button>
                    </div>
                    </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
