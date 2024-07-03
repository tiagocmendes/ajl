import styled from 'styled-components';

export const StyledTeamsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  padding: 2rem 5rem;
  box-sizing: border-box;
  height: 90vh;

  @media (max-width: 715px) {
    padding: 2rem 1.5rem;
  }
`;

export const StyledHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;

  h2 {
    margin: 0;
    color: white;
    background-color: #1a6b44;
    padding: 1rem;
  }
`;

export const StyledDivider = styled.div`
  width: 100%;
  border-top: 1px solid #616060;
  margin: 0.75rem 0 1rem;
`;

export const StyledTeamsRowContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: wrap;
  width: 100%;
  gap: 0.5rem;
`;

export const StyledTeamCard = styled.div`
  flex: 0 1 24%;
  box-sizing: border-box;
  padding: 1.5rem;
  border: 1px solid #e6e6e6;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 0.2rem;
  color: #2bb572;
  background-color: white;

  transition: border-color 0.5s, color 0.5s, background-color 0.5s;

  &:hover {
    cursor: pointer;
    background-color: #1a6b44;
    border-color: #75faba;
    color: white;
  }

  @media (max-width: 1080px) {
    flex-basis: 45%;
  }

  @media (max-width: 715px) {
    flex-basis: 100%;
  }
`;
