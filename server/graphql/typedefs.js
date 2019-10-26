import { gql } from 'apollo-server-express';

// config apollo server
export const typeDefs = gql`
  type User {
    id: ID!
    name: String
  }

  type Query {
    getUsers: [User]
  }

  type Mutation {
    createUser(name: String): User
  }
`;
