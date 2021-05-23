import React, { useCallback, useEffect, useState } from "react";
import Gravatar from "react-gravatar";
import {
  GetGroupsDocument,
  GetUsersDocument,
  GetUsersQuery,
  useDeleteGroupMutation,
  useDeleteUserMutation,
  useGetGroupsQuery,
  useGetUsersQuery,
} from "../../generated/graphql";
import { client } from "../../graphql/ApolloClient";
import CreateGroupDialog from "../ui/CreateGroupDialog";
import CreateUserDialog from "../ui/CreateUserDialog";
import Modal from "../ui/Modal";
import SettingSectionCard from "../ui/SettingSectionCard";
import ToastNotification from "../ui/ToastNotification";

interface UsersProps {}

const Users: React.FC<UsersProps> = () => {
  const [userToEdit, setUserToEdit] = useState<string | null>(null);
  const [groupToEdit, setGroupToEdit] = useState<string | null>(null);
  const [userData, setUserData] = useState<GetUsersQuery["users"][number] | null>(null);

  const {
    loading,
    data,
    error: fetchUserError,
  } = useGetUsersQuery({
    fetchPolicy: "cache-and-network",
  });
  const {
    loading: isLoading,
    data: groups,
    error: fetchGroupError,
  } = useGetGroupsQuery({
    fetchPolicy: "cache-and-network",
  });

  const [deleteGroup] = useDeleteGroupMutation();
  const [deleteUser] = useDeleteUserMutation({
    refetchQueries: [{ query: GetUsersDocument }, { query: GetGroupsDocument }],
  });

  //modal state
  const [groupModalOpen, setGroupModalOpen] = useState<boolean>(false);
  const [deleteModalGroupOpen, setDeleteModalGroupOpen] = useState<boolean>(false);
  const [createUserModalOpen, setCreateUserModalOpen] = useState<boolean>(false);
  const [deleteUserModalOpen, setDeleteUserModalOpen] = useState<boolean>(false);
  //toasts
  const [groupToastOpen, setGroupToastOpen] = useState(false);
  const [groupDeletedToastOpen, setGroupDeletedToastOpen] = useState(false);
  const [userCreatedToastOpen, setUserCreatedToastOpen] = useState(false);
  const [userDeletedToastOpen, setUserDeletedToastOpen] = useState(false);

  const createNewGroup = useCallback(() => {
    setGroupModalOpen(true);
  }, []);

  const createNewUser = useCallback(() => {
    setCreateUserModalOpen(true);
  }, []);

  const onUpdateGroupClick = useCallback((id: string) => {
    //TODO:implement update for groups
    //need a modal and need to upsert the group
  }, []);

  const onDeleteGroupClick = useCallback((id: string) => {
    setGroupToEdit(id);
    setDeleteModalGroupOpen(true);
  }, []);

  const onUpdateUserClick = (id: string) => {
    //TODO:implement update for groups
    //need a modal and need to upsert the group
    let users: GetUsersQuery | null = client.readQuery({
      query: GetUsersDocument,
    });
    if (users) {
      let user = users.users.filter((u) => u.id === id)[0];
      console.log(user);
      setUserData(user);
    }

    setCreateUserModalOpen(true);
  };

  const onDeleteUserClick = (id: string) => {
    setUserToEdit(id);
    setDeleteUserModalOpen(true);
  };

  const onModalDeleteGroup = () => {
    console.log(groupToEdit);
    if (groupToEdit) {
      deleteGroup({
        variables: {
          id: groupToEdit,
        },
        update(cache) {
          const normalizedId = cache.identify({ id: groupToEdit, __typename: "Group" });
          cache.evict({ id: normalizedId });
          cache.gc();
        },
      });

      setGroupDeletedToastOpen(true);
    }
  };

  const onModalDeleteUser = () => {
    if (userToEdit) {
      console.log(userToEdit);
      deleteUser({
        variables: {
          id: userToEdit,
        },
      });

      setUserDeletedToastOpen(true);
    }
  };

  useEffect(() => {
    if (!groupModalOpen) {
      setGroupToEdit(null);
    }

    if (!createUserModalOpen) {
      setUserToEdit(null);
    }
  }, [groupModalOpen, createUserModalOpen]);

  return (
    <SettingSectionCard>
      <ToastNotification
        open={groupToastOpen}
        success
        setToastOpen={setGroupToastOpen}
        title={"Group Created"}
        body={"New group created successfully"}
      />

      <ToastNotification
        open={groupDeletedToastOpen}
        setToastOpen={setGroupDeletedToastOpen}
        success={false}
        title={"Group Deleted"}
        body={"Group was successfully deleted"}
      />

      <CreateGroupDialog
        open={groupModalOpen}
        onSuccess={() => setGroupToastOpen(true)}
        setModalOpen={setGroupModalOpen}
      />
      <CreateUserDialog
        open={createUserModalOpen}
        onSuccess={() => setUserCreatedToastOpen(true)}
        setModalOpen={setCreateUserModalOpen}
        userData={userData}
        onClose={() => setUserData(null)}
      />

      <ToastNotification
        open={userCreatedToastOpen}
        success
        setToastOpen={setUserCreatedToastOpen}
        title={"User Created"}
        body={"New user created successfully"}
      />

      <ToastNotification
        open={userDeletedToastOpen}
        setToastOpen={setUserDeletedToastOpen}
        success={false}
        title={"User Deleted"}
        body={"User was successfully deleted"}
      />

      <Modal
        open={deleteModalGroupOpen}
        title="Deleting Group"
        success={false}
        btnLabel="DELETE"
        onSuccess={() => onModalDeleteGroup()}
        setModalOpen={setDeleteModalGroupOpen}
      >
        Are <b>you sure</b> you want to delete this group? <br /> This action cannot be undone.
      </Modal>
      <Modal
        open={deleteUserModalOpen}
        title="Deleting User"
        success={false}
        btnLabel="DELETE"
        onSuccess={() => onModalDeleteUser()}
        setModalOpen={setDeleteUserModalOpen}
      >
        Are <b>you sure</b> you want to delete this user? <br /> This action cannot be undone.
      </Modal>

      <div className="flex flex-col w-full">
        <div className="space-y-5">
          <h1 className="text-gray-700 mb-10 text-2xl font-medium tracking-wide text-left">Users & Groups</h1>
          <div className="flex justify-between w-100">
            <h1 className="text-gray-600 text-xl text-left tracking-wide font-medium">Groups</h1>
            <button
              type="submit"
              onClick={() => createNewGroup()}
              className="self-end cursor-pointer py-2 px-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Create New Group
            </button>
          </div>
          {fetchGroupError && (
            <p className="px-3 py-2 bg-red-100 border text-red-500 font-medium border-red-200 rounded-lg shadow-md">
              There was an error fetching the groups
            </p>
          )}
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200 ">
              <thead className="bg-gray-100">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3  text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Name
                  </th>

                  <th
                    scope="col"
                    className=" px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Users
                  </th>
                  <th
                    scope="col"
                    className=" px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  ></th>
                </tr>
              </thead>
              <tbody className="bg-gray-50 divide-y divide-gray-200  text-left ">
                {!isLoading &&
                  groups &&
                  groups.groups.map((group) => {
                    return (
                      <tr key={group.id}>
                        <td className="px-6 py-4 text-sm  text-gray-900">{group.name}</td>
                        <td className="px-6 py-2 whitespace-pre-line ">
                          {group.users &&
                            group.users.map((user, key) => {
                              return (
                                <span
                                  key={key}
                                  className="px-2 mr-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800"
                                >
                                  {user.username}
                                </span>
                              );
                            })}
                        </td>
                        <td className="text-gray-400 flex justify-end space-x-5 py-4 px-3 ">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 cursor-pointer "
                            fill="none"
                            onClick={() => onUpdateGroupClick(group.id)}
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                            />
                          </svg>
                          <svg
                            className="w-6 h-6 cursor-pointer "
                            fill="none"
                            onClick={() => onDeleteGroupClick(group.id)}
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>

          <div className="flex justify-between w-100 mt-10">
            <h1 className="text-gray-600 text-xl tracking-wide text-left font-medium mt-10">Users</h1>
            <button
              type="submit"
              onClick={() => createNewUser()}
              className="self-end cursor-pointer py-2 px-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Create New User
            </button>
          </div>
          {fetchUserError && (
            <p className="px-3 py-2 bg-red-100 border text-red-500 font-medium border-red-200 rounded-lg shadow-md">
              There was an error fetching the users
            </p>
          )}
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200 ">
              <thead className="bg-gray-100 ">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3  text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Username
                  </th>

                  <th
                    scope="col"
                    className=" px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Groups
                  </th>

                  <th
                    scope="col"
                    className="px-6 py-3  text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  ></th>
                </tr>
              </thead>
              <tbody className="bg-gray-50 divide-y  divide-gray-200 py-5 text-left ">
                {!loading &&
                  data &&
                  data.users.map((user, index) => {
                    return (
                      <tr key={user.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <Gravatar email={user.email ?? index.toString()} className="rounded-full" />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{user.username}</div>
                              <div className="text-sm text-gray-500">{user.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-2 whitespace-pre-line ">
                          {user.groups &&
                            user.groups.map((group) => {
                              return (
                                <span
                                  key={group.id}
                                  className="px-2 mr-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800"
                                >
                                  {group.name}
                                </span>
                              );
                            })}
                        </td>
                        <td className="text-gray-400 flex justify-end space-x-5 py-6 px-4 ">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 cursor-pointer "
                            fill="none"
                            onClick={() => onUpdateUserClick(user.id)}
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                            />
                          </svg>
                          <svg
                            className="w-6 h-6 cursor-pointer "
                            fill="none"
                            onClick={() => onDeleteUserClick(user.id)}
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </SettingSectionCard>
  );
};

export default Users;
