import { createContext, SetStateAction } from "react";
export interface UploadedFile {
  id: string;
  filename: string;
  mimetype: string;
  location: string;
}

export type IndexFileContextType = {
  uploadedFiles: UploadedFile[];
  setUploadedFiles: React.Dispatch<SetStateAction<UploadedFile[]>>;
};
export const IndexFileContext = createContext<Partial<IndexFileContextType>>({});
