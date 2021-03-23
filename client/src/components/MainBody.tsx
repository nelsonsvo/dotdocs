import React, { useState } from "react";
import Sidebar from "./Sidebar";

interface Props {
  src?: string;
}

const MainBody: React.FC<Props> = ({ src, children }) => {
  return (
    <div className="flex flex-row">
      <div className="w-1/6">
        <Sidebar />
      </div>
      <div className="w-5/6 bg-gray-700">{children}</div>
    </div>
  );
};

export default MainBody;
