import { QueryFailedError } from "typeorm";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import { UserCredentials } from "../types/user";

const userRepository = AppDataSource.getRepository(User);

export const addUser = async (
  userCredentials: UserCredentials
): Promise<User> => {
  const { email, firebaseId } = userCredentials;

  const newUser = new User();
  newUser.email = email;
  newUser.firebaseId = firebaseId;
  newUser.dateJoined = new Date();

  try {
    const user = await userRepository.save(newUser);

    return user;
  } catch (e) {
    if (e instanceof QueryFailedError) {
      throw e;
    }
  }
};
