import React from "react";
import RetrievalBar from "../RetrievalBar";

interface Props {
  src?: string;
}

const RetrievalBody: React.FC<Props> = ({ src, children }) => {
  return (
    <div className="flex flex-row">
      <div className="w-80">
        <RetrievalBar />
      </div>
      <div className="flex-auto bg-gray-100">{children}</div>
    </div>
  );
};

export default RetrievalBody;
