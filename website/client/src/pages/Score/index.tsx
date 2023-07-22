import React from 'react';

import { 
    ScoreContainer, StyledGroupStages, StyledTable, StyledTableHeader,
    StyledTableRow, StyledTableCell, StyledTeamNameCell,
    StyledKnockOutStage, StyledKnockOutColumn, StyledKnockOutGame,
    StyledDivider, StyledKnockOutHeader, StyledKnockOutBody
} from './style';

const Score: React.FC = () => {

    const groupStages = [
        {
            name: "Grupo A",
            teams: [
                {
                    name: "Equipa 1",
                    rating: 1,
                    victories: 3,
                    draws: 0,
                    losses: 0,
                    scoredGoals: 10,
                    concededGoals: 2,
                    points: 9
                },
                {
                    name: "Equipa 2",
                    rating: 2,
                    victories: 1,
                    draws: 1,
                    losses: 0,
                    scoredGoals: 11,
                    concededGoals: 2,
                    points: 4
                },
                {
                    name: "Equipa 3",
                    rating: 3,
                    victories: 1,
                    draws: 1,
                    losses: 0,
                    scoredGoals: 10,
                    concededGoals: 2,
                    points: 4
                },
                {
                    name: "Equipa 4",
                    rating: 4,
                    victories: 0,
                    draws: 0,
                    losses: 3,
                    scoredGoals: 2,
                    concededGoals: 10,
                    points: 0
                }
            ]
        },
        {
            name: "Grupo B",
            teams: [
                {
                    name: "Equipa 5",
                    rating: 1,
                    victories: 3,
                    draws: 0,
                    losses: 0,
                    scoredGoals: 10,
                    concededGoals: 2,
                    points: 9
                },
                {
                    name: "Equipa 6",
                    rating: 2,
                    victories: 1,
                    draws: 1,
                    losses: 0,
                    scoredGoals: 11,
                    concededGoals: 2,
                    points: 4
                },
                {
                    name: "Equipa 7",
                    rating: 3,
                    victories: 1,
                    draws: 1,
                    losses: 0,
                    scoredGoals: 10,
                    concededGoals: 2,
                    points: 4
                },
                {
                    name: "Equipa 8",
                    rating: 4,
                    victories: 0,
                    draws: 0,
                    losses: 3,
                    scoredGoals: 2,
                    concededGoals: 10,
                    points: 0
                }
            ]
        }
    ]

    const knockOutStages = [
        {
            name: 'Quartos-de-Final',
            column: 1,
            games: [
                {
                    teamA: "Equipa 1",
                    teamB: "Equipa 8"
                },
                {
                    teamA: "Equipa 3",
                    teamB: "Equipa 6"
                }
            ]

        },
        {
            name: 'Meias-finais',
            column: 2,
            games: [
                {
                    teamA: "Equipa 1",
                    teamB: "Equipa 6"
                }
            ],
        },
        {
            name: 'Final',
            column: 3,
            games: [
                {
                    teamA: "Equipa 1",
                    teamB: "Equipa 5"
                }
            ],
        },
        {
            name: 'Meias-finais',
            column: 4,
            games: [
                {
                    teamA: "Equipa 2",
                    teamB: "Equipa 5"
                }
            ],
        },
        {
            name: 'Quartos-de-Final',
            column: 5,
            games: [
                {
                    teamA: "Equipa 2",
                    teamB: "Equipa 7"
                },
                {
                    teamA: "Equipa 4",
                    teamB: "Equipa 5"
                }
            ]
        },
    ]

    return (
        <ScoreContainer> 
            <h1>Fase de Grupos</h1>
            <StyledGroupStages>
                {
                    groupStages.map(group => (
                        <StyledTable>
                            <StyledTableHeader>{group.name}</StyledTableHeader>
                            <StyledTableRow>
                                <StyledTableCell>
                                    Lugar
                                </StyledTableCell>
                                <StyledTeamNameCell>
                                    Equipa
                                </StyledTeamNameCell>
                                <StyledTableCell>
                                    V
                                </StyledTableCell>
                                <StyledTableCell>
                                    E
                                </StyledTableCell>
                                <StyledTableCell>
                                    D
                                </StyledTableCell>
                                <StyledTableCell>
                                    GM
                                </StyledTableCell>
                                <StyledTableCell>
                                    GS
                                </StyledTableCell>
                                <StyledTableCell>
                                    P
                                </StyledTableCell>
                            </StyledTableRow>
                            {
                                group.teams.map(team => (
                                    <StyledTableRow>
                                        <StyledTableCell>
                                            {team.rating}
                                        </StyledTableCell>
                                        <StyledTeamNameCell>
                                            {team.name}
                                        </StyledTeamNameCell>
                                        <StyledTableCell>
                                            {team.victories}
                                        </StyledTableCell>
                                        <StyledTableCell>
                                            {team.draws}
                                        </StyledTableCell>
                                        <StyledTableCell>
                                            {team.losses}
                                        </StyledTableCell>
                                        <StyledTableCell>
                                            {team.scoredGoals}
                                        </StyledTableCell>
                                        <StyledTableCell>
                                            {team.concededGoals}
                                        </StyledTableCell>
                                        <StyledTableCell>
                                            {team.points}
                                        </StyledTableCell>
                                    </StyledTableRow>
                                ))
                            }
                        </StyledTable>
                    ))
                }
            </StyledGroupStages>
            <h1>Eliminatórias</h1>
            <StyledKnockOutStage>
                <StyledKnockOutHeader>
                {
                    knockOutStages.map(stage => (
                        <StyledKnockOutColumn>{stage.name}</StyledKnockOutColumn>
                    ))
                }
                </StyledKnockOutHeader>
                <StyledKnockOutBody>
                {knockOutStages.map((stage, index)=> (
                    <StyledKnockOutColumn isOdd={index % 2 === 0}>
                    {   
                        stage.games.map(game => (
                            <StyledKnockOutGame>
                                <span>{game.teamA}</span>
                                <StyledDivider />
                                <span>{game.teamB}</span>
                            </StyledKnockOutGame>
                        ))
                    }
                    </StyledKnockOutColumn>
                ))}
                </StyledKnockOutBody>
            </StyledKnockOutStage>
        </ScoreContainer>
    );
}

export default Score;