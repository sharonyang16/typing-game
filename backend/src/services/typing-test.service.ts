import { AppDataSource } from "../data-source";
import { TypingTest } from "../entity/TypingTest";
import { SubmitTypingTest } from "../types/typing-test";

const testRepository = AppDataSource.getRepository(TypingTest);

export const getAllTests = async () => {
  return await testRepository.find();
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
