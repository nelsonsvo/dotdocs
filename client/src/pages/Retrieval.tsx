import { useQuery } from "@apollo/client";
import React, { useState } from "react";
import RetrievalBody from "../components/layouts/RetrievalBody";
import { RetrievalContext } from "../context/RetrievalContext";
import { GET_RETRIEVAL_TEMPLATES } from "../graphql/queries/Application";

interface RetrievalProps {}

const Retrieval: React.FC<RetrievalProps> = () => {
  const [currentTemplate, setCurrentTemplate] = useState({ id: "", name: "" });
  const [searchResults, setSearchResults] = useState<any>([]);
  const { error, data } = useQuery(GET_RETRIEVAL_TEMPLATES, {
    onCompleted: (data) => {
      setCurrentTemplate({ id: data.applications[0].id, name: data.applications[0].name });
    },
  });

  return (
    <RetrievalContext.Provider
      value={{ data, error, currentTemplate, setCurrentTemplate, setSearchResults }}
    >
      <RetrievalBody>
        {searchResults.length > 0 ? (
          <div className="flex flex-col">
            <div className="flex flex-row px-3 py-3 bg-gray-50 border-b border-r justify-start gap-2 text-sm font-light text-gray-800">
              <button className=" justify-center py-2 px-2 border border-transparent  rounded-sm   hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                <h1>View</h1>
              </button>
              <button className=" justify-center py-2 px-2 border border-transparent   rounded-sm   hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                <h1>Remarks</h1>
              </button>
              <button className=" justify-center py-2 px-2 border border-transparent   rounded-sm   hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                <h1>Keywords</h1>
              </button>
              <button className=" justify-center py-2 px-2 border border-transparent   rounded-sm   hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                <h1>Download</h1>
              </button>
              <button className=" justify-center py-2 px-2 border border-transparent   rounded-sm   hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                <h1>Remove</h1>
              </button>
              <button className=" justify-center py-2 px-2 border border-transparent   rounded-sm   hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                <h1>Delete</h1>
              </button>
            </div>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="border-r"></th>
                  {data.applications
                    .filter((x: any) => x.id === currentTemplate.id)[0]
                    .fields.map((f: any) => {
                      console.log(f.name);
                      return (
                        <th
                          scope="col"
                          className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          {f.name}
                        </th>
                      );
                    })}
                </tr>
              </thead>
              <tbody className="bg-white divide-y  divide-gray-200">
                {searchResults.map((result: any) => {
                  return (
                    <tr className="text-left" onClick={() => console.log(result.filename)}>
                      <td className="text-md text-center text-gray-800 py-4 whitespace-nowrap border-r">
                        <input type="checkbox" className="form-checkbox h-5 w-5 text-orange-600" />
                      </td>
                      {result.fields.map((f: any) => {
                        return (
                          <td className="text-md text-gray-800 px-3 py-3 border-b whitespace-nowrap ">
                            {f.value}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
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
                  d="M10 21h7a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v11m0 5l4.879-4.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242z"
                />
              </svg>
            </div>
          </div>
        )}
      </RetrievalBody>
    </RetrievalContext.Provider>
  );
};

export default Retrieval;
