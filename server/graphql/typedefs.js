import { gql } from 'apollo-server-express';

// config apollo server
export const typeDefs = gql`
  type User {
    id: ID!
    email: String
    name: String
    age: Int
    gender: String
  }

  type Query {
    me: User
    getUsers: [User]
  }

  type Mutation {
    registerUser(email: String!, password: String!, name: String, age: Int, gender: String): User
    login(email: String!, password: String!): User
    logout: Boolean
  }
`;
