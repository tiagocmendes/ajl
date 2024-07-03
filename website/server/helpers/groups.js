const { Match, Team } = require('../models/game');

const initTeamDetails = team => ({
	id: team._id,
	name: team.name,
	victories: 0,
	draws: 0,
	losses: 0,
	scored: 0,
	conceded: 0,
	points: 0,
	matches: 0,
});

const sortMiniLeague = (scoreboard, matches) => {
	// Count the occurrences of each points value
	const pointsCount = {};
	for (const item of scoreboard) {
		if (pointsCount[item.points]) {
			pointsCount[item.points]++;
		} else {
			pointsCount[item.points] = 1;
		}
	}

	// Sort the subarrays with more than 2 entries by the secondary criterion
	let i = 0;
	while (i < scoreboard.length) {
		let j = i;
		while (
			j < scoreboard.length &&
			scoreboard[j].points === scoreboard[i].points
		) {
			j++;
		}

		if (j - i > 2) {
			scoreboard.slice(i, j).sort((team1, team2) => {
				if (team2.points !== team1.points) {
					return team2.points - team1.points;
				}

				const headToHeadGame = matches.find(match => {
					const teamsNames = [match.homeTeam.name, match.awayTeam.name];
					return (
						teamsNames.includes(team1.name) && teamsNames.includes(team2.name)
					);
				});

				if (headToHeadGame.homeScore !== headToHeadGame.awayScore) {
					return headToHeadGame.homeScore - headToHeadGame.awayScore;
				}

				const goalsDifference =
					team2.scored - team2.conceded - (team1.scored - team1.conceded);

				if (goalsDifference !== 0) {
					return goalsDifference;
				}

				const goalsScoredDifference = team2.scored - team1.scored;
				const goalsConcededDifference = team2.conceded - team1.conceded;

				if (goalsScoredDifference !== 0) return goalsScoredDifference;
				if (goalsConcededDifference !== 0) return goalsConcededDifference;
				return 0;
			});
		}

		i = j;
	}

	return scoreboard;
};

const getGroupsScoreBoard = async () => {
	const matchesWithoutTeams = await Match.find({ phase: /GROUP/ }).sort({
		phase: 1,
	});
	const allGroupMatches = await Promise.all(
		matchesWithoutTeams.map(async match => {
			const homeTeam = await Team.findOne({ _id: match.homeTeam });
			const awayTeam = await Team.findOne({ _id: match.awayTeam });
			return { ...match._doc, homeTeam, awayTeam };
		})
	);

	const matchesByGroup = allGroupMatches.reduce((acc, match) => {
		if (!acc[match.phase]) {
			acc[match.phase] = [];
		}

		acc[match.phase].push(match);
		return acc;
	}, {});

	// We need to store the scoreboard of every group
	const groupsScoreboard = [];

	for (const [group, matches] of Object.entries(matchesByGroup)) {
		let scoreboard = {};

		for (const match of matches) {
			const homeTeam = match.homeTeam;
			const homeScore = match.homeScore;
			const awayTeam = match.awayTeam;
			const awayScore = match.awayScore;

			if (!scoreboard[homeTeam.name]) {
				scoreboard[homeTeam.name] = initTeamDetails(homeTeam);
			}

			if (!scoreboard[awayTeam.name]) {
				scoreboard[awayTeam.name] = initTeamDetails(awayTeam);
			}

			if (match.hasStarted) {
				// Update first team goals
				scoreboard[homeTeam.name].scored += homeScore;
				scoreboard[homeTeam.name].conceded += awayScore;

				// Update seconds team goals
				scoreboard[awayTeam.name].scored += awayScore;
				scoreboard[awayTeam.name].conceded += homeScore;
				scoreboard[homeTeam.name].matches += 1;
				scoreboard[awayTeam.name].matches += 1;

				if (homeScore > awayScore) {
					scoreboard[homeTeam.name].victories += 1;
					scoreboard[homeTeam.name].points += 3;
					scoreboard[awayTeam.name].losses += 1;
				} else if (homeScore < awayScore) {
					scoreboard[homeTeam.name].losses += 1;
					scoreboard[awayTeam.name].victories += 1;
					scoreboard[awayTeam.name].points += 3;
				} else {
					scoreboard[homeTeam.name].draws += 1;
					scoreboard[awayTeam.name].draws += 1;
					scoreboard[homeTeam.name].points += 1;
					scoreboard[awayTeam.name].points += 1;
				}
			}
		}

		const scoreboardArray = Object.keys(scoreboard)
			.map(teamName => {
				return { ...scoreboard[teamName] };
			})
			.sort((team1, team2) => {
				if (team2.points !== team1.points) {
					return team2.points - team1.points;
				}

				const headToHeadGame = matches.find(match => {
					const teamsNames = [match.homeTeam.name, match.awayTeam.name];
					return (
						teamsNames.includes(team1.name) && teamsNames.includes(team2.name)
					);
				});

				if (headToHeadGame.homeScore !== headToHeadGame.awayScore) {
					return headToHeadGame.homeScore - headToHeadGame.awayScore;
				}

				const goalsDifference =
					team2.scored - team2.conceded - (team1.scored - team1.conceded);

				if (goalsDifference !== 0) {
					return goalsDifference;
				}

				const goalsScoredDifference = team2.scored - team1.scored;
				const goalsConcededDifference = team2.conceded - team1.conceded;

				if (goalsScoredDifference !== 0) return goalsScoredDifference;
				if (goalsConcededDifference !== 0) return goalsConcededDifference;
				return 0;
			});

		groupsScoreboard.push({
			name: group,
			teams: sortMiniLeague(scoreboardArray, matches),
		});
	}

	return groupsScoreboard;
};

module.exports = { getGroupsScoreBoard };
