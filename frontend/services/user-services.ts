import { UserCredentials } from "@/types/user";
import api from "@/config/axios";

const BASE_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/users`;

const postSignUp = async (userCredentials: UserCredentials) => {
  const { email, password } = userCredentials;
  try {
    const response = await api.post(
      `${BASE_URL}/sign-up`,
      {
        email,
        password,
      },
      {
        withCredentials: true,
      }
    );

    if (response.status !== 200) {
      throw new Error(response.data);
    }

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
    const response = await api.post(`${BASE_URL}/login`, {
      email,
      password,
    });

    if (response.status !== 200) {
      throw new Error(response.data);
    }

    return response.data;
  } catch (e) {
    if (e instanceof Error) {
      throw e;
    }
  }
};

const getAuthCheck = async () => {
  try {
    const response = await api.get(`${BASE_URL}/check-auth`, {});
    return response.data;
  } catch (e) {
    if (e instanceof Error) {
      throw e;
    }
  }
};

const postLogout = async () => {
  try {
    const response = await api.post(`${BASE_URL}/logout`, {});
    return response.data;
  } catch (e) {
    if (e instanceof Error) {
      throw e;
    }
  }
};

export { postSignUp, postLogin, getAuthCheck, postLogout };
