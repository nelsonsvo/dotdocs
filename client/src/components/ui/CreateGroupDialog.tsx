import React from "react";
import { useForm } from "react-hook-form";
import { GetGroupsDocument, useCreateGroupMutation, useGetApplicationsQuery } from "../../generated/graphql";

interface CreateGroupDialogProps {
  open: boolean;
  onSuccess: () => void;
  setModalOpen: (bool: boolean) => void;
}

const CreateGroupDialog: React.FC<CreateGroupDialogProps> = ({ open, setModalOpen, onSuccess }) => {
  const { loading, data, error } = useGetApplicationsQuery();
  const [createGroup] = useCreateGroupMutation({
    refetchQueries: [{ query: GetGroupsDocument }],
  });

  const { register, errors, handleSubmit } = useForm();

  const onSubmit = handleSubmit((data: any) => {
    try {
      console.log(data);
      let name: any = "";
      const permissions = [];
      for (const [key, value] of Object.entries(data)) {
        if (key !== "name") {
          const val: any = value;
          permissions.push(`${key}_${val.toString().toUpperCase()}`);
        } else {
          name = value;
        }
      }
      console.log(name);
      console.log(permissions);

      createGroup({
        variables: {
          name,
          permissions,
        },
      });
      onSuccess();
    } catch {}

    setModalOpen(false);
  });

  return open ? (
    <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500  bg-opacity-75 transition-opacity" aria-hidden="true"></div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
          &#8203;
        </span>

        <div className="inline-block align-middle bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all my-8  max-w-lg w-full">
          <form onSubmit={onSubmit} className="mb-3">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10 ">
                  <svg
                    className="w-6 h-6 text-blue-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.75}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <div className="mt-0 w-full text-center sm:mt-2 sm:ml-4 sm:text-left">
                  <h3 className="text-3xl leading-6 font-medium text-gray-800" id="modal-title">
                    Create Group
                  </h3>
                  <div className="mt-8">
                    <label htmlFor="name" className="block  text-sm font-medium text-gray-700">
                      Group Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      ref={register({ required: "Group name is required" })}
                      className="mt-1 focus:ring-blue-500 focus:border-blue-500 w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                    {errors.name && (
                      <p className="text-red-500  font-medium text-sm text-left">{errors.name.message}</p>
                    )}
                  </div>
                  <div className="mt-5">
                    <h3 className="font-medium text-lg text-gray-700">Permissions</h3>
                    <div className="bg-gray-100 rounded-md shadow-lg px-5 py-4 mt-2 border border-gray-200">
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-xl text-gray-800 font-semibold">Global</h4>
                          <ul className="ml-4 mt-2 mx-auto">
                            <li>
                              <input
                                type="checkbox"
                                name="GLOBAL_RETRIEVAL"
                                ref={register}
                                className="form-checkbox rounded-sm"
                              />
                              <span className="text-gray-700 text-sm ml-2">Retrieval</span>
                            </li>
                            <li>
                              <input
                                type="checkbox"
                                name="GLOBAL_INDEXING"
                                ref={register}
                                className="form-checkbox rounded-sm"
                              />
                              <span className="text-gray-700 text-sm ml-2">Indexing</span>
                            </li>
                            <li>
                              <input
                                type="checkbox"
                                name="GLOBAL_SETTINGS"
                                ref={register}
                                className="form-checkbox rounded-sm"
                              />
                              <span className="text-gray-700 text-sm ml-2">Settings</span>
                            </li>
                          </ul>
                        </div>
                        <hr />
                        <h4 className="text-xl text-gray-800 font-semibold">Applications</h4>
                        {data &&
                          data.applications.map((app, key) => {
                            return (
                              <div className="bg-gray-200 px-3 py-2 rounded-md shadow-sm border border-gray-300">
                                <h4 className="text-md text-gray-900 font-semibold">{app.name}</h4>
                                <ul className="ml-4 mt-2 mx-auto">
                                  <li key={key + 1}>
                                    <input
                                      type="checkbox"
                                      name={`${app.name.toUpperCase()}_RETRIEVAL`}
                                      ref={register}
                                      className="form-checkbox rounded-sm"
                                    />
                                    <span className="text-gray-900 text-sm ml-2">Retrieval</span>
                                  </li>
                                  <li key={key + 2}>
                                    <input
                                      type="checkbox"
                                      name={`${app.name.toUpperCase()}_INDEXING`}
                                      ref={register}
                                      className="form-checkbox rounded-sm"
                                    />
                                    <span className="text-gray-800 text-sm ml-2">Indexing</span>
                                  </li>

                                  <li key={key + 3}>
                                    <input
                                      type="checkbox"
                                      name={`${app.name.toUpperCase()}_FILE_VIEWING`}
                                      ref={register}
                                      className="form-checkbox rounded-sm"
                                    />
                                    <span className="text-gray-800 text-sm ml-2">File Viewing</span>
                                  </li>
                                </ul>
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                type="submit"
                className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm`}
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => {
                  setModalOpen(false);
                }}
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-500 shadow-sm px-4 py-2 bg-gray-500 text-base font-medium text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-100 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default CreateGroupDialog;
