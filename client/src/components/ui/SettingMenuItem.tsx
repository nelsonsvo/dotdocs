import React, { MouseEventHandler } from "react";
import { FieldNamesMarkedBoolean } from "react-hook-form";
import { Link } from "react-router-dom";

interface SettingMenuItemProps {
  name: string;
  mt?: boolean;
  to: string;
  active?: boolean;
  onClick?: MouseEventHandler<HTMLElement>;
}

const SettingMenuItem: React.FC<SettingMenuItemProps> = ({ name, children, onClick, to, mt, active }) => {
  return (
    <Link to={to}>
      <div onClick={onClick} className={`flex flex-row py-2 rounded-md  hover:bg-white ${active ? "bg-white" : ""} ${!mt ? "mt-2" : ""} `}>
        <div className={`text-gray-600 ${active ? "text-blue-600" : ""}`}>{children}</div>
        <div className="flex-auto">
          <h3 className={`text-mdi text-left antialiased leading-6 text-gray-900 ${active ? "text-blue-600" : ""}`}>{name}</h3>
        </div>
      </div>
    </Link>
  );
};

export default SettingMenuItem;
