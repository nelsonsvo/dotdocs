import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouteMatch } from "react-router";
import MainBody from "../components/layouts/MainBody";
import ToastNotification from "../components/ui/ToastNotification";
import Toggle from "../components/ui/Toggle";
import { MeDocument, useEditProfileMutation, useMeQuery } from "../generated/graphql";

interface ProfileProps {}

interface ProfileFormInputs {
  username: string;
  password: string;
  confirmPassword: string;
  email: string;
}

interface AppSettingsFormInputs {
  viewer: string;
}

const Profile: React.FC<ProfileProps> = () => {
  const { url } = useRouteMatch();

  const { loading, data, error } = useMeQuery();

  const { register, errors, handleSubmit, getValues } = useForm();
  const { register: register2, errors: errors2, handleSubmit: handleSubmit2 } = useForm();

  const [profileToastOpen, setProfileToastOpen] = useState<boolean>(false);
  const [appToastOpen, setAppToastOpen] = useState<boolean>(false);

  const [changePassword, setChangePassword] = useState<boolean>(false);
  const [editProfile] = useEditProfileMutation({
    refetchQueries: [{ query: MeDocument }],
  });

  const profileFormSubmit = handleSubmit(({ username, email, password }: ProfileFormInputs) => {
    console.log({
      username,
      email,
      password,
    });
    try {
      editProfile({
        variables: {
          id: data?.me?.id!,
          username,
          email,
          password: password ? password : "",
        },
      });
      //update the sessionStorage.
      sessionStorage.setItem("username", username);
    } catch {}
    setProfileToastOpen(true);
  });

  const appSettingFormSubmit = handleSubmit2(({ viewer }: AppSettingsFormInputs) => {
    localStorage.setItem("viewer", viewer);
    setAppToastOpen(true);
  });

  return (
    <MainBody>
      <ToastNotification
        title="Profile Saved"
        body="Profile changes have succesfully saved."
        success
        open={profileToastOpen}
        setToastOpen={setProfileToastOpen}
      />

      <ToastNotification
        title="Application Settings Saved "
        body="Application Setting changes have succesfully saved."
        success
        open={appToastOpen}
        setToastOpen={setAppToastOpen}
      />

      <div className="p-10 text-left">
        <div>
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <div className="px-4 sm:px-0">
                <h3 className="text-lg  font-medium leading-6 text-gray-900">Profile</h3>
                <p className="mt-1 text-sm text-gray-600">This information will be visible to other users.</p>
              </div>
            </div>
            <div className="mt-5 md:mt-0 md:col-span-2">
              <form onSubmit={profileFormSubmit}>
                <div className="shadow sm:rounded-md sm:overflow-hidden">
                  <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                    <div className="grid grid-cols-3 gap-6">
                      <div className="col-span-3 sm:col-span-2">
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                          Username
                        </label>
                        <div className="mt-1 flex rounded-md shadow-sm">
                          <input
                            type="text"
                            name="username"
                            defaultValue={data?.me?.username}
                            ref={register({
                              required: "Username is required",
                            })}
                            className="focus:ring-blue-500 focus:border-blue-500 flex-1 block w-full rounded-md sm:text-sm border-gray-300"
                            placeholder="Username"
                          />
                        </div>
                        {errors.username && (
                          <p className="text-red-500 font-medium text-sm text-left mt-2">{errors.username.message}</p>
                        )}
                      </div>
                      <div className="col-span-3 sm:col-span-2">
                        <label htmlFor="Email" className="block text-sm font-medium text-gray-700">
                          Email
                        </label>
                        <div className="mt-1 flex rounded-md shadow-sm">
                          <input
                            type="email"
                            name="email"
                            defaultValue={data?.me?.email!}
                            ref={register}
                            className="focus:ring-blue-500 focus:border-blue-500 flex-1 block w-full rounded-md sm:text-sm border-gray-300"
                            placeholder="Email"
                          />
                        </div>
                      </div>
                      <div className="col-span-3 sm:col-span-2">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                          Change Password?
                        </label>
                        <Toggle
                          defaultChecked={true}
                          name="changePassword"
                          onChange={() => setChangePassword((prev) => !prev)}
                        />
                      </div>
                      {changePassword && (
                        <>
                          <div className="col-span-3 sm:col-span-2">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                              Password
                            </label>
                            <div className="mt-1 flex rounded-md shadow-sm">
                              <input
                                type="password"
                                name="password"
                                ref={register({
                                  required: "Password is required",
                                })}
                                className="focus:ring-blue-500 focus:border-blue-500 flex-1 block w-full rounded-md sm:text-sm border-gray-300"
                                placeholder="Password"
                              />
                            </div>
                            {errors.password && (
                              <p className="text-red-500 font-medium text-sm text-left mt-2">
                                {errors.password.message}
                              </p>
                            )}
                          </div>
                          <div className="col-span-3 sm:col-span-2" hidden={!changePassword}>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                              Confirm Password
                            </label>
                            <div className="mt-1 flex rounded-md shadow-sm">
                              <input
                                type="password"
                                name="confirmPassword"
                                ref={register({
                                  required: "Confirmation password is required",
                                  validate: (value) => value === getValues("password") || "Passwords must match",
                                })}
                                className="focus:ring-blue-500 focus:border-blue-500 flex-1 block w-full rounded-md sm:text-sm border-gray-300"
                                placeholder="Confirm Password"
                              />
                            </div>
                            {errors.confirmPassword && (
                              <p className="text-red-500 font-medium text-sm text-left mt-2">
                                {errors.confirmPassword.message}
                              </p>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                    <button
                      type="submit"
                      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="hidden sm:block" aria-hidden="true">
          <div className="py-5">
            <div className="border-t border-gray-200" />
          </div>
        </div>

        <div className="mt-10 sm:mt-0">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <div className="px-4 sm:px-0">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Application Settings</h3>
                <p className="mt-1 text-sm text-gray-600">
                  Customise your user experience by configuring your application settings.
                </p>
              </div>
            </div>
            <div className="mt-5 md:mt-0 md:col-span-2">
              <form onSubmit={appSettingFormSubmit}>
                <div className="shadow overflow-hidden sm:rounded-md">
                  <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                    <fieldset>
                      <div>
                        <legend className="text-base font-medium text-gray-900">File Viewer</legend>
                        <p className="text-sm text-gray-500">
                          File viewer preferences, open file viewer in new tab or integrated.
                        </p>
                      </div>
                      <div className="mt-4 space-y-4">
                        <div className="flex items-center">
                          <input
                            id="integrated"
                            name="viewer"
                            ref={register2}
                            value="integrated"
                            type="radio"
                            className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                          />
                          <label htmlFor="integrated" className="ml-3 block text-sm font-medium text-gray-700">
                            Integrated
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            id="newTab"
                            name="viewer"
                            ref={register2}
                            type="radio"
                            value="newtab"
                            className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                          />
                          <label htmlFor="newTab" className="ml-3 block text-sm font-medium text-gray-700">
                            New tab
                          </label>
                        </div>
                      </div>
                    </fieldset>
                  </div>
                  <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                    <button
                      type="submit"
                      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </MainBody>
  );
};

export default Profile;
