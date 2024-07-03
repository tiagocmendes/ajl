import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
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
} from './style';

import { routes } from '../../routes';

import Timer from './Timer';
import { getFullFormattedDate } from '../../utils';
import EventOverlay from './EventOverlay';

const LiveScore = () => {
  const { matchId } = useParams();
  const [showOverlay, setShowOverlay] = useState(false);

  const [match, setMatch] = useState(null);

  useEffect(() => {
    const fetchMatchById = async () => {
      try {
        const response = await axios.get(`${routes.matches}/${matchId}`);
        setMatch(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMatchById();
  }, [matchId, showOverlay]);

  useEffect(() => {
    // Change the URL if your server is hosted elsewhere
    const ws = new WebSocket(routes.ws);

    ws.onopen = () => {
      console.log('Connected to live match');
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setShowOverlay(data);
    };

    ws.onclose = () => {
      console.log('Disconnected from  live match');
    };
  }, []);

  const renderEventType = (type) => {
    if (type === 'goals') return <StyledSoccerIcon />;
    else if (type === 'yellowCards') return <StyledCard isYellow />;
    else return <StyledCard />;
  };

  if (match)
    return (
      <StyledLiveScoreContainer>
        {!!showOverlay && (
          <EventOverlay overlayControls={{ showOverlay, setShowOverlay }} />
        )}
        <StyledSubheader>
          <StyledDateContainer>
            {getFullFormattedDate(match?.timestamp)}
          </StyledDateContainer>
          {match?.hasStarted && !match?.winner && (
            <StyledTimerContainer>
              <Timer startTimestamp={match?.timestamp} />
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
        <StyledMatchDetailsContainer>
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
        </StyledMatchDetailsContainer>
      </StyledLiveScoreContainer>
    );

  return null;
};

export default LiveScore;
