import React from 'react';
import {
  getFormattedDate,
  getFormattedHour,
  getFormattedPhaseName,
  groupMatchesByDay,
} from '../../../utils';

import {
  StyledDayMatchesContainer,
  StyledMatchCard,
  StyledMatchGroupName,
  StyledMatchTeamAndScoreNames,
  StyledMatchCardBody,
  StyledTeamsNamesContainer,
  StyledMatchScoreContainer,
  StyledVerticalDivider,
  StyledMatchDetailsLabel,
  StyledMatchDetailsContainer,
  StyledDayContainer,
} from './style';
import Timer from '../../LiveScore/Timer';
import { useNavigate } from 'react-router-dom';

const TeamMatches = ({ id, matches }) => {
  const navigate = useNavigate();
  return (
    <>
      {Object.values(groupMatchesByDay(matches)).map((day) => (
        <StyledDayContainer>
          <h3>{getFormattedDate(day.date)}</h3>
          <StyledDayMatchesContainer>
            {day.matches.map((match) => (
              <StyledMatchCard
                key={match._id}
                onClick={() => navigate('/live/' + match._id)}
              >
                <StyledMatchGroupName>
                  {getFormattedPhaseName(match.phase)}
                </StyledMatchGroupName>
                <StyledMatchCardBody>
                  <StyledTeamsNamesContainer>
                    <StyledMatchTeamAndScoreNames
                      isSelected={match.homeTeam._id === id}
                    >
                      {match.homeTeam.name}
                    </StyledMatchTeamAndScoreNames>
                    <StyledMatchTeamAndScoreNames
                      isSelected={match.awayTeam._id === id}
                    >
                      {match.awayTeam.name}
                    </StyledMatchTeamAndScoreNames>
                  </StyledTeamsNamesContainer>
                  <StyledMatchScoreContainer hasStarted={match.hasStarted}>
                    <StyledMatchTeamAndScoreNames>
                      {match.hasStarted ? match.homeScore : '-'}
                    </StyledMatchTeamAndScoreNames>
                    <StyledMatchTeamAndScoreNames>
                      {match.hasStarted ? match.awayScore : '-'}
                    </StyledMatchTeamAndScoreNames>
                  </StyledMatchScoreContainer>
                  <StyledVerticalDivider />
                  <StyledMatchDetailsContainer>
                    {match.hasStarted ? (
                      <>
                        {!match.winner ? (
                          <Timer startTimestamp={match.timestamp} />
                        ) : (
                          <StyledMatchDetailsLabel>
                            Terminado
                          </StyledMatchDetailsLabel>
                        )}
                      </>
                    ) : (
                      <StyledMatchDetailsLabel>
                        {getFormattedHour(match.timestamp)}
                      </StyledMatchDetailsLabel>
                    )}
                  </StyledMatchDetailsContainer>
                </StyledMatchCardBody>
              </StyledMatchCard>
            ))}
          </StyledDayMatchesContainer>
        </StyledDayContainer>
      ))}
    </>
  );
};

export default TeamMatches;