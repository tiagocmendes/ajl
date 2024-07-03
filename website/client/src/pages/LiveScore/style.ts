import styled from 'styled-components';
import { PiSoccerBall } from 'react-icons/pi';
import { GiSoccerKick } from 'react-icons/gi';

export const StyledLiveScoreContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  box-sizing: border-box;
  min-height: 90vh;
`;

export const StyledSubheader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  background-color: #22272d;
  width: 100%;
  box-sizing: border-box;
  padding: 2rem 5rem;

  @media (max-width: 500px) {
    padding: 2rem;
  }
`;

export const StyledTimerContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  font-size: 1.5rem;
  color: #ff5447;
`;

export const StyledDateContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  font-size: 0.75rem;
  color: white;
`;

export const StyledMiddleRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 5rem;

  @media (max-width: 500px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

interface TeamNameOptions {
  justifyStart?: boolean;
}

export const StyledTeamName = styled.div<TeamNameOptions>`
  display: flex;
  flex-direction: row;
  justify-content: ${(props) =>
    props.justifyStart ? 'flex-start' : 'flex-end'};
  align-items: center;
  font-size: 2rem;
  font-weight: 600;
  color: white;
  width: 100%;

  @media (max-width: 500px) {
    justify-content: center;
    font-size: 1rem;
  }
`;

export const StyledMiddleContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 2rem;
`;

export const StyledResultContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 2rem;
  gap: 1.5rem;
  color: #75faba;

  @media (max-width: 500px) {
    font-size: 1rem;
    gap: 0.5rem;
  }
`;

export const StyledMatchDetailsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  margin-top: 3rem;
  gap: 1rem;
`;

interface TeamDetailsOption {
  justifyStart?: boolean;
}

export const StyledTeamDetails = styled.div<TeamDetailsOption>`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: ${(props) => (props.justifyStart ? 'flex-start' : 'flex-end')};
  width: 100%;
  height: 100%;
  gap: 1.5rem;
`;

export const StyledVerticalDivider = styled.div`
  width: 1px;
  background-color: #ccc;
  height: 50vh;
`;

export const StyledEventContainer = styled.div<TeamDetailsOption>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: ${(props) => (props.justifyStart ? 'flex-start' : 'flex-end')};
  width: 100%;
  gap: 0.5rem;
`;

export const StyledEventName = styled.div<TeamDetailsOption>`
  display: flex;
  flex-direction: row;
  justify-content: ${(props) =>
    props.justifyStart ? 'flex-start' : 'flex-end'};
  align-items: center;
  width: 100%;
  gap: 0.5rem;
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
