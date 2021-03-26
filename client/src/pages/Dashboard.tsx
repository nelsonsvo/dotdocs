import React, { ReactElement } from "react";
import MainBody from "../components/layouts/MainBody";
import { VertCard } from "../components/ui/VertCard";

interface Props {}

export default function Dashboard({}: Props): ReactElement {
  return (
    <div className="flex h-screen">
      <div className="grid grid-cols-2 m-auto">
        <VertCard src="unnamed.jpeg">
          <>
            <div className="flex justify-center py-1 border-b text-lg">
              <svg className="w-6 h-6 mr-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 21h7a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v11m0 5l4.879-4.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242z"></path>
              </svg>
              Retrieval Template
            </div>
            <div className="flex flex-col">
              <div className="mt-5 cursor-pointer">
                <h1>hello world</h1>
              </div>
              <div className="mt-5 cursor-pointer">
                <h1> hellow world</h1>
              </div>
              <div className="mt-5 cursor-pointer">
                <h1> hellow world</h1>
              </div>
            </div>
          </>
        </VertCard>
        <VertCard src="unnamed.jpeg">
          <>
            <div className="flex justify-center py-1 border-b text-lg">
              <svg className="w-6 h-6 mr-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
              Indexing Template
            </div>
            <div className="flex flex-col">
              <div className="mt-5 cursor-pointer">
                <h1>hello world</h1>
              </div>
              <div className="mt-5 cursor-pointer">
                <h1> hellow world</h1>
              </div>
              <div className="mt-5 cursor-pointer">
                <h1> hellow world</h1>
              </div>
            </div>
          </>
        </VertCard>
      </div>
    </div>
  );
}
