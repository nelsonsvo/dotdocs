import { gql } from "@apollo/client";

export const LOGIN = gql`
  query Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      username
      password
      user_type
    }
  }
`;
