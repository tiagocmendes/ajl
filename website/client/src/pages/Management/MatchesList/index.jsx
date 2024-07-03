import { useEffect, useState, useMemo, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  groupMatchesByDay,
  getFormattedDate,
  getFormattedPhaseName,
  getFormattedHour,
} from '../../../utils';

import {
  StyledResultsContainer,
  StyledTournamentPhase,
  StyledHeader,
  StyledDivider,
  StyledPhaseBody,
  StyledDayContainer,
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

import { routes } from '../../../routes';
import AuthContext from '../../../store/AuthContext';
import Timer from '../../LiveScore/Timer';

const MatchList = () => {
  const navigate = useNavigate();
  const [matches, setMatches] = useState([]);
  const { isAuthenticated } = useContext(AuthContext);

  if (!isAuthenticated) {
    navigate('/');
  }

  const tournamentPhases = useMemo(() => {
    if (matches) {
      const groups = matches.filter((match) => match.phase.includes('GROUP'));
      const eights = matches.filter((match) => match.phase === 'EIGHTS');
      const quarters = matches.filter((match) => match.phase === 'QUARTERS');
      const semis = matches.filter((match) => match.phase === 'SEMI');
      const preFinal = matches.filter((match) => match.phase === 'PREFINAL');
      const final = matches.filter((match) => match.phase === 'FINAL');

      return [
        { title: 'Fase de Grupos', matches: groupMatchesByDay(groups) },
        { title: 'Oitavos-de-Final', matches: groupMatchesByDay(eights) },
        { title: 'Quartos-de-Final', matches: groupMatchesByDay(quarters) },
        { title: 'Meia-Final', matches: groupMatchesByDay(semis) },
        { title: '3º e 4º Lugares', matches: groupMatchesByDay(preFinal) },
        { title: 'Final', matches: groupMatchesByDay(final) },
      ];
    }
  }, [matches]);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.get(routes.matches);
        setMatches(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchGames();
  }, []);

  if (matches)
    return (
      <StyledResultsContainer>
        {tournamentPhases.map((phase) => (
          <>
            {!!Object.values(phase.matches).length && (
              <StyledTournamentPhase key={phase.title}>
                <StyledHeader>
                  <h2>{phase.title}</h2>
                </StyledHeader>
                <StyledDivider />
                <StyledPhaseBody>
                  {Object.values(phase.matches).map((day) => (
                    <StyledDayContainer key={day.date}>
                      <h3>{getFormattedDate(day.date)}</h3>
                      <StyledDayMatchesContainer>
                        {day.matches.map((match) => (
                          <StyledMatchCard
                            key={match._id}
                            onClick={() =>
                              navigate('/management/matches/' + match._id)
                            }
                          >
                            <StyledMatchGroupName>
                              {getFormattedPhaseName(match.phase)}
                            </StyledMatchGroupName>
                            <StyledMatchCardBody>
                              <StyledTeamsNamesContainer>
                                <StyledMatchTeamAndScoreNames>
                                  {match.homeTeam.name ?? match.homeTeam}
                                </StyledMatchTeamAndScoreNames>
                                <StyledMatchTeamAndScoreNames>
                                  {match.awayTeam.name ?? match.awayTeam}
                                </StyledMatchTeamAndScoreNames>
                              </StyledTeamsNamesContainer>
                              <StyledMatchScoreContainer
                                hasStarted={match.hasStarted}
                              >
                                <StyledMatchTeamAndScoreNames>
                                  {match.hasStarted ? match.homeScore : '-'}
                                </StyledMatchTeamAndScoreNames>
                                <StyledMatchTeamAndScoreNames>
                                  {match.hasStarted ? match.awayScore : '-'}
                                </StyledMatchTeamAndScoreNames>
                              </StyledMatchScoreContainer>
                              <StyledVerticalDivider />
                              <StyledMatchDetailsContainer>
                                <StyledMatchDetailsContainer>
                                  {match.hasStarted ? (
                                    <>
                                      {!match.winner ? (
                                        <Timer
                                          startTimestamp={match.timestamp}
                                        />
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
                              </StyledMatchDetailsContainer>
                            </StyledMatchCardBody>
                          </StyledMatchCard>
                        ))}
                      </StyledDayMatchesContainer>
                    </StyledDayContainer>
                  ))}
                </StyledPhaseBody>
              </StyledTournamentPhase>
            )}
          </>
        ))}
      </StyledResultsContainer>
    );
  return null;
};

export default MatchList;
