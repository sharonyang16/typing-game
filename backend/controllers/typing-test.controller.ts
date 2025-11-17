import express, { Response } from "express";
import { getAllTests, saveTest } from "../services/typing-test.service.js";
import {
  GetTypingTestsRequest,
  SubmitTypingTestRequest,
} from "../types/typing-test";

const TypingTestController = () => {
  const router = express.Router();

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

  const getTests = async (req: GetTypingTestsRequest, res: Response) => {
    const { user, orderBy, orderByField } = req.query;
    try {
      const tests = await getAllTests(user, orderBy, orderByField);
      res.status(200).send(tests);
    } catch (e) {
      if (e instanceof Error) {
        res.status(500).send(e.message);
      }
    }
  };

  const createTest = async (req: SubmitTypingTestRequest, res: Response) => {
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
