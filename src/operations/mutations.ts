import { gql } from '@apollo/client';

// Mutation for user registration
export const REGISTER_USER = gql`
  mutation Register($user: UserInput!) {
    register(user: $user) {
      message
      user {
        id
        user_name
        email
        country
        city
        contact
      }
    }
  }
`;

// Mutation for user login
export const LOGIN_USER = gql`
  mutation Login($credentials: Credentials!) {
    login(credentials: $credentials) {
      token
      message
      user {
        id
        user_name
        email
        country
        city
        contact
      }
    }
  }
`;

// Mutation for updating a user
export const UPDATE_USER = gql`
  mutation UpdateUser($user: UserModify!) {
    updateUser(user: $user) {
      message
      user {
        id
        user_name
        email
        country
        city
        contact
      }
    }
  }
`;

// Mutation for deleting a user
export const DELETE_USER = gql`
  mutation DeleteUser {
    deleteUser {
      message
    }
  }
`;

// Mutation for updating a user as admin
export const UPDATE_USER_AS_ADMIN = gql`
  mutation UpdateUserAsAdmin($user: UserModify!, $id: ID!) {
    updateUserAsAdmin(user: $user, id: $id) {
      message
      user {
        id
        user_name
        email
        country
        city
        contact
      }
    }
  }
`;

// Mutation for deleting a user as admin
export const DELETE_USER_AS_ADMIN = gql`
  mutation DeleteUserAsAdmin($id: ID!) {
    deleteUserAsAdmin(id: $id) {
      message
    }
  }
`;
