const calculateRawWpm = (length: number, seconds: number): number => {
  return Math.floor((length / 5) * (60 / seconds));
};

const calculateAccuracy = (wordsA: string, wordsB: string): number => {
  let sameLetterCount = 0;

  for (let i = 0; i < wordsA.length; i++) {
    if (wordsA[i] === wordsB[i]) {
      sameLetterCount++;
    }
  }

  return Math.floor((sameLetterCount / wordsA.length) * 100);
};

const calculateWpm = (rawWPM: number, accuracy: number): number => {
  return Math.floor((rawWPM * accuracy) / 100);
};

export { calculateRawWpm, calculateAccuracy, calculateWpm };
