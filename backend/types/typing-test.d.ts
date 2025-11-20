import { Request } from "express";
export type SubmitTypingTest = {
  wordsTyped: string;
  timeToComplete: number;
  rawWpm: number;
  accuracy: number;
  wpm: number;
  useCapitals: boolean;
  userId: string;
};

export interface SubmitTypingTestRequest extends Request {
  body: SubmitTypingTest;
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
