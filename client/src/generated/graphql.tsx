import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type AppField = {
  __typename?: 'AppField';
  id: Scalars['String'];
  type: Scalars['String'];
  name: Scalars['String'];
  max_length: Scalars['Float'];
  filefields?: Maybe<Array<FileField>>;
  picklist_values?: Maybe<Array<Scalars['String']>>;
};

export type AppFieldCreateInput = {
  name: Scalars['String'];
  type: Scalars['String'];
  max_length: Scalars['Float'];
  picklist_values?: Maybe<Array<Scalars['String']>>;
};

export type AppFieldInput = {
  id: Scalars['String'];
  value: Scalars['String'];
};

export type AppFieldSearchInput = {
  id: Scalars['String'];
  value: Scalars['String'];
};

export type AppFile = {
  __typename?: 'AppFile';
  id: Scalars['String'];
  filename: Scalars['String'];
  old_filename: Scalars['String'];
  mimetype: Scalars['String'];
  location: Scalars['String'];
  application: Application;
  fields: Array<FileField>;
  remarks: Array<Remark>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type Application = {
  __typename?: 'Application';
  id: Scalars['String'];
  name: Scalars['String'];
  fields: Array<AppField>;
  files: Array<AppFile>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};


export type FileField = {
  __typename?: 'FileField';
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
  file: AppFile;
  field: AppField;
};

export type Group = {
  __typename?: 'Group';
  id: Scalars['String'];
  name: Scalars['String'];
  permissions?: Maybe<Array<Scalars['String']>>;
  users?: Maybe<Array<User>>;
};

export type KeywordsResponse = {
  __typename?: 'KeywordsResponse';
  keywords?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createApplication: Application;
  deleteApplication: Scalars['Boolean'];
  singleUpload: AppFile;
  indexFile: Scalars['Boolean'];
  deleteFiles: Scalars['Boolean'];
  addRemark: Remark;
  changeKeywords: FileField;
  createGroup: Group;
  deleteGroup: Scalars['Boolean'];
  createUser: User;
  updateUser: User;
  deleteUser: Scalars['Boolean'];
};


export type MutationCreateApplicationArgs = {
  fields: Array<AppFieldCreateInput>;
  name: Scalars['String'];
};


export type MutationDeleteApplicationArgs = {
  id: Scalars['String'];
};


export type MutationSingleUploadArgs = {
  id: Scalars['String'];
  file: Scalars['Upload'];
};


export type MutationIndexFileArgs = {
  id: Scalars['String'];
  fields: Array<AppFieldInput>;
};


export type MutationDeleteFilesArgs = {
  id: Array<Scalars['String']>;
};


export type MutationAddRemarkArgs = {
  author: Scalars['String'];
  message: Scalars['String'];
  id: Scalars['String'];
};


export type MutationChangeKeywordsArgs = {
  keywords: Scalars['String'];
  id: Scalars['String'];
};


export type MutationCreateGroupArgs = {
  permissions: Array<Scalars['String']>;
  name: Scalars['String'];
};


export type MutationDeleteGroupArgs = {
  id: Scalars['String'];
};


export type MutationCreateUserArgs = {
  groupId: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationUpdateUserArgs = {
  groupId: Scalars['String'];
  email: Scalars['String'];
  username: Scalars['String'];
  id: Scalars['String'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  applications: Array<Application>;
  getFiles: Array<AppFile>;
  getRemarks: Array<Remark>;
  getKeywords: KeywordsResponse;
  groups: Array<Group>;
  me?: Maybe<User>;
  users: Array<User>;
  userById: Array<User>;
  login?: Maybe<User>;
};


export type QueryGetFilesArgs = {
  fields: Array<AppFieldSearchInput>;
  id: Scalars['String'];
};


export type QueryGetRemarksArgs = {
  id: Scalars['String'];
};


export type QueryGetKeywordsArgs = {
  id: Scalars['String'];
};


export type QueryUserByIdArgs = {
  id: Scalars['String'];
};


export type QueryLoginArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
};

export type Remark = {
  __typename?: 'Remark';
  id: Scalars['String'];
  message: Scalars['String'];
  author: Scalars['String'];
  createdAt: Scalars['DateTime'];
  file: AppFile;
};


export type User = {
  __typename?: 'User';
  id: Scalars['String'];
  username: Scalars['String'];
  email?: Maybe<Scalars['String']>;
  password: Scalars['String'];
  groups?: Maybe<Array<Group>>;
};

export type DeleteFilesMutationVariables = Exact<{
  id: Array<Scalars['String']> | Scalars['String'];
}>;


export type DeleteFilesMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteFiles'>
);

export type ChangeKeywordsMutationVariables = Exact<{
  id: Scalars['String'];
  keywords: Scalars['String'];
}>;


export type ChangeKeywordsMutation = (
  { __typename?: 'Mutation' }
  & { changeKeywords: (
    { __typename?: 'FileField' }
    & Pick<FileField, 'value'>
  ) }
);

export type CreateApplicationMutationVariables = Exact<{
  name: Scalars['String'];
  fields: Array<AppFieldCreateInput> | AppFieldCreateInput;
}>;


export type CreateApplicationMutation = (
  { __typename?: 'Mutation' }
  & { createApplication: (
    { __typename?: 'Application' }
    & Pick<Application, 'id' | 'name'>
  ) }
);

export type DeleteApplicationMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteApplicationMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteApplication'>
);

export type SingleUploadMutationVariables = Exact<{
  file: Scalars['Upload'];
  id: Scalars['String'];
}>;


export type SingleUploadMutation = (
  { __typename?: 'Mutation' }
  & { singleUpload: (
    { __typename?: 'AppFile' }
    & Pick<AppFile, 'id' | 'filename' | 'mimetype' | 'location'>
  ) }
);

export type IndexFileMutationVariables = Exact<{
  id: Scalars['String'];
  fields: Array<AppFieldInput> | AppFieldInput;
}>;


export type IndexFileMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'indexFile'>
);

export type CreateGroupMutationVariables = Exact<{
  permissions: Array<Scalars['String']> | Scalars['String'];
  name: Scalars['String'];
}>;


export type CreateGroupMutation = (
  { __typename?: 'Mutation' }
  & { createGroup: (
    { __typename?: 'Group' }
    & Pick<Group, 'id' | 'name' | 'permissions'>
  ) }
);

export type DeleteGroupMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteGroupMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteGroup'>
);

export type AddRemarkMutationVariables = Exact<{
  id: Scalars['String'];
  message: Scalars['String'];
  author: Scalars['String'];
}>;


export type AddRemarkMutation = (
  { __typename?: 'Mutation' }
  & { addRemark: (
    { __typename?: 'Remark' }
    & Pick<Remark, 'id' | 'message' | 'author' | 'createdAt'>
  ) }
);

export type CreateUserMutationVariables = Exact<{
  groupId: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
}>;


export type CreateUserMutation = (
  { __typename?: 'Mutation' }
  & { createUser: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username'>
  ) }
);

export type DeleteUserMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteUserMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteUser'>
);

export type UpdateUserMutationVariables = Exact<{
  groupId: Scalars['String'];
  email: Scalars['String'];
  username: Scalars['String'];
  id: Scalars['String'];
}>;


export type UpdateUserMutation = (
  { __typename?: 'Mutation' }
  & { updateUser: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username'>
  ) }
);

export type GetRemarksQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetRemarksQuery = (
  { __typename?: 'Query' }
  & { getRemarks: Array<(
    { __typename?: 'Remark' }
    & Pick<Remark, 'id' | 'message' | 'author' | 'createdAt'>
  )> }
);

export type GetKeywordsQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetKeywordsQuery = (
  { __typename?: 'Query' }
  & { getKeywords: (
    { __typename?: 'KeywordsResponse' }
    & Pick<KeywordsResponse, 'keywords'>
  ) }
);

export type GetApplicationsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetApplicationsQuery = (
  { __typename?: 'Query' }
  & { applications: Array<(
    { __typename?: 'Application' }
    & Pick<Application, 'id' | 'name'>
  )> }
);

export type GetRetrievalTemplatesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetRetrievalTemplatesQuery = (
  { __typename?: 'Query' }
  & { applications: Array<(
    { __typename?: 'Application' }
    & Pick<Application, 'id' | 'name' | 'updatedAt'>
    & { fields: Array<(
      { __typename?: 'AppField' }
      & Pick<AppField, 'id' | 'name' | 'type' | 'max_length' | 'picklist_values'>
    )> }
  )> }
);

export type GetFilesQueryVariables = Exact<{
  id: Scalars['String'];
  fields: Array<AppFieldSearchInput> | AppFieldSearchInput;
}>;


export type GetFilesQuery = (
  { __typename?: 'Query' }
  & { getFiles: Array<(
    { __typename?: 'AppFile' }
    & Pick<AppFile, 'id' | 'filename' | 'location'>
    & { fields: Array<(
      { __typename?: 'FileField' }
      & Pick<FileField, 'id' | 'name' | 'value'>
      & { field: (
        { __typename?: 'AppField' }
        & Pick<AppField, 'type'>
      ) }
    )>, remarks: Array<(
      { __typename?: 'Remark' }
      & Pick<Remark, 'id' | 'message' | 'author' | 'createdAt'>
    )> }
  )> }
);

export type GetGroupsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetGroupsQuery = (
  { __typename?: 'Query' }
  & { groups: Array<(
    { __typename?: 'Group' }
    & Pick<Group, 'id' | 'name' | 'permissions'>
    & { users?: Maybe<Array<(
      { __typename?: 'User' }
      & Pick<User, 'username'>
    )>> }
  )> }
);

export type GetGroupNamesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetGroupNamesQuery = (
  { __typename?: 'Query' }
  & { groups: Array<(
    { __typename?: 'Group' }
    & Pick<Group, 'id' | 'name'>
  )> }
);

export type LoginQueryVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginQuery = (
  { __typename?: 'Query' }
  & { login?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'username' | 'password'>
  )> }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'username' | 'password'>
  )> }
);

export type GetUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUsersQuery = (
  { __typename?: 'Query' }
  & { users: Array<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username' | 'email'>
    & { groups?: Maybe<Array<(
      { __typename?: 'Group' }
      & Pick<Group, 'id' | 'name'>
    )>> }
  )> }
);

export type GetUserByIdQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetUserByIdQuery = (
  { __typename?: 'Query' }
  & { userById: Array<(
    { __typename?: 'User' }
    & Pick<User, 'username' | 'email'>
    & { groups?: Maybe<Array<(
      { __typename?: 'Group' }
      & Pick<Group, 'id' | 'name'>
    )>> }
  )> }
);


export const DeleteFilesDocument = gql`
    mutation DeleteFiles($id: [String!]!) {
  deleteFiles(id: $id)
}
    `;
export type DeleteFilesMutationFn = Apollo.MutationFunction<DeleteFilesMutation, DeleteFilesMutationVariables>;

/**
 * __useDeleteFilesMutation__
 *
 * To run a mutation, you first call `useDeleteFilesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteFilesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteFilesMutation, { data, loading, error }] = useDeleteFilesMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteFilesMutation(baseOptions?: Apollo.MutationHookOptions<DeleteFilesMutation, DeleteFilesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteFilesMutation, DeleteFilesMutationVariables>(DeleteFilesDocument, options);
      }
export type DeleteFilesMutationHookResult = ReturnType<typeof useDeleteFilesMutation>;
export type DeleteFilesMutationResult = Apollo.MutationResult<DeleteFilesMutation>;
export type DeleteFilesMutationOptions = Apollo.BaseMutationOptions<DeleteFilesMutation, DeleteFilesMutationVariables>;
export const ChangeKeywordsDocument = gql`
    mutation ChangeKeywords($id: String!, $keywords: String!) {
  changeKeywords(id: $id, keywords: $keywords) {
    value
  }
}
    `;
export type ChangeKeywordsMutationFn = Apollo.MutationFunction<ChangeKeywordsMutation, ChangeKeywordsMutationVariables>;

/**
 * __useChangeKeywordsMutation__
 *
 * To run a mutation, you first call `useChangeKeywordsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeKeywordsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeKeywordsMutation, { data, loading, error }] = useChangeKeywordsMutation({
 *   variables: {
 *      id: // value for 'id'
 *      keywords: // value for 'keywords'
 *   },
 * });
 */
export function useChangeKeywordsMutation(baseOptions?: Apollo.MutationHookOptions<ChangeKeywordsMutation, ChangeKeywordsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangeKeywordsMutation, ChangeKeywordsMutationVariables>(ChangeKeywordsDocument, options);
      }
export type ChangeKeywordsMutationHookResult = ReturnType<typeof useChangeKeywordsMutation>;
export type ChangeKeywordsMutationResult = Apollo.MutationResult<ChangeKeywordsMutation>;
export type ChangeKeywordsMutationOptions = Apollo.BaseMutationOptions<ChangeKeywordsMutation, ChangeKeywordsMutationVariables>;
export const CreateApplicationDocument = gql`
    mutation CreateApplication($name: String!, $fields: [AppFieldCreateInput!]!) {
  createApplication(name: $name, fields: $fields) {
    id
    name
  }
}
    `;
export type CreateApplicationMutationFn = Apollo.MutationFunction<CreateApplicationMutation, CreateApplicationMutationVariables>;

/**
 * __useCreateApplicationMutation__
 *
 * To run a mutation, you first call `useCreateApplicationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateApplicationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createApplicationMutation, { data, loading, error }] = useCreateApplicationMutation({
 *   variables: {
 *      name: // value for 'name'
 *      fields: // value for 'fields'
 *   },
 * });
 */
export function useCreateApplicationMutation(baseOptions?: Apollo.MutationHookOptions<CreateApplicationMutation, CreateApplicationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateApplicationMutation, CreateApplicationMutationVariables>(CreateApplicationDocument, options);
      }
export type CreateApplicationMutationHookResult = ReturnType<typeof useCreateApplicationMutation>;
export type CreateApplicationMutationResult = Apollo.MutationResult<CreateApplicationMutation>;
export type CreateApplicationMutationOptions = Apollo.BaseMutationOptions<CreateApplicationMutation, CreateApplicationMutationVariables>;
export const DeleteApplicationDocument = gql`
    mutation DeleteApplication($id: String!) {
  deleteApplication(id: $id)
}
    `;
export type DeleteApplicationMutationFn = Apollo.MutationFunction<DeleteApplicationMutation, DeleteApplicationMutationVariables>;

/**
 * __useDeleteApplicationMutation__
 *
 * To run a mutation, you first call `useDeleteApplicationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteApplicationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteApplicationMutation, { data, loading, error }] = useDeleteApplicationMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteApplicationMutation(baseOptions?: Apollo.MutationHookOptions<DeleteApplicationMutation, DeleteApplicationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteApplicationMutation, DeleteApplicationMutationVariables>(DeleteApplicationDocument, options);
      }
export type DeleteApplicationMutationHookResult = ReturnType<typeof useDeleteApplicationMutation>;
export type DeleteApplicationMutationResult = Apollo.MutationResult<DeleteApplicationMutation>;
export type DeleteApplicationMutationOptions = Apollo.BaseMutationOptions<DeleteApplicationMutation, DeleteApplicationMutationVariables>;
export const SingleUploadDocument = gql`
    mutation SingleUpload($file: Upload!, $id: String!) {
  singleUpload(file: $file, id: $id) {
    id
    filename
    mimetype
    location
  }
}
    `;
export type SingleUploadMutationFn = Apollo.MutationFunction<SingleUploadMutation, SingleUploadMutationVariables>;

/**
 * __useSingleUploadMutation__
 *
 * To run a mutation, you first call `useSingleUploadMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSingleUploadMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [singleUploadMutation, { data, loading, error }] = useSingleUploadMutation({
 *   variables: {
 *      file: // value for 'file'
 *      id: // value for 'id'
 *   },
 * });
 */
export function useSingleUploadMutation(baseOptions?: Apollo.MutationHookOptions<SingleUploadMutation, SingleUploadMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SingleUploadMutation, SingleUploadMutationVariables>(SingleUploadDocument, options);
      }
export type SingleUploadMutationHookResult = ReturnType<typeof useSingleUploadMutation>;
export type SingleUploadMutationResult = Apollo.MutationResult<SingleUploadMutation>;
export type SingleUploadMutationOptions = Apollo.BaseMutationOptions<SingleUploadMutation, SingleUploadMutationVariables>;
export const IndexFileDocument = gql`
    mutation IndexFile($id: String!, $fields: [AppFieldInput!]!) {
  indexFile(id: $id, fields: $fields)
}
    `;
export type IndexFileMutationFn = Apollo.MutationFunction<IndexFileMutation, IndexFileMutationVariables>;

/**
 * __useIndexFileMutation__
 *
 * To run a mutation, you first call `useIndexFileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useIndexFileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [indexFileMutation, { data, loading, error }] = useIndexFileMutation({
 *   variables: {
 *      id: // value for 'id'
 *      fields: // value for 'fields'
 *   },
 * });
 */
export function useIndexFileMutation(baseOptions?: Apollo.MutationHookOptions<IndexFileMutation, IndexFileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<IndexFileMutation, IndexFileMutationVariables>(IndexFileDocument, options);
      }
export type IndexFileMutationHookResult = ReturnType<typeof useIndexFileMutation>;
export type IndexFileMutationResult = Apollo.MutationResult<IndexFileMutation>;
export type IndexFileMutationOptions = Apollo.BaseMutationOptions<IndexFileMutation, IndexFileMutationVariables>;
export const CreateGroupDocument = gql`
    mutation CreateGroup($permissions: [String!]!, $name: String!) {
  createGroup(permissions: $permissions, name: $name) {
    id
    name
    permissions
  }
}
    `;
export type CreateGroupMutationFn = Apollo.MutationFunction<CreateGroupMutation, CreateGroupMutationVariables>;

/**
 * __useCreateGroupMutation__
 *
 * To run a mutation, you first call `useCreateGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createGroupMutation, { data, loading, error }] = useCreateGroupMutation({
 *   variables: {
 *      permissions: // value for 'permissions'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useCreateGroupMutation(baseOptions?: Apollo.MutationHookOptions<CreateGroupMutation, CreateGroupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateGroupMutation, CreateGroupMutationVariables>(CreateGroupDocument, options);
      }
export type CreateGroupMutationHookResult = ReturnType<typeof useCreateGroupMutation>;
export type CreateGroupMutationResult = Apollo.MutationResult<CreateGroupMutation>;
export type CreateGroupMutationOptions = Apollo.BaseMutationOptions<CreateGroupMutation, CreateGroupMutationVariables>;
export const DeleteGroupDocument = gql`
    mutation DeleteGroup($id: String!) {
  deleteGroup(id: $id)
}
    `;
export type DeleteGroupMutationFn = Apollo.MutationFunction<DeleteGroupMutation, DeleteGroupMutationVariables>;

/**
 * __useDeleteGroupMutation__
 *
 * To run a mutation, you first call `useDeleteGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteGroupMutation, { data, loading, error }] = useDeleteGroupMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteGroupMutation(baseOptions?: Apollo.MutationHookOptions<DeleteGroupMutation, DeleteGroupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteGroupMutation, DeleteGroupMutationVariables>(DeleteGroupDocument, options);
      }
export type DeleteGroupMutationHookResult = ReturnType<typeof useDeleteGroupMutation>;
export type DeleteGroupMutationResult = Apollo.MutationResult<DeleteGroupMutation>;
export type DeleteGroupMutationOptions = Apollo.BaseMutationOptions<DeleteGroupMutation, DeleteGroupMutationVariables>;
export const AddRemarkDocument = gql`
    mutation AddRemark($id: String!, $message: String!, $author: String!) {
  addRemark(id: $id, message: $message, author: $author) {
    id
    message
    author
    createdAt
  }
}
    `;
export type AddRemarkMutationFn = Apollo.MutationFunction<AddRemarkMutation, AddRemarkMutationVariables>;

/**
 * __useAddRemarkMutation__
 *
 * To run a mutation, you first call `useAddRemarkMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddRemarkMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addRemarkMutation, { data, loading, error }] = useAddRemarkMutation({
 *   variables: {
 *      id: // value for 'id'
 *      message: // value for 'message'
 *      author: // value for 'author'
 *   },
 * });
 */
export function useAddRemarkMutation(baseOptions?: Apollo.MutationHookOptions<AddRemarkMutation, AddRemarkMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddRemarkMutation, AddRemarkMutationVariables>(AddRemarkDocument, options);
      }
export type AddRemarkMutationHookResult = ReturnType<typeof useAddRemarkMutation>;
export type AddRemarkMutationResult = Apollo.MutationResult<AddRemarkMutation>;
export type AddRemarkMutationOptions = Apollo.BaseMutationOptions<AddRemarkMutation, AddRemarkMutationVariables>;
export const CreateUserDocument = gql`
    mutation CreateUser($groupId: String!, $email: String!, $password: String!, $username: String!) {
  createUser(
    groupId: $groupId
    email: $email
    password: $password
    username: $username
  ) {
    id
    username
  }
}
    `;
export type CreateUserMutationFn = Apollo.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      groupId: // value for 'groupId'
 *      email: // value for 'email'
 *      password: // value for 'password'
 *      username: // value for 'username'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, options);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
export const DeleteUserDocument = gql`
    mutation DeleteUser($id: String!) {
  deleteUser(id: $id)
}
    `;
export type DeleteUserMutationFn = Apollo.MutationFunction<DeleteUserMutation, DeleteUserMutationVariables>;

/**
 * __useDeleteUserMutation__
 *
 * To run a mutation, you first call `useDeleteUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUserMutation, { data, loading, error }] = useDeleteUserMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteUserMutation(baseOptions?: Apollo.MutationHookOptions<DeleteUserMutation, DeleteUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteUserMutation, DeleteUserMutationVariables>(DeleteUserDocument, options);
      }
export type DeleteUserMutationHookResult = ReturnType<typeof useDeleteUserMutation>;
export type DeleteUserMutationResult = Apollo.MutationResult<DeleteUserMutation>;
export type DeleteUserMutationOptions = Apollo.BaseMutationOptions<DeleteUserMutation, DeleteUserMutationVariables>;
export const UpdateUserDocument = gql`
    mutation UpdateUser($groupId: String!, $email: String!, $username: String!, $id: String!) {
  updateUser(id: $id, groupId: $groupId, email: $email, username: $username) {
    id
    username
  }
}
    `;
export type UpdateUserMutationFn = Apollo.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      groupId: // value for 'groupId'
 *      email: // value for 'email'
 *      username: // value for 'username'
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUpdateUserMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, options);
      }
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = Apollo.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>;
export const GetRemarksDocument = gql`
    query GetRemarks($id: String!) {
  getRemarks(id: $id) {
    id
    message
    author
    createdAt
  }
}
    `;

/**
 * __useGetRemarksQuery__
 *
 * To run a query within a React component, call `useGetRemarksQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRemarksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRemarksQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetRemarksQuery(baseOptions: Apollo.QueryHookOptions<GetRemarksQuery, GetRemarksQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetRemarksQuery, GetRemarksQueryVariables>(GetRemarksDocument, options);
      }
export function useGetRemarksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRemarksQuery, GetRemarksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetRemarksQuery, GetRemarksQueryVariables>(GetRemarksDocument, options);
        }
export type GetRemarksQueryHookResult = ReturnType<typeof useGetRemarksQuery>;
export type GetRemarksLazyQueryHookResult = ReturnType<typeof useGetRemarksLazyQuery>;
export type GetRemarksQueryResult = Apollo.QueryResult<GetRemarksQuery, GetRemarksQueryVariables>;
export const GetKeywordsDocument = gql`
    query GetKeywords($id: String!) {
  getKeywords(id: $id) {
    keywords
  }
}
    `;

/**
 * __useGetKeywordsQuery__
 *
 * To run a query within a React component, call `useGetKeywordsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetKeywordsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetKeywordsQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetKeywordsQuery(baseOptions: Apollo.QueryHookOptions<GetKeywordsQuery, GetKeywordsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetKeywordsQuery, GetKeywordsQueryVariables>(GetKeywordsDocument, options);
      }
export function useGetKeywordsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetKeywordsQuery, GetKeywordsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetKeywordsQuery, GetKeywordsQueryVariables>(GetKeywordsDocument, options);
        }
export type GetKeywordsQueryHookResult = ReturnType<typeof useGetKeywordsQuery>;
export type GetKeywordsLazyQueryHookResult = ReturnType<typeof useGetKeywordsLazyQuery>;
export type GetKeywordsQueryResult = Apollo.QueryResult<GetKeywordsQuery, GetKeywordsQueryVariables>;
export const GetApplicationsDocument = gql`
    query GetApplications {
  applications {
    id
    name
  }
}
    `;

/**
 * __useGetApplicationsQuery__
 *
 * To run a query within a React component, call `useGetApplicationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetApplicationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetApplicationsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetApplicationsQuery(baseOptions?: Apollo.QueryHookOptions<GetApplicationsQuery, GetApplicationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetApplicationsQuery, GetApplicationsQueryVariables>(GetApplicationsDocument, options);
      }
export function useGetApplicationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetApplicationsQuery, GetApplicationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetApplicationsQuery, GetApplicationsQueryVariables>(GetApplicationsDocument, options);
        }
export type GetApplicationsQueryHookResult = ReturnType<typeof useGetApplicationsQuery>;
export type GetApplicationsLazyQueryHookResult = ReturnType<typeof useGetApplicationsLazyQuery>;
export type GetApplicationsQueryResult = Apollo.QueryResult<GetApplicationsQuery, GetApplicationsQueryVariables>;
export const GetRetrievalTemplatesDocument = gql`
    query GetRetrievalTemplates {
  applications {
    id
    name
    updatedAt
    fields {
      id
      name
      type
      max_length
      picklist_values
    }
  }
}
    `;

/**
 * __useGetRetrievalTemplatesQuery__
 *
 * To run a query within a React component, call `useGetRetrievalTemplatesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRetrievalTemplatesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRetrievalTemplatesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetRetrievalTemplatesQuery(baseOptions?: Apollo.QueryHookOptions<GetRetrievalTemplatesQuery, GetRetrievalTemplatesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetRetrievalTemplatesQuery, GetRetrievalTemplatesQueryVariables>(GetRetrievalTemplatesDocument, options);
      }
export function useGetRetrievalTemplatesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRetrievalTemplatesQuery, GetRetrievalTemplatesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetRetrievalTemplatesQuery, GetRetrievalTemplatesQueryVariables>(GetRetrievalTemplatesDocument, options);
        }
export type GetRetrievalTemplatesQueryHookResult = ReturnType<typeof useGetRetrievalTemplatesQuery>;
export type GetRetrievalTemplatesLazyQueryHookResult = ReturnType<typeof useGetRetrievalTemplatesLazyQuery>;
export type GetRetrievalTemplatesQueryResult = Apollo.QueryResult<GetRetrievalTemplatesQuery, GetRetrievalTemplatesQueryVariables>;
export const GetFilesDocument = gql`
    query GetFiles($id: String!, $fields: [AppFieldSearchInput!]!) {
  getFiles(id: $id, fields: $fields) {
    id
    filename
    location
    fields {
      id
      name
      value
      field {
        type
      }
    }
    remarks {
      id
      message
      author
      createdAt
    }
  }
}
    `;

/**
 * __useGetFilesQuery__
 *
 * To run a query within a React component, call `useGetFilesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFilesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFilesQuery({
 *   variables: {
 *      id: // value for 'id'
 *      fields: // value for 'fields'
 *   },
 * });
 */
export function useGetFilesQuery(baseOptions: Apollo.QueryHookOptions<GetFilesQuery, GetFilesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetFilesQuery, GetFilesQueryVariables>(GetFilesDocument, options);
      }
export function useGetFilesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetFilesQuery, GetFilesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetFilesQuery, GetFilesQueryVariables>(GetFilesDocument, options);
        }
export type GetFilesQueryHookResult = ReturnType<typeof useGetFilesQuery>;
export type GetFilesLazyQueryHookResult = ReturnType<typeof useGetFilesLazyQuery>;
export type GetFilesQueryResult = Apollo.QueryResult<GetFilesQuery, GetFilesQueryVariables>;
export const GetGroupsDocument = gql`
    query GetGroups {
  groups {
    id
    name
    permissions
    users {
      username
    }
  }
}
    `;

/**
 * __useGetGroupsQuery__
 *
 * To run a query within a React component, call `useGetGroupsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetGroupsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetGroupsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetGroupsQuery(baseOptions?: Apollo.QueryHookOptions<GetGroupsQuery, GetGroupsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetGroupsQuery, GetGroupsQueryVariables>(GetGroupsDocument, options);
      }
export function useGetGroupsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetGroupsQuery, GetGroupsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetGroupsQuery, GetGroupsQueryVariables>(GetGroupsDocument, options);
        }
export type GetGroupsQueryHookResult = ReturnType<typeof useGetGroupsQuery>;
export type GetGroupsLazyQueryHookResult = ReturnType<typeof useGetGroupsLazyQuery>;
export type GetGroupsQueryResult = Apollo.QueryResult<GetGroupsQuery, GetGroupsQueryVariables>;
export const GetGroupNamesDocument = gql`
    query GetGroupNames {
  groups {
    id
    name
  }
}
    `;

/**
 * __useGetGroupNamesQuery__
 *
 * To run a query within a React component, call `useGetGroupNamesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetGroupNamesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetGroupNamesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetGroupNamesQuery(baseOptions?: Apollo.QueryHookOptions<GetGroupNamesQuery, GetGroupNamesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetGroupNamesQuery, GetGroupNamesQueryVariables>(GetGroupNamesDocument, options);
      }
export function useGetGroupNamesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetGroupNamesQuery, GetGroupNamesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetGroupNamesQuery, GetGroupNamesQueryVariables>(GetGroupNamesDocument, options);
        }
export type GetGroupNamesQueryHookResult = ReturnType<typeof useGetGroupNamesQuery>;
export type GetGroupNamesLazyQueryHookResult = ReturnType<typeof useGetGroupNamesLazyQuery>;
export type GetGroupNamesQueryResult = Apollo.QueryResult<GetGroupNamesQuery, GetGroupNamesQueryVariables>;
export const LoginDocument = gql`
    query Login($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    username
    password
  }
}
    `;

/**
 * __useLoginQuery__
 *
 * To run a query within a React component, call `useLoginQuery` and pass it any options that fit your needs.
 * When your component renders, `useLoginQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLoginQuery({
 *   variables: {
 *      username: // value for 'username'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginQuery(baseOptions: Apollo.QueryHookOptions<LoginQuery, LoginQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LoginQuery, LoginQueryVariables>(LoginDocument, options);
      }
export function useLoginLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LoginQuery, LoginQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LoginQuery, LoginQueryVariables>(LoginDocument, options);
        }
export type LoginQueryHookResult = ReturnType<typeof useLoginQuery>;
export type LoginLazyQueryHookResult = ReturnType<typeof useLoginLazyQuery>;
export type LoginQueryResult = Apollo.QueryResult<LoginQuery, LoginQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    username
    password
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const GetUsersDocument = gql`
    query GetUsers {
  users {
    id
    username
    email
    groups {
      id
      name
    }
  }
}
    `;

/**
 * __useGetUsersQuery__
 *
 * To run a query within a React component, call `useGetUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUsersQuery(baseOptions?: Apollo.QueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
      }
export function useGetUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
        }
export type GetUsersQueryHookResult = ReturnType<typeof useGetUsersQuery>;
export type GetUsersLazyQueryHookResult = ReturnType<typeof useGetUsersLazyQuery>;
export type GetUsersQueryResult = Apollo.QueryResult<GetUsersQuery, GetUsersQueryVariables>;
export const GetUserByIdDocument = gql`
    query GetUserById($id: String!) {
  userById(id: $id) {
    username
    email
    groups {
      id
      name
    }
  }
}
    `;

/**
 * __useGetUserByIdQuery__
 *
 * To run a query within a React component, call `useGetUserByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetUserByIdQuery(baseOptions: Apollo.QueryHookOptions<GetUserByIdQuery, GetUserByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserByIdQuery, GetUserByIdQueryVariables>(GetUserByIdDocument, options);
      }
export function useGetUserByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserByIdQuery, GetUserByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserByIdQuery, GetUserByIdQueryVariables>(GetUserByIdDocument, options);
        }
export type GetUserByIdQueryHookResult = ReturnType<typeof useGetUserByIdQuery>;
export type GetUserByIdLazyQueryHookResult = ReturnType<typeof useGetUserByIdLazyQuery>;
export type GetUserByIdQueryResult = Apollo.QueryResult<GetUserByIdQuery, GetUserByIdQueryVariables>;