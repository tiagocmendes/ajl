const knockouts = [
    {
        name: "quarters",
        games: [
            {
                firstTeam: '1º Grupo A',
                secondTeam: '4º Grupo B',
                timestamp: (new Date("2023-07-30 09:00")).getTime()
            },
            {
                firstTeam: '1º Grupo B',
                secondTeam: '4º Grupo A',
                timestamp: (new Date("2023-07-30 10:00")).getTime(),
            },
            {
                firstTeam: '2º Grupo A',
                secondTeam: '3º Grupo B',
                timestamp: (new Date("2023-07-30 11:00")).getTime(),
            },
            {
                firstTeam: '2º Grupo B',
                secondTeam: '3º Grupo A',
                timestamp: (new Date("2023-07-30 12:00")).getTime(),
            },
        ]
    },
    {
        name: "semi",
        games: [
            {
                firstTeam: 'Vencedor Jogo 21',
                secondTeam: 'Vencedor Jogo 24',
                timestamp: (new Date("2023-07-30 16:00")).getTime()
            },
            {
                firstTeam: 'Vencedor Jogo 22',
                secondTeam: 'Vencedor Jogo 23',
                timestamp: (new Date("2023-07-30 17:00")).getTime(),
            },
        ]
    },
    {
        name: "pre-final",
        games: [
            {
                firstTeam: 'Derrotado Jogo 25',
                secondTeam: 'Derrotado Jogo 26',
                timestamp: (new Date("2023-07-30 18:00")).getTime(),
            },
        ]
    },
    {
        name: "final",
        games: [
            {
                firstTeam: 'Vencedor Jogo 25',
                secondTeam: 'Vencedor Jogo 26',
                timestamp: (new Date("2023-07-30 19:00")).getTime(),
            },
        ]
    }
]

const games = [];
let gameNumber = 21;
for(const stage of knockouts) {
    for(const game of stage.games) {
        games.push({
            gameNumber,
            phase: stage.name,
            timestamp: game.timestamp,
            hasStarted: false,
            "firstTeam": {
                "name": game.firstTeam,
                "goals": 0,
                "scorers": []
            },
            "secondTeam": {
                "name": game.secondTeam,
                "goals": 0,
                "scorers": []
            },
        })
        gameNumber++;
    }   
}

const url = 'http://localhost:8080/games';
async function saveGamesToAPI() {
    for(const game of games) {
        try {
            const response = await fetch(url, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(game),
            });
        
            if (!response.ok) {
              throw new Error('Failed to save games to the API');
            }
        
            const data = await response.json();
            console.log('Games saved successfully:', data);
          } catch (error) {
            console.error('Error saving games:', error);
          }
    }
}

saveGamesToAPI();
