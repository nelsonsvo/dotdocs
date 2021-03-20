import React from "react";

interface Props {
  children?: React.ReactNode;
  src?: string;
}

export const VertCard = ({ src, children }: Props) => {
  return (
    <>
      <div className="bg-blue w-full p-10 flex justify-center font-sans cursor-pointer">
        <div className="rounded bg-white w-80 p-5 ">{children}</div>
      </div>
    </>
  );
};
