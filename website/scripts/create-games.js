// The URL to which you want to make the POST request
const url = 'http://localhost:8080/games';

const teams = [
    'AL CFV',
    'SEM NOME',
    'PAVIMIKE FC',
    'FERRAGENS PEREIRA',
    'VM CAR AUTOMÓVEIS',
    '100 PERNAS',
    "TASCA D'ALDEIA",
    'RO SERRALHARIA',
    "GABRIEL TEAM",
    "3 POR 1",
    "BRAZUCAS"
];


const groups = [
    {
        name: "A",
        teams: [
            'AL CFV',
            'SEM NOME',
            'PAVIMIKE FC',
            '3 POR 1'
        ],
        timestamps: [
            (new Date("2023-07-29 09:00")).getTime(),
            (new Date("2023-07-29 11:00")).getTime(),
            (new Date("2023-07-29 15:00")).getTime(),
            (new Date("2023-07-29 17:00")).getTime(),
            (new Date("2023-07-29 19:00")).getTime(),
            (new Date("2023-07-29 21:00")).getTime()
        ]
    },
    {
        name: "B",
        teams: [
            'FERRAGENS PEREIRA',
            'VM CAR AUTOMÓVEIS',
            '100 PERNAS',
            'BRAZUCAS'
        ],
        timestamps: [
            (new Date("2023-07-29 09:40")).getTime(),
            (new Date("2023-07-29 11:40")).getTime(),
            (new Date("2023-07-29 15:40")).getTime(),
            (new Date("2023-07-29 17:40")).getTime(),
            (new Date("2023-07-29 19:40")).getTime(),
            (new Date("2023-07-29 21:40")).getTime()
        ]
    },
    {
        name: "C",
        teams: [
            "TASCA D'ALDEIA",
            'RO SERRALHARIA',
            "GABRIEL TEAM"
        ],
        timestamps: [
            (new Date("2023-07-29 10:20")).getTime(),
            (new Date("2023-07-29 12:20")).getTime(),
            (new Date("2023-07-29 16:20")).getTime(),
            (new Date("2023-07-29 18:20")).getTime(),
            (new Date("2023-07-29 20:20")).getTime(),
            (new Date("2023-07-29 22:20")).getTime()
        ]
    }
]

function generateGroupCombinations(teams) {
    const combinations = [];
    
    for (let i = 0; i < teams.length - 1; i++) {
      for (let j = i + 1; j < teams.length; j++) {
        combinations.push({ firstTeam: teams[i], secondTeam: teams[j] });
      }
    }
    
    return combinations;
  }

const games = [];
for(const group of groups) {
    const groupCombinations = generateGroupCombinations(group.teams);
    let timestamp = 0;
    
    const stop = group.name !== 'C' ? 1 : 2;

    for(let i = 0; i < stop; i++) {
        const firstTeamGoals = Math.round(Math.random() * 4);
        const secondTeamGoals = Math.round(Math.random() * 4);
        const firstTeamScorers = [];
        const secondTeamScorers = [];

        for(let scorer = 0; scorer < firstTeamGoals; scorer++) {
            firstTeamScorers.push({
                name: "Tiago Mendes",
                minute: Math.round(Math.random() * 30)
            })
        }

        for(let scorer = 0; scorer < secondTeamGoals; scorer++) {
            secondTeamScorers.push({
                name: "Tiago Mendes",
                minute: Math.round(Math.random() * 30)
            })
        }

        for(const combination of groupCombinations) {
            games.push({
                phase: group.name,
                timestamp: group.timestamps[timestamp],
                hasStarted: true,
                "firstTeam": {
                    "name": combination.firstTeam,
                    "goals": firstTeamGoals,
                    "scorers": firstTeamScorers
                },
                "secondTeam": {
                    "name": combination.secondTeam,
                    "goals": secondTeamGoals,
                    "scorers": secondTeamScorers
                },
            })
            timestamp++;
        }
    }
}

const sortedGames = games.sort((g1, g2) => g1.timestamp - g2.timestamp).map((game, index) => {
    return {
        ...game,
        gameNumber: index + 1
    }
})

async function saveGamesToAPI() {
    for(const game of sortedGames) {
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


  
  