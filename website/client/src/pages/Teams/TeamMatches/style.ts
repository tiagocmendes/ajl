import styled from 'styled-components';

export const StyledDayMatchesContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  width: 100%;
  gap: 0.5rem;
`;

export const StyledMatchCard = styled.div`
  flex-basis: 30%; /* Grow, shrink, basis */
  box-sizing: border-box;
  padding: 1.5rem;
  border: 1px solid #e6e6e6;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 0.2rem;
  color: black;
  background-color: white;

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

  @media (max-width: 1080px) {
    flex-basis: 45%;
  }

  @media (max-width: 715px) {
    flex-basis: 100%;
  }
`;

export const StyledMatchCardBody = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
`;

export const StyledMatchGroupName = styled.span`
  font-size: 0.75rem;
  color: #b3b1b1;
  font-weight: 500;
`;

export const StyledTeamsNamesContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 70%;
  gap: 0.5rem;
  color: #2bb572;
`;

interface StyledMatchScoreContainerProps {
  hasStarted: boolean;
}

export const StyledMatchScoreContainer = styled.div<StyledMatchScoreContainerProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 7%;
  gap: 0.5rem;
  font-weight: ${(props) => (props.hasStarted ? 800 : 100)};
`;

interface TeamNameOptions {
  isSelected: boolean;
}

export const StyledMatchTeamAndScoreNames = styled.span<TeamNameOptions>`
  font-size: 1rem;
  width: 80%;
  padding: 0.2rem 0 0.2rem 0.5rem;
  border-radius: 0.25rem;

  background-color: ${(props) =>
    props.isSelected ? '#EDFCF5' : 'transparent'};

  color: ${(props) => (props.isSelected ? '#2bb572' : 'black')};
  @media (max-width: 715px) {
    font-size: 1rem;
  }
`;

export const StyledMatchDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 20%;
`;

export const StyledMatchDetailsLabel = styled.span`
  color: black;
`;

export const StyledVerticalDivider = styled.div`
  width: 1px;
  background-color: #ccc;
  height: 70px; /* Adjust height as needed */
  margin: 0 20px; /* Add spacing around the divider */
`;

export const StyledDayContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  gap: 0.75rem;

  h3 {
    color: #2bb572;
  }
`;
