import {
  Order,
  OrderByField,
  PopulatedTypingTest,
  TypingTest,
} from "../types/typing-test";
import prisma from "../prisma/prisma.js";

/**
 * Gets all typing tests from the database, optionally sorted and/or filtered by user word count, and used capitals.
 * @param userEmail The email of the user to get typing tests for.
 * @param orderBy The order to sort the typing tests by.
 * @param orderByField The field to sort the typing tests by.
 * @param wordCount The word count to filter the typing tests by.
 * @param usedCapitals Whether to filter the typing tests by used capitals.
 * @returns The sorted and/or filtered typing tests.
 * @throws An error if the typing tests could not be retrieved.
 */
export const getAllTests = async (
  userEmail?: string,
  orderBy?: Order,
  orderByField?: OrderByField,
  wordCount?: number,
  usedCapitals?: boolean
): Promise<PopulatedTypingTest[]> => {
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
      useCapitals: usedCapitals || undefined,
      user: {
        email: userEmail || undefined,
      },
    },
    orderBy: {
      [orderByField || "date"]: orderBy || "desc",
    },
  });

  if (wordCount) {
    return tests.filter(
      (test) => test.wordsTyped.split(" ").length === wordCount
    );
  }

  return tests;
};

/**
 * Saves a typing test to the database.
 * @param test The typing test to save.
 * @returns The saved typing test.
 * @throws An error if the typing test could not be saved.
 */
export const saveTest = async (test: TypingTest): Promise<TypingTest> => {
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
