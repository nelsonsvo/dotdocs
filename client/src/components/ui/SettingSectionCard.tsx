import React from "react";

interface SettingSectionCardProps {}

const SettingSectionCard: React.FC<SettingSectionCardProps> = ({ children }) => {
  return (
    <>
      <div className="mt-5 md:mt-0 md:col-span-3 h-100">
        <div className="shadow sm:rounded-md sm:overflow-hidden px-4 py-5 bg-white sm:p-6 mt-10 sm:mt-0">
          {children}
        </div>
      </div>
    </>
  );
};

export default SettingSectionCard;
