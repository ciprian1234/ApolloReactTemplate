import React, { useState, useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';

//my imports
import * as QUERIES from '../graphql/queries';

export const Profile = function(props) {
	const { loading, data, error } = useQuery(QUERIES.ME);

	if (loading) {
		//TODO: add loading animation
		return <p>Loading...</p>;
	}

	if (data) {
		return <p>{JSON.stringify(data)}</p>;
	}

	if (error) {
		return (
			<div>
				<p>{error.message}</p>
			</div>
		);
	}
};
