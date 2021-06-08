import React from "react";
import { useRouteMatch } from "react-router";
import { Route } from "react-router-dom";
import MainBody from "../components/layouts/MainBody";
import ProfileSectionCard from "../components/ui/ProfileSectionCard";

interface ProfileProps {}

const Profile: React.FC<ProfileProps> = () => {
  const { url } = useRouteMatch();
  return (
    <MainBody>
      <div className="flex flex-col px-12 py-10">
        <div className="mb-10">
          <h1 className="text-left text-lg lg:text-3xl text-gray-700">Profile</h1>
        </div>
        <ProfileSectionCard>
          <div className="py-5 px-5 w-full">
            <Route exact path={`${url}`}>
              <h1 className="text-left">my profile</h1>
            </Route>
            <Route path={`${url}/usersettings`}>
              <h1 className="text-left">user settings</h1>
            </Route>
          </div>
        </ProfileSectionCard>
      </div>
    </MainBody>
  );
};

export default Profile;
