import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';
import { StyledOuterDiv, StyledTeamNamesRow, StyledTeamNameCell, StyledTeamScoreCell, StyledStartGameBtn, StyledScorerInput, StyledScorersRow, ScorerContainer, StyledAddBtn, StyledRemoveBtn } from './style';

const GameManagement = () => {
    const { gameId } = useParams();
    const [ game, setGame ] = useState();
    const [ gameStarted, setGameStarted ] = useState(game?.hasStarted || false)
    const [ winner, setWinner ] = useState('');
    const [ gameEnd, setGameEnd ] = useState((game?.hasStarted && game?.winner !== '') || false)
    const firstTeamScorerRef = useRef();
    const secondTeamScorerRef = useRef();



    const getDateAndTime = (timeStamp) => {
        const date = new Date(Number(timeStamp));
        const hours = date.getHours();
        const minutes = date.getMinutes();
        return `${hours === 9 ? '09' : hours}h${minutes === 0 ? '00' : minutes}`
    }

    const handleWinnerChange = (e) => {
        setWinner(`${e.target.value}`.toUpperCase());
    }

    const handleStartGame = async () => {
        try {
            const jsonBody = { hasStarted: true }
            const response = await axios.patch(`http://localhost:8080/games/${gameId}`, jsonBody);
            setGameStarted(true);
            console.log('Game updated successfully:', response.data);
          } catch (error) {
            console.error('Error updating game:', error.message);
          }
    }

    const handleEndGame = async () => {
        console.log(winner)

        console.log(game.firstTeam.name)
        console.log(game.secondTeam.name)

        if(winner === game.firstTeam.name || winner === game.secondTeam.name) {
            try {
                const jsonBody = { winner }
                const response = await axios.patch(`http://localhost:8080/games/${gameId}`, jsonBody);
                setGameEnd(true);
                setGame(response.data.updatedGame);
                console.log('Game updated successfully:', response.data);
            } catch (error) {
                console.error('Error updating game:', error.message);
            }
        }
    }

    const handleAddGoal = async (isFirstTeam) => {
        try {
            let jsonBody = {};
            console.log(firstTeamScorerRef.current.value)
            if(isFirstTeam && firstTeamScorerRef.current.value) {
                jsonBody = { 
                    firstTeam: {
                        name: game.firstTeam.name,
                        goals: game.firstTeam.goals + 1,
                        scorer: {
                            name: firstTeamScorerRef.current.value,
                            minute: 18
                        }
                    } 
                }
            } else if(!isFirstTeam && secondTeamScorerRef.current.value){
                jsonBody = { 
                    secondTeam: {
                        name: game.secondTeam.name,
                        goals: game.secondTeam.goals + 1,
                        scorer: {
                            name: secondTeamScorerRef.current.value,
                            minute: 2
                        }
                    } 
                }
            }
            const response = await axios.patch(`http://localhost:8080/games/${gameId}`, jsonBody);
            setGame(response.data.updatedGame);
            console.log('Game updated successfully:', response.data);
        } catch (error) {
            console.error('Error updating game:', error.message);
        }
    }

    useEffect(() => {
        const fetchGameById = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/games/${gameId}`);
                setGame(response.data);
                setGameStarted(response.data.hasStarted);
                setGameEnd(response.data.hasStarted && response.data.winner !== '');
            } catch (error) {
                console.error(error);
            }
        };
        fetchGameById();
    }, [gameStarted, gameId]);

    if(game) {
        return (
            <StyledOuterDiv>
                <StyledTeamNamesRow><h3>Início: {getDateAndTime(game.timestamp)}</h3></StyledTeamNamesRow> 
                <StyledTeamNamesRow>
                    <StyledTeamNameCell><h1>{game.firstTeam.name}</h1></StyledTeamNameCell>
                    <StyledTeamScoreCell><h1>{game.hasStarted ? game.firstTeam.goals : '-'}</h1></StyledTeamScoreCell>
                    <StyledTeamScoreCell><h1>{game.hasStarted ? game.secondTeam.goals : '-'}</h1></StyledTeamScoreCell>
                    <StyledTeamNameCell><h1>{game.secondTeam.name}</h1></StyledTeamNameCell>
                </StyledTeamNamesRow>
                {!gameStarted && !gameEnd &&
                    <StyledTeamNamesRow>
                        <StyledStartGameBtn onClick={handleStartGame}>Iniciar jogo</StyledStartGameBtn>
                    </StyledTeamNamesRow>
                }
                {
                    gameStarted && !gameEnd &&
                    <>
                        <StyledScorersRow>
                            <ScorerContainer>
                                <StyledScorerInput ref={firstTeamScorerRef}  placeholder={`Nome do marcador`} />
                                <StyledAddBtn onClick={() => handleAddGoal(true)}>Adicionar golo</StyledAddBtn>
                            </ScorerContainer>
                            <StyledTeamScoreCell></StyledTeamScoreCell>

                            <ScorerContainer>
                                <StyledScorerInput ref={secondTeamScorerRef}  placeholder={`Nome do marcador`} />
                                <StyledAddBtn onClick={() => handleAddGoal(false)}>Adicionar golo</StyledAddBtn>
                            </ScorerContainer>
                        </StyledScorersRow>
                        <StyledScorersRow>
                            <StyledScorerInput placeholder={`Equipa vencedora`} onChange={(e) => handleWinnerChange(e)} />
                        </StyledScorersRow>
                        <StyledScorersRow>
                            <StyledStartGameBtn onClick={handleEndGame}>Terminar jogo</StyledStartGameBtn>
                        </StyledScorersRow>
                    </>
                }
                {
                    gameEnd && <StyledScorersRow><h1>GAME OVER!</h1></StyledScorersRow>
                }

            </StyledOuterDiv>
        );
    }
    return null;

}

export default GameManagement;