import { Request } from "express";

/**
 * Express request for user sign up and log in.
 * - `email`: The email submitted in the request.
 * - `firebaseId`: The firebaseId submitted in the request.
 */
export interface AuthRequest extends Request {
  body: {
    email: string;
    firebaseId: string;
  };
}

export interface UserCredentials {
  email: string;
  firebaseId: string;
}
