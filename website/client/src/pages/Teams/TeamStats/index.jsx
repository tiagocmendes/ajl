import React, { useEffect, useState } from 'react';
import axios from 'axios';

import {
  StyledStatsContainer,
  StyledStatsCard,
  StyledStatValue,
  StyledStatName,
} from './style';
import { routes } from '../../../routes';

const TeamStats = ({ teamId }) => {
  const [teamStats, setTeamStats] = useState(null);

  useEffect(() => {
    const fetchTeamStats = async () => {
      try {
        const response = await axios.get(routes.teamStats + '/' + teamId);
        setTeamStats(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTeamStats();
  }, [teamId]);

  const stats = {
    matches: 'Jogos',
    wins: 'Vitórias',
    draws: 'Empates',
    losses: 'Derrotas',
    scored: 'Golos Marcados',
    conceded: 'Golos Sofridos',
    yellowCards: 'Cartões Amarelos',
    redCards: 'Cartões Vermelhos',
  };

  if (!teamStats) return null;

  return (
    <StyledStatsContainer>
      {Object.keys(stats).map((stat) => (
        <StyledStatsCard>
          <StyledStatValue>{teamStats[stat]}</StyledStatValue>
          <StyledStatName>{stats[stat]}</StyledStatName>
        </StyledStatsCard>
      ))}
    </StyledStatsContainer>
  );
};

export default TeamStats;
