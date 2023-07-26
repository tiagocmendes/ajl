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
];

const groups = [
    {
        name: "A",
        teams: [
            'AL CFV',
            'SEM NOME',
            '3 POR 1',
            'VM CAR AUTOMÓVEIS',
            'FERRAGENS PEREIRA',
        ],
        timestamps: [
            (new Date("2023-07-29 09:00")).getTime(),
            (new Date("2023-07-29 10:10")).getTime(),
            (new Date("2023-07-29 11:20")).getTime(),
            (new Date("2023-07-29 12:30")).getTime(),
            (new Date("2023-07-29 15:35")).getTime(),
            (new Date("2023-07-29 16:45")).getTime(),
            (new Date("2023-07-29 17:55")).getTime(),
            (new Date("2023-07-29 19:05")).getTime(),
            (new Date("2023-07-29 20:15")).getTime(),
            (new Date("2023-07-29 21:25")).getTime()
        ]
    },
    {
        name: "B",
        teams: [
            'RO SERRALHARIA',
            "TASCA D'ALDEIA",
            '100 PERNAS',
            "RECONSTRUÇÕES ELMORE",
            "PAVIMIKE FC",
        ],
        timestamps: [
            (new Date("2023-07-29 09:35")).getTime(),
            (new Date("2023-07-29 10:45")).getTime(),
            (new Date("2023-07-29 11:55")).getTime(),
            (new Date("2023-07-29 15:00")).getTime(),
            (new Date("2023-07-29 16:10")).getTime(),
            (new Date("2023-07-29 17:20")).getTime(),
            (new Date("2023-07-29 18:30")).getTime(),
            (new Date("2023-07-29 19:40")).getTime(),
            (new Date("2023-07-29 20:50")).getTime(),
            (new Date("2023-07-29 22:00")).getTime()
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

    for(const combination of groupCombinations) {
        games.push({
            phase: group.name,
            timestamp: group.timestamps[timestamp],
            hasStarted: false,
            "firstTeam": {
                "name": combination.firstTeam,
                "goals": 0,
                "scorers": []
            },
            "secondTeam": {
                "name": combination.secondTeam,
                "goals": 0,
                "scorers": []
            },
        })
        timestamp++;
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
