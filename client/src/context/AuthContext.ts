import { createContext } from "react";

export interface IAuthContext {
  auth: IAuth;
  setUserAuth: (isAuth: boolean, permissions?: string[] | undefined | null) => void;
}

export interface IAuth {
  loggedIn: boolean;
  timeLoggedIn: Number | null;
  permissions: string[] | null | undefined | string;
}

export const AuthContext = createContext<Partial<IAuthContext>>({});
