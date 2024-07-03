import styled from 'styled-components';
import { PiSoccerBall } from 'react-icons/pi';
import { GiWhistle } from 'react-icons/gi';

export const StyledOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9999;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const StyledEventContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 80%;
  padding: 3rem;
  background-color: #22272d;
  color: white;
  font-size: 1.5rem;
  gap: 1rem;

  @media (max-width: 500px) {
    font-size: 0.75rem;
    gap: 0.5rem;
    padding: 1rem;
  }
`;

export const StyledSoccerIcon = styled(PiSoccerBall)`
  color: #75faba !important;
  font-size: 2rem;

  @media (max-width: 500px) {
    font-size: 1rem;
  }
`;

export const StyledGiWhistle = styled(GiWhistle)`
  color: #75faba !important;
  font-size: 2rem;
`;

interface StyledCardProps {
  isYellow?: boolean;
}

export const StyledCard = styled.div<StyledCardProps>`
  width: 12px;
  height: 20px;
  background-color: ${(props) => (props.isYellow ? '#f5dd05' : 'red')};
`;
