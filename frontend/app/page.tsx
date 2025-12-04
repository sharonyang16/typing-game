"use client";
import { RotateCcw } from "lucide-react";
import useGame from "@/hooks/useGame";
import numWordsConstant from "@/static/numWords.json";
import ResultsPage from "@/components/game/results";

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
    started,
    showAccuracyWarningBanner,
  } = useGame();

  return (
    <div className="flex flex-col h-full">
      <div className="pb-8">
        {showResults && (
          <ResultsPage
            showSignUpBanner={showSignUpBanner}
            showAccuracyWarningBanner={showAccuracyWarningBanner}
            wpm={wpm}
            accuracy={accuracy}
            secondsTaken={secondsTaken}
            rawWpm={rawWpm}
            numWords={numWords}
          />
        )}
        {!showResults && (
          <div className="flex flex-col gap-16">
            <div
              className={`flex justify-between ${
                started && " pointer-events-none opacity-50"
              }`}
            >
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
              <fieldset className="flex gap-2 items-center">
                <input
                  type="checkbox"
                  checked={useCaps}
                  onChange={handleCapsChange}
                  className="toggle"
                  id="toggle-caps"
                />
                <label htmlFor="toggle-caps"> Capital Letters</label>
              </fieldset>
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
