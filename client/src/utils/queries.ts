import { gql } from '@apollo/client';

export const QUERY_USER = gql`
query Query {
  me {
    username
    savedBooks {
      title
      link
      image
      description
      bookId
      authors
    }
    _id
    bookCount
    email
  }
}
    `;