"use client";
import useWords from "@/hooks/useWords";

export default function Home() {
  const { words, generateWords, numWords, setNumWords } = useWords();
  return (
    <div className="flex flex-col">
      <button onClick={() => generateWords()}>restart</button>
      <input
        type="number"
        value={numWords}
        onChange={(e) => setNumWords(parseInt(e.target.value))}
      ></input>
      <p>{words}</p>
    </div>
  );
}
