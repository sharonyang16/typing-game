"use client";
import { RotateCcw } from "lucide-react";
import useWords from "@/hooks/useWords";
import numWordsConstant from "@/static/numWords.json";
import Link from "next/link";

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
          <div>
            <h4>Results</h4>
            {showSignUpBanner && (
              <div
                role="alert"
                className="alert alert-vertical sm:alert-horizontal flex justify-between"
              >
                <div>Sign up to save your results!</div>
                <div>
                  <Link href="/authentication/sign-up" className="btn btn-sm">
                    Sign Up
                  </Link>
                </div>
              </div>
            )}
            <p>{`Words: ${numWords}`}</p>
            <p>{`Seconds: ${secondsTaken}`}</p>
            <p>{`WPM: ${wpm}`}</p>
            <p>{`Accuracy: ${accuracy}%`}</p>
            <p>{`Raw WPM: ${rawWpm}`}</p>
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
