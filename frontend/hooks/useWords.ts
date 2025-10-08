import { useEffect, useState } from "react";
import data from "@/static/words.json";
import useKeyboardEvents from "./useKeyboardEvents";

const useWords = () => {
  const { keyPressed } = useKeyboardEvents();
  const [numWords, setNumWords] = useState(25);
  const [wordsToType, setWordsToType] = useState("");
  const [wordsTyped, setWordsTyped] = useState("");
  const [started, setStarted] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [secondsTaken, setSecondsTaken] = useState("");
  const [showResults, setShowResults] = useState(false);

  const generateWords = () => {
    const newWords = [];

    for (let i = 0; i < numWords; i++) {
      const word = data[Math.floor(Math.random() * data.length)];
      newWords.push(word);
    }

    const newWordsString = newWords.join(" ");

    setWordsToType(newWordsString);
    setWordsTyped("");
    setStarted(false);
  };

  useEffect(() => {
    generateWords();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [numWords]);

  const handleRestart = (e: React.MouseEvent<HTMLButtonElement>) => {
    generateWords();
    e.currentTarget.blur();
    setShowResults(false);
  };

  // Update the words typed
  useEffect(() => {
    if (wordsTyped.length === wordsToType.length) {
      return;
    }

    if (keyPressed === "Backspace") {
      setWordsTyped((prev) => prev.slice(0, -1));
      return;
    } else if (/^[\x00-\x7F]*$/.test(keyPressed) && keyPressed.length === 1) {
      setWordsTyped((prev) => prev.concat(keyPressed));
    }
  }, [keyPressed, wordsToType.length, wordsTyped.length]);

  // Detect when user starts and ends test
  useEffect(() => {
    // start
    if (!started && wordsTyped.length === 1) {
      setStarted(true);
      setStartTime(Date.now());
    }

    // end
    if (wordsToType.length === wordsTyped.length && started) {
      setStarted(false);
      const endTime = Date.now() - startTime;
      const time = (endTime / 1000).toFixed(2);
      setSecondsTaken(time);
      setShowResults(true);
    }
  }, [startTime, started, wordsToType, wordsTyped]);

  const updateTyped = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setWordsTyped(e.target.value);
  };

  const charMatches = (index: number) => {
    return wordsToType[index] === wordsTyped[index];
  };

  const handleNumWordsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setNumWords(parseInt(e.target.value));
    } catch {
      // do nothing
    }
  };

  return {
    numWords,
    setNumWords,
    wordsToType,
    handleRestart,
    wordsTyped,
    updateTyped,
    charMatches,
    handleNumWordsChange,
    secondsTaken,
    showResults,
  };
};

export default useWords;
