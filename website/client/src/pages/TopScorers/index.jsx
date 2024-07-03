import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { routes } from '../../routes';
import avatarPlaceholder from '../../assets/images/avatar.jpg';
import {
  StyledTopScorersContainer,
  StyledSubheader,
  StyledTitle,
  StyledTeamPlayersTable,
  StyledTeamPlayersTableHeader,
  StyledPlayerStatCell,
  StyledSoccerIcon,
  StyledPlayerCard,
  StyledPlayerNameContainer,
  StyledPlayerAvatar,
  StyledBody,
} from './style';

const TopScorers = () => {
  const [scorers, setScorers] = useState([]);

  useEffect(() => {
    const fetchTopScorers = async () => {
      try {
        const response = await axios.get(routes.scorers);
        setScorers(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTopScorers();
  }, []);

  const filteredScorers = scorers.filter(
    (p) => !['Autogolo', 'Falta de Comparência'].includes(p.name)
  );

  return (
    <StyledTopScorersContainer>
      <StyledSubheader>
        <StyledTitle>Marcadores</StyledTitle>
      </StyledSubheader>
      <StyledBody>
        {!!filteredScorers.length ? (
          <StyledTeamPlayersTable>
            <StyledTeamPlayersTableHeader>
              <StyledPlayerStatCell></StyledPlayerStatCell>
              <StyledPlayerStatCell>
                <StyledSoccerIcon />
                Golos
              </StyledPlayerStatCell>
            </StyledTeamPlayersTableHeader>
            {filteredScorers.map((player, index) => (
              <StyledPlayerCard>
                <StyledPlayerNameContainer>
                  <span style={{ color: '#2BB572' }}>{index + 1}º</span>
                  <StyledPlayerAvatar src={avatarPlaceholder} />
                  {player.name}
                </StyledPlayerNameContainer>
                <StyledPlayerStatCell>{player.goals}</StyledPlayerStatCell>
              </StyledPlayerCard>
            ))}
          </StyledTeamPlayersTable>
        ) : (
          <h1>Ainda sem marcadores!</h1>
        )}
      </StyledBody>
    </StyledTopScorersContainer>
  );
};

export default TopScorers;
