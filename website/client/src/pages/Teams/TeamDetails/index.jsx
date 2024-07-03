import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { routes } from '../../../routes';
import {
  StyledTeamDetailsContainer,
  StyledHeader,
  StyledBody,
  StyledSubheaderContainer,
  StyledSubHeaderOption,
  StyledViewName,
} from './style';
import TeamPlayers from '../TeamPlayers';
import TeamGroup from '../TeamGroup';
import TeamMatches from '../TeamMatches';
import TeamStats from '../TeamStats';

const VIEWS = {
  MATCHES: 'Jogos',
  GROUP: 'Grupo',
  PLAYERS: 'Jogadores',
  STATS: 'Estatísticas',
};

const TeamDetails = () => {
  const [team, setTeam] = useState();
  const [selectedView, setSelectedView] = useState(VIEWS.MATCHES);

  const params = useParams();

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const response = await axios.get(routes.teams + '/' + params.teamId);
        setTeam(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTeam();
  }, [params.teamId]);

  return (
    <StyledTeamDetailsContainer>
      <StyledHeader>
        <h1>{team?.name}</h1>
      </StyledHeader>
      <StyledBody>
        <StyledSubheaderContainer>
          {Object.values(VIEWS).map((view) => (
            <StyledSubHeaderOption
              isSelected={selectedView === view}
              onClick={() => setSelectedView(view)}
            >
              {view}
            </StyledSubHeaderOption>
          ))}
        </StyledSubheaderContainer>
        <StyledViewName>{selectedView}</StyledViewName>
        {selectedView === VIEWS.PLAYERS && (
          <TeamPlayers players={team?.players || []} />
        )}
        {selectedView === VIEWS.GROUP && (
          <TeamGroup id={team?._id} group={team?.group || []} />
        )}
        {selectedView === VIEWS.MATCHES && (
          <TeamMatches id={team?._id} matches={team?.matches || []} />
        )}
        {selectedView === VIEWS.STATS && <TeamStats teamId={team?._id} />}
      </StyledBody>
    </StyledTeamDetailsContainer>
  );
};

export default TeamDetails;
