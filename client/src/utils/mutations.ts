import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
}
  `;
export const DELETE_BOOK = gql`
  mutation removeBook($bookId: ID!) {
    removeBook($bookId: ID!) {
      _id
    }
  }
`;

export const SAVE_BOOK = gql`
  mutation saveBook($bookId: ID!, $authors: [String], $description: String, $title: String, $image: String, $link: String) {
    saveBook($bookId: ID!, $authors: [String], $description: String, $title: String, $image: String, $link: String) {
      _id
    }
  }
`;
