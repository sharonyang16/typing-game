import { Request } from "express";
import { User } from "../entity/User";

/**
 * Express request for user sign up and log in.
 * - `email`: The email submitted in the request.
 * - `password`: The password submitted in the request.
 */
export interface AuthRequest extends Request {
  body: {
    email: string;
    password: string;
  };
}

export interface UserCredentials {
  email: string;
  password: string;
}

export interface AuthServiceResponse {
  user: User;
  idToken: string;
}
