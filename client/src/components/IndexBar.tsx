import { useMutation, useQuery } from "@apollo/client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { NavLink } from "react-router-dom";
import { SINGLE_FILE_UPLOAD } from "../graphql/mutations/Application";
import { GET_RETRIEVAL_TEMPLATES } from "../graphql/queries/Application";

interface IndexBarProps {}

const IndexBar: React.FC<IndexBarProps> = () => {
  const [currentTemplate, setTemplate] = useState("");
  const { loading, error, data } = useQuery(GET_RETRIEVAL_TEMPLATES);
  const [uploadFile] = useMutation(SINGLE_FILE_UPLOAD, {
    onCompleted: (data) => console.log(data),
  });

  const inputRef = useRef<any>();

  const onDrop = useCallback(
    (acceptedFiles) => {
      // Do something with the files
      const file = acceptedFiles[0];

      uploadFile({
        variables: { file },
      });
    },
    [uploadFile]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  useEffect(() => {
    if (data) {
      setTemplate(data.applications[0].name);
    }
  }, [data]);

  const openFileUpload = () => {
    inputRef.current.click();
  };

  return (
    <div>
      <div className="min-h-screen w-100 flex-shrink-0 antialiased bg-white text-gray-700">
        <div className="flex flex-col bg-white h-full ">
          <div className="flex items-center justify-center">
            <NavLink to="/dashboard">
              <img className="h-12" src="/images/dotdocs.png" alt="" />
            </NavLink>
          </div>
          <div>
            <div className="text-gray-800 text-left mt-3 border-t border-b py-1 bg-gray-200 border-gray-200 text-ml">
              <h3 className="px-3 text-left text-xl tracking-widest">INDEX</h3>
            </div>
            <div className="py-5 bg-gray-100" {...getRootProps()}>
              <input {...getInputProps()} />
              {isDragActive ? <p>Drop the files here ...</p> : <p>Drop files here</p>}
            </div>
            <div>
              <div className="">
                <select
                  id="type"
                  onChange={(e) => setTemplate(e.target.value)}
                  name="type"
                  className=" block w-full py-2 px-3 border-t border-gray-200 bg-white  shadow-sm focus:outline-none focus:ring-gray-100 focus:border-gray-100 sm:text-sm"
                >
                  {!loading &&
                    data.applications.map((template: any) => {
                      return <option>{template.name}</option>;
                    })}
                </select>
              </div>
            </div>
          </div>
          <div className="overflow-y-auto overflow-x-hidden py-5 flex-grow text-left">
            {!loading && data && (
              <div className="flex flex-col gap-5 mt-3">
                {data.applications
                  .filter((template: any) => template.name === currentTemplate)
                  .map((template: any) => {
                    return template.fields.map((f: any) => {
                      console.log(f);
                      return (
                        <div className="px-2">
                          <label
                            htmlFor={f.name}
                            className="block  text-sm font-medium text-gray-700"
                          >
                            {f.name}
                          </label>
                          <input
                            type={f.type.toLowerCase()}
                            name={f.name}
                            className="mt-1 focus:ring-blue-500 focus:border-blue-500 w-full shadow-sm sm:text-sm border-gray-300 rounded-sm"
                          />
                        </div>
                      );
                    });
                  })}
              </div>
            )}
          </div>
          <div className="grid grid-cols-2 px-5 gap-3 mt-5">
            <button
              onClick={() => openFileUpload()}
              type="button"
              className="w-full justify-center py-2 px-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Upload File
            </button>

            <input type="file" className="hidden" id="uploadFile" ref={inputRef} />
            <button
              onClick={() => console.log("hello world")}
              type="button"
              className="w-full  justify-center py-2 px-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-gray-800 bg-gray-300 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Clear
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndexBar;
