import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { routes } from '../../../routes';
import { useNavigate } from 'react-router-dom';
import {
  StyledTeamsContainer,
  StyledHeader,
  StyledDivider,
  StyledTeamsRowContainer,
  StyledTeamCard,
} from './style';
import AuthContext from '../../../store/AuthContext';

const TeamManagement = () => {
  const [teams, setTeams] = useState([]);
  const navigate = useNavigate();

  const { isAuthenticated } = useContext(AuthContext);

  if (!isAuthenticated) {
    navigate('/');
  }

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
          <StyledTeamCard
            onClick={() => navigate('/management/teams/' + team._id)}
          >
            {team.name}
          </StyledTeamCard>
        ))}
      </StyledTeamsRowContainer>
    </StyledTeamsContainer>
  );
};

export default TeamManagement;
