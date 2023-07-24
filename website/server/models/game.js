const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    gameNumber: {
        type: Number,
        required: true,
        unique: true
    },
    phase: {
        type: String,
        required: true
    },
    hasStarted: {
        type: Boolean,
        required: true,
        default: false
    },
    timestamp: {
        type:   String,
        required: true
    },
    firstTeam: {
        name: {
            type: String,
            required: true
        },
        goals: {
            type: Number,
            default: 0
        },
        scorers: [{
            name: {
                type: String,
                required: true
            },
            minute: {
                type: Number,
                required: true
            }
        }]
    },
    secondTeam: {
        name: {
            type: String,
            required: true
        },
        goals: {
            type: Number,
            default: 0
        },
        scorers: [{
            name: {
                type: String,
                required: true
            },
            minute: {
                type: Number,
                required: true
            }
        }]
    }
});

const Game = mongoose.model('Game', gameSchema)

module.exports = Game;