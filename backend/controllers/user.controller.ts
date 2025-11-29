import express, { CookieOptions, Request, Response } from "express";
import { AuthRequest, EditUserRequest } from "../types/user";
import {
  addUser,
  deleteUserWithIdToken,
  editUser,
  loginUser,
  signOut,
  verifyUser,
} from "../services/user.service.js";

/**
 * Controller for users routes.
 */
const UserController = () => {
  const router = express.Router();

  /**
   * Determines if the request body is valid for user sign up or log in.
   * @param req The request object containing the body with user credentials.
   * @returns A boolean indicating if the body is valid.
   */
  const isAuthBodyValid = (req: AuthRequest) =>
    req.body !== undefined &&
    req.body.email !== undefined &&
    req.body.email !== "" &&
    req.body.password !== undefined &&
    req.body.password !== "";

  /**
   * Determines if the request body is valid for editing a user.
   * @param req The request object containing the body.
   * @returns A boolean indicating if the body is valid.
   */
  const isEditBodyValid = (req: EditUserRequest) => req.body !== undefined;

  /**
   * Creates a new user.
   * @param req The request object containing the body with user credentials.
   * @param res The response object used to send the created user or an error.
   * @returns A Promise that resolves to void.
   */
  const createUser = async (req: AuthRequest, res: Response): Promise<void> => {
    if (!isAuthBodyValid(req)) {
      res.status(500).send("Invalid user body");
      return;
    }

    const { email, password, staySignedIn } = req.body;

    try {
      const { user, sessionCookie } = await addUser({ email, password });

      const sessionCookieOptions: CookieOptions = {
        httpOnly: true,
        secure: true,
      };

      if (staySignedIn) sessionCookieOptions.maxAge = 60 * 60 * 24 * 14 * 1000;

      res.cookie("session", sessionCookie, sessionCookieOptions);

      res.status(200).send(user);
    } catch (e) {
      if (e instanceof Error) {
        res.status(500).send(e.message);
      }
    }
  };

  /**
   * Signs in a user.
   * @param req The request object containing the body with user credentials.
   * @param res The response object used to send the signed in user or an error.
   * @returns A Promise that resolves to void.
   */
  const signInUser = async (req: AuthRequest, res: Response): Promise<void> => {
    if (!isAuthBodyValid(req)) {
      res.status(500).send("Invalid user body");
      return;
    }

    const { email, password, staySignedIn } = req.body;

    try {
      const { user, sessionCookie } = await loginUser({ email, password });

      const sessionCookieOptions: CookieOptions = {
        httpOnly: true,
        secure: true,
      };

      if (staySignedIn) sessionCookieOptions.maxAge = 60 * 60 * 24 * 14 * 1000;

      res.cookie("session", sessionCookie, sessionCookieOptions);

      res.status(200).send(user);
    } catch (e) {
      if (e instanceof Error) {
        res.status(500).send(e.message);
      }
    }
  };

  /**
   * Authenticates the user based on the session in the cookie and returns the user
   * if valid, otherwise returns null.
   * @param req The request object containing the session cookie.
   * @param res The response object used to send the user or null.
   * @returns A Promise that resolves to void.
   */
  const checkAuth = async (req: Request, res: Response): Promise<void> => {
    const sessionCookie = req.cookies.session;

    try {
      const user = await verifyUser(sessionCookie);
      res.status(200).send(user);
    } catch (_e) {
      res.status(200).send(null);
    }
  };

  /**
   * Logs out the user and clears the session cookie.
   * @param _ Unused request object.
   * @param res The response object used to send a success message or an error.
   * @returns A Promise that resolves to void.
   */
  const logOut = async (_: Request, res: Response): Promise<void> => {
    try {
      await signOut();
      res.clearCookie("session");
      res.status(200).send("User logged out");
    } catch (e) {
      if (e instanceof Error) {
        res.status(500).send(e.message);
      }
    }
  };

  /**
   * Deletes the user based on the session in the cookie.
   * @param req The request object containing the session cookie.
   * @param res The response object used to send a success message or an error.
   * @returns A Promise that resolves to void.
   */
  const deleteUser = async (req: Request, res: Response): Promise<void> => {
    const sessionCookie = req.cookies.session;

    try {
      await deleteUserWithIdToken(sessionCookie);
      res.status(200).send("User deleted");
    } catch (e) {
      if (e instanceof Error) {
        res.status(500).send(e.message);
      }
    }
  };

  /**
   * Updates the user.
   * @param req The request object containing the session cookie and the user fields to update in the body.
   * @param res The response object used to send the updated user or an error.
   * @returns A Promise that resolves to void.
   */
  const patchUser = async (
    req: EditUserRequest,
    res: Response
  ): Promise<void> => {
    if (!isEditBodyValid(req)) {
      res.status(500).send("Body is missing");
      return;
    }
    const sessionCookie = req.cookies.session;

    try {
      const user = await editUser(sessionCookie, req.body);
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
  router.delete("/", deleteUser);
  router.patch("/", patchUser);

  return router;
};

export default UserController;
