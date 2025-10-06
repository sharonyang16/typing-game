"use client";
import useWords from "@/hooks/useWords";

export default function Home() {
  const {
    wordsToType,
    generateWords,
    numWords,
    setNumWords,
    wordsTyped,
    updateTyped,
  } = useWords();
  return (
    <div className="flex flex-col">
      <button onClick={() => generateWords()}>restart</button>
      <input
        type="number"
        value={numWords}
        onChange={(e) => setNumWords(parseInt(e.target.value))}
      ></input>
      <p>{wordsToType}</p>
      <input
        type="text"
        value={wordsTyped}
        onChange={(e) => {
          updateTyped(e);
        }}
      />
    </div>
  );
}
