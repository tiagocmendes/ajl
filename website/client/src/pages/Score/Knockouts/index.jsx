import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { routes } from '../../../routes';
import {
  StyledKnockoutViewContainer,
  StyledColumn,
  StyledPhaseName,
  StyledPhaseColumn,
  StyledMatchCard,
  StyledMatchDate,
  StyledMatchTeamsContainer,
  StyledMatchTeamNameContainer,
  StyledMatchTeamName,
  StyledMatchTeamScore,
  StyledTrophyIcon,
  StyledHorizontalLine,
  StyledVerticalLine,
  StyledMatchGameNumber,
} from './style';
import { getFormattedPhaseName, getFullFormattedDate } from '../../../utils';
import { useNavigate } from 'react-router-dom';

const Knockouts = () => {
  const [knockouts, setKnockouts] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchKnockoutsScoreboard = async () => {
      try {
        const response = await axios.get(routes.knockoutsScoreboard);
        const quarters = response.data.quarters;
        delete response.data.preFinal;
        setKnockouts({
          ...response.data,
          quarters: [quarters[0], quarters[3], quarters[1], quarters[2]],
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchKnockoutsScoreboard();
  }, []);

  return (
    <StyledKnockoutViewContainer>
      {Object.entries(knockouts).map(([phase, matches]) => (
        <StyledColumn>
          <StyledPhaseName>{getFormattedPhaseName(phase)}</StyledPhaseName>
          <StyledPhaseColumn>
            {matches.map((match) => (
              <StyledMatchCard onClick={() => navigate('/live/' + match._id)}>
                {phase === 'final' && <StyledTrophyIcon />}
                {phase !== 'quarters' && (
                  <>
                    <StyledHorizontalLine />
                    <StyledVerticalLine />
                  </>
                )}
                <StyledMatchDate>
                  <StyledMatchGameNumber>
                    {' '}
                    {`Jogo ${match?.matchNumber}`} -{' '}
                  </StyledMatchGameNumber>
                  {getFullFormattedDate(match?.timestamp)}
                </StyledMatchDate>
                <StyledMatchTeamsContainer>
                  <StyledMatchTeamNameContainer>
                    <StyledMatchTeamName>
                      {match?.homeTeam?.name ?? match?.homeTeam}
                    </StyledMatchTeamName>
                    <StyledMatchTeamScore>
                      {match?.hasStarted ? match?.homeScore : '-'}
                    </StyledMatchTeamScore>
                  </StyledMatchTeamNameContainer>
                  <StyledMatchTeamNameContainer>
                    <StyledMatchTeamName>
                      {match?.awayTeam?.name ?? match?.awayTeam}
                    </StyledMatchTeamName>
                    <StyledMatchTeamScore>
                      {match?.hasStarted ? match?.awayScore : '-'}
                    </StyledMatchTeamScore>
                  </StyledMatchTeamNameContainer>
                </StyledMatchTeamsContainer>
              </StyledMatchCard>
            ))}
          </StyledPhaseColumn>
        </StyledColumn>
      ))}
    </StyledKnockoutViewContainer>
  );
};

export default Knockouts;
