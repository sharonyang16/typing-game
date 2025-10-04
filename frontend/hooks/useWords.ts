import { useEffect, useState } from "react";
import data from "@/static/words.json";

const useWords = () => {
  const [numWords, setNumWords] = useState(25);
  const [words, setWords] = useState("");

  const generateWords = () => {
    const newWords = [];

    for (let i = 0; i < numWords; i++) {
      const word = data[Math.floor(Math.random() * data.length)];
      newWords.push(word);
    }

    const newWordsString = newWords.join(" ");

    setWords(newWordsString);
  };

  useEffect(() => {
    generateWords();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [numWords]);

  return { numWords, setNumWords, words, generateWords };
};

export default useWords;
