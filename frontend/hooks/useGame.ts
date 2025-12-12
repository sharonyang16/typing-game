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

/**
 * Custom hook for handling game logic.
 * @returns numWords - the number of words to type in the test
 * @returns handleNumWordsChange - the function to handle changing the number of words
 * @returns useCaps - if the test should use capital letters
 * @returns handleCapsChange - the function to handle changing the use capital letters
 * @returns wordsToType - the words to type in the test
 * @returns wordsTyped - the words that have been typed in the test
 * @returns handleRestart - the function to handle restarting the test
 * @returns charMatches - the function to determine if the character typed and the character that it should be matches
 * @returns secondsTaken - the number of seconds it took to type
 * @returns showResults - if the results should be shown
 * @returns accuracy - the accuracy of the test
 * @returns rawWpm - the raw WPM of the test
 * @returns wpm - the WPM of the test
 * @returns showSignUpBanner - if the sign up banner should be shown
 * @returns started - if the test has started
 * @returns showAccuracyWarningBanner - if the accuracy warning banner should be shown
 */
const useGame = () => {
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
  const [showSignUpBanner, setShowSignUpBanner] = useState(false);
  const [showAccuracyWarningBanner, setShowAccuracyWarningBanner] =
    useState(false);

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

  // Generate new words
  useEffect(() => {
    generateWords();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [numWords, useCaps]);

  // Show sign up banner if user is not logged in on results page
  useEffect(() => {
    setShowSignUpBanner(!user);
  }, [user]);

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
          useCapitals: useCaps,
        });
      } else {
        setShowAccuracyWarningBanner(true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startTime, started, wordsToType, wordsTyped]);

  /**
   * Handles restarting the test.
   * @param e The event object from the button click event.
   * @returns void
   */
  const handleRestart = (e: React.MouseEvent<HTMLButtonElement>): void => {
    generateWords();
    e.currentTarget.blur();
    setShowResults(false);
  };

  /**
   * Determines if the character typed and the character that it should be matches.
   * @param index The index of the character.
   * @returns True if the character matches, false otherwise.
   */
  const charMatches = (index: number): boolean => {
    return wordsToType[index] === wordsTyped[index];
  };

  /**
   * Handles changing the number of words for the test.
   * @param e The event object from the input change event.
   * @returns void
   */
  const handleNumWordsChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    try {
      setNumWords(parseInt(e.target.value));
    } catch {
      // do nothing
    }
  };

  /**
   * Handles changing the use capital letters for the test.
   * @param e The event object from the input change event.
   * @returns void
   */
  const handleCapsChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setUseCaps(e.target.checked);
    e.currentTarget.blur();
  };

  return {
    numWords,
    handleNumWordsChange,
    useCaps,
    handleCapsChange,
    wordsToType,
    wordsTyped,
    handleRestart,
    charMatches,
    secondsTaken,
    showResults,
    accuracy,
    rawWpm,
    wpm,
    showSignUpBanner,
    started,
    showAccuracyWarningBanner,
  };
};

export default useGame;
