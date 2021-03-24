import React from "react";
import MainBody from "../components/MainBody";
import SettingMenuItem from "../components/ui/SettingMenuItem";
interface SettingsProps {}

const Settings: React.FC<SettingsProps> = ({ children }) => {
  return (
    <>
      <MainBody>
        <div className="md:grid md:grid-cols-4 md:gap-6 mx-10 my-10">
          <div className="md:col-span-1">
            <div className="flex flex-col">
              <SettingMenuItem to="/settings/application" name="Application" active mt>
                <svg className="w-6 h-6 mx-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                </svg>
              </SettingMenuItem>
              <SettingMenuItem to="/settings/usergroups" name="Users & Groups">
                <svg className="w-6 h-6 mx-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </SettingMenuItem>
            </div>
          </div>
          {children}
        </div>
      </MainBody>
    </>
  );
};

export default Settings;
