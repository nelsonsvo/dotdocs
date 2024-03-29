import _ from "lodash";
import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import { RetrievalContext } from "../context/RetrievalContext";
import { useGetFilesLazyQuery } from "../generated/graphql";
import { checkRetrievalTemplateAuth } from "../util/AuthCheck";
import { FieldType } from "./sections/ApplicationsSection";

interface RetrievalBarProps {
  className?: string;
}

const RetrievalBar: React.FC<RetrievalBarProps> = ({ className }) => {
  const { data, currentTemplate, setCurrentTemplate, setSearchResults, setRemovedDocuments } =
    useContext(RetrievalContext);

  const keywordRef = useRef<any>();
  const [keywords, setKeywords] = useState<any>();

  const [isAuthorised, setIsAuthorised] = useState<boolean>(false);

  const { register, handleSubmit, reset } = useForm();

  const [getFiles] = useGetFilesLazyQuery({
    fetchPolicy: "network-only",
    onCompleted: (data) => {
      if (keywords) {
        const res = _.filter(data.getFiles, function (element) {
          var isMatch = false;
          _.forEach(element.fields, function (field) {
            console.log(field.value?.split(","));
            console.log(keywords.split(","));
            if (_.isEqual(_.intersection(field.value!.split(","), keywords.split(",")), keywords.split(","))) {
              isMatch = true;
              return false;
            }
          });
          return isMatch;
        });

        console.log(res);
        setSearchResults!(res);
      } else {
        console.log("search results:", data.getFiles);
        setSearchResults!(data.getFiles);
      }
    },
  });

  const setTemplateState = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const index = e.target.selectedIndex;
      const selected = e.target.children[index];

      const option = selected.getAttribute("id");

      setCurrentTemplate!({ id: option!, name: e.target.value });
      setSearchResults!([]);
    },
    [setCurrentTemplate, setSearchResults]
  );

  const searchApplication = useCallback(
    async (fieldArr) => {
      if (checkRetrievalTemplateAuth(currentTemplate!.name))
        getFiles({
          variables: {
            id: currentTemplate!.id,
            fields: fieldArr,
          },
        });
    },
    [currentTemplate, getFiles]
  );

  const onSubmit = handleSubmit((data) => {
    if (keywordRef.current) {
      setKeywords(keywordRef.current.value);
    } else {
      setKeywords(undefined);
    }

    setRemovedDocuments!([]);
    let fieldArr = [];

    for (const [key, value] of Object.entries(data)) {
      fieldArr.push({
        id: key,
        value,
      });
    }
    searchApplication(fieldArr);
  });

  const selectRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    if (selectRef && selectRef.current) {
      selectRef.current.value = currentTemplate!.name;
    }
  }, [currentTemplate]);

  useEffect(() => {
    setIsAuthorised(checkRetrievalTemplateAuth(currentTemplate!.name));
  }, [currentTemplate]);

  return (
    <div className={className}>
      <div className="min-h-screen h-screen w-100 flex-shrink-0 antialiased bg-white text-gray-700 border-r">
        <form onSubmit={onSubmit}>
          <div className="flex flex-col bg-white h-screen ">
            <div className="flex items-center justify-center">
              <NavLink to="/dashboard">
                <img className="h-12" src="/images/dotdocs.png" alt="" />
              </NavLink>
            </div>
            <div>
              <div className="text-gray-800 text-left mt-3 border-t border-b py-1 bg-gray-200 border-gray-200 text-ml mb-5">
                <h3 className="px-3 tracking-widest text-center">FIND A DOCUMENT</h3>
              </div>
              <div className="px-4">
                <div className="">
                  <select
                    id="type"
                    ref={selectRef}
                    onChange={(e) => setTemplateState(e)}
                    name="type"
                    className=" block w-full py-2 px-3 border-t border-gray-200 bg-white  shadow-sm focus:outline-none focus:ring-gray-100 focus:border-gray-100 sm:text-sm"
                  >
                    {data &&
                      data.applications.map((template) => {
                        if (checkRetrievalTemplateAuth(template.name)) {
                          return (
                            <option key={template.id} id={template.id}>
                              {template.name}
                            </option>
                          );
                        }
                        return null;
                      })}
                  </select>
                </div>
              </div>
            </div>
            <div className="overflow-y-auto overflow-x-hidden py-5 px-3 flex-grow text-left">
              {data && (
                <div className="flex flex-col gap-5 mt-3">
                  {data.applications
                    .filter((template) => template.name === currentTemplate!.name)
                    .map((template) => {
                      if (!isAuthorised) return null;
                      return template.fields.map((f) => {
                        if (f.type === FieldType.PickList) {
                          console.log("its a picklist");
                          return (
                            <div key={f.id} className="px-2">
                              <label htmlFor={f.name} className="block  text-sm font-medium text-gray-700">
                                {f.name}
                              </label>
                              <select
                                name={f.id}
                                ref={register}
                                className=" block w-full py-2 rounded-md border-t border-gray-200 bg-white  shadow-sm focus:outline-none focus:ring-gray-100 focus:border-gray-100 sm:text-sm"
                              >
                                {f.picklist_values!.map((val: string, index: number) => {
                                  return <option key={index + 10000}>{val}</option>;
                                })}
                              </select>
                            </div>
                          );
                        } else if (f.type === FieldType.Text) {
                          return (
                            <div key={f.id} className="px-2 ">
                              <label htmlFor={f.name} className="block text-sm font-medium text-gray-700">
                                {f.name}
                              </label>
                              <input
                                type={f.type.toLowerCase()}
                                name={f.id}
                                ref={register}
                                className="mt-1 rounded-md focus:ring-blue-500 focus:border-blue-500 w-full shadow-sm sm:text-sm border-gray-300 "
                              />
                            </div>
                          );
                        } else if (f.type === FieldType.Keywords) {
                          return (
                            <div key={f.id} className="px-2 order-last">
                              <label htmlFor={f.name} className="block  text-sm font-medium text-gray-700">
                                {f.name}
                              </label>
                              <input
                                type={"text"}
                                name={f.name}
                                ref={keywordRef}
                                className="mt-1 focus:ring-blue-500 focus:border-blue-500 w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                              />
                            </div>
                          );
                        } else if (f.type === FieldType.Date) {
                          return (
                            <div className="px-2" key={f.id}>
                              <label htmlFor={f.name} className="block  text-sm font-medium text-gray-700">
                                {f.name}
                              </label>
                              <input
                                type="date"
                                name={f.id}
                                maxLength={f.max_length}
                                ref={register}
                                className="mt-1 focus:ring-blue-500 focus:border-blue-500 w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                              />
                            </div>
                          );
                        } else if (f.type === FieldType.Number) {
                          return (
                            <div className="px-2" key={f.id}>
                              <label htmlFor={f.name} className="block  text-sm font-medium text-gray-700">
                                {f.name}
                              </label>
                              <input
                                type={f.type}
                                name={f.id}
                                max={f.max_length}
                                ref={register}
                                className="mt-1 focus:ring-blue-500 focus:border-blue-500 w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                              />
                            </div>
                          );
                        }
                      });
                    })}
                </div>
              )}
            </div>
            <div className="object-bottom mb-5 border-t">
              <div className="grid grid-cols-2 px-5 gap-3 mt-5 ">
                <button
                  disabled={!isAuthorised}
                  type="submit"
                  className="w-full justify-center py-2 px-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                >
                  Search
                </button>
                <button
                  onClick={() => reset()}
                  disabled={!isAuthorised}
                  type="button"
                  className="w-full justify-center py-2 px-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-gray-800 bg-gray-300 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
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

export default RetrievalBar;
