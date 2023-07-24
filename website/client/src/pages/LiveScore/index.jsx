import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { 
    StyledOuterDiv, StyledTitle, StyledTimer, StyledTableScore, StyledTableHeader, 
    StyledTableTeamName, StyledTableScoreCell, StyledTableBody, StyledTableBodyColumn, StyledTableBodyDivider
} from './style';

import logo from '../../assets/images/logo.png';


const LiveScore = () => {
    const { gameId } = useParams();

    const [game, setGame] = useState(null);
    const [gameMinutes, setGameMinutes] = useState(0);

    const updateGameMinutes = () => {
        if (game) {
          const startHour = new Date(Number(game.timestamp));
          const now = new Date("2023/07/29 09:27");
          const differenceInMilliseconds = now - startHour;
          const differenceInMinutes = differenceInMilliseconds / 60000;
          setGameMinutes(differenceInMinutes > 0 ? Math.round(differenceInMinutes): 0);
        }
      };
    
      useEffect(() => {
        // Start the interval when the component mounts
        const interval = setInterval(updateGameMinutes, 1000); // 60000 milliseconds = 1 minute
    
        // Clear the interval when the component unmounts
        return () => clearInterval(interval);
      }, [updateGameMinutes]);

    useEffect(() => {
        const fetchGameById = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/games/${gameId}`);
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
                <StyledTimer><h1>{gameMinutes}'</h1></StyledTimer>
                <StyledTableScore>
                    <StyledTableHeader>
                        <StyledTableTeamName><h2>{game.firstTeam.name}</h2></StyledTableTeamName>
                        <StyledTableScoreCell><h2>{game.firstTeam.goals}</h2></StyledTableScoreCell>
                        <StyledTableScoreCell><h2>{game.secondTeam.goals}</h2></StyledTableScoreCell>
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