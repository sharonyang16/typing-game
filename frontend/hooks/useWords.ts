import { useEffect, useState } from "react";
import data from "@/static/words.json";

const useWords = () => {
  const [numWords, setNumWords] = useState(25);
  const [wordsToType, setWordsToType] = useState("");
  const [wordsTyped, setWordsTyped] = useState("");

  const generateWords = () => {
    const newWords = [];

    for (let i = 0; i < numWords; i++) {
      const word = data[Math.floor(Math.random() * data.length)];
      newWords.push(word);
    }

    const newWordsString = newWords.join(" ");

    setWordsToType(newWordsString);
  };

  useEffect(() => {
    generateWords();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [numWords]);

  const updateTyped = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setWordsTyped(e.target.value);
  };

  const charMatches = (index: number) => {
    return wordsToType[index] === wordsTyped[index];
  };

  return {
    numWords,
    setNumWords,
    wordsToType,
    generateWords,
    wordsTyped,
    updateTyped,
    charMatches,
  };
};

export default useWords;
