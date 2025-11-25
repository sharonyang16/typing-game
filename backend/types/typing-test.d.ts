import { Request } from "express";
export type TypingTest = {
  wordsTyped: string;
  timeToComplete: number;
  rawWpm: number;
  accuracy: number;
  wpm: number;
  useCapitals: boolean;
  userId: string;
};

export interface SubmitTypingTestRequest extends Request {
  body: TypingTest;
}

export interface GetTypingTestsRequest extends Request {
  query: {
    user?: string;
    orderBy?: Order;
    orderByField?: OrderByField;
    wordCount?: WordCount;
    usedCapitals?: BooleanString;
  };
}

export interface PopulatedTypingTest extends TypingTest {
  user: {
    email: string;
    username: string | null;
  };
  date: Date;
}

export type BooleanString = "true" | "false";

export type WordCount = "10" | "25" | "50" | "100";

export type Order = "asc" | "desc";

export type OrderByField =
  | "date"
  | "wordsTyped"
  | "timeToComplete"
  | "rawWpm"
  | "accuracy"
  | "wpm";
