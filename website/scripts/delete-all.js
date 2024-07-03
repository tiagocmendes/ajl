const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const baseUrl = process.env.BASE_URL;

const genericDeleteCall = async (path, config) => {
	try {
		await axios.delete(baseUrl + '/' + path, config);
	} catch (error) {
		console.error(`Error deleting ${path}: `, error);
	}
};

const deleteTeams = async config => {
	await genericDeleteCall('teams', config);
};

const deletePlayers = async config => {
	await genericDeleteCall('players', config);
};

const deleteMatches = async config => {
	await genericDeleteCall('matches', config);
};

const resetDatabase = async config => {
	try {
		console.log('### RESET DATABASE ###\n');
		const args = process.argv.slice(2);
		const paths = [
			{ name: 'teams', argName: 't', deleteCallback: deleteTeams },
			{ name: 'players', argName: 't', deleteCallback: deletePlayers },
			{ name: 'matches', argName: 't', deleteCallback: deleteMatches },
		];

		for (const path of paths) {
			if (
				!args.length ||
				args.includes(path.argName) ||
				args.includes(path.name)
			) {
				await path.deleteCallback(config);
				console.log(path.name + ' deleted.');
			}
		}
		console.log('\n### DATABASE RESET SUCCESSFULLY ###\n\n');
	} catch (error) {
		console.error('Error in main execution:', error);
	}
};

module.exports = { resetDatabase };
