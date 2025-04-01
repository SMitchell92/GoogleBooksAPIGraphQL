const typeDefs = `


  type User {
    _id: ID!
    username: String
    email: String
    savedBooks: [Book]
    bookCount: Int
  }

  type Auth {
    token: ID!
    user: User
  }
  
  input SignupInput {
    username: String!
    email: String!
    password: String!
  }

    input LoginInput {
    email: String!
    password: String!
  }

  type Book {
    bookId: ID!
    authors: [String]
    description: String!
    title: String
    image: String
    link: String
    }

  type Query {
    me: User
  }

  type Mutation {
    addUser(input: SignupInput!): Auth
    login(email: String!, password: String!): Auth
    saveBook(bookId: ID!, authors: [String], description: String, title: String, image: String, link: String): User
    removeBook(bookId: ID!): User
  }
`;

export default typeDefs;
