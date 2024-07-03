import styled from 'styled-components';
import { PiSoccerBall } from 'react-icons/pi';
import { GiSoccerKick } from 'react-icons/gi';

export const StyledTeamPlayersTable = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  margin-bottom: 5rem;
`;

export const StyledTeamPlayersTableHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 1.5rem 1.5rem 0;
  box-sizing: border-box;
  color: black;

  & div {
    font-size: 0.75rem;
  }
`;

export const StyledSoccerIcon = styled(PiSoccerBall)``;
export const StyledAssistsIcon = styled(GiSoccerKick)``;

interface StyledCardProps {
  isYellow?: boolean;
}

export const StyledCard = styled.div<StyledCardProps>`
  width: 10px;
  height: 17px;
  background-color: ${(props) => (props.isYellow ? '#f5dd05' : 'red')};
`;

export const StyledPlayerCard = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 1.5rem;
  background-color: white;
  border-radius: 0.5rem;
  box-sizing: border-box;
  border: 1px solid #e6e6e6;

  &:hover {
    cursor: pointer;
    background-color: #e6e6e6;
  }
`;

export const StyledPlayerNameContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 0.75rem;
  width: 20%;

  @media (max-width: 720px) {
    font-size: 0.75rem;
  }
`;

export const StyledPlayerAvatar = styled.img`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;

  @media (max-width: 720px) {
    width: 1.5rem;
    height: 1.5rem;
  }
`;

export const StyledPlayerStatCell = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 20%;
  gap: 0.25rem;

  svg {
    font-size: 1.25rem;
  }

  @media (max-width: 720px) {
    font-size: 0.75rem;
  }
`;
