const express = require('express');
const Game = require('./models/game');

const router = express.Router();

const { getGroupsClassification } = require('./helpers/groups');

// Create a new game
router.post('/games', async (req, res) => {
  const gameBody = req.body;
  try {
    const game = new Game(gameBody);
    await game.save();
    res.send(game);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

// Get all games
router.get('/games', async (req, res) => {
  try {
    const games = await Game.find({});
    res.send(games);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

// Get game by id
router.get('/games/:id', async (req, res) => {
  const gameId = req.params.id;

  try {
    const game = await Game.findOne({ gameNumber: gameId });

    if (!game) {
      return res.status(404).send({ message: 'Game not found' });
    }

    res.send(game);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

// Delete a game by ID
router.delete('/games/:id', async (req, res) => {
  const gameId = req.params.id;

  try {
    // Find the game in the database by its ID and remove it
    const game = await Game.findOne({ gameNumber: gameId });
    const deletedGame = await Game.findByIdAndRemove(game._id);

    if (!deletedGame) {
      return res.status(404).json({ message: 'Game not found' });
    }

    res.json({ message: 'Game deleted successfully', deletedGame });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// PATCH a game's scorers and goals by ID
router.patch('/games/:id', async (req, res) => {
  const gameId = req.params.id;
  const { firstTeam, secondTeam, hasStarted, winner } = req.body;

  try {
    const game = await Game.findOne({ gameNumber: gameId });

    if (!game) {
      return res.status(404).json({ message: 'Game not found' });
    }

    if(firstTeam) {
      game.firstTeam.name = firstTeam.name ? firstTeam.name : game.firstTeam.name;
      game.firstTeam.scorers = firstTeam.scorer ? [ 
        ...game.firstTeam.scorers,
        firstTeam.scorer
      ] : game.firstTeam.scorers;
      game.firstTeam.goals = firstTeam.goals ? firstTeam.goals : game.firstTeam.goals;
    }

    if(secondTeam) {
      game.secondTeam.name = secondTeam.name ? secondTeam.name : game.secondTeam.name;
      game.secondTeam.scorers = secondTeam.scorer ? [ 
        ...game.secondTeam.scorers,
        secondTeam.scorer
      ] : game.secondTeam.scorers;
      game.secondTeam.goals = secondTeam.goals ? secondTeam.goals : game.secondTeam.goals;
    }

    if(hasStarted !== undefined) {
      game.hasStarted = hasStarted;
    }

    if(winner !== undefined) {
      game.winner = winner;
    }

    // Save the updated game object to the database
    const updatedGame = await game.save();

    res.json({ message: 'Game updated successfully', updatedGame });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.delete('/games', async (req, res) => {
  try {
    // Delete all games from the database
    await Game.deleteMany({});

    res.json({ message: 'All games deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get all games
router.get('/groups', async (req, res) => {
  try {
    const groupsClassification = await getGroupsClassification();
    res.send(groupsClassification);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

router.get('/knockouts', async (req, res) => {
  try {
    const quarters = await Game.find({ phase: "quarters" });
    const semi = await Game.find({ phase: "semi" });
    const preFinal = await Game.find({ phase: "pre-final" });
    const final = await Game.find({ phase: "final" });

    const groupsClassification = await getGroupsClassification();

    for(const group of groupsClassification) {
      const teamsThatPlayedAllMatches = group.teams.filter(team => team.victories + team.draws + team.losses === group.teams.length - 1);
      const allMatchesPlayed = teamsThatPlayedAllMatches.length === group.teams.length;

      if(allMatchesPlayed) {
        if(group.name === 'A') {
          quarters[0].firstTeam.name = group.teams[0].name;
          quarters[1].secondTeam.name = group.teams[3].name;
          quarters[2].firstTeam.name = group.teams[1].name;
          quarters[3].secondTeam.name = group.teams[2].name;
        } else if(group.name === 'B') {
          quarters[0].secondTeam.name = group.teams[3].name;
          quarters[1].firstTeam.name = group.teams[0].name;
          quarters[2].secondTeam.name = group.teams[2].name;
          quarters[3].firstTeam.name = group.teams[1].name;
        }
      }
    }

    for(let i = 0; i < quarters.length; i++) {
      await quarters[i].save();
      if (quarters[i].winner !== "") {
        if (i === 0) {
          semi[0].firstTeam.name = quarters[i].winner;
        } else if(i === 1) {
          semi[1].firstTeam.name = quarters[i].winner;
        } else if(i === 2) {
          semi[1].secondTeam.name = quarters[i].winner;
        } else {
          semi[0].secondTeam.name = quarters[i].winner;
        }
      }
    }

    for(let i = 0; i < semi.length; i++) {
      await semi[i].save();
      const winner = semi[i].winner;
      const looser = winner !== '' && semi[i].firstTeam.name !== winner ? semi[i].firstTeam.name : semi[i].secondTeam.name;
      console.log(winner);
      console.log(looser);
      if(winner !== '' && looser) {
        if(i === 0) {
          preFinal[0].firstTeam.name = looser;
          final[0].firstTeam.name = winner;
        } else {
          preFinal[0].secondTeam.name = looser;
          final[0].secondTeam.name = winner;
        }
      }
    }

    await preFinal[0].save();
    await final[0].save();

    res.send({ quarters, semi, preFinal, final })
  } catch(error) {
    console.error(error);
    res.status(500).send(error);
  }
});

module.exports = router;