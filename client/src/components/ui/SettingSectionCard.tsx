import React from "react";

interface SettingSectionCardProps {}

const SettingSectionCard: React.FC<SettingSectionCardProps> = ({ children }) => {
  return (
    <>
      <div className="mt-5 md:mt-0 md:col-span-3 h-100">
        <div className="shadow sm:rounded-md sm:overflow-hidden">{children}</div>
      </div>
    </>
  );
};

export default SettingSectionCard;
