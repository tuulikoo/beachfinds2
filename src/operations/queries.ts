import { gql } from "@apollo/client";

export const GET_USER_DETAILS = gql`
  query GetUserDetails($id: ID!) {
    userById(id: $id) {
      id
      email
      user_name
      country
      city
      contact
    }
  }
`;

export const GET_ALL_USERS = gql`
  query Users {
    users {
      id
      email
      user_name
      country
      city
      contact
    }
  }
`;

// Query to fetch a single user by ID
export const GET_USER_BY_ID = gql`
  query GetUserById($id: ID!) {
    userById(id: $id) {
      id
      email
      user_name
      country
      city
      contact
    }
  }
`;

// Query to check current user token validity
export const CHECK_TOKEN = gql`
  query CheckToken {
    checkToken {
      user {
        id
        user_name
        email
        role
        country
        city
        contact
      }
    }
  }
`;

export const GET_ALL_POSTS = gql`
  query GetAllPosts {
    posts {
      id
      title
      item_name
      description
      category
      filename
      owner {
        id
        user_name
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

// Query to fetch a single post by ID
export const GET_POST_BY_ID = gql`
  query GetPostById($id: ID!) {
    postById(id: $id) {
      id
      title
      description
      category
      item_name
      filename
      owner {
        id
        user_name
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

// Query to fetch posts by area
export const GET_POSTS_BY_AREA = gql`
  query GetPostsByArea($topRight: Coordinates!, $bottomLeft: Coordinates!) {
    postsByArea(topRight: $topRight, bottomLeft: $bottomLeft) {
      id
      title
      description
      location {
        type
        coordinates
      }
    }
  }
`;

// Query to fetch posts by owner
export const GET_POSTS_BY_OWNER = gql`
  query GetPostsByOwner($ownerId: ID!) {
    postsByOwner(ownerId: $ownerId) {
      id
      title
      description
      createdAt
    }
  }
`;

// Query to fetch all tags
export const GET_ALL_TAGS = gql`
  query GetAllTags {
    allTags {
      id
      label
    }
  }
`;

// Query to fetch a single tag by ID
export const GET_TAG_BY_ID = gql`
  query GetTagById($id: ID!) {
    tagById(id: $id) {
      id
      label
    }
  }
`;

export const GET_LOCATION_BY_COORDINATES = gql`
  query LocationByCoordinates($lat: Float!, $lng: Float!) {
    locationByCoordinates(lat: $lat, lng: $lng) {
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
