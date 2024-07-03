import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { routes } from '../../../../routes';
import {
  StyledTeamDetailsContainer,
  StyledHeader,
  StyledBody,
  StyledInput,
  StyledButton,
} from './style';
import AuthContext from '../../../../store/AuthContext';

const TeamManagementDetails = () => {
  const navigate = useNavigate();
  const [team, setTeam] = useState();
  const [playerName, setPlayerName] = useState('');
  const { isAuthenticated, token } = useContext(AuthContext);

  const params = useParams();

  if (!isAuthenticated) {
    navigate('/');
  }

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

  const addPlayerToTeam = async () => {
    try {
      const config = {
        headers: {
          Authorization: token,
        },
      };

      const body = [{ name: playerName, teamId: params.teamId }];

      const playerResponse = await axios.post(routes.players, body, config);
      await axios.patch(
        `${routes.teams}/${params.teamId}`,
        {
          players: [...team.players, playerResponse.data.pop()],
        },
        config
      );

      setPlayerName('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <StyledTeamDetailsContainer>
      <StyledHeader>
        <h1>{team?.name}</h1>
      </StyledHeader>
      <StyledBody>
        <StyledInput
          type="text"
          value={playerName}
          placeholder={'Nome jogador'}
          onChange={(e) => setPlayerName(e.target.value)}
        />
        <StyledButton onClick={addPlayerToTeam}>Adicionar jogador</StyledButton>
      </StyledBody>
    </StyledTeamDetailsContainer>
  );
};

export default TeamManagementDetails;
