import styled from 'styled-components';

export const StyledResultsContainer = styled.div`
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
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 1.5rem;
  background-color: #22272d;
  width: 100%;
  box-sizing: border-box;
  padding: 1rem 5rem;

  @media (max-width: 720px) {
    justify-content: center;
  }
`;

interface SubheaderOption {
  isSelected: boolean;
}

export const StyledSubheaderOption = styled.div<SubheaderOption>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid
    ${(props) => (props.isSelected ? '#75faba' : 'transparent')};
  padding: 0.5rem;
  font-size: 1.25rem;
  color: ${(props) => (props.isSelected ? '#75faba' : 'white')};
  transition: color 0.3s, border-bottom 0.3s;
  cursor: pointer;

  &:hover {
    opacity: ${(props) => (props.isSelected ? 1 : 0.6)};
  }

  @media (max-width: 720px) {
    font-size: 1rem;
  }
`;

export const StyledBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 1.5rem;
  width: 100%;
  box-sizing: border-box;
  padding: 2rem 5rem;

  @media (max-width: 800px) {
    padding: 2rem 1rem;
  }
`;
