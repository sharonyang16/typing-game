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
  getAuthCheck,
  postLogin,
  postLogout,
  postSignUp,
} from "@/services/user-services";

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
    const user = await postSignUp(userCredentials);
    setUser(user);

    return;
  };

  const login = async (userCredentials: UserCredentials): Promise<void> => {
    const user = await postLogin(userCredentials);
    console.log(user);
    setUser(user);

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
      await postLogout();
      setUser(null);
    } catch (e) {
      console.error(e);
    }
    return;
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, signUp, login, checkAuth, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, useAuthContext };
