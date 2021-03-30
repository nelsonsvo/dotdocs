import React from "react";
import IndexBar from "../IndexBar";

interface Props {
  src?: string;
}

const IndexBody: React.FC<Props> = ({ src, children }) => {
  return (
    <div className="flex flex-row">
      <div className="w-80">
        <IndexBar />
      </div>
      <div className="flex-auto bg-gray-100">{children}</div>
    </div>
  );
};

export default IndexBody;
