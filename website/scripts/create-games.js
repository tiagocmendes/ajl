// The URL to which you want to make the POST request
const url = 'http://localhost:8080/games';
const fetch = require("node-fetch");
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

const groupsCombinations = {
    "A": [
        { firstTeam: 'AL CFV', secondTeam: 'SEM NOME' },
        { firstTeam: '3 POR 1', secondTeam: 'VM CAR AUTOMÓVEIS' },
        { firstTeam: 'AL CFV', secondTeam: 'FERRAGENS PEREIRA' },
        { firstTeam: 'SEM NOME', secondTeam: '3 POR 1' },
        { firstTeam: 'VM CAR AUTOMÓVEIS', secondTeam: 'FERRAGENS PEREIRA' },
        { firstTeam: 'AL CFV', secondTeam: '3 POR 1' },
        { firstTeam: 'SEM NOME', secondTeam: 'VM CAR AUTOMÓVEIS' },
        { firstTeam: '3 POR 1', secondTeam: 'FERRAGENS PEREIRA' },
        { firstTeam: 'AL CFV', secondTeam: 'VM CAR AUTOMÓVEIS' },
        { firstTeam: 'SEM NOME', secondTeam: 'FERRAGENS PEREIRA' },
    ],
    "B": 
    [
        { firstTeam: 'RO SERRALHARIA', secondTeam: "TASCA D'ALDEIA" },
        { firstTeam: '100 PERNAS', secondTeam: 'RECONSTRUÇÕES ELMORE' },
        { firstTeam: 'RO SERRALHARIA', secondTeam: 'PAVIMIKE FC' },
        { firstTeam: "TASCA D'ALDEIA", secondTeam: '100 PERNAS' },
        { firstTeam: 'RECONSTRUÇÕES ELMORE', secondTeam: 'PAVIMIKE FC' },
        { firstTeam: 'RO SERRALHARIA', secondTeam: '100 PERNAS' },
        { firstTeam: "TASCA D'ALDEIA", secondTeam: 'RECONSTRUÇÕES ELMORE' },
        { firstTeam: '100 PERNAS', secondTeam: 'PAVIMIKE FC' },
        { firstTeam: 'RO SERRALHARIA', secondTeam: 'RECONSTRUÇÕES ELMORE' },
        { firstTeam: "TASCA D'ALDEIA", secondTeam: 'PAVIMIKE FC' },
    ]
}

const games = [];
for(const group of groups) {
    const groupCombinations = groupsCombinations[group.name]
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
