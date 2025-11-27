import { Request } from "express";

export interface User {
  id: string;
  email: string;
  firebaseId: string;
  dateJoined: Date;
}

/**
 * Express request for user sign up and log in.
 * - `email`: The email submitted in the request.
 * - `password`: The password submitted in the request.
 */
export interface AuthRequest extends Request {
  body: AuthRequestFields;
}

export interface UserCredentials {
  email: string;
  password: string;
}

export interface AuthRequestFields extends UserCredentials {
  staySignedIn?: boolean;
}

export interface AuthServiceResponse {
  user: User;
  idToken: string;
}

export interface EditableUser {
  username?: string;
}

export interface EditUserRequest extends Request {
  body: EditableUser;
}
