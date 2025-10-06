"use client";
import useWords from "@/hooks/useWords";

export default function Home() {
  const {
    wordsToType,
    generateWords,
    numWords,
    setNumWords,
    wordsTyped,
    charMatches,
  } = useWords();
  return (
    <div className="flex flex-col">
      <button onClick={() => generateWords()}>restart</button>
      <input
        type="number"
        value={numWords}
        onChange={(e) => setNumWords(parseInt(e.target.value))}
      ></input>
      <p className="font-mono">
        {wordsToType.split("").map((char, index) => {
          return (
            <span
              key={index}
              className={`${
                index === wordsTyped.length
                  ? "bg-blue-700"
                  : index >= wordsTyped.length
                  ? ""
                  : charMatches(index)
                  ? "text-green-400"
                  : "bg-red-800"
              }`}
            >
              {char}
            </span>
          );
        })}
      </p>
    </div>
  );
}
