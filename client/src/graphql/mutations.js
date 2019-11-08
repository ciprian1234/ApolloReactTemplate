import gql from 'graphql-tag';

export const LOGIN = gql`
	mutation login($email: String!, $password: String!) {
		login(email: $email, password: $password) {
			accessToken
		}
	}
`;

export const LOGOUT = gql`
	mutation logout {
		logout
	}
`;

export const REGISTER = gql`
	mutation registerUser(
		$email: String!
		$password: String!
		$name: String
		$gender: String
		$birthDate: String
	) {
		registerUser(
			email: $email
			password: $password
			name: $name
			gender: $gender
			birthDate: $birthDate
		) {
			id
			email
			password
			name
			gender
			birthDate
		}
	}
`;
