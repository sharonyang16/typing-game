import {
  AuthServiceResponse,
  EditableUser,
  User,
  UserCredentials,
} from "../types/user";
import {
  admin,
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "../config/firebase.js";
import prisma from "../prisma/prisma.js";
import { Prisma } from "@prisma/client";
import { FirebaseError } from "firebase/app";
import firebaseErrors from "../static/firebase/firebase-errors";

const auth = getAuth();

/**
 * Creates a new user, creates a firebase user, and saves it to the database.
 * @param userCredentials The user credentials to create the user with.
 * @returns The created user and the id token.
 * @throws An error if the user could not be created.
 */
export const addUser = async (
  userCredentials: UserCredentials
): Promise<AuthServiceResponse> => {
  const { email, password } = userCredentials;

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const firebaseId = userCredential.user.uid;

    const user = await prisma.user.create({
      data: {
        email,
        firebaseId,
        dateJoined: new Date(),
      },
    });

    if (!user) {
      throw new Error("User could not be created");
    }

    const idToken = await userCredential.user.getIdToken();

    return { user, idToken };
  } catch (e) {
    if (e instanceof FirebaseError) {
      if (e.code in firebaseErrors) {
        throw new Error(firebaseErrors[e.code]);
      }
    }

    throw e;
  }
};

/**
 * Retrieves a user, using either their email or username, from the database.
 * @param userCredentials The user credentials to retrieve the user with.
 * @returns The retrieved user and the id token.
 * @throws An error if the user could not be retrieved.
 */
export const loginUser = async (
  userCredentials: UserCredentials
): Promise<AuthServiceResponse> => {
  const { email, password } = userCredentials;

  let userEmail = email;

  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  try {
    // If the email is not in the correct format, assume it's a username
    if (!emailPattern.test(email)) {
      const user = await prisma.user.findUnique({
        where: { username: email },
      });

      if (!user) {
        throw new Error("Invalid credentials");
      }

      userEmail = user.email;
    }

    const userCredential = await signInWithEmailAndPassword(
      auth,
      userEmail,
      password
    );

    const user = await prisma.user.findUnique({
      where: { firebaseId: userCredential.user.uid },
    });

    if (!user) {
      throw new Error("Internal error: User not found");
    }

    const idToken = await userCredential.user.getIdToken();

    return { user, idToken };
  } catch (e) {
    if (e instanceof FirebaseError) {
      if (e.code in firebaseErrors) {
        throw new Error(firebaseErrors[e.code]);
      }
    }
    throw e;
  }
};

/**
 * Verifies a user's id token and returns the user.
 * @param idToken The id token to verify.
 * @returns The verified user.
 * @throws An error if the id token is invalid or the user could not be found.
 */
export const verifyUser = async (idToken: string): Promise<User> => {
  const decodedToken = await admin.auth().verifyIdToken(idToken);

  const user = await prisma.user.findUnique({
    where: { firebaseId: decodedToken.uid },
  });

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};

/**
 * Signs out the user.
 * @returns A Promise that resolves to void.
 * @throws An error if the user could not be signed out.
 */
export const signOut = async (): Promise<void> => {
  try {
    await auth.signOut();
  } catch (e) {
    if (e instanceof Error) {
      throw e;
    }
  }
};

/**
 * Deletes the user based on the id token.
 * @param idToken The id token belonging to the user to be deleted.
 * @returns A Promise that resolves to void.
 * @throws An error if the user could not be deleted.
 */
export const deleteUserWithIdToken = async (idToken: string): Promise<void> => {
  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);

    const deletedUser = await prisma.user.delete({
      where: { firebaseId: decodedToken.uid },
    });

    await admin.auth().deleteUser(deletedUser.firebaseId);
  } catch (e) {
    if (e instanceof Error) {
      throw e;
    }
  }
};

/**
 * Edits the user based on the id token and the editable user fields.
 * @param idToken The id token belonging to the user to be edited.
 * @param editableUser The editable user fields.
 * @returns The edited user.
 * @throws An error if the user could not be edited.
 */
export const editUser = async (
  idToken: string,
  editableUser: EditableUser
): Promise<User> => {
  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const user = await prisma.user.update({
      where: { firebaseId: decodedToken.uid },
      data: editableUser,
    });
    return user;
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        throw new Error("Username is already taken");
      }
    }
    throw e;
  }
};
