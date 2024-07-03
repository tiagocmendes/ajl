import styled from 'styled-components';

export const StyledStatsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  width: 100%;
  gap: 0.5rem;
  margin-bottom: 2rem;
`;

export const StyledStatsCard = styled.div`
  flex-basis: 20%;
  box-sizing: border-box;
  padding: 1.5rem;
  border: 1px solid #e6e6e6;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.2rem;
  color: black;
  background-color: white;

  transition: border-color 0.5s, color 0.5s, background-color 0.5s;

  &:hover {
    cursor: pointer;
    background-color: #1a6b44;
    border-color: #75faba;

    & span {
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

export const StyledStatValue = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: #2bb572;
`;

export const StyledStatName = styled.span`
  font-size: 1rem;
`;
