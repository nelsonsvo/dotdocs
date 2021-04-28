import React, { ChangeEvent, useCallback, useContext, useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import { NavLink, useParams } from "react-router-dom";
import { IndexContext } from "../context/IndexContext";
import { IndexFileContext } from "../context/IndexFileContext";
import { useIndexFileMutation, useSingleUploadMutation } from "../generated/graphql";

interface IndexBarProps {}

interface IndexParams {
  id: string;
}

const IndexBar: React.FC<IndexBarProps> = () => {
  let { id } = useParams<IndexParams>();
  const selectRef = useRef<HTMLSelectElement>(null);
  console.log(id);

  //context
  const { data } = useContext(IndexContext);
  const { uploadedFiles, setUploadedFiles } = useContext(IndexFileContext);

  //form
  const { register, handleSubmit, reset } = useForm<any>();

  //state
  const [currentTemplate, setTemplate] = useState("");
  const [currentTempId, setCurrentTempId] = useState("");

  const [count, setCount] = useState(0);
  const [numberOfUploaded, setNumberUploaded] = useState(0);

  //mutations
  const [uploadFile, { loading }] = useSingleUploadMutation({
    onCompleted: (data) => {
      setUploadedFiles!([...uploadedFiles!, data.singleUpload]);
    },
    onError: (err) => console.log(err),
  });

  const [indexFile] = useIndexFileMutation({
    onCompleted: () => setCount(count + 1),
  });

  const inputRef = useRef<any>();

  const onDrop = useCallback(
    async (acceptedFiles) => {
      setNumberUploaded(acceptedFiles.length);
      //uploaded each file one by one
      //TODO: BATCH UPLOAD FOR THE FILES
      acceptedFiles.forEach(async (f: any) => {
        const file = f;

        await uploadFile({
          variables: { file, id: currentTempId },
        });
      });
    },
    [uploadFile, currentTempId]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  //set the current template from the dashboard quick link
  useEffect(() => {
    if (id && data && selectRef && selectRef.current) {
      //set template to the quick link
      const templateName = data.applications.filter((x) => x.id === id)[0].name;
      setTemplate(templateName);
      setCurrentTempId(id);
      selectRef.current.value = templateName;
    } else if (data) {
      // on first load with no template ID default to the first
      setTemplate(data.applications[0].name);
      setCurrentTempId(data.applications[0].id);
    }
  }, [id, data]);

  const setTemplateState = (e: ChangeEvent<HTMLSelectElement>) => {
    setTemplate(e.target.value);

    const index = e.target.selectedIndex;
    const selected = e.target.children[index];

    const option = selected.getAttribute("id");
    setCurrentTempId(option!);
  };

  const onSubmit = handleSubmit(async (data) => {
    if (uploadedFiles && uploadedFiles.length > 0) {
      let fieldArr: any[] = [];
      for (const [key, value] of Object.entries(data)) {
        fieldArr.push({
          id: key,
          value: value,
        });
      }
      //using a queue system FIFO so get the first file that went in
      const fileToUpload = uploadedFiles!.shift();

      await indexFile({
        variables: {
          id: fileToUpload!.id,
          fields: fieldArr,
        },
      });

      //remove the uploaded file from state
      setUploadedFiles!(uploadedFiles.filter((f) => f.id !== fileToUpload!.id));
      reset();
    }
  });

  return (
    <div>
      <div className="min-h-screen w-100 h-screen flex-shrink-0 antialiased bg-white text-gray-700 border-r">
        <form onSubmit={onSubmit}>
          <div className="flex flex-col bg-white h-screen ">
            <div className="flex items-center justify-center">
              <NavLink to="/dashboard">
                <img className="h-12" src="/images/dotdocs.png" alt="" />
              </NavLink>
            </div>
            <div>
              <div className="text-gray-800 text-left mt-3 border-t border-b py-1 bg-gray-200 border-gray-200 text-ml">
                <h3 className="px-3 tracking-widest text-center">ADD A DOCUMENT</h3>
              </div>
              <div className="py-5 bg-gray-100 mb-5" {...getRootProps()}>
                <input {...getInputProps()} accept=".pdf" />
                {isDragActive ? <p>Drop the files here ...</p> : <p>Drop files here</p>}
              </div>
              <div>
                <div className="px-4">
                  <select
                    id="type"
                    ref={selectRef}
                    onChange={(e) => setTemplateState(e)}
                    name="type"
                    className=" block w-full py-2  border-t border-gray-200 bg-white  shadow-sm focus:outline-none focus:ring-gray-100 focus:border-gray-100 sm:text-sm"
                  >
                    {data &&
                      data.applications.map((template) => {
                        return (
                          <option key={template.id} id={template.id}>
                            {template.name}
                          </option>
                        );
                      })}
                  </select>
                </div>
              </div>
            </div>
            <div className="overflow-y-auto overflow-x-hidden py-5 px-3 flex-grow text-left">
              <ul>
                {data && data && (
                  <div className="flex flex-col gap-5 mt-3">
                    {data.applications
                      .filter((template) => template.name === currentTemplate)
                      .map((template) => {
                        return template.fields.map((f) => {
                          console.log(f);
                          return (
                            <li className="px-2" key={f.id}>
                              <label
                                htmlFor={f.name}
                                className="block  text-sm font-medium text-gray-700"
                              >
                                {f.name}
                              </label>
                              <input
                                type={f.type.toLowerCase()}
                                name={f.id}
                                defaultValue={""}
                                ref={register}
                                className="mt-1 focus:ring-blue-500 focus:border-blue-500 w-full shadow-sm sm:text-sm border-gray-300 rounded-sm"
                              />
                            </li>
                          );
                        });
                      })}
                  </div>
                )}
              </ul>
            </div>
            {loading && (
              <div className="w-full h-full fixed block top-0 left-0 bg-white opacity-75 z-50">
                <span
                  className="text-blue-500  opacity-75 top-1/2 my-0 mx-auto block relative w-0 h-0"
                  style={{ top: "50%" }}
                >
                  <svg
                    className="w-24 h-24 animate-bounce"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                </span>
              </div>
            )}
            <div className="border-t">
              <div>
                {uploadedFiles && uploadedFiles.length > 0 && (
                  <p className="mt-5">
                    {count} of {numberOfUploaded} indexed
                  </p>
                )}
              </div>
              <div className="grid grid-cols-2 px-5 gap-3 mt-5 mb-5">
                <button
                  type="submit"
                  className="w-full cursor-pointer justify-center py-2 px-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Index
                </button>

                <input type="file" className="hidden" id="uploadFile" ref={inputRef} />
                <button
                  onClick={() => reset()}
                  type="button"
                  className="w-full cursor-pointer justify-center py-2 px-2 border border-transparent shadow-sm  text-sm font-medium rounded-md text-gray-800 bg-gray-300 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Clear
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default IndexBar;
