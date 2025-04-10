import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
        savedBooks {
          bookId
          authors
          description
          title
          image
          link
        }
        bookCount
      }
    }
  }
  `;
export const ADD_USER = gql`
mutation AddUser($input: SignupInput!) {
  addUser(input: $input) {
    token
    user {
      email
      username
      _id
    }
  }
}
`;
export const DELETE_BOOK = gql`
  mutation removeBook($bookId: ID!) {
    removeBook(bookId: $bookId) {
      _id
    }
  }
`;

export const SAVE_BOOK = gql`
mutation Mutation($bookId: ID!, $authors: [String], $description: String, $title: String, $image: String, $link: String) {
  saveBook(bookId: $bookId, authors: $authors, description: $description, title: $title, image: $image, link: $link) {
    _id
    bookCount
    email
    savedBooks {
      authors
      bookId
      description
      image
      link
      title
    }
    username
  }
}
`;
