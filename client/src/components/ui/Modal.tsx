import React from "react";

interface Props {
  open: boolean;
  children?: React.ReactNode;
  setModalState: Function;
  title: string;
}

const Modal = ({ children, open, setModalState, title }: Props) => {
  return (
    <>
      <div className={`modal opacity-${open ? "100 modal-active" : "0 pointer-events-none"} fixed w-full h-full top-0 left-0 flex items-center justify-center`} style={{ transition: "opacity 0.25s ease" }}>
        <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>

        <div className="modal-container bg-white w-screen  md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
          <div className="modal-content py-4 text-left px-6">
            <div className="flex justify-between items-center pb-3">
              <p className="text-2xl font-bold">{title}</p>
              <div className="modal-close cursor-pointer z-50">
                <svg className="fill-current text-black" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
                  <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
                </svg>
              </div>
            </div>

            {children}

            <div className="flex justify-end pt-2">
              <button className="px-4 bg-transparent cursor-pointer p-3 rounded-lg text-indigo-500 hover:bg-gray-100 hover:text-indigo-400 mr-2">Action</button>
              <button onClick={() => setModalState(false)} className="modal-close cursor-pointer px-4 bg-indigo-500 p-3 rounded-lg text-white hover:bg-indigo-400">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
