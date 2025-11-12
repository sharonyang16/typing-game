import express, { Request, Response } from "express";
import { AuthRequest } from "../types/user";
import {
  addUser,
  loginUser,
  signOut,
  verifyUser,
} from "../services/user.service";

const userController = () => {
  const router = express.Router();

  const isAuthBodyValid = (req: AuthRequest) =>
    req.body !== undefined &&
    req.body.email !== undefined &&
    req.body.email !== "" &&
    req.body.password !== undefined &&
    req.body.password !== "";

  const createUser = async (req: AuthRequest, res: Response) => {
    if (!isAuthBodyValid(req)) {
      res.status(500).send("Invalid user body");
      return;
    }

    const newUser = req.body;

    try {
      const { user, idToken } = await addUser(newUser);

      res.cookie("access_token", idToken, {
        httpOnly: true,
      });

      res.status(200).send(user);
    } catch (e) {
      res.status(500).send(e?.message);
    }
  };

  const signInUser = async (req: AuthRequest, res: Response) => {
    if (!isAuthBodyValid(req)) {
      res.status(500).send("Invalid user body");
      return;
    }

    const userCredentials = req.body;

    try {
      const { user, idToken } = await loginUser(userCredentials);

      res.cookie("access_token", idToken, {
        httpOnly: true,
      });

      res.status(200).send(user);
    } catch (e) {
      res.status(500).send(e?.message);
    }
  };

  const checkAuth = async (req: Request, res: Response) => {
    const idToken = req.cookies.access_token;

    try {
      const user = await verifyUser(idToken);
      res.status(200).send(user);
    } catch (e) {
      res.status(500).send(e?.message);
    }
  };

  const logOut = async (_: Request, res: Response) => {
    try {
      await signOut();
      res.clearCookie("access_token");
      res.status(200).send("User logged out");
    } catch (e) {
      res.status(500).send(e?.message);
    }
  };

  router.post("/sign-up", createUser);
  router.post("/login", signInUser);
  router.get("/check-auth", checkAuth);
  router.post("/logout", logOut);

  return router;
};

export default userController;
