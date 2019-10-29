import { gql } from "apollo-server-express";
import bcrypt from "bcryptjs";
import { AuthenticationError } from "apollo-server-express";
import { UserModel } from "../models/user";
import * as Auth from "../auth";
import { SESSION_NAME } from "../config";

// TypeDefs
const typeDefs = gql`
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
    registerUser(
      email: String!
      password: String!
      name: String
      age: Int
      gender: String
    ): User
    login(email: String!, password: String!): User
    logout: Boolean
  }
`;

// Resolver
const resolvers = {
  Query: {
    getUsers: (root, args, { req }, info) => {
      Auth.checkLoggedIn(req);
      return UserModel.find();
    },

    me: (root, args, { req }, info) => {
      Auth.checkLoggedIn(req);
      return UserModel.findById(req.session.userId);
    }
  },

  Mutation: {
    // Register User
    registerUser: async (root, args, { req }, info) => {
      // check if user is already loggedIn
      Auth.checkAlreadyLoggedIn(req);

      // check if user already exists
      const user = await UserModel.findOne({ email: args.email });
      if (user) return null; // TODO: throw error user already exists

      // TODO: validate user data before registering

      // hash the password
      args.password = bcrypt.hashSync(args.password, 5);
      return UserModel.create(args);
    },

    // Login
    login: async (root, { email, password }, { req }, info) => {
      // check if user is already loggedIn
      Auth.checkAlreadyLoggedIn(req);

      // check that user exists
      const user = await UserModel.findOne({ email });
      if (!user) {
        throw new AuthenticationError("User does not exist!");
      }

      // check if password match
      if (!bcrypt.compareSync(password, user.password)) {
        throw new AuthenticationError("Invalid password!");
      }

      // save session with user and send a cookie with session id
      req.session.userId = user._id;
      return user;
    },

    // Logout
    logout: (root, args, { req, res }, info) => {
      // user must be signed in
      Auth.checkLoggedIn(req);

      // delete user session
      req.session.destroy();

      // delete user cookie
      res.clearCookie(SESSION_NAME, { path: "/" });

      return true;
    }
  }
};

export default { typeDefs, resolvers };
