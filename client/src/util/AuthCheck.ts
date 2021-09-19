import { Pages } from "./Pages";

export enum DocumentActions {
  KEYWORDS = "KEYWORDS",
  REMARKS = "REMARKS",
  DELETE = "DELETE_DOCUMENT",
  VERSION = "VERSION_MANAGEMENT",
  INDEXES = "EDIT_INDEXES",
  DOWNLOAD = "DOWNLOAD",
  VIEW = "FILE_VIEWING",
}

export function checkRetrievalTemplateAuth(name: string): boolean {
  const permissions = JSON.parse(localStorage.getItem("permissions")!);
  const isAdministrator = JSON.parse(localStorage.getItem("isAdministrator")!);

  try {
    if (isAdministrator) {
      return true;
    }
    return permissions.includes(name.toUpperCase() + "_RETRIEVAL_TRUE");
  } catch (err) {
    return false;
  }
}
export function checkIndexTemplateAuth(name: string): boolean {
  const permissions = JSON.parse(localStorage.getItem("permissions")!);
  const isAdministrator = JSON.parse(localStorage.getItem("isAdministrator")!);

  try {
    if (isAdministrator) {
      return true;
    }
    return permissions.includes(name.toUpperCase() + "_INDEXING_TRUE");
  } catch (err) {
    return false;
  }
}

export function isActionAllowed(name: string, action: DocumentActions) {
  const permissions = JSON.parse(localStorage.getItem("permissions")!);
  const isAdministrator = JSON.parse(localStorage.getItem("isAdministrator")!);

  try {
    if (isAdministrator) {
      return true;
    }
    return permissions.includes(name.toUpperCase() + action + "_TRUE");
  } catch (err) {
    return false;
  }
}

export function isPageAuthorised(page: Pages): boolean {
  const permissions = JSON.parse(localStorage.getItem("permissions")!);

  const isAdministrator = JSON.parse(localStorage.getItem("isAdministrator")!);

  try {
    if (isAdministrator) {
      return true;
    }
    return permissions.includes(page + "_TRUE");
  } catch (err) {
    return false;
  }
}
