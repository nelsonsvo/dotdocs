import { gql } from "@apollo/client";

export const CREATE_APPLICATION = gql`
  mutation CreateApplication($name: String!, $fields: [appField!]!) {
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
