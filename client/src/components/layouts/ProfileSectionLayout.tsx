import React from "react";
import { NavLink, useRouteMatch } from "react-router-dom";

interface ProfileSectionLayoutProps {}

const ProfileSectionLayout: React.FC<ProfileSectionLayoutProps> = ({ children }) => {
  const { url } = useRouteMatch();

  return (
    <>
      <div className="h-100">
        <div className="flex flex-col shadow sm:rounded-md sm:overflow-hidden px-4 py-5 bg-white sm:p-6 mt-10 sm:mt-0">
          <div className="flex flex-row space-x-10 border-b border-gray-150">
            <NavLink
              to={`${url}`}
              exact
              className="py-3 text-gray-500 text-sm font-medium"
              activeClassName="border-b-2 border-blue-500 py-3 text-blue-500 text-sm font-medium"
            >
              My Profile
            </NavLink>
            <NavLink
              to={`${url}/usersettings`}
              exact
              className="py-3 text-gray-500 text-sm font-medium"
              activeClassName="border-b-2 border-blue-500 py-3 text-blue-500 text-sm font-medium"
            >
              User Settings
            </NavLink>
          </div>
          {children}
        </div>
      </div>
    </>
  );
};

export default ProfileSectionLayout;
