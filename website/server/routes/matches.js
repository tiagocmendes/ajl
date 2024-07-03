const express = require('express');

const { Match, Team, Player } = require('../models/game');
const { authenticateToken } = require('../auth/auth');
const WebSocket = require('ws');

const router = express.Router();

router.get('/', async (req, res) => {
	try {
		const matches = await Match.find({});

		const response = await Promise.all(
			matches.map(async match => {
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

		res.status(200).send(response);
	} catch (error) {
		res.send(400).send(error);
	}
});

router.get('/:id', async (req, res) => {
	try {
		const matchId = req.params.id;
		const matchWithoutDetails = await Match.findById(matchId);

		const response = await Promise.all(
			[matchWithoutDetails].map(async match => {
				let homeTeam, awayTeam;
				let homeTeamPlayers = [],
					awayTeamPlayers = [];
				let foundHomeTeam = false,
					foundAwayTeam = false;

				try {
					homeTeam = await Team.findOne({ _id: match.homeTeam });
					homeTeamPlayers = await Player.find({ teamId: homeTeam._id });
					foundHomeTeam = true;
				} catch (e) {
					foundHomeTeam = false;
				}

				try {
					awayTeam = await Team.findOne({ _id: match.awayTeam });
					awayTeamPlayers = await Player.find({ teamId: awayTeam._id });
					foundAwayTeam = true;
				} catch (e) {
					foundAwayTeam = false;
				}

				return {
					...match._doc,
					homeTeam: foundHomeTeam
						? { ...homeTeam._doc, players: homeTeamPlayers }
						: match.homeTeam,
					awayTeam: foundAwayTeam
						? { ...awayTeam._doc, players: awayTeamPlayers }
						: match.awayTeam,
				};
			})
		);

		if (!response) {
			return res.status(404).send({ message: 'Match not found' });
		}

		res.status(200).send(response.pop());
	} catch (error) {
		res.status(400).send(error);
	}
});

router.post('/', authenticateToken, async (req, res) => {
	try {
		const matches = await Match.insertMany(req.body);
		res.status(201).send(matches);
	} catch (error) {
		res.status(400).send(error);
	}
});

router.patch('/:id', authenticateToken, async (req, res) => {
	try {
		const matchId = req.params.id;
		const updateData = req.body;
		const updatedMatch = await Match.findByIdAndUpdate(matchId, updateData, {
			new: true,
		});

		const response = await Promise.all(
			[updatedMatch].map(async match => {
				let homeTeam, awayTeam;
				let homeTeamPlayers = [],
					awayTeamPlayers = [];
				let foundHomeTeam = false,
					foundAwayTeam = false;

				try {
					homeTeam = await Team.findOne({ _id: match.homeTeam });
					homeTeamPlayers = await Player.find({ teamId: homeTeam._id });
					foundHomeTeam = true;
				} catch (e) {
					foundHomeTeam = false;
				}

				try {
					awayTeam = await Team.findOne({ _id: match.awayTeam });
					awayTeamPlayers = await Player.find({ teamId: awayTeam._id });
					foundAwayTeam = true;
				} catch (e) {
					foundAwayTeam = false;
				}
				return {
					...match._doc,
					homeTeam: foundHomeTeam
						? { ...homeTeam._doc, players: homeTeamPlayers }
						: match.homeTeam,
					awayTeam: foundAwayTeam
						? { ...awayTeam._doc, players: awayTeamPlayers }
						: match.awayTeam,
				};
			})
		);

		res.status(200).send(response.pop());
		req.wss.clients.forEach(client => {
			if (client.readyState === WebSocket.OPEN) {
				client.send(JSON.stringify(updateData));
			}
		});
	} catch (error) {
		res.status(400).send(error);
	}
});

router.delete('/', authenticateToken, async (req, res) => {
	try {
		await Match.deleteMany({});
		res.status(204).send('All matches deleted successfully.');
	} catch (error) {
		res.status(400).send(error);
	}
});

router.delete('/:id', authenticateToken, async (req, res) => {
	try {
		const matchId = req.params.id;
		await Match.findByIdAndDelete(matchId);
		res.status(204).send('Match deleted successfully.');
	} catch (error) {
		res.status(400).send(error);
	}
});

module.exports = router;
