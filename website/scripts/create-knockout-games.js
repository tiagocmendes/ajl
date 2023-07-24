const knockouts = [
    {
        name: "quarters",
        timestamps: [
            (new Date("2023-07-30 09:00")).getTime(),
            (new Date("2023-07-30 10:00")).getTime(),
            (new Date("2023-07-30 11:00")).getTime(),
            (new Date("2023-07-30 12:00")).getTime(),
        ]
    },
    {
        name: "semi",
        timestamps: [
            (new Date("2023-07-30 16:00")).getTime(),
            (new Date("2023-07-30 17:00")).getTime(),
        ]
    },
    {
        name: "pre-final",
        timestamps: [
            (new Date("2023-07-30 18:00")).getTime(),
        ]
    },
    {
        name: "final",
        timestamps: [
            (new Date("2023-07-30 19:00")).getTime(),
        ]
    }
]

const games = [];
let gameNumber = 19;
for(const stage of knockouts) {
    for(const timestamp of stage.timestamps) {
        games.push({
            gameNumber,
            phase: stage.name,
            timestamp,
            "firstTeam": {
                "name": 'Por definir',
                "goals": 0,
                "scorers": []
            },
            "secondTeam": {
                "name": 'Por definir',
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
