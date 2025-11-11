import { UserCredentials } from "@/types/user";
import axios from "axios";

const BASE_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/user`;

const postSignUp = async (userCredentials: UserCredentials) => {
  const { email, password } = userCredentials;
  try {
    const response = await axios.post(`${BASE_URL}/sign-up`, {
      email,
      password,
    });
    return response.data;
  } catch (e) {
    if (e instanceof Error) {
      throw e;
    }
  }
};

const postLogin = async (userCredentials: UserCredentials) => {
  const { email, password } = userCredentials;
  try {
    const response = await axios.post(`${BASE_URL}/login`, {
      email,
      password,
    });
    return response.data;
  } catch (e) {
    if (e instanceof Error) {
      throw e;
    }
  }
};

const getAuthCheck = async (cookie: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/check-auth`, {
      headers: { Cookie: `access_token=${cookie}` },
    });
    return response.data;
  } catch (e) {
    if (e instanceof Error) {
      throw e;
    }
  }
};

const postLogout = async () => {
  try {
    const response = await axios.post(`${BASE_URL}/logout`, {});
    return response.data;
  } catch (e) {
    if (e instanceof Error) {
      throw e;
    }
  }
};

export { postSignUp, postLogin, getAuthCheck, postLogout };
