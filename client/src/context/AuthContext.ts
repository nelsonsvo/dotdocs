import { createContext } from "react";

export interface IAuthContext {
  auth: IAuth;
  setUserAuth: (isAuth: boolean, userType?: string) => void;
  userType: string;
}

export interface IAuth {
  loggedIn: boolean;
  userType: string | null;
  timeLoggedIn: Number | null;
}

export const AuthContext = createContext<IAuthContext | any>(null);
