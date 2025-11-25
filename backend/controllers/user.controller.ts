import express, { Request, Response } from "express";
import { AuthRequest, EditUserRequest } from "../types/user";
import {
  addUser,
  deleteUserWithIdToken,
  editUser,
  loginUser,
  signOut,
  verifyUser,
} from "../services/user.service.js";

const UserController = () => {
  const router = express.Router();

  const isAuthBodyValid = (req: AuthRequest) =>
    req.body !== undefined &&
    req.body.email !== undefined &&
    req.body.email !== "" &&
    req.body.password !== undefined &&
    req.body.password !== "";

  const isEditBodyValid = (req: EditUserRequest) => req.body !== undefined;

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
      if (e instanceof Error) {
        res.status(500).send(e.message);
      }
    }
  };

  const signInUser = async (req: AuthRequest, res: Response): Promise<void> => {
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
      if (e instanceof Error) {
        res.status(500).send(e.message);
      }
    }
  };

  /**
   * Authenticates the user based on the access token in the cookie and returns the user
   * if valid, otherwise returns null.
   *
   * @param req The request object containing the access token.
   * @param res The response object used to send the user or null.
   * @returns A Promise that resolves to void.
   */
  const checkAuth = async (req: Request, res: Response): Promise<void> => {
    const idToken = req.cookies.access_token;

    try {
      const user = await verifyUser(idToken);
      res.status(200).send(user);
    } catch (_e) {
      res.status(200).send(null);
    }
  };

  const logOut = async (_: Request, res: Response) => {
    try {
      await signOut();
      res.clearCookie("access_token");
      res.status(200).send("User logged out");
    } catch (e) {
      if (e instanceof Error) {
        res.status(500).send(e.message);
      }
    }
  };

  const deleteUser = async (req: Request, res: Response) => {
    const idToken = req.cookies.access_token;

    try {
      await deleteUserWithIdToken(idToken);
      res.status(200).send("User deleted");
    } catch (e) {
      if (e instanceof Error) {
        res.status(500).send(e.message);
      }
    }
  };

  const patchUser = async (req: EditUserRequest, res: Response) => {
    if (!isEditBodyValid(req)) {
      res.status(500).send("Body is missing");
      return;
    }
    const idToken = req.cookies.access_token;

    try {
      const user = await editUser(idToken, req.body);
      res.status(200).send(user);
    } catch (e) {
      if (e instanceof Error) {
        res.status(500).send(e.message);
      }
    }
  };

  router.post("/sign-up", createUser);
  router.post("/login", signInUser);
  router.get("/check-auth", checkAuth);
  router.post("/logout", logOut);
  router.delete("/delete", deleteUser);
  router.patch("/", patchUser);

  return router;
};

export default UserController;
