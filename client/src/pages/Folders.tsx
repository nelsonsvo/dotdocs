import React from "react";
import MainBody from "../components/MainBody";

interface FoldersProps {}

const Folders: React.FC<FoldersProps> = () => {
  return (
    <MainBody>
      <div className="flex justify-start ml-10 mt-10">
        <h1 className="text-4xl text-white font-semibold tracking-tight ">Folders</h1>
      </div>
    </MainBody>
  );
};

export default Folders;
