import { useQuery } from "@apollo/client";
import React from "react";
import RetrievalBody from "../components/layouts/RetrievalBody";
import { RetrievalContext } from "../context/RetrievalContext";
import { GET_RETRIEVAL_TEMPLATES } from "../graphql/queries/Application";

interface RetrievalProps {}

const Retrieval: React.FC<RetrievalProps> = () => {
  const { loading, error, data, refetch } = useQuery(GET_RETRIEVAL_TEMPLATES);

  return (
    <RetrievalContext.Provider value={data}>
      <RetrievalBody>
        <h1>hello world</h1>
      </RetrievalBody>
    </RetrievalContext.Provider>
  );
};

export default Retrieval;
