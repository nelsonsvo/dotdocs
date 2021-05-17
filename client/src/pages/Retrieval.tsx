import JsFileDownloader from "js-file-downloader";
import moment from "moment";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import DataGrid, { SelectColumn, SortDirection, TextEditor } from "react-data-grid";
import Iframe from "react-iframe";
import { useParams } from "react-router-dom";
import RetrievalBody from "../components/layouts/RetrievalBody";
import { FieldType } from "../components/settings/Applications";
import RemarksDialog from "../components/ui/RemarksDialog";
import { RetrievalContext } from "../context/RetrievalContext";
import { GetFilesQuery, useDeleteFilesMutation, useGetRetrievalTemplatesQuery } from "../generated/graphql";

interface RetrievalProps {}
interface ParamTypes {
  id: string;
}

type Row = {
  id: string;
};

const Retrieval: React.FC<RetrievalProps> = () => {
  const { id } = useParams<ParamTypes>();

  const FILE_SERVER_URL = process.env.REACT_APP_FILE_SERVER_URL;

  const [[sortColumn, sortDirection], setSort] = useState<[string, SortDirection]>(["", "NONE"]);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [singleFileUrl, setSingleFileUrl] = useState<string | null>(null);
  const [removedDocuments, setRemovedDocuments] = useState<string[]>([]);

  //modal
  const [modalOpen, setModalOpen] = useState(false);
  const [fileId, setFileId] = useState("");

  const [currentTemplate, setCurrentTemplate] = useState({ id: "", name: "" });
  const [searchResults, setSearchResults] = useState<GetFilesQuery["getFiles"]>();
  const { error, data } = useGetRetrievalTemplatesQuery({
    onCompleted: (data) => {
      setCurrentTemplate({ id: data.applications[0].id, name: data.applications[0].name });
    },
  });

  const [deleteFiles] = useDeleteFilesMutation();

  //table stuff
  const [selectedRows, setSelectedRows] = useState(() => new Set<React.Key>());

  useEffect(() => {
    if (data && id) {
      setCurrentTemplate({
        id: id,
        name: data.applications.filter((x) => x.id === id)[0].name,
      });
    }
  }, [id, data]);

  const getColumns = () => {
    console.log(data);
    if (data) {
      const row = data.applications.filter((x) => x.id === currentTemplate.id)[0];

      let cols: any = row.fields.map((f) => {
        return {
          key: f.name,
          name: f.name,
          resizable: true,
          sortable: true,
          editor: TextEditor,
        };
      });

      const indicators = {
        key: "indicators",
        name: "Indicators",
        width: 200,
        resizable: true,
        frozen: true,
      };

      console.log("columns:", cols);
      cols = [SelectColumn, { ...indicators }, ...cols];
      return cols;
    }
  };

  const getRows = useCallback(() => {
    if (searchResults) {
      let rows: any = [];
      searchResults.forEach((result) => {
        if (!removedDocuments.includes(result.id)) {
          console.log(result);
          let fields = {};
          result.fields.forEach((f) => {
            console.log(removedDocuments);
            console.log(f.id);
            let fieldValue = f.value;
            if (f.field.type === FieldType.Date) {
              moment.locale("gb");
              fieldValue = moment(f.value).format("DD/MM/YYYY");
            }
            fields = {
              ...fields,
              id: result.id,
              [f.name!]: fieldValue,
              indicators: result.remarks.length > 0 && (
                <svg
                  className="w-6 h-6 text-gray-500 mt-3 mx-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                  />
                </svg>
              ),
            };
          });
          rows = [...rows, fields];
        }
      });

      console.log("rows:", rows);
      return rows;
    }
  }, [searchResults, removedDocuments]);

  const rowKeyGetter = (row: Row) => {
    return row.id;
  };

  //for viewing a document or multiple documents
  const viewDocument = () => {
    if (searchResults) {
      if (selectedRows.size === 1) {
        selectedRows.forEach((value) => {
          console.log(value);
          const res = searchResults.find((f) => f.id === value);
          console.log(res!.location);

          setFileUrl(FILE_SERVER_URL + res!.location);
          setSingleFileUrl(`/viewer/${res!.location.replaceAll("/", "_")}`);

          // window.open(`/viewer/${res!.location.replaceAll("/", "_")}`, "_blank");
        });
      } else if (selectedRows.size > 1) {
        selectedRows.forEach((value) => {
          const res = searchResults.find((f) => f.id === value);
          console.log(res);
          console.log("opening", res!.location);

          window.open(`/viewer/${res!.location.replaceAll("/", "_")}`, "_blank");
        });
      }
    }
  };
  //for downloading a document or multiple documents
  const downloadDocument = () => {
    if (searchResults) {
      if (selectedRows.size === 1) {
        selectedRows.forEach((value) => {
          console.log(value);
          const res = searchResults.find((f) => f.id === value);
          console.log(res!.location);

          console.log("downloading", res!.location);
          new JsFileDownloader({
            url: res!.location,
            autoStart: true,
          });
        });
      } else if (selectedRows.size > 1) {
        selectedRows.forEach((value) => {
          const res = searchResults.find((f) => f.id === value);
          console.log(res);
          console.log("downloading", res!.location);
          new JsFileDownloader({
            url: res!.location,
            autoStart: true,
          });
        });
      }
    }
  };

  const removeDocument = () => {
    let arr: string[] = [];

    selectedRows.forEach((val) => {
      arr.push(val.toString());
    });

    setRemovedDocuments([...removedDocuments, ...arr]);
  };

  const deleteRow = () => {
    let arr: string[] = [];

    selectedRows.forEach((val) => {
      arr.push(val.toString());
    });
    try {
      deleteFiles({
        variables: {
          id: arr,
        },
        //remove from the cache manually
        update(cache) {
          arr.forEach((id) => {
            const normalizedId = cache.identify({ id, __typename: "AppFile" });
            cache.evict({ id: normalizedId });
            cache.gc();
          });
        },
      });
    } catch {
      console.log("error when deleting rows");
    }
  };

  const openSingleFile = () => {
    if (singleFileUrl) {
      window.open(singleFileUrl, "_blank");
    }
  };

  const handleSort = useCallback((columnKey: string, direction: SortDirection) => {
    setSort([columnKey, direction]);
  }, []);

  const sortedRows = useMemo(() => {
    console.log(sortDirection);
    if (sortDirection === "NONE") return getRows();

    let sortedRows = [...getRows()];

    console.log(sortedRows);

    sortedRows = sortedRows.sort((a: any, b: any) => {
      if (Object.keys(a).length !== 0) {
        return a[sortColumn].localeCompare(b[sortColumn]);
      }
    });

    return sortDirection === "DESC" ? sortedRows.reverse() : sortedRows;
  }, [getRows, sortDirection, sortColumn]);

  const viewRemarks = () => {
    selectedRows.forEach((val) => {
      setFileId(val.toString());
    });
    setModalOpen(true);
  };

  return (
    <RetrievalContext.Provider
      value={{ data, error, currentTemplate, setCurrentTemplate, setSearchResults, setRemovedDocuments }}
    >
      <RetrievalBody>
        <RemarksDialog isOpen={modalOpen} setModalOpen={setModalOpen} fileId={fileId} />
        {searchResults && searchResults.length > 0 ? (
          <div className="flex flex-col w-full">
            {selectedRows.size > 0 ? (
              <div className="flex flex-row justify-between w-full px-3 py-3 transition duration-1000 ease-in-out bg-gray-300 border-b border-r gap-2 text-sm font-light text-gray-800">
                {!fileUrl && (
                  <div className="justify-start space-x-2">
                    <button
                      onClick={() => viewDocument()}
                      className=" py-2 px-2 border border-transparent  rounded-md   bg-white  hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      View
                    </button>
                    {selectedRows.size === 1 && (
                      <button
                        onClick={viewRemarks}
                        className="py-2 px-2 border border-transparent   rounded-md bg-white  hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        Remarks
                      </button>
                    )}
                    <button
                      onClick={downloadDocument}
                      className="py-2 px-2 border border-transparent   rounded-md  bg-white  hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Download
                    </button>
                    <button
                      onClick={removeDocument}
                      className="py-2 px-2 border border-transparent   rounded-md  bg-white  hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Remove
                    </button>
                    <button
                      onClick={deleteRow}
                      className="py-2 px-2 border border-transparent   rounded-md   bg-white  hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Delete
                    </button>
                  </div>
                )}

                {fileUrl && (
                  <div className="justify-end space-x-2">
                    <button
                      onClick={() => setFileUrl("")}
                      className="py-2 px-2 border border-transparent   rounded-md  bg-gray-300  hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Back
                    </button>
                    <button
                      onClick={() => openSingleFile()}
                      className="py-2 px-2 border border-transparent   rounded-md text-white  bg-blue-600  hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Open in New Tab
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div
                className={`flex justify-center flex-row px-3 py-3 bg-gray-100 border gap-2 text-sm font-light text-gray-800 my-auto`}
              >
                <h1 className="text-xl tracking-wider font-light font-antialiased my-auto ">Search Results</h1>
                <svg
                  className="w-7 h-7 my-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M8 16l2.879-2.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242zM21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            )}
            {fileUrl ? (
              <Iframe url={fileUrl!} className="min-h-screen w-full object-cover" position="relative" />
            ) : (
              <DataGrid
                className={"rdg-light fill-grid min-h-screen "}
                rowHeight={50}
                columns={getColumns()}
                selectedRows={selectedRows}
                onSelectedRowsChange={setSelectedRows}
                rows={sortedRows}
                sortColumn={sortColumn}
                sortDirection={sortDirection}
                onSort={handleSort}
                rowKeyGetter={rowKeyGetter}
              />
            )}
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
