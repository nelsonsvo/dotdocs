import React from "react";
import SideBar from "../SideBar";

interface Props {}

const MainBody: React.FC<Props> = ({ children }) => {
  return (
    <div className="flex flex-row">
      <div className="w-64">
        <SideBar />
      </div>
      <div className="flex-auto bg-gray-100">{children}</div>
    </div>
  );
};

export default MainBody;
