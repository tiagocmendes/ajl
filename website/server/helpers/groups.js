const Game = require('../models/game');

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

const getGroupsClassification = async () => {
    const groupA = await Game.find({ phase: "A" });
    const groupB = await Game.find({ phase: "B" });
    const groups = [
      {name: 'A', games: groupA}, 
      {name: 'B', games: groupB}, 
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

    return groupStages;
}

module.exports = { getGroupsClassification };