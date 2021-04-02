import { useQuery } from "@apollo/client";
import React from "react";
import RetrievalBody from "../components/layouts/RetrievalBody";
import { RetrievalContext } from "../context/RetrievalContext";
import { GET_RETRIEVAL_TEMPLATES } from "../graphql/queries/Application";

interface RetrievalProps {}

const Retrieval: React.FC<RetrievalProps> = () => {
  const { loading, error, data, refetch } = useQuery(GET_RETRIEVAL_TEMPLATES);

  return (
    <RetrievalContext.Provider value={{ data, error }}>
      <RetrievalBody>
        <div className="flex flex-row justify-center h-screen">
          <div className="mt-5 text-2xl text-gray-600 opacity-10 flex flex-col justify-center h-screen">
            <svg
              className="w-80 h-80"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="0.75"
                d="M10 21h7a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v11m0 5l4.879-4.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242z"
              />
            </svg>
          </div>
        </div>
      </RetrievalBody>
    </RetrievalContext.Provider>
  );
};

export default Retrieval;
