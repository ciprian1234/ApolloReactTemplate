import React from 'react';
import { Redirect } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';

// my imports
import * as Auth from '../auth';
import { useFormInput } from '../costumHooks';
import * as MUTATIONS from '../graphql/mutations';

export const Login = (props) => {
	const [loginMutation, { data, loading, error }] = useMutation(MUTATIONS.LOGIN);
	// console.log(loading, data, error);

	if (loading) {
		//TODO: add loading animation
		return <p>Loading...</p>;
	}

	if (data) {
		Auth.setAccessToken(data.login.accessToken);
		return <Redirect to={{ pathname: '/', state: { from: props.location } }} />;
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
