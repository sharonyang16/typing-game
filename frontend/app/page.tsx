"use client";
import useWords from "@/hooks/useWords";
import numWordsConstant from "@/static/numWords.json";

export default function Home() {
  const {
    wordsToType,
    handleRestart,
    numWords,
    wordsTyped,
    charMatches,
    handleNumWordsChange,
    secondsTaken,
    showResults,
  } = useWords();

  return (
    <div className="flex flex-col">
      <button onClick={handleRestart}>restart</button>
      {showResults && (
        <div>
          <h4>Results</h4>
          <p>{`Words: ${numWords}`}</p>
          <p>{`Seconds: ${secondsTaken}`}</p>
        </div>
      )}
      {!showResults && (
        <div>
          <div className="flex gap-4">
            {numWordsConstant.map((num) => (
              <label key={`numWords-${num}`} className="flex gap-1">
                <input
                  type="radio"
                  value={num}
                  onChange={handleNumWordsChange}
                  checked={numWords == num}
                />
                {num}
              </label>
            ))}
          </div>

          <p className="font-mono">
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
      )}
    </div>
  );
}
