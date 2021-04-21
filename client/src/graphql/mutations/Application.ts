import { gql } from "@apollo/client";

export const CREATE_APPLICATION = gql`
  mutation CreateApplication($name: String!, $fields: [AppFieldCreateInput!]!) {
    createApplication(name: $name, fields: $fields) {
      id
      name
    }
  }
`;

export const DELETE_APPLICATION = gql`
  mutation DeleteApplication($id: String!) {
    deleteApplication(id: $id)
  }
`;

export const SINGLE_FILE_UPLOAD = gql`
  mutation SingleUpload($file: Upload!, $id: String!) {
    singleUpload(file: $file, id: $id) {
      id
      filename
      mimetype
      location
    }
  }
`;

export const INDEX_FILE = gql`
  mutation($id: String!, $fields: [AppFieldInput!]!) {
    indexFile(id: $id, fields: $fields)
  }
`;
