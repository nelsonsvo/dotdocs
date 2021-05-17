import React, { ReactElement } from "react";

export enum SpinnerType {
  DOWNLOADING,
  UPLOADING,
}

interface Props {
  loading: boolean;
  type: SpinnerType;
}

export default function LoadingSpinner({ loading, type }: Props): ReactElement {
  return loading ? (
    type === SpinnerType.DOWNLOADING ? (
      <div className="w-full h-full fixed block top-0 left-0 bg-white opacity-75 z-50">
        <span className="text-blue-500  opacity-75 top-1/2 my-0 mx-auto block relative w-0 h-0" style={{ top: "50%" }}>
          <svg
            className="w-24 h-24 animate-bounce"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
        </span>
      </div>
    ) : (
      <div className="w-full h-full fixed block top-0 left-0 bg-white opacity-75 z-50">
        <span className="text-blue-500  opacity-75 top-1/2 my-0 mx-auto block relative w-0 h-0" style={{ top: "50%" }}>
          <svg
            className="w-24 h-24 animate-bounce"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
            />
          </svg>
        </span>
      </div>
    )
  ) : (
    <></>
  );
}
