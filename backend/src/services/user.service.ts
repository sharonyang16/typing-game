import { AuthServiceResponse, UserCredentials } from "../types/user";
import {
  admin,
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "../config/firebase";
import { PrismaClient, User } from "../../generated/prisma/client";

const prisma = new PrismaClient();

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
    const idToken = await userCredential.user.getIdToken();

    return { user, idToken };
  } catch (e) {
    if (e instanceof Error) {
      throw e;
    }
  }
};

export const loginUser = async (
  userCredentials: UserCredentials
): Promise<AuthServiceResponse> => {
  const { email, password } = userCredentials;

  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = await prisma.user.findUnique({
      where: { firebaseId: userCredential.user.uid },
    });

    const idToken = await userCredential.user.getIdToken();

    return { user, idToken };
  } catch (e) {
    if (e instanceof Error) {
      throw e;
    }
  }
};

export const verifyUser = async (idToken: string): Promise<User> => {
  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);

    const user = await prisma.user.findUnique({
      where: { firebaseId: decodedToken.uid },
    });

    return user;
  } catch (e) {
    if (e instanceof Error) {
      throw e;
    }
  }
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
