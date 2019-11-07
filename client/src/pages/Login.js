import React, { useState, useContext } from 'react';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { UserContext } from '../context';
import { useFormInput } from '../costumHooks';

const ME_QUERY = gql`
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

export const Login = (props) => {
	const userContext = useContext(UserContext);
	const [loggedIn, setLoggedIn] = useState(false);
	const { loading, data, error } = useQuery(ME_QUERY);
	// console.log(loading, data, error);

	if (loggedIn) {
		return (
			<div>
				{loading ? <p>Loading...</p> : null}
				{data ? <p>{JSON.stringify(data)}</p> : null}
				{error ? <p className="error">{error.message}</p> : null}
			</div>
		);
	}
	return <LoginForm />;
};

// login form
const LoginForm = function(props) {
	const email = useFormInput('email', 'text', '');
	const password = useFormInput('password', 'password', '');

	const handleSubmit = function(event) {
		event.preventDefault();
		// call the query
		email.onChange({ target: { value: '' } }); // by default is called with: event.target.value
		password.onChange({ target: { value: '' } }); // by default is called with: event.target.value
	};

	return (
		<form onSubmit={handleSubmit}>
			<div className="row">
				<div className="input-field col s4">
					<input {...email} />
					<label>Email:</label>
				</div>
			</div>
			<div className="row">
				<div className="input-field col s4">
					<input {...password} />
					<label>Password:</label>
				</div>
			</div>
			<div className="row">
				<button type="submit" className="btn green">
					Login
				</button>
			</div>
		</form>
	);
};
