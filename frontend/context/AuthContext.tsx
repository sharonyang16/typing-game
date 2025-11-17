"use client";
import {
  createContext,
  ReactElement,
  ReactNode,
  useContext,
  useState,
} from "react";
import { AuthContextType, User, UserCredentials } from "@/types/user";
import {
  deleteUser,
  getAuthCheck,
  postLogin,
  postLogout,
  postSignUp,
} from "@/services/user-services";
import { AxiosError } from "axios";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};

const AuthProvider = ({
  children,
}: Readonly<{ children: ReactNode }>): ReactElement => {
  const [user, setUser] = useState<User | null>(null);

  const signUp = async (userCredentials: UserCredentials): Promise<void> => {
    try {
      const user = await postSignUp(userCredentials);
      setUser(user);
    } catch (e) {
      if (e instanceof AxiosError) {
        throw new Error(e.response?.data);
      }
    }

    return;
  };

  const login = async (userCredentials: UserCredentials): Promise<void> => {
    try {
      const user = await postLogin(userCredentials);
      setUser(user);
    } catch (e) {
      if (e instanceof AxiosError) {
        throw new Error(e.response?.data);
      }
    }

    return;
  };

  const checkAuth = async (): Promise<void> => {
    try {
      const user = await getAuthCheck();
      setUser(user);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      // do nothing
    }

    return;
  };

  const logout = async (): Promise<void> => {
    try {
      setUser(null);
      await postLogout();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      // do nothing
    }
    return;
  };

  const deleteAccount = async (): Promise<void> => {
    try {
      await deleteUser();
      setUser(null);
    } catch (e) {
      if (e instanceof AxiosError) {
        throw new Error(e.response?.data);
      }
    }
    return;
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, signUp, login, checkAuth, logout, deleteAccount }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, useAuthContext };
