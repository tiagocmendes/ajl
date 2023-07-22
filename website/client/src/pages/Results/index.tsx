import React from 'react';

import { StyledResultsContainer, StyledTournamentPhase,  
    StyledHeader, StyledBody, StyledBodyRow, StyledCell,
    StyleGameNumberCell,
} from './style';

const Results: React.FC = () => {

    const getDateAndTime = (timeStamp: number) => {
        const date = new Date(Number(timeStamp));
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        const hours = date.getHours();
        const minutes = date.getMinutes();

        return `${day}/${month}/${year} ${hours}h${minutes}`
    }


    const tournamentPhases = [
        {
            title: "Fase de grupos",
            games: [
                {
                    number: 1,
                    firstTeam: {
                        name: "Equipa 1",
                        score: 0
                    },
                    secondTeam: {
                        name: "Equipa 2",
                        score: 0
                    },
                    timestamp: 1690617600000,
                },
                {
                    number: 2,
                    firstTeam: {
                        name: "Equipa 3",
                        score: 0
                    },
                    secondTeam: {
                        name: "Equipa 4",
                        score: 0
                    },
                    timestamp: 1690617600000,
                },
                {
                    number: 3,
                    firstTeam: {
                        name: "Equipa 1",
                        score: 0
                    },
                    secondTeam: {
                        name: "Equipa 3",
                        score: 0
                    },
                    timestamp: 1690617600000,
                },
                {
                    number: 4,
                    firstTeam: {
                        name: "Equipa 2",
                        score: 0
                    },
                    secondTeam: {
                        name: "Equipa 4",
                        score: 0
                    },
                    timestamp: 1690617600000,
                },
                {
                    number: 5,
                    firstTeam: {
                        name: "Equipa 1",
                        score: 0
                    },
                    secondTeam: {
                        name: "Equipa 4",
                        score: 0
                    },
                    timestamp: 1690617600000,
                },
                {
                    number: 6,
                    firstTeam: {
                        name: "Equipa 2",
                        score: 0
                    },
                    secondTeam: {
                        name: "Equipa 3",
                        score: 0
                    },
                    timestamp: 1690617600000,
                },
                {
                    number: 7,
                    firstTeam: {
                        name: "Equipa 5",
                        score: 0
                    },
                    secondTeam: {
                        name: "Equipa 6",
                        score: 0
                    },
                    timestamp: 1690617600000,
                },
                {
                    number: 8,
                    firstTeam: {
                        name: "Equipa 7",
                        score: 0
                    },
                    secondTeam: {
                        name: "Equipa 8",
                        score: 0
                    },
                    timestamp: 1690617600000,
                },
                {
                    number: 9,
                    firstTeam: {
                        name: "Equipa 5",
                        score: 0
                    },
                    secondTeam: {
                        name: "Equipa 7",
                        score: 0
                    },
                    timestamp: 1690617600000,
                },
                {
                    number: 10,
                    firstTeam: {
                        name: "Equipa 6",
                        score: 0
                    },
                    secondTeam: {
                        name: "Equipa 8",
                        score: 0
                    },
                    timestamp: 1690617600000,
                },
                {
                    number: 11,
                    firstTeam: {
                        name: "Equipa 5",
                        score: 0
                    },
                    secondTeam: {
                        name: "Equipa 8",
                        score: 0
                    },
                    timestamp: 1690617600000,
                },
                {
                    number: 12,
                    firstTeam: {
                        name: "Equipa 6",
                        score: 0
                    },
                    secondTeam: {
                        name: "Equipa 7",
                        score: 0
                    },
                    timestamp: 1690617600000,
                }
            ]
        },
        {
            title: "Quartos-de-Final",
            games: [
                {
                    number: 13,
                    firstTeam: {
                        name: "Equipa 1",
                        score: 0
                    },
                    secondTeam: {
                        name: "Equipa 2",
                        score: 0
                    },
                    timestamp: 1690617600000,
                },
                {
                    number: 14,
                    firstTeam: {
                        name: "Equipa 3",
                        score: 0
                    },
                    secondTeam: {
                        name: "Equipa 4",
                        score: 0
                    },
                    timestamp: 1690617600000,
                },
                {
                    number: 15,
                    firstTeam: {
                        name: "Equipa 1",
                        score: 0
                    },
                    secondTeam: {
                        name: "Equipa 3",
                        score: 0
                    },
                    timestamp: 1690617600000,
                },
                {
                    number: 16,
                    firstTeam: {
                        name: "Equipa 2",
                        score: 0
                    },
                    secondTeam: {
                        name: "Equipa 4",
                        score: 0
                    },
                    timestamp: 1690617600000,
                },
            ]
        },
        {
            title: "Meias-de-Finais",
            games: [
                {
                    number: 17,
                    firstTeam: {
                        name: "Equipa 1",
                        score: 0
                    },
                    secondTeam: {
                        name: "Equipa 2",
                        score: 0
                    },
                    timestamp: 1690617600000,
                },
                {
                    number: 18,
                    firstTeam: {
                        name: "Equipa 3",
                        score: 0
                    },
                    secondTeam: {
                        name: "Equipa 4",
                        score: 0
                    },
                    timestamp: 1690617600000,
                },
            ]
        },
        {
            title: "3º e 4º lugares",
            games: [
                {
                    number: 19,
                    firstTeam: {
                        name: "Equipa 1",
                        score: 0
                    },
                    secondTeam: {
                        name: "Equipa 2",
                        score: 0
                    },
                    timestamp: 1690617600000,
                }
            ]
        },
        {
            title: "Final",
            games: [
                {
                    number: 20,
                    firstTeam: {
                        name: "Equipa 1",
                        score: 0
                    },
                    secondTeam: {
                        name: "Equipa 2",
                        score: 0
                    },
                    timestamp: 1690617600000,
                }
            ]
        }
    ]

    return (
        <StyledResultsContainer>
            {
                tournamentPhases.map(phase => (
                    <StyledTournamentPhase>
                        <StyledHeader><h1>{phase.title}</h1></StyledHeader>
                        <StyledBody>
                            <StyledBodyRow isOdd={false}>
                                <StyleGameNumberCell>
                                    Nº Jogo
                                </StyleGameNumberCell>
                                <StyledCell>
                                    Hora
                                </StyledCell>
                                <StyledCell>
                                    Visitado
                                </StyledCell>
                                <StyledCell>
                                    Golos Visitado
                                </StyledCell>
                                <StyledCell>
                                    Golos Visitante
                                </StyledCell>
                                    <StyledCell>
                                        Visitante
                                    </StyledCell>
                                </StyledBodyRow>
                            {
                                phase.games.map(game => (
                                    <StyledBodyRow isOdd={game.number % 2 !== 0}>
                                        <StyleGameNumberCell>
                                            {game.number}
                                        </StyleGameNumberCell>
                                        <StyledCell>
                                            {getDateAndTime(game.timestamp)}
                                        </StyledCell>
                                        <StyledCell>
                                            {game.firstTeam.name}
                                        </StyledCell>
                                        <StyledCell>
                                            {game.firstTeam.score}
                                        </StyledCell>
                                        <StyledCell>
                                            {game.secondTeam.score}
                                        </StyledCell>
                                        <StyledCell>
                                            {game.secondTeam.name}
                                        </StyledCell>
                                    </StyledBodyRow>
                                ))
                            }
                        </StyledBody>
                    </StyledTournamentPhase>
                ))
            }
        </StyledResultsContainer>
    );
}

export default Results;