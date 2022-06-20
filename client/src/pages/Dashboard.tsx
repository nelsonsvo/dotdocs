import React, { ReactElement } from "react";
import { NavLink } from "react-router-dom";
import MainBody from "../components/layouts/MainBody";
import { useGetApplicationsQuery } from "../generated/graphql";
import { checkIndexTemplateAuth, checkRetrievalTemplateAuth } from "../util/AuthCheck";

interface Props {}

export default function Dashboard({}: Props): ReactElement {
  const { loading, data, error } = useGetApplicationsQuery();

  return (
    <MainBody>
      <div className="flex flex-col h-screen mx-20">
        <div className="grid grid-cols-10">
          <div className="col-span-10">
            <div className="bg-white border-l-2 border-blue-500 w-100 py-8 px-10 mt-12 rounded-sm shadow-md">
              <div className="flex flex-col w-full h-full">
                <div>
                  <h1 className="text-gray-800 text-4xl text-left">Welcome, {sessionStorage.username}</h1>
                </div>
                <NavLink
                  to="/retrieval"
                  className="transition duration-500 ease-in-out transform hover:-translate-y-1 "
                >
                  <div className="flex flex-row mt-5">
                    <div>
                      <svg
                        className="w-6 h-6 mr-3 text-gray-700"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M10 21h7a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v11m0 5l4.879-4.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242z"
                        ></path>
                      </svg>
                    </div>
                    <p className="text-gray-700 text-lg ">Find a document</p>
                  </div>
                </NavLink>
                <NavLink to="/index" className="transition duration-500 ease-in-out transform hover:-translate-y-1 ">
                  <div className="flex flex-row mt-5">
                    <div>
                      <svg
                        className="w-6 h-6 mr-3 text-gray-700"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        ></path>
                      </svg>
                    </div>
                    <div className="text-gray-700 text-lg">Add a document</div>
                  </div>
                </NavLink>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-between mt-5 gap-3">
          <div className="w-1/2 bg-white px-5 border-gray-300 shadow-sm border py-5">
            <div className="flex flex-col h-full text-left space-y-3">
              <h1 className=" text-gray-800 text-xl border-b">Retrieval Templates</h1>
              <ul>
                {!loading &&
                  data &&
                  data.applications.map((app, index: number) => {
                    if (checkRetrievalTemplateAuth(app.name)) {
                      return (
                        <NavLink to={"/retrieval/" + app.id} className="text-gray-700 text-lg ">
                          <div key={index} className="flex items-center space-x-1 hover:bg-gray-100 py-2 px-2 rounded-md">
                            {app.name}
                          </div>
                        </NavLink>
                      );
                    }
                    return null;
                  })}
              </ul>
            </div>
          </div>
          <div className="w-1/2 bg-white px-5 border-gray-300 shadow-sm border py-5">
            <div className="flex flex-col h-full text-left space-y-3">
              <div className="flex border-b items-center space-x-2">
                <h1 className=" text-gray-800 text-xl">Indexing Templates</h1>
              </div>
              <ul>
                {!loading &&
                  data &&
                  data.applications.map((app, index: number) => {
                    if (checkIndexTemplateAuth(app.name)) {
                      return (
                        <NavLink to={"/index/" + app.id} className="text-gray-700 text-lg">
                          <div key={index} className="flex items-center space-x-1 hover:bg-gray-100 py-2 px-2 rounded-md">
                              {app.name}
                          </div>
                        </NavLink>
                      );
                    }
                    return null;
                  })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </MainBody>
  );
}
