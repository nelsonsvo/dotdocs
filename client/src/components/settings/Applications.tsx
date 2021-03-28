import { useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { CREATE_APPLICATION } from "../../graphql/mutations/Application";
import { GET_APPLICATIONS } from "../../graphql/queries/Application";
import ApplicationCard from "../cards/ApplicationCard";
import SettingSectionCard from "../ui/SettingSectionCard";

interface ApplicationsProps {}

type FormInputs = {
  app_name: string;
  name: string;
  type: string;
  max_length?: string;
};
interface Field {
  name: string;
  type: string;
  max_length?: number | null;
}

const Applications: React.FC<ApplicationsProps> = () => {
  const [createApplication, { error }] = useMutation(CREATE_APPLICATION, {
    refetchQueries: [{ query: GET_APPLICATIONS }],
    errorPolicy: "all",
  });
  const { loading, error: _error, data } = useQuery(GET_APPLICATIONS);

  const { register, handleSubmit, errors } = useForm<FormInputs>();

  const [fieldType, setFieldType] = useState("");
  const [isNewApplication, setIsNewApplication] = useState(false);
  const [currentFields, setCurrentFields] = useState<Field[]>([]);
  const [appName, setName] = useState("");

  const resetState = (): void => {
    setName("");
    setFieldType("");
    setIsNewApplication(false);
    setCurrentFields([]);
  };

  const onSubmit = handleSubmit((data: FormInputs) => {
    setCurrentFields([
      ...currentFields,
      {
        name: data.name,
        type: data.type,
        max_length: Number(data.max_length),
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

  return (
    <>
      <SettingSectionCard>
        <div className="mt-10 sm:mt-0">
          <div className="shadow overflow-hidden sm:rounded-md" />
          <div className="mt-10 sm:mt-0">
            <div className="px-4 py-5 bg-white sm:p-6">
              <form onSubmit={onSubmit}>
                <div className="grid grid-cols-6 gap-6 text-left">
                  <div className="col-span-6">
                    <h3 className="text-gray-700 tracking-wide text-md md:text-xl">
                      Existing Applications
                    </h3>
                  </div>
                  <div className="col-span-6">
                    <div className="flex flex-col gap-3">
                      {!loading &&
                        data &&
                        data.applications.map((app: any) => {
                          return (
                            <div key={app.id}>
                              <ApplicationCard
                                name={app.name}
                                onEdit={() => console.log("editing")}
                                onDelete={() => console.log("deleting")}
                              />
                            </div>
                          );
                        })}
                    </div>
                  </div>

                  <div className="col-span-5 text-xl text-gray-700">Add New Application</div>

                  <div className="col-span-1">
                    <button
                      type="button"
                      onClick={() => setIsNewApplication(!isNewApplication)}
                      className={`w-full justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-${
                        !isNewApplication ? "blue" : "red"
                      }-600 hover:bg-${
                        !isNewApplication ? "blue" : "red"
                      }-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${
                        !isNewApplication ? "blue" : "red"
                      }-500`}
                    >
                      {!isNewApplication ? "Create New" : "Cancel"}
                    </button>
                  </div>
                  {isNewApplication && (
                    <>
                      <div className="col-span-3">
                        <label
                          htmlFor="app_name"
                          className="block  text-sm font-medium text-gray-700"
                        >
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
                      <h1 className="col-span-6 text-lg text-gray-700 font-bold">Fields:</h1>
                      {currentFields.map((field) => {
                        return (
                          <div className="col-span-6 py-5 px-5 shadow-md rounded-md bg-gray-100">
                            <div className="grid grid-cols-6 gap-3">
                              <div className="col-span-2 text-md text-gray-800">
                                <b>Name: </b>
                                {field.name}
                              </div>
                              <div className="col-span-2 text-md text-gray-800">
                                <b>Type: </b>
                                {field.type}
                              </div>
                              <div className="col-span-2 text-md text-gray-800">
                                <b>Max Length: </b>
                                {field.max_length}
                              </div>
                            </div>
                          </div>
                        );
                      })}

                      <div className="col-span-6">
                        <h1 className="text-lg text-gray-700">Add Fields</h1>
                      </div>

                      <div className="col-span-2">
                        <label
                          htmlFor="last_name"
                          className="block  text-sm font-medium text-gray-700"
                        >
                          Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          id="name"
                          ref={register}
                          className="mt-1 focus:ring-blue-500 focus:border-blue-500 w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                      <div className="col-span-2">
                        <label
                          htmlFor="country"
                          className="block  text-sm font-medium text-gray-700"
                        >
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
                        </select>
                      </div>
                      {fieldType !== "Date" && (
                        <div className="col-span-1">
                          <label
                            htmlFor="last_name"
                            className="block  text-sm font-medium text-gray-700"
                          >
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
                          className="w-full text-center justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          Add
                        </button>
                      </div>
                      <div className="col-span-5"></div>
                      <div className="col-span-1 py-6">
                        <button
                          onClick={() => saveApplication()}
                          type="button"
                          className="w-full justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          Save Application
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </SettingSectionCard>
    </>
  );
};

export default Applications;
