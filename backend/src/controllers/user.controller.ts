import express, { Response } from "express";
import { AuthRequest } from "../types/user";
import { addUser } from "../services/user.service";

const userController = () => {
  const router = express.Router();

  const isAuthBodyValid = (req: AuthRequest) =>
    req.body !== undefined &&
    req.body.email !== undefined &&
    req.body.email !== "" &&
    req.body.firebaseId !== undefined &&
    req.body.firebaseId !== "";

  const createUser = async (req: AuthRequest, res: Response) => {
    if (!isAuthBodyValid(req)) {
      res.status(500).send("Invalid user body");
      return;
    }

    const user = req.body;

    try {
      const username = await addUser(user);
      res.status(200).send(username);
    } catch {
      res.status(500).send("bad");
    }
  };

  router.post("/signup", createUser);

  return router;
};

export default userController;
