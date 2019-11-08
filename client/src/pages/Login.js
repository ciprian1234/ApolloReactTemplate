import React, { useState, useContext } from 'react';
import { useMutation } from '@apollo/react-hooks';

// my imports
import * as Auth from '../auth';
import { UserContext } from '../context';
import { useFormInput } from '../costumHooks';
import * as QUERIES from '../graphql/queries';
import * as MUTATIONS from '../graphql/mutations';

export const Login = (props) => {
	const userContext = useContext(UserContext);
	const [loginMutation, { data, loading, error }] = useMutation(MUTATIONS.LOGIN);
	// console.log(loading, data, error);

	if (loading) {
		//TODO: add loading animation
		return <p>Loading...</p>;
	}

	if (data) {
		Auth.setAccessToken(data.login.accessToken);
		return <p>You succesfully logged in! (Redirecting...) TODO </p>;
	}

	if (error) {
		Auth.setAccessToken('');
		return (
			<div>
				<LoginForm args={{ loginMutation }} />
				<p>{error.message}</p>
			</div>
		);
	}

	return <LoginForm args={{ loginMutation }} />;
};

// login form
const LoginForm = function(props) {
	const email = useFormInput('email', 'text', '');
	const password = useFormInput('password', 'password', '');

	const handleSubmit = function(event) {
		event.preventDefault();
		// call the query
		props.args.loginMutation({
			variables: {
				email: email.value,
				password: password.value
			}
		});
		// reset the fields
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
