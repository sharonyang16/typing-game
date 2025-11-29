export type User = {
  email: string;
  username?: string;
  firebaseId: string;
  dateJoined: Date;
  id: number;
};

export type UserCredentials = {
  email: string;
  password: string;
};

export interface AuthRequestFields extends UserCredentials {
  staySignedIn?: boolean;
}

export type AuthContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  signUp: (userCredentials: AuthRequestFields) => Promise<void>;
  login: (userCredentials: AuthRequestFields) => Promise<void>;
  checkAuth: () => Promise<void>;
  logout: () => Promise<void>;
  deleteAccount: () => Promise<void>;
};

export type EditableUser = {
  username?: string;
};
