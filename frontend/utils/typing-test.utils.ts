/**
 * Calculates raw WPM.
 * @param length The number of characters typed.
 * @param seconds The number of seconds it took to type.
 * @returns The raw WPM.
 */
const calculateRawWpm = (length: number, seconds: number): number => {
  return Math.floor((length / 5) * (60 / seconds));
};

/**
 * Calculates how similar the two strings are.
 * @param wordsA The first string.
 * @param wordsB The second string.
 * @returns A percentage of how similar the two strings are.
 */
const calculateAccuracy = (wordsA: string, wordsB: string): number => {
  let sameLetterCount = 0;

  for (let i = 0; i < wordsA.length; i++) {
    if (wordsA[i] === wordsB[i]) {
      sameLetterCount++;
    }
  }

  return Math.floor((sameLetterCount / wordsA.length) * 100);
};

/**
 * Calculates WPM from raw WPM and accuracy.
 * @param rawWPM The raw WPM.
 * @param accuracy The accuracy.
 * @returns The WPM.
 */
const calculateWpm = (rawWPM: number, accuracy: number): number => {
  return Math.floor((rawWPM * accuracy) / 100);
};

export { calculateRawWpm, calculateAccuracy, calculateWpm };
