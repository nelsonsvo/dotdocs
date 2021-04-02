import { useQuery } from "@apollo/client";
import React, { useState } from "react";
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

  return (
    <IndexContext.Provider value={{ data, error }}>
      <IndexFileContext.Provider value={{ uploadedFiles, setUploadedFiles }}>
        <IndexBody>
          {uploadedFiles.length > 0 ? (
            <Iframe
              url={FILE_SERVER_URL + uploadedFiles[0].location}
              id="myId"
              className="w-full h-full"
              position="relative"
            />
          ) : (
            <div className="mt-5 text-2xl">There are no files left to index..</div>
          )}
        </IndexBody>
      </IndexFileContext.Provider>
    </IndexContext.Provider>
  );
};

export default Index;
