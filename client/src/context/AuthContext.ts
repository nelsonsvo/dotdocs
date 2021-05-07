import { createContext } from "react";

export interface IAuthContext {
  auth: IAuth;
  setUserAuth: (isAuth: boolean) => void;
  userType: string;
}

export interface IAuth {
  loggedIn: boolean;
  timeLoggedIn: Number | null;
}

export const AuthContext = createContext<IAuthContext | any>(null);
