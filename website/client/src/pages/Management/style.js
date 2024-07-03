import styled from 'styled-components';

export const StyledOuterDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  min-height: 90vh;
  gap: 1rem;
  margin-top: 2rem;
`;

export const StyledPasswordInput = styled.input`
  padding: 1rem;
  background-color: white;
  border: none;

  &:focus {
    outline: none;
  }
`;

export const StyledLoginBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem 5rem;
  box-sizing: border-box;
  background-color: #424141;
  color: white;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;
