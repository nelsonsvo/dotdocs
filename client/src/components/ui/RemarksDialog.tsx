import moment from "moment";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { GetRemarksDocument, useAddRemarkMutation, useGetRemarksQuery } from "../../generated/graphql";
import LoadingSpinner, { SpinnerType } from "./LoadingSpinner";

interface RemarksDialogProps {
  isOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  fileId: string;
  onSuccess: () => void;
}

interface RemarksForm {
  message: string;
}

const RemarksDialog: React.FC<RemarksDialogProps> = ({ isOpen, setModalOpen, fileId, onSuccess }) => {
  const { register, handleSubmit } = useForm<RemarksForm>();

  const { loading, data, error } = useGetRemarksQuery({
    variables: {
      id: fileId,
    },
    skip: fileId === "",
  });

  const [addRemark] = useAddRemarkMutation({
    refetchQueries: [{ query: GetRemarksDocument, variables: { id: fileId } }],
  });

  const [addRemarkError, setAddRemarkError] = useState(false);

  const onSubmit = handleSubmit((data) => {
    try {
      addRemark({
        variables: {
          id: fileId,
          message: data.message,
          author: sessionStorage.getItem("username")!,
        },
      });
    } catch {
      setAddRemarkError(true);
    }
    onSuccess();
    setModalOpen(false);
  });

  return isOpen ? (
    <form
      className="fixed z-10 inset-0 overflow-y-auto"
      onSubmit={onSubmit}
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
          &#8203;
        </span>
        <LoadingSpinner loading={loading} type={SpinnerType.DOWNLOADING} />

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
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
                    strokeWidth={1.5}
                    d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                  />
                </svg>
              </div>
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                <h3 className="text-lg leading-6 font-medium text-gray-700" id="modal-title">
                  Remarks
                </h3>
                <div className="flex flex-col mt-5 space-y-2 w-full">
                  <textarea
                    rows={10}
                    name="message"
                    ref={register}
                    placeholder="New Remark"
                    className="border mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full  shadow-md sm:text-sm border-gray-300 rounded-md py-2 px-2"
                  />
                  {error && (
                    <div className="bg-red-100 px-6 py-4 rounded-md border border-red-200">{error.message}</div>
                  )}
                  {addRemarkError && (
                    <div className="bg-red-100 px-6 py-4 rounded-md border border-red-200">{addRemarkError}</div>
                  )}
                  {data && data.getRemarks && (
                    <>
                      <p className="text-md text-gray-800 font-medium mt-5 py-3">Remarks</p>
                      <div className="flex flex-col space-y-2 overflow-auto h-80">
                        {data.getRemarks
                          .slice(0)
                          .reverse()
                          .map((remark) => {
                            return (
                              <div key={remark.id} className="bg-gray-100 px-6 py-4 rounded-md border border-gray-200">
                                <p className="text-sm font-sans">{remark.message}</p>
                                <p className="text-xs font-sans mt-3">
                                  Date:
                                  <span className=""> {moment(remark.createdAt).format("DD/MM/YYYY HH:mm")}</span>
                                </p>
                                <p className="text-xs font-sans">Created By: {remark.author}</p>
                              </div>
                            );
                          })}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="submit"
              className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm`}
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-500 shadow-sm px-4 py-2 bg-gray-500 text-base font-medium text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-100 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </form>
  ) : (
    <></>
  );
};

export default RemarksDialog;
