import React, { useEffect } from "react";

interface ToastNotificationProps {
  title: string;
  body: string;
  open: boolean;
  success: boolean;
  setToastOpen: (bool: boolean) => void;
}

const ToastNotification: React.FC<ToastNotificationProps> = ({ title, open, success, setToastOpen, body }) => {
  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        setToastOpen(false);
      }, 5000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [open]);

  return open ? (
    <div className="fixed top-0 right-0 m-8 w-5/6 md:w-full max-w-sm shadow-xl">
      <div className="flex flex-col  px-5 py-3 bg-white border border-gray-300 rounded-lg shadow-lg text-gray-800 text-md font-medium">
        <div className=" flex w-full">
          <div className={`flex-shrink-0 text-${success ? "green" : "red"}-500`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 animate-ping"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>

          <div className="flex-1 text-left text-md text-gray-700 ml-2">{title}</div>
          <div className="text-gray-400 cursor-pointer" onClick={() => setToastOpen(false)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 flex-shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
        </div>
        <div className="text-left px-8 mt-1 text-sm font-normal text-gray-600">{body}</div>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default ToastNotification;
