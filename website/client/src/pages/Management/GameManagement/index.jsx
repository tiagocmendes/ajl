import React, { useEffect, useState, useRef, useContext } from "react";
import axios from "axios";
import { useParams, useNavigate } from 'react-router-dom';
import AuthContext from "../../../store/AuthContext";
import { StyledOuterDiv, StyledTeamNamesRow, StyledTeamNameCell, StyledTeamScoreCell, StyledStartGameBtn, StyledScorerInput, StyledScorersRow, ScorerContainer, StyledAddBtn, StyledRemoveBtn } from './style';

import { routes } from "../../../routes";

import Timer from "../../LiveScore/Timer";

const GameManagement = () => {
    const { gameId } = useParams();
    const [ game, setGame ] = useState();
    const [ gameStarted, setGameStarted ] = useState(game?.hasStarted || false)
    const [ winner, setWinner ] = useState('');
    const [ gameEnd, setGameEnd ] = useState((game?.hasStarted && game?.winner !== '') || false)
    const firstTeamScorerRef = useRef();
    const secondTeamScorerRef = useRef();
    const { isAuthenticated, token } = useContext(AuthContext);
    const navigate = useNavigate();
    const [currentMinute, setCurrentMinute] = useState(0);

    if (!isAuthenticated) {
        navigate('/');
    }

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
            const config = {
                headers: {
                  Authorization: token,
                },
              };
              
            const jsonBody = { hasStarted: true, timestamp: (new Date()).getTime() }
            const response = await axios.patch(`${routes.games}/${gameId}`, jsonBody, config);
            setGameStarted(true);
            console.log('Game updated successfully:', response.data);
          } catch (error) {
            console.error('Error updating game:', error.message);
          }
    }

    const handleEndGame = async () => {
        if(winner === game.firstTeam.name || winner === game.secondTeam.name) {
            try {
                const config = {
                    headers: {
                      Authorization: token,
                    },
                  };
                const jsonBody = { winner }
                const response = await axios.patch(`${routes.games}/${gameId}`, jsonBody, config);
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
                            minute: Number(currentMinute) + 1
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
                            minute: Number(currentMinute) + 1
                        }
                    } 
                }
            }
            const config = {
                headers: {
                  Authorization: token,
                },
              };
            const response = await axios.patch(`${routes.games}/${gameId}`, jsonBody, config);
            setGame(response.data.updatedGame);
            console.log('Game updated successfully:', response.data);
        } catch (error) {
            console.error('Error updating game:', error.message);
        }
    }

    useEffect(() => {
        const fetchGameById = async () => {
            try {
                const response = await axios.get(`${routes.games}/${gameId}`);
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
                <StyledTeamNamesRow>
                    { game.hasStarted && game.winner !== '' ? 
                        <h1>Jogo terminado</h1> : 
                        game.hasStarted ? <Timer startTimestamp={game.timestamp} setCurrentMinute={(minutes) => setCurrentMinute(minutes)}/> 
                        : <h1>{`Hora de início: ${getDateAndTime(game.timestamp)}`}</h1>
                        }
                </StyledTeamNamesRow> 
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