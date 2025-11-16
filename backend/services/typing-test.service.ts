import { SubmitTypingTest, Order } from "../types/typing-test";
import prisma from "../prisma/prisma.js";

export const getAllTests = async (orderBy?: Order) => {
  const tests = await prisma.typingTest.findMany({
    include: {
      user: {
        select: {
          email: true,
        },
      },
    },
  });

  switch (orderBy) {
    case "asc":
      tests.sort((a, b) => {
        return a.wpm === b.wpm
          ? a.timeToComplete - b.timeToComplete
          : a.wpm - b.wpm;
      });
      break;
    case "desc":
    default:
      tests.sort((a, b) => {
        return a.wpm === b.wpm
          ? b.timeToComplete - a.timeToComplete
          : b.wpm - a.wpm;
      });
      break;
  }

  return tests;
};

export const saveTest = async (test: SubmitTypingTest) => {
  const { wordsTyped, timeToComplete, rawWpm, accuracy, wpm, userId } = test;

  return await prisma.typingTest.create({
    data: {
      wordsTyped,
      timeToComplete,
      rawWpm,
      accuracy,
      wpm,
      userId,
      date: new Date(),
    },
  });
};
