import { gql } from 'apollo-server-express';
import bcrypt from 'bcryptjs';
import { randomBytes } from 'crypto';

import { AuthenticationError } from 'apollo-server-express';
import UserModel from '../models/user';
import * as Auth from '../auth';
import { CONFIG } from '../config';

// TypeDefs
const typeDefs = gql`
	type LoginResponse {
		accessToken: String!
		user: User!
	}

	type User {
		id: ID!
		email: String!
		name: String!
		gender: String
		birthDate: String
		role: String
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
			gender: String
			birthDate: String
		): User
		login(email: String!, password: String!): LoginResponse!
		logout: Boolean
	}
`;

// Resolver
const resolvers = {
	Query: {
		getUsers: async (root, args, { req }, info) => {
			const user = await Auth.authenticate(req);
			return UserModel.find();
		},

		me: async (root, args, { req }, info) => {
			const user = await Auth.authenticate(req);
			return user;
		}
	},

	Mutation: {
		// Register User
		registerUser: async (root, args, { req }, info) => {
			// check if user is already loggedIn

			// check if user already exists
			const user = await UserModel.findOne({ email: args.email });
			if (user) throw new Error('Register error: email already exists!');

			// TODO: validate user data before registering

			// hash the password and generate a random tokenVersion
			args.password = await bcrypt.hash(args.password, 5);
			args.tokenVersion = randomBytes(9).toString('base64'); // generate a string of 12 chars
			return UserModel.create(args);
		},

		// Login
		login: async (root, { email, password }, { res }, info) => {
			// TODO: check if user is already loggedIn, if makes sense

			// check that user exists
			const user = await UserModel.findOne({ email });
			if (!user) {
				throw new AuthenticationError('Login error: user does not exist!');
			}

			// check if password match
			if (!bcrypt.compareSync(password, user.password)) {
				throw new AuthenticationError('Login error: invalid password!');
			}

			// save a refresh token as cookie on user browser
			Auth.createRefreshTokenCookie(res, user);

			// return access token and user data
			return {
				accessToken: Auth.createAccessToken(user),
				user
			};
		},

		// Logout
		logout: async (root, args, { req, res }, info) => {
			// update user tokenVersion => all current generated tokens will be invalidated
			let user = await Auth.authenticate(req);

			await UserModel.findByIdAndUpdate(user.id, {
				tokenVersion: randomBytes(9).toString('base64') // generate a string of 12 chars
			});

			// delete user cookie
			res.clearCookie(CONFIG.JWT_REFRESH_COOKIE_NAME, { path: '/' });

			return true;
		}
	}
};

export default { typeDefs, resolvers };
