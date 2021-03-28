import { gql } from "@apollo/client";

export const GET_APPLICATIONS = gql`
  {
    applications {
      id
      name
    }
  }
`;
