import express, { Response } from "express";
import { getAllTests, saveTest } from "../services/typing-test.service.js";
import {
  GetTypingTestsRequest,
  SubmitTypingTestRequest,
} from "../types/typing-test";

/**
 * Controller for typing tests routes.
 */
const TypingTestController = () => {
  const router = express.Router();

  /**
   * Determines if the request body is valid for submitting a typing test.
   * @param req The request object containing the body with typing test details.
   * @returns A boolean indicating if the body is valid.
   */
  const isBodyValid = (req: SubmitTypingTestRequest) =>
    req.body !== undefined &&
    req.body.wordsTyped !== undefined &&
    req.body.wordsTyped !== "" &&
    req.body.timeToComplete !== undefined &&
    req.body.timeToComplete !== 0 &&
    req.body.rawWpm !== undefined &&
    req.body.rawWpm !== 0 &&
    req.body.accuracy !== undefined &&
    req.body.accuracy >= 80 &&
    req.body.wpm !== undefined &&
    req.body.wpm !== 0 &&
    req.body.userId !== undefined &&
    req.body.useCapitals !== undefined;

  /**
   * Gets all typing tests, optionally sorted and/or filtered by user word count, and used capitals.
   * @param req The request object containing the optional query parameters.
   * @param res The response object used to send the typing tests or an error.
   * @returns A Promise that resolves to void.
   */
  const getTests = async (
    req: GetTypingTestsRequest,
    res: Response
  ): Promise<void> => {
    const { user, orderBy, orderByField, wordCount, usedCapitals } = req.query;

    try {
      const wordCountNumber = wordCount ? parseInt(wordCount) : undefined;
      const usedCapitalsBoolean = usedCapitals
        ? usedCapitals === "true"
        : undefined;

      const tests = await getAllTests(
        user,
        orderBy,
        orderByField,
        wordCountNumber,
        usedCapitalsBoolean
      );
      res.status(200).send(tests);
    } catch (e) {
      if (e instanceof Error) {
        res.status(500).send(e.message);
      }
    }
  };

  /**
   * Creates a new typing test.
   * @param req The request object containing the body with typing test details.
   * @param res The response object used to send the created typing test or an error.
   * @returns A Promise that resolves to void.
   */
  const createTest = async (
    req: SubmitTypingTestRequest,
    res: Response
  ): Promise<void> => {
    if (!isBodyValid(req)) {
      res.status(500).send("Invalid typing test body");
      return;
    }
    try {
      const test = await saveTest(req.body);
      res.status(200).send(test);
    } catch (e) {
      if (e instanceof Error) {
        res.status(500).send(e.message);
      }
    }
  };

  router.get("/", getTests);
  router.post("/", createTest);

  return router;
};

export default TypingTestController;
