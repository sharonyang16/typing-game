import {
  createContext,
  ReactElement,
  ReactNode,
  useContext,
  useState,
} from "react";
import { cookies } from "next/headers";
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
    try {
      const { user } = await postSignUp(userCredentials);
      setUser(user);
    } catch (_) {
      // Do Nothing
    }
    return;
  };

  const login = async (userCredentials: UserCredentials): Promise<void> => {
    try {
      const { user } = await postLogin(userCredentials);
      setUser(user);
    } catch (_) {
      // Do Nothing
    }
    return;
  };

  const checkAuth = async (): Promise<void> => {
    const cookieStore = await cookies();
    const idToken = cookieStore.get("access_token");

    if (idToken) {
      const user = await getAuthCheck(idToken.value);
      setUser(user);
    }

    return;
  };

  const logout = async (): Promise<void> => {
    try {
      await postLogout();
      setUser(null);
    } catch (_) {}
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
