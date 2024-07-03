const express = require('express');
const { Team, Player, Match } = require('../models/game');
const { getGroupsScoreBoard } = require('../helpers/groups');
const { authenticateToken } = require('../auth/auth');

const router = express.Router();

router.get('/', async (req, res) => {
	try {
		const teams = await Team.find({});

		const response = await Promise.all(
			teams.map(async team => {
				const players = await Player.find({ teamId: team._id });

				return {
					...team._doc,
					players,
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
		const teamId = req.params.id;
		const team = await Team.findById(teamId);

		const response = await new Promise(async resolve => {
			try {
				const players = await Player.find({ teamId });
				resolve({
					...team._doc,
					players,
				});
			} catch (error) {
				resolve({
					...team,
					players: [],
				});
			}
		});

		const groupsScoreBoard = await getGroupsScoreBoard();
		const group = groupsScoreBoard.find(group => {
			const foundTeam = group.teams.find(t => t.name === team.name);
			if (foundTeam) return true;
		});

		const matches = await Match.find({
			$or: [{ homeTeam: teamId }, { awayTeam: teamId }],
		});

		const matchesWithTeamDetails = await Promise.all(
			matches.map(async match => {
				let homeTeam, awayTeam;
				try {
					homeTeam = await Team.findOne({ _id: match.homeTeam });
					awayTeam = await Team.findOne({ _id: match.awayTeam });
				} catch (e) {
					homeTeam = match.homeTeam;
					awayTeam = match.awayTeam;
				}

				return { ...match._doc, homeTeam, awayTeam };
			})
		);

		res
			.status(200)
			.send({ ...response, group, matches: matchesWithTeamDetails });
	} catch (error) {
		res.status(400).send(error);
	}
});

router.post('/', authenticateToken, async (req, res) => {
	try {
		const teams = await Team.insertMany(req.body);
		res.status(201).send(teams);
	} catch (error) {
		res.status(400).send(error);
	}
});

router.patch('/:id', authenticateToken, async (req, res) => {
	try {
		const teamId = req.params.id;
		const updateData = req.body;
		const updatedTeam = await Team.findByIdAndUpdate(teamId, updateData, {
			new: true,
		});
		res.status(200).send(updatedTeam);
	} catch (error) {
		res.status(400).send(error);
	}
});

router.delete('/', authenticateToken, async (req, res) => {
	try {
		await Team.deleteMany({});
		res.status(204).send('All teams deleted successfully.');
	} catch (error) {
		res.status(400).send(error);
	}
});

router.delete('/:id', authenticateToken, async (req, res) => {
	try {
		const teamId = req.params.id;
		await Team.findByIdAndDelete(teamId);
		res.status(204).send('Team deleted successfully.');
	} catch (error) {
		res.status(400).send(error);
	}
});

module.exports = router;
