const axios = require('axios');
const { getBaseUrl } = require('./utils');

const BASE_URL = getBaseUrl();

const createTeams = async (teams, config) => {
	try {
		const teamsData = teams.map(team => ({ name: team.name }));
		const teamsResponse = await axios.post(
			BASE_URL + '/teams',
			teamsData,
			config
		);
		return teamsResponse.data;
	} catch (error) {
		console.error('Error creating teams: ', error);
		throw error;
	}
};

const createPlayers = async (teams, teamsWithPlayers, config) => {
	try {
		const playersData = [];

		teams.forEach((team, index) => {
			const players = teamsWithPlayers[index].players;
			for (const player of players) {
				playersData.push({
					name: player,
					teamId: team._id,
				});
			}
			playersData.push({ name: 'Autogolo', teamId: team._id });
			playersData.push({ name: 'Falta de Comparência', teamId: team._id });
		});

		const playersResponse = await axios.post(
			BASE_URL + '/players',
			playersData,
			config
		);
		return playersResponse.data;
	} catch (error) {
		console.error('Error creating players:', error);
		throw error;
	}
};

const updateTeamsWithPlayers = async (teams, players, config) => {
	try {
		const teamUpdates = teams.map(team => {
			const teamPlayers = players.filter(player => player.teamId === team._id);
			return axios.patch(
				`${BASE_URL}/teams/${team._id}`,
				{
					players: teamPlayers.map(player => player._id),
				},
				config
			);
		});

		await Promise.all(teamUpdates);
	} catch (error) {
		console.error('Error updating teams with players:', error);
		throw error;
	}
};

module.exports = { createTeams, createPlayers, updateTeamsWithPlayers };
