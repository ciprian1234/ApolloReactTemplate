import React, { useState } from 'react';
import { gql } from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

import { useFormInput } from '../costumHooks';

// const REGISTER_MUTATION = gql`
// 	mutation registerUser(
// 		$email: String!
// 		$password: String!
// 		$name: String
// 		$gender: String
// 		$birthDate: String
// 	) {
// 		registerUser(
// 			email: $email
// 			password: $password
// 			name: $name
// 			gender: $gender
// 			birthDate: $birthDate
// 		) {
// 			id
// 			email
// 			password
// 			name
// 			gender
// 			birthDate
// 		}
// 	}
// `;

export const Register = (props) => {
	const email = useFormInput('email', 'text', '');
	const password = useFormInput('password', 'password', '');
	// const [registerUser, { data, loading, error }] = useMutation(REGISTER_MUTATION);

	const handleSubmit = function(event) {
		event.preventDefault();
		// registerUser({
		// 	variables: {
		// 		email: values.email,
		// 		password: values.password,
		// 		name: 'Ciprian',
		// 		gender: 'male',
		// 		birthDate: '10-03-1995'
		// 	}
		// });
		email.onChange({ target: { value: '' } }); // by default is called with: event.target.value
		password.onChange({ target: { value: '' } }); // by default is called with: event.target.value
	};

	return (
		<div>
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
						Register
					</button>
				</div>
			</form>
		</div>
	);
};
