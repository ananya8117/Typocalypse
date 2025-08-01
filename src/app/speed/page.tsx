"use client";

import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import TypingArea from "@/components/TypingArea";
import Timer from "@/components/Timer";
import ProgressBar from "@/components/ProgressBar";
import TestDurationSelector from "@/components/TestDurationSelector";
import { calculateWPM, calculateAccuracy, calculateErrors } from "@/utils/calculations";
import { saveResultToHistory } from "@/utils/storage";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaHome } from "react-icons/fa";

export default function SpeedPage() {
  const [sampleText, setSampleText] = useState("Loading...");
  const [userText, setUserText] = useState("");
  const [time, setTime] = useState(60);
  const [totalTime, setTotalTime] = useState(60);
  const [isRunning, setIsRunning] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);
  const router = useRouter();

  const fetchText = useCallback(async () => {
    try {
      const response = await axios.get("https://baconipsum.com/api/?type=meat-and-filler&paras=1");
      setSampleText(response.data[0]);
    } catch {
      setSampleText("Error loading sample text.");
    }
  }, []);

  useEffect(() => {
    fetchText();
  }, [fetchText]);

  useEffect(() => {
    if (!isRunning || time <= 0) return;
    const timer = setTimeout(() => setTime((t) => t - 1), 1000);
    return () => clearTimeout(timer);
  }, [isRunning, time]);

  useEffect(() => {
    if (time === 0 && isRunning && !hasFinished) {
      finishTest();
    }
  }, [time, isRunning, hasFinished]);

  const startTyping = () => {
    if (!isRunning) {
      setIsRunning(true);
      setHasStarted(true);
    }
  };

  const finishTest = () => {
    if (hasFinished || !hasStarted) return;

    setHasFinished(true);
    setIsRunning(false);

    const { wpm, correctWords } = calculateWPM(userText, sampleText, totalTime);
    const accuracy = calculateAccuracy(userText, sampleText);
    const errors = calculateErrors(userText, sampleText);

    const result = { wpm, correctWords, accuracy, errorCount: errors };
    saveResultToHistory(result);
    localStorage.setItem("typingResults", JSON.stringify(result));
    router.push("/result");
  };

  const reset = () => {
    setUserText("");
    setTime(totalTime);
    setIsRunning(false);
    setHasStarted(false);
    setHasFinished(false); 
  };

  const handleDurationSelect = (seconds: number) => {
    setTotalTime(seconds);
    setTime(seconds);
    reset();
  };

  return (
    <div className="min-h-screen bg-[#183D3D] text-[#93B1A6] p-6">
      <div className="mb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#5C8374] text-white rounded-full transition-transform duration-200 hover:bg-[#3e5c5c] hover:scale-105 shadow"
        >
          <FaHome /> Home
        </Link>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-4/5 w-full flex flex-col items-center">
          <h2 className="text-5xl font-extrabold text-center w-full">Typing Test</h2><br /><br />
          <div className="w-full flex justify-center mb-4">
            <TypingArea
              text={userText}
              setText={(val) => {
                if (!isRunning) startTyping();
                setUserText(val);
              }}
              sampleText={sampleText}
            />
          </div>
        </div>

        <div className="lg:w-1/5 w-full flex flex-col items-center gap-5 mr-5">
          <h3 className="text-3xl font-bold">Test Duration</h3>
          <TestDurationSelector onSelect={handleDurationSelect} /><br />
          <div className="w-full max-w-xs">
            <ProgressBar timeLeft={time} totalTime={totalTime} />
          </div>
          <Timer duration={time} />
          <div className="flex flex-col gap-3 mt-2 w-full max-w-xs">
            <button onClick={reset} className="bg-[#5C8374] text-white px-4 py-2 rounded w-full hover:bg-[#3e5c5c] transition">Restart</button>
            <button onClick={fetchText} className="bg-[#5C8374] text-white px-4 py-2 rounded w-full hover:bg-[#3e5c5c] transition">New Test</button>
          </div>
        </div>
      </div>
    </div>
  );
}