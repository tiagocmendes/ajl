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
`;

export const StyledStartMatchButton = styled.div`
  padding: 2rem 5rem;
  background-color: #2bb572;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  color: white;

  &:hover {
    cursor: pointer;
    opacity: 0.6;
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
`;

export const StyledBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 2rem;
  width: 100%;
  height: 100%;
  margin-top: 2rem;
`;

export const StyledMatchDetailsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  height: 90vh;
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
  width: 25%;
  height: 100%;
  gap: 1.5rem;
`;

export const StyledVerticalDivider = styled.div`
  width: 1px;
  background-color: #ccc;
  height: 50vh;
`;

export const StyledFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50%;
  height: 100%;
`;

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 1rem;
  width: 100%;
  height: 100%;
`;

export const StyledSelect = styled.select`
  padding: 1rem 3rem 1rem 0.2rem;
  background-color: white;
  color: black;
  width: 200px;
  border: 1px solid #e6e6e6;
  border-radius: 0.5rem;
`;

export const StyledAddEventButton = styled.div`
  padding: 1rem 3rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: #22272d;
  color: white;
  width: 200px;
  border: 1px solid #e6e6e6;
  border-radius: 0.5rem;

  &:hover {
    opacity: 0.6;
    cursor: pointer;
  }
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
