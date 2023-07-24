import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';
import { StyledOuterDiv, StyledTeamNamesRow, StyledTeamNameCell, StyledTeamScoreCell } from './style';

const GameManagement = () => {
    const { gameId } = useParams();
    const [ game, setGame ] = useState();

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

    console.log(game);

    if(game) {
        return (
            <StyledOuterDiv>
                <StyledTeamNamesRow>
                    <StyledTeamNameCell><h1>{game.firstTeam.name}</h1></StyledTeamNameCell>
                    <StyledTeamScoreCell><h1>{game.firstTeam.goals}</h1></StyledTeamScoreCell>
                    <StyledTeamScoreCell><h1>{game.secondTeam.goals}</h1></StyledTeamScoreCell>
                    <StyledTeamNameCell><h1>{game.secondTeam.name}</h1></StyledTeamNameCell>
    
                </StyledTeamNamesRow> 
            </StyledOuterDiv>
        );
    }
    return null;

}

export default GameManagement;