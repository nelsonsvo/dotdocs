import { Pages } from "./Pages";

export function checkRetrievalTemplateAuth(name: string): boolean {
  const permissions = JSON.parse(localStorage.getItem("permissions")!);

  try {
    return permissions.includes(name.toUpperCase() + "_RETRIEVAL_TRUE");
  } catch (err) {
    return false;
  }
}
export function checkIndexTemplateAuth(name: string): boolean {
  const permissions = JSON.parse(localStorage.getItem("permissions")!);
  try {
    return permissions.includes(name.toUpperCase() + "_INDEXING_TRUE");
  } catch (err) {
    return false;
  }
}

export function isPageAuthorised(page: Pages): boolean {
  const permissions = JSON.parse(localStorage.getItem("permissions")!);

  try {
    return permissions.includes(page + "_TRUE");
  } catch (err) {
    return false;
  }
}
