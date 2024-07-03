import React, { useState, useEffect } from 'react';
import {
  StyledGroupCard,
  StyledGroupName,
  StyledScoreboardTable,
  StyledTableHeader,
  StyledTeamNameCell,
  StyledTableRow,
  StyledTeamStatCell,
  StyledTeamPlacement,
} from './style';

import { getFormattedPhaseName } from '../../../utils';
import { useNavigate } from 'react-router-dom';

const Groups = ({ groups }) => {
  const navigate = useNavigate();
  const [boardCells, setBoardCells] = useState([
    { label: 'Jogos', value: 'matches' },
    { label: 'Vitórias', value: 'victories' },
    { label: 'Empates', value: 'draws' },
    { label: 'Derrotas', value: 'losses' },
    { label: 'Marcados', value: 'scored' },
    { label: 'Sofridos', value: 'conceded' },
    { label: '+/-', value: '+/-' },
    { label: 'Pontos', value: 'points' },
  ]);

  useEffect(() => {
    // Handler to call on window resize
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      if (windowWidth > 1120) {
        setBoardCells([
          { label: 'Jogos', value: 'matches' },
          { label: 'Vitórias', value: 'victories' },
          { label: 'Empates', value: 'draws' },
          { label: 'Derrotas', value: 'losses' },
          { label: 'Marcados', value: 'scored' },
          { label: 'Sofridos', value: 'conceded' },
          { label: '+/-', value: '+/-' },
          { label: 'Pontos', value: 'points' },
        ]);
      } else if (windowWidth <= 1120 && windowWidth > 720) {
        setBoardCells([
          { label: 'J', value: 'matches' },
          { label: 'V', value: 'victories' },
          { label: 'E', value: 'draws' },
          { label: 'D', value: 'losses' },
          { label: 'M', value: 'scored' },
          { label: 'S', value: 'conceded' },
          { label: '+/-', value: '+/-' },
          { label: 'P', value: 'points' },
        ]);
      } else {
        setBoardCells([
          { label: 'J', value: 'matches' },
          { label: '+/-', value: '+/-' },
          { label: 'P', value: 'points' },
        ]);
      }
    };

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      {groups.map((group) => (
        <StyledGroupCard>
          <StyledGroupName>{getFormattedPhaseName(group.name)}</StyledGroupName>
          <StyledScoreboardTable>
            <StyledTableHeader>
              <StyledTeamNameCell></StyledTeamNameCell>
              {boardCells.map((cell) => (
                <StyledTeamStatCell>{cell.label}</StyledTeamStatCell>
              ))}
            </StyledTableHeader>
            {group.teams.map((team, index) => (
              <StyledTableRow onClick={() => navigate('/teams/' + team.id)}>
                <StyledTeamNameCell>
                  <StyledTeamPlacement>{index + 1}</StyledTeamPlacement>
                  <span>{team.name}</span>
                </StyledTeamNameCell>
                {boardCells.map((cell) => (
                  <StyledTeamStatCell isLast={cell.value === 'points'}>
                    {cell.value !== '+/-'
                      ? team[cell.value]
                      : team.scored - team.conceded}
                  </StyledTeamStatCell>
                ))}
              </StyledTableRow>
            ))}
          </StyledScoreboardTable>
        </StyledGroupCard>
      ))}
    </>
  );
};

export default Groups;
