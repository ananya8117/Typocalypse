import Link from "next/link";
import { FaKeyboard, FaHistory, FaPlay } from "react-icons/fa";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-[#82ad9e] text-[#183D3D] px-6 py-12">
      <div className="w-full max-w-4xl bg-[#183D3D] text-[#9bb4ab] rounded-3xl shadow-2xl px-10 py-12 flex flex-col items-center text-center">
        <FaKeyboard className="text-6xl mb-6 text-white animate-pulse drop-shadow-lg" />
        <h1 className="text-5xl font-extrabold tracking-wide leading-tight mb-4">
          Typocalypse - Test Your Typing Skills
        </h1>
        <p className="text-lg max-w-xl text-[#e2e8f0] mb-8">
          Boost your speed and accuracy with real-time stats, history tracking, and a modern interface designed to motivate improvement.
        </p>

        <div className="mt-4 flex flex-wrap justify-center gap-6">
          <Link
            href="/speed"
            className="flex items-center gap-3 border-2 border-white text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-[#3e5c5c] hover:scale-105 transition-transform"
          >
            <FaPlay className="text-md" /> Start Test
          </Link>

          <Link
            href="/history"
            className="flex items-center gap-3 border-2 border-white text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-[#3e5c5c] hover:scale-105 transition-transform"
          >
            <FaHistory className="text-md" /> View History
          </Link>
        </div>
      </div>
    </main>
  );
}
