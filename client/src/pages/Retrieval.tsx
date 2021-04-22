import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import DataGrid, { SelectColumn, TextEditor } from "react-data-grid";
import { useParams } from "react-router-dom";
import RetrievalBody from "../components/layouts/RetrievalBody";
import { RetrievalContext } from "../context/RetrievalContext";
import { GET_RETRIEVAL_TEMPLATES } from "../graphql/queries/Application";

interface RetrievalProps {}
interface ParamTypes {
  id: string;
}

const Retrieval: React.FC<RetrievalProps> = () => {
  const { id } = useParams<ParamTypes>();

  const [currentTemplate, setCurrentTemplate] = useState({ id: "", name: "" });
  const [searchResults, setSearchResults] = useState<any>([]);
  const { error, data } = useQuery(GET_RETRIEVAL_TEMPLATES, {
    onCompleted: (data) => {
      setCurrentTemplate({ id: data.applications[0].id, name: data.applications[0].name });
    },
  });

  //table stuff
  const [selectedRows, setSelectedRows] = useState(() => new Set<React.Key>());

  useEffect(() => {
    if (data && id) {
      setCurrentTemplate({
        id: id,
        name: data.applications.filter((x: any) => x.id === id)[0].name,
      });
    }
  }, [id, data]);

  const getColumns = () => {
    console.log(data);
    if (data) {
      const row = data.applications.filter((x: any) => x.id === currentTemplate.id)[0];
      let cols = row.fields.map((f: any) => {
        return {
          key: f.name,
          name: f.name,
          resizable: true,
          sortable: true,
          editor: TextEditor,
        };
      });

      console.log("columns:", cols);
      cols = [SelectColumn, ...cols];
      return cols;
    }
  };

  const getRows = () => {
    if (searchResults) {
      let rows: any = [];
      searchResults.forEach((result: any, index: number) => {
        console.log(result);
        let fields: any = {};
        result.fields.forEach((f: any) => {
          console.log(f);
          fields = { ...fields, id: index, [f.name]: f.value };
        });
        rows = [...rows, fields];
      });

      console.log("rows:", rows);
      return rows;
    }
  };
  function rowKeyGetter(row: any) {
    return row.id;
  }
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
            <DataGrid
              className={"rdg-light fill-grid min-h-screen"}
              rowHeight={50}
              columns={getColumns()}
              selectedRows={selectedRows}
              onSelectedRowsChange={setSelectedRows}
              rows={getRows()}
              rowKeyGetter={rowKeyGetter}
            />
          </div>
        ) : (
          <div className="flex flex-row justify-center h-screen">
            <div className="mt-5 text-2xl text-gray-600 opacity-10 flex flex-col justify-center h-screen">
              <svg
                className="w-80 h-80"
                fill="none"
                stroke="currentColors"
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
