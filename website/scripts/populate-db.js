const { resetDatabase } = require('./delete-all');
const fetch = require("node-fetch");
const {
	createTeams,
	createPlayers,
	updateTeamsWithPlayers,
} = require('./create-teams');
const {
	createGroupMatches,
	createKnockoutMatches,
} = require('./create-matches');
const { getRandomNumber, getToken } = require('./utils');

// GLOBAL VARIABLES
const { teamsData } = require('./teams-data');

// GLOBAL VARIABLES
const TEAMS = [
	teamsData.MEGATEC,
	teamsData.FUT_SEGUNDA_FEIRA_CA_SE_BICA,
	teamsData.BISTAS,
	teamsData.SEM_NOME,
	teamsData.PESADOS_FC,
	teamsData.VM_CAR_AUTOMOVEIS,
	teamsData.CHIMBARRAO_FC,
	teamsData.CONDOR_FC,
	teamsData.RO_SERRALHARIA,
	teamsData.INACREDITAVEL,
];

const main = async () => {
	// 0. Get token
	const { token } = await getToken();
	const config = {
		headers: {
			Authorization: token,
		},
	};
	console.log('User login successfully:', token);

	// 1. Reset database
	await resetDatabase(config);

	// 2. Create teams
	console.log('### CREATING TEAMS ###\n');
	const teams = await createTeams(TEAMS, config);
	console.log('teams created!');

	// 3. Create players
	const players = await createPlayers(teams, TEAMS, config);
	console.log('players created!');

	// 4. Add players to teams
	await updateTeamsWithPlayers(teams, players, config);
	console.log('teams updated with players!');
	console.log('\n### TEAMS CREATED SUCCESSFULLY ###');

	// 5. Create group matches
	const groupMatches = await createGroupMatches(teams, config);
	console.log('Group matches created!', groupMatches);

	// 6. Create knockout matches
	const knockoutMatches = await createKnockoutMatches(teams, config);
	console.log('Knockout matches created!', knockoutMatches);
};

main();
