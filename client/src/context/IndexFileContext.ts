import { createContext } from "react";
export interface UploadedFile {
  id: string;
  filename: string;
  mimetype: string;
  location: string;
}
export const IndexFileContext = createContext<any>(null);
