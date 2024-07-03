const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
	name: { type: String, required: true },
	teamId: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true },
	goals: { type: Number, default: 0 },
	minutes: { type: Number, default: 0 },
	yellowCards: { type: Number, default: 0 },
	redCards: { type: Number, default: 0 },
	picture: { type: String, default: '' },
});

const teamSchema = new mongoose.Schema({
	name: { type: String, required: true },
	players: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Player' }],
});

const matchSchema = new mongoose.Schema({
	matchNumber: { type: Number, required: true, unique: true },
	phase: { type: String, required: true },
	hasStarted: { type: Boolean, required: true, default: false },
	timestamp: { type: String, required: true },
	winner: { type: mongoose.Schema.Types.Mixed, ref: 'Team', default: null },
	homeTeam: { type: mongoose.Schema.Types.Mixed, ref: 'Team', required: true },
	awayTeam: { type: mongoose.Schema.Types.Mixed, ref: 'Team', required: true },
	homeScore: { type: Number, default: 0 },
	awayScore: { type: Number, default: 0 },
	homeTeamEvents: { type: mongoose.Schema.Types.Array },
	awayTeamEvents: { type: mongoose.Schema.Types.Array },
});

const Player = mongoose.model('Player', playerSchema);
const Team = mongoose.model('Team', teamSchema);
const Match = mongoose.model('Match', matchSchema);

module.exports = { Player, Team, Match };
