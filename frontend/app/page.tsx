"use client";
import { RotateCcw } from "lucide-react";
import useWords from "@/hooks/useWords";
import numWordsConstant from "@/static/numWords.json";
import Link from "next/link";

const resultsNumberLabel = (value: string, label: string) => {
  return (
    <div>
      <p className="text-4xl font-bold">{value}</p>
      <p className="text-sm font-bold">{label}</p>
    </div>
  );
};

export default function Home() {
  const {
    numWords,
    useCaps,
    handleCapsChange,
    wordsToType,
    handleRestart,
    wordsTyped,
    charMatches,
    handleNumWordsChange,
    secondsTaken,
    showResults,
    rawWpm,
    accuracy,
    wpm,
    showSignUpBanner,
  } = useWords();

  return (
    <div className="flex flex-col h-full">
      <div className="pb-8">
        {showResults && (
          <div className="flex flex-col gap-4">
            <h1 className="text-xl font-bold">Results</h1>
            {showSignUpBanner && (
              <div
                role="alert"
                className="alert alert-vertical sm:alert-horizontal flex justify-between"
              >
                <div>Sign up to save your results!</div>
                <div className="flex gap-2">
                  <Link href="/authentication/login" className="btn btn-sm">
                    Login
                  </Link>
                  <Link
                    href="/authentication/sign-up"
                    className="btn btn-sm btn-primary"
                  >
                    Sign up
                  </Link>
                </div>
              </div>
            )}
            <div className="flex justify-between">
              <div className="flex flex-col gap-4">
                {resultsNumberLabel(wpm.toString(), "WPM")}
                {resultsNumberLabel(`${accuracy}%`, "Accuracy")}
                {resultsNumberLabel(secondsTaken.toString(), "Seconds")}
              </div>
              <div className="flex flex-col gap-4">
                {resultsNumberLabel(rawWpm.toString(), "Raw WPM")}
                {resultsNumberLabel(`${numWords}`, "Words")}
              </div>
            </div>
          </div>
        )}
        {!showResults && (
          <div className="flex flex-col gap-16">
            <div className="flex justify-between">
              <div className="join">
                {numWordsConstant.map((num) => (
                  <input
                    key={`numWords-${num}`}
                    className="join-item btn btn-square"
                    type="radio"
                    value={num}
                    onChange={handleNumWordsChange}
                    checked={numWords == num}
                    aria-label={num.toString()}
                  />
                ))}
              </div>
              <label className="flex gap-2 items-center label">
                <input
                  type="checkbox"
                  checked={useCaps}
                  onChange={handleCapsChange}
                  className="toggle"
                />
                Capital Letters
              </label>
            </div>

            <div>
              <p className="text-xl">
                {wordsToType.split("").map((char, index) => {
                  return (
                    <span
                      key={index}
                      className={`${
                        index === wordsTyped.length
                          ? "bg-blue-700"
                          : index >= wordsTyped.length
                          ? "text-gray-400"
                          : charMatches(index)
                          ? "text-white"
                          : "bg-red-800"
                      }`}
                    >
                      {char}
                    </span>
                  );
                })}
              </p>
            </div>
          </div>
        )}
      </div>
      <div className="flex justify-center">
        <button onClick={handleRestart}>
          <RotateCcw />
        </button>
      </div>
    </div>
  );
}
