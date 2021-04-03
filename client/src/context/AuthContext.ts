import { createContext, Dispatch, SetStateAction } from "react";

export interface IAuthContext {
  auth: boolean;
  setAuth: Dispatch<SetStateAction<boolean>>;
  userType: string;
}

export interface IAuth {
  loggedIn: boolean;
  userType: string | null;
  timeLoggedIn: Date | null;
}

export const AuthContext = createContext<IAuthContext | any>(null);
