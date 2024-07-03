const express = require('express');

const { Match, Team, Player } = require('../models/game');

const router = express.Router();

router.get('/teams/:id', async (req, res) => {
	try {
		const teamId = req.params.id;
		let wins = 0,
			draws = 0,
			losses = 0,
			scored = 0,
			conceded = 0,
			yellowCards = 0,
			redCards = 0,
			matches = 0;
		const homeMatches = await Match.find({
			$and: [{ homeTeam: teamId }, { hasStarted: true }],
		});
		const awayMatches = await Match.find({
			$and: [{ homeTeam: teamId }, { hasStarted: true }],
		});

		for (const match of homeMatches) {
			const homeScore = match.homeScore;
			const awayScore = match.awayScore;

			matches++;
			if (homeScore > awayScore) {
				wins++;
			} else if (homeScore < awayScore) {
				losses++;
			} else {
				draws++;
			}

			scored += homeScore;
			conceded += awayScore;

			yellowCards += match.homeTeamEvents.filter(
				event => event.type === 'yellowCards'
			).length;

			redCards += match.homeTeamEvents.filter(
				event => event.type === 'redCards'
			).length;
		}

		for (const match of awayMatches) {
			const homeScore = match.homeScore;
			const awayScore = match.awayScore;

			matches++;
			if (homeScore > awayScore) {
				losses++;
			} else if (homeScore < awayScore) {
				wins++;
			} else {
				draws++;
			}

			scored += awayScore;
			conceded += homeScore;

			yellowCards += match.awayTeamEvents.filter(
				event => event.type === 'yellowCards'
			).length;

			redCards += match.awayTeamEvents.filter(
				event => event.type === 'redCards'
			).length;
		}

		res.status(200).send({
			wins,
			draws,
			losses,
			scored,
			conceded,
			yellowCards,
			redCards,
			matches,
		});
	} catch (error) {
		res.status(400).send(error);
	}
});

router.get('/players', async (req, res) => {
	try {
		const players = await Player.find({});

		const topScorers = players
			.filter(p => p.goals > 0)
			.sort((p1, p2) => {
				if (p2.goals !== p1.goals) {
					return p2.goals - p1.goals;
				}

				if (p2.yellowCards !== p1.yellowCards) {
					return p1.yellowCards - p2.yellowCards;
				}

				return p1.redCards - p2.redCards;
			});

		res.status(200).send(topScorers);
	} catch (error) {
		console.log('error', error);
		res.status(400).send(error);
	}
});

module.exports = router;
