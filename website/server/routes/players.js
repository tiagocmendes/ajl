const express = require('express');
const { Player } = require('../models/game');
const { authenticateToken } = require('../auth/auth');

const router = express.Router();

router.get('/', async (req, res) => {
	try {
		const players = await Player.find({});
		res.status(200).send(players);
	} catch (error) {
		res.send(400).send(error);
	}
});

router.post('/', authenticateToken, async (req, res) => {
	try {
		const players = await Player.insertMany(req.body);
		res.status(201).send(players);
	} catch (error) {
		res.status(400).send(error);
	}
});

router.patch('/:id', authenticateToken, async (req, res) => {
	try {
		const playerId = req.params.id;
		const updateData = req.body;
		const updatedPlayer = await Player.findByIdAndUpdate(playerId, updateData, {
			new: true,
		});
		res.status(200).send(updatedPlayer);
	} catch (error) {
		res.status(400).send(error);
	}
});

router.delete('/', authenticateToken, async (req, res) => {
	try {
		await Player.deleteMany({});
		res.status(204).send('All players deleted successfully.');
	} catch (error) {
		res.status(400).send(error);
	}
});

module.exports = router;
