export type TypingTest = {
  wordsTyped: string;
  timeToComplete: number;
  rawWpm: number;
  accuracy: number;
  wpm: number;
  useCapitals: boolean;
  userId: number;
};

export interface PopulatedTypingTest extends TypingTest {
  user: User;
  date: Date;
}

export interface TypingTestLeaderboardEntry {
  user: string;
  words: number;
  wpm: number;
  timeToComplete: number;
  accuracy: number;
  useCapitals: boolean;
  date: string;
}
