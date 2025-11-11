import { UserCredentials } from "@/types/user";
import axios from "axios";
import Cookies from "js-cookie";

const BASE_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/user`;

const postSignUp = async (userCredentials: UserCredentials) => {
  const { email, password } = userCredentials;
  try {
    const response = await axios.post(
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
    const response = await axios.post(`${BASE_URL}/login`, {
      email,
      password,
    });

    if (response.status !== 200) {
      throw new Error(response.data);
    }

    console.log(response.headers);
    console.log(response.headers["set-cookie"]);
    if (response.headers["set-cookie"]) {
      Cookies.set("access_token", response.headers[0], {
        httpOnly: true,
      });
    }

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
