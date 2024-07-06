const express = require('express');
const { Match, Team } = require('../models/game');
const { getGroupsScoreBoard } = require('../helpers/groups');

const router = express.Router();

router.get('/groups', async (req, res) => {
	try {
		const groupsScoreBoard = await getGroupsScoreBoard();
		res.status(200).send(groupsScoreBoard);
	} catch (error) {
		res.send(400).send(error);
	}
});

const groupHasFinished = group => {
	const teamsThatFinishedGroup = group.teams.filter(team => team.matches === 8);

	return teamsThatFinishedGroup.length === group.teams.length;
};

const updateQuarterMatch = (team, group) => {
	const quarterMatchIsNotUpdate = typeof team === 'string' && team.length === 2;
	if (quarterMatchIsNotUpdate) {
		const [position, groupLetter] = team.split('');
		if (group.name.includes(groupLetter)) {
			team = group.teams[Number(position) - 1].id;
		}
	}
	return team;
};

const updateSemiMatch = (team, quarters) => {
	const semiMatchIsNotUpdate =
		typeof team === 'string' && team.includes('Vencedor');
	if (semiMatchIsNotUpdate) {
		const matchNumber = Number(team.split(' ')[1]);
		const quarterMatch = quarters.find(m => m.matchNumber === matchNumber);
		if (quarterMatch?.winner) {
			team = quarterMatch.winner;
		}
	}
	return team;
};

const updatePreFinalMatch = (team, semi) => {
	const preFinalMatchIsNotUpdate =
		typeof team === 'string' && team.includes('Perdedor');
	if (preFinalMatchIsNotUpdate) {
		const matchNumber = Number(team.split(' ')[1]);
		const semiMatch = semi.find(m => m.matchNumber === matchNumber);
		if (semiMatch?.winner) {
			const { winner, homeTeam, awayTeam } = semiMatch;
			team = winner === homeTeam ? awayTeam : homeTeam;
		}
	}
	return team;
};

const updateFinalMatch = (team, semi) => {
	const finalMatchIsNotUpdate =
		typeof team === 'string' && team.includes('Vencedor');
	if (finalMatchIsNotUpdate) {
		const matchNumber = Number(team.split(' ')[1]);
		const semiMatch = semi.find(m => m.matchNumber === matchNumber);
		if (semiMatch?.winner) {
			team = semiMatch.winner;
		}
	}
	return team;
};

const getMatchesWithDetails = async matches => {
	return await Promise.all(
		matches.map(async match => {
			match.save();

			let homeTeam, awayTeam;
			try {
				homeTeam = await Team.findOne({ _id: match.homeTeam });
			} catch (e) {
				homeTeam = match.homeTeam;
			}

			try {
				awayTeam = await Team.findOne({ _id: match.awayTeam });
			} catch (e) {
				awayTeam = match.awayTeam;
			}

			return {
				...match._doc,
				homeTeam,
				awayTeam,
			};
		})
	);
};

router.get('/knockouts', async (req, res) => {
	try {
		const quarters = await Match.find({ phase: 'QUARTERS' });
		const semi = await Match.find({ phase: 'SEMI' });
		const preFinal = await Match.find({ phase: 'PREFINAL' });
		const final = await Match.find({ phase: 'FINAL' });

		const groupsScoreBoard = await getGroupsScoreBoard();

		// 1. Update quarter matches
		for (const group of groupsScoreBoard) {
			if (groupHasFinished(group)) {
				for (const match of quarters) {
					match.homeTeam = updateQuarterMatch(match.homeTeam, group);
					match.awayTeam = updateQuarterMatch(match.awayTeam, group);
				}
			}
		}
		const quartersWithDetails = await getMatchesWithDetails(quarters);

		// 2. Update semi matches
		for (const match of semi) {
			match.homeTeam = updateSemiMatch(match.homeTeam, quarters);
			match.awayTeam = updateSemiMatch(match.awayTeam, quarters);
		}
		const semiWithDetails = await getMatchesWithDetails(semi);

		// 3. Update pre-final match
		for (const match of preFinal) {
			match.homeTeam = updatePreFinalMatch(match.homeTeam, semi);
			match.awayTeam = updatePreFinalMatch(match.awayTeam, semi);
		}
		const preFinalWithDetails = await getMatchesWithDetails(preFinal);

		// 4. Update final match
		for (const match of final) {
			match.homeTeam = updateFinalMatch(match.homeTeam, semi);
			match.awayTeam = updateFinalMatch(match.awayTeam, semi);
		}
		const finalWithDetails = await getMatchesWithDetails(final);

		res.status(200).send({
			quarters: quartersWithDetails,
			semi: semiWithDetails,
			preFinal: preFinalWithDetails,
			final: finalWithDetails,
		});
	} catch (error) {
		res.send(400).send(error);
	}
});

module.exports = router;
