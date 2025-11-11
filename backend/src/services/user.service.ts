import { QueryFailedError } from "typeorm";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import { AddUserServiceResponse, UserCredentials } from "../types/user";
import { getAuth, createUserWithEmailAndPassword } from "../config/firebase";

const userRepository = AppDataSource.getRepository(User);

const auth = getAuth();

export const addUser = async (
  userCredentials: UserCredentials
): Promise<AddUserServiceResponse> => {
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
    if (e instanceof QueryFailedError) {
      throw e;
    }
  }
};
