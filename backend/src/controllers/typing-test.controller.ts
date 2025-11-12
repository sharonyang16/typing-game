import express, { Request, Response } from "express";

const TypingTestController = () => {
  const router = express.Router();

  router.get("/", (_: Request, res: Response) => {
    res.send("hello world");
  });

  return router;
};

export default TypingTestController;
