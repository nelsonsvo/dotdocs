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
};

export type AppFieldCreateInput = {
  name: Scalars['String'];
  type: Scalars['String'];
  max_length: Scalars['Float'];
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

export type Mutation = {
  __typename?: 'Mutation';
  createApplication: Application;
  deleteApplication: Scalars['Boolean'];
  singleUpload: AppFile;
  indexFile: Scalars['Boolean'];
  createUser: User;
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


export type MutationCreateUserArgs = {
  password: Scalars['String'];
  user_type: Scalars['String'];
  username: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  applications: Array<Application>;
  getFiles: Array<AppFile>;
  me?: Maybe<User>;
  users: Array<User>;
  login?: Maybe<User>;
};


export type QueryGetFilesArgs = {
  fields: Array<AppFieldSearchInput>;
  id: Scalars['String'];
};


export type QueryLoginArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
};


export type User = {
  __typename?: 'User';
  id: Scalars['String'];
  user_type: Scalars['String'];
  username: Scalars['String'];
  password: Scalars['String'];
};

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
      & Pick<AppField, 'id' | 'name' | 'type' | 'max_length'>
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
    )> }
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
    & Pick<User, 'username' | 'password' | 'user_type'>
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
export const LoginDocument = gql`
    query Login($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    username
    password
    user_type
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