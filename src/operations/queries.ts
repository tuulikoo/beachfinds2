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


