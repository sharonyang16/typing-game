"use client";
import { useEffect, useState } from "react";
import data from "@/static/words.json";
import useKeyboardEvents from "./useKeyboardEvents";
import {
  calculateRawWpm,
  calculateAccuracy,
  calculateWpm,
} from "@/utils/typing-test.utils";
import { postTest } from "@/services/typing-test-services";
import { useAuthContext } from "@/context/AuthContext";

const useWords = () => {
  const { keyPressed } = useKeyboardEvents();
  const [numWords, setNumWords] = useState(25);
  const [useCaps, setUseCaps] = useState(false);
  const [wordsToType, setWordsToType] = useState("");
  const [wordsTyped, setWordsTyped] = useState("");
  const [started, setStarted] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [secondsTaken, setSecondsTaken] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [accuracy, setAccuracy] = useState(0);
  const [rawWpm, setRawWpm] = useState(0);
  const [wpm, setWpm] = useState(0);

  const { user } = useAuthContext();

  const generateWords = () => {
    const newWords = [];

    for (let i = 0; i < numWords; i++) {
      let word = data[Math.floor(Math.random() * data.length)];

      if (useCaps && Math.floor(Math.random() * 10) < 3) {
        word = word.charAt(0).toUpperCase() + word.slice(1);
      }

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
  }, [numWords, useCaps]);

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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyPressed]);

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
      const time = parseFloat((endTime / 1000).toFixed(2));
      setSecondsTaken(time);
      setShowResults(true);

      const rawWpm = calculateRawWpm(wordsToType.length, time);
      setRawWpm(rawWpm);

      const accuracy = calculateAccuracy(wordsToType, wordsTyped);
      setAccuracy(accuracy);

      const wpm = calculateWpm(rawWpm, accuracy);
      setWpm(wpm);

      if (accuracy >= 80 && user) {
        postTest({
          wordsTyped,
          timeToComplete: time,
          rawWpm,
          accuracy,
          wpm,
          userId: user.id,
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startTime, started, wordsToType, wordsTyped]);

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

  const handleCapsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUseCaps(e.target.checked);
    e.currentTarget.blur();
  };

  return {
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
    accuracy,
    rawWpm,
    wpm,
  };
};

export default useWords;
