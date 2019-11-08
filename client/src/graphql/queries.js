import gql from 'graphql-tag';

export const ME = gql`
	query {
		me {
			id
			email
			name
			gender
			birthDate
			role
		}
	}
`;
