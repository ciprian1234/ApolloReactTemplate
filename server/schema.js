import { gql } from 'apollo-server-express';

// config apollo server
export const typeDefs = gql`
  type Query {
    hello: String
  }
`;

export const resolvers = {
  Query: {
    hello: () => 'Hello world!'
  }
};
