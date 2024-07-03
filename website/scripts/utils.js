const sharp = require('sharp');
const dotenv = require('dotenv');
const fetch = require("node-fetch");

dotenv.config();

const getRandomNumber = (min, max) => {
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getBaseUrl = () => process.env.BASE_URL;

const getToken = async () => {
	const BASE_URL = getBaseUrl();
	try {
		const response = await fetch(BASE_URL + '/auth/login', {
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

		return await response.json();
	} catch (error) {
		console.error('Error saving user:', error);
	}
};

module.exports = { getBaseUrl, getRandomNumber, getToken };
