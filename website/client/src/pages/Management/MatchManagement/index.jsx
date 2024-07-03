import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import {
  StyledLiveScoreContainer,
  StyledSubheader,
  StyledTeamName,
  StyledMiddleContainer,
  StyledResultContainer,
  StyledDateContainer,
  StyledMiddleRow,
  StyledTimerContainer,
  StyledMatchDetailsContainer,
  StyledVerticalDivider,
  StyledTeamDetails,
  StyledEventContainer,
  StyledEventName,
  StyledSoccerIcon,
  StyledCard,
  StyledStartMatchButton,
  StyledFormContainer,
  StyledForm,
  StyledSelect,
  StyledAddEventButton,
  StyledBody,
} from './style';

import { routes } from '../../../routes';

import Timer from '../../LiveScore/Timer';
import { getFullFormattedDate } from '../../../utils';
import AuthContext from '../../../store/AuthContext';

const MatchManagement = () => {
  const { matchId } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, token } = useContext(AuthContext);
  const [match, setMatch] = useState(null);
  const [homeTeamEventType, setHomeTeamEventType] = useState('goals');
  const [homeTeamEventPlayer, setHomeTeamEventPlayer] = useState(null);
  const [awayTeamEventType, setAwayTeamEventType] = useState('goals');
  const [awayTeamEventPlayer, setAwayTeamEventPlayer] = useState(null);
  const [currentMinute, setCurrentMinute] = useState(0);
  const [winner, setWinner] = useState(null);
  const [playersById, setPlayersById] = useState({});

  if (!isAuthenticated) {
    navigate('/');
  }

  useEffect(() => {
    const fetchMatchById = async () => {
      try {
        const response = await axios.get(`${routes.matches}/${matchId}`);
        const { homeTeam, awayTeam } = response.data;
        setMatch(response.data);
        setHomeTeamEventPlayer(homeTeam.players[0]._id);
        setAwayTeamEventPlayer(awayTeam.players[0]._id);
        setWinner(homeTeam._id);
        setPlayersById({
          ...(homeTeam?.players ?? []).reduce(
            (acc, player) => ({ ...acc, [player._id]: player }),
            {}
          ),
          ...(awayTeam?.players ?? []).reduce(
            (acc, player) => ({ ...acc, [player._id]: player }),
            {}
          ),
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchMatchById();
  }, [matchId]);

  const startMatch = async () => {
    try {
      const config = {
        headers: {
          Authorization: token,
        },
      };

      const body = { hasStarted: true, timestamp: new Date().getTime() };

      const response = await axios.patch(
        `${routes.matches}/${matchId}`,
        body,
        config
      );

      setMatch(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const renderEventType = (type) => {
    if (type === 'goals') return <StyledSoccerIcon />;
    else if (type === 'yellowCards') return <StyledCard isYellow />;
    else return <StyledCard />;
  };

  const onAddHomeTeamEvent = async () => {
    try {
      const config = {
        headers: {
          Authorization: token,
        },
      };

      const body = {
        ...(homeTeamEventType === 'goals'
          ? { homeScore: match.homeScore + 1 }
          : {}),
        homeTeamEvents: [
          ...match.homeTeamEvents,
          {
            type: homeTeamEventType,
            player: playersById[homeTeamEventPlayer].name,
            minute: currentMinute,
          },
        ],
      };

      const response = await axios.patch(
        `${routes.matches}/${matchId}`,
        body,
        config
      );
      setMatch(response.data);

      const playerResponse = await axios.patch(
        `${routes.players}/${homeTeamEventPlayer}`,
        {
          [homeTeamEventType]:
            playersById[homeTeamEventPlayer][homeTeamEventType] + 1,
        },
        config
      );

      setPlayersById((prevState) => ({
        ...prevState,
        [homeTeamEventPlayer]: playerResponse.data,
      }));
    } catch (error) {
      console.error(error);
    }
  };

  const onAddAwayTeamEvent = async () => {
    try {
      const config = {
        headers: {
          Authorization: token,
        },
      };

      const body = {
        ...(awayTeamEventType === 'goals'
          ? { awayScore: match.awayScore + 1 }
          : {}),
        awayTeamEvents: [
          ...match.awayTeamEvents,
          {
            type: awayTeamEventType,
            player: playersById[awayTeamEventPlayer].name,
            minute: currentMinute,
          },
        ],
      };

      const response = await axios.patch(
        `${routes.matches}/${matchId}`,
        body,
        config
      );
      setMatch(response.data);

      const playerResponse = await axios.patch(
        `${routes.players}/${awayTeamEventPlayer}`,
        {
          [awayTeamEventType]:
            playersById[awayTeamEventPlayer][awayTeamEventType] + 1,
        },
        config
      );

      setPlayersById((prevState) => ({
        ...prevState,
        [awayTeamEventPlayer]: playerResponse.data,
      }));
    } catch (error) {
      console.error(error);
    }
  };

  const onEndMatch = async () => {
    try {
      const config = {
        headers: {
          Authorization: token,
        },
      };

      const body = {
        winner,
      };

      const response = await axios.patch(
        `${routes.matches}/${matchId}`,
        body,
        config
      );
      setMatch(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  if (match)
    return (
      <StyledLiveScoreContainer>
        <StyledSubheader>
          <StyledDateContainer>
            {getFullFormattedDate(match?.timestamp)}
          </StyledDateContainer>
          {match?.hasStarted && !match?.winner && (
            <StyledTimerContainer>
              <Timer
                startTimestamp={match?.timestamp}
                setCurrentMinute={setCurrentMinute}
              />
            </StyledTimerContainer>
          )}
          <StyledMiddleRow>
            <StyledTeamName>
              {match?.homeTeam?.name ?? match?.homeTeam}
            </StyledTeamName>
            <StyledMiddleContainer>
              <StyledResultContainer>
                {match?.hasStarted ? (
                  <>
                    <span>{match?.homeScore}</span>
                    <span>-</span>
                    <span>{match?.awayScore}</span>
                  </>
                ) : (
                  <span>-</span>
                )}
              </StyledResultContainer>
            </StyledMiddleContainer>
            <StyledTeamName justifyStart>
              {match?.awayTeam?.name ?? match?.awayTeam}
            </StyledTeamName>
          </StyledMiddleRow>
        </StyledSubheader>
        <StyledBody>
          {match?.hasStarted && !match?.winner && (
            <StyledForm>
              <label for="winner">Escolher vencedor:</label>
              <StyledSelect
                id="winner"
                name="winner"
                onChange={(e) => setWinner(e.target.value)}
              >
                <option value={match.homeTeam._id}>
                  {match.homeTeam.name}
                </option>
                <option value={match.awayTeam._id}>
                  {match.awayTeam.name}
                </option>
              </StyledSelect>

              <StyledAddEventButton onClick={onEndMatch}>
                Terminar jogo
              </StyledAddEventButton>
            </StyledForm>
          )}
          {match?.winner && (
            <StyledStartMatchButton onClick={startMatch}>
              Jogo terminado
            </StyledStartMatchButton>
          )}
          <StyledMatchDetailsContainer>
            {!match?.hasStarted && !match?.winner ? (
              <StyledStartMatchButton onClick={startMatch}>
                Iniciar jogo
              </StyledStartMatchButton>
            ) : (
              <>
                {!match?.winner && (
                  <StyledFormContainer>
                    <StyledForm>
                      <label for="eventType">Selecionar evento:</label>
                      <StyledSelect
                        id="eventType"
                        name="eventType"
                        onChange={(e) => setHomeTeamEventType(e.target.value)}
                      >
                        <option value="goals">Golo</option>
                        <option value="yellowCards">Cartão Amarelo</option>
                        <option value="redCards">Cartão Vermelho</option>
                      </StyledSelect>

                      <label for="playerSelect">Selecionar jogador:</label>
                      <StyledSelect
                        id="playerSelect"
                        name="playerSelect"
                        onChange={(e) => setHomeTeamEventPlayer(e.target.value)}
                      >
                        {match?.homeTeam?.players.map((player) => (
                          <option value={player._id}>{player.name}</option>
                        ))}
                      </StyledSelect>
                      <StyledAddEventButton onClick={onAddHomeTeamEvent}>
                        Adicionar evento
                      </StyledAddEventButton>
                    </StyledForm>
                  </StyledFormContainer>
                )}
                <StyledTeamDetails>
                  {match?.homeTeamEvents.map((event) => (
                    <StyledEventContainer>
                      <span style={{ color: '#2BB572' }}>{event.minute}'</span>
                      <StyledEventName>
                        {event.player} {renderEventType(event.type)}
                      </StyledEventName>
                    </StyledEventContainer>
                  ))}
                </StyledTeamDetails>
                <StyledVerticalDivider />
                <StyledTeamDetails justifyStart>
                  {match?.awayTeamEvents.map((event) => (
                    <StyledEventContainer justifyStart>
                      <span style={{ color: '#2BB572' }}>{event.minute}'</span>
                      <StyledEventName justifyStart>
                        {renderEventType(event.type)} {event.player}
                      </StyledEventName>
                    </StyledEventContainer>
                  ))}
                </StyledTeamDetails>
                {!match?.winner && (
                  <StyledFormContainer>
                    <StyledForm>
                      <label for="eventType">Selecionar evento:</label>
                      <StyledSelect
                        id="eventType"
                        name="eventType"
                        onChange={(e) => setAwayTeamEventType(e.target.value)}
                      >
                        <option value="goals">Golo</option>
                        <option value="yellowCards">Cartão Amarelo</option>
                        <option value="redCards">Cartão Vermelho</option>
                      </StyledSelect>

                      <label for="playerSelect">Selecionar jogador:</label>
                      <StyledSelect
                        id="playerSelect"
                        name="playerSelect"
                        onChange={(e) => setAwayTeamEventPlayer(e.target.value)}
                      >
                        {match?.awayTeam?.players.map((player) => (
                          <option value={player._id}>{player.name}</option>
                        ))}
                      </StyledSelect>
                      <StyledAddEventButton onClick={onAddAwayTeamEvent}>
                        Adicionar evento
                      </StyledAddEventButton>
                    </StyledForm>
                  </StyledFormContainer>
                )}
              </>
            )}
          </StyledMatchDetailsContainer>
        </StyledBody>
      </StyledLiveScoreContainer>
    );

  return null;
};

export default MatchManagement;
