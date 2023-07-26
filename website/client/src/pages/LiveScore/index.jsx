import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { 
    StyledOuterDiv, StyledTitle, StyledTimer, StyledTableScore, StyledTableHeader, 
    StyledTableTeamName, StyledTableScoreCell, StyledTableBody, StyledTableBodyColumn, StyledTableBodyDivider
} from './style';

import logo from '../../assets/images/logo.png';

import { routes } from '../../routes';

import Timer from './Timer';

const LiveScore = () => {
    const { gameId } = useParams();

    const [game, setGame] = useState(null);

    const getDateAndTime = (timeStamp) => {
        const date = new Date(Number(timeStamp));
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        const hours = date.getHours();
        const minutes = date.getMinutes();

        return `${day}/${month}/${year} ${hours === 9 ? '09' : hours}h${minutes === 0 ? '00' : minutes}`
    }

    useEffect(() => {
        const fetchGameById = async () => {
            try {
                const response = await axios.get(`${routes.games}/${gameId}`);
                setGame(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchGameById();
    }, [gameId]);

    if(game)
        return (
            <StyledOuterDiv>
                <img alt="logo" src={logo} style={{height: "15rem"}} />
                <StyledTitle><h1>Resultado em tempo real</h1></StyledTitle>
                <StyledTimer>
                    { game.hasStarted && game.winner !== '' ? 
                        <h1>Jogo terminado</h1> : 
                        game.hasStarted ? <Timer startTimestamp={game.timestamp} /> 
                        :  <h1>{`Hora de início: ${getDateAndTime(game.timestamp)}`}</h1>
                    }
                </StyledTimer>
                <StyledTableScore>
                    <StyledTableHeader>
                        <StyledTableTeamName><h2>{game.firstTeam.name}</h2></StyledTableTeamName>
                        <StyledTableScoreCell><h2>{game.hasStarted ? game.firstTeam.goals : '-'}</h2></StyledTableScoreCell>
                        <StyledTableScoreCell><h2>{game.hasStarted ? game.secondTeam.goals : '-'}</h2></StyledTableScoreCell>
                        <StyledTableTeamName><h2>{game.secondTeam.name}</h2></StyledTableTeamName>
                    </StyledTableHeader>
                    <StyledTableBody>
                        <StyledTableBodyColumn firstTeam>
                            {
                                game.firstTeam.scorers.map(scorer => (
                                    <h3>{scorer.name} {scorer.minute}'</h3>
                                ))
                            }
                        </StyledTableBodyColumn>
                        <StyledTableBodyDivider />
                        <StyledTableBodyColumn>
                            {
                                game.secondTeam.scorers.map(scorer => (
                                    <h3>{scorer.name} {scorer.minute}'</h3>
                                ))
                            }
                        </StyledTableBodyColumn>
                    </StyledTableBody>
                </StyledTableScore>
                
            </StyledOuterDiv>    
        );
    
    return null
}

export default LiveScore;