import styled from 'styled-components';

export const StyledTeamDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  height: 90vh;
`;

export const StyledHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  background-color: #22272d;
  padding: 4rem 5rem;
  box-sizing: border-box;
  h1 {
    margin: 0;
    color: white;
    font-size: 3.5rem;
  }

  @media (max-width: 715px) {
    padding: 1.5rem 1.5rem;

    h1 {
      font-size: 2rem;
    }
  }
`;

export const StyledBody = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 1.5rem;
  padding: 0 5rem;
  width: 100%;
  box-sizing: border-box;
  margin-top: 1rem;

  @media (max-width: 715px) {
    padding: 0 1.5rem;
  }
`;

export const StyledInput = styled.input`
  padding: 1rem;
  background-color: white;
  border: none;

  &:focus {
    outline: none;
  }
`;

export const StyledButton = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  color: white;
  background-color: #2bb572;
  padding: 1rem;
  cursor: pointer;
  &:hover {
    opacity: 0.6;
  }
`;
