import { AppDataSource } from "../data-source";
import { TypingTest } from "../entity/TypingTest";
import { SubmitTypingTest, Order } from "../types/typing-test";

const testRepository = AppDataSource.getRepository(TypingTest);

export const getAllTests = async (orderBy?: Order) => {
  const tests = await testRepository.find();

  switch (orderBy) {
    case "asc":
      tests.sort((a, b) => a.wpm - b.wpm);
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

  const newTest = testRepository.create({
    wordsTyped,
    timeToComplete,
    rawWpm,
    accuracy,
    wpm,
    userId,
    date: new Date(),
  });

  return await testRepository.save(newTest);
};
