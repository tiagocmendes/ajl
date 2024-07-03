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
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 1.5rem;
  padding: 0 5rem;
  width: 100%;
  box-sizing: border-box;

  @media (max-width: 715px) {
    padding: 0 1.5rem;
  }
`;

export const StyledSubheaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 1.5rem;
  padding: 1.5rem 0 0.75rem;
  border-bottom: 1px solid #616060;
  width: 100%;

  span {
    font-size: 1rem;
  }
`;

interface OptionProps {
  isSelected: boolean;
}

export const StyledSubHeaderOption = styled.span<OptionProps>`
  font-size: 1rem;
  color: ${(props) => (props.isSelected ? '#2BB572' : 'black')};

  &:hover {
    cursor: pointer;
    opacity: ${(props) => (props.isSelected ? 1 : 0.6)};
  }
`;

export const StyledViewName = styled.span`
  color: #2bb572;
  font-size: 2rem;
  font-weight: 700;
`;
