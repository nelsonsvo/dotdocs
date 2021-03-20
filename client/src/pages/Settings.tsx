import React from "react";
import { Link } from "react-router-dom";
import MainBody from "../components/MainBody";
import { VertCard } from "../components/ui/VertCard";

interface Props {}

const Settings = (props: Props) => {
  return (
    <MainBody>
      <div>
        <div className="grid grid-cols-3 m-auto mt-5 text-gray-800">
          <Link to="/settings/folders">
            <VertCard>
              <div className="flex justify-center ">
                <svg className="w-6 h-6 mr-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                </svg>
                <h3 className="text-xl font-semibold tracking-wide">Folders</h3>
              </div>
            </VertCard>
          </Link>
          <VertCard>
            <div className="flex justify-center">
              <svg className="w-6 h-6 mr-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <h3 className="text-xl font-semibold tracking-wide text-center justify-center">Users & Groups</h3>
            </div>
          </VertCard>
          <VertCard>
            <h3 className="text-xl font-semibold tracking-wide">...</h3>
          </VertCard>
        </div>
      </div>
    </MainBody>
  );
};

export default Settings;
