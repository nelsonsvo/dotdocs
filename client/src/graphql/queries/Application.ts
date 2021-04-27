import { gql } from "@apollo/client";

export const GET_APPLICATIONS = gql`
  query {
    applications {
      id
      name
    }
  }
`;

export const GET_RETRIEVAL_TEMPLATES = gql`
  query {
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

export const GET_FILES = gql`
  query($id: String!, $fields: [AppFieldSearchInput!]!) {
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
