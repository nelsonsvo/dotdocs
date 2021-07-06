import { IAuth } from "../context/AuthContext";
import { Pages } from "./Pages";

export function checkRetrievalTemplateAuth(name: string, auth: IAuth | undefined): boolean {
  try {
    if (auth!.permissions!.includes(name.toUpperCase() + "_RETRIEVAL_TRUE")) {
      return true;
    }
    return false;
  } catch (err) {
    return false;
  }
}

export function isPageAuthorised(page: Pages, auth: IAuth | undefined): boolean {
  try {
    if (auth!.permissions!.includes(page + "_TRUE")) {
      return true;
    }
    return false;
  } catch (err) {
    return false;
  }
}
