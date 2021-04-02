import React from "react";
import IndexBar from "../IndexBar";

interface Props {}

const IndexBody: React.FC<Props> = React.memo(({ children }) => {
  return (
    <div className="flex flex-row">
      <div className="w-80">
        <IndexBar />
      </div>
      <div className="flex-auto bg-gray-100">{children}</div>
    </div>
  );
});

export default IndexBody;
