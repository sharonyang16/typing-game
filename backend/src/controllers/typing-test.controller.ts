import express, { Request, Response } from "express";
import { getAllTests } from "../services/typing-test.service";

const TypingTestController = () => {
  const router = express.Router();

  const getTests = async (_: Request, res: Response) => {
    try {
      const tests = await getAllTests();
      res.status(200).send(tests);
    } catch (e) {
      res.status(500).send(e?.message);
    }
  };

  const createTest = async (req: Request, res: Response) => {
    try {
      res.status(200).send("hello world");
    } catch (e) {
      res.status(500).send(e?.message);
    }
  };

  router.get("/", getTests);
  router.post("/", createTest);

  return router;
};

export default TypingTestController;
