import { useQuery } from "@apollo/client";
import React from "react";
import IndexBody from "../components/layouts/IndexBody";
import { IndexContext } from "../context/IndexContext";
import { GET_RETRIEVAL_TEMPLATES } from "../graphql/queries/Application";

interface IndexProps {}

const Index: React.FC<IndexProps> = () => {
  const { loading, error, data } = useQuery(GET_RETRIEVAL_TEMPLATES);

  return (
    <IndexContext.Provider value={data}>
      <IndexBody>
        <h1>indexing place</h1>
      </IndexBody>
    </IndexContext.Provider>
  );
};

export default Index;
