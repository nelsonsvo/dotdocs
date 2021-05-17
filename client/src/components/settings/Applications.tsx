import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import {
  GetApplicationsDocument,
  useCreateApplicationMutation,
  useDeleteApplicationMutation,
  useGetApplicationsQuery,
} from "../../generated/graphql";
import ApplicationCard from "../cards/ApplicationCard";
import Modal from "../ui/Modal";
import SettingSectionCard from "../ui/SettingSectionCard";

interface ApplicationsProps {}

export enum FieldType {
  PickList = "Pick List",
  Date = "Date",
  Text = "Text",
  Number = "Number",
  Keywords = "Keywords",
}

type FormInputs = {
  app_name: string;
  name: string;
  type: string;
  max_length?: string;
};

interface ICurrentFields {
  name: string;
  type: string;
  max_length: number;
  picklist_values: string[];
}
const Applications: React.FC<ApplicationsProps> = () => {
  const [createApplication] = useCreateApplicationMutation({
    refetchQueries: [{ query: GetApplicationsDocument }],
  });

  const [deleteApplication] = useDeleteApplicationMutation({
    errorPolicy: "all",
  });

  const { loading, data } = useGetApplicationsQuery({
    fetchPolicy: "cache-and-network",
  });

  const { register, handleSubmit, reset } = useForm<FormInputs>();

  const [fieldType, setFieldType] = useState("");
  const [isNewApplication, setIsNewApplication] = useState(false);
  const [currentFields, setCurrentFields] = useState<Array<ICurrentFields>>([]);
  const [appName, setName] = useState("");

  //modal
  const [open, setModalOpen] = useState(false);
  const [modalSuccess, setModalSuccess] = useState(true);

  let modalTitle = "Application Created";
  let modalMessage = "Application was created successfully";

  const [picklistValues, setPicklistValues] = useState<string[]>([]);

  const resetState = (): void => {
    setName("");
    setFieldType("");
    setIsNewApplication(false);
    setCurrentFields([]);
    setPicklistValues([]);
  };

  const onSubmit = handleSubmit((data: FormInputs) => {
    var max_length = 0;

    if (data.max_length) {
      max_length = Number(data.max_length);
    }
    setCurrentFields([
      ...currentFields,
      {
        name: data.name,
        type: data.type,
        max_length: max_length,
        picklist_values: picklistValues,
      },
    ]);
  });

  const saveApplication = (): void => {
    try {
      createApplication({
        variables: {
          name: appName,
          fields: currentFields,
        },
      });
      //reset to initial state
      resetState();
    } catch (e) {}

    //show modal
  };

  const onDelete = (id: string): void => {
    try {
      deleteApplication({
        variables: {
          id,
        },
        //remove from the cache manually
        update(cache) {
          const normalizedId = cache.identify({ id, __typename: "Application" });
          cache.evict({ id: normalizedId });
          cache.gc();
        },
      });

      setModalOpen(true);
      setModalSuccess(true);
      modalTitle = "Application Created";
      modalMessage = "Application was created successfully";
    } catch {
      setModalOpen(true);
      setModalSuccess(false);
      modalTitle = "Error";
      modalMessage = "Failed to create an application please try again.";
    }
  };

  const inputRef = useRef<HTMLInputElement>(null);

  const addPickListEntry = () => {
    if (inputRef.current) {
      setPicklistValues([...picklistValues, inputRef!.current!.value]);
      inputRef!.current!.value = "";
    }
  };

  return (
    <>
      <SettingSectionCard>
        <Modal open={open} setModalOpen={setModalOpen} title={modalTitle} success={modalSuccess} btnLabel="Ok">
          {modalMessage}
        </Modal>
        <div className="mt-10 sm:mt-0">
          <form onSubmit={onSubmit}>
            <div className="grid grid-cols-6 gap-6 text-left">
              <div className="col-span-6">
                <h3 className="text-gray-700 tracking-wide text-md font-medium md:text-2xl">Applications</h3>
              </div>
              <div className="col-span-6">
                <div className="flex flex-col gap-3">
                  {!loading &&
                    data &&
                    data.applications.map((app) => {
                      return (
                        <ApplicationCard
                          key={app.id}
                          name={app.name}
                          onDelete={() => onDelete(app.id)}
                          onEdit={() => console.log("editing")}
                        />
                      );
                    })}
                </div>
              </div>

              <div className="col-span-5 text-xl font-medium text-gray-600">Add New Application</div>

              <div className="col-span-1">
                <button
                  type="button"
                  onClick={() => setIsNewApplication(!isNewApplication)}
                  className={`w-full justify-center py-2 px-3 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-${
                    !isNewApplication ? "blue" : "red"
                  }-600 hover:bg-${
                    !isNewApplication ? "blue" : "red"
                  }-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${
                    !isNewApplication ? "blue" : "red"
                  }-500`}
                >
                  {!isNewApplication ? "Create Application" : "Cancel"}
                </button>
              </div>
              {isNewApplication && (
                <>
                  <div className="col-span-3">
                    <label htmlFor="app_name" className="block  text-sm font-medium text-gray-700">
                      Application Name
                    </label>
                    <input
                      type="text"
                      name="app_name"
                      onChange={(e) => setName(e.target.value)}
                      id="app_name"
                      className="mt-1 focus:ring-blue-500 focus:border-blue-500 w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                  {currentFields.length > 0 && (
                    <>
                      <h1 className="col-span-6 text-lg text-gray-700 font-bold">Fields:</h1>
                      <div className="flex flex-col col-span-6">
                        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                              <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                  <tr>
                                    <th
                                      scope="col"
                                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                      Name
                                    </th>
                                    <th
                                      scope="col"
                                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                      Type
                                    </th>
                                    <th
                                      scope="col"
                                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                      Max Length
                                    </th>
                                  </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200 py-5 px-5">
                                  {currentFields.map((field) => {
                                    return (
                                      <tr className="">
                                        <td className=" text-md text-gray-800 px-6 py-4 ">{field.name}</td>
                                        <td className=" text-md text-gray-800 px-6 py-4 ">{field.type}</td>
                                        <td className="text-md text-gray-800 px-6 py-4 ">{field.max_length}</td>
                                      </tr>
                                    );
                                  })}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                  <div className="col-span-6">
                    <h1 className="text-lg text-gray-700">Add Fields</h1>
                  </div>
                  <div className="col-span-2" hidden={fieldType === FieldType.Keywords ? true : false}>
                    <label htmlFor="last_name" className="block  text-sm font-medium text-gray-700">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      defaultValue={fieldType === FieldType.Keywords ? "KEYWORDS" : ""}
                      ref={register}
                      className="mt-1 focus:ring-blue-500 focus:border-blue-500 w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="col-span-2">
                    <label htmlFor="country" className="block  text-sm font-medium text-gray-700">
                      Type
                    </label>
                    <select
                      id="type"
                      onChange={(e) => setFieldType(e.target.value)}
                      name="type"
                      ref={register}
                      className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    >
                      <option>Text</option>
                      <option>Number</option>
                      <option>Date</option>
                      <option>Pick List</option>
                      <option>Keywords</option>
                    </select>
                  </div>
                  {fieldType !== FieldType.Date && fieldType !== FieldType.Keywords && (
                    <div className="col-span-1">
                      <label htmlFor="last_name" className="block  text-sm font-medium text-gray-700">
                        Max Length
                      </label>
                      <input
                        type="number"
                        ref={register}
                        name="max_length"
                        id="max_length"
                        min="0"
                        max="255"
                        className="mt-1 focus:ring-blue-500 focus:border-blue-500 w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  )}
                  <div className="col-span-1 py-6">
                    <button
                      type="submit"
                      className="w-full text-center justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    >
                      Add Field
                    </button>
                  </div>
                  {fieldType === FieldType.PickList && (
                    <>
                      <div className="col-span-6">
                        <p className="text-lg text-gray-700 w-1/2">New Picklist Values</p>
                        <ul className="mt-4 space-y-3 text-gray-700 text-md ml-3">
                          {picklistValues.map((val: string, index: number) => {
                            return (
                              <li key={index} className="px-4 py-3 bg-gray-100 shadow-md rounded">
                                {val}
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                      <div className="col-span-3">
                        <label htmlFor="last_name" className="block  text-sm font-medium text-gray-700">
                          Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          id="name"
                          ref={inputRef}
                          className="mt-1 focus:ring-blue-500 focus:border-blue-500 w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                      <div className="col-span-3 py-6">
                        <button
                          type="button"
                          onClick={() => addPickListEntry()}
                          className="text-center justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                        >
                          Add Entry
                        </button>
                      </div>
                    </>
                  )}
                  <div className="col-span-6 justify-end py-6">
                    <button
                      onClick={() => saveApplication()}
                      type="button"
                      className="justify-end py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Save Application
                    </button>
                  </div>
                </>
              )}
            </div>
          </form>
        </div>
      </SettingSectionCard>
    </>
  );
};

export default Applications;
