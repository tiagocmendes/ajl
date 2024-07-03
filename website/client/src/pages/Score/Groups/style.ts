import styled from 'styled-components';

export const StyledGroupCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 0.5rem;
  width: 100%;
  background-color: white;
  border-radius: 0.75rem;
  padding: 1.5rem 2rem 2rem;
  border: 1px solid #e6e6e6;
  box-sizing: border-box;
`;

export const StyledGroupName = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: 0.5rem 0;
  color: #2bb472;
  font-size: 1.75rem;

  @media (max-width: 720px) {
    font-size: 1rem;
  }
`;

export const StyledScoreboardTable = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
`;

export const StyledTableHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0.5rem;
  box-sizing: border-box;
  & div {
    color: #2bb472;
  }
`;

export const StyledTableRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 1.5rem 0.5rem;
  border: 1px solid transparent;
  border-bottom: 1px solid #e6e6e6;
  border-radius: 0.5rem;
  box-sizing: border-box;

  &:hover {
    background-color: #e6e6e6;
    cursor: pointer;
  }
`;

export const StyledTeamNameCell = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 30%;
  gap: 0.75rem;
  font-size: 1.2rem;
  font-weight: 500;

  @media (max-width: 720px) {
    font-size: 0.75rem;
  }
`;

export const StyledTeamPlacement = styled.span`
  color: #2bb472;
`;

interface StatCellOptions {
  isLast?: boolean;
}

export const StyledTeamStatCell = styled.div<StatCellOptions>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: calc(70% / 8);
  font-weight: ${(props) => (props.isLast ? 700 : 400)};

  @media (max-width: 720px) {
    width: calc(70% / 3);
    font-size: 0.75rem;
  }
`;
