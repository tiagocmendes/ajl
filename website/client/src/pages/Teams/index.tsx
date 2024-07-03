import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { routes } from '../../routes';

import {
  StyledTeamsContainer,
  StyledHeader,
  StyledDivider,
  StyledTeamsRowContainer,
  StyledTeamCard,
} from './style';
import { useNavigate } from 'react-router-dom';

interface Team {
  _id: string;
  name: string;
  players: string[];
  __v: number;
}

const Teams = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await axios.get(routes.teams);
        setTeams(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTeams();
  }, []);

  return (
    <StyledTeamsContainer>
      <StyledHeader>
        <h2>Equipas</h2>
      </StyledHeader>
      <StyledDivider />
      <StyledTeamsRowContainer>
        {teams.map((team) => (
          <StyledTeamCard onClick={() => navigate('/teams/' + team._id)}>
            {team.name}
          </StyledTeamCard>
        ))}
      </StyledTeamsRowContainer>
    </StyledTeamsContainer>
  );
};

export default Teams;
