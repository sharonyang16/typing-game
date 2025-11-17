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
  };
}

export type Order = "asc" | "desc";

export type OrderByField =
  | "date"
  | "wordsTyped"
  | "timeToComplete"
  | "rawWpm"
  | "accuracy"
  | "wpm";
