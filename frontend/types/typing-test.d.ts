export type TypingTest = {
  wordsTyped: string;
  timeToComplete: number;
  rawWpm: number;
  accuracy: number;
  wpm: number;
  userId: number;
};

export interface PopulatedTypingTest extends TypingTest {
  user: User;
  date: Date;
}
