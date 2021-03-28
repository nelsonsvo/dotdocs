import { gql } from "@apollo/client";

export const CREATE_APPLICATION = gql`
  mutation($name: String!, $fields: [AppField!]!) {
    createApplication(name: $name, fields: $fields) {
      id
      name
    }
  }
`;
