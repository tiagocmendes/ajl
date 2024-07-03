const express = require('express');

const teamsRouter = require('./routes/teams');
const playersRouter = require('./routes/players');
const matchesRouter = require('./routes/matches');
const authRouter = require('./routes/auth');
const scoreboardRouter = require('./routes/scoreboard');
const statsRouter = require('./routes/stats');

const router = express.Router();

router.use('/teams', teamsRouter);
router.use('/players', playersRouter);
router.use('/matches', matchesRouter);
router.use('/auth', authRouter);
router.use('/scoreboard', scoreboardRouter);
router.use('/stats', statsRouter);

module.exports = router;
