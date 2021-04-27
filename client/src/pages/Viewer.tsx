import React from "react";
import Iframe from "react-iframe";
import { useParams } from "react-router-dom";

interface ParamTypes {
  file: string;
}

interface ViewerProps {}

const Viewer: React.FC<ViewerProps> = () => {
  const FILE_SERVER_URL = process.env.REACT_APP_FILE_SERVER_URL;

  const { file } = useParams<ParamTypes>();

  console.log(FILE_SERVER_URL + file.replaceAll("_", "/"));

  return (
    <div className="flex flex-col min-h-screen h-screen">
      <div className="flex py-2 px-2 bg-gray-100 w-screen">
        <img className="h-10 md:h-12 my-auto" src="/images/dotdocs.png" alt="" />
        <h1 className="my-auto text-2xl text-gray-800 font-light justify-end w-full">
          File Viewer
        </h1>
      </div>
      <Iframe
        url={FILE_SERVER_URL + file.replaceAll("_", "/")}
        id="viewer"
        className="w-full h-full"
        position="relative"
      />
    </div>
  );
};

export default Viewer;
