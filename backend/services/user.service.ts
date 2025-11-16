import { AuthServiceResponse, User, UserCredentials } from "../types/user";
import {
  admin,
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "../config/firebase.js";
import prisma from "../prisma/prisma";

const auth = getAuth();

export const addUser = async (
  userCredentials: UserCredentials
): Promise<AuthServiceResponse> => {
  const { email, password } = userCredentials;

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
};

export const loginUser = async (
  userCredentials: UserCredentials
): Promise<AuthServiceResponse> => {
  const { email, password } = userCredentials;
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );

  const user = await prisma.user.findUnique({
    where: { firebaseId: userCredential.user.uid },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const idToken = await userCredential.user.getIdToken();

  return { user, idToken };
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
