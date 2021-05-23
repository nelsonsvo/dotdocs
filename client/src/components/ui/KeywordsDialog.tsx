import React from "react";
import { useForm } from "react-hook-form";
import { GetKeywordsDocument, useChangeKeywordsMutation, useGetKeywordsQuery } from "../../generated/graphql";
import LoadingSpinner, { SpinnerType } from "./LoadingSpinner";

interface KeywordsDialogProps {
  isOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  fileId: string;
  onSuccess: () => void;
}

interface KeywordsForm {
  keywords: string;
}

const KeywordsDialog: React.FC<KeywordsDialogProps> = ({ isOpen, setModalOpen, fileId, onSuccess }) => {
  const { register, handleSubmit } = useForm<KeywordsForm>();

  const { loading, data, error } = useGetKeywordsQuery({
    variables: {
      id: fileId,
    },
    skip: fileId === "" || !isOpen,
  });

  const [changeKeywords] = useChangeKeywordsMutation({
    refetchQueries: [{ query: GetKeywordsDocument, variables: { id: fileId } }],
  });

  const onSubmit = handleSubmit((data) => {
    try {
      changeKeywords({
        variables: {
          id: fileId,
          keywords: data.keywords.replaceAll("\n", "").replaceAll("\r", ""),
        },
      });
    } catch {}

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
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-blue-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                  />
                </svg>
              </div>
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                <h3 className="text-lg leading-6 font-medium text-gray-700" id="modal-title">
                  Keywords
                </h3>
                <div className="flex flex-col mt-5 space-y-2 w-full">
                  <textarea
                    rows={10}
                    name="keywords"
                    defaultValue={data?.getKeywords.keywords ? data.getKeywords.keywords : undefined}
                    ref={register}
                    placeholder="Keywords"
                    className="border mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full  shadow-md sm:text-sm border-gray-300 rounded-md py-2 px-2"
                  />
                  {error && (
                    <div className="bg-red-100 px-6 py-4 rounded-md border border-red-200">{error.message}</div>
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

export default KeywordsDialog;
