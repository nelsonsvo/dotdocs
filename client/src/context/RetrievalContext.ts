import { ApolloError } from "@apollo/client";
import { createContext, Dispatch, SetStateAction } from "react";
import { GetFilesQuery, GetRetrievalTemplatesQuery } from "../generated/graphql";

export type RetrievalContextType = {
  data: GetRetrievalTemplatesQuery;
  error: ApolloError;
  currentTemplate: { id: string; name: string };
  setCurrentTemplate: Dispatch<SetStateAction<{ id: string; name: string }>>;
  setSearchResults: (results: GetFilesQuery["getFiles"] | []) => void;
  setRemovedDocuments: React.Dispatch<React.SetStateAction<string[]>>;
};

export const RetrievalContext = createContext<Partial<RetrievalContextType>>({});
