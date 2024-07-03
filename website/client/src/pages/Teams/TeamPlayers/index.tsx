import React from 'react';
import {
  StyledTeamPlayersTable,
  StyledPlayerCard,
  StyledPlayerNameContainer,
  StyledPlayerAvatar,
  StyledPlayerStatCell,
  StyledTeamPlayersTableHeader,
  StyledCard,
  StyledSoccerIcon,
} from './style';
import avatarPlaceholder from '../../../assets/images/avatar.jpg';

const TeamPlayers: React.FC<{ players: any[] }> = ({ players }) => {
  const filteredPlayers = players.filter(
    (p) => !['Autogolo', 'Falta de Comparência'].includes(p.name)
  );
  return (
    <StyledTeamPlayersTable>
      <StyledTeamPlayersTableHeader>
        <StyledPlayerStatCell></StyledPlayerStatCell>
        <StyledPlayerStatCell>
          <StyledSoccerIcon />
          Golos
        </StyledPlayerStatCell>
        <StyledPlayerStatCell>
          <StyledCard isYellow></StyledCard>
          Amarelos
        </StyledPlayerStatCell>
        <StyledPlayerStatCell>
          <StyledCard></StyledCard>
          Vermelhos
        </StyledPlayerStatCell>
      </StyledTeamPlayersTableHeader>
      {filteredPlayers.map((player) => (
        <StyledPlayerCard>
          <StyledPlayerNameContainer>
            <StyledPlayerAvatar src={avatarPlaceholder} />
            {player.name}
          </StyledPlayerNameContainer>
          <StyledPlayerStatCell>{player.goals}</StyledPlayerStatCell>
          <StyledPlayerStatCell>{player.yellowCards}</StyledPlayerStatCell>
          <StyledPlayerStatCell>{player.redCards}</StyledPlayerStatCell>
        </StyledPlayerCard>
      ))}
    </StyledTeamPlayersTable>
  );
};

export default TeamPlayers;
