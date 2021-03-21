import React from "react";
import Sidebar from "./Sidebar";

interface Props {
  src?: string;
}

const MainBody: React.FC<Props> = ({ src, children }) => {
  return (
    <div>
      <div
        className="bg-gray-700 h-screen w-screen absolute bg-cover bg-no-repeat bg-center bg-fixed mx-auto overflow-hidden"
        style={{
          backgroundImage: `url(${src})`,
          // paddingLeft: "255px",
        }}
      >
        {children}
      </div>
      <div>
        <Sidebar />
      </div>
    </div>
  );
};

export default MainBody;
