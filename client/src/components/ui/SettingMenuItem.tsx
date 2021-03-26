import React, { MouseEventHandler } from "react";
import { FieldNamesMarkedBoolean } from "react-hook-form";
import { Link, NavLink } from "react-router-dom";

interface SettingMenuItemProps {
  name: string;
  mt?: boolean;
  to: string;
}

const SettingMenuItem: React.FC<SettingMenuItemProps> = ({ name, children, to, mt }) => {
  return (
    <NavLink
      to={to}
      activeClassName={`flex flex-row py-2 rounded-md  border-l-4 border-blue-600 hover:bg-white bg-white  text-blue-600 ${!mt ? "mt-2" : ""}`}
      className={`flex flex-row py-2 rounded-md text-gray-600 hover:bg-white ${!mt ? "mt-2" : ""} `}
    >
      <div>{children}</div>
      <div className="flex-auto">
        <h3 className={`text-md text-left antialiased leading-6 `}>{name}</h3>
      </div>
    </NavLink>
  );
};

export default SettingMenuItem;
