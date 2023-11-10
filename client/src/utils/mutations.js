import { gql } from "@apollo/client";

export const ADD_USER = gql`
  mutation addUser($user: UserInput) {
    addUser(user: $user) {
      token
    }
  }
`;

export const LOGIN = gql`
  mutation login($username: String, $password: String) {
    login(username: $username, password: $password) {
      token
    }
  }
`;
