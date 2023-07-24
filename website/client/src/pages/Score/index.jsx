import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { 
    ScoreContainer, StyledGroupStages, StyledTable, StyledTableHeader,
    StyledTableRow, StyledTableCell, StyledTeamNameCell,
    StyledKnockOutStage, StyledKnockOutColumn, StyledKnockOutGame,
    StyledDivider, StyledKnockOutHeader, StyledKnockOutBody
} from './style';

const Score: React.FC = () => {

    const [groupStages, setGroupStages] = useState([]);

    useEffect(() => {
        const fetchClassification = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/groups`);
                setGroupStages(response.data)
                console.log(response.data)
            } catch (error) {
                console.error(error);
            }
        };

        fetchClassification();
    }, []);

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
                    groupStages.length > 0 && groupStages.map(group => (
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
                                group.teams.map((team, index) => (
                                    <StyledTableRow>
                                        <StyledTableCell>
                                            {index + 1}
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
                                            {team.gm}
                                        </StyledTableCell>
                                        <StyledTableCell>
                                            {team.gs}
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