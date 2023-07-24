const express = require('express');
const User = require('./user');

const Game = require('./models/game');

const router = express.Router();

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
  const { firstTeam, secondTeam } = req.body;

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

const initTeamDetails = (name) => {
  return {
    name,
    victories: 0,
    draws: 0,
    losses: 0,
    gm: 0,
    gs: 0,
    points: 0
  }
}

// Get all games
router.get('/groups', async (req, res) => {
  try {
    const groupA = await Game.find({ phase: "A" });
    const groupB = await Game.find({ phase: "B" });
    const groupC = await Game.find({ phase: "C" });
    const groups = [
      {name: 'A', games: groupA}, 
      {name: 'B', games: groupB}, 
      {name: 'C', games: groupC}, 
    ];

    const groupStages = [];
    for(const group of groups) {
      let classification = {};
      for(const game of group.games) {
        const firstTeam = game.firstTeam;
        const secondTeam = game.secondTeam;

        if(!classification[firstTeam.name]) {
          classification[firstTeam.name] = initTeamDetails(firstTeam.name)
        }

        if(!classification[secondTeam.name]) {
          classification[secondTeam.name] = initTeamDetails(secondTeam.name)
        }

        if(game.hasStarted) {
          // Update first team goals
          classification[firstTeam.name].gm += firstTeam.goals;
          classification[firstTeam.name].gs += secondTeam.goals;

          // Update second team goals
          classification[secondTeam.name].gm += secondTeam.goals;
          classification[secondTeam.name].gs += firstTeam.goals;

          if(firstTeam.goals > secondTeam.goals) {
            classification[firstTeam.name].victories += 1;
            classification[secondTeam.name].losses += 1;
            classification[firstTeam.name].points += 3;
          } else if(firstTeam.goals < secondTeam.goals) {
            classification[firstTeam.name].losses += 1;
            classification[secondTeam.name].victories += 1;
            classification[secondTeam.name].points += 3;
          } else {
            classification[firstTeam.name].draws += 1;
            classification[secondTeam.name].draws += 1;
            classification[firstTeam.name].points += 1;
            classification[secondTeam.name].points += 1;
          }
        }
      }
      
      const classificationArray = Object.keys(classification).map(teamName => {
        return {...classification[teamName]}
      }).sort((team1, team2) => {
        if(team2.points !== team1.points) {
          return team2.points - team1.points 
        }
          
        return (team2.gm - team2.gs) - (team1.gm - team1.gs);
      })

      groupStages.push({ name: group.name, teams: classificationArray })
    }



    res.send(groupStages);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});


// Create a new user
router.post('/users', async (req, res) => {
  const { name, email, age } = req.body;

  try {
    const user = new User({ name, email, age });
    await user.save();
    res.send(user);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

// Get all users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

// Update a user
router.put('/users/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email, age } = req.body;

  try {
    const user = await User.findByIdAndUpdate(id, { name, email, age }, { new: true });
    res.send(user);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

// Delete a user
router.delete('/users/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByIdAndDelete(id);
    res.send(user);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

module.exports = router;