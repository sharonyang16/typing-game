import { SubmitTypingTest, Order, OrderByField } from "../types/typing-test";
import prisma from "../prisma/prisma.js";

export const getAllTests = async (
  userEmail?: string,
  orderBy?: Order,
  orderByField?: OrderByField
) => {
  const tests = await prisma.typingTest.findMany({
    include: {
      user: {
        select: {
          email: true,
          username: true,
        },
      },
    },
    where: {
      user: {
        email: userEmail || undefined,
      },
    },
    orderBy: {
      [orderByField || "date"]: orderBy || "desc",
    },
  });

  return tests;
};

export const saveTest = async (test: SubmitTypingTest) => {
  const {
    wordsTyped,
    timeToComplete,
    rawWpm,
    accuracy,
    wpm,
    useCapitals,
    userId,
  } = test;

  return await prisma.typingTest.create({
    data: {
      wordsTyped,
      timeToComplete,
      rawWpm,
      accuracy,
      wpm,
      userId,
      useCapitals,
      date: new Date(),
    },
  });
};
