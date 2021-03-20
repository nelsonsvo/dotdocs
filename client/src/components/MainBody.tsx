import React from "react";

interface Props {
  src?: string;
}

const MainBody: React.FC<Props> = ({ src, children }) => {
  return (
    <div>
      <main
        className="bg-gray-700 h-screen w-screen absolute bg-cover bg-no-repeat bg-center bg-fixed mx-auto overflow-hidden"
        style={{
          backgroundImage: `url(${src})`,
          paddingLeft: "255px",
        }}
      >
        {children}
      </main>
    </div>
  );
};

export default MainBody;
