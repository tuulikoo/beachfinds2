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

export const CREATE_POST = gql`
  mutation CreatePost($input: PostInput!) {
    createPost(input: $input) {
      id
      title
      description
      category
      owner {
        id
      }
      tags {
        id
        label
      }
      location {
        type
        coordinates
      }
    }
  }
`;

// Mutation for updating a post
export const UPDATE_POST = gql`
  mutation UpdatePost($id: ID!, $input: PostModify!) {
    updatePost(id: $id, input: $input) {
      id
      title
      description
      category
      tags {
        id
        label
      }
      location {
        type
        coordinates
      }
    }
  }
`;

// Mutation for deleting a post
export const DELETE_POST = gql`
  mutation DeletePost($id: ID!) {
    deletePost(id: $id) {
      id
    }
  }
`;

// Mutation for creating a tag
export const CREATE_TAG = gql`
  mutation CreateTag($label: String!) {
    createTag(label: $label) {
      id
      label
    }
  }
`;
// Mutation for updating a tag
export const UPDATE_TAG = gql`
  mutation UpdateTag($id: ID!, $label: String!) {
    updateTag(id: $id, label: $label) {
      id
      label
    }
  }
`;

// Mutation for deleting a tag
export const DELETE_TAG = gql`
  mutation DeleteTag($id: ID!) {
    deleteTag(id: $id) {
      id
    }
  }
`;

export const CREATE_LOCATION_DETAILS = gql`
  mutation CreateLocationDetails($input: LocationDetailsInput!) {
    createLocationDetails(input: $input) {
      id
      lat
      lng
      continent
      country
      state
      town
    }
  }
`;