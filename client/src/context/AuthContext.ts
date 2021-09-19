import { createContext } from "react";

export interface IAuthContext {
  auth: IAuth;
  setUserAuth: (isAuth: boolean, isAdministrator: boolean, permissions?: string[] | undefined | null) => void;
  clearAuthState: () => void;
}

export interface IAuth {
  loggedIn: boolean;
  timeLoggedIn: Number | null;
  permissions: string[] | null | undefined | string;
  isAdministrator: boolean;
}

export const AuthContext = createContext<Partial<IAuthContext>>({});
