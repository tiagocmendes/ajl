import { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { StyledResultsContainer, StyledTournamentPhase,  
    StyledHeader, StyledBody, StyledBodyRow, StyledCell,
    StyleGameNumberCell,
} from './style';

const Results = () => {
    const navigate = useNavigate();
    const [games, setGames] = useState([]);

    const getDateAndTime = (timeStamp) => {
        const date = new Date(Number(timeStamp));
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        const hours = date.getHours();
        const minutes = date.getMinutes();

        return `${day}/${month}/${year} ${hours === 9 ? '09' : hours}h${minutes === 0 ? '00' : minutes}`
    }

    const tournamentPhases = useMemo(() => {
        if(games) {
            const groups = games.filter(game => ['A', 'B', 'C'].includes(game.phase));
            const quarters = games.filter(game => game.phase === 'quarters');
            const semis = games.filter(game => game.phase === 'semi');
            const final = games.filter(game => game.phase === 'final');
            const preFinal = games.filter(game => game.phase === 'pre-final');
            return [
                { title: "Fase de Grupos", games: groups },
                { title: "Quartos-de-Final", games: quarters },
                { title: "Meia-Final", games: semis },
                { title: "3º e 4º Lugares", games: preFinal },
                { title: "Final", games: final }
            ]
        }
    }, [games]) 

    useEffect(() => {
        const fetchGames = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/games`);
                setGames(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchGames();
    }, []);

    const handleGameClick = (gameId) => {
        navigate(`/live/${gameId}`);
    };

    if(games)
        return (
            <StyledResultsContainer>
                {
                    tournamentPhases.map(phase => (
                        <StyledTournamentPhase>
                            <StyledHeader><h1>{phase.title}</h1></StyledHeader>
                            <StyledBody>
                                <StyledBodyRow isHeader>
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
                                    phase.games.map((game, index) => (
                                        <StyledBodyRow isEven={index % 2 === 0} onClick={() => handleGameClick(game.gameNumber)}>
                                            <StyleGameNumberCell>
                                                {game.gameNumber}
                                            </StyleGameNumberCell>
                                            <StyledCell>
                                                {getDateAndTime(game.timestamp)}
                                            </StyledCell>
                                            <StyledCell>
                                                {game.firstTeam.name}
                                            </StyledCell>
                                            <StyledCell>
                                                {game.firstTeam.goals}
                                            </StyledCell>
                                            <StyledCell>
                                                {game.secondTeam.goals}
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
    return null
}

export default Results;