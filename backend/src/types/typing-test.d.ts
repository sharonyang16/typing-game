import { Request } from "express";
export type SubmitTypingTest = {
  wordsTyped: string;
  timeToComplete: number;
  rawWpm: number;
  accuracy: number;
  wpm: number;
  userId: string;
};

export interface SubmitTypingTestRequest extends Request {
  body: SubmitTypingTest;
}

export type Order = "asc" | "desc";
