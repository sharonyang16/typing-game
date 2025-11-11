import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import { AuthServiceResponse, UserCredentials } from "../types/user";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "../config/firebase";

const userRepository = AppDataSource.getRepository(User);

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
    const newUser = userRepository.create({
      email,
      firebaseId,
      dateJoined: new Date(),
    });

    const user = await userRepository.save(newUser);
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

    const user = await userRepository.findOneBy({
      firebaseId: userCredential.user.uid,
    });

    const idToken = await userCredential.user.getIdToken();

    return { user, idToken };
  } catch (e) {
    if (e instanceof Error) {
      throw e;
    }
  }
};
