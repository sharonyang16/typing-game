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

export const signOut = async () => {
  try {
    await auth.signOut();
  } catch (e) {
    if (e instanceof Error) {
      throw e;
    }
  }
};

export const deleteUserWithIdToken = async (idToken: string) => {
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

export const editUser = async (idToken: string, editableUser: EditableUser) => {
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
    } else {
      if (e instanceof Error) {
        throw e;
      }
    }
  }
};
