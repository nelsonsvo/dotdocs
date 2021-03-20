import React from "react";

interface Props {
  src?: string;
  children?: JSX.Element;
}

export const VertCard = (props: Props) => {
  return (
    <>
      <div className="bg-blue w-full p-10  flex justify-center font-sans">
        <div className="rounded bg-white w-80 p-5 ">{props.children}</div>
      </div>
    </>
  );
};
