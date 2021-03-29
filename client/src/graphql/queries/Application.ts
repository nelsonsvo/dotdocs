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
