const axios = require('axios');
const { getBaseUrl } = require('./utils');

const BASE_URL = getBaseUrl();

async function saveGamesToAPI() {
	try {
		const response = await fetch(BASE_URL + '/auth/signup', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email: 'ajlordosa@sapo.pt',
				password: 'Juvenil01052023#',
			}),
		});

		if (!response.ok) {
			throw new Error('Failed to create user');
		}

		const data = await response.json();
		console.log('User saved successfully:', data);
	} catch (error) {
		console.error('Error saving user:', error);
	}
}

saveGamesToAPI();
