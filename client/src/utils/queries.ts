import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query Query($username: String!) {
    me {
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
    `;