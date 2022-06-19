import React from "react";
import Sidebar from "../Sidebar";

interface Props {}

const MainBody: React.FC<Props> = ({ children }) => {
  return (
    <div className="flex flex-row">
      <div className="w-64">
        <Sidebar />
      </div>
      <div className="flex-auto bg-gray-100">{children}</div>
    </div>
  );
};

export default MainBody;
