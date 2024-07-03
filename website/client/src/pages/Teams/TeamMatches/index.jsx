import React from 'react';
import { getFormattedHour, getFormattedPhaseName } from '../../../utils';

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
} from './style';
import Timer from '../../LiveScore/Timer';

const TeamMatches = ({ id, matches }) => {
  return (
    <StyledDayMatchesContainer>
      {matches.map((match) => (
        <StyledMatchCard key={match._id}>
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
                    <StyledMatchDetailsLabel>Terminado</StyledMatchDetailsLabel>
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
  );
};

export default TeamMatches;
