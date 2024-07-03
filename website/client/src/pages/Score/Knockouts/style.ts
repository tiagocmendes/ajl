import styled from 'styled-components';
import { HiTrophy } from 'react-icons/hi2';

export const StyledKnockoutViewContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  gap: 5rem;
  height: 90vh;

  @media (max-width: 800px) {
    flex-direction: column;
    gap: 3rem;
  }
`;

export const StyledColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 1rem;
  box-sizing: border-box;
  width: calc(100% / 3);
  height: 100%;

  @media (max-width: 800px) {
    width: 100%;
  }
`;

export const StyledPhaseColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 100%;

  @media (max-width: 800px) {
    gap: 1rem;
  }
`;

export const StyledPhaseName = styled.div`
  padding: 1rem;
  border-bottom: 1px solid #ccc;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const StyledMatchCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  padding: 1rem;
  box-sizing: border-box;
  gap: 1rem;
  position: relative;
  transition: border-color 0.5s, color 0.5s, background-color 0.5s;

  &:hover {
    cursor: pointer;
    background-color: #1a6b44;
    border-color: #75faba;

    & span {
      color: #75faba;
    }

    div {
      color: white;
    }
  }
`;

export const StyledMatchDate = styled.span`
  font-size: 0.75rem;
  color: black;
`;

export const StyledMatchGameNumber = styled.span`
  font-size: 0.75rem;
  color: #2bb472;
  font-weight: 600;
`;

export const StyledMatchTeamsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  box-sizing: border-box;
  gap: 0.5rem;
`;

export const StyledMatchTeamNameContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
`;

export const StyledMatchTeamName = styled.span`
  font-size: 1rem;
  color: black;
  font-weight: 500;
`;

export const StyledMatchTeamScore = styled.div`
  font-size: 1rem;
  color: black;
  font-weight: 700;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 20px;
`;

export const StyledTrophyIcon = styled(HiTrophy)`
  align-self: center;
  position: absolute;
  top: -100px;
  font-size: 5rem;
  color: #2bb472;

  @media (max-width: 800px) {
    font-size: 2.5rem;
  }
`;

export const StyledVerticalLine = styled.div`
  border-left: 1px solid #ccc;
  height: 150px;
  width: 1px;
  position: absolute;
  left: -30px;
  top: -20px;
`;

export const StyledHorizontalLine = styled.div`
  border-bottom: 1px solid #ccc;
  height: 1px;
  width: 30px;
  position: absolute;
  top: 50%;
  left: -30px;

  @media (max-width: 800px) {
    display: none;
  }
`;
