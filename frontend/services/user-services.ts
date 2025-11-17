import { EditableUser, UserCredentials } from "@/types/user";
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

const deleteUser = async () => {
  try {
    const response = await api.delete(`${BASE_URL}/delete`, {});
    return response.data;
  } catch (e) {
    if (e instanceof Error) {
      throw e;
    }
  }
};

const patchUser = async (editableUser: EditableUser) => {
  try {
    const response = await api.patch(`${BASE_URL}/`, editableUser);
    return response.data;
  } catch (e) {
    if (e instanceof Error) {
      throw e;
    }
  }
};

export {
  postSignUp,
  postLogin,
  getAuthCheck,
  postLogout,
  deleteUser,
  patchUser,
};
