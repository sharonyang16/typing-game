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

export type AuthContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  signUp: (userCredentials: UserCredentials) => Promise<void>;
  login: (userCredentials: UserCredentials) => Promise<void>;
  checkAuth: () => Promise<void>;
  logout: () => Promise<void>;
  deleteAccount: () => Promise<void>;
};
