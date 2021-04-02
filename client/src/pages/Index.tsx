import { useQuery } from "@apollo/client";
import React, { useMemo, useState } from "react";
import Iframe from "react-iframe";
import IndexBody from "../components/layouts/IndexBody";
import { IndexContext } from "../context/IndexContext";
import { IndexFileContext, UploadedFile } from "../context/IndexFileContext";
import { GET_RETRIEVAL_TEMPLATES } from "../graphql/queries/Application";

interface IndexProps {}

const Index: React.FC<IndexProps> = () => {
  const FILE_SERVER_URL = process.env.REACT_APP_FILE_SERVER_URL;
  const { loading, error, data } = useQuery(GET_RETRIEVAL_TEMPLATES);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);

  const indexFileValue = useMemo(() => ({ uploadedFiles, setUploadedFiles }), [
    uploadedFiles,
    setUploadedFiles,
  ]);

  return (
    <IndexContext.Provider value={{ data, error }}>
      <IndexFileContext.Provider value={indexFileValue}>
        <IndexBody>
          {uploadedFiles.length > 0 ? (
            <Iframe
              url={FILE_SERVER_URL + uploadedFiles[0].location}
              id="myId"
              className="w-full h-full "
              position="absolute"
            />
          ) : (
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
                    d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
            </div>
          )}
        </IndexBody>
      </IndexFileContext.Provider>
    </IndexContext.Provider>
  );
};

export default Index;
