import AppDataSource from "../data-source.js";
import { User } from "../entity/User.js";
import { AuthServiceResponse, UserCredentials } from "../types/user";
import {
  admin,
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "../config/firebase.js";

const userRepository = AppDataSource.getRepository(User);

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
  const newUser = userRepository.create({
    email,
    firebaseId,
    dateJoined: new Date(),
  });

  const user = await userRepository.save(newUser);
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

  const user = await userRepository.findOneBy({
    firebaseId: userCredential.user.uid,
  });

  if (!user) {
    throw new Error("User not found");
  }

  const idToken = await userCredential.user.getIdToken();

  return { user, idToken };
};

export const verifyUser = async (idToken: string): Promise<User> => {
  const decodedToken = await admin.auth().verifyIdToken(idToken);

  const user = await userRepository.findOneBy({
    firebaseId: decodedToken.uid,
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
