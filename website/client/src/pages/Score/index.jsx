import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';

import { 
    ScoreContainer, StyledGroupStages, StyledTable, StyledTableHeader,
    StyledTableRow, StyledTableCell, StyledTeamNameCell,
    StyledKnockOutStage, StyledKnockOutColumn, StyledKnockOutGame,
    StyledDivider, StyledKnockOutHeader, StyledKnockOutBody
} from './style';

const Score = () => {

    const [groupStages, setGroupStages] = useState([]);
    const [knockOutStages, setKnockoutStages] = useState({});

    useEffect(() => {
        const fetchClassification = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/groups`);
                setGroupStages(response.data)
            } catch (error) {
                console.error(error);
            }
        };

        const fetchKnockouts = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/knockouts`);
                setKnockoutStages(response.data)
            } catch (error) {
                console.error(error);
            }
        }

        fetchClassification();
        fetchKnockouts();
    }, []);

    const formattedKnockOutStages = useMemo(() => {
        if(Object.keys(knockOutStages).length > 0) {
            return [
                {
                    name: 'Quartos-de-Final',
                    column: 1,
                    games: [
                        {
                            firstTeam: knockOutStages?.quarters[0].firstTeam.name,
                            secondTeam: knockOutStages?.quarters[0].secondTeam.name,
                        },
                        {
                            firstTeam: knockOutStages?.quarters[3].firstTeam.name,
                            secondTeam: knockOutStages?.quarters[3].secondTeam.name,
                        }
                    ]
                },
                {
                    name: 'Meias-finais',
                    column: 2,
                    games: [
                        {
                            firstTeam: knockOutStages?.semi[0].firstTeam.name,
                            secondTeam: knockOutStages?.semi[0].secondTeam.name,
                        },
                    ],
                },
                {
                    name: 'Final',
                    column: 3,
                    games: [
                        {
                            firstTeam: knockOutStages?.final[0].firstTeam.name,
                            secondTeam: knockOutStages?.final[0].secondTeam.name,
                        },
                    ],
                },
                {
                    name: 'Meias-finais',
                    column: 4,
                    games: [
                        {
                            firstTeam: knockOutStages?.semi[1].firstTeam.name,
                            secondTeam: knockOutStages?.semi[1].secondTeam.name,
                        },
                    ],
                },
                {
                    name: 'Quartos-de-Final',
                    column: 5,
                    games: [
                        {
                            firstTeam: knockOutStages?.quarters[1].firstTeam.name,
                            secondTeam: knockOutStages?.quarters[1].secondTeam.name,
                        },
                        {
                            firstTeam: knockOutStages?.quarters[2].firstTeam.name,
                            secondTeam: knockOutStages?.quarters[2].secondTeam.name,
                        }
                    ]
                },
            ]
        } 

        return [];
    }, [knockOutStages])

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
                    formattedKnockOutStages.length > 0 && formattedKnockOutStages.map(stage => (
                        <StyledKnockOutColumn>{stage.name}</StyledKnockOutColumn>
                    ))
                }
                </StyledKnockOutHeader>
                <StyledKnockOutBody>
                {formattedKnockOutStages.length > 0 && formattedKnockOutStages.map((stage, index)=> (
                    <StyledKnockOutColumn isOdd={index % 2 === 0}>
                    {   
                        stage.games.map(game => (
                            <StyledKnockOutGame>
                                <span>{game.firstTeam}</span>
                                <StyledDivider />
                                <span>{game.secondTeam}</span>
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