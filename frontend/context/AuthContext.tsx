import {
  createContext,
  ReactElement,
  ReactNode,
  useContext,
  useState,
} from "react";
import { AuthContextType, User, UserCredentials } from "@/types/user";

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
    return;
  };

  const login = async (userCredentials: UserCredentials): Promise<void> => {
    return;
  };

  const checkAuth = async (): Promise<void> => {
    return;
  };

  const logout = async (): Promise<void> => {
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
