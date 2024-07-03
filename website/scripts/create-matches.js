const axios = require('axios');
const { getBaseUrl } = require('./utils');

const BASE_URL = getBaseUrl();

const GROUPS_FORMATS = {
	10: [
		{
			name: 'A',
			teamsNo: 5,
			matches: [
				{ homeTeam: 1, awayTeam: 2, timestamp: new Date('2024-07-06 10:00').getTime() },
				{ homeTeam: 1, awayTeam: 3, timestamp: new Date('2024-07-06 10:50').getTime() },
				{ homeTeam: 2, awayTeam: 3, timestamp: new Date('2024-07-06 11:40').getTime() },
				{ homeTeam: 4, awayTeam: 5, timestamp: new Date('2024-07-06 15:30').getTime() },
				{ homeTeam: 1, awayTeam: 4, timestamp: new Date('2024-07-06 16:20').getTime() },
				{ homeTeam: 2, awayTeam: 5, timestamp: new Date('2024-07-06 17:10').getTime() },
				{ homeTeam: 3, awayTeam: 4, timestamp: new Date('2024-07-06 18:00').getTime() },
				{ homeTeam: 1, awayTeam: 5, timestamp: new Date('2024-07-06 18:50').getTime() },
				{ homeTeam: 2, awayTeam: 4, timestamp: new Date('2024-07-06 19:40').getTime() },
				{ homeTeam: 3, awayTeam: 5, timestamp: new Date('2024-07-06 20:30').getTime() },

				{ homeTeam: 1, awayTeam: 4, timestamp: new Date('2024-07-07 10:00').getTime() },
				{ homeTeam: 4, awayTeam: 5, timestamp: new Date('2024-07-07 10:50').getTime() },
				{ homeTeam: 1, awayTeam: 5, timestamp: new Date('2024-07-07 11:40').getTime() },
				{ homeTeam: 2, awayTeam: 3, timestamp: new Date('2024-07-07 15:30').getTime() },
				{ homeTeam: 1, awayTeam: 2, timestamp: new Date('2024-07-07 16:20').getTime() },
				{ homeTeam: 3, awayTeam: 5, timestamp: new Date('2024-07-07 17:10').getTime() },
				{ homeTeam: 2, awayTeam: 4, timestamp: new Date('2024-07-07 18:00').getTime() },
				{ homeTeam: 1, awayTeam: 3, timestamp: new Date('2024-07-07 18:50').getTime() },
				{ homeTeam: 2, awayTeam: 5, timestamp: new Date('2024-07-07 19:40').getTime() },
				{ homeTeam: 3, awayTeam: 4, timestamp: new Date('2024-07-07 20:30').getTime() },
			],
		},
		{
			name: 'B',
			teamsNo: 5,
			matches: [
				{ homeTeam: 6, awayTeam: 7,  timestamp: new Date('2024-07-06 10:25').getTime() },
				{ homeTeam: 6, awayTeam: 8,  timestamp: new Date('2024-07-06 11:15').getTime() },
				{ homeTeam: 7, awayTeam: 8,  timestamp: new Date('2024-07-06 12:05').getTime() },
				{ homeTeam: 9, awayTeam: 10, timestamp: new Date('2024-07-06 15:55').getTime() },
				{ homeTeam: 6, awayTeam: 9,  timestamp: new Date('2024-07-06 16:45').getTime() },
				{ homeTeam: 7, awayTeam: 10, timestamp: new Date('2024-07-06 17:35').getTime() },
				{ homeTeam: 8, awayTeam: 9,  timestamp: new Date('2024-07-06 18:25').getTime() },
				{ homeTeam: 6, awayTeam: 10, timestamp: new Date('2024-07-06 19:15').getTime() },
				{ homeTeam: 7, awayTeam: 9,  timestamp: new Date('2024-07-06 20:05').getTime() },
				{ homeTeam: 8, awayTeam: 10, timestamp: new Date('2024-07-06 20:55').getTime() },

				{ homeTeam: 6, awayTeam: 9,  timestamp: new Date('2024-07-07 10:25').getTime() },
				{ homeTeam: 9, awayTeam: 10, timestamp: new Date('2024-07-07 11:15').getTime() },
				{ homeTeam: 6, awayTeam: 10, timestamp: new Date('2024-07-07 12:05').getTime() },
				{ homeTeam: 7, awayTeam: 8,  timestamp: new Date('2024-07-07 15:55').getTime() },
				{ homeTeam: 6, awayTeam: 7,  timestamp: new Date('2024-07-07 16:45').getTime() },
				{ homeTeam: 8, awayTeam: 10, timestamp: new Date('2024-07-07 17:35').getTime() },
				{ homeTeam: 7, awayTeam: 9,  timestamp: new Date('2024-07-07 18:25').getTime() },
				{ homeTeam: 6, awayTeam: 8,  timestamp: new Date('2024-07-07 19:15').getTime() },
				{ homeTeam: 7, awayTeam: 10, timestamp: new Date('2024-07-07 20:05').getTime() },
				{ homeTeam: 8, awayTeam: 9,  timestamp: new Date('2024-07-07 20:55').getTime() },
			],
		},
	],
	11: [
		{
			name: 'A',
			teamsNo: 5,
			timestamps: [
				new Date('2024-07-07 09:01').getTime(),
				new Date('2024-07-07 09:02').getTime(),
				new Date('2024-07-07 09:03').getTime(),
				new Date('2024-07-07 09:04').getTime(),
				new Date('2024-07-07 09:05').getTime(),
				new Date('2024-07-07 09:06').getTime(),
				new Date('2024-07-07 09:07').getTime(),
				new Date('2024-07-07 09:08').getTime(),
				new Date('2024-07-07 09:09').getTime(),
				new Date('2024-07-07 09:10').getTime(),
			],
		},
		{
			name: 'B',
			teamsNo: 6,
			timestamps: [
				new Date('2024-07-07 09:11').getTime(),
				new Date('2024-07-07 09:12').getTime(),
				new Date('2024-07-07 09:13').getTime(),
				new Date('2024-07-07 09:14').getTime(),
				new Date('2024-07-07 09:15').getTime(),
				new Date('2024-07-07 09:16').getTime(),
				new Date('2024-07-07 09:17').getTime(),
				new Date('2024-07-07 09:18').getTime(),
				new Date('2024-07-07 09:19').getTime(),
				new Date('2024-07-07 09:20').getTime(),
				new Date('2024-07-07 09:21').getTime(),
				new Date('2024-07-07 09:22').getTime(),
				new Date('2024-07-07 09:23').getTime(),
				new Date('2024-07-07 09:24').getTime(),
				new Date('2024-07-07 09:25').getTime(),
			],
		},
	],
	12: [
		{
			name: 'A',
			teamsNo: 6,
			timestamps: [
				new Date('2024-07-07 09:00').getTime(),
				new Date('2024-07-07 09:00').getTime(),
				new Date('2024-07-07 09:00').getTime(),
				new Date('2024-07-07 09:00').getTime(),
				new Date('2024-07-07 09:00').getTime(),
				new Date('2024-07-07 09:00').getTime(),
				new Date('2024-07-07 09:00').getTime(),
				new Date('2024-07-07 09:00').getTime(),
				new Date('2024-07-07 09:00').getTime(),
				new Date('2024-07-07 09:00').getTime(),
				new Date('2024-07-07 09:00').getTime(),
				new Date('2024-07-07 09:00').getTime(),
				new Date('2024-07-07 09:00').getTime(),
				new Date('2024-07-07 09:00').getTime(),
				new Date('2024-07-07 09:00').getTime(),
			],
		},
		{
			name: 'B',
			teamsNo: 6,
			timestamps: [
				new Date('2024-07-07 09:00').getTime(),
				new Date('2024-07-07 09:00').getTime(),
				new Date('2024-07-07 09:00').getTime(),
				new Date('2024-07-07 09:00').getTime(),
				new Date('2024-07-07 09:00').getTime(),
				new Date('2024-07-07 09:00').getTime(),
				new Date('2024-07-07 09:00').getTime(),
				new Date('2024-07-07 09:00').getTime(),
				new Date('2024-07-07 09:00').getTime(),
				new Date('2024-07-07 09:00').getTime(),
				new Date('2024-07-07 09:00').getTime(),
				new Date('2024-07-07 09:00').getTime(),
				new Date('2024-07-07 09:00').getTime(),
				new Date('2024-07-07 09:00').getTime(),
				new Date('2024-07-07 09:00').getTime(),
			],
		},
	],
	13: [
		{
			name: 'A',
			teamsNo: 4,
			timestamps: [
				new Date('2024-07-07 09:00').getTime(),
				new Date('2024-07-07 09:00').getTime(),
				new Date('2024-07-07 09:00').getTime(),
				new Date('2024-07-07 09:00').getTime(),
				new Date('2024-07-07 09:00').getTime(),
				new Date('2024-07-07 09:00').getTime(),
			],
		},
		{
			name: 'B',
			teamsNo: 4,
			timestamps: [
				new Date('2024-07-07 09:00').getTime(),
				new Date('2024-07-07 09:00').getTime(),
				new Date('2024-07-07 09:00').getTime(),
				new Date('2024-07-07 09:00').getTime(),
				new Date('2024-07-07 09:00').getTime(),
				new Date('2024-07-07 09:00').getTime(),
			],
		},
		{
			name: 'C',
			teamsNo: 5,
			timestamps: [
				new Date('2024-07-07 09:00').getTime(),
				new Date('2024-07-07 09:00').getTime(),
				new Date('2024-07-07 09:00').getTime(),
				new Date('2024-07-07 09:00').getTime(),
				new Date('2024-07-07 09:00').getTime(),
				new Date('2024-07-07 09:00').getTime(),
				new Date('2024-07-07 09:00').getTime(),
				new Date('2024-07-07 09:00').getTime(),
				new Date('2024-07-07 09:00').getTime(),
				new Date('2024-07-07 09:00').getTime(),
			],
		},
	],
	14: [
		{
			name: 'A',
			teamsNo: 4,
			timestamps: [
				new Date('2024-07-07 09:00').getTime(),
				new Date('2024-07-07 09:00').getTime(),
				new Date('2024-07-07 09:00').getTime(),
				new Date('2024-07-07 09:00').getTime(),
				new Date('2024-07-07 09:00').getTime(),
				new Date('2024-07-07 09:00').getTime(),
			],
		},
		{
			name: 'B',
			teamsNo: 5,
			timestamps: [
				new Date('2024-07-07 09:00').getTime(),
				new Date('2024-07-07 09:00').getTime(),
				new Date('2024-07-07 09:00').getTime(),
				new Date('2024-07-07 09:00').getTime(),
				new Date('2024-07-07 09:00').getTime(),
				new Date('2024-07-07 09:00').getTime(),
				new Date('2024-07-07 09:00').getTime(),
				new Date('2024-07-07 09:00').getTime(),
				new Date('2024-07-07 09:00').getTime(),
				new Date('2024-07-07 09:00').getTime(),
			],
		},
		{
			name: 'C',
			teamsNo: 5,
			timestamps: [
				new Date('2024-07-07 09:00').getTime(),
				new Date('2024-07-07 09:00').getTime(),
				new Date('2024-07-07 09:00').getTime(),
				new Date('2024-07-07 09:00').getTime(),
				new Date('2024-07-07 09:00').getTime(),
				new Date('2024-07-07 09:00').getTime(),
				new Date('2024-07-07 09:00').getTime(),
				new Date('2024-07-07 09:00').getTime(),
				new Date('2024-07-07 09:00').getTime(),
				new Date('2024-07-07 09:00').getTime(),
			],
		},
	],
	15: [
		{
			name: 'A',
			teamsNo: 5,
			timestamps: [
				new Date('2024-07-07 09:00').getTime(),
				new Date('2024-07-07 09:00').getTime(),
				new Date('2024-07-07 09:00').getTime(),
				new Date('2024-07-07 09:00').getTime(),
				new Date('2024-07-07 09:00').getTime(),
				new Date('2024-07-07 09:00').getTime(),
				new Date('2024-07-07 09:00').getTime(),
				new Date('2024-07-07 09:00').getTime(),
				new Date('2024-07-07 09:00').getTime(),
				new Date('2024-07-07 09:00').getTime(),
			],
		},
		{
			name: 'B',
			teamsNo: 5,
			timestamps: [
				new Date('2024-07-07 09:00').getTime(),
				new Date('2024-07-07 09:00').getTime(),
				new Date('2024-07-07 09:00').getTime(),
				new Date('2024-07-07 09:00').getTime(),
				new Date('2024-07-07 09:00').getTime(),
				new Date('2024-07-07 09:00').getTime(),
				new Date('2024-07-07 09:00').getTime(),
				new Date('2024-07-07 09:00').getTime(),
				new Date('2024-07-07 09:00').getTime(),
				new Date('2024-07-07 09:00').getTime(),
			],
		},
		{
			name: 'C',
			teamsNo: 5,
			timestamps: [
				new Date('2024-07-07 09:00').getTime(),
				new Date('2024-07-07 09:00').getTime(),
				new Date('2024-07-07 09:00').getTime(),
				new Date('2024-07-07 09:00').getTime(),
				new Date('2024-07-07 09:00').getTime(),
				new Date('2024-07-07 09:00').getTime(),
				new Date('2024-07-07 09:00').getTime(),
				new Date('2024-07-07 09:00').getTime(),
				new Date('2024-07-07 09:00').getTime(),
				new Date('2024-07-07 09:00').getTime(),
			],
		},
	],
	16: [
		{
			name: 'A',
			teamsNo: 4,
			timestamps: [
				new Date('2024-07-07 09:00').getTime(),
				new Date('2024-07-07 09:00').getTime(),
				new Date('2024-07-07 09:00').getTime(),
				new Date('2024-07-07 09:00').getTime(),
				new Date('2024-07-07 09:00').getTime(),
				new Date('2024-07-07 09:00').getTime(),
			],
		},
		{
			name: 'B',
			teamsNo: 4,
			timestamps: [
				new Date('2024-07-07 09:00').getTime(),
				new Date('2024-07-07 09:00').getTime(),
				new Date('2024-07-07 09:00').getTime(),
				new Date('2024-07-07 09:00').getTime(),
				new Date('2024-07-07 09:00').getTime(),
				new Date('2024-07-07 09:00').getTime(),
			],
		},
		{
			name: 'C',
			teamsNo: 4,
			timestamps: [
				new Date('2024-07-07 09:00').getTime(),
				new Date('2024-07-07 09:00').getTime(),
				new Date('2024-07-07 09:00').getTime(),
				new Date('2024-07-07 09:00').getTime(),
				new Date('2024-07-07 09:00').getTime(),
				new Date('2024-07-07 09:00').getTime(),
			],
		},
		{
			name: 'D',
			teamsNo: 4,
			timestamps: [
				new Date('2024-07-07 09:00').getTime(),
				new Date('2024-07-07 09:00').getTime(),
				new Date('2024-07-07 09:00').getTime(),
				new Date('2024-07-07 09:00').getTime(),
				new Date('2024-07-07 09:00').getTime(),
				new Date('2024-07-07 09:00').getTime(),
			],
		},
	],
};

const KNOCKOUT_FORMATS = {
	10: {
		QUARTERS: [
			{
				matchNo: 41,
				homeTeam: '1A',
				awayTeam: '4B',
				timestamp: new Date('2024-07-13 10:00').getTime(),
			},
			{
				matchNo: 42,
				homeTeam: '1B',
				awayTeam: '4A',
				timestamp: new Date('2024-07-13 10:45').getTime(),
			},
			{
				matchNo: 43,
				homeTeam: '2A',
				awayTeam: '3B',
				timestamp: new Date('2024-07-13 11:30').getTime(),
			},
			{
				matchNo: 44,
				homeTeam: '3A',
				awayTeam: '2B',
				timestamp: new Date('2024-07-13 12:15').getTime(),
			},
		],
		SEMI: [
			{
				matchNo: 45,
				homeTeam: 'Vencedor 41',
				awayTeam: 'Vencedor 44',
				timestamp: new Date('2024-07-13 16:00').getTime(),
			},
			{
				matchNo: 46,
				homeTeam: 'Vencedor 42',
				awayTeam: 'Vencedor 43',
				timestamp: new Date('2024-07-13 16:45').getTime(),
			},
		],
		PREFINAL: [
			{
				matchNo: 47,
				homeTeam: 'Perdedor 45',
				awayTeam: 'Perdedor 46',
				timestamp: new Date('2024-07-13 18:15').getTime(),
			},
		],
		FINAL: [
			{
				matchNo: 48,
				homeTeam: 'Vencedor 45',
				awayTeam: 'Vencedor 46',
				timestamp: new Date('2024-07-13 19:30').getTime(),
			},
		],
	},
	11: {
		QUARTERS: [
			{
				matchNo: 26,
				homeTeam: '1A',
				awayTeam: '4B',
				timestamp: new Date('2024-07-07 09:00').getTime(),
			},
			{
				matchNo: 27,
				homeTeam: '1B',
				awayTeam: '4A',
				timestamp: new Date('2024-07-07 09:00').getTime(),
			},
			{
				matchNo: 28,
				homeTeam: '2A',
				awayTeam: '3B',
				timestamp: new Date('2024-07-07 09:00').getTime(),
			},
			{
				matchNo: 29,
				homeTeam: '3A',
				awayTeam: '2B',
				timestamp: new Date('2024-07-07 09:00').getTime(),
			},
		],
		SEMI: [
			{
				matchNo: 30,
				homeTeam: 'Vencedor 26',
				awayTeam: 'Vencedor 29',
				timestamp: new Date('2024-07-07 09:00').getTime(),
			},
			{
				matchNo: 31,
				homeTeam: 'Vencedor 27',
				awayTeam: 'Vencedor 28',
				timestamp: new Date('2024-07-07 09:00').getTime(),
			},
		],
		PREFINAL: [
			{
				matchNo: 32,
				homeTeam: 'Perdedor 30',
				awayTeam: 'Perdedor 31',
				timestamp: new Date('2024-07-07 09:00').getTime(),
			},
		],
		FINAL: [
			{
				matchNo: 33,
				homeTeam: 'Vencedor 30',
				awayTeam: 'Vencedor 31',
				timestamp: new Date('2024-07-07 09:00').getTime(),
			},
		],
	},
	12: {
		QUARTERS: [
			{
				matchNo: 31,
				homeTeam: '1A',
				awayTeam: '4B',
				timestamp: new Date('2024-07-07 09:00').getTime(),
			},
			{
				matchNo: 32,
				homeTeam: '1B',
				awayTeam: '4A',
				timestamp: new Date('2024-07-07 09:00').getTime(),
			},
			{
				matchNo: 33,
				homeTeam: '2A',
				awayTeam: '3B',
				timestamp: new Date('2024-07-07 09:00').getTime(),
			},
			{
				matchNo: 34,
				homeTeam: '3A',
				awayTeam: '2B',
				timestamp: new Date('2024-07-07 09:00').getTime(),
			},
		],
		SEMI: [
			{
				matchNo: 35,
				homeTeam: 'Vencedor 31',
				awayTeam: 'Vencedor 34',
				timestamp: new Date('2024-07-07 09:00').getTime(),
			},
			{
				matchNo: 36,
				homeTeam: 'Vencedor 32',
				awayTeam: 'Vencedor 33',
				timestamp: new Date('2024-07-07 09:00').getTime(),
			},
		],
		PREFINAL: [
			{
				matchNo: 37,
				homeTeam: 'Perdedor 35',
				awayTeam: 'Perdedor 36',
				timestamp: new Date('2024-07-07 09:00').getTime(),
			},
		],
		FINAL: [
			{
				matchNo: 38,
				homeTeam: 'Vencedor 35',
				awayTeam: 'Vencedor 36',
				timestamp: new Date('2024-07-07 09:00').getTime(),
			},
		],
	},
	13: {
		QUARTERS: [
			{
				matchNo: 23,
				homeTeam: '1A',
				awayTeam: '1T',
				timestamp: new Date('2024-07-07 09:00').getTime(),
			},
			{
				matchNo: 24,
				homeTeam: '1B',
				awayTeam: '2A',
				timestamp: new Date('2024-07-07 09:00').getTime(),
			},
			{
				matchNo: 25,
				homeTeam: '2C',
				awayTeam: '2B',
				timestamp: new Date('2024-07-07 09:00').getTime(),
			},
			{
				matchNo: 26,
				homeTeam: '1C',
				awayTeam: '2T',
				timestamp: new Date('2024-07-07 09:00').getTime(),
			},
		],
		SEMI: [
			{
				matchNo: 27,
				homeTeam: 'Vencedor 23',
				awayTeam: 'Vencedor 24',
				timestamp: new Date('2024-07-07 09:00').getTime(),
			},
			{
				matchNo: 28,
				homeTeam: 'Vencedor 25',
				awayTeam: 'Vencedor 26',
				timestamp: new Date('2024-07-07 09:00').getTime(),
			},
		],
		PREFINAL: [
			{
				matchNo: 29,
				homeTeam: 'Perdedor 27',
				awayTeam: 'Perdedor 28',
				timestamp: new Date('2024-07-07 09:00').getTime(),
			},
		],
		FINAL: [
			{
				matchNo: 30,
				homeTeam: 'Vencedor 27',
				awayTeam: 'Vencedor 28',
				timestamp: new Date('2024-07-07 09:00').getTime(),
			},
		],
	},
	14: {
		QUARTERS: [
			{
				matchNo: 27,
				homeTeam: '1A',
				awayTeam: '2B',
				timestamp: new Date('2024-07-07 09:00').getTime(),
			},
			{
				matchNo: 28,
				homeTeam: '1B',
				awayTeam: '1T',
				timestamp: new Date('2024-07-07 09:00').getTime(),
			},
			{
				matchNo: 29,
				homeTeam: '1C',
				awayTeam: '2T',
				timestamp: new Date('2024-07-07 09:00').getTime(),
			},
			{
				matchNo: 30,
				homeTeam: '2A',
				awayTeam: '2C',
				timestamp: new Date('2024-07-07 09:00').getTime(),
			},
		],
		SEMI: [
			{
				matchNo: 31,
				homeTeam: 'Vencedor 27',
				awayTeam: 'Vencedor 28',
				timestamp: new Date('2024-07-07 09:00').getTime(),
			},
			{
				matchNo: 32,
				homeTeam: 'Vencedor 29',
				awayTeam: 'Vencedor 30',
				timestamp: new Date('2024-07-07 09:00').getTime(),
			},
		],
		PREFINAL: [
			{
				matchNo: 33,
				homeTeam: 'Perdedor 31',
				awayTeam: 'Perdedor 32',
				timestamp: new Date('2024-07-07 09:00').getTime(),
			},
		],
		FINAL: [
			{
				matchNo: 34,
				homeTeam: 'Vencedor 31',
				awayTeam: 'Vencedor 32',
				timestamp: new Date('2024-07-07 09:00').getTime(),
			},
		],
	},
	15: {
		QUARTERS: [
			{
				matchNo: 31,
				homeTeam: '1A',
				awayTeam: '2B',
				timestamp: new Date('2024-07-07 09:00').getTime(),
			},
			{
				matchNo: 32,
				homeTeam: '1B',
				awayTeam: '1T',
				timestamp: new Date('2024-07-07 09:00').getTime(),
			},
			{
				matchNo: 33,
				homeTeam: '1C',
				awayTeam: '2T',
				timestamp: new Date('2024-07-07 09:00').getTime(),
			},
			{
				matchNo: 34,
				homeTeam: '2A',
				awayTeam: '2C',
				timestamp: new Date('2024-07-07 09:00').getTime(),
			},
		],
		SEMI: [
			{
				matchNo: 35,
				homeTeam: 'Vencedor 31',
				awayTeam: 'Vencedor 32',
				timestamp: new Date('2024-07-07 09:00').getTime(),
			},
			{
				matchNo: 36,
				homeTeam: 'Vencedor 33',
				awayTeam: 'Vencedor 34',
				timestamp: new Date('2024-07-07 09:00').getTime(),
			},
		],
		PREFINAL: [
			{
				matchNo: 37,
				homeTeam: 'Perdedor 35',
				awayTeam: 'Perdedor 36',
				timestamp: new Date('2024-07-07 09:00').getTime(),
			},
		],
		FINAL: [
			{
				matchNo: 38,
				homeTeam: 'Vencedor 35',
				awayTeam: 'Vencedor 36',
				timestamp: new Date('2024-07-07 09:00').getTime(),
			},
		],
	},
	16: {
		EIGHTS: [
			{
				matchNo: 25,
				homeTeam: '1A',
				awayTeam: '4D',
				timestamp: new Date('2024-07-07 09:00').getTime(),
			},
			{
				matchNo: 26,
				homeTeam: '1B',
				awayTeam: '4C',
				timestamp: new Date('2024-07-07 09:00').getTime(),
			},
			{
				matchNo: 27,
				homeTeam: '1C',
				awayTeam: '4B',
				timestamp: new Date('2024-07-07 09:00').getTime(),
			},
			{
				matchNo: 28,
				homeTeam: '1D',
				awayTeam: '4A',
				timestamp: new Date('2024-07-07 09:00').getTime(),
			},
			{
				matchNo: 29,
				homeTeam: '2A',
				awayTeam: '4D',
				timestamp: new Date('2024-07-07 09:00').getTime(),
			},
			{
				matchNo: 30,
				homeTeam: '2B',
				awayTeam: '4C',
				timestamp: new Date('2024-07-07 09:00').getTime(),
			},
			{
				matchNo: 31,
				homeTeam: '2C',
				awayTeam: '4B',
				timestamp: new Date('2024-07-07 09:00').getTime(),
			},
			{
				matchNo: 32,
				homeTeam: '2D',
				awayTeam: '4A',
				timestamp: new Date('2024-07-07 09:00').getTime(),
			},
		],
		QUARTERS: [
			{
				matchNo: 33,
				homeTeam: 'Vencedor 25',
				awayTeam: 'Vencedor 31',
				timestamp: new Date('2024-07-07 09:00').getTime(),
			},
			{
				matchNo: 34,
				homeTeam: 'Vencedor 26',
				awayTeam: 'Vencedor 32',
				timestamp: new Date('2024-07-07 09:00').getTime(),
			},
			{
				matchNo: 35,
				homeTeam: 'Vencedor 27',
				awayTeam: 'Vencedor 29',
				timestamp: new Date('2024-07-07 09:00').getTime(),
			},
			{
				matchNo: 36,
				homeTeam: 'Vencedor 28',
				awayTeam: 'Vencedor 30',
				timestamp: new Date('2024-07-07 09:00').getTime(),
			},
		],
		SEMI: [
			{
				matchNo: 37,
				homeTeam: 'Vencedor 33',
				awayTeam: 'Vencedor 34',
				timestamp: new Date('2024-07-07 09:00').getTime(),
			},
			{
				matchNo: 38,
				homeTeam: 'Vencedor 35',
				awayTeam: 'Vencedor 36',
				timestamp: new Date('2024-07-07 09:00').getTime(),
			},
		],
		PREFINAL: [
			{
				matchNo: 39,
				homeTeam: 'Perdedor 37',
				awayTeam: 'Perdedor 38',
				timestamp: new Date('2024-07-07 09:00').getTime(),
			},
		],
		FINAL: [
			{
				matchNo: 40,
				homeTeam: 'Vencedor 37',
				awayTeam: 'Vencedor 38',
				timestamp: new Date('2024-07-07 09:00').getTime(),
			},
		],
	},
};

const generateGroupMatchesCombinations = teams => {
	const combinations = [];

	// Step 1: Generate all combinations of matches
	for (let i = 0; i < teams.length - 1; i++) {
		for (let j = i + 1; j < teams.length; j++) {
			combinations.push({ homeTeam: teams[i], awayTeam: teams[j] });
		}
	}

	const result = [];
	const teamLastPlayed = new Map(teams.map(team => [team.name, -1])); // Keeps track of when a team last played

	// Step 2: Schedule the matches
	while (combinations.length > 0) {
		let matchIndex = -1;

		for (let i = 0; i < combinations.length; i++) {
			const { homeTeam, awayTeam } = combinations[i];

			// Check if this match can be added (neither team played in the last round)
			if (
				teamLastPlayed.get(homeTeam.name) < result.length - 1 &&
				teamLastPlayed.get(awayTeam.name) < result.length - 1
			) {
				matchIndex = i;
				break;
			}
		}

		// If no suitable match was found, choose the first available match
		if (matchIndex === -1) {
			matchIndex = 0;
		}

		const match = combinations[matchIndex];
		const { homeTeam, awayTeam } = match;

		result.push(match);
		teamLastPlayed.set(homeTeam.name, result.length - 1);
		teamLastPlayed.set(awayTeam.name, result.length - 1);
		combinations.splice(matchIndex, 1); // Remove this match from combinations
	}

	return result;
};

const createGroupMatches = async (teams, config) => {
	const numberOfTeams = teams.length;

	if (teams.length < 10 || teams.length > 16) {
		console.error('Invalid number of teams!');
		return;
	}

	const groupsFormat = GROUPS_FORMATS[numberOfTeams];
	const matches = [];
	let matchNumber = 0;
	for (const group of groupsFormat) {
		for (const match of group.matches) {
			matchNumber++;
			matches.push({
				matchNumber,
				phase: `GROUP_${group.name}`,
				hasStarted: false,
				timestamp: match.timestamp,
				winner: null,
				homeTeam: teams[match.homeTeam - 1]._id,
				awayTeam: teams[match.awayTeam - 1]._id,
				homeScore: 0,
				awayScore: 0,
				homeTeamEvents: [],
				awayTeamEvents: [],
			});
		}
	}

	const sortedMatches = matches
		.sort((m1, m2) => m1.timestamp - m2.timestamp)
		.map((match, index) => {
			return {
				...match,
				matchNumber: index + 1,
			};
		});

	try {
		const matchesResponse = await axios.post(
			BASE_URL + '/matches',
			sortedMatches,
			config
		);
		return matchesResponse.data;
	} catch (error) {
		console.error('Error creating matches:', error);
		throw error;
	}
};

const createKnockoutMatches = async (teams = [], config) => {
	const numberOfTeams = teams.length;

	if (teams.length < 10 || teams.length > 16) {
		console.error('Invalid number of teams!');
		return;
	}

	const knockoutFormat = KNOCKOUT_FORMATS[numberOfTeams];
	const matches = [];
	for (const phase of Object.keys(knockoutFormat)) {
		for (const match of knockoutFormat[phase]) {
			matches.push({
				matchNumber: match.matchNo,
				phase,
				hasStarted: false,
				timestamp: match.timestamp,
				winner: null,
				homeTeam: match.homeTeam,
				awayTeam: match.awayTeam,
				homeScore: 0,
				awayScore: 0,
				homeTeamEvents: [],
				awayTeamEvents: [],
			});
		}
	}

	const sortedMatches = matches.sort((m1, m2) => m1.timestamp - m2.timestamp);

	try {
		const matchesResponse = await axios.post(
			BASE_URL + '/matches',
			sortedMatches,
			config
		);
		return matchesResponse.data;
	} catch (error) {
		console.error('Error creating knockout matches:', error);
		throw error;
	}
};

module.exports = { createGroupMatches, createKnockoutMatches };
