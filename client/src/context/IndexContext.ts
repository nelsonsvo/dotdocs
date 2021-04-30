import { ApolloError } from "@apollo/client";
import { createContext } from "react";
import { GetRetrievalTemplatesQuery } from "./../generated/graphql";

export type IndexContextType = {
  data: GetRetrievalTemplatesQuery | null;
  error: ApolloError | null;
};

export const IndexContext = createContext<Partial<IndexContextType>>({});
